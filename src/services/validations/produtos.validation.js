const { genericLengthValidation, genericNumberValidation } = require('./generic.validation');

const validateProduct = (name, inventory, price) => {
    const errorName = genericLengthValidation(name, 'nome');
    const errorInventory = genericNumberValidation(inventory, 'quantidadeEstoque');
    const errorPrice = genericNumberValidation(price, 'preço');
    if (errorName) return errorName;
    if (errorInventory) return errorInventory;
    if (errorPrice) return errorPrice;

    return null;
}

module.exports = validateProduct;