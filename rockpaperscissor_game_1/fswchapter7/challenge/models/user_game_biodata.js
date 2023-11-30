'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_game, user_game_history }) {
      // define association here
      this.belongsTo( user_game, { foreignKey: "username",})
      this.belongsTo(user_game, { foreignKey: "uuid",});
      this.hasOne( user_game_history, { foreignKey: "nama" })
      this.hasOne( user_game_history, { foreignKey: "uuid" })

    }

  }
  user_game_biodata.init({
    // uuid: {
    //   type: DataTypes.STRING,
    //   defaultValue: DataTypes.UUIDV4,
    // },
    nama: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
     },
    date_of_birth: DataTypes.DATE,
    country_of_birth: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    tableName: "user_game_biodata",
    modelName: 'user_game_biodata',
  });
  return user_game_biodata;
};