const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.render(__dirname + "../../../static/html/index.html");
});

module.exports = router;
