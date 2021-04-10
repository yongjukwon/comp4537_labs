const del_cookie = () => {
  document.cookie = "token=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
};

const logout = () => {
  console.log("Logging out");
  del_cookie();
  window.location.replace("index.html");
};
