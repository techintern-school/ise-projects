module.exports.cleanPriceString = function (str) {
  return parseFloat(str.replace("$", ""));
};

module.exports.skuToCurrentPrice = function (products) {
  return products.reduce((acc, product) => {
    acc[product.sku] = module.exports.cleanPriceString(product.current_price);
    return acc;
  }, {});
};
