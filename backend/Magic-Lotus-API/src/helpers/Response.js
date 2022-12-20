const create400Response = (error, method, route) => {
  return {
    success: false,
    data: "",
    error: error,
    method: method,
    route: route,
    status: 400,
  };
};
const create200Response = (data, method, route) => {
  return {
    success: true,
    data: data,
    error: "",
    method: method,
    route: route,
    status: 200,
  };
};

module.exports = {
  create400Response,
  create200Response,
};
