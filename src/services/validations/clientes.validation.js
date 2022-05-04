const { genericLengthValidation, emailValidation } = require('./generic.validation');

const validateClient = (name, email, telefone) => {
    const errorName = genericLengthValidation(name, 'nome');
    const errorEmail = emailValidation(email);
    const errorPhone = genericLengthValidation(telefone);
    if (errorName) return errorName;
    if (errorEmail) return errorEmail;
    if (errorPhone) return errorPhone;

    return null;
}

module.exports = validateClient;