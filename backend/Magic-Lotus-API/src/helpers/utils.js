const bcrypt = require("bcrypt");

// bcrypt is a more secure way to hash passwords and compare stored hashed password with
// user given password (login scenario);
// ----------------------------------------------------------
// ### PASSWORD HANDLING ###
function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
function hashPassword(password) {
  return bcrypt.hashSync(password, 12); // 1 - 10 fast, 10+ slower, 18 (guess) is max.
  // The number (8) indicates how many "rounds" the hashing runs. The higher the number,
  // the more secure it is, but cost more performance.
}
// ----------------------------------------------------------
module.exports = {
  hashPassword,
  comparePassword,
};
