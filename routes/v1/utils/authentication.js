const { getRole } = require("../../../utils/roles");

const authenticate = async ({ req, args }) => {
  const loggedIn = req.cookies.token;
  const role = await getRole(req.cookies.token);
  console.log(role);

  args = {
    ...args,
    loggedIn: loggedIn ? true : false,
    signUp: loggedIn ? "Log out" : "Sign up",
    signUpRoute: loggedIn ? "./logout" : "./register.html",
    role,
  };

  return args;
};

module.exports = authenticate;
