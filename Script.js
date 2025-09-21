document.addEventListener('DOMContentLoaded', () => {
  const timeSpan = document.getElementById('current-time');
  const fadeElements = document.querySelectorAll('.fade-in');
  const wearDisplay = document.getElementById('wear-display');
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCloseBtn = document.getElementById('modal-close');

    // --- Enable JS state ---
  document.body.classList.add('js-enabled')

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
    timeSpan.textContent = timeString;
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
    // all your image paths added here
  ];

  function createGallery() {
    if (wearDisplay) {
        galleryImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Luxury Wear Collection Image';
            wearDisplay.appendChild(img);
        });
    }
  }

    if (wearDisplay) {
    wearDisplay.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        modalImage.src = e.target.src;
        imageModal.classList.add('show');
        modalImage.alt = e.target.alt;
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
  
  // Initial gallery creation
  createGallery();
});
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('js-enabled');
  // ... rest of your script
});


function createGallery() {
  if (wearDisplay) {
    // Add a "loading" class or spinner here
    wearDisplay.innerHTML = '<div class="loading-spinner"></div>';
    
    // Use a timeout to ensure a loading state is displayed
    setTimeout(() => {
      // Clear the loading spinner
      wearDisplay.innerHTML = '';
      
      galleryImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Luxury Wear Collection Image';
        wearDisplay.appendChild(img);
      });
    }, 500); // Wait 500ms before adding images
  }
}
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.25 // Changed from 0.1 to 0.25 for better detection
}