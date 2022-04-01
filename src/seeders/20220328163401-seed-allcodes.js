'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'allcodes',
      [
        {
          value: 'M1',
          type: 'MESSAGE',
          name: 'TEXT',
        },
        {
          value: 'M2',
          type: 'MESSAGE',
          name: 'IMAGE',
        },
        {
          value: 'M3',
          type: 'MESSAGE',
          name: 'LINK',
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
