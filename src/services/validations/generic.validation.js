const { blank,
  isNotExistent,
  regexMatch,
  returnIsRequiredErrorMessage,
  returnEmptyErrorMessage,
  isNotANumber, 
  returnIsNotANumberErrorMessage} = require('./schema');

const emailValidation = (email) => {
  switch (true) {
    case isNotExistent(email):
      return returnIsRequiredErrorMessage('email');
    case blank(email):
      return returnEmptyErrorMessage('email')
    case regexMatch(/^.+@\w+(.com)$/, email):
      return 'email must be valid';
    default:
      return null;
  }
};

const genericLengthValidation = (name, field) => {
  switch (true) {
    case isNotExistent(name):
      return returnIsRequiredErrorMessage(field);
    case blank(name):
      return returnEmptyErrorMessage(field);
    default:
      return null;
  }
};

const genericNumberValidation = (qnt, field) => {
  switch (true) {
    case isNotExistent(qnt):
      return returnIsRequiredErrorMessage(field);
    case isNotANumber(qnt):
      return returnIsNotANumberErrorMessage(field)
    default:
      return null;
  }
};




module.exports = {
  emailValidation,
  genericLengthValidation,
  genericNumberValidation,
};
