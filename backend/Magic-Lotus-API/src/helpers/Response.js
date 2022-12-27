const create400Response = (error, req) => {
  return {
    object: "magic_lotus_error",
    data: "",
    error: error,
    method: req.method,
    route: req.originalUrl,
    status: 400,
  };
};
const create200Response = (data, req) => {
  return {
    object: "magic_lotus_success",
    data: data,
    error: "",
    method: req.method,
    route: req.originalUrl,
    status: 200,
  };
};

module.exports = {
  create400Response,
  create200Response,
};
