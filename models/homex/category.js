/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const CategoryModel = (sequelize, DataTypes) => {

  var Category = sequelize.define('categories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    home_id: {
      type: DataTypes.INTEGER,
    }
  });

  Category.associate = function(models) {
    Category.belongsTo(models.homes, {foreignKey: 'home_id'});
    Category.hasMany(models.items, {foreignKey: 'category_id'});
  };

  return Category;
}

module.exports = CategoryModel;