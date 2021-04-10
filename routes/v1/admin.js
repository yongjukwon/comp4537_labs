const axios = require("axios");
const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const { COUNT_ROUTE } = require("../../utils/constants");
const jwt = require("jsonwebtoken"); //a library to manage JWT generation

const counts = {
  courses: {
    get: 0,
    post: 0,
    put: 0,
    delete: 0,
  },
  users: {
    get: 0,
    post: 0,
    put: 0,
  },
  favoriteCourses: {
    get: 0,
    post: 0,
    delete: 0,
  },
  coursesByUserId: {
    get: 0,
  },
};

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.status(400).send("You need to log in");
    return;
  }

  const cookies = cookie.parse(req.headers.cookie);

  console.log("Cookies", cookies);

  await axios
    .all([
      axios.get(`${COUNT_ROUTE}?endpoint=courses&type=get`),
      axios.get(`${COUNT_ROUTE}?endpoint=users&type=post`),
      axios.get(`${COUNT_ROUTE}?endpoint=users&type=get`),
    ])
    .then(
      axios.spread((getCourseResponse, postUserReponse, getUserResponse) => {
        const courseData = { get: getCourseResponse.data };
        const userData = {
          get: getUserResponse.data,
          post: postUserReponse.data,
        };

        if (courseData.get && courseData.get.success)
          counts.courses.get = courseData.get.count;
        if (userData.get && userData.get.success)
          counts.users.get = userData.get.count;
        if (userData.post && userData.post.success)
          counts.users.post = userData.post.count;
      })
    )
    .catch((e) => {
      throw e;
    });

  res.render(__dirname + "../../../static/html/admin.html", { counts: counts });
});

module.exports = router;
