const proxy = require("http-proxy-middleware");

const API_ROOT_URL = process.env.REACT_APP_API_ROOT_URL;

module.exports = app => {
  console.log("(setupProxy) setup /api and /asset")
  if (!API_ROOT_URL)
    throw new Error("Must configure environment variable API_ROOT_URL");
  app.use(
    "/api/*",
    proxy({
      target: API_ROOT_URL,
      changeOrigin: true
    })
  );
  app.use(
    "/asset/*",
    proxy({
      target: API_ROOT_URL,
      changeOrigin: true
    })
  );
};
