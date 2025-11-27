// ============================================
// COMPONENT LOADER
// ============================================

async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component from ${componentPath}:`, error);
  }
}

// Load header and footer components
document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('header-component', 'components/header.html');
  await loadComponent('footer-component', 'components/footer.html');
  
  // Initialize mobile menu after header is loaded
  initMobileMenu();
});

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.style.display = 
        mobileMenu.style.display === 'block' ? 'none' : 'block';
      
      // Animate hamburger icon
      mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileMenuToggle.classList.remove('active');
      });
    });
  }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar?.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar?.classList.contains('scroll-down')) {
    // Scroll down
    navbar?.classList.remove('scroll-up');
    navbar?.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar?.classList.contains('scroll-down')) {
    // Scroll up
    navbar?.classList.remove('scroll-down');
    navbar?.classList.add('scroll-up');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const cards = document.querySelectorAll('.service-card, .service-card-large');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }, 500);
});

// ============================================
// CTA BUTTONS INTERACTION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const ctaButtons = document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // You can add actual functionality here
      console.log('Button clicked:', button.textContent);
    });
  });
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
  button {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .navbar.scroll-down {
    transform: translateY(-100%);
  }
  
  .navbar.scroll-up {
    transform: translateY(0);
  }
  
  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;
document.head.appendChild(style);

// ============================================
// FORM HANDLING (if needed)
// ============================================

function handleFormSubmit(e) {
  e.preventDefault();
  // Add your form submission logic here
  console.log('Form submitted');
}

// ============================================
// PERFORMANCE: Lazy load images
// ============================================

if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ============================================
// BENTO GRID SCROLL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Create Intersection Observer for bento grid items
  const bentoObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add reveal class with delay based on data attribute
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, delay);
        
        // Unobserve after animation to improve performance
        bentoObserver.unobserve(entry.target);
      }
    });
  }, bentoObserverOptions);

  // Observe all scroll-reveal elements
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  scrollRevealElements.forEach(element => {
    bentoObserver.observe(element);
  });

  // Add stagger animation to stats and approach items
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    statObserver.observe(card);
  });

  // Animate approach items
  const approachItems = document.querySelectorAll('.approach-item');
  approachItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    
    const approachObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          approachObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    approachObserver.observe(item);
  });

  // Animate tech tags
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `all 0.4s ease ${index * 0.05}s`;
    
    const techObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
          techObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    techObserver.observe(tag);
  });

  // Animate metric items with counter effect
  const metricItems = document.querySelectorAll('.metric-item');
  metricItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.15}s`;
    
    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate the numbers
          const valueElement = entry.target.querySelector('.metric-value');
          if (valueElement) {
            const text = valueElement.textContent;
            const hasPercent = text.includes('%');
            const hasX = text.includes('x');
            const numericValue = parseFloat(text);
            
            if (!isNaN(numericValue)) {
              animateValue(valueElement, 0, numericValue, 1500, hasPercent, hasX);
            }
          }
          
          metricObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    metricObserver.observe(item);
  });
});

// Helper function to animate numbers
function animateValue(element, start, end, duration, hasPercent = false, hasX = false) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * easeOutQuart;
    
    let displayValue = Math.floor(current);
    if (end % 1 !== 0) {
      displayValue = current.toFixed(1);
    }
    
    element.textContent = displayValue + (hasPercent ? '%' : '') + (hasX ? 'x' : '');
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end + (hasPercent ? '%' : '') + (hasX ? 'x' : '');
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================
// PARALLAX EFFECT FOR HERO SECTIONS
// ============================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const caseStudyHero = document.querySelector('.case-study-hero .hero-content');
  
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / 500);
  }
  
  if (caseStudyHero) {
    caseStudyHero.style.transform = `translateY(${scrolled * 0.4}px)`;
    caseStudyHero.style.opacity = 1 - (scrolled / 600);
  }
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log(
  '%c Boiyelove International LLC ',
  'background: #191937; color: #FFD700; font-size: 16px; padding: 10px; font-weight: bold;'
);
console.log(
  '%c Professional IT Solutions ',
  'background: #667eea; color: white; font-size: 12px; padding: 5px;'
);