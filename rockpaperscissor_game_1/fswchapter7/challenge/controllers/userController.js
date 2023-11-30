const {
  user_game,
  user_game_biodata,
  user_game_history,
  game_room
} = require("../models");

const { comparePassword } = require("../middlewares/password");
const { generateToken, verifyToken } = require("../middlewares/jwt");
const { MACADDR } = require("sequelize");
// const { format } = require("sequelize/types/utils");

let player1_input = []
let player2_input = []
let temp_score_player1 = 0
let temp_score_player2 = 0
let round_winner = []



// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "thisIsUrSacredToken";

// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided." });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Failed to authenticate token." });
//     }

//     req.user = decoded;
//     next();
//   });
// }

module.exports = {
  login_page: async (req, res) => {
    const error = null;
    res.render("login", { error });
  },

  login: async (req, res) => {
    // kode kevin:
    // const { username, password } = req.body;

    // const user = await user_game.findOne({where: { username, password, role: "superadmin"}})

    // if(user){
    //   if(password == user.password && user.role){
    //     user_game.findAll()
    //     .then((userGame) => {
    //       res.render("dashboard", { user_game: userGame } )
    //     })
    //   }
    // }
    // else{
    //   const error = "invalid username/ password"
    //   res.render("login", { error })
    // }

    const { username, password } = req.body;

    try {
      const foundUser = await user_game.findOne({ where: { username } });

      if (!foundUser) {
        return res.status(401).send({
          error: "unauthorized",
          message: "Username not found.",
        });
      }

      const isMatched = comparePassword(password, foundUser.password);

      if (!isMatched) {
        return res.status(401).send({
          error: "unauthorized",
          message: "Invalid credentials.",
        });
      }

      const responsePayload = {
        username: foundUser.username,
        id: foundUser.id,
      };
      
      const token = generateToken(responsePayload);

      return res.status(200).send({
        id: responsePayload.id,
        username: responsePayload.username,
        message: "Anda berhasil login", 
        accessToken: token,
      });
      
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Error during login." });
    }
  },

  dashboard_page: async (req, res) => {
    user_game.findAll().then((userGameData) => {
      res.render("dashboard", { user_game: userGameData });
    });
  },

  register_page: async (req, res) => {
    res.render("register");
  },


  update_user_page: async (req, res) => {
    const usergame = await user_game.findOne({ where: { id: req.params.id } });
    const usergamebiodata = await user_game_biodata.findOne({
      where: { id: req.params.id },
    });

    res.render("update", {
      id: req.params.id,
      username: usergame.username,
      nama: usergamebiodata.nama,
      email: usergamebiodata.email,
      password: usergame.password,
      role: usergame.role,
      gender: usergamebiodata.gender,
      date_of_birth: usergamebiodata.gender,
      country_of_birth: usergamebiodata.country_of_birth,
      user_game,
      user_game_biodata,
    });
  },

  update_user: async (req, res) => {
    user_game.update(
      {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      },
      {
        where: { id: req.params.id },
      }
    ),
      user_game_biodata.update(
        {
          username: req.body.username,
          nama: req.body.nama,
          email: req.body.email,
          gender: req.body.gender,
          date_of_birth: req.body.date_of_birth,
          country_of_birth: req.body.country_of_birth,
        },
        {
          where: { id: req.params.id },
        }
      );
    user_game_history
      .update(
        {
          username: req.body.username,
          nama: req.body.nama,
        },
        {
          where: { id: req.params.id },
        }
      )
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => {
        res.send("Can't update the user data");
        console.log(err);
      });
  },

  delete_user: async (req, res) => {
    user_game.destroy({
      where: { id: req.params.id },
    }),
      user_game_biodata.destroy({
        where: { id: req.params.id },
      }),
      user_game_history
        .destroy({
          where: { id: req.params.id },
        })
        .then(() => {
          res.redirect("/dashboard");
        });
  },

  user_game_page: async (req, res) => {
    user_game.findAll().then((userGame) => {
      res.render("user-game", { user_game: userGame });
    });
  },

  user_game_biodata_page: async (req, res) => {
    user_game_biodata.findAll().then((userGameBiodata) => {
      res.render("user-game-biodata", { user_game_biodata: userGameBiodata });
    });
  },

  user_game_history_page: async (req, res) => {
    user_game_history.findAll().then((userGameHistory) => {
      res.render("user-game-history", { user_game_history: userGameHistory });
    });
  },

}

  

