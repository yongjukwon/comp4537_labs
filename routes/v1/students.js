const express = require("express");
const router = express.Router();
const { getRole } = require("../../utils/roles");
const authenticate = require("./utils/authentication");

//https://stackoverflow.com/questions/59017101/how-to-create-and-insert-div-element-to-ejs-node-js-express-ejs

router.route("/").get(async (req, res) => {
  if (!req.headers.cookie) {
    res.redirect("login");
    return;
  }

  let args = {};
  args = await authenticate({ req: req, args: args });

  const role = await getRole(req.cookies.token);

  console.log("ROLE:", role);

  if (role === "STUDENT" || role === "ADMIN") {
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
      args: args,
    });
  } else {
    res.redirect("index");
  }
});

module.exports = router;
