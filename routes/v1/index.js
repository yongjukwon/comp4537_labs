const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log("TOKEN: ", req.cookies.token);
  const loggedIn = req.cookies.token;
  const args = {
    signUp: loggedIn ? "Log out" : "Sign up",
  };

  res.render(__dirname + "../../../static/html/index.html", { args: args });
});

module.exports = router;
