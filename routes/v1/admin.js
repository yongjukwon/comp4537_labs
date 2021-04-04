const axios = require("axios");
const express = require("express");
const router = express.Router();

const countEP = "https://herbertma.tech/api/v1/count";

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
  await axios
    .all([
      axios.get(`${countEP}?endpoint=courses&type=get`),
      axios.get(`${countEP}?endpoint=users&type=post`),
      axios.get(`${countEP}?endpoint=users&type=get`),
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
