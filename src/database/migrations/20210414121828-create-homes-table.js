'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const HomesTable = queryInterface.createTable('homes', {
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
      descr: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
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

    return HomesTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('homes');
  }
};
