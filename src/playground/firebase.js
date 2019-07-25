import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyC9_8Sy2qR_tOvb6yn05C9KGaTct3HDHdU",
authDomain: "expensifyapp-da1cb.firebaseapp.com",
databaseURL: "https://expensifyapp-da1cb.firebaseio.com",
projectId: "expensifyapp-da1cb",
storageBucket: "",
messagingSenderId: "734651448245",
appId: "1:734651448245:web:f2ddde63f7fc3dc1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// const printExpensesArray = (snapshot) => {
//     const expensesArray = [];

//     snapshot.forEach((childSnapshot) => {
//         expensesArray.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expensesArray);
// };

// database.ref('expenses')
//     .once('value', printExpensesArray);

// database.ref('expenses')
//     .on('value', printExpensesArray);

database.ref('expenses')
    .on('child_changed', (snapshot) => {
        console.log(snapshot.key, snapshot.val());
    });

// database.ref('expenses').push({
//     description: 'Costco',
//     amount: 100,
//     note: 'Grocery Shopping',
//     createdAt: 435345435
// });
// database.ref('expenses').push({
//     description: 'Water',
//     amount: 120,
//     note: 'Utility Bill',
//     createdAt: 532523522523535
// });

// database.ref('expenses').push({
//     description: 'HEB',
//     amount: 50,
//     note: 'Grocery Shopping',
//     createdAt: 32535325325
// });

// Example for set
// database.ref().set({
//     name: 'Ranjith',
//     age: 38,
//     stressLevel: 8,
//     job: {
//         title: 'Software Developer',
//         company: 'USAA'
//     },
//     location: {
//         city: 'San Antonio',
//         country: 'United States'
//     }
// }).then(()=>{
//     console.log('Data saved!');
// }).catch((e)=>{
//     console.log('Error when saving!', e);
// });

// const printMessage = (snapshot) => {
//     const data = snapshot.val();
//     console.log(data.name, 'is a', data.job.title,  'at', data.job.company);
// };

// // Read once example
// database.ref()
//     .once('value').then(printMessage)
//     .catch((e) => {
//         console.log('Failure : ', e);
//     });

// Subscribe to changes
// database.ref()
//     .on('value', printMessage);

// database.ref()
//     .update({
//         'job': {
//             title: 'Manager',
//             company: 'Google'
//         }
//     });

// Read event example
// const onValueChangeCallback = (snapshot) => {
//     console.log('Value Changed : ', snapshot.val());
// };

// const onValueChangeEvent = database.ref()
//     .on('value', onValueChangeCallback);

// database.ref().off('value', onValueChangeEvent);

// Remove Example
// database.ref('isSingle').remove().then(()=> {
//     console.log('Remove succeeded');
// }).catch((e)=>{
//     console.log('Remove failed');
// });

// Update Example
// database.ref().update({
//     stressLevel: 10,
//     'job/company': 'Amazon',
//     'location/city': 'Austin'
// }).then(()=>{
//     console.log('Update Complete!');
// }).catch((e)=>{
//     console.log('Update Failed!', e);
// });