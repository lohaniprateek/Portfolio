package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// PortfolioItem defines the structure for a portfolio project.
type PortfolioItem struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"imageUrl"`
	Category    string `json:"category"`
	Link        string `json:"link,omitempty"`
}

// BlogPost defines the structure for a blog entry.
type BlogPost struct {
	Title    string `json:"title"`
	Date     string `json:"date"`
	Snippet  string `json:"snippet"`
	ImageURL string `json:"imageUrl"`
}

// ContactFormSubmission defines the structure for the contact form data.
type ContactFormSubmission struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Message  string `json:"message"`
}

func main() {
	// --- API Endpoints ---

	// API handler for portfolio items
	http.HandleFunc("/api/portfolio", func(w http.ResponseWriter, r *http.Request) {
		portfolioItems := []PortfolioItem{
			{Title: "Get AidEasy", Description: "Automated build, test, and deployment pipeline using Jenkins and Kubernetes.", ImageURL: "https://github.com/lohaniprateek/Get-AidEasy/blob/main/static/images-preview/Home.png", Category: "DevOps",  Link: "https://github.com/lohaniprateek/Get-AidEasy"},
			{Title: "Multi Cloud Hybrid Infrastructure ", Description: "A Grafana dashboard for real-time application performance monitoring.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+3", Category: "SRE"},
			{Title: "Sms Orchestration Automation", Description: ".", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project", Category: "Development"}, 
			{Title: "Static Site Deployment", Description: "Managed cloud resources using Terraform for reproducible environments.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+5", Category: "Cloud"},
			// {Title: "Automated System Auditing", Description: "Developed scripts for automated security and compliance auditing.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+6", Category: "SRE"},
			// {Title: "Cloud Migration Strategy", Description: "A comprehensive plan for migrating on-premise infrastructure to AWS.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+1", Category: "Cloud"},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(portfolioItems)
	})

	// API handler for blog posts
	http.HandleFunc("/api/blog", func(w http.ResponseWriter, r *http.Request) {
		blogPosts := []BlogPost{
			{Title: "Understanding Site Reliability Engineering", Date: "2023-10-26", Snippet: "A deep dive into the principles and practices of SRE.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+1"},
			{Title: "Getting Started with Go for Backend", Date: "2023-09-15", Snippet: "Why Go is a great choice for modern backend services.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+2"},
			{Title: "Top 5 DevOps Trends in 2024", Date: "2023-08-22", Snippet: "Exploring the future of DevOps and automation.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+3"},
			{Title: "A Guide to Effective Cloud Cost Management", Date: "2023-07-30", Snippet: "Strategies to optimize your spending on cloud services.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+4"},
			{Title: "Building Resilient Systems", Date: "2023-06-18", Snippet: "Techniques for designing systems that withstand failure.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+5"},
			{Title: "Introduction to Containerization with Docker", Date: "2023-05-05", Snippet: "The fundamentals of Docker and container technology.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+6"},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(blogPosts)
	})

	// API handler for contact form submission
	http.HandleFunc("/api/contact", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}

		var submission ContactFormSubmission
		err := json.NewDecoder(r.Body).Decode(&submission)
		if err != nil {
			http.Error(w, "Error decoding request body", http.StatusBadRequest)
			return
		}

		// In a real application, you would save this to a database, send an email, etc.
		// For this example, we just log it to the console.
		log.Printf("Received contact form submission: Name: %s, Email: %s, Message: %s", submission.FullName, submission.Email, submission.Message)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Form submitted successfully!"}`))
	})

	// --- Static File Server ---

	// Create a file server to serve the 'frontend' directory
	fs := http.FileServer(http.Dir("./frontend"))

	// Use a custom handler to serve index.html for the root path, and assets for others.
	http.Handle("/", fs)

	// --- Start Server ---
	log.Println("Starting server on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
