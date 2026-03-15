package content

import (
	"io/fs"
	"path"
	"sort"
	"strings"
	"time"
)

type Post struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Date        string   `json:"date"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Content     string   `json:"content,omitempty"`
}

type Page struct {
	Slug        string `json:"slug"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
}

type Store struct {
	Posts []Post
	Tags  []string
	Pages map[string]Page
}

func Load(fsys fs.FS) (*Store, error) {
	store := &Store{
		Pages: make(map[string]Page),
	}

	entries, err := fs.ReadDir(fsys, "blog")
	if err != nil {
		return nil, err
	}

	for _, e := range entries {
		if e.IsDir() || !strings.HasSuffix(e.Name(), ".md") {
			continue
		}
		if e.Name() == "_index.md" {
			continue
		}

		raw, err := fs.ReadFile(fsys, path.Join("blog", e.Name()))
		if err != nil {
			return nil, err
		}

		slug := strings.TrimSuffix(e.Name(), ".md")
		fm, body := parseFrontmatter(string(raw))

		post := Post{
			Slug:        slug,
			Title:       fm["title"],
			Date:        fm["date"],
			Description: fm["description"],
			Tags:        parseArray(fm["tags"]),
			Content:     body,
		}
		store.Posts = append(store.Posts, post)
	}

	dates := make([]time.Time, len(store.Posts))
	for i, p := range store.Posts {
		dates[i] = parseDate(p.Date)
	}
	sort.Slice(store.Posts, func(i, j int) bool {
		return dates[i].After(dates[j])
	})

	tagSet := make(map[string]struct{})
	for _, p := range store.Posts {
		for _, t := range p.Tags {
			tagSet[t] = struct{}{}
		}
	}
	for t := range tagSet {
		store.Tags = append(store.Tags, t)
	}
	sort.Strings(store.Tags)

	for _, slug := range []string{"about", "homelab"} {
		raw, err := fs.ReadFile(fsys, slug+".md")
		if err != nil {
			return nil, err
		}
		fm, body := parseFrontmatter(string(raw))
		store.Pages[slug] = Page{
			Slug:        slug,
			Title:       fm["title"],
			Description: fm["description"],
			Content:     body,
		}
	}

	return store, nil
}

func parseFrontmatter(raw string) (map[string]string, string) {
	fm := make(map[string]string)
	const delim = "---"

	if !strings.HasPrefix(raw, delim) {
		return fm, raw
	}

	rest := raw[len(delim):]
	end := strings.Index(rest, "\n---")
	if end == -1 {
		return fm, raw
	}

	header := strings.TrimPrefix(rest[:end], "\n")
	body := strings.TrimPrefix(rest[end+4:], "\n")

	for _, line := range strings.Split(header, "\n") {
		idx := strings.Index(line, ":")
		if idx == -1 {
			continue
		}
		key := strings.TrimSpace(line[:idx])
		val := strings.TrimSpace(line[idx+1:])
		if !strings.HasPrefix(val, "[") {
			val = strings.Trim(val, `"'`)
		}
		fm[key] = val
	}

	return fm, body
}

func parseArray(val string) []string {
	val = strings.TrimSpace(val)
	if !strings.HasPrefix(val, "[") || !strings.HasSuffix(val, "]") {
		if val == "" {
			return nil
		}
		return []string{val}
	}
	inner := val[1 : len(val)-1]
	parts := strings.Split(inner, ",")
	var result []string
	for _, p := range parts {
		p = strings.TrimSpace(p)
		p = strings.Trim(p, `"'`)
		if p != "" {
			result = append(result, p)
		}
	}
	return result
}

func parseDate(s string) time.Time {
	formats := []string{
		"2006-01-02T15:04:05",
		"2006-01-02",
	}
	for _, f := range formats {
		t, err := time.Parse(f, s)
		if err == nil {
			return t
		}
	}
	return time.Time{}
}
