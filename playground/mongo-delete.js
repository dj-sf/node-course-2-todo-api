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
    
    // deleteMany  
    // db.collection('Users').deleteMany({name: "Andrew"}).then((result) => {
    //     console.log(result)
    // });

    //   deleteOne
    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // })

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({name: "Jim"}).then((result) => {
        console.log(result);
    })

    // db.close();
});

 