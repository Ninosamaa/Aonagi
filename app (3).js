// Navigation functionality
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navMenu = document.querySelector('.nav-menu');
    this.hamburger = document.querySelector('.hamburger');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    // Mobile menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // Close mobile menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // Handle scroll events for navbar styling and active link highlighting
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }
  
  toggleMobileMenu() {
    if (this.navMenu && this.hamburger) {
      this.navMenu.classList.toggle('active');
      this.hamburger.classList.toggle('active');
      
      // Animate hamburger bars
      const bars = this.hamburger.querySelectorAll('.bar');
      bars.forEach((bar, index) => {
        if (this.hamburger.classList.contains('active')) {
          if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
          if (index === 1) bar.style.opacity = '0';
          if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
          bar.style.transform = 'none';
          bar.style.opacity = '1';
        }
      });
    }
  }
  
  closeMobileMenu() {
    if (this.navMenu && this.hamburger) {
      this.navMenu.classList.remove('active');
      this.hamburger.classList.remove('active');
      
      const bars = this.hamburger.querySelectorAll('.bar');
      bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
      });
    }
  }
  
  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
  
  handleScroll() {
    const scrolled = window.pageYOffset;
    
    if (this.navbar) {
      // Navbar background opacity based on scroll
      if (scrolled > 50) {
        this.navbar.style.background = 'rgba(252, 252, 249, 0.98)';
        this.navbar.style.backdropFilter = 'blur(15px)';
      } else {
        this.navbar.style.background = 'rgba(252, 252, 249, 0.95)';
        this.navbar.style.backdropFilter = 'blur(10px)';
      }
    }
    
    // Update active navigation link
    this.updateActiveNavLink();
  }
  
  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top + window.pageYOffset;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
      
      if (scrollPos >= top && scrollPos <= bottom) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to current link
        if (navLink) navLink.classList.add('active');
      }
    });
  }
  
  handleOutsideClick(e) {
    if (this.navbar && !this.navbar.contains(e.target)) {
      this.closeMobileMenu();
    }
  }
}

// Scroll animations
class ScrollAnimations {
  constructor() {
    this.animatedElements = [];
    this.init();
  }
  
  init() {
    // Create intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      // Observe elements for animation
      this.observeElements();
    }
    
    // Handle scroll for parallax effects
    window.addEventListener('scroll', () => this.handleParallax());
  }
  
  observeElements() {
    const elementsToAnimate = [
      '.character-content',
      '.timeline-item',
      '.achievement-card',
      '.ambition-item',
      '.technique-card',
      '.section-header'
    ];
    
    elementsToAnimate.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (this.observer) {
          this.observer.observe(element);
        }
      });
    });
  }
  
  handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelectorAll('.particle');
    
    // Hero parallax effect
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Particles parallax effect
    particles.forEach((particle, index) => {
      const rate = scrolled * (0.1 + index * 0.05);
      particle.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
    });
  }
}

// Interactive effects
class InteractiveEffects {
  constructor() {
    this.init();
  }
  
  init() {
    // Add hover effects to cards
    this.setupCardHovers();
    
    // Add typing effect to hero title
    this.setupTypingEffect();
    
    // Setup technique cards interactive effects
    this.setupTechniqueEffects();
    
    // Setup timeline interactive effects
    this.setupTimelineEffects();
    
    // Setup image showcase effects
    this.setupImageEffects();
  }
  
  setupCardHovers() {
    const cards = document.querySelectorAll('.achievement-card, .ambition-item, .technique-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        card.style.transition = 'all 0.3s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
      });
    });
  }
  
  setupTypingEffect() {
    const titleElement = document.querySelector('.title-main');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    if (originalText) {
      titleElement.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < originalText.length) {
          titleElement.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Add cursor blink effect temporarily
          titleElement.style.borderRight = '3px solid var(--color-primary)';
          setTimeout(() => {
            titleElement.style.borderRight = 'none';
          }, 2000);
        }
      };
      
      // Start typing effect after a delay
      setTimeout(typeWriter, 500);
    }
  }
  
  setupTechniqueEffects() {
    const techniqueImages = document.querySelectorAll('.sand-breathing-image, .shadow-breathing-image');
    
    techniqueImages.forEach(img => {
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05) rotate(2deg)';
        img.style.filter = 'brightness(1.1) contrast(1.1)';
        img.style.transition = 'all 0.3s ease';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
        img.style.filter = 'none';
      });
    });
  }
  
  setupTimelineEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      const marker = item.querySelector('.timeline-marker');
      const content = item.querySelector('.timeline-content');
      
      item.addEventListener('mouseenter', () => {
        if (marker) {
          marker.style.transform = 'translateX(-50%) scale(1.3)';
          marker.style.boxShadow = '0 0 20px rgba(33, 128, 141, 0.5)';
          marker.style.transition = 'all 0.3s ease';
        }
        if (content) {
          content.style.transform = 'scale(1.02)';
          content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
          content.style.transition = 'all 0.3s ease';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (marker) {
          marker.style.transform = 'translateX(-50%) scale(1)';
          marker.style.boxShadow = 'none';
        }
        if (content) {
          content.style.transform = 'scale(1)';
          content.style.boxShadow = '';
        }
      });
    });
  }
  
  setupImageEffects() {
    // Enhanced effects for character portraits and technique images
    const portraits = document.querySelectorAll('.azura-portrait, .ryoji-portrait, .twins-image-main, .sand-breathing-image, .shadow-breathing-image');
    
    portraits.forEach(img => {
      // Add loading animation
      img.addEventListener('load', () => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        }, 100);
      });
      
      // Add subtle glow effect on hover
      img.addEventListener('mouseenter', () => {
        img.style.filter = 'brightness(1.05) drop-shadow(0 0 20px rgba(33, 128, 141, 0.3))';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.filter = 'none';
      });
    });
  }
}

