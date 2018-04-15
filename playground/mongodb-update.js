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

    db.collection('Users').findOneAndUpdate({
        name: "Jen"
        }, {
            $inc: {
                age: 1
            }
        }, {
                returnOriginal: false
            }
        ).then((result)=>{
            console.log(result);
        }
    );

    // db.close();
});

