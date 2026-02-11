document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Experience Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const jobContents = document.querySelectorAll('.job-content');

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            jobContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none'; // Ensure hide
            });

            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            // The data-target approach is robust
            const targetId = btn.getAttribute('data-target'); 
            const targetContent = document.querySelector(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                // Small delay to allow display:block to apply before opacity transition
                setTimeout(() => {
                    targetContent.classList.add('active'); 
                }, 10);
            }
        });
    });

    // Initialize Particles.js
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#64ffda"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#64ffda",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.4
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Mobile Menu Toggle (Simple implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle nav display
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100px';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = '#112240';
            navLinks.style.padding = '20px';
            navLinks.style.width = '100%';
            navLinks.style.zIndex = '99';
        }
    });

    // Lightbox Logic with Carousel
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderDots = document.getElementById('slider-dots');
    
    // Project Images Configuration
    // In a real app, this could be dynamic, but for static site we map folders
    const projectImages = {
        'ATLP - ADAFSA': [
            'images/projects/ATLP/Home.png',
            'images/projects/ATLP/Export Request.png',
            'images/projects/ATLP/Import Request.png',
            'images/projects/ATLP/Listing.png',
            'images/projects/ATLP/Register Food Form.png'
        ],
        'EODA': [
            'images/projects/EODA/Dashboard.png',
            'images/projects/EODA/Grid.png',
            'images/projects/EODA/Schedule.png',
            'images/projects/EODA/Settings.png'
        ],
        'PCS': [
            'images/projects/PCS/Login.png',
            'images/projects/PCS/Multi Steps Forms.png',
            'images/projects/PCS/Vessel Reg.png',
            'images/projects/PCS/Voyage.png'
        ],
        'The Platform': [
            'images/projects/Platform/Home.png',
            'images/projects/Platform/Access Management.png',
            'images/projects/Platform/Camunda Workflow.png',
            'images/projects/Platform/Control Room.png',
            'images/projects/Platform/FormIO Builder.png',
            'images/projects/Platform/Microapps.png',
            'images/projects/Platform/Queries.png'
        ],
        'WFoodExpo': [
            'images/projects/WFoodExpo/landing page.jpg',
            'images/projects/WFoodExpo/FB_IMG_1770792684645.jpg'
        ],
        'Wizme': [
            'images/projects/Wizme/Landing Page Hero.png',
            'images/projects/Wizme/Signup.png'
        ]
    };

    let currentProjectImages = [];
    let currentImageIndex = 0;

    // Open Lightbox
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.querySelector('h3').innerText;
            const images = projectImages[projectName];
            
            if (images && images.length > 0) {
                currentProjectImages = images;
                currentImageIndex = 0;
                
                updateLightboxImage();
                updateDots();

                lightbox.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
        });
    });

    function updateLightboxImage() {
        const src = currentProjectImages[currentImageIndex];
        // Handle URL encoding if spaces exist
        lightboxImg.src = src.replace(/ /g, '%20'); 
        
        // Extract filename for caption
        const filename = src.split('/').pop().split('.')[0].replace(/%20/g, ' ');
        captionText.innerText = `${filename} (${currentImageIndex + 1} / ${currentProjectImages.length})`;
    }

    function updateDots() {
        sliderDots.innerHTML = '';
        currentProjectImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentImageIndex) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent closing lightbox
                currentImageIndex = index;
                updateLightboxImage();
                updateDots();
            });
            sliderDots.appendChild(dot);
        });
    }

    // Navigation Controls
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateLightboxImage();
        updateDots();
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateLightboxImage();
        updateDots();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // Close when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });
    }

});