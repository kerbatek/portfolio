package main

import (
	"embed"
	"io/fs"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/kerbatek/portfolio/backend/internal/content"
	"github.com/kerbatek/portfolio/backend/internal/handler"
)

//go:embed content
var rawFS embed.FS

func main() {
	fsys, err := fs.Sub(rawFS, "content")
	if err != nil {
		log.Fatalf("fs.Sub: %v", err)
	}

	store, err := content.Load(fsys)
	if err != nil {
		log.Fatalf("content.Load: %v", err)
	}

	r := gin.Default()
	api := r.Group("/api")
	api.GET("/posts", handler.ListPosts(store))
	api.GET("/posts/:slug", handler.GetPost(store))
	api.GET("/tags", handler.ListTags(store))
	api.GET("/pages/:slug", handler.GetPage(store))

	log.Println("Listening on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("r.Run: %v", err)
	}
}
