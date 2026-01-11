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
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "Tidak dapat diakses";
    },
  },
];

module.exports = routes;
