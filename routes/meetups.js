const router = require('express').Router();

const controller = require('../controllers/MeetupController');
const RestfulRoutes = require('./RestfulRoutes');

const doNext = (name) => (req, res, next) => {
    console.log('USE MIDDLEWARE: ' + name);
    next()
};

const auth = doNext('auth');
const isAdmin = doNext('isAdmin');

RestfulRoutes(router, controller)
    .read()
    .write(auth, isAdmin);

module.exports = router;
