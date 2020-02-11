const express = require("express");
const teachers = require("../models/teachers");

const teachersRouter = express.Router();

teachersRouter
  .get("/", (req, res) => {
    res.status(200).send({ teachers_list: teachers });
  })
  .post("/", (req, res) => {
    let newTeachersList = req.body.teachers;
    let validList = newTeachersList.every(teacher => {
      return teacher.id && teacher.name;
    });
    if (validList) {
      newTeachersList.forEach(teacher => teachers.push(teacher));
      res.status(200).send({ message: "Teachers detail added to the list" });
    } else {
      res.status(400).send({ error: "Bad Request. Required params missing" });
    }
  })
  .delete("/", (req, res) => {
    let removalList = req.body.ids;
    let removedCount = 0;
    removalList.forEach(id => {
      teachers.forEach((teacher, index) => {
        if (teacher.id === id) {
          teachers.splice(index, 1);
          removedCount++;
        }
      });
    });
    if (removedCount !== 0) {
      res
        .status(200)
        .send({
          message: `${removedCount} Teachers detail removed from the list`
        });
    } else {
      res.status(400).send({ error: "Bad Request. Invalid Teacher IDs" });
    }
  });
module.exports = teachersRouter;
