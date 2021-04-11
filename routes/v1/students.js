const express = require("express");
const router = express.Router();
const { getRole } = require("../../utils/roles");
const { getFavorites, getEnrollments } = require("../../utils/students");
const { ENROLLMENTS_ROUTE, FAVORITES_ROUTE } = require("../../utils/constants");
const authenticate = require("./utils/authentication");
const axios = require("axios");

//https://stackoverflow.com/questions/59017101/how-to-create-and-insert-div-element-to-ejs-node-js-express-ejs

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }

  let args = {};
  args = await authenticate({ req: req, args: args });

  const role = await getRole(req.cookies.token);

  if (role === "STUDENT" || role === "ADMIN") {
    const favorites = await getFavorites(req.cookies.token);
    const enrolled = await getEnrollments(req.cookies.token);

    res.render(__dirname + "../../../static/html/student.html", {
      favorites: favorites,
      enrolledCourses: enrolled,
      args: args,
    });
  } else {
    res.redirect("index");
  }
});

router.route("/").post(async (req, res) => {
  if (req.body.method === "DELETE" && req.body.path === "ENROLLMENTS") {
    await axios({
      method: "DELETE",
      url: ENROLLMENTS_ROUTE,
      data: {
        token: req.cookies.token,
        courseId: req.body.courseId,
      },
    }).then(
      (response) => {
        console.log("RES: ", response);
        res.redirect("student");
      },
      (err) => {
        console.log(err);
        console.log(err.stack);
      }
    );
  } else if (req.body.method === "DELETE" && req.body.path === "FAVORITES") {
    await axios({
      method: "DELETE",
      url: FAVORITES_ROUTE,
      data: {
        token: req.cookies.token,
        courseId: req.body.courseId,
      },
    }).then(
      (response) => {
        console.log("RES: ", response);
        res.redirect("student");
      },
      (err) => {
        console.log(err);
        console.log(err.stack);
      }
    );
  }
});

module.exports = router;
