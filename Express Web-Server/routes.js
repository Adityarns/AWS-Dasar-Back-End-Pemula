import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Homepage");
});

router.get("/about", (req, res) => {
  res.send("About");
});

router.get(["/hello", "/hello/:name"], (req, res) => {
  const name = req.params.name || "Guest";
  const { lang } = req.query;

  if (lang === "id") {
    return res.send(`Hai, ${name}!`);
  }

  res.send(`Hello, ${name}!`);
});

router.post("/login", (req, res) => {
  const { username } = req.body;
  res.send(`Welcome ${username}!`);
});

router.all("/", (req, res) => {
  res.status(405).send("Halaman tidak dapat diakses dengan method tersebut");
});

router.all("/about", (req, res) => {
  res.status(405).send("Halaman tidak dapat diakses dengan method tersebut");
});

// Middleware untuk 404 selalu diletakkan paling bawah
router.use((req, res) => {
  res.status(404).send("Halaman tidak dapat ditemukan");
});

export default router;
