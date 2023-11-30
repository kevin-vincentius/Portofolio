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
      "user_game",
      [
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d93",
          username: "sabrina",
          password: "$2b$10$V10BUa61/Z0QlO8SM6prHuTZgqqJWiJOGCGVrbWOzrC2zRsj4kxK2",
          //password: sabrina
          role: "SuperAdmin",
          createdAt: "2023-07-22T07:27:43.155Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        },
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d95",
          username: "test1",
          password: "$2b$10$AfdfIJro9VZsFAcSjxFEfOr.M98QvQdi/qWxAIgN1CwUBIeP21Psu",
          //password: sabrina
          role: "PlayerUser",
          createdAt: "2023-07-22T07:27:43.155Z",
          updatedAt: "2023-07-22T08:49:52.097Z",
        },
        {
          uuid: "169cd74e-e72c-4dcf-b2e7-46d5b46b4d94",
          username: "test2",
          password: "$2b$10$yysjiA/ortzmykLN.tS1NuCI0CD/AqIP3aENYCoTMuWyk3vevOvsO",
          //password: testing
          role: "PlayerUser",
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
