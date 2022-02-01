'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UnitMeasurementTable = queryInterface.createTable('units_measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    return UnitMeasurementTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('units_measurements');
  }
};
