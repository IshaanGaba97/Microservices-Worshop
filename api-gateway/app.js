const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

const routes = {
  "/auth": "http://localhost:3000",
  "/post": "http://localhost:3001",
  "/profile": "http://localhost:3002",
};

for (const route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
}

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
