const express = require("express");
const teachers = require("../models/teachers");

const teacherRouter = express.Router();

teacherRouter
  .get("/:id", (req, res) => {
    let requiredTeacher = teachers.find(teacher => {
      return teacher.id.toString() === req.params.id;
    });
    if (requiredTeacher) {
      res.status(200).send({ teacher: requiredTeacher });
    } else {
      res.status(404).send({ error: "Teacher Not Found" });
    }
  })
  .post("/", (req, res) => {
    if (req.body.id && req.body.name) {
      teachers.push(req.body);
      res
        .status(200)
        .send({ message: "New Teacher added to the list successfully" });
    } else {
      res.status(400).send({ error: "Required Fields Missing. Bad Request" });
    }
  })
  .patch("/:id", (req, res) => {
    let teacherIndex;
    const requiredTeacher = teachers.find((teacher, index) => {
      teacherIndex = index;
      return teacher.id.toString() === req.params.id;
    });
    if (requiredTeacher) {
      const {
        name = requiredTeacher.name,
        qualification = requiredTeacher.qualification,
        age = requiredTeacher.age,
        gender = requiredTeacher.gender
      } = req.body;
      teachers[teacherIndex] = {
        id: requiredTeacher.id,
        name,
        qualification,
        age,
        gender
      };
      res.status(200).send({ message: "Teacher Details Updated Successfully" });
    } else {
      res.status(400).send({ error: "Bad Request" });
    }
  })
  .delete("/:id", (req, res) => {
    let teacherIndex;
    const requiredTeacher = teachers.find((teacher, index) => {
      teacherIndex = index;
      return teacher.id.toString() === req.params.id;
    });
    if (requiredTeacher) {
      teachers.splice(teacherIndex, 1);
      res.status(200).send({ message: "Teacher Details removed from list" });
    } else {
      res.status(400).send({ error: "Bad Request" });
    }
  });

module.exports = teacherRouter;
