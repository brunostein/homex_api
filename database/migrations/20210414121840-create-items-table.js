'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ItemsTable = queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' }
      },
      home_id: {
        type: Sequelize.INTEGER,
        references: { model: 'homes', key: 'id' }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      unit_measurement_id: {
        type: Sequelize.INTEGER,
        references: { model: 'units_measurements', key: 'id' }
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

    return ItemsTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('items');
  }
};
