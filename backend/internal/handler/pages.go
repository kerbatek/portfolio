package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kerbatek/portfolio/backend/internal/content"
)

func GetPage(store *content.Store) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")
		page, ok := store.Pages[slug]
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": "page not found"})
			return
		}
		c.JSON(http.StatusOK, page)
	}
}
