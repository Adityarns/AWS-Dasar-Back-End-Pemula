const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Powered-By", "Node.js");
  response.statusCode = 200;
  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: `Ini adalah Homepage`,
        })
      );
      // response.end("<h1>Ini halaman utama!!!</h1>");
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Tidak dapat menggunakan methode ${method}`,
        })
      );
      // response.end(`Tidak dapat meresponse ${method}`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: `Ini halaman About`,
        })
      );
      // response.end("<h1>Ini halaman About!!!</h1>");
    } else if (method === "POST") {
      let body = [];
      response.statusCode = 200;
      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(
          JSON.stringify({
            message: `Halo ${name} selamat datang di halaman about`,
          })
        );
        // response.end(`<h1>Hai, ${name}!</h1>`);
      });
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Tidak dapat menggunakan methode ${method}`,
        })
      );
      // response.end(`Tidak dapat meresponse ${method}`);
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: `${url} belum tersedia untuk saat ini`,
      })
    );
    // response.end(`${url} belum tersedia`);
  }

  //   if (method === "GET") {
  //     response.end("<h1>Dapat!!!</h1>");
  //   }
  //   if (method === "POST") {
  //     let body = [];

  //     request.on("data", (chunk) => {
  //       body.push(chunk);
  //     });

  //     request.on("end", () => {
  //       body = Buffer.concat(body).toString();
  //       const { name } = JSON.parse(body);
  //       response.end(`<h1>Hai, ${name}!</h1>`);
  //     });
  //   }

  //   if (method === "PUT") {
  //     response.end("<h1>Ambil!!!</h1>");
  //   }
  //   if (method === "DELETE") {
  //     response.end("<h1>Hapus!!!</h1>");
  //   }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server sedang berjalan pada http://${host}:${port}`);
});
