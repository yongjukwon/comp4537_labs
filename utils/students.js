const { FAVORITES_ROUTE, ENROLLMENTS_ROUTE } = require("./constants");

const getFavorites = async (token, personId) => {
  return axios
    .get(FAVORITES_ROUTE, {
      data: {
        token: token,
        personId: personId,
      },
    })
    .then((response) => {
      return response.data.role;
    })
    .catch((error) => {
      return error;
    });
};

const getEnrollments = async (token) => {
  return axios
    .get(ENROLLMENTS_ROUTE, {
      data: {
        token: token,
        personId: personId,
      },
    })
    .then((response) => {
      return response.data.role;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = { getFavorites, getEnrollments };
