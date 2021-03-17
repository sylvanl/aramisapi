// Imports
require('dotenv').config();
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth')
const apiusers = require('./utils/api-users').users;
const PORT = process.env.PORT || 3000;
app.use(express.json())

// Basic authentification
app.use(basicAuth({
    users : apiusers,
    unauthorizedResponse: getUnauthorizedResponse
}))

// Authentification error message
function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

// Import routes
const routes = {
    estimations: require('./routes/estimations'),
}

// Home route
app.get('/', function (req, res) {
    return res.json({
        apiStutus: 'RUNNING :: 200',
        availableRoutes: routes
    });
})

// Estimations route
app.get('/estimations', routes['estimations']['getEstimations']);

// Run app on chosen PORT in .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));