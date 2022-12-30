const mongoose = require("mongoose");

class OptionalString extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, "OptionalString");
  }

  // `cast()` takes a parameter that can be anything. You need to
  // validate the provided `val` and throw a `CastError` if you
  // can't convert it.
  cast(val) {
    if (typeof val === "undefined") return val;
    if (typeof val === "string") return val;
    if (val === null) return val;
    throw new Error(
      `OptionalString: Provided value is not of valid type (string|undefined|null): ${
        (val, typeof val)
      }`
    );
  }
}
class OptionalNumber extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, "OptionalString");
  }
  cast(val) {
    if (typeof val === "undefined") return val;
    if (typeof val === "number") return val;
    if (val === null) return val;
    throw new Error(
      `OptionalNumber: Provided value is not of valid type (number|undefined|null): ${
        (val, typeof val)
      }`
    );
  }
}
mongoose.Schema.Types.OptionalString = OptionalString;
mongoose.Schema.Types.OptionalNumber = OptionalNumber;

module.exports = {
  OptionalString,
  OptionalNumber,
};
