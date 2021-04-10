const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router.route("/").get((req, res) => {
  res.render(__dirname + "../../../static/html/index.html");
});

module.exports = router;
