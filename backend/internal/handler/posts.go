package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kerbatek/portfolio/backend/internal/content"
)

func ListPosts(store *content.Store) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, store.Posts)
	}
}

func GetPost(store *content.Store) gin.HandlerFunc {
	index := make(map[string]*content.Post, len(store.Posts))
	for i := range store.Posts {
		index[store.Posts[i].Slug] = &store.Posts[i]
	}
	return func(c *gin.Context) {
		slug := c.Param("slug")
		post, ok := index[slug]
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": "post not found"})
			return
		}
		c.JSON(http.StatusOK, post)
	}
}

func ListTags(store *content.Store) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, store.Tags)
	}
}
