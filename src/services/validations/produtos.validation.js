const { nameValidation, inventoryValidation, priceValidation } = require('./generic.validation');

const validateProduct = (name, inventory, price) => {
    const errorName = nameValidation(name);
    const errorInventory = inventoryValidation(inventory);
    const errorPrice = priceValidation(price);
    if (errorName) return errorName;
    if (errorInventory) return errorInventory;
    if (errorPrice) return errorPrice;

    return null;
}

module.exports = validateProduct;