const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const { getRole } = require("../../utils/roles");

//https://stackoverflow.com/questions/59017101/how-to-create-and-insert-div-element-to-ejs-node-js-express-ejs

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }
  const cookies = cookie.parse(req.headers.cookie);
  console.log(cookies.token);
  const role = await getRole(cookies.token);

  if (role === "STUDENT") {
    const favorites = [
      {
        CourseName: "COMP6969",
        Description: "Description",
      },
    ];

    const enrolled = [
      {
        CourseName: "COMP6969",
        Description: "Description",
      },
    ];

    res.render(__dirname + "../../../static/html/student.html", {
      favorites: favorites,
      enrolledCourses: enrolled,
    });
  } else {
    res.redirect("index");
  }
});

module.exports = router;
