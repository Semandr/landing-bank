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
const nav = document.querySelector('.nav__links');
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

///////////////////////////////////////////
/*





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
