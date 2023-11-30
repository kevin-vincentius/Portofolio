'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_game, user_game_biodata, game_room }) {
      // define association here

      this.belongsTo(user_game, { foreignKey: "username" });
      this.belongsTo(user_game_biodata, { foreignKey: "nama" });
      this.belongsTo(user_game_biodata, { foreignKey: "uuid" });
      this.hasOne(game_room, { foreignKey: "room_id" })
    }

  }
  user_game_history.init({
    // uuid: {
    //   type: DataTypes.STRING,
    //   defaultValue: DataTypes.UUIDV4,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull:false
    },
    score: DataTypes.STRING,
    last_saved_on: DataTypes.DATE,
    wins: DataTypes.INTEGER,
    room_id: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    tableName: "user_game_history",
    modelName: 'user_game_history',
  });
  return user_game_history;
};