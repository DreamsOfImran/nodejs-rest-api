const express = require("express");
const bodyParser = require("body-parser");
const teachersRouter = require("./routers/teachersRouter");
const teacherRouter = require("./routers/teacherRouter");

const app = express();

app.use(bodyParser.json());

app.get("/", (_, res) => {
  let htmlResponse = `
  <h1>Welcome to Sample Teacher Server using nodejs</h1>
  <a href='/teachers'>Teachers List</a>
  `;
  res.send(htmlResponse);
});

app.use("/teachers", teachersRouter);
app.use("/teacher", teacherRouter);

app.listen(8080, () => {
  console.log("Server Running successfully");
});
