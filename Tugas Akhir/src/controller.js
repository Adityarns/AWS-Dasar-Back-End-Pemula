import { nanoid } from "nanoid";
import books from "./books.js";

export const createBook = (req, res, next) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;
  const id = nanoid(16);
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
  }
  if (readPage > pageCount) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return res.status(201).json({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    });
  }
  return res.status(400).json({
    status: "fail",
    message: "Gagal menambahkan buku",
  });
};

export const getBook = (req, res) => {
  const { reading, finished, name } = req.query;

  let filteredBooks = books;

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === (reading === "1"),
    );
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === (finished === "1"),
    );
  }
  
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  const simplifiedBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return res.status(200).json({
    status: "success",
    data: { books: simplifiedBooks },
  });
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find((n) => n.id === id);
  if (book) {
    return res.status(200).json({
      status: "success",
      data: { book },
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
};

export const editBookById = (req, res) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
  }
  if (readPage > pageCount) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((n) => n.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    return res.status(200).json({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
};

export const deleteBookById = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((n) => n.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    return res.status(200).json({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
};
