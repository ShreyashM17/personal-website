// static/js/about.js

// Utility to map a number from one range to another
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. GSAP + ScrollTrigger setup
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // ---------- HERO SECTION ANIMATIONS ----------

    const heroSection = document.querySelector('.hero-section');
    const avatar = heroSection ? heroSection.querySelector('img') : null;

    if (heroSection) {
      gsap.from(heroSection, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out'
      });
    }

    if (avatar) {
      gsap.to(avatar, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      heroSection.addEventListener('mousemove', e => {
        const { left, top, width, height } = heroSection.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        const rotY = mapRange(mouseX, 0, width, -15, 15);
        const rotX = mapRange(mouseY, 0, height, 15, -15);

        gsap.to(avatar, {
          rotationY: rotY,
          rotationX: rotX,
          transformPerspective: 500,
          transformOrigin: 'center',
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        gsap.to(avatar, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      });

      heroSection.style.backgroundPosition = '50% 50%';
      heroSection.addEventListener('mousemove', e => {
        const { left, top, width, height } = heroSection.getBoundingClientRect();
        const relX = e.clientX - left;
        const relY = e.clientY - top;
        const moveX = mapRange(relX, 0, width, -20, 20);
        const moveY = mapRange(relY, 0, height, -20, 20);

        gsap.to(heroSection, {
          backgroundPosition: `${50 + moveX / 10}% ${50 + moveY / 10}%`,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        gsap.to(heroSection, {
          backgroundPosition: '50% 50%',
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    }

// ---------- SMOOTH MULTI-LAYER WAVE ANIMATION ----------

const waveContainer = document.querySelector('.relative.overflow-hidden.h-32');
if (waveContainer) {
  // 1. Parallax: move wave container up as you scroll, for depth
  gsap.to(waveContainer, {
    y: -200,  // adjust amount to taste
    ease: 'none',
    scrollTrigger: {
      trigger: waveContainer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // 2. Gentle vertical bob: subtle floating motion
  gsap.to(waveContainer, {
    y: '-=10',       // move up by 10px, then back down
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
  });

  // 3. Front wave morph (wave1)
  const wave1Path = document.querySelector('.wave1 path');
  if (wave1Path) {
    gsap.to(wave1Path, {
      attr: {
        d: `
          M0,100
          C125,150 375,50 500,100
          L500,150
          L0,150
          Z
        `
      },
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

  // 4. Back wave morph (wave2), slightly slower
  const wave2Path = document.querySelector('.wave2 path');
  if (wave2Path) {
    gsap.to(wave2Path, {
      attr: {
        d: `
          M0,120
          C125,170 375,20 500,120
          L500,150
          L0,150
          Z
        `
      },
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
}


    // ---------- “MY WORLD” CARDS ANIMATIONS ----------

    gsap.utils.toArray('.my-world-card').forEach(card => {
      gsap.to(card, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotation: mapRange(Math.random(), 0, 1, -3, 3),
          duration: 0.4,
          ease: 'back.out(1.2)'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    // ---------- “THE CURIOUS MIND” CARDS ANIMATIONS ----------

    gsap.utils.toArray('.curious-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: '0 0 20px rgba(255,255,255,0.2)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    // ---------- TIMELINE ANIMATIONS ----------

    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      const parentBorder = item.closest('.border-l-4');
      if (parentBorder) {
        gsap.from(parentBorder, {
          css: { height: 0 },
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: parentBorder,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // ---------- ABOUT ME SECTION ANIMATIONS ----------

    // Animate heading
    gsap.from('.about-heading', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Animate paragraphs
    gsap.from('.about-paragraph', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Animate list items
    gsap.from('.about-list-item', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      delay: 0.6,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // ---------- FUN FACT CARDS ANIMATIONS ----------
    gsap.utils.toArray('.fun-fact').forEach((fact) => {
      // Fade/slide the card into view when scrolled down enough
      gsap.fromTo(
        fact,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: fact,
            start: 'top 95%',      // Animate when top of card hits 95% down viewport
            toggleActions: 'play none none none',
            once: true,            // Only run once
            onEnter: () => {
              // Safely find the inner <span> that has data-target
              const span = fact.querySelector('span[data-target]');
              if (!span) {
                // If there is no <span data-target="...">, skip counting
                return;
              }
              const target = parseInt(span.getAttribute('data-target'), 10) || 0;
              let count = 0;
              const increment = Math.ceil(target / 60);
              const interval = setInterval(() => {
                count += increment;
                if (count >= target) {
                  span.textContent = target;
                  clearInterval(interval);
                } else {
                  span.textContent = count;
                }
              }, 16); // ~60fps
            },
          },
        }
      );

      // Hover pulse effect on each card
      fact.addEventListener('mouseenter', () => {
        gsap.to(fact, {
          scale: 1.1,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      fact.addEventListener('mouseleave', () => {
        gsap.to(fact, {
          scale: 1,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  } else {
    console.warn('⚠️ GSAP or ScrollTrigger not found. Animations disabled.');
  }

  // ---------- CLICK-TO-COPY EMAIL (OPTIONAL) ----------

  const emailLink = document.querySelector('.click-copy-email');
  if (emailLink) {
    emailLink.addEventListener('click', e => {
      e.preventDefault();
      const emailText = emailLink.textContent.trim();
      navigator.clipboard.writeText(emailText).then(() => {
        gsap.to(emailLink, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        });
      });
    });
  }
});
