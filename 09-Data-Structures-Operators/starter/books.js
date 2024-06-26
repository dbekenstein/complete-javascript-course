const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];
// =================================================================================
/*
// Strings part 3
// 17.1
const logBookCategories = function (categories) {
  categories = categories.split(';');
  for (let category of categories) {
    console.log(category);
  }
};

const bookCategories =
  'science;computing;computer science;algorithms;business;operating systems;networking;electronics';
logBookCategories(bookCategories);

// 17.2
const getKeywordsAsString = function (books) {
  const allKeywords = [];

  for (let book of books) {
    allKeywords.push(...book.keywords);
  }
  const uniqueKeyWords = new Set(allKeywords);
  return [...uniqueKeyWords].join(';');
};

console.log(getKeywordsAsString(books));

// 17.3
const logBookChapters = function (chapters) {
  for (let [name, page] of chapters) {
    console.log(name.padEnd(20, '_') + ' ' + page);
  }
};

const bookChapters = [
  ['The Basics', 14],
  ['Sorting', 254],
  ['Searching', 372],
  ['Graphs', 526],
  ['Strings', 706],
];
logBookChapters(bookChapters);
*/
// =================================================================================
/* 
// Strings part 2
// 16.1
const normalizeWord = function (word) {
  const temp = word.toLowerCase().trim();
  return temp[0].toUpperCase() + temp.slice(1);
};

const normalizeAuthorName = function (author) {
  author = author.trim();
  const firstName = normalizeWord(author.slice(0, author.indexOf(' ')));
  const lastName = normalizeWord(
    author.slice(author.indexOf(' '), author.lastIndexOf(' '))
  );
  return firstName + ' ' + lastName;
};
console.log(normalizeAuthorName('  JuliE sussMan (Contributor)'));

// 16.2
const newBookTitle = books[1].title.replace('Programs', 'Software');
console.log(books[1].title);
console.log(newBookTitle);

// 16.3
const logBookTheme = function (title) {
  const lowerTitle = title.toLowerCase();
  const about = '';
  if (lowerTitle.startsWith('computer')) {
    about = 'computers';
  } else if (
    lowerTitle.includes('algorithms') &&
    lowerTitle.includes('structures')
  ) {
    about = 'algorithms and data structures';
  } else if (
    (lowerTitle.endsWith('system') || lowerTitle.endsWith('systems')) &&
    !lowerTitle.includes('operating')
  ) {
    about = 'some systems, but definitely not about operating systems';
  }
  console.log(`This book is about ${about}`);
};
*/
// =================================================================================
/*
// Strings part 1
// 15.1
console.log(
  books[0].ISBN[6],
  books[0].ISBN[4],
  books[0].ISBN[9],
  books[0].ISBN[8]
);

// 15.2
const quote =
  'A computer once beat me at chess, but it was no match for me at kick boxing';
console.log(quote.indexOf('chess'));

// 15.3
console.log(quote.slice(quote.indexOf('boxing')));
console.log(quote.slice(quote.lastIndexOf(' ') + 1));

// 15.4
const isContributor = function (author) {
  return author.lastIndexOf('(Contributor)') !== -1;
};
console.log(isContributor('Julie Sussman (Contributor)'));
*/

// =================================================================================
/*
// Maps Iteration
// 14.1
const firstBookMap = new Map(Object.entries(books[0]));
console.log(firstBookMap);

// 14.2
for (const [key, value] of firstBookMap) {
  if (typeof value === 'number') {
    console.log(key);
  }
}
*/
/*
// Maps Fundamentals
// 13.1
const bookMap = new Map([
  ['title', 'Clean Code'],
  ['author', 'Robert C. Martin'],
]);
console.log(bookMap);

// 13.2
bookMap.set('pages', 464);

// 13.3
console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);

// 13.4
console.log(bookMap.size);

// 13.5
if (bookMap.has('author')) {
  console.log('The author of the book is known');
}
*/
/*
// Sets
// 12.1
const allKeywords = [];
for (const book of books) {
  allKeywords.push(...book.keywords);
}
console.log(allKeywords);

// 12.2
const uniqueKeywords = new Set(allKeywords);
console.log(uniqueKeywords);

// 12.3
uniqueKeywords.add('coding');
uniqueKeywords.add('science');

// 12.4
uniqueKeywords.delete('business');

// 12.5
const uniqueKeywordsArr = [...uniqueKeywords];
console.log(uniqueKeywordsArr);

// 12.6
uniqueKeywords.clear();
console.log(uniqueKeywords);
*/
/*
// Looping Objects
// 11.1
const entries = [];
for (const b of Object.keys(books[0].thirdParty.goodreads)) {
  entries.push([b]);
}

// 11.2
for (const [i, value] of Object.values(
  books[0].thirdParty.goodreads
).entries()) {
  entries[i].push(value);
}

// 11.3
const entries2 = Object.entries(books[0].thirdParty.goodreads);

// 11.4
console.log(entries);
console.log(entries2);
*/

