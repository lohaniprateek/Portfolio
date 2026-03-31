package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"path/filepath"
	"strings"
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
	Link     string `json:"link,omitempty"`
	Badge    string `json:"badge"`
}

// ContactFormSubmission defines the structure for the contact form data.
type ContactFormSubmission struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Message  string `json:"message"`
}

type smtpConfig struct {
	host     string
	port     string
	username string
	password string
	to       string
}

func loadSMTPConfig() smtpConfig {
	return smtpConfig{
		host:     os.Getenv("SMTP_HOST"),
		port:     os.Getenv("SMTP_PORT"),
		username: os.Getenv("SMTP_USER"),
		password: os.Getenv("SMTP_PASS"),
		to:       firstNonEmpty(os.Getenv("CONTACT_TO"), "kprateek9315@gmail.com"),
	}
}

func (c smtpConfig) valid() bool {
	return c.host != "" && c.port != "" && c.username != "" && c.password != "" && c.to != ""
}

func (c smtpConfig) addr() string {
	return c.host + ":" + c.port
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if value != "" {
			return value
		}
	}

	return ""
}

func sendContactEmail(cfg smtpConfig, submission ContactFormSubmission) error {
	auth := smtp.PlainAuth("", cfg.username, cfg.password, cfg.host)
	subject := fmt.Sprintf("Portfolio contact from %s", submission.FullName)
	body := strings.Join([]string{
		fmt.Sprintf("Name: %s", submission.FullName),
		fmt.Sprintf("Email: %s", submission.Email),
		"",
		"Message:",
		submission.Message,
	}, "\n")

	message := strings.Join([]string{
		fmt.Sprintf("To: %s", cfg.to),
		fmt.Sprintf("From: %s", cfg.username),
		fmt.Sprintf("Reply-To: %s", submission.Email),
		fmt.Sprintf("Subject: %s", subject),
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=UTF-8",
		"",
		body,
	}, "\r\n")

	return smtp.SendMail(cfg.addr(), auth, cfg.username, []string{cfg.to}, []byte(message))
}

func loadDotEnv(paths ...string) {
	for _, path := range paths {
		if err := applyDotEnv(path); err != nil && !os.IsNotExist(err) {
			log.Printf("Error loading %s: %v", path, err)
		}
	}
}

func applyDotEnv(path string) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		key, value, found := strings.Cut(line, "=")
		if !found {
			continue
		}

		key = strings.TrimSpace(key)
		value = strings.TrimSpace(value)
		value = strings.Trim(value, `"'`)
		if key == "" || os.Getenv(key) != "" {
			continue
		}

		if err := os.Setenv(key, value); err != nil {
			return err
		}
	}

	return scanner.Err()
}

