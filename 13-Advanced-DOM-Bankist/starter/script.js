'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/winder viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation
// inefficient since it adds an event listener to all buttons
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. add event listener to common parent element
// 2. determine which element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // element where hte event happened
  // console.log(e.target);

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ---------------------------------------------------------------------
// Elements

// selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
// .insertAdjacentHTML -- see bankist project
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true))
// header.before(message);
// header.after(message);

// delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// ---------------------------------------------------------------------
// Styles attibutes and classes
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.backgroundColor); // works since the style is inline
// console.log(message.style.color); // won't return since its in the css
// console.log(getComputedStyle(message).color); // use this to get css style

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// changes the variable value in the css
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// console.log(logo.designer); // non standard variable so its not supported like this
// console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

// console.log(logo.getAttribute('src'));
// console.log(logo.src);

const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// Data attributes
// get the data-version-number attribute from the HTML
// console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c', 'j');
logo.classList.contains('c', 'j');

// don't use - removes everything and just uses this one class
logo.className = 'jonas';

// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// Events and event handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are mousing over the header');

  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// remove listener after 3 seconds (3000). remove immediately with 1
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 1);

// old school way, generally not used anymore
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are mousing over the header');
// };

// ---------------------------------------------------------------------
// Event propogation in action

// random color
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// nav links
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('LINK', e.target, e.currentTarget);

  // stop propogation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  // console.log('NAV');
  this.style.backgroundColor = randomColor();
  // console.log('NAV', e.target, e.currentTarget);
});

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
