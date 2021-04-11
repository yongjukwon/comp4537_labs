const express = require("express");
const router = express.Router();
const axios = require("axios");
const { USER_ROUTE } = require("../../utils/constants");
const authenticate = require("./utils/authentication");

router.route("/").get(async (req, res) => {
  let args = {};
  args = await authenticate({ req: req, args: args });

  res.render(__dirname + "../../../static/html/register.html", { args: args });
});

router.route("/").post(async (req, res) => {
  let args = {};
  args = await authenticate({ req: req, args: args });
  console.log("BODY: ", req.body);
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
      console.log("RES: ", response);
      res.render(__dirname + "../../../static/html/login.html", {
        args: args,
        errors: "",
      });
    },
    (err) => {
      console.log(err);
      console.log(err.stack);
    }
  );
});

module.exports = router;