func main() {
	loadDotEnv(".env", filepath.Join(".", ".env.local"))
	smtpCfg := loadSMTPConfig()

	// --- API Endpoints ---

	// API handler for portfolio items
	http.HandleFunc("/api/portfolio", func(w http.ResponseWriter, r *http.Request) {
		portfolioItems := []PortfolioItem{
			{
				Title:       "TPAC",
				Description: "A custom minimal Arch Linux development setup built around dwm and other suckless tools, focused on performance, simplicity, and direct control over the local engineering environment.",
				ImageURL:    "/assets/projects/tpac-logo.png",
				Category:    "Linux",
				Link:        "https://github.com/lohaniprateek/Tpac",
			},
			{
				Title:       "CI/CD Pipeline with Jenkins & Docker-in-Docker",
				Description: "Built an end-to-end Jenkins pipeline for a Node.js application using Docker-in-Docker and Docker Compose to automate builds, tests, and deployments with reproducible local infrastructure.",
				ImageURL:    "/assets/projects/devops.jpg",
				Category:    "DevOps",
				Link:        "",
			},
			{
				Title:       "GitOps Deployment with Argo CD",
				Description: "Implemented a GitOps deployment model on Kubernetes with Argo CD as the single source of truth, enabling version-controlled releases and simpler rollback during incidents.",
				ImageURL:    "/assets/multi_cloud.png",
				Category:    "Kubernetes",
				Link:        "",
			},
			{
				Title:       "V-Profile: Multi-Tier Lift & Shift to AWS",
				Description: "Migrated a multi-tier application to AWS using RDS, Elastic Beanstalk, ElastiCache, and ActiveMQ, with Terraform-based provisioning that cut setup time from hours to minutes.",
				ImageURL:    "/assets/multi_cloud.png",
				Category:    "AWS",
				Link:        "",
			},
			{
				Title:       "Proactive SSL/TLS Certificate Monitoring CLI",
				Description: "Built a Go CLI to monitor certificate expiry and trust-chain health across multiple domains with configurable thresholds, helping prevent SSL-related outages before they happen.",
				ImageURL:    "/assets/projects/pavi-project.png",
				Category:    "Go",
				Link:        "https://github.com/lohaniprateek/pavi",
			},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(portfolioItems)
	})

	// API handler for blog posts
	http.HandleFunc("/api/blog", func(w http.ResponseWriter, r *http.Request) {
		blogPosts := []BlogPost{
			{
				Title:    "The Docker Concept: Why Your Application Needs It",
				Date:     "2026-03-23",
				Snippet:  "A practical look at why containerization matters and how Docker improves consistency across environments.",
				ImageURL: "/assets/blogs/Comomon.png",
				Link:     "https://medium.com/@lohaniprateek/the-docker-concept-why-your-application-needs-it-347f7856b947",
				Badge:    "DevOps",
			},
			{
				Title:    "The Why: “Learn Linux Before DevOps”",
				Date:     "2026-02-15",
				Snippet:  "Why Linux fundamentals matter before going deeper into DevOps tooling, automation, and infrastructure work.",
				ImageURL: "/assets/blogs/linux_befoer-devops.png",
				Link:     "https://medium.com/@lohaniprateek/the-docker-concept-why-your-application-needs-it-347f7856b947",
				Badge:    "Linux/DevOps",
			},
			{
				Title:    "Arch Linux RAM & Memory Optimization with Zram",
				Date:     "2025-12-31",
				Snippet:  "Notes on reducing memory pressure and improving responsiveness on Linux systems using zram.",
				ImageURL: "/assets/blogs/ram-opt.png",
				Link:     "https://medium.com/@lohaniprateek/the-docker-concept-why-your-application-needs-it-347f7856b947",
				Badge:    "Linux",
			},
			{
				Title:    "Installing AppImage in Linux",
				Date:     "2025-12-03",
				Snippet:  "A quick guide to running and managing AppImage packages cleanly on Linux.",
				ImageURL: "/assets/blogs/Comomon.png",
				Link:     "https://medium.com/@lohaniprateek/the-docker-concept-why-your-application-needs-it-347f7856b947",
				Badge:    "Linux",
			},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(blogPosts)
	})

	// API handler for contact form submission
	http.HandleFunc("/api/contact", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			if err := json.NewEncoder(w).Encode(map[string]string{"message": "Invalid request method"}); err != nil {
				log.Printf("Error writing response: %v", err)
			}
			return
		}

		var submission ContactFormSubmission
		err := json.NewDecoder(r.Body).Decode(&submission)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			if err := json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding request body"}); err != nil {
				log.Printf("Error writing response: %v", err)
			}
			return
		}

		if submission.FullName == "" || submission.Email == "" || submission.Message == "" {
			w.WriteHeader(http.StatusBadRequest)
			if err := json.NewEncoder(w).Encode(map[string]string{"message": "All fields are required"}); err != nil {
				log.Printf("Error writing response: %v", err)
			}
			return
		}

		log.Printf("Received contact form submission: Name: %s, Email: %s, Message: %s", submission.FullName, submission.Email, submission.Message)

		if !smtpCfg.valid() {
			log.Printf("SMTP is not configured; submission from %s was logged but not emailed", submission.Email)
			w.WriteHeader(http.StatusServiceUnavailable)
			if err := json.NewEncoder(w).Encode(map[string]string{"message": "Contact email is not configured yet on the server"}); err != nil {
				log.Printf("Error writing response: %v", err)
			}
			return
		}

		if err := sendContactEmail(smtpCfg, submission); err != nil {
			log.Printf("Error sending contact email: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			if err := json.NewEncoder(w).Encode(map[string]string{"message": "Unable to send message right now. Please try again later."}); err != nil {
				log.Printf("Error writing response: %v", err)
			}
			return
		}

		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(map[string]string{"message": "Message received. I will get back to you soon."}); err != nil {
			log.Printf("Error writing response: %v", err)
		}
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
