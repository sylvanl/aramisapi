require('dotenv').config();

const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth')
const userstest = require('./utils/api-users').users;

const PORT = process.env.PORT || 3001;
app.use(express.json())

app.use(basicAuth({
    users : userstest,
    unauthorizedResponse: getUnauthorizedResponse
}))
function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

const routes = {
    estimations: require('./routes/estimations'),
    users: require('./routes/users')
}

app.get('/', function (req, res) {
    return res.json({
        apiStutus: 'RUNNING :: 200',
        availableRoutes: routes
    });
})

app.get('/estimations', routes['estimations']['getEstimations']);

app.get('/users', routes['users']['getUsers']);
app.get('/users/:username', routes['users']['getUser']);
app.post('/users', routes['users']['getUsers']);
app.delete('/users/:usernames', routes['users']['deleteUsers']);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));