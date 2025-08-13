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
			{
				Title:       "Get AidEasy",
				Description: "Get-EasyAid is a responsive web app that automates Coursera Financial Aid applications using Google Gemini API. Users select a course, submit a form, and receive AI-generated answers to required questions. I forked, containerized it with Docker, and set up CI/CD using GitHub Actions for seamless deployment and updates.",
				ImageURL:    "../images/Project1.png",
				Category:    "DevOps",
				Link:        "https://github.com/lohaniprateek/Get-AidEasy"},

			{
				Title:       "Multi Cloud Hybrid Infrastructure",
				Description: "Solution to xAI's 'Multi-Cloud Hybrid Infrastructure' Optimization challenge. Redesigned a microservices-based hybrid cloud setup (AWS & GCP) to fix inefficiencies and security flaws using infrastructure modernization, prompt engineering, and security best practices.",
				ImageURL:    "https://placehold.co/600x400/1a1a1a/ffffff?text=Project",
				Category:    "SRE",
				Link:        "https://github.com/lohaniprateek/Get-AidEasy"},
			{
				Title:       "React Demo Github Actions",
				Description: "Implemented GitHub Actions for automated CI/CD pipelines and integrated SonarQube for code quality analysis in a forked React application. Successfully deployed the React app and its dist folder to production environments.",
				ImageURL:    "https://placehold.co/600x400/1a1a1a/ffffff?text=Project",
				Category:    "Development", Link: "https://github.com/lohaniprateek/Get-AidEasy"},
			{
				Title: "Sms Orchestration Automation",
				Description: "Built a multi-VM setup using Vagrant and Docker, deployed Nginx with shell scripts, and integrated Prometheus for monitoring. Showcased DevOps skills in orchestration, containerization, and observability.",
				ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project",
				Category: "SRE",
				Link: ""},
			{
				Title:       "Static Site Deployment",
				Description: "This project focused on deploying a static HTML website using Docker. The goal was to create a containerized environment that runs a lightweight web server to serve static content. This approach ensures easy setup, consistent behavior across systems, and simplified deployment, making the website portable, efficient, and ready for production use",
				ImageURL:    "https://placehold.co/600x400/1a1a1a/ffffff?text=Project",
				Category:    "Cloud",
				Link:        "https://github.com/lohaniprateek/Get-AidEasy"},
			// {Title: "Cloud Migration Strategy", Description: "A comprehensive plan for migrating on-premise infrastructure to AWS.", ImageURL: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+1", Category: "Cloud", Link: "},
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
	log.Println("Starting server on http://0.0.0.0:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
