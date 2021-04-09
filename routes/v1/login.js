const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.render(__dirname + "../../../static/html/login.html");
});

router.route("/").post((req, res) => {
  res.status(200).json({ hi: "POST LOGIN" });
});

module.exports = router;
