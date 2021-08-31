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

function scrollIntoView(e){
  e.preventDefault;
  console.log('clicked')
  console.log(e.target.getAttribute('href'));
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(elements){
    elements.forEach(h => {
      const newElement = document.createElement('li');
      var id = h.getAttribute('id');
      var link = document.createElement('a');
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

// Build menu
buildNav(headingsArr);
// Scroll to section on link click
document.getElementById("navbar__list").addEventListener("click", scrollIntoView);
// Set sections as active
