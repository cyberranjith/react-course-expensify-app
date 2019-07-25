const promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        resolve('Success One');
    }, 3000);
});

console.log('Before');

promise.then( (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('Success Two');
        }, 3000);
    });
}).then((data) => {
    console.log(data);
}).catch( (data) => {
    console.log(data);
}).finally( () => {
    console.log('finally');
});

console.log('After');