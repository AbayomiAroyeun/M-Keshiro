document.addEventListener('DOMContentLoaded', () => {
  const timeSpan = document.getElementById('current-time');
  const fadeElements = document.querySelectorAll('.fade-in');
  const wearDisplay = document.getElementById('wear-display');
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCloseBtn = document.getElementById('modal-close');
  const burgerBtn = document.querySelector('.burger');
  const mobileNav = document.getElementById('top-bar');
  const hasSubMenu = document.querySelector('.has-sub > a');
  const subMenu = document.getElementById('submenu');
  const sectionButtons = document.querySelectorAll('.section-btn');

  // --- Enable JS state and cleanup old DOMContentLoaded event ---
  // The single DOMContentLoaded event handles all script initialization.
  // The `document.body.classList.remove('js-enabled')` in the old code was incorrect.
  document.body.classList.add('js-enabled');

  // --- Time Display Function ---
  function updateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = now.toLocaleDateString('en-US', options);
    if (timeSpan) {
      timeSpan.textContent = timeString;
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // --- Scroll Fade-in Observer ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(section => {
    observer.observe(section);
  });

  // --- Wear Display Gallery Logic ---
  const galleryImages = [
    'image/modga1.jpg',
    'image/modga2.jpg',
    'image/modga3.jpg',
    'image/modga4.jpg',
    'image/modga5.jpg',
    'image/modga6.jpg',
    'image/modga7.jpg',
    'image/modga8.jpg'
  ];

  function createGallery(images) {
    if (!wearDisplay) return;

    wearDisplay.innerHTML = '<div class="loading-spinner"></div>';

    setTimeout(() => {
      wearDisplay.innerHTML = '';
      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Luxury Wear Collection Image';
        wearDisplay.appendChild(img);
      });
    }, 500);
  }

  // Initial gallery creation
  createGallery(galleryImages);

  // --- Wear Buttons Logic ---
  const allImages = [...galleryImages]; // Assuming all images are in this array
  const readyImages = galleryImages.slice(0, 4); // Example subset
  const collectionsImages = galleryImages.slice(4, 6); // Example subset
  const customizedImages = galleryImages.slice(6); // Example subset

  sectionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      if (section === 'ready') {
        createGallery(readyImages);
      } else if (section === 'collections') {
        createGallery(collectionsImages);
      } else if (section === 'customized') {
        createGallery(customizedImages);
      }
    });
  });

  // --- Image Modal Logic ---
  if (wearDisplay) {
    wearDisplay.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        modalImage.src = e.target.src;
        modalImage.alt = e.target.alt;
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      imageModal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Mobile Navigation Logic ---
  function toggleMobileNav() {
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true' || false;
    burgerBtn.classList.toggle('active');
    burgerBtn.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', toggleMobileNav);
  }

  // Close mobile menu when a navigation link is clicked
  const navLinks = document.querySelectorAll('#main-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('active') && !link.closest('.has-sub')) {
        toggleMobileNav();
      }
    });
  });

  // --- Submenu Logic ---
  if (hasSubMenu) {
    hasSubMenu.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = hasSubMenu.getAttribute('aria-expanded') === 'true' || false;
      hasSubMenu.setAttribute('aria-expanded', !isExpanded);
      subMenu.classList.toggle('active');
    });
  }
});
