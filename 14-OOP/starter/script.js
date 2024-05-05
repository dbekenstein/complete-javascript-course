'use strict';

// ---------------------------------------------------
// Constructor functions and hte new operator

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this, use prototypes instead
  //   this.calcAge = function() {
  //     console.log(2037 - this.birthYear);
  //   }
};

const dan = new Person('Dan', 1994);
// console.log(dan);

const doug = new Person('Doug', 1994);
// console.log(doug);

// 1. new empty object is created
// 2. function is called, this = new empty object
// 3. new empty object is linked to a prototype
// 4. function automatically returns object

// console.log(dan instanceof Person);

// ---------------------------------------------------
// Prototypes
// console.log(Person.prototype);
Person.prototype.calcAge = function () {
  //   console.log(2024 - this.birthYear);
};

dan.calcAge();

// console.log(dan.__proto__);
// console.log(dan.__proto__ === Person.prototype);

Person.prototype.species = 'Homo Sapiens';
// console.log(dan.species);

// ---------------------------------------------------
// Prototypal inheritance on built in objects
// console.log(dan.__proto__);
// object.prototype
// console.log(dan.__proto__.__proto__);
// no prototype of object.prototype
// console.log(dan.__proto__.__proto__.__proto__);

// console.log(Person.prototype.constructor);

const arr = [3, 5, 62, 4, 8, 5, 3];
// console.log(arr.__proto__);
// console.log(arr.__proto__.__proto__);

// generally not a good idea. JS could add a function with the same name later on, others on your team could too
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// console.log(arr.unique());

const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

// ---------------------------------------------------
// Coding Challenge #1

// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀

// 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} accelerate to ${this.speed}`);
};

// 3
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} brake to ${this.speed}`);
};

// 4
const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

// car1.accelerate();
// car2.brake();
// car2.brake();
// car1.brake();
// car2.accelerate();

// ---------------------------------------------------
// ES6 Classes
// class expression
// const PersonCL = class {}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }

  // instance methods:
  // these will be on the prototype
  calcAge() {
    console.log(2024 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2024 - this.birthYear;
  }

  // set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method:
  static hey() {
    console.log('Hey there 👋');
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.greet();
// jessica.calcAge();

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

// 1 classes are not hoisted
// 2 classes are first-class citizens
// 3 classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);

// ---------------------------------------------------
// Getters and Setters
// functions that get and set values

const account = {
  owner: 'Dan',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// console.log(account.latest);

account.latest = 50;
// console.log(account.movements);

// console.log(jessica.age);

// ---------------------------------------------------
// Static methods

// Allowed
// Array.from(document.querySelectorAll('h1))

// Not allowed
// [1,2,3,4,5].from

Person.hey = function () {
  console.log('Hey there 👋');
};

// Person.hey();

// not possible
// dan.hey();

// ---------------------------------------------------
// Object.create
// still has prototype inheritance, but different

const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// console.log(steven);
steven.firstName = 'Steven';
steven.birthYear = 2002;
// console.log(steven);
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1982);
// sarah.calcAge();

// ---------------------------------------------------
// Coding Challenge #2

// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀

// 1
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} accelerate to ${this.speed}`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} brake to ${this.speed}`);
    return this;
  }
  // 2
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3
  set speedUS(sp) {
    this.speed = sp * 1.6;
  }
}

const carCl1 = new CarCl('Ford', 120);

// console.log(carCl1.speedUS);
// carCl1.accelerate();
// carCl1.brake();
// console.log(carCl1);

// ---------------------------------------------------
// Inheritance between classes

// Student
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// define person as the prototype of student.
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2002, 'Computer Science');
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);
// console.log(mike.__proto__.__proto__.__proto__);

Student.prototype.constructor = Student;

// ---------------------------------------------------
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// 1
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 0.01;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${
      this.charge * 100
    }%`
  );
};

const tesla = new EV('Tesla', 120, 0.23);

// console.log(tesla);
// tesla.chargeBattery(0.5);
// console.log(tesla);
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();

// ---------------------------------------------------
// Inheritance between Classes

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // always has to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2024 - this.birthYear
      } years old, but as a student I feel more like ${
        2024 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Math');
// console.log(martha);

// martha.greet();
// martha.introduce();
// martha.calcAge();

// ---------------------------------------------------
// Inheritance between classes: object.create

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2008, 'English');

// console.log(jay);
// jay.introduce();
// jay.calcAge();

// ---------------------------------------------------
// Another class examples
class Account {
  // public fields (on instance, not prototype)
  locale = navigator.language;

  // private fields (add #)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // add _ to "protect" the property, doesn't actually stop anything. just a convention to identify fields that should not be changed outside of the object
    // this._movements = [];
    // this.locale = navigator.language;

    // console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      //   console.log(`Loan approved`);
    }
    return this;
  }

  // private methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Dan', 'USD', 7777);
// console.log(acc1);

// Bad IDEA
// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdrawal(140);
// console.log(acc1.getMovements());

acc1.requestLoan(1000);

// acc1.#approveLoan(5);

// we don't want this to be possible
// console.log(acc1.#pin);

// error since #movements is private now
// console.log(acc1.#movements);

// ---------------------------------------------------
// Encapsulation - private class fields and methods
// public fields
// private fields
// public methods
// private methods

// there is also the static versions of each

// ---------------------------------------------------
// Chaining
// need the methods to return the object (return this;)
acc1
  .deposit(100)
  .deposit(500)
  .withdrawal(30)
  .requestLoan(5000)
  .withdrawal(2500);

// console.log(acc1.getMovements());

// ---------------------------------------------------
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// 1
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 0.01;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge * 100
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 0.23);

console.log(rivian);

rivian.accelerate().brake().brake().accelerate().chargeBattery(0.5);
