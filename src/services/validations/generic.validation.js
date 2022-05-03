const { blank,
  isNotExistent,
  regexMatch,
  errorMessage,
  isNotANumber } = require('./schema');

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

const inventoryValidation = (qnt) => {
  switch (true) {
    case isNotExistent(qnt):
      return errorMessage.inventoryRequired;
    case isNotANumber(qnt):
      return errorMessage.inventoryNotNumber
    default:
      return null;
  }
};

const priceValidation = (price) => {
  switch (true) {
    case isNotExistent(price):
      return errorMessage.priceRequired;
    case isNotANumber(price):
      return errorMessage.priceNotNumber;
    default:
      return null;
  }
};


module.exports = {
  nameValidation,
  emailValidation,
  inventoryValidation,
  priceValidation,
};
