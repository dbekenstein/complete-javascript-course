'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displayMovements(movements, sort = false) {
  // remove what is in the containerMovements
  containerMovements.innerHTML = '';

  // if sort is true, sort it. Sort will change the array, so slice first to avoid that
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov < 0 ? 'withdrawal' : 'deposit';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}
    </div>
      <div class="movements__value">${mov}</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    // if bank only provided interest if it would be at least 1 dollar
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
createUserNames(accounts);
// console.log(accounts);

const updateUI = function (account) {
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  // ?. checks if the currentAccount exists first
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

let transferTo;
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  transferTo = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    transferTo &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    transferTo !== currentAccount
  ) {
    transferTo.movements.push(amount);
    currentAccount.movements.push(-amount);

    updateUI(currentAccount);
  }
});

// Only grant loan if one deposit with 10% of loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(acc => acc === currentAccount);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// --------------------------------------------------------------------------
// SIMPLE ARRAY METHODS
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// Creates new arr
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1)); // - starts from the end. -1 will give the last value
console.log(arr.slice(1, -2));
console.log(arr.slice());

// SPLICE
// mutates the original array
console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);

// REVERSE
// mutates
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// does not mutate
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
*/

// --------------------------------------------------------------------------
// The new at method
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// get value of last position
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('dan'.at(0));
*/

// --------------------------------------------------------------------------
// FOR EACH METHOD

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// print message for each deposit/withrawal
/*
// user for of
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// using foreach
console.log(`-------- FOREACH --------`);
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
*/

// --------------------------------------------------------------------------
// forEach with Maps and Sets

// MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
/*
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/
// --------------------------------------------------------------------------
// Bankist app

// --------------------------------------------------------------------------
// Coding Challenge #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function checkDogs(dogsJulia, dogsKate) {
  const correctDogsJulia = dogsJulia.slice(1, 3);
  const dogs = [...correctDogsJulia, ...dogsKate];
  // const dogs = correctDogsJulia.concat(dogsKate);
  dogs.forEach(function (age, i) {
    const text =
      age >= 3 ? `an adult, and is ${age} years old` : `is still a puppy 🐶`;
    console.log(`Dog number ${i + 1} ${text}`);
  });
}
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('------------------------------------------------');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// --------------------------------------------------------------------------
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

*/
const calcAverageHumanAge = function (ages) {
  const humanYears = ages
    .map(function (age, i) {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter(function (humanAge, i) {
      return humanAge >= 18;
    });
  const averageYears =
    humanYears.reduce(function (acc, humanAge) {
      return acc + humanAge;
    }, 0) / humanYears.length;
  return averageYears;
};

// CHALLENGE 3
const calcAverageHumanAge1 = function (ages) {
  const averageAge = ages
    .map(function (age, i) {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter(function (humanAge, i) {
      return humanAge >= 18;
    })
    .reduce(function (acc, humanAge, i, arr) {
      return acc + humanAge / arr.length;
    }, 0);
  return averageAge;
};
// console.log(calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]));

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
// --------------------------------------------------------------------------
// MAP
// apply a function to an each value in an array and return a new array with the updated values
const eurToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
// console.log(movements);
// console.log(movementsUSD);

const movementsUSDArrow = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSDArrow);

const movementsDescriptions = movements.map((mov, i) => {
  return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withrew'} ${mov}`;
});
//console.log(movementsDescriptions);

// --------------------------------------------------------------------------
// FILTER
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// console.log(movements);
// console.log(deposits);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
// console.log(withdrawals);

// --------------------------------------------------------------------------
// REDUCE
// console.log(movements);

// acc = accumulator. 0 after is the starting value
const balance = movements.reduce(function (acc, cur, i) {
  // console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
// console.log(balance);

// Maximum value of movements array
const maximum = movements.reduce(function (acc, cur, i) {
  return cur > acc ? cur : acc;
}, movements.at(0));

// console.log(maximum);

// --------------------------------------------------------------------------
// Chaining Methods
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr); // helpful for troubleshooting
    return mov * 1.1;
  })
  .reduce((acc, mov) => acc + mov, 0);

//console.log(totalDepositUSD);
// --------------------------------------------------------------------------
// FIND
// returns first element that is ture
const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);
// console.log(movements);

// console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// --------------------------------------------------------------------------
// SOME METHOD
// console.log(movements);

// Static check
// console.log(movements.includes(-130));

// Conditional check
const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// --------------------------------------------------------------------------
// EVERY METHOD
// all elements need to pass the test to return true
// console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
// console.log(movements.every(deposit));

// --------------------------------------------------------------------------
// flat and flatmap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
const allMovements = accountMovements.flat();
// console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// flat
const overallBalance1 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance1);

