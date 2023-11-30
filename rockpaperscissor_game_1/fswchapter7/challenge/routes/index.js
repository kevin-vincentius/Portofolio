var express = require("express");
var app = express()
var router = express.Router();
const userRouter = require("./user");

router.use(userRouter);

module.exports = router;
