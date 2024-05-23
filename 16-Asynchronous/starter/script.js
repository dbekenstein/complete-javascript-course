'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// https://countries-api-836d.onrender.com/countries/

// old school way
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(request.responseText);

    // convert json to object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);
  });
};

// getCountryData('portugal');
// getCountryData('france');
// getCountryData('spain');
// getCountryData('canada');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// callback hell - nesting requests
const getCountryAndNeighbor = function (country) {
  // ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(request.responseText);

    // convert json to object
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    // render country 1
    renderCountry(data);

    // get first neighbor country
    const neighbor = data.borders?.[0];

    // ajax call for neighbor
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
    // render neighbor
  });
};

// getCountryAndNeighbor('usa');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Promises

//  old way
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

// new way
const request3 = fetch(`https://restcountries.com/v2/name/usa`);
// console.log(request3);

// promise is a placeholder for the future result of an asynchronous operation, container for a future value
// can chain promises to avoid nesting ajax calls
// promise lifycycle:
// pending - before the future value is available
// settled - async task finished, fulfilled (success) or rejected (error)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// how to consume a promise

const getCountryData2 = function (country) {
  // country
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      // neighbor
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
      // .then(response => response.json())
      // .then(data2 => renderCountry(data2[0]));
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// getCountryData2('usa');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// rejected promises
// only reject if you lose internet (simulate using inspect, network)

// btn.addEventListener('click', function () {
//   getCountryData2('portugal');
// });

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData3 = function (country) {
  // country
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found:')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      if (!neighbor) throw new Error(`No neighbor found!`);
      // nighbor
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbor}`,
        'Neighbor not found:'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData3('usa');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// coding challenge 1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// part 1
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}}?geoit=json`)
    .then(response => {
      // console.log(response);
      if (response.status === 403)
        throw new Error(`Over limit, wait a second (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData3(data.country);
    })
    .catch(err => {
      console.log(err);
    });
};

// whereAmI(-33.933, 18.474);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// event loop practice
// cl will both run first
// promise.resolve will go next since it is a microtask and has priority
// set timeout will be last
// console.log('Test start');

// setTimeout(() => console.log('0 sec timer'), 0);

// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// console.log('Test end');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Building simple promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening...');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money.'));
    }
  }, 2000);
});
*/
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// promisifying setTimeout
// convert async behavior to promises

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('I waited 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited another 1 second'));

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
    // above is the same as:
    // navigator.geolocation.getCurrentPosition(resolve,reject);
  });
};
// console.log('Getting position');

// getPosition().then(pos => console.log(pos));

const whereAmI2 = function () {
  console.log('Where Am I 2?');
  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}}?geoit=json`)
      .then(response => {
        // console.log(response);
        if (response.status === 403)
          throw new Error(`Over limit, wait a second (${response.status})`);
        return response.json();
      })
      .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        getCountryData3(data.country);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

// btn.addEventListener('click', whereAmI2);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// 1
const images = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found)'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// async / await

const whereAmI3 = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    const data = await res.json();
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
  } catch (err) {
    console.error(err);
  }
};

// whereAmI3('spain');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

// get3Countries('portugal', 'canada', 'spain');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Promise.race
// - receives array of promises, and returns promise
// - first settled promise will be returned (resolved or rejected)
// - can be used to stop long running requests.

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, s * 1000);
  });
};

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/tanzania`),
//   timeout(1),
// ]).then(res => console.log(res[0]));

// Promise.allSettles
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Reject'),
//   Promise.resolve('Success 2'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Reject'),
//   Promise.resolve('Success 2'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Reject'),
//   Promise.resolve('Success 2'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// 1

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const loadNPause = async function () {
  try {
    const img1 = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img1.style.display = 'none';

    await wait(1);
    const img2 = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img2.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const i = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    const imgs = await imgArr.map(i => createImage(i));
    // console.log(imgs);
    const imgsEl = await Promise.all(imgs);

    imgsEl.forEach(i => i.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(i);
