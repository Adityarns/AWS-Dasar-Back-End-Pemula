import express from "express";
import router from "./routes.js";

const app = express();
const port = 3000;
const host = "localhost";

app.use("/", router);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server sedang berjalan di http://${host}:${port}`);
});
