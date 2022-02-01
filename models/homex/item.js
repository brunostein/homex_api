/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const ItemModel = (sequelize, DataTypes) => {

  var Item = sequelize.define('items', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.categories, {foreignKey: 'category_id'});
  };

  return Item;
}

module.exports = ItemModel;