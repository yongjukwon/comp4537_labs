const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const axios = require("axios");
const { getRole } = require("../../utils/roles");
const { COURSE_ROUTE, PROFESSORS_ROUTE } = require("../../utils/constants");

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }

  const args = {};

  await axios
    .get(COURSE_ROUTE, {
      data: {
        token: req.cookies.token,
      },
    })
    .then((response) => {
      args.courses = response.data;
    });

  await axios
    .get(PROFESSORS_ROUTE, {
      data: {
        token: req.cookies.token,
      },
    })
    .then((response) => {
      console.log(response);
      args.professors = response.data;
    });

  res.render(__dirname + "../../../static/html/professor.html", {
    args: args,
  });
});

module.exports = router;
