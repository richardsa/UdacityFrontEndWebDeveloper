/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
//

const navList = document.querySelector('#navbar__list');
const headingsArr = Array.from(document.querySelectorAll('section'));

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
const scrollIntoView = (target) => {
  const scrollTarget = document.getElementById(target).offsetTop;
  window.scrollTo({ top: scrollTarget, behavior: 'smooth'});
}

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const intersectionCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-section')
    } else {
      entry.target.classList.remove('active-section')
    }
  });
};


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const buildNav = (elements) => {
    elements.forEach(h => {
      const newElement = document.createElement('li');
      const id = h.getAttribute('id');
      const link = document.createElement('a');
      link.setAttribute('href', '#' + id);
      link.classList.add('menu__link')
      link.textContent = h.getAttribute('data-nav');
      newElement.innerHTML = link.outerHTML;
      navList.appendChild(newElement);
    });
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu on page load
buildNav(headingsArr);



// Scroll to section on link click
// add listeners to nav menu links
document.querySelectorAll('.menu__link').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    // remove hashtag before passing to scrollIntoView function
    const target = event.target.getAttribute('href').split('#')[1];
    scrollIntoView(target);
  })
})

// Set sections as active on scroll
document.querySelectorAll('section').forEach(item => {
  const target = item;
  // increase threshold to prevent multiple sections with active class at the same time
  const options = {
    threshold: 0.5
  }
  const observer = new IntersectionObserver(intersectionCallback, options);

  observer.observe(target);

})
