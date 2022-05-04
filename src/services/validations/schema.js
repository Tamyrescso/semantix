const returnIsRequiredErrorMessage = (field) => `${field} is required`;
const returnEmptyErrorMessage = (field) => `${field} is not allowed to be empty`;
const returnIsNotANumberErrorMessage = (field) => `${field} must be a number`;

const blank = (value) => !value.length;
const isNotANumber = (value) => typeof value !== 'number';
const isNotExistent = (value) => value === undefined;
const regexMatch = (regex, value) => !regex.test(value);

module.exports = {
  returnIsRequiredErrorMessage,
  returnEmptyErrorMessage,
  returnIsNotANumberErrorMessage,
  blank,
  isNotExistent,
  regexMatch,
  isNotANumber
};
