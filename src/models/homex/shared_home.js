/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const SharedHomeModel = (sequelize, DataTypes) => {

  var SharedHome = sequelize.define('shared_homes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    home_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    permission: {
      type: DataTypes.STRING
    }
  });

  SharedHome.associate = function(models) {
    SharedHome.belongsTo(models.users, {foreignKey: 'user_id'});
  };

  return SharedHome;
}

module.exports = SharedHomeModel;