 document.addEventListener('DOMContentLoaded', () => {
  // Stagger fade-in for each project card
  gsap.from('.projects-card', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out'
  });
});
