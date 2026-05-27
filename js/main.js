/* ==========================================
   PORTFOLIO INTERACTION SYSTEMS
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE MENU TOGGLE
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. SCROLL HEADER SOLID BACKGROUND
  const header = document.getElementById('myHeader');
  // Check scroll position on load and scroll
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        // Only remove scroll background if not on about/projects/edu/certs pages 
        // which use the scrolled header permanently.
        const currentPath = window.location.pathname;
        const isIndex = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
        if (isIndex) {
          header.classList.remove('scrolled');
        } else {
          header.classList.add('scrolled');
        }
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // 3. PERSISTENT NAV STATE AUTOMATION
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. SPOTLIGHT GLOW EFFECT FOR CARDS
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // 5. PERFORMANT SCROLL REVEAL (IntersectionObserver)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 6. DYNAMIC PROJECTS FILTERING (projects.html specific)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterVal = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterVal === 'all' || itemCategory === filterVal) {
            item.classList.remove('hidden');
            // Subtle entrance timing
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            // Complete hide after transition
            setTimeout(() => {
              item.classList.add('hidden');
            }, 300);
          }
        });
      });
    });
  }

  // 7. CERTIFICATE MODAL VIEWER (certification.html specific)
  const certButtons = document.querySelectorAll('.cert-btn');
  const certModal = document.getElementById('certModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalCloseBtn');
  
  if (certButtons.length > 0 && certModal && modalImage && modalTitle) {
    certButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const imgSrc = btn.getAttribute('data-cert-img');
        const imgTitle = btn.getAttribute('data-cert-title');
        
        modalImage.setAttribute('src', imgSrc);
        modalImage.setAttribute('alt', imgTitle);
        modalTitle.textContent = imgTitle;
        
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock page scroll
      });
    });
    
    // Close modal function
    const closeModal = () => {
      certModal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Release page scroll
    };
    
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    // Close by clicking outside content card
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeModal();
      }
    });
    
    // Close by ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 8. CONTACT FORM SIMULATION (index.html specific)
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select input variables (can be hooked to EmailJS/Formspree in production)
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      console.log('Sending message:', { name, email, subject, message });
      
      // Simulate form processing state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Engineering Transmission...';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show success state
        contactSuccess.style.display = 'block';
        contactForm.reset();
        
        // Hide success alert after 8 seconds
        setTimeout(() => {
          contactSuccess.style.display = 'none';
        }, 8000);
        
        // Scroll to the top of the contact section
        contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    });
  }

  // 9. DYNAMIC TIMELINE SCROLL PATH FILLER (education.html specific)
  const timelineFill = document.getElementById('timelineLineFill');
  if (timelineFill) {
    const animateTimelineFill = () => {
      const timelineContainer = document.querySelector('.timeline-container');
      if (timelineContainer) {
        const rect = timelineContainer.getBoundingClientRect();
        const containerHeight = rect.height;
        // Calculate viewport intersections
        const scrollDistance = window.innerHeight * 0.7 - rect.top;
        
        if (scrollDistance < 0) {
          timelineFill.style.height = '0%';
        } else if (scrollDistance > containerHeight) {
          timelineFill.style.height = '100%';
        } else {
          const fillPercent = (scrollDistance / containerHeight) * 100;
          timelineFill.style.height = `${fillPercent}%`;
        }
      }
    };
    
    window.addEventListener('scroll', animateTimelineFill);
    setTimeout(animateTimelineFill, 100); // Initial trigger
  }

});
