// Scroll Animation Observer
(function() {
  'use strict';

  // Intersection Observer configuration
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create the observer
  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optionally unobserve after animation
        // scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Function to initialize animations
  function initScrollAnimations() {
    // Select all elements with animation classes
    const animateElements = document.querySelectorAll(
      '.animate-on-scroll, .fade-in, .slide-in-left, .slide-in-right, .scale-in'
    );

    // Observe each element
    animateElements.forEach(element => {
      scrollObserver.observe(element);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  // Re-initialize on dynamic content changes (optional)
  window.reinitScrollAnimations = initScrollAnimations;
})();
