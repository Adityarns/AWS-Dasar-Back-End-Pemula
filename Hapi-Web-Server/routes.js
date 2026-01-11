const routes = [
  {
    method: "*",
    path: "/",
    handler: (request, h) => {
      return `method tidak dapat digunakan`;
    },
  },
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Homepage";
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (request, h) => {
      return `Tidak dapat mengakses about dengan method tersebut`;
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About";
    },
  },
  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name = "Stranger" } = request.params;
      const { lang } = request.query;
      if (lang === "id") {
        return `Hai ${name}`;
      }
      return `Hello ${name}`;
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "Tidak dapat diakses";
    },
  },
];

module.exports = routes;
