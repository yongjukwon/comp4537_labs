const logOut = () => {
  document.cookie = "token=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
  window.location.replace("./login.html");
};
