/**
 * Aura Welcome Page - Interactive Logic & Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const dynamicGreeting = document.getElementById("dynamicGreeting");
  const liveClock = document.getElementById("liveClock");
  const currentYearSpan = document.getElementById("currentYear");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const toastContainer = document.getElementById("toastContainer");

  // Personalization elements
  const visitorNameInput = document.getElementById("visitorNameInput");
  const applyNameBtn = document.getElementById("applyNameBtn");
  const avatarInitial = document.getElementById("avatarInitial");
  const cardGreetingTitle = document.getElementById("cardGreetingTitle");
  const cardGreetingMsg = document.getElementById("cardGreetingMsg");
  const nextQuoteBtn = document.getElementById("nextQuoteBtn");
  const quoteBox = document.getElementById("quoteBox");

  // Modal elements
  const contactModal = document.getElementById("contactModal");
  const openContactModal = document.getElementById("openContactModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalForm = document.getElementById("modalForm");
  const learnMoreBtn = document.getElementById("learnMoreBtn");

  // Newsletter form
  const subscribeForm = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("emailInput");
  const formFeedback = document.getElementById("formFeedback");

  // Set Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light) with LocalStorage
     -------------------------------------------------------------------------- */
  const savedTheme = localStorage.getItem("aura_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
  } else {
    body.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("aura_theme", newTheme);
    showToast(`Switched to ${newTheme} mode 🌓`);
  });

  /* --------------------------------------------------------------------------
     2. Live Clock & Time-based Greeting
     -------------------------------------------------------------------------- */
  function updateTimeAndGreeting() {
    const now = new Date();
    const hours = now.getHours();

    // Time-of-day greeting
    let greeting = "Welcome";
    if (hours >= 5 && hours < 12) {
      greeting = "Good morning";
    } else if (hours >= 12 && hours < 17) {
      greeting = "Good afternoon";
    } else if (hours >= 17 && hours < 21) {
      greeting = "Good evening";
    } else {
      greeting = "Good night";
    }

    if (dynamicGreeting) {
      dynamicGreeting.textContent = greeting;
    }

    if (liveClock) {
      liveClock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }
  }

  updateTimeAndGreeting();
  setInterval(updateTimeAndGreeting, 1000);

  /* --------------------------------------------------------------------------
     3. Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Navigation ScrollSpy
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Interactive Greeting Personalization
     -------------------------------------------------------------------------- */
  function applyVisitorName() {
    const name = visitorNameInput.value.trim();
    if (!name) {
      showToast("Please enter a name first! 😊");
      return;
    }

    const initial = name.charAt(0).toUpperCase();
    avatarInitial.textContent = initial;
    cardGreetingTitle.textContent = `Welcome, ${name}! 👋`;
    cardGreetingMsg.textContent = `It is wonderful to have you here, ${name}. Enjoy exploring this space crafted just for you!`;

    // Also update hero dynamic greeting
    dynamicGreeting.textContent = `Hello, ${name}`;

    showToast(`Personalized for ${name}! ✨`);
  }

  applyNameBtn.addEventListener("click", applyVisitorName);
  visitorNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyVisitorName();
    }
  });

  /* --------------------------------------------------------------------------
     6. Welcome Quotes Generator
     -------------------------------------------------------------------------- */
  const quotes = [
    { text: "Every great journey begins with a warm welcome.", author: "Unknown" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { text: "Make each day your masterpiece.", author: "John Wooden" },
    { text: "Small steps in the right direction can turn out to be the biggest step of your life.", author: "Anonymous" }
  ];

  let currentQuoteIndex = 0;
  if (nextQuoteBtn && quoteBox) {
    nextQuoteBtn.addEventListener("click", () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      const quote = quotes[currentQuoteIndex];
      const quoteParagraph = quoteBox.querySelector(".quote-text");

      quoteParagraph.style.opacity = 0;
      setTimeout(() => {
        quoteParagraph.textContent = `"${quote.text}" — ${quote.author}`;
        quoteParagraph.style.opacity = 1;
      }, 200);
    });
  }

  /* --------------------------------------------------------------------------
     7. Modal Dialog Logic
     -------------------------------------------------------------------------- */
  function openModal() {
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    contactModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (openContactModal) {
    openContactModal.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal.classList.contains("active")) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("modalName").value;
      closeModal();
      modalForm.reset();
      showToast(`Thank you, ${name}! Your welcome note has been sent. 🚀`);
    });
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
        showToast("Here are the core highlights! 🌟");
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. Newsletter Subscription
     -------------------------------------------------------------------------- */
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (email) {
        formFeedback.textContent = "✓ You are subscribed! Welcome to our inner circle.";
        formFeedback.className = "form-feedback success";
        emailInput.value = "";
        showToast("Subscribed successfully! 💌");

        setTimeout(() => {
          formFeedback.textContent = "";
        }, 5000);
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. Toast Notification System
     -------------------------------------------------------------------------- */
  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span>🔔</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     10. Ambient Canvas Animation (Gentle Floating Starfield/Constellation)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById("ambientCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const particleCount = 45;
    let mouse = { x: null, y: null, radius: 120 };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interactive mouse hover reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const fx = (dx / dist) * force * 1.5;
            const fy = (dy / dist) * force * 1.5;
            this.x -= fx;
            this.y -= fy;
          }
        }
      }

      draw() {
        const isDark = body.getAttribute("data-theme") === "dark";
        ctx.fillStyle = isDark ? "rgba(168, 85, 247, 0.6)" : "rgba(99, 102, 241, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const isDark = body.getAttribute("data-theme") === "dark";
      const lineColor = isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(79, 70, 229, 0.06)";

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }
});
