// Update copyright year
document.getElementById("date").textContent = new Date().getFullYear()

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")
const socialIcons = document.querySelector(".social-icons")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
    socialIcons.style.display = socialIcons.style.display === "flex" ? "none" : "flex"

    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector("i")
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll(".nav-links a")
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = "none"
      socialIcons.style.display = "none"

      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const navbarHeight = document.querySelector(".nav-bar").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add active class to nav links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollPosition = window.scrollY

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector(`.nav-links a[href="#${sectionId}"] div`).classList.add("active")
    } else {
      document.querySelector(`.nav-links a[href="#${sectionId}"] div`).classList.remove("active")
    }
  })
})

// Reveal animations for projects
const revealElements = document.querySelectorAll(".project")

const revealOnScroll = () => {
  const windowHeight = window.innerHeight

  revealElements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top

    if (elementTop < windowHeight - 100) {
      setTimeout(() => {
        element.classList.add("revealed")
      }, index * 200)
    }
  })
}

window.addEventListener("scroll", revealOnScroll)
window.addEventListener("load", revealOnScroll)

