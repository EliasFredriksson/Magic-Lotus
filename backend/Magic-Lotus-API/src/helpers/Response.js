const create400Response = (error, req) => {
  return {
    success: false,
    data: "",
    error: error,
    method: req.method,
    route: req.originalUrl,
    status: 400,
  };
};
const create200Response = (data, req) => {
  return {
    success: true,
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
