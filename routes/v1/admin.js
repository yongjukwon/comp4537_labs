const axios = require("axios");
const express = require("express");
const router = express.Router();
const { getRole } = require("../../utils/roles");
const {
  COUNT_ROUTE,
  COURSE_ROUTE,
  PROFESSORS_ROUTE,
  USER_ROUTE,
} = require("../../utils/constants");
const alert = require("alert");
const authenticate = require("./utils/authentication");

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

  const role = await getRole(req.cookies.token).catch((err) =>
    console.log(err)
  );

  if (role !== "ADMIN") {
    alert(
      "Sorry, you are not allowed to see admin page.\nThis is only for admin"
    );
    res.redirect("./index");
  }

  let args = {};
  args = await authenticate({ req: req, args: args });
  await axios
    .get(PROFESSORS_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      args.professors = response.data;
    })
    .catch((err) => console.log(err));

  for (let i = 0; i < args.professors.length; ++i) {
    await axios
      .get(USER_ROUTE, {
        data: {
          personId: args.professors[i].ID,
          token: req.cookies.token,
        },
      })
      .then((response) => {
        args.professors[i].name =
          response.data[0].FirstName + " " + response.data[0].LastName;
      })
      .catch((err) => console.log(err));
  }

  /* get courses */
  await axios
    .get(COURSE_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      args.courses = response.data;
    })
    .catch((err) => console.log(err));

  for (let i = 0; i < args.courses.length; ++i) {
    for (let j = 0; j < args.professors.length; ++j) {
      if (args.courses[i].PersonID === args.professors[j].ID) {
        args.courses[i].Instructor = args.professors[j].name;
      }
    }
  }

  for (let i = 0; i < args.professors.length; ++i) {
    let coursesTeaching = "";
    for (let j = 0; j < args.courses.length; ++j) {
      if (args.courses[j].PersonID === args.professors[i].ID) {
        coursesTeaching += args.courses[j].CourseName + " ";
      }
    }
    args.professors[i].coursesTeaching = coursesTeaching;
  }

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

  console.log(args);

  res.render(__dirname + "../../../static/html/admin.html", {
    args: args,
    counts: counts,
  });
});

router.route("/").post(async (req, res) => {
  const courses = await axios
    .get(COURSE_ROUTE, { data: { token: req.cookies.token } })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));

  const editCourseName = req.body.editCourseName;
  let put = false;
  for (let i = 0; i < courses.length; ++i) {
    if (editCourseName === courses[i].CourseName) {
      put = true;
    }
  }

  /* PUT */
  if (put) {
    await axios
      .put(COURSE_ROUTE, {
        courseName: req.body.editCourseName,
        description: req.body.description,
        personId: parseInt(req.body.professorId),
        token: req.cookies.token,
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  } else {
    /* create a course */
    await axios
      .post(COURSE_ROUTE, {
        courseName: req.body.courseName,
        description: req.body.description,
        personId: parseInt(req.body.professorId),
        token: req.cookies.token,
      })
      .then((response) => {
        console.log("@@: ", response);
      })
      .catch((err) => console.error(err));
  }

  res.redirect("./admin");
});

module.exports = router;
