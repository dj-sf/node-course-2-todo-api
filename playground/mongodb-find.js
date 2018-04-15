// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

let user = { name: 'andrew', age: 25 };

let { name } = user;

console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({ 
    //     _id: new ObjectID('5ad370125fca0c16aaa561e2')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, null, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find().toArray().then((docs) => {
        console.log('Users: ');
        console.log(JSON.stringify(docs, null, 2));
    }, (err) => {
        console.log("An error occurred: ", err);
    })

    // db.close();
});