// flatmap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// --------------------------------------------------------------------------
// Sorting Arrays
// Sort changes the array

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// Numbers -- need to give more info for how to sort numbers
// 1 = keep order, -1 = switch order
// console.log(movements);
movements.sort(
  (a, b) => a - b
  // if (a > b) return 1;
  // if (b > a) return -1;
);
// console.log(movements);
// console.log(movements.sort());

// --------------------------------------------------------------------------
// Creating and Filling Arrays programatically
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));

const x = new Array(7);
// console.log(x);

// x.fill(1);
// x.fill(1, 3);
x.fill(1, 3, 5);
// console.log(x);

arr1.fill(23, 2, 6);
// console.log(arr1);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(z);

// 100 random dice rolls:
const rolls = Array.from(
  { length: 100 },
  (_, i) => Math.floor(Math.random() * 6) + 1
);
// console.log(rolls);

const movementsUI = Array.from(document.querySelectorAll('.movements_value'));
// console.log(movementsUI);

// Create an array of the values in the UI for movements
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent)
  );
  // console.log(movementsUI);
});

// --------------------------------------------------------------------------
// Array practice
// console.log(accounts.flatMap(acc => acc.movements).sort((a, b) => a - b));

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(bankDepositSum);

// deposits of at least $1000
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits10001 = accounts
  .flatMap(acc => acc.movements)
  .reduce((i, mov, _, arr) => (mov >= 1000 ? ++i : i), 0);
// console.log(numDeposits10001);

// REDUCE
// create object with sum of deposits and withdrawals
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, mov) => {
      // mov > 0 ? (sums.deposits += mov) : (sums.withdrawals += mov);
      sums[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
// console.log(sums);

// Title case
// 'this is a nice title' -> 'This Is a Nice Title'
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      if (exceptions.includes(word)) {
        return word;
      } else {
        return capitalize(word);
      }
    })
    .join(' ');
  return capitalize(titleCase);
};
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// --------------------------------------------------------------------------
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(function (dog, i) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  dog.range = {
    lowerRange: dog.recommendedFood * 0.9,
    upperRange: dog.recommendedFood * 1.1,
  };
});
// console.log(dogs);

// 2
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(sarahsDog);

// 3
const ownersEatTooMuch = dogs
  .filter(function (dog) {
    return dog.curFood > dog.range.upperRange;
  })
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(function (dog) {
    return dog.curFood < dog.range.lowerRange;
  })
  .flatMap(dog => dog.owners);

// const { tooMuch, tooLittle } = dogs.reduce(
//   function (dog) {
//     if (dog.curFood > dog.recommendedFood * 1.1) {
//       tooMuch.push(dog.owners);
//     } else if (dog.curFood < dog.recommendedFood * 0.9) {
//       tooLittle.push(dogs.owners);
//     }
//   },
//   { tooMuch: [], tooLittle: [] }
// );
// console.log(ownersEatTooMuch);

// 4
//"Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// console.log(ownersEatTooMuch.join(' and ') + "'s dogs eat too much!");
// console.log(ownersEatTooLittle.join(' and ') + "'s dogs eat too little!");

// 5
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood < dog.range.upperRange && dog.curFood > dog.range.lowerRange
//   )
// );

// 7
const okayDogs = dogs.filter(
  dog =>
    dog.curFood < dog.range.upperRange && dog.curFood > dog.range.lowerRange
);
// console.log(okayDogs);

// 8
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(sortedDogs);

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
