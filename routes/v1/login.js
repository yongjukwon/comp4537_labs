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

router.route("/").post(async (request, response) => {
  console.log(LOGIN_ROUTE);
  await axios({
    method: "post",
    url: LOGIN_ROUTE,
    data: {
      email: request.body.Username,
      password: request.body.Password,
    },
  }).then(
    (res) => {
      if (res.data.token)
        response.setHeader(
          "Set-Cookie",
          cookie.serialize("token", res.data.token)
        );

      response.redirect("index");
    },
    (err) => {
      response.render(__dirname + "../../../static/html/login.html", {
        errors: "Invalid login information",
      });
      console.log("ERROR", err);
    }
  );
});

module.exports = router;
