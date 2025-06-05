 // Sample event data
        const eventsData = [
            {
                id: 1,
                name: "Tech Innovation Summit 2025",
                date: "June 15, 2025",
                time: "9:00 AM - 5:00 PM",
                location: "SEECS Seminal Hall NUST Islamabad",
                description: "Join industry leaders for a day of cutting-edge technology discussions, networking, and innovation showcases. Discover the latest trends in AI, blockchain, and digital transformation."
            },
            {
                id: 2,
                name: "Summer Music Festival",
                date: "June 20-22, 2025",
                time: "6:00 PM - 11:00 PM",
                location: "Water Park Lahore",
                description: "Experience three days of incredible live music featuring local and international artists across multiple genres. Food trucks, craft vendors, and family-friendly activities included."
            },
            {
                id: 3,
                name: "Startup Pitch Competition",
                date: "June 25, 2025",
                time: "2:00 PM - 6:00 PM",
                location: "NSTP NUST Islamabad",
                description: "Watch promising startups pitch their ideas to investors and industry experts. Network with entrepreneurs, mentors, and potential collaborators in the startup ecosystem."
            },
            {
                id: 4,
                name: "Art & Culture Exhibition",
                date: "June 28, 2025",
                time: "10:00 AM - 8:00 PM",
                location: "PNCA Islamabad",
                description: "Explore contemporary art from emerging local artists. Interactive installations, live painting demonstrations, and workshops for all skill levels."
            },
            {
                id: 5,
                name: "Community Food Festival",
                date: "July 1, 2025",
                time: "12:00 PM - 9:00 PM",
                location: "F9 Park Islamabad",
                description: "Celebrate diverse cuisines from around the world. Local restaurants, food trucks, cooking demonstrations, and family entertainment in a vibrant community setting."
            }
        ];

        let filteredEvents = [...eventsData];

        // Function to render events
        function renderEvents(events) {
            const container = document.getElementById('eventsContainer');
            const noResults = document.getElementById('noResults');
            
            if (events.length === 0) {
                container.innerHTML = '';
                noResults.classList.add('show');
                return;
            }
            
            noResults.classList.remove('show');
            container.innerHTML = events.map(event => `
                <div class="col-lg-6 col-xl-4">
                    <div class="event-card">
                        <h3 class="event-title">${event.name}</h3>
                        <div class="event-meta">
                            <div class="event-meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>${event.date}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                        <p class="event-description">${event.description}</p>
                        <button class="register-btn" onclick="registerEvent('${event.name}')">
                            Register Now
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Search functionality
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        function searchEvents(query) {
            const loading = document.getElementById('loading');
            
            if (query.trim() === '') {
                filteredEvents = [...eventsData];
                renderEvents(filteredEvents);
                return;
            }
            
            // Show loading animation
            loading.classList.add('show');
            
            // Simulate API call delay
            setTimeout(() => {
                filteredEvents = eventsData.filter(event =>
                    event.name.toLowerCase().includes(query.toLowerCase()) ||
                    event.description.toLowerCase().includes(query.toLowerCase()) ||
                    event.location.toLowerCase().includes(query.toLowerCase())
                );
                
                loading.classList.remove('show');
                renderEvents(filteredEvents);
            }, 500);
        }

        // Event registration handler
        function registerEvent(eventName) {
            // Animate button
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = '';
            }, 150);
            
            // Show success message
            const originalText = event.target.textContent;
            event.target.textContent = 'Registered! ✓';
            event.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                event.target.textContent = originalText;
                event.target.style.background = '';
            }, 2000);
            
            console.log(`Registered for: ${eventName}`);
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Render initial events
            renderEvents(eventsData);
            
            // Setup search functionality
            const searchInput = document.getElementById('searchInput');
            const debouncedSearch = debounce(searchEvents, 300);
            
            searchInput.addEventListener('input', function(e) {
                debouncedSearch(e.target.value);
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Navbar background change on scroll
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                }
            });
            
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, observerOptions);
            
            // Observe event cards for scroll animations
            setTimeout(() => {
                document.querySelectorAll('.event-card').forEach(card => {
                    observer.observe(card);
                });
            }, 100);
        });

        