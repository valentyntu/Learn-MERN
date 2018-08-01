const router = require('express').Router();
const isAuthenticated = require('../config/passportAuthentication');

const controller = require('../controllers/MeetupController');
const RestfulRoutes = require('./RestfulRoutes');
const Meetup = require('../models/Meetup');

const doNext = (name) => (req, res, next) => {
    console.log('USE MIDDLEWARE: ' + name);
    next()
};

const auth = doNext('auth');
const isAdmin = doNext('isAdmin');

router.get('/:id', (req, res) => {
    Meetup.findById(req.params.id)
        .populate('guests')
        .then(guest=> res.json(guest))
        .catch(err => res.status(422).json(err));
});

RestfulRoutes(router, controller)
    .read()
    .write(auth, isAdmin);

router.put('/:id/guests', isAuthenticated, (req, res) => {
    Meetup.addGuestById(req.params.id, req.user._id)
        .then(guest=> res.json(guest))
        .catch(err => res.status(422).json(err));
});

router.delete('/:id/guests', isAuthenticated, (req, res) => {
    Meetup.deleteGuestById(req.params.id, req.user._id)
        .then(guest=> res.json(guest))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
