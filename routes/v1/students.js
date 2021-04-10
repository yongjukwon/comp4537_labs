const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const { getRole } = require("../../utils/roles");

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }
  const cookies = cookie.parse(req.headers.cookie);
  console.log(cookies.token);
  const role = await getRole(cookies.token);

  if (role === "STUDENT") {
    res.render(__dirname + "../../../static/html/student.html");
  } else {
    res.redirect("index");
  }
});

module.exports = router;
