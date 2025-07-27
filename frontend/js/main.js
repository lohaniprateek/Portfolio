// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("page-content");
  const navLinks = document.querySelectorAll(".nav-link");

  // --- TEMPLATE FUNCTIONS ---
  // These functions generate the HTML for each page.

  const renderAboutPage = () => {
    return `
            <h2 class="page-title">About Me</h2>
            <section class="section">
                <p class="card-description">A passionate and skilled DevOps and Web Engineer with a solid foundation in Linux systems, infrastructure automation, and cloud-native development. I have completed Red Hat’s RH104, RH124, and RH134 training, which equipped me with strong hands-on experience in enterprise Linux environments, scripting, and system administration.

<br> <br> Experienced in working with tools like Git, Docker, Jenkins, and Ansible for automating application delivery and managing scalable infrastructure. Well-versed in setting up CI/CD pipelines, version control workflows, and automating development lifecycles. Have built and deployed full-stack web applications using JavaScript, React, Node.js, and PostgreSQL, integrating frontend with backend services and APIs.

 <br> <br>Comfortable provisioning infrastructure with tools like Terraform and managing containers using Docker and Kubernetes. I'm also gaining practical experience in monitoring, alerting, and log management using tools like Grafana, Prometheus, and ELK stack. Strong advocate for Infrastructure as Code (IaC), GitOps practices, and clean DevOps workflows that improve collaboration and reduce deployment risks.

With a Bachelor's degree in Computer Science and continuous hands-on learning, I’m actively seeking opportunities to apply and grow my skills in DevOps, SRE, and modern cloud environments.
</p>
            </section>
            <section class="section">
                <h3 class="section-title">What I'm Doing</h3>
                <div class="card-grid">
                    <div class="card card-bgi">
                        <div class="card-content">
                            <h4 class="card-title">DevOps</h4>
                            <p class="card-description">Automating and streamlining operations and processes, building and maintaining tools for deployment, monitoring, and operations.</p>
                        </div>
                    </div>
                    <div class="card card-bgi">
                        <div class="card-content">
                            <h4 class="card-title">Cloud Engineering</h4>
                            <p class="card-description">Designing, deploying, and managing scalable and secure cloud infrastructure on AWS, Azure, and GCP.</p>
                        </div>
                    </div>
                    <div class="card card-bgi">
                        <div class="card-content">
                            <h4 class="card-title">Site Reliability (SRE)</h4>
                            <p class="card-description">Ensuring systems are running smoothly, reliably, and efficiently by measuring and optimizing system performance.</p>
                        </div>
                    </div>
                    <div class="card card-bgi">
                        <div class="card-content">
                            <h4 class="card-title">Software Development</h4>
                            <p class="card-description">Developing backend services and tools, primarily using Go, Python, and Node.js to support infrastructure needs.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
  };

  const renderResumePage = () => {
    return `
            <h2 class="page-title">Resume</h2>
            <section class="section">
                <h3 class="section-title">Experience</h3>
                <!-- Add job entries here -->
                <p><strong>Freelancer Web Developer</strong> at Vishnu Seva Trust. (Mar 2023 -Jul 2023)</p>
                <p>- Designed and developed a website for VishnuSevaTrust to facilitate online donations, focusing on ease of use
and security.<br>

- Developed a secure, user-friendly website for VishnuSevaTrust to enable online donations with an integrated
payment gateway. <br>
- Applied basic SEO practices to boost site visibility and donor engagement.</p>

<br><br>
                <p><strong>Freelancer Web Developer</strong> at WEwear. (Jun 2022- Aug 2022)</p>
                <p>- Developed and launched a fully functional e-commerce website using Shopify for WeWear, an online fashion
retail business.<br>
- Implemented custom themes and integrated payment gateways to enhance user experience and streamline operations.<br>
- Integrated inventory management and shopping options to enhance user experience and streamline operations. <br>
- Collaborated with the client to ensure the website met business requirements and provided a seamless shopping experience for <br> customers.<br>
- Implemented responsive design principles to ensure optimal viewing across devices, improving customer engagement.</p>



            </section>



            <section class="section">
                <h3 class="section-title">Education</h3>
                <p><strong>B.Tech in Computer Science</strong> from Uttrakhand Technical University (2021-2025)</p>
                <p>- Computer Science and Engineering with focus on core subjects like OS, Networking, and Programming </p> 
                <p>- Dehradun, India</p>

            </section>
            <br>
            <section class="section">
  <h3 class="section-title">Non-formal Education</h3>

  <p><strong>DevOps Beginners to Advanced with Projects</strong> from Udemy (2021–2025)<br /><br />
  Through the "DevOps Beginners to Advanced with Projects" course, I gained hands-on experience with essential DevOps tools and practices.<br />
  I worked with AWS, Linux, Bash scripting, Jenkins, Ansible, Docker, Kubernetes, GitOps, and Terraform.<br />
  I learned to build CI/CD pipelines, automate infrastructure, manage containerized applications, and implement Infrastructure as Code.<br />
  The course helped me understand how all these tools integrate within modern DevOps and GitOps workflows.<br />
  By the end of the course, I was able to apply these skills in real-world projects and practical scenarios.
  </p><br />

  <p><strong>RH104 – Red Hat Introduction to Linux:</strong><br />
  Gained foundational understanding of Linux, terminal usage, file operations, and system components.
  </p><br />

  <p><strong>RH124 – Red Hat System Administration I:</strong><br />
  Learned basic Linux commands, user and group management, and filesystem navigation on RHEL systems.
  </p><br />

  <p><strong>RH134 – Red Hat System Administration II:</strong><br />
  Built on RH124 by covering advanced topics like process management, system services, scheduling, and firewalls.
  </p>

</section>

            <section class="section">
                <h3 class="section-title">Skills</h3>
                <div class="skill-item">
                    <div class="skill-info"><p>Linux</p><p>65%</p></div>
                    <div class="progress-bar"><div class="progress" style="width: 60%;"></div></div>
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
            </section>
            
            </section>
            <section class="section">
                <h3 class="section-title">Code Skills</h3>
                <div class="skill-item">
                    <div class="skill-info"><p>Go</p><p>65%</p></div>
                    <div class="progress-bar"><div class="progress" style="width: 60%;"></div></div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">Bash<p></p><p>70%</p></div>
                    <div class="progress-bar"><div class="progress" style="width: 70%;"></div></div>
                </div>
                <div class="skill-item">
                    <div class="skill-info"><p>Monitoring</p><p>65%</p></div>
                    <div class="progress-bar"><div class="progress" style="width: 65%;"></div></div>
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
                    <div class="skill-info"><p>Js</p><p>55%</p></div>
                    <div class="progress-bar"><div class="progress" style="width: 55%;"></div></div>
                </div>
            </section>
        `;
  };

  const renderPortfolioPage = async () => {
    // Fetch portfolio data from the Go backend
    const response = await fetch("/api/portfolio");
    const items = await response.json();

    const portfolioItemsHTML = items
      .map(
        (item) => `
            <div class="card">
                <img src="${item.imageUrl}" alt="${item.title}" class="card-image">
                <div class="card-content">
                    <h4 class="card-title">${item.title}</h4>
                    <p class="card-description">${item.description}</p>
                </div>
            </div>
        `
      )
      .join("");

    return `
            <h2 class="page-title">Portfolio</h2>
            <div class="card-grid">${portfolioItemsHTML}</div>
        `;
  };

  const renderBlogPage = async () => {
    // Fetch blog data from the Go backend
    const response = await fetch("/api/blog");
    const posts = await response.json();

    const blogPostsHTML = posts
      .map(
        (post) => `
             <div class="card">
                <img src="${post.imageUrl}" alt="${post.title}" class="card-image">
                <div class="card-content">
                    <p class="card-date">${post.date}</p>
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-description">${post.snippet}</p>
                </div>
            </div>
        `
      )
      .join("");

    return `
            <h2 class="page-title">Blog</h2>
            <div class="card-grid">${blogPostsHTML}</div>
        `;
  };

  const renderContactPage = () => {
    // Add event listener for the form after rendering it
    setTimeout(() => {
      const contactForm = document.getElementById("contactForm");
      if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
      }
    }, 0);

    return `
            <h2 class="page-title">Contact</h2>
            <p><strong>Open for opportunities:</strong> Yes</p>
            <br>
            <form class="contact-form" id="contactForm"action="https://formsubmit.co/kprateek9315@gmail.com" method="POST" >
            <input type="hidden" name="_next" value="https://www.youtube.com/">  
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
            <p id="form-status" style="margin-top: 1rem;"></p>
        `;
  };

  // --- ROUTER & CONTENT LOADING ---

  const pageRenderers = {
    about: renderAboutPage,
    resume: renderResumePage,
    portfolio: renderPortfolioPage,
    blog: renderBlogPage,
    contact: renderContactPage,
  };

  const loadContent = async (page) => {
    // Show a loading indicator (optional)
    contentContainer.innerHTML = "<p>Loading...</p>";

    if (pageRenderers[page]) {
      // Call the appropriate render function (which might be async)
      const content = await pageRenderers[page]();
      contentContainer.innerHTML = content;
    } else {
      contentContainer.innerHTML = "<p>Page not found.</p>";
    }
  };

  const updateActiveLink = (page) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.page === page) {
        link.classList.add("active");
      }
    });
  };

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.closest(".nav-link").dataset.page;
      // Update URL hash for better UX (optional)
      window.location.hash = page;
      updateActiveLink(page);
      loadContent(page);
    });
  });

  // --- INITIAL PAGE LOAD ---

  // Load content based on URL hash or default to 'about'
  const initialPage = window.location.hash.substring(1) || "about";
  updateActiveLink(initialPage);
  loadContent(initialPage);
});
