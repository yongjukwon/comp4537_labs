const express = require("express");
const router = express.Router();

router.route("/").get(async (res, req) => {
  await logout();
  res.redirect("./index");
});

const del_cookie = () => {
  document.cookie = "token=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
};

const logout = async () => {
  console.log("Logging out");
  await del_cookie();
};
