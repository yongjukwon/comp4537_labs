const express = require("express");
const router = express.Router();
const axios = require("axios");
const authenticate = require("./utils/authentication");
const {
  COURSE_ROUTE,
  PROFESSORS_ROUTE,
  USER_ROUTE,
} = require("../../utils/constants");

router
  .route("/")
  .get(async (req, res) => {
    let args = {};
    args = await authenticate({ req: req, args: args });
    await getHandler(req, res, args);
  })
  .post(async (req, res) => {
    await postHandler(req, res);
  });

const getHandler = async (req, res, args) => {
  await axios
    .get(PROFESSORS_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      args.professors = response.data;
    })
    .catch((err) => console.log(err));

  for (let i = 0; i < args.professors.length; ++i) {
    await axios
      .get(USER_ROUTE, {
        data: {
          personId: args.professors[i].ID,
          token: req.cookies.token,
        },
      })
      .then((response) => {
        args.professors[i].name =
          response.data[0].FirstName + " " + response.data[0].LastName;
        args.professors[i].email = response.data[0].Email;
      })
      .catch((err) => console.log(err));
  }

  /* get courses */
  await axios
    .get(COURSE_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      console.log(response.data);
      args.courses = response.data;
    })
    .catch((err) => console.log(err));

  for (let i = 0; i < args.courses.length; ++i) {
    for (let j = 0; j < args.professors.length; ++j) {
      if (args.courses[i].PersonID === args.professors[j].ID) {
        args.courses[i].Instructor = args.professors[j].name;
        args.courses[i].InstructorContact = args.professors[j].email;
      }
    }
  }

  console.log(args);
  res.render(__dirname + "../../../static/html/courses.html", { args: args });
};

const postHandler = async (req, res) => {
  /* create a course */
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

  res.redirect("./courses");
};

module.exports = router;
