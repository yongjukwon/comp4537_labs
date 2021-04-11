const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  // req.cookie = "token=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
  console.log("in");
  res.clearCookie("token");
  res.status(200).redirect("./index");
});

module.exports = router;
