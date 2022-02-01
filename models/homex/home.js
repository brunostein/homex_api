/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const HomeModel = (sequelize, DataTypes) => {

  var Home = sequelize.define('homes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    descr: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    }
  });

  Home.associate = function(models) {
    Home.belongsTo(models.users, {foreignKey: 'user_id'});
    Home.belongsToMany(models.users, { as: 'shared_users', through: 'shared_homes', foreignKey: 'home_id' });
  };

  return Home;
}

module.exports = HomeModel;