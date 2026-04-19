const Song = require("../models/Song");

exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ title: 1 });
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error.message);
    res.status(500).json({ message: "Failed to load songs." });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.json(song);
  } catch (error) {
    console.error("Error fetching song:", error.message);
    res.status(500).json({ message: "Failed to load song." });
  }
};

exports.searchSongs = async (req, res) => {
  try {
    const query = req.query.q || "";
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
      ],
    }).sort({ title: 1 });
    res.json(songs);
  } catch (error) {
    console.error("Error searching songs:", error.message);
    res.status(500).json({ message: "Search failed." });
  }
};
