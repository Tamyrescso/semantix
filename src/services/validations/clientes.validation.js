const { nameValidation, emailValidation } = require('./generic.validation');

const validateClient = (name, email) => {
    const errorName = nameValidation(name);
    const errorEmail = emailValidation(email);
    if (errorName) return errorName;
    if (errorEmail) return errorEmail;

    return null;
}

module.exports = validateClient;