const Playlist = require("../models/Playlist");

exports.createPlaylist = async (req, res) => {
  try {
    const { name, songs } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Playlist name is required." });
    }

    const playlist = new Playlist({
      name,
      songs: Array.isArray(songs) ? songs : [],
    });
    const savedPlaylist = await playlist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    console.error("Error creating playlist:", error.message);
    res.status(500).json({ message: "Failed to create playlist." });
  }
};

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ message: "Failed to load playlists." });
  }
};
