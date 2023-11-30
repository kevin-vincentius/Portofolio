'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      "user_game_biodata",
      [
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d93",
          username: "sabrina",
          nama: "Sabrina",
          email: "sabrina@gmail.com",
          date_of_birth: "2000-10-02",
          country_of_birth: "Indonesia",
          gender: "female",
          createdAt: "2023-07-22T07:27:43.155Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        },
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d94",
          username: "test",
          nama: "test",
          email: "test123@gmail.com",
          date_of_birth: "2001-12-01",
          country_of_birth: "USA",
          gender: "male",
          createdAt: "2023-07-22T07:27:43.155Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
