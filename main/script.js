document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const mainNav = document.querySelector(".main-nav")
  
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active")
      })
    }
  
    // Search functionality
    const searchForm = document.querySelector(".search-form")
    const searchInput = document.getElementById("searchInput")
    const searchResults = document.getElementById("searchResults")
  
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        if (searchInput.value.trim()) {
          performSearch(searchInput.value.trim())
        }
      })
    }
  
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        if (this.value.trim().length > 2) {
          performSearch(this.value.trim())
        } else {
          searchResults.classList.remove("active")
        }
      })
  
      // Close search results when clicking outside
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
          searchResults.classList.remove("active")
        }
      })
    }
  
    function performSearch(query) {
      // Sample search data (in a real app, this would come from an API)
      const searchData = [
        {
          title: "The Shawshank Redemption",
          year: "1994",
          type: "Movie",
          image:
            "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg",
        },
        {
          title: "The Godfather",
          year: "1972",
          type: "Movie",
          image:
            "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR1,0,380,562_.jpg",
        },
        {
          title: "The Dark Knight",
          year: "2008",
          type: "Movie",
          image:
            "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
        },
        {
          title: "Game of Thrones",
          year: "2011-2019",
          type: "TV Series",
          image:
            "https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_QL75_UX380_CR0,4,380,562_.jpg",
        },
        {
          title: "Breaking Bad",
          year: "2008-2013",
          type: "TV Series",
          image:
            "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,1,380,562_.jpg",
        },
        {
          title: "Leonardo DiCaprio",
          year: "",
          type: "Actor",
          image:
            "https://m.media-amazon.com/images/M/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTcwMjkwMjYzMw@@._V1_QL75_UX214_CR0,0,214,317_.jpg",
        },
      ]
  
      // Filter results based on query
      const filteredResults = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()),
      )
  
      // Display results
      if (filteredResults.length > 0) {
        searchResults.innerHTML = ""
  
        filteredResults.forEach((result) => {
          const resultItem = document.createElement("div")
          resultItem.className = "search-result-item"
          resultItem.innerHTML = `
                      <img src="${result.image}" alt="${result.title}">
                      <div class="search-result-info">
                          <div class="search-result-title">${result.title}</div>
                          <div class="search-result-meta">${result.year} | ${result.type}</div>
                      </div>
                  `
          searchResults.appendChild(resultItem)
        })
  
        searchResults.classList.add("active")
      } else {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>'
        searchResults.classList.add("active")
      }
    }
  
    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
  
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Theme toggle
    const themeToggleBtn = document.getElementById("themeToggleBtn")
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light")
  
    // Apply the current theme
    if (currentTheme === "dark") {
      document.body.classList.add("dark-mode")
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'
    }
  
    // Toggle theme on button click
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode")
  
      if (isDark) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }
    })
  
    // Trailer modal functionality
    const trailerLinks = document.querySelectorAll(".watch-trailer")
    const trailerModal = document.getElementById("trailerModal")
    const trailerFrame = document.getElementById("trailerFrame")
    const closeModal = document.querySelector(".close-modal")
  
    trailerLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const trailerUrl = this.getAttribute("data-trailer")
        if (trailerUrl) {
          trailerFrame.src = trailerUrl
          trailerModal.style.display = "block"
          document.body.style.overflow = "hidden" // Prevent scrolling
        }
      })
    })
  
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        trailerModal.style.display = "none"
        trailerFrame.src = ""
        document.body.style.overflow = "" // Re-enable scrolling
      })
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === trailerModal) {
        trailerModal.style.display = "none"
        trailerFrame.src = ""
        document.body.style.overflow = "" // Re-enable scrolling
      }
    })
  
    // User authentication
    const signInBtn = document.getElementById("signInBtn")
    const signOutBtn = document.getElementById("signOutBtn")
  
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("current_user"))
  
    if (currentUser) {
      if (signInBtn) signInBtn.style.display = "none"
      if (signOutBtn) signOutBtn.style.display = "inline-block"
  
      // Update UI for logged-in user
      updateUserUI(currentUser)
    }
  
    // Sign out functionality
    if (signOutBtn) {
      signOutBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("current_user")
        window.location.reload()
      })
    }
  
    function updateUserUI(user) {
      const watchlistLink = document.querySelector(".watchlist")
      if (watchlistLink) {
        watchlistLink.innerHTML = `<i class="fas fa-bookmark"></i> ${user.name}'s Watchlist`
      }
  
      // Show login success message
      showLoginSuccess(user.name)
    }
  
    function showLoginSuccess(username) {
      const successDiv = document.createElement("div")
      successDiv.className = "login-success"
      successDiv.style.position = "fixed"
      successDiv.style.top = "80px"
      successDiv.style.right = "20px"
      successDiv.style.backgroundColor = "var(--imdb-yellow)"
      successDiv.style.color = "var(--imdb-black)"
      successDiv.style.padding = "10px 20px"
      successDiv.style.borderRadius = "4px"
      successDiv.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"
      successDiv.style.zIndex = "1001"
      successDiv.style.animation = "fadeInOut 3.5s forwards"
      successDiv.textContent = `Welcome back, ${username}!`
  
      document.body.appendChild(successDiv)
  
      // Add animation style
      const style = document.createElement("style")
      style.textContent = `
              @keyframes fadeInOut {
                  0% { opacity: 0; transform: translateY(-20px); }
                  10% { opacity: 1; transform: translateY(0); }
                  90% { opacity: 1; transform: translateY(0); }
                  100% { opacity: 0; transform: translateY(-20px); }
              }
          `
      document.head.appendChild(style)
  
      // Remove the element after animation completes
      setTimeout(() => {
        successDiv.remove()
      }, 3500)
    }
  })
  
  