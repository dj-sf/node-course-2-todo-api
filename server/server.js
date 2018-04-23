require('./config/config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let { mongoose } = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');


let app = express();
let port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e); 
    })
})

//GET /todos/12345
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    // validate id using isValid
     // 404 --send back empty send body
    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
    
    // findById
        // success
            // if todo -- send back
            // if no todo -- send back 404 with empty body
        // error
            // 400 - send back empty body
    
});

app.delete('/todos/:id', (req, res) => {

    //get the id
    let id = req.params.id;
    // validate the id --> not valid? return 404
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    // remove todo by id

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            res.status(404).send();
        }

        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
        //success
            //if no doc, send 404
            //if doc, send doc back with 200
        //error
            //400 with empty body

});


app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// GET /users 

app.get(`/users`, (req, res) =>  {
    User.find().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(404).send(e);
    });
}),

// POST /users 

app.post(`/users`, (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])
    let user = new User(body);    

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};