'use strict';
const {
  Model
} = require('sequelize');
const user_game = require('./user_game');
const user_game_history = require('./user_game_history');
module.exports = (sequelize, DataTypes) => {
  class game_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_game_history }) {
      this.hasOne(user_game_history, {
        foreignKey: "room_id"
      })
    }
  }
  game_room.init({
    room_id: {
     type: DataTypes.STRING,
    },
    room_name: {
      type: DataTypes.STRING,
     },
    username_1: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    username_2: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
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
  }, {
    sequelize,
    tableName: "game_room",
    modelName: 'game_room',
  });
  return game_room;
};