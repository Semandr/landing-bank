'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

///////////////////////////////////////
// Page navigation
// EVENT DELEGATION
//
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// TABBED COMPONENT
//
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // Activete tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');
function handlerHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
}
// Passing arguments into handler
nav.addEventListener('mouseover', handlerHover.bind(0.6));
nav.addEventListener('mouseout', handlerHover.bind(1));

///////////////////////////////////////
// STIKY NAVIGATION: INTERSECTION OBSERVER API
//

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// dynamic calculation of hight of navigation for responsive web-site
function stickyNav(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // hight of the navigation
});
headerObserver.observe(header);

///////////////////////////////////////
// REVEAL SECTIONS: INTERSECTION OBSERVER API
//
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  // stop observing -->
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////////////
// LAZY LOADING IMAGES: INTERSECTION OBSERVER API
//
const imgTarget = document.querySelectorAll('img[data-src]');
function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace 'src' with 'data-src'
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  // stop observing
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// SLIDER
//
function slider() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length - 1;
  let currentSlide = 0;

  function createDots() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }
  function goToSlide(slide) {
    slides.forEach((el, i) => {
      // 0%, 100%, 200%, 300%.....
      el.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }
  function nextSlide() {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', e => {
    // short Circuiting instead of if-else
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();
/*




///////////////////////////////////////
// STIKY NAVIGATION
//
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const observerCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const observerOptions = {
  root: null,
  threshold: 0.1,
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);

//////////////////////////////////////////////
// Selecting, creating and deleting elements
//
// Selecting elements

console.log(document.documentElement); // html (as object)
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // first matches
const allSections = document.querySelectorAll('.section');
console.log(allSections); // return node list
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
const allClasses = document.getElementsByClassName('btn');
console.log(allClasses);
const images = document.images;
console.log(images); // html-collection of images
*/
// Creating and inserting elements
//
/*
// .insertAdjacentHTML
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We are use cookies to improve functionality and analitics.`;
message.innerHTML = `We are use cookies to improve functionality and analitics. <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message)
// header.after(message)

// Delete elements
//
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

//////////////////////////////////////////////
// STYLES, ATTRIBUTES AND CLASSES
//
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 50px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'; // add 40px
console.log(message.style.height); // 90px

//
// WORKING WITH CUSTOM PROPERTIES
//
document.documentElement.style.setProperty('--color-primary', 'rgb(0,100,0)');
console.log(document.documentElement.style.getPropertyValue('--color-primary')); // rgb(0,100,0)

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'Beautiful minimalis logo';

// Non standart
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // 'John'
logo.setAttribute('company', 'Bankist');
console.log(logo.src); // absolute URL
console.log(logo.getAttribute('src')); // relative path

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute URL
console.log(link.getAttribute('href')); // relative

// Data attribute
console.log(logo.dataset.versionNumber); // 3.0

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');


// generate random color
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  // Stop propagation
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
btnScrollTo.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);





//////////////////////////////////////////////
// DOM TRAVERSING
//
const h1 = document.querySelector('h1');
// going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);

const ul = document.querySelector('.nav__links');
console.log(ul); // element itself
console.log(ul.children);
console.log(ul.children[0].children[0].textContent); // 'Features'

// going upwards: parent
console.log(h1.parentNode);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sidewais: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children); // all of the siblings include itself
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});


*/
