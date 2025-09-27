// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    const icon = card.querySelector('.project-icon');
    if (icon) {
      icon.style.transform = 'scale(1.1) rotate(360deg)';
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    const icon = card.querySelector('.project-icon');
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0)';
    }
  });
});

// Project links interaction
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const icon = link.querySelector('i');
    if (icon) {
      icon.style.transform = 'translateX(5px)';
    }
  });

  link.addEventListener('mouseleave', () => {
    const icon = link.querySelector('i');
    if (icon) {
      icon.style.transform = 'translateX(0)';
    }
  });
});

// Handle active navigation state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav .links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});
