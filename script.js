// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Work tabs functionality
    const tabButtons = document.querySelectorAll('.work-nav ul li');
    const tabContents = document.querySelectorAll('.work-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.querySelector(`.work-content.${target}`).classList.add('active');
        });
    });
    
    // Search functionality
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) return; // Ignore very short search terms
            
            // Remove previous highlights
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });
            
            // Search in page content
            const contentElements = document.querySelectorAll('p, h2, h3, h4, h5, li');
            let foundCount = 0;
            
            contentElements.forEach(element => {
                const content = element.textContent.toLowerCase();
                
                if (content.includes(searchTerm)) {
                    element.classList.add('search-highlight');
                    foundCount++;
                    
                    // Scroll to first result
                    if (foundCount === 1) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }
            });
            
            // Clear search input
            searchInput.value = '';
            
            // Alert if no results found
            if (foundCount === 0) {
                alert('No results found for: ' + searchTerm);
            }
        });
    }
}); 