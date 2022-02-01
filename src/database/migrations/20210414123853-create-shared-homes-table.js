'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SharedHomesTable = queryInterface.createTable('shared_homes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_id: {
        type: Sequelize.INTEGER,
        references: { model: 'homes', key: 'id' }
      },
      permission: {
        type:Sequelize.STRING,
        defaultValue: 'read'
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

    return SharedHomesTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('shared_homes');
  }
};
