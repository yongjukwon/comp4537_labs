const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const { getRole } = require("../../utils/roles");
const { getFavorites, getEnrollments } = require("../../utils/students");
//https://stackoverflow.com/questions/59017101/how-to-create-and-insert-div-element-to-ejs-node-js-express-ejs

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }

  const args = {};
  const loggedIn = req.cookies.token;

  args.signUp = loggedIn ? "Log out" : "Sign up";
  args.signUpRoute = loggedIn ? "javascript:logout()" : "./register.html";

  const cookies = cookie.parse(req.headers.cookie);
  const role = await getRole(cookies.token);

  if (role === "STUDENT" || role === "ADMIN") {
    const favorites = await getFavorites(cookies.token);
    const enrolled = await getEnrollments(cookies.token);

    res.render(__dirname + "../../../static/html/student.html", {
      favorites: favorites,
      enrolledCourses: enrolled,
      args: args,
    });
  } else {
    res.redirect("index");
  }
});

module.exports = router;
