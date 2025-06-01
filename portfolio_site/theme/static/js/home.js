document.addEventListener('DOMContentLoaded', () => {
  const tagline = document.getElementById('tagline');
  const phrases = ['Web Developer 💻', 'Designer 🎨', 'Creator 🚀'];
  let phraseIndex = 0;

  const typePhrase = (phrase, index) => {
    let charIndex = 0;
    tagline.textContent = '';
    const type = () => {
      if (charIndex < phrase.length) {
        tagline.textContent += phrase.charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
      } else {
        setTimeout(() => erasePhrase(index), 1500);
      }
    };
    type();
  };

  const erasePhrase = (index) => {
    let charIndex = phrases[index].length;
    const erase = () => {
      if (charIndex > 0) {
        tagline.textContent = tagline.textContent.slice(0, -1);
        charIndex--;
        setTimeout(erase, 50);
      } else {
        phraseIndex = (index + 1) % phrases.length;
        setTimeout(() => typePhrase(phrases[phraseIndex], phraseIndex), 300);
      }
    };
    erase();
  };

  typePhrase(phrases[phraseIndex], phraseIndex);

  // Animate hero section
  gsap.from('#hero-title', { opacity: 0, y: -20, duration: 1 });
  gsap.from('#tagline', { opacity: 0, y: 20, duration: 1, delay: 0.5 });
  gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, delay: 1 });
});
