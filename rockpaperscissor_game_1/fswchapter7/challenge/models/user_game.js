'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require("../middlewares/password");

module.exports = (sequelize, DataTypes) => {
  const bcrypt = require("bcrypt");
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate({ user_game_history, user_game_biodata, game_room }) {
      // define association here

      this.hasOne(user_game_history, { 
        foreignKey: "username",
      });

      this.hasOne(user_game_biodata, { 
        foreignKey: "uuid",
      });

      this.hasOne(user_game_biodata, { 
        foreignKey: "username",
      });

      

      
    }
  }
  user_game.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: "user_game",
    modelName: 'user_game',
    hooks: {
      beforeCreate: async (user) => {
        try {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        } catch (err) {
          throw new Error("Error while hashing password: " + err.message);
        }
      },
    },

    validate: {
      inputFieldValidate:async function() {
        if(!this.username) {
          throw new Error("Username must be filled");
        }
        if(!this.password) {
          throw new Error("Password must be filled");
        }
        if(this.username.length < 5) {
          throw new Error("Username must be at least 5 characters");
        }
      }
    }
  });

  return user_game;
};



