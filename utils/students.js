const { FAVORITES_ROUTE, ENROLLMENTS_ROUTE } = require("./constants");
const axios = require("axios");

const getFavorites = async (token) => {
  return axios
    .get(FAVORITES_ROUTE, {
      data: {
        token: token,
      },
    })
    .then((response) => {
      return response.data;
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
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = { getFavorites, getEnrollments };
