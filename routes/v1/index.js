const express = require("express");
const router = express.Router();
const authenticate = require("./utils/authentication");

router.route("/").get(async (req, res) => {
  let args = {};
  args = await authenticate({ req: req, args: args });

  console.log(args);

  res.render(__dirname + "../../../static/html/index.html", { args: args });
});

module.exports = router;
