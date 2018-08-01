const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Guest = require('../models/Guest');
const secret = require('./secret');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Guest.findById(jwt_payload.id)
                .then(guest => {
                    if (guest) {
                        return done(null, guest);
                    }
                    return (null, false);
                }).catch(err => console.error(err));
        })
    )
};