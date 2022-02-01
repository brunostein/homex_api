/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const UserModel = (sequelize, DataTypes) => {

  var User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.INTEGER,
    }
  });

 User.associate = function(models) {
    User.hasMany(models.homes, { foreignKey: 'user_id'});
    User.belongsToMany(models.homes, { as: 'homes_shared', through: 'shared_homes', foreignKey: 'user_id' });
  };

  return User;
}

module.exports = UserModel;