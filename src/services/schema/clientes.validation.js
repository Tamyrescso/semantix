const errorMessage = {
  nameLength: '"nome" is required',
  nameEmpty: '"nome" is not allowed to be empty',
  emailRequired: '"email" is required',
  emailValid: '"email" must be a valid email',
  emailEmpty: '"email" is not allowed to be empty',

};

const blank = (value) => !value.length;
const isNotExistent = (value) => value === undefined;
const regexMatch = (regex, value) => !regex.test(value);

const nameValidation = (name) => {
  switch (true) {
    case isNotExistent(name):
      return errorMessage.nameRequired;
    case blank(name):
      return errorMessage.nameEmpty;
    default:
      return null;
  }
};

const emailValidation = (email) => {
  switch (true) {
    case isNotExistent(email):
      return errorMessage.emailRequired;
    case blank(email):
      return errorMessage.emailEmpty;
    case regexMatch(/^.+@\w+(.com)$/, email):
      return errorMessage.emailValid;
    default:
      return null;
  }
};

const validateClient = (name, email) => {
    const errorName = nameValidation(name);
    const errorEmail = emailValidation(email);
    if (errorName) return errorName;
    if (errorEmail) return errorEmail;
  
    return null;
}

module.exports = validateClient;