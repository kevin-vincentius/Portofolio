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
      "user_game_history",
      [
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d93",
          username: "sabrina",
          nama: "sabrina",
          score: 0,
          last_saved_on: "2023-07-22",
          wins: 0,
          room_id: [""] ,
          createdAt: "2023-07-22T08:49:52.097Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        },
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d94",
          username: "test2",
          nama: "test2",
          score: 0,
          last_saved_on: "2023-07-22",
          wins: 0,
          room_id: ['BP13', 'PW21'],
          createdAt: "2023-07-22T08:49:52.097Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        },
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d95",
          username: "test1",
          nama: "test1",
          score: 0,
          last_saved_on: "2023-07-22",
          wins: 0,
          room_id: ['BP13', 'PW21'],
          createdAt: "2023-07-22T08:49:52.097Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        }
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
