const express = require("express");
const router = express.Router();
const axios = require("axios");
const { COURSE_ROUTE } = require("../../utils/constants");

router
  .route("/")
  .get(async (req, res) => {
    await getHandler(req, res);
  })
  .post(async (req, res) => {
    await postHandler(req, res);
  });

const getHandler = async (req, res) => {
  console.log(req.cookies.token);
  await axios
    .get(COURSE_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      console.log(response);
      res.status(200).json({ courses: response.data });
    })
    .catch((err) => console.log(err));

  res.render(__dirname + "../../../static/html/courses.html");
};

const postHandler = async (req, res) => {
  await axios
    .post(COURSE_ROUTE, {
      courseName: "COMP1234",
      token: req.cookies.token,
    })
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

module.exports = router;
