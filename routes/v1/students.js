const express = require("express");
const router = express.Router();
const { getRole } = require("../../utils/roles");
const { getFavorites, getEnrollments } = require("../../utils/students");
const authenticate = require("./utils/authentication");

//https://stackoverflow.com/questions/59017101/how-to-create-and-insert-div-element-to-ejs-node-js-express-ejs

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }

  let args = {};
  args = await authenticate({ req: req, args: args });

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
