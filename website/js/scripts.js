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

document.addEventListener("DOMContentLoaded", function() {
  setHead();
  setNavLogo();
  setupSidebar();
});