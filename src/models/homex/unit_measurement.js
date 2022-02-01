/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const UnitMeasurementModel = (sequelize, DataTypes) => {

  var UnitMeasurement = sequelize.define('units_measurements', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  UnitMeasurement.associate = function(models) {
    UnitMeasurement.hasMany(models.items, {foreignKey: 'unit_measurement_id'});
  };

  return UnitMeasurement;
}

module.exports = UnitMeasurementModel;