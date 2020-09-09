const proxy = require("http-proxy-middleware");
const API_ROOT_URL = process.env.API_ROOT_URL;

module.exports = app => {
  if (!API_ROOT_URL)
    throw new Error("Must configure environment variable API_ROOT_URL");
  app.use(
    "/api/*",
    proxy({
      target: API_ROOT_URL,
      changeOrigin: true
    })
  );
};
