const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const string_pin = req.body.PIN.toString();
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    PIN: CryptoJS.SHA256(string_pin).toString(CryptoJS.enc.Hex),
  });

  try {
    const usernameExists = await User.findOne({ username: req.body.username });
    const emailExists = await User.findOne({ email: req.body.email });

    if (usernameExists) {
      const username = usernameExists.username;
      return res.status(400).json({
        message: `Username ${username} already exists`,
      });
    }

    if (emailExists) {
      const email = emailExists.email;
      return res.status(400).json({
        message: `Email ${email} already exists`,
      });
    }

    if (string_pin.length < 6) {
      return res.status(400).json({ message: "PIN should be 6 digit" });
    }

    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    var user = await User.findOne({
      username: req.body.username_or_email,
    });

    if (!user) {
      user = await User.findOne({
        email: req.body.username_or_email,
      });
    } 
    
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const string_pin = req.body.PIN.toString();
    const enteredPIN = CryptoJS.SHA256(string_pin).toString(CryptoJS.enc.Hex);

    if (enteredPIN !== user.PIN) {
      return res.status(401).json({ message: "Wrong PIN" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    const { PIN, ...other } = user._doc;
    return res.status(200).json({ ...other, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
