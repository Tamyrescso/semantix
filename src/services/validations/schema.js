const errorMessage = {
  nameLength: '"nome" is required',
  nameEmpty: '"nome" is not allowed to be empty',
  inventoryLength: '"quantidadeEstoque" is required',
  inventoryNotNumber: '"quantidadeEstoque" must be a number',
  priceLength: '"preço" is required',
  priceNotNumber: '"preço" must be a number',
  emailRequired: '"email" is required',
  emailValid: '"email" must be a valid email',
  emailEmpty: '"email" is not allowed to be empty',

};

const blank = (value) => !value.length;
const isNotANumber = (value) => typeof value !== 'number';
const isNotExistent = (value) => value === undefined;
const regexMatch = (regex, value) => !regex.test(value);

module.exports = {
  errorMessage,
  blank,
  isNotExistent,
  regexMatch,
  isNotANumber
};
