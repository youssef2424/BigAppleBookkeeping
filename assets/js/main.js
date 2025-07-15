// Big Apple Bookkeeping - Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const burgerCheckbox = document.getElementById("burger");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function (e) {
      if (e.target.tagName === "LABEL") {
        e.stopPropagation();
      }
      console.log("hello");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    burgerCheckbox.addEventListener("change", function () {
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("active");
      } else {
        scrollToTopBtn.classList.remove("active");
      }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(
    "header nav a, .cta-button a, .hero-content a"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  // Hide all testimonials except the first one
  for (let i = 1; i < testimonials.length; i++) {
    testimonials[i].style.display = "none";
  }

  // Function to show a specific testimonial
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.style.display = "none";
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected testimonial and activate its dot
    testimonials[index].style.display = "block";
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Add click event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });
  });

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showTestimonial(currentSlide);
  }, 5000);

  // Form validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        e.preventDefault();
        alert("Please fill in all required fields.");
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        return false;
      }

      // If using Formspree or similar service, the form will handle the submission
      // This is just for additional validation
      return true;
    });
  }

  // Accordion functionality for FAQ section
  const accordionItems = document.querySelectorAll(".accordion-item");

  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");
      const icon = item.querySelector(".accordion-icon i");

      if (header && content && icon) {
        header.addEventListener("click", () => {
          // Toggle active class
          item.classList.toggle("active");

          // Toggle icon
          if (item.classList.contains("active")) {
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
            content.style.maxHeight = "0";
          }
        });
      }
    });
  }

  // Sticky header effect
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        header.style.background = "rgba(255, 255, 255, 0.95)";
      } else {
        header.style.boxShadow = "none";
        header.style.background = "white";
      }
    });
  }

  // Make phone numbers clickable
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

  if (phoneLinks.length > 0) {
    phoneLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Track phone call clicks if needed
        console.log(
          "Phone call initiated to: " +
            this.getAttribute("href").replace("tel:", "")
        );
      });
    });
  }

  // Make email links clickable
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  if (emailLinks.length > 0) {
    emailLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Track email clicks if needed
        console.log(
          "Email initiated to: " +
            this.getAttribute("href").replace("mailto:", "")
        );
      });
    });
  }

  // Video testimonials play functionality
  const videoPlaceholders = document.querySelectorAll(".video-placeholder");

  if (videoPlaceholders.length > 0) {
    videoPlaceholders.forEach((placeholder) => {
      placeholder.addEventListener("click", function () {
        // This would normally load a video player
        // For now, just show an alert
        alert("Video player would load here in a production environment.");
      });
    });
  }
});
