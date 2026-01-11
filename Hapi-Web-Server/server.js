const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });
  await server.start();
  server.route(routes);
  console.log(`Server sedang berjalan di ${server.info.uri}`);
};

init();
