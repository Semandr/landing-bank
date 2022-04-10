'use strict';
/*
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

//////////////////////////////////////////////
// Selecting, creating and deleting elements
//
// Selecting elements
/*
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
*/