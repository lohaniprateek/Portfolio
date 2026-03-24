document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("page-content");
  const navLinks = document.querySelectorAll(".nav-link");

  // --- TEMPLATE FUNCTIONS ---

  const renderAboutPage = () => {
    return `
      <h2 class="page-title">About Me</h2>
      <section class="section">
          <p class="timeline-description"> <!-- Using a more generic class for styling -->
                    I’m a DevOps and Cloud enthusiast who genuinely loves working with Linux systems and constantly evolving my skills around DevOps, cloud, and infrastructure automation.<br><br>

                    I enjoy learning networking concepts, exploring Linux internals, and experimenting with modern DevOps tools — usually on Arch Linux (btw 😉).<br><br>
                    
                    My daily practice often includes writing shell scripts to automate setups, streamline workflows, and make systems cleaner and more efficient.<br><br>
                    
                    I’m currently building a custom minimal development setup  <a href="https://github.com/lohaniprateek/Tpac" >(TPAC)</a> with dwm and other suckless tools, focused on performance, simplicity, and full control over my environment.<br><br>
                    
                    I also write blogs where I share tech tips, experiments, and lessons from my hands-on experience.<br><br>
                    
                    Always learning. Always building. 
      </p>
      </section>
      <section class="section">
          <h3 class="section-title">What I'm Doing</h3>
          <div class="card-grid">
              <div class="card"> <!-- Removed 'card-bgi' as it's not defined -->
                  <div class="card-content">
                      <h4 class="card-title">DevOps</h4>
                         <p class="card-description">Automating and streamlining operational processes while building and maintaining tools for deployment, monitoring, and system reliability..</p>
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
      <h4 class="timeline-title">DevOps Engineer (Intern) - Qappa Labs</h4>
      <p class="timeline-date">Present</p>
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
              <div class="timeline-item"></div>
                  <h4 class="timeline-title">Full Stack Web Development Bootcamp (Udemy)</h4>
                  <p class="timeline-date">Completed 2024</p>
                  <p class="timeline-description">Covered HTML, CSS, JavaScript, Node.js, Express.js, React, PostgreSQL, and Git.</p>
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
    // This function remains the same
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
    // This function remains the same
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
    return `
            <h2 class="page-title">Contact</h2>
            <p><strong>Open for opportunities:</strong> Yes</p>
            <br>
            <form class="contact-form" action="https://formsubmit.co/kprateek9315@gmail.com" method="POST">
                <!-- This hidden input redirects the user to your thank you page after submission -->
                <input type="hidden" name="_next" value="https://prateek-kumar-protfolio.onrender.com/thankyou.html">  
                
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
            <!-- The status paragraph is no longer needed as we are not using JS for submission status -->
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

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.closest(".nav-link").dataset.page;
      window.location.hash = page;
      updateActiveLink(page);
      loadContent(page);
    });
  });

  const initialPage = window.location.hash.substring(1) || "about";
  updateActiveLink(initialPage);
  loadContent(initialPage);
});
