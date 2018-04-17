const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

const {ObjectID} = require('mongodb');

// let id = '5ad60318e09e1447794f9d2611';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e) => console.log(e));

// query users collection
// User.findByID

User.findById('5ad4b5f15646350e47088147').then((user) => {
    if (!user) {
        return console.log('User not found')
    }
    console.log("User by ID", user)
}).catch((e) => {console.log("An Error Occurred:", e)});



// handle case where: user not found, user WAS found, and error
