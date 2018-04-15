// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

let user = {name: 'andrew', age: 25};

let {name} = user;

console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, null, 2))
    // })

    // Insert new doc into Users collection (name, age, location)

    db.collection('Users').insertOne({
        name: 'Jim',
        age: 24,
        location: 'Annapolis, MD'
    }, (err, result) => {
        if (err) {
            return console.log("failed to insert document in to db");
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), null, 2));
    })

    db.close();
});

