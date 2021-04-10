const axios = require("axios");
const { ROLE_ROUTE } = require("./constants");

const getRole = async (token) => {
  return axios
    .get(ROLE_ROUTE, {
      data: {
        token: token,
      },
    })
    .then((response) => {
      return response.data.role;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = { getRole };
