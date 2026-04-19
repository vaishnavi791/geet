const express = require("express");
const {
  getSongs,
  getSongById,
  searchSongs,
} = require("../controllers/songController");

const router = express.Router();

router.get("/search", searchSongs);
router.get("/:id", getSongById);
router.get("/", getSongs);

module.exports = router;
