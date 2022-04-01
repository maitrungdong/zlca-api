'use strict'

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'participants', // table name
      'updatedAt', // new field name
      {
        allowNull: false,
        type: Sequelize.DATE,
      }
    )
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn('participants', 'updatedAt')
  },
}
