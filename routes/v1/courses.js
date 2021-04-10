const express = require("express");
const router = express.Router();
const axios = require("axios");
const { COURSE_ROUTE, PROFESSORS_ROUTE } = require("../../utils/constants");

router
  .route("/")
  .get(async (req, res) => {
    await getHandler(req, res);
  })
  .post(async (req, res) => {
    await postHandler(req, res);
  })
  .put(async (req, res) => {
    await putHandler(req, res);
  });

const putHandler = async (req, res) => {
  // await axios
  //   .put(COURSE_ROUTE, {
  //     courseName: "COMP9999",
  //     description: req.body.description,
  //     personId: parseInt(req.body.professorId),
  //     token: req.cookies.token,
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   });

  res.render("./");
};

const getHandler = async (req, res) => {
  const args = {};
  const loggedIn = req.cookies.token;

  args.signUp = loggedIn ? "Log out" : "Sign up";
  args.signUpRoute = loggedIn ? "javascript:logout()" : "./register.html";

  await axios
    .get(PROFESSORS_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      console.log("PROF RESPONSE: ", response);
      args.professors = response.data;
    });

  await axios
    .get(COURSE_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      console.log(response.data);
      args.courses = response.data;
    })
    .catch((err) => console.log(err));

  console.log("ARGS: ", args);
  res.render(__dirname + "../../../static/html/courses.html", { args: args });
};

const postHandler = async (req, res) => {
  console.log("REQ.BODY: ", req.body);
  console.log("TOKEN: ", req.cookies.token);
  await axios
    .post(COURSE_ROUTE, {
      courseName: req.body.courseName,
      description: req.body.description,
      personId: parseInt(req.body.professorId),
      token: req.cookies.token,
    })
    .then((response) => {
      console.log("@@: ", response);
    })
    .catch((err) => console.error(err));

  res.redirect("back");
};

module.exports = router;
