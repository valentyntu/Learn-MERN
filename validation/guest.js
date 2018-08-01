const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGuest(data) {
    let errors = {};

    if (!Validator.isLength(data.firstName.trim(), { min: 2, max: 255 })){
        errors.firstName = "Name's length must be 2-255 characters";
    }

    if (!Validator.isLength(data.lastName.trim(), { min: 2, max: 255 })){
        errors.lastName = "Name's length must be 2-255 characters";
    }
    
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is not valid";
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};