const axios = require("axios");
const express = require("express");
const router = express.Router();

const countEP = "https://herbertma.tech/api/v1/count";

const counts = {
  /* Course */
  getCoursesCount: 0,
  postCoursesCount: 0,
  putCoursesCount: 0,
  deleteCoursesCount: 0,
  getCoursesByUserIdCount: 0,
  /* User */
  getUsersCount: 0,
  postUsersCount: 0,
  putUsersCount: 0,
  /* Favorite Course */
  getFavoriteCoursesCount: 0,
  postFavoriteCoursesCount: 0,
  deleteFavoriteCoursesCount: 0,
};

router.route("/").get(async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    const obj = req.query.endpoint;
    const type = req.query.type;

    await axios
      .get(`${countEP}?endpoint=${obj}&type=${type}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) counts[`${type}${obj}Count`] = res.data.count;
        console.log(`${type}${obj}Count`);
        console.log(counts);
      })
      .catch((e) => {
        throw e;
      });
  }
  res.render(__dirname + "../../../static/html/admin.html", { counts: counts });
});

module.exports = router;
