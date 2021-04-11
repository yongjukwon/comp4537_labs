const express = require("express");
const router = express.Router();
const axios = require("axios");
const { LOGIN_ROUTE } = require("../../utils/constants");
const cookie = require("cookie");
const authenticate = require("./utils/authentication");

router.route("/").get(async (req, res) => {
  let args = {};
  args = await authenticate({ req: req, args: args });

  res.render(__dirname + "../../../static/html/login.html", {
    args: args,
    errors: "",
  });
});

router.route("/").post(async (req, res) => {
  let args = {};
  args = await authenticate({ req: req, args: args });
  await axios({
    method: "post",
    url: LOGIN_ROUTE,
    data: {
      email: req.body.Username,
      password: req.body.Password,
    },
  }).then(
    (response) => {
      if (response.data.token)
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", response.data.token)
        );

      res.redirect("index");
    },
    (err) => {
      res.render(__dirname + "../../../static/html/login.html", {
        args: args,
        errors: "Invalid login information",
      });
      console.log("ERROR", err);
    }
  );
});

module.exports = router;
