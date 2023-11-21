const express = require("express");
const router = express.Router();
const note = require("../models/notesModel");
const {
  getNotes,
  createNote,
  deleteNote,
} = require("../controllers/notesController");

router.get("/notes", async (req, res) => {
  getNotes(res);
});

router.post("/newNote", (req, res) => {
  createNote(req, res);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  note
    .findByIdAndDelete({ _id: id })
    .then(() => {
      return res.status(200).json("Note deleted");
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// router.delete("/:id", (req, res) => {
//   console.log("Delete existent note");
//   res.send("Delete existent note");
// });

// router.patch("/:id", (req, res) => {
//   res.send("To update the existent note");
//   console.log("To update the existent note");
// });

module.exports = router;
