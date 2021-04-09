/* Express */
const express = require("express");
const app = express();
const endPoint = "/4537/termproject/api/v1";

/* Route paths */
const courses = require("./routes/v1/courses");
const admin = require("./routes/v1/admin");
const login = require("./routes/v1/login");
/* Swagger */
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

/* Admin page */

app.use(endPoint + "/js/", express.static(__dirname + "/static/js"));
app.use(express.json());
app.engine("html", require("ejs").renderFile);

/* Routes */
app.use(endPoint + "/courses", courses);
app.use([endPoint + "/admin.html", endPoint + "/admin"], admin);
app.use([endPoint + "/login.html", endPoint + "/login"], login);

/* Swagger document */
app.use(
  [endPoint + "/documentation", endPoint + "/documentation.html"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

app.listen(8888, () => console.log(`Server is listening on 8888`));
