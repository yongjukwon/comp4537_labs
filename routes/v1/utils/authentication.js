const authenticate = async ({ req, args }) => {
  const loggedIn = req.cookies.token;

  args = {
    ...args,
    loggedIn: loggedIn ? true : false,
    signUp: loggedIn ? "Log out" : "Sign up",
    signUpRoute: loggedIn ? "./logout" : "./register.html",
  };

  return args;
};

module.exports = authenticate;
