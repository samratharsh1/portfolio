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

// Mobile hamburger toggle
const hamburger = document.querySelector('.hamburger');
const linksContainer = document.getElementById('navLinks');
const nav = document.querySelector('.nav');

if (hamburger && linksContainer) {
  let previousActive = null;

  const getFocusable = (container) => {
    const selectors = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selectors)).filter(el => el.offsetParent !== null);
  };

  const openMenu = () => {
    previousActive = document.activeElement;
    linksContainer.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    nav.classList.add('menu-open');
    // move focus to first focusable element in drawer
    const focusables = getFocusable(linksContainer);
    if (focusables.length) focusables[0].focus();
  };

  const closeMenu = () => {
    linksContainer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('menu-open');
    // restore focus
    if (previousActive) previousActive.focus();
    previousActive = null;
  };

  hamburger.addEventListener('click', () => {
    const isOpen = linksContainer.classList.contains('open');
    if (isOpen) closeMenu(); else openMenu();
  });

  // close menu when a link is clicked
  linksContainer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // key handling: Escape to close, Tab to trap focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (linksContainer.classList.contains('open')) closeMenu();
      return;
    }

    if (e.key === 'Tab' && linksContainer.classList.contains('open')) {
      const focusables = getFocusable(linksContainer);
      if (!focusables.length) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
}

// Make certificate images open the certificate (or image) in a new tab when clicked
document.querySelectorAll('.cert-preview img').forEach(img => {
  // make focusable for keyboard users
  img.setAttribute('tabindex', '0');
  img.setAttribute('role', 'button');
  img.addEventListener('click', () => {
    // try to find a nearby 'View Certificate' link
    const tile = img.closest('.cert-tile');
    if (tile) {
      const view = tile.querySelector('.cert-actions a[href]');
      if (view && view.href) {
        window.open(view.href, '_blank');
        return;
      }
    }
    // fallback: open the image src
    window.open(img.src, '_blank');
  });

  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      img.click();
    }
  });
});
