const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const axios = require("axios");
const { getRole } = require("../../utils/roles");
const { COURSE_ROUTE, PROFESSORS_ROUTE } = require("../../utils/constants");
const authenticate = require("./utils/authentication");

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }

  let args = {};
  args = await authenticate({ req: req, args: args });

  await axios
    .get(COURSE_ROUTE, {
      data: {
        token: req.cookies.token,
      },
    })
    .then((response) => {
      args.courses = response.data;
    });

  await axios
    .get(PROFESSORS_ROUTE, {
      data: {
        token: req.cookies.token,
      },
    })
    .then((response) => {
      console.log(response);
      args.professors = response.data;
    });

  const professors = args.professors;
  const courses = args.courses;

  for (let i = 0; i < professors.length; ++i) {
    let coursesTeaching = "";
    for (let j = 0; j < courses.length; ++j) {
      if (courses[j].PersonID === professors[i].ID) {
        coursesTeaching += courses[j].CourseName + " ";
      }
    }
    args.professors[i].coursesTeaching = coursesTeaching;
  }

  console.log("ARGS: ", args);

  res.render(__dirname + "../../../static/html/professor.html", {
    args: args,
  });
});

module.exports = router;
