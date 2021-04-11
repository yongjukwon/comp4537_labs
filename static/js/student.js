const dropCourse = (param) => {
  console.log("Dropping course", param);
  document.getElementById(param).remove();
};

const unFavoriteCourse = (param) => {
  document.getElementById(param).remove();
  console.log("Unfavoriting course", param);
};
