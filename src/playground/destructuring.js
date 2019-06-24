// Object Destructuring

// const book = {
//     title: 'Ponniyin Selvan',
//     author: 'Kalki',
//     publisher: {
//         //name: 'Veena'
//     }
// };

// const {title: bookTitle, author} = book;
// const {name: publisherName='Self Published'} = book.publisher;

// console.log(`The book ${bookTitle} is written by ${author} and published by ${publisherName}`);

// Array Destructuring

const item = ['Coffee (hot)'];

const [type, , mediumCost = '$3.00'] = item;

console.log(`A medium ${type} costs ${mediumCost}`);