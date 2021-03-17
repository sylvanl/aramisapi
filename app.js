require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001;

app.get('/', function (req, res) {
    return res.json({
        apiStutus: 'RUNNING :: 200',
        availableRoutes: routes
    });
})

const routes = {
    estimations: require('./routes/estimations'),
    users: require('./routes/users')
}

app.get('/estimations', routes['estimations']['getEstimations']);

app.get('/users', routes['users']['getUsers']);
app.get('/users/:username', routes['users']['getUser']);
app.post('/users', routes['users']['getUsers']);
app.delete('/users/:usernames', routes['users']['deleteUsers']);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));