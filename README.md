# Portfolio Website

**Live:** [prateek-kumar-protfolio.onrender.com](https://prateek-kumar-protfolio.onrender.com)

![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black)

A personal portfolio that acts as a living resume — covering who I am professionally, my skills, ongoing projects, writing, and ways to get in touch.

---

## What it does

- Introduces me professionally — skills, experience, and current projects
- Lists personal and professional projects with context
- Surfaces my 6 latest tech blog posts
- Links to all my social profiles
- Lets visitors download my current resume
- Provides a contact page with a working `POST /contact` endpoint backed by a self-hosted mailer

---

## Architecture

| Layer | Tech | Role |
|---|---|---|
| Backend | Go | Serves static files and handles the contact endpoint |
| Frontend | HTML / Vanilla JS | Interactivity and responsiveness across screen sizes |
| Assets | `/assets` dir | Holds static files including my current resume |
| Containerisation | Docker | Builds and pushes image to Docker Hub |
| CI/CD | GitHub Actions | Auto-deploys to Render on every push |

---

## Why Render

Render gives me a real server instance with nearly zero abstraction — I control exactly what runs and how it gets there. My pipelines do the work, not a black-box platform integration. This keeps me in a proper DevOps workflow rather than just connecting a repo and hoping for the best.

---

## Planned improvements

- [ ] Add a Postgres DB to manage projects, blog listings, and job history dynamically
- [ ] Connect a custom domain
- [ ] Migrate to a self-hosted server
- [ ] Set up analytics and monitoring

---

## Make it yours

The codebase is intentionally readable and hackable — swap in your details and it's yours.

**1. Clone and customise**
```bash
git https://github.com/lohaniprateek/Portfolio.git
# Replace personal details throughout the codebase
```

**2. Add repository secrets**

| Secret | Purpose |
|---|---|
| `RENDER_API_KEY` | Render deployment |
| `RENDER_SERVICE_ID` | Render deployment |
| `DOCKERHUB_TOKEN` | Docker Hub image publishing |

**3. Configure the mailer**

See `.env.example` for the required environment variables to run your own mailing server.

**4. Clean up the pipeline**

Remove the GitLab mirror step from the GitHub Actions workflow — that's a personal configuration for mirroring to my GitLab copy and won't apply to your fork.

**5. Push and let the pipeline do the rest**
```bash
git push origin main
```
