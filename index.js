/* Express */
const express = require("express");
const app = express();
const endPoint = "/4537/termproject/api/v1";
const cookieParser = require("cookie-parser");

/* Route paths */
const courses = require("./routes/v1/courses");
const admin = require("./routes/v1/admin");
const login = require("./routes/v1/login");
const index = require("./routes/v1/index");
const register = require("./routes/v1/register");
const student = require("./routes/v1/students");

/* Swagger */
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(cookieParser());
app.use(express.urlencoded({ extend: true })); //Parse URL-encoded bodies

/* Admin page */

app.use(express.json());
app.engine("html", require("ejs").renderFile);

/* Routes */
app.use([endPoint + "/courses.html", endPoint + "/courses"], courses);
app.use([endPoint + "/admin.html", endPoint + "/admin"], admin);
app.use([endPoint + "/login.html", endPoint + "/login"], login);
app.use([endPoint + "/index.html", endPoint + "/index"], index);
app.use([endPoint + "/register.html", endPoint + "/register"], register);
app.use([endPoint + "/student.html", endPoint + "/student"], student);

/* Swagger document */
app.use(
  [endPoint + "/documentation", endPoint + "/documentation.html"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

app.use(endPoint + "/js/", express.static(__dirname + "/static/js"));

app.listen(8888, () => console.log(`Server is listening on 8888`));
