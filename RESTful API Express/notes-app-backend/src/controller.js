import { nanoid } from "nanoid";
import notes from "./notes.js";

export const createNote = (req, res, next) => {
  const { tittle = "untitled", tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = { tittle, tags, body, id, createdAt, updatedAt };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: "Success",
      message: "Catatan berhasil ditambahkan",
      data: { noteId: id },
    });
  }
  return res.status(500).json({
    status: "Failed",
    message: "Catatan gagal ditambahkan",
  });
};

export const getNote = (req, res) => {
  return res.json({
    status: "Success",
    data: { notes },
  });
};

export const getNotebyID = (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);
  if (note) {
    return res.json({
      status: "Success",
      data: { note },
    });
  }
  return res.status(404).json({
    status: "Failed",
    message: "Catatan tidak ditemukan",
  });
};

export const editNoteByID = (req, res) => {
  const { id } = req.params;
  const { tittle, tag, body } = req.body;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], tittle, tag, body, updatedAt };
    return res.json({
      status: "Success",
      message: "Catatan berhasil diperbarui",
    });
  }
  return res.status(404).json({
    status: "Failed",
    message: "Catatan gagal diperbarui, id tidak dapat ditemukan.",
  });
};

export const deleteNoteById = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return res.json({
      status: "Success",
      message: "Catatan berhasil dihapus.",
    });
  }
  return res.status(404).json({
    status: "Failed",
    message: "Catatan gagal dihapus",
  });
};
