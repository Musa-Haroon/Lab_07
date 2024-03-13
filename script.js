const express = require('express');

const app = express();
app.use(express.json());

let users = [];
let tasks = [];


app.post('/register', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(user);
    res.status(201).send();
});

app.post('login', (req, res) => {
    const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send();
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        category: req.body.category,
        status: 'pending',
        priority: req.body.priority,
        userId: req.user.name
    };
    tasks.push(task);
    res.status(201).send();
});

app.put('/tasks/:id/category', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id) && task.userId === req.user.name);
    if (!task) return res.status(404).send('Task not found');
    task.category = req.body.category;
    res.status(200).send();
});

app.put('/tasks/:id/status', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id) && task.userId === req.user.name);
    if (!task) return res.status(404).send('Task not found');
    task.status = req.body.status;
    res.status(200).send();
});

app.get('/tasks', (req, res) => {
    let userTasks = tasks.filter(task => task.userId === req.user.name);
    if (req.query.sortBy) {
        userTasks.sort((a, b) => a[req.query.sortBy] > b[req.query.sortBy] ? 1 : -1);
    }
    res.status(200).json(userTasks);
});


app.put('/tasks/:id/priority', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id) && task.userId === req.user.name);
    if (!task) return res.status(404).send('Task not found');
    task.priority = req.body.priority;
    res.status(200).send();
});

app.listen(3000);