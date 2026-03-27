document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("page-content");
  const navLinks = document.querySelectorAll(".nav-link");
  const escapeHTML = (value) =>
    String(value).replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[char];
    });

  const renderCard = ({ imageUrl, title, bodyHTML, href, meta, badge, cta }) => {
    const cardContent = `
      <article class="card">
        <img src="${escapeHTML(imageUrl)}" alt="${escapeHTML(title)}" class="card-image">
        <div class="card-content">
          ${badge ? `<span class="card-badge">${escapeHTML(badge)}</span>` : ""}
          ${meta ? `<p class="card-date">${escapeHTML(meta)}</p>` : ""}
          <h4 class="card-title">${escapeHTML(title)}</h4>
          ${bodyHTML}
          ${cta ? `<span class="card-cta">${escapeHTML(cta)}</span>` : ""}
        </div>
      </article>
    `;

    if (!href) {
      return cardContent;
    }

    return `
      <a href="${escapeHTML(href)}" class="card-link" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(title)}">
        ${cardContent}
      </a>
    `;
  };

  const renderAsyncSection = async (loader, emptyMessage) => {
    try {
      const response = await loader();
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const items = await response.json();
      if (!items.length) {
        return `<p class="status-message">${escapeHTML(emptyMessage)}</p>`;
      }

      return items;
    } catch (error) {
      return `<p class="status-message error-message">Unable to load this section right now. Please try again later.</p>`;
    }
  };

  // --- TEMPLATE FUNCTIONS ---

  const renderAboutPage = () => {
    return `
      <h2 class="page-title">About Me</h2>
      <section class="section">
          <p class="timeline-description">
                    I’m a DevOps and cloud-focused engineer who enjoys working close to Linux systems, infrastructure automation, and reliability problems.<br><br>

                    A lot of my hands-on time goes into shell scripting, experimenting with modern tooling, and building cleaner local and cloud environments that are easier to operate.<br><br>
                    
                    I’m also building a custom minimal development setup <a href="https://github.com/lohaniprateek/Tpac" target="_blank" rel="noopener noreferrer">(TPAC)</a> with dwm and other suckless tools, focused on performance, simplicity, and control.<br><br>
                    
                    I write technical blogs to document what I learn and use personal projects as a way to sharpen practical engineering judgment.<br><br>
                    
                    Always learning. Always building.
      </p>
      </section>
      <section class="section">
          <h3 class="section-title">What I'm Doing</h3>
          <div class="card-grid">
              <div class="card">
                  <div class="card-content">
                      <h4 class="card-title">DevOps</h4>
                         <p class="card-description">Automating deployments, improving delivery workflows, and building reliable systems with strong operational visibility.</p>
                  </div>
              </div>
              <div class="card">
                  <div class="card-content">
                      <h4 class="card-title">Cloud Engineering</h4>
                      <p class="card-description">Designing, deploying, and managing scalable and secure cloud infrastructure on AWS, Azure, and GCP.</p>
                  </div>
              </div>
              <div class="card">
                  <div class="card-content">
                      <h4 class="card-title">Site Reliability (SRE)</h4>
                      <p class="card-description">Ensuring systems are running smoothly, reliably, and efficiently by measuring and optimizing system performance.</p>
                  </div>
              </div>
              <div class="card">
                  <div class="card-content">
                      <h4 class="card-title">Software Development</h4>
                      <p class="card-description">Developing services and tools, primarily using Go, Python, and Node.js to support infrastructure needs.</p>
                  </div>
              </div>
          </div>
      </section>
    `;
  };

  const renderResumePage = () => {
    const graduationCapSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7.00006L12 12.0001L2 7.00006L12 2.00006L22 7.00006ZM12 13.5001L3.93945 9.00006L2.20703 10.0001L12 15.0001L21.793 10.0001L20.0605 9.00006L12 13.5001ZM12 16.5L20 12.0001V17.0001C20 17.5523 19.5523 18.0001 19 18.0001H5C4.44772 18.0001 4 17.5523 4 17.0001V12.0001L12 16.5Z"></path>
        </svg>
    `;

    return `
      <h2 class="page-title">Resume</h2>

	<section class="section">
	  <h3 class="section-title">Experience</h3>
	  <div class="timeline">
	  
	    <div class="timeline-item">
	    <h4 class="timeline-title">Open to Work - DevOps / Cloud / SRE Roles</h4>
	    <p class="timeline-date">Present</p>  
	    <ul class="timeline-description">
	      <li>Actively pursuing DevOps and cloud engineering opportunities aligned with Linux, infrastructure automation, and reliability engineering.</li>
	      <li>Strengths include Linux troubleshooting, Terraform, AWS, CI/CD pipelines, Docker, GitLab, and core networking fundamentals.</li>
	      <li>Continuing hands-on work through personal projects, lab environments, and automation-focused experimentation.</li>
	      <li>Regularly document practical learnings through technical blog posts on Medium under <strong>lohaniprateek</strong>.</li>
	    </ul>
	    </div>
    
    <div class="timeline-item">
      <h4 class="timeline-title">DevOps Engineer (Intern) - Qappa Labs</h4>
      <p class="timeline-date">Sep 2025 - Mar 2026</p>
      <ul class="timeline-description">
        <li>Designed and provisioned scalable, secure AWS infrastructure (EC2, S3, IAM) using Terraform, reducing manual provisioning effort by ~40% through Infrastructure as Code (IaC).</li>
        <li>Contributed to the development of <strong>Terraform Sync</strong>, an internal infrastructure comparison and drift-detection system to analyze Terraform state and configuration changes.</li>
        <li>Built the data collection layer to extract and normalize Terraform state and resource configurations for structured analysis.</li>
        <li>Engineered a comparison engine to detect infrastructure drift, resource-level changes, and configuration mismatches across environments.</li>
        <li>Implemented patch/diff generation logic to produce structured change outputs, enabling safer and more controlled infrastructure updates.</li>
        <li>Developed and optimized Go-based microservices supporting automation workflows, improving service efficiency and reliability.</li>
        <li>Built and maintained CI/CD pipelines for automated testing and deployment, reducing release cycles by over 50%.</li>
      </ul>
    </div>

    <div class="timeline-item">
      <h4 class="timeline-title">Freelancer Web Dev / Site Reliability Engineer - Vishnu Seva Trust</h4>
      <p class="timeline-date">Mar 2023 - Mar 2024</p>
      <ul class="timeline-description">
        <li>Designed and developed a secure donation platform with integrated payment gateway.</li>
        <li>Engineered 99.9% uptime architecture with monitoring, automated backups, and failover mechanisms.</li>
        <li>Improved performance and SEO, increasing organic traffic by 35% and reducing page load time by 50%.</li>
        <li>Automated deployment workflows using CI/CD pipelines, reducing manual release effort by 60%.</li>
      </ul>
    </div>

  </div>
</section>

<!-- Education Section -->
<section class="section">
  <div class="section-header">
    ${graduationCapSVG}
    <h3 class="section-title">Education</h3>
  </div>
  <div class="timeline">
    <div class="timeline-item">
      <h4 class="timeline-title">B.Tech in Computer Science</h4>
      <p class="timeline-date">2021 - 2025 | Uttarakhand Technical University, Dehradun</p>
      <p class="timeline-description">
        Strong foundation in Operating Systems, Computer Networks, DBMS, and Programming. Focused on systems engineering and infrastructure automation.
      </p>
    </div>
  </div>
</section>

      <!-- Non-formal Education Section -->
      <section class="section">
          <h3 class="section-title">Certifications & Training</h3>
          <div class="timeline">
              <div class="timeline-item">
                  <h4 class="timeline-title">Oracle Cloud Infrastructure Certified</h4>
                  <p class="timeline-date">Completed 2025</p>
                  <p class="timeline-description">Demonstrated understanding of Oracle Cloud concepts, core OCI services, security, pricing, and architecture. Hands-on knowledge of compute, storage, networking, IAM, and cloud governance fundamentals.</p>
              </div>
              <div class="timeline-item">
                  <h4 class="timeline-title">DevOps Beginners to Advanced with Projects (Udemy)</h4>
                  <p class="timeline-date">Completed 2025</p>
                  <p class="timeline-description">Hands-on experience with AWS, Linux, Bash, Jenkins, Ansible, Docker, Kubernetes, GitOps, and Terraform.</p>
              </div>
              <div class="timeline-item">
                  <h4 class="timeline-title">Red Hat Certified Training</h4>
                  <p class="timeline-date">Completed 2024</p>
                  <ul class="timeline-description">
                      <li><strong>RH104:</strong> Foundational Linux, terminal usage, file operations.</li>
                      <li><strong>RH124:</strong> Basic system administration, user/group management.</li>
                      <li><strong>RH134:</strong> Advanced system administration, services, and firewalls.</li>
                  </ul>
              </div>
              <div class="timeline-item">
                  <h4 class="timeline-title">Full Stack Web Development Bootcamp (Udemy)</h4>
                  <p class="timeline-date">Completed 2024</p>
                  <p class="timeline-description">Covered HTML, CSS, JavaScript, Node.js, Express.js, React, PostgreSQL, and Git.</p>
              </div>
          </div>
      </section>
      
      <!-- Skills Section -->
      <section class="section">
          <h3 class="section-title">Skills</h3>
          <div class="card-grid">
              <div class="skill-item">
                  <div class="skill-info"><p>Linux</p><p>65%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 65%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>AWS</p><p>70%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 70%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Azure</p><p>70%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 70%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Monitoring</p><p>75%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 75%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>CI/CD</p><p>75%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 75%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Git</p><p>70%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 70%;"></div></div>
              </div>
          </div>
      </section>

      <!-- Code Skills Section -->
      <section class="section">
          <h3 class="section-title">Code & Tooling</h3>
          <div class="card-grid">
              <div class="skill-item">
                  <div class="skill-info"><p>Go</p><p>65%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 65%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Bash</p><p>70%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 70%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>JavaScript</p><p>55%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 55%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Terraform</p><p>55%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 55%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Docker & Kubernetes</p><p>60%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 60%;"></div></div>
              </div>
              <div class="skill-item">
                  <div class="skill-info"><p>Lua</p><p>65%</p></div>
                  <div class="progress-bar"><div class="progress" style="width: 65%;"></div></div>
              </div>
          </div>
      </section>
    `;
  };
  
  const renderPortfolioPage = async () => {
    const items = await renderAsyncSection(() => fetch("/api/portfolio"), "Projects will appear here soon.");
    if (typeof items === "string") {
      return `
            <h2 class="page-title">Portfolio</h2>
            ${items}
        `;
    }

    const portfolioItemsHTML = items
      .map((item) =>
        renderCard({
          imageUrl: item.imageUrl,
          title: item.title,
          bodyHTML: `<p class="card-description">${escapeHTML(item.description)}</p>`,
          href: item.link,
          badge: item.category,
          cta: item.link ? "View project" : "Project details coming soon",
        })
      )
      .join("");
    return `
            <h2 class="page-title">Portfolio</h2>
            <p class="section-link section-link-muted">Selected work focused on automation, infrastructure, and reliability engineering.</p>
            <div class="card-grid">${portfolioItemsHTML}</div>
        `;
  };

  const renderBlogPage = async () => {
    const posts = await renderAsyncSection(() => fetch("/api/blog"), "Blog posts will appear here soon.");
    if (typeof posts === "string") {
      return `
            <h2 class="page-title">Blog</h2>
            <p class="section-link">
                <a href="https://medium.com/@lohaniprateek" target="_blank" rel="noopener noreferrer">Read more on Medium</a>
            </p>
            ${posts}
        `;
    }

    const blogPostsHTML = posts
      .map((post) =>
        renderCard({
          imageUrl: post.imageUrl,
          title: post.title,
          bodyHTML: `<p class="card-description">${escapeHTML(post.snippet)}</p>`,
          href: post.link,
          meta: post.date,
          badge: post.badge,
          cta: post.link ? "Read article" : "",
        })
      )
      .join("");
    return `
            <h2 class="page-title">Blog</h2>
            <p class="section-link">
                <a href="https://medium.com/@lohaniprateek" target="_blank" rel="noopener noreferrer">Read more on Medium</a>
            </p>
            <div class="card-grid">${blogPostsHTML}</div>
        `;
  };

  const renderContactPage = () => {
    return `
            <h2 class="page-title">Contact</h2>
            <p><strong>Open for opportunities:</strong> Yes</p>
            <br>
            <form class="contact-form" id="contact-form">
                <div class="form-group">
                    <label for="fullName">Full name</label>
                    <input type="text" id="fullName" name="fullName" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" id="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="message">Your message</label>
                    <textarea id="message" name="message" class="form-textarea" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Submit</button>
            </form>
            <p id="contact-status" class="status-message" aria-live="polite"></p>
        `;
  };


  const pageRenderers = {
    about: renderAboutPage,
    resume: renderResumePage,
    portfolio: renderPortfolioPage,
    blog: renderBlogPage,
    contact: renderContactPage,
  };

  const loadContent = async (page) => {
    contentContainer.innerHTML = "<p>Loading...</p>";
    if (pageRenderers[page]) {
      const content = await pageRenderers[page]();
      contentContainer.innerHTML = content;
      bindDynamicContent(page);
    } else {
      contentContainer.innerHTML = "<p>Page not found.</p>";
    }
  };

  const bindDynamicContent = (page) => {
    if (page !== "contact") {
      return;
    }

    const contactForm = document.getElementById("contact-form");
    const statusElement = document.getElementById("contact-status");
    if (!contactForm || !statusElement) {
      return;
    }

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      statusElement.textContent = "Sending message...";
      statusElement.className = "status-message";

      const formData = new FormData(contactForm);
      const payload = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Unable to send message");
        }

        statusElement.textContent = result.message || "Message sent successfully.";
        statusElement.className = "status-message success-message";
        contactForm.reset();
      } catch (error) {
        statusElement.textContent = error.message || "Unable to send message right now.";
        statusElement.className = "status-message error-message";
      }
    });
  };

  const updateActiveLink = (page) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.page === page) {
        link.classList.add("active");
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.closest(".nav-link").dataset.page;
      if (window.location.hash.substring(1) === page) {
        updateActiveLink(page);
        loadContent(page);
        return;
      }

      window.location.hash = page;
    });
  });

  window.addEventListener("hashchange", () => {
    const page = window.location.hash.substring(1) || "about";
    updateActiveLink(page);
    loadContent(page);
  });

  const initialPage = window.location.hash.substring(1) || "about";
  updateActiveLink(initialPage);
  loadContent(initialPage);
});
