const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router
  .route("/")
  .get((req, res) => {
    res.status(200).json({ hi: "GET courses" });
  })
  .post((req, res) => {
    res.status(200).json({ hi: "POSt courses" });
  });

module.exports = router;
