const dropCourse = (param) => {
  console.log("Dropping course", param);
  document.getElementById("e_" + param).remove();
};

const unFavoriteCourse = (param) => {
  document.getElementById("f_" + param).remove();
  console.log("Unfavoriting course", param);
};
