
// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const navLinks = document.querySelectorAll('nav ul.nav-links li a, #mobile-nav ul li a');
const backToTopBtn = document.querySelector('.back-to-top');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileNav.style.display = menuOpen ? 'flex' : 'none';
  mobileMenuBtn.setAttribute('aria-expanded', menuOpen);
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if(menuOpen) {
      mobileNav.style.display = 'none';
      menuOpen = false;
      mobileMenuBtn.setAttribute('aria-expanded', false);
    }
  });
});

// Navigation active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
function activateNavLink() {
  let scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector('nav ul.nav-links li a[href="#'+sectionId+'"]');
    const mobileNavLink = document.querySelector('#mobile-nav ul li a[href="#'+sectionId+'"]');
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
      mobileNavLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
      mobileNavLink?.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', activateNavLink);

// Back to top button functionality
window.addEventListener('scroll', () => {
  if(window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});
// Skills category tabs
const skillCats = document.querySelectorAll('.skills-category');
const skillGroups = document.querySelectorAll('.skills-group');
skillCats.forEach((cat, index) => {
  cat.addEventListener('click', () => {
    // Update tab states
    skillCats.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-selected', 'false');
      c.setAttribute('tabindex', '-1');
    });
    cat.classList.add('active');
    cat.setAttribute('aria-selected', 'true');
    cat.setAttribute('tabindex', '0');

    // Update skills groups
    skillGroups.forEach(group => {
      group.hidden = true;
      group.classList.remove('active');
    });
    skillGroups[index].hidden = false;
    skillGroups[index].classList.add('active');
  });
  
  cat.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      let newIndex = index + (e.key === 'ArrowRight' ? 1 : -1);
      if(newIndex < 0) newIndex = skillCats.length -1;
      if(newIndex >= skillCats.length) newIndex = 0;
      skillCats[newIndex].focus();
      skillCats[newIndex].click();
    }
  });
});

// Animate skill bars on load and tab change
function animateSkillBars() 
{
  document.querySelectorAll('.skills-group.active .skill-progress').forEach(bar => {
    const prog = bar.getAttribute('data-progress');
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = prog + '%';
    }, 150);
  });
}

window.addEventListener('load', animateSkillBars);
skillCats.forEach(cat => cat.addEventListener('click', animateSkillBars));


// Project filter functionality
// Project Filter Tabs - Same structure as skills section
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Categorize projects
const projects = {
  'web': ['e-commerce', 'hospital-management', 'buy-your-dream-web'],
  'mobile': ['buy-your-dream-web'],
  'api': ['iot-communication-device'],
  'all': Array.from(projectCards).map(card => card.id)
};

filterBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // Update button states - identical to skills section
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('tabindex', '-1');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('tabindex', '0');

    // Filter projects
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || projects[filter].includes(card.id)) {
        card.style.display = 'flex';
        card.classList.add('active');
      } else {
        card.style.display = 'none';
        card.classList.remove('active');
      }
    });

    // Animate the filtered projects
    animateProjectCards();
  });

  // Keyboard navigation - same as skills
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      let newIndex = index + (e.key === 'ArrowRight' ? 1 : -1);
      if (newIndex < 0) newIndex = filterBtns.length - 1;
      if (newIndex >= filterBtns.length) newIndex = 0;
      filterBtns[newIndex].focus();
      filterBtns[newIndex].click();
    }
  });
});

// Animation function matching your CSS hover effects
function animateProjectCards() {
  const visibleCards = document.querySelectorAll('.project-card.active');
  
  visibleCards.forEach((card, i) => {
    // Reset before animating
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'none';
    
    // Animate with delay
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

// Initialize - same pattern as skills
window.addEventListener('DOMContentLoaded', () => {
  // Set IDs for all project cards based on their categories
  document.getElementById('e-commerce-platform').id = 'e-commerce';
  document.getElementById('hospital-management').id = 'hospital-management';
  document.getElementById('iot-device').id = 'iot-communication-device';
  document.getElementById('buy-your-dream-web').id = 'buy-your-dream-web';

  // Activate default filter
  document.querySelector('.filter-btn.active').click();
  
  // Setup hover effects for all cards
  projectCards.forEach(card => {
    const img = card.querySelector('.project-img img');
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 18px 30px #0c2340cc';
      img.style.transform = 'scale(1.08)';
      overlay.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 8px 18px #0c234099';
      img.style.transform = 'scale(1)';
      overlay.style.opacity = '0';
    });
  });
});

// Basic contact form validation (optional)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  let valid = true;
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const input = this.querySelector('#' + id);
    const error = this.querySelector('#' + id + 'Error');
    if(!input.value.trim()) {
      error.textContent = 'This field is required.';
      valid = false;
    } else {
      error.textContent = '';
    }
  });
  if(!valid) {
    e.preventDefault();
  }
});