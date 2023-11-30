'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_room', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      room_id: {
        type: DataTypes.STRING,
      },
      room_name: {
        type: DataTypes.STRING,
      },
      username_1:{
        type: DataTypes.STRING,
      },
      username_2:{
        type: DataTypes.STRING,
      },
      player1_score: {
        type: DataTypes.INTEGER,
      },
      player2_score: {
        type: DataTypes.INTEGER,
      },
      round_winner: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      match_winner: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('game_room');
  }
};