// Particle system enhancement
class ParticleSystem {
  constructor() {
    this.container = document.querySelector('.particles-container');
    this.particles = [];
    if (this.container) {
      this.init();
    }
  }
  
  init() {
    this.createParticles();
    this.animateParticles();
  }
  
  createParticles() {
    // Add more dynamic particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle dynamic-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: radial-gradient(circle, rgba(196, 181, 138, ${Math.random() * 0.5 + 0.2}) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `;
      
      this.container.appendChild(particle);
      this.particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100
      });
    }
  }
  
  animateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.1;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= window.innerWidth) {
        particle.vx *= -1;
      }
      if (particle.y <= 0 || particle.y >= window.innerHeight) {
        particle.vy *= -1;
      }
      
      // Update position
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
      
      // Fade based on life
      particle.element.style.opacity = Math.max(0, particle.life / 100);
      
      // Reset particle if life is over
      if (particle.life <= 0) {
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
        particle.life = 100;
      }
    });
    
    requestAnimationFrame(() => this.animateParticles());
  }
}

// Theme management
class ThemeManager {
  constructor() {
    this.init();
  }
  
  init() {
    // Detect system theme preference
    this.detectTheme();
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        this.detectTheme();
      });
    }
  }
  
  detectTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-color-scheme', 'light');
    }
  }
}

// Performance optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Lazy load images
    this.setupLazyLoading();
    
    // Optimize scroll events
    this.optimizeScrollEvents();
    
    // Preload critical images
    this.preloadImages();
  }
  
  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  preloadImages() {
    // Preload hero image for better performance
    const heroImage = document.querySelector('.twins-image-main');
    if (heroImage && heroImage.src) {
      const img = new Image();
      img.src = heroImage.src;
    }
  }
  
  optimizeScrollEvents() {
    let ticking = false;
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll event handling is already optimized in other classes
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', optimizedScroll);
  }
}

// Image error handling
class ImageManager {
  constructor() {
    this.init();
  }
  
  init() {
    // Handle image loading errors
    this.setupErrorHandling();
    
    // Add loading states
    this.setupLoadingStates();
  }
  
  setupErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('error', () => {
        // Add error state styling
        img.style.opacity = '0.3';
        img.style.filter = 'grayscale(100%)';
        
        // Add error message overlay
        const container = img.parentElement;
        if (container) {
          const errorDiv = document.createElement('div');
          errorDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            padding: 10px;
            border-radius: 6px;
            font-size: 12px;
            color: var(--color-error);
            text-align: center;
            border: 1px solid var(--color-error);
            z-index: 10;
          `;
          errorDiv.textContent = 'Image indisponible';
          container.style.position = 'relative';
          container.appendChild(errorDiv);
        }
      });
    });
  }
  
  setupLoadingStates() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading spinner
      const container = img.parentElement;
      if (container) {
        const loader = document.createElement('div');
        loader.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-secondary);
          border-top: 3px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          z-index: 5;
        `;
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
        
        container.style.position = 'relative';
        container.appendChild(loader);
        
        img.addEventListener('load', () => {
          loader.remove();
        });
        
        img.addEventListener('error', () => {
          loader.remove();
        });
      }
    });
  }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  try {
    new Navigation();
    new ScrollAnimations();
    new InteractiveEffects();
    new ThemeManager();
    new PerformanceOptimizer();
    new ImageManager();
    
    // Initialize particle system after a small delay for better performance
    setTimeout(() => {
      new ParticleSystem();
    }, 1000);
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Easter egg: Konami code for special effect
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
      konamiCode.push(e.code);
      if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
      }
      
      if (konamiCode.join('') === konamiSequence.join('') && konamiCode.length === konamiSequence.length) {
        // Special effect: enhanced particles
        document.querySelectorAll('.particle').forEach(particle => {
          particle.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%)';
          particle.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        });
        
        // Show special message
        const message = document.createElement('div');
        message.innerHTML = '🌟 Les esprits des ancêtres Aonagi vous saluent! 🌟';
        message.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--color-surface);
          color: var(--color-primary);
          padding: 20px 40px;
          border-radius: 15px;
          font-family: 'Noto Serif JP', serif;
          font-size: 18px;
          border: 2px solid var(--color-primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          z-index: 10000;
          animation: fadeInUp 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
          message.remove();
        }, 3000);
        
        konamiCode = [];
      }
    });
    
    // Ensure images are properly loaded and visible
    const criticalImages = document.querySelectorAll('.twins-image-main, .azura-portrait, .ryoji-portrait, .sand-breathing-image, .shadow-breathing-image');
    criticalImages.forEach(img => {
      if (img.complete) {
        img.dispatchEvent(new Event('load'));
      }
    });
    
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  // Update particle positions on resize
  const particles = document.querySelectorAll('.dynamic-particle');
  particles.forEach(particle => {
    if (parseFloat(particle.style.left) > window.innerWidth) {
      particle.style.left = '0px';
    }
    if (parseFloat(particle.style.top) > window.innerHeight) {
      particle.style.top = '0px';
    }
  });
});

// Export for potential external use
window.AonagiSite = {
  Navigation,
  ScrollAnimations,
  InteractiveEffects,
  ParticleSystem,
  ThemeManager,
  PerformanceOptimizer,
  ImageManager
};