const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const passport = require('passport');

const Guest = require('../models/Guest');
const controller = require('../controllers/GuestController');

router.get('/', (req, res) => {
    controller.find()
        .then(models => res.json(models))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/register', (req, res) => {
    Guest.findOne({email:req.body.email})
    .then(guest => {
        if(guest){
            return res.status(400).json({error: "Email already in use"});
        } else {
            let newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            };
            const saltRounds = 10;
        
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) {
                    console.error(err);
                }
                newUser.password = hash;
                controller.create(newUser)
                    .then(models => res.json(models))
                    .catch(err => res.status(500).json({error: err}));
            });
        }
    }
    ).catch(err => res.status(500).json({error: err}));
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Guest.findOne({email: email})
    .then(guest =>{
        if(guest){
            bcrypt.compare(password, guest.password)
            .then(isMatching => {
                if(isMatching){
                    const payload = {
                        id: guest._id,
                        firstName: guest.firstName,
                        lastName: guest.lastName
                    }
                    jwt.sign(payload, secret, {expiresIn : 3600},
                    (err, token) => {
                        return res.json({
                            success: true,
                            token: `Bearer ${token}` 
                        })
                    }
                    )
                }
            }).catch(err => res.status(401).json({error: "Bad credentials"}));
        } else {
        return res.status(401).json({error: "Bad credentials"}); 
    }
    })
})

router.get('/current', passport.authenticate('jwt', {session:false}),
 (req, res) => {
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    });
});

module.exports = router;
