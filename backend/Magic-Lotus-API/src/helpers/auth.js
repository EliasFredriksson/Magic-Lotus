require("dotenv").config();
const jwt = require("jsonwebtoken");

const { ROLES } = require("../constants/ROLES");
const { create400Response } = require("./Response");

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
      req.decodedToken = tokenData;
      next();
    } else {
      res.status(401).send(create400Response("Unauthorized.", req));
    }
  } else {
    res.status(401).send(create400Response("Unauthorized.", req));
  }
}
function checkIfAdmin(req, res, next) {
  const token = req.cookies[AUTH_TOKEN];
  if (token && jwt.verify(token, process.env.JWT_SECRET)) {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    if (tokenData.role === ROLES.admin) {
      req.decodedToken = tokenData;
      next();
    } else {
      res.status(401).send(create400Response("Unauthorized.", req));
    }
  } else {
    res.status(401).send(create400Response("Unauthorized.", req));
  }
}

// ----------------------------------------------------------

module.exports = {
  AUTH_TOKEN,
  checkIfLoggedIn,
  checkIfAdmin,
};
