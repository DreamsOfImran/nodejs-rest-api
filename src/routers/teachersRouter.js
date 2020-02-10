const express = require("express");
const teachers = require("../models/teachers");

const teachersRouter = express.Router();

teachersRouter.get("/", (req, res) => {
  res.status(200).send({ teachers_list: teachers });
});

module.exports = teachersRouter;
