'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    real_price: DataTypes.INTEGER,
    sale_price: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.associate = function(models) {
    
  };

  return Product;
};