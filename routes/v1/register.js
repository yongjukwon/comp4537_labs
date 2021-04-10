const express = require("express");
const router = express.Router();
const axios = require("axios");
const { USER_ROUTE } = require("../../utils/constants");

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

router.route("/").get(async (req, res) => {
  res.render(__dirname + "../../../static/html/register.html");
});

router.route("/").post(async (req, res) => {
  await axios({
    method: "POST",
    url: USER_ROUTE,
    data: {
      email: "test3@gmail.com",
      password: "1111",
      role: 3,
      firstName: "Yongju3",
      lastName: "Kwon3",
    },
  }).then(
    (response) => {
      console.log(response);
    },
    (err) => {
      console.log(err);
      console.log(err.stack);
    }
  );
});

module.exports = router;