/*
// Optional chaining
// 10.1
const getFirstKeyword = function (book) {
  return book.keywords?.[0];
};

// Enhance object literals
// 9.1
const bookData = [
  ['title', 'Computer Networking: A Top-Down Approach'],
  ['author', ['James F. Kurose', 'Keith W. Ross']],
  ['publisher', 'Addison Wesley'],
];

// Do the rest
const newBook = {
  [bookData[0][0]]: bookData[0][1],
  [bookData[1][0]]: bookData[1][1],
  [bookData[2][0]]: bookData[2][1],
};
console.log(newBook);

// 9.2
const pages = 880;

const newBook2 = {
  title: 'The C Programming Language',
  author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
  pages,
};
*/
/*
// Arrays - for-of loop
// 8.1
let pageSum = 0;
for (const p of books) {
  pageSum += p.pages;
}
console.log(pageSum);

// 8.2
const allAuthors = [];
for (const a of books) {
  if (typeof a.author === 'object') {
    allAuthors.push(...a.author);
  } else {
    allAuthors.push(a.author);
  }
}
console.log(allAuthors);

// 8.3
for (const [n, a] of allAuthors.entries()) {
  console.log(`${n + 1}. ${a}`);
}
*/

/*
// Logical Assignment Operators
// 7.1
for (let i = 0; i < books.length; i++) {
  books[i].edition ||= 1;
}

// 7.2
for (let i = 0; i < books.length; i++) {
  books[i].highlighted &&= !(books[i].thirdParty.goodreads.rating < 4.2);
}
*/
/*
// Nullish Operator (??)
// 6.1
for (let i = 0; i < books.length; i++) {
  books[i].onlineContent ??
    console.log(`${books[i].title} provides no data about its online content`);
}
*/

/*
// Short Circuiting
// 5.1
const hasExamplesInJava = function (book) {
  return book.programmingLanguage === 'Java' || 'no data available';
};
console.log(hasExamplesInJava(books[0]));
console.log(hasExamplesInJava(books[1]));

// 5.2
for (let i = 0; i < books.length; i++) {
  books[i].onlineContent &&
    console.log(`${books[i].title} provides online content`);
}
*/

/*
// Rest Pattern and Parameters
// 4.1
const [mainKey, ...rest] = books[0].keywords;
console.log(mainKey, rest);

// 4.2
const { publisher: bookPublisher, ...restOfTheBook } = books[1];
console.log(bookPublisher, restOfTheBook);

// 4.3
const printBookAuthorsCount = function (title, ...authors) {
  console.log(`The book "${title}" has ${authors.length} authors`);
};
printBookAuthorsCount('Algorithms', 'Robert Sedgewick', 'Kevin Wayne');
*/

/*
// spread operator
// 3.1
const bookAuthors = [...books[0].author, ...books[1].author];
console.log(bookAuthors);

// 3.2
const spellWord = function (str) {
  console.log(...str);
};
spellWord('JavaScript');
*/

/*
// objects
// 2.1
const { title, author, ISBN } = books[0];
console.log(title, author, ISBN);

// 2.2
const { keywords: tags } = books[0];
console.log(tags);

// 2.3
const { language, programmingLanguage = 'unknown' } = books[6];
console.log(language, programmingLanguage);

// 2.4
let bookTitle = 'unknown';
let bookAuthor = 'unknown';
({ title: bookTitle, author: bookAuthor } = books[0]);
console.log(bookTitle, bookAuthor);
/*

// arrays
/*
const [firstBook, secondBook] = books;
const [, , thirdBook] = books;

console.log(firstBook, secondBook, thirdBook);

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];
const [[, rating], [, ratingsCount]] = ratings;
console.log(rating, ratingsCount);

const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
*/

//
