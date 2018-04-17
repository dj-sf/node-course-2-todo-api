const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')

const { ObjectID } = require('mongodb');

// Todo.remove({}).then((result) =>  {
//     console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findOneAndRemove({ _id: '5ad65eff392a4996c74df880'}).then((todo) => {
    
})

Todo.findByIdAndRemove('5ad65eff392a4996c74df880').then((todo) => {
    console.log(todo);
})