const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGuest(data) {
    let errors = {};

    if (!Validator.isLength(data.firstName, { min: 2, max: 255 })){
        errors.firstName = "Name's length must be 2-255 characters";
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};