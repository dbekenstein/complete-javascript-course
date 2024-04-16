'use strict';

// ----------------------------------------------------------------------
// Default Values

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = { flightNum, numPassengers, price };
  console.log(booking);
  bookings.push(booking);
};
/*
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);
// undefined to skip a variable
createBooking('LH123', undefined, 500);
*/
// ----------------------------------------------------------------------
// Passing Arguments
const flight = 'LH234';
const dan = {
  name: 'Dan Bekenstein',
  passport: 2341230759345,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 2341230759345) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, dan);
// console.log(flight);
// console.log(dan);

// when passing an object, it is actually using that object. Changes to it in the function will apply
// when passing a string, it is creating a copy of that string. Changes to it will not apply to the original value

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};

// newPassport(dan);
// checkIn(flight, dan);
// console.log(dan);

// ----------------------------------------------------------------------
// First-class and higher order functions
// First-Class Functions
// -- functions are treated as simple values
// -- functions are another type of object
// -- can return functions from functions
// -- can call methods on functions

// Higher-Order Functions
// -- function that receives another function as a argument, that returns a new function, or both
// -- ex: addEventListener - receives an action ('click') and a function

// ----------------------------------------------------------------------
// Functions accepting callback functions

// take a string, removes spaces and changes to lowercase
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  // console.log(`Original string: ${str}`);
  // console.log(`Transformed string: ${fn(str)}`);
  // console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// Callback is a function passed as an argument to another function
// JS uses callbacks all the time
// high5 is the callback in this example
const high5 = function () {
  console.log('🙌');
};
// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam', 'Dan'].forEach(high5);

// ----------------------------------------------------------------------
// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
// greeterHey('Dan');

// greet('Hello')('Dan');

// As an Arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
// greet2('Hi')('Dan');

// ----------------------------------------------------------------------
// The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    // console.log(
    //   `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    // );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Dan Bekenstein');
lufthansa.book(839, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// doesn't work because of the this keyword
// book(23, 'Sarah Jones');

// Call method - first argument is used as the this keyword
book.call(eurowings, 23, 'Sarah Jones');
// console.log(eurowings);
book.call(lufthansa, 288, 'Mary Cooper');
// console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 512, 'Dave Bell');
// console.log(swiss);

// Apply method -- apply to an array
const flightData = [512, 'George Cooper'];
book.apply(swiss, flightData);
// console.log(swiss);

book.call(swiss, ...flightData);

// ----------------------------------------------------------------------
// Bind Method
// book.call(eurowings, 23, 'Sarah Jones');
// changes what is reference in the this keyword
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Sarah Smith');

// set a argument in hte bind
// ex: for a specific flight number 23
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Dan B');
console.log(eurowings);

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// by default, the this for an event listener is the element being listened to
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// null since htere is no this being overwritten
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * .23
console.log(addVAT(100));

// Same solution returning function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(200));

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
