const express = require("express");
const router = express.Router();
const axios = require("axios");
const { USER_ROUTE } = require("../../utils/constants");

router.route("/").get(async (req, res) => {
  res.render(__dirname + "../../../static/html/register.html");
});

router.route("/").post(async (req, res) => {
  console.log(req.body);
  await axios({
    method: "POST",
    url: USER_ROUTE,
    data: {
      email: req.body.email,
      password: req.body.password,
      role: parseInt(req.body.jobTitle),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      token: req.cookies.token,
    },
  }).then(
    (response) => {
      console.log(response);
      res.render(__dirname + "../../../static/html/login.html", { errors: "" });
    },
    (err) => {
      console.log(err);
      console.log(err.stack);
    }
  );
});

module.exports = router;
