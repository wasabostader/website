const WEBSITE_LOGO=null;
const WEBSITE_FAVICON="public/favicon.ico";
const WEBSITE_NAME="Wasabostäder";
const WEBSITE_DESCRIPTION="Wasa Bostäder vill presentera vårt kommande projekt Fängelset 4 i centrala Karlskrona. Fastighet skall genomgå en totalrenovering där vi skall omvandla det befintliga fängelset till Lyxlägenheter.";
const WEBSITE_SLIDESHOW_IMAGES=[
  "public/w-building.png",
  "public/w-bathroom.png",
  "public/w-dining-room.png",
  "public/w-gym.png",
  "public/w-living-room.png",
  "public/w-spa.png"
];

// Slideshow images array
let currentSlide = 0;

function setHead() {
  // set the favicon of the page
  const faviconLink = document.querySelector('link[rel="icon"]');
  if (faviconLink) {
    faviconLink.setAttribute("href", WEBSITE_FAVICON);
  } else {
    // if the favicon link does not exist, create it
    const newFaviconLink = document.createElement('link');
    newFaviconLink.rel = "icon";
    newFaviconLink.href = WEBSITE_FAVICON;
    document.head.appendChild(newFaviconLink);
  }

  // set the title of the page
  document.title = WEBSITE_NAME;

  // set the description of the page
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", WEBSITE_DESCRIPTION);
  } else {
    // if the meta description does not exist, create it
    const newMetaDescription = document.createElement('meta');
    newMetaDescription.name = "description";
    newMetaDescription.content = WEBSITE_DESCRIPTION;
    document.head.appendChild(newMetaDescription);
  }

}

function setNavLogo(){
  const logoLinkElement = document.getElementById("logo");
  const sidebarLogoLinkElement = document.getElementById("sidebar-logo");

  const elements = [logoLinkElement, sidebarLogoLinkElement];

  for (const element of elements) {
    if (element) {
      // set the link to the website name by default
      element.textContent = WEBSITE_NAME;
  
      // if website logo is set, set the contents of the link to the logo
      if (WEBSITE_LOGO) {
        // create an image element
        const logoImageElement = document.createElement("img");
        logoImageElement.src = WEBSITE_LOGO;
        logoImageElement.alt = WEBSITE_NAME;
        element.textContent = ""; // Clear text content
        element.appendChild(logoImageElement);
      }
    }
  }
}

function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const closeSidebar = document.getElementById('close-sidebar');

  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
  }
  function hideSidebar() {
    sidebar.classList.add('-translate-x-full');
  }

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', openSidebar);
  }
  if (closeSidebar && sidebar) {
    closeSidebar.addEventListener('click', hideSidebar);
  }

  // Hide sidebar on click outside (mobile only)
  document.addEventListener('click', function (e) {
    if (
      sidebar &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target) &&
      window.innerWidth < 768
    ) {
      hideSidebar();
    }
  });
}

function setupSlideshow() {
  const slideshowImage = document.getElementById('slideshowImage');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');

  function showSlide(index) {
    currentSlide = (index + WEBSITE_SLIDESHOW_IMAGES.length) % WEBSITE_SLIDESHOW_IMAGES.length;
    slideshowImage.src = WEBSITE_SLIDESHOW_IMAGES[currentSlide];
  }
  
  if (prevSlideBtn && nextSlideBtn && slideshowImage) {
    prevSlideBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
    nextSlideBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
    // Optional: swipe support for mobile
    let startX = null;
    slideshowImage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    slideshowImage.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) {
        showSlide(currentSlide - 1);
      } else if (startX - endX > 50) {
        showSlide(currentSlide + 1);
      }
      startX = null;
    });
  }

  // Mobile zoom functionality replaced with popup modal
  if (slideshowImage) {
    // Create modal elements
    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'slideshow-modal-backdrop';
    modalBackdrop.style.position = 'fixed';
    modalBackdrop.style.top = '0';
    modalBackdrop.style.left = '0';
    modalBackdrop.style.width = '100vw';
    modalBackdrop.style.height = '100vh';
    modalBackdrop.style.background = 'rgba(0,0,0,0.85)';
    modalBackdrop.style.display = 'flex';
    modalBackdrop.style.alignItems = 'center';
    modalBackdrop.style.justifyContent = 'center';
    modalBackdrop.style.zIndex = '9999';
    modalBackdrop.style.visibility = 'hidden';
    modalBackdrop.style.opacity = '0';
    modalBackdrop.style.transition = 'opacity 0.2s';

    const modalImg = document.createElement('img');
    modalImg.id = 'slideshow-modal-img';
    modalImg.style.maxWidth = '90vw';
    modalImg.style.maxHeight = '90vh';
    modalImg.style.borderRadius = '12px';
    modalImg.style.boxShadow = '0 2px 24px 0 rgba(0,0,0,0.5)';
    modalImg.style.background = '#fff';
    modalImg.style.objectFit = 'contain';
    modalImg.alt = 'Slideshow Image';
    modalBackdrop.appendChild(modalImg);
    document.body.appendChild(modalBackdrop);

    function openModal(imgSrc) {
      modalImg.src = imgSrc;
      modalBackdrop.style.visibility = 'visible';
      modalBackdrop.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modalBackdrop.style.opacity = '0';
      setTimeout(() => {
        modalBackdrop.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }, 200);
    }

    // Only open modal if not clicking on arrows
    slideshowImage.addEventListener('click', function (e) {
      // Only open on mobile (max-width: 768px)
      if (window.innerWidth <= 768) {
        openModal(slideshowImage.src);
      }
    });
    // Close modal on backdrop click or ESC
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (modalBackdrop.style.visibility === 'visible' && e.key === 'Escape') closeModal();
    });
    // Prevent scrolling on modal
    modalBackdrop.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, { passive: false });
  }
}
}

document.addEventListener("DOMContentLoaded", function() {
  setHead();
  setNavLogo();
  setupSidebar();
  setupSlideshow();
});