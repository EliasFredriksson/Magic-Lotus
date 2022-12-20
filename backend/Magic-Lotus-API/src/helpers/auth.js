require("dotenv").config();
const jwt = require("jsonwebtoken");

const { ROLES } = require("../constants/ROLES");

const AUTH_TOKEN = "magicLotusAPIAuthToken";
// ----------------------------------------------------------
// ### MIDDLEWARE ###
function checkIfLoggedIn(req, res, next) {
  // Extract auth token.
  const token = req.cookies[AUTH_TOKEN];
  // Verify token with env secret.
  if (token && jwt.verify(token, process.env.JWT_SECRET)) {
    // Decode stored data in jwt.
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    // Check if request has allowed role.
    if ([ROLES.user, ROLES.admin].includes(tokenData.role)) {
      next();
    } else {
      res.status(401).send({
        msg: "Unauthorized",
        error: "You do not have correct permissions.",
      });
    }
  } else {
    res.status(401).send({
      msg: "Unauthorized",
      error: "You need to be logged in.",
    });
  }
}
function checkIfAdmin(req, res, next) {
  const token = req.cookies[AUTH_TOKEN];
  if (token && jwt.verify(token, process.env.JWT_SECRET)) {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    if (tokenData.role === ROLES.admin) {
      next();
    } else {
      res.status(401).send({
        msg: "Unauthorized",
        error: "You do not have correct permissions.",
      });
    }
  } else {
    res.status(401).send({
      msg: "Unauthorized",
      error: "You need to be logged in.",
    });
  }
}

// ----------------------------------------------------------

module.exports = {
  AUTH_TOKEN,
  checkIfLoggedIn,
  checkIfAdmin,
};
