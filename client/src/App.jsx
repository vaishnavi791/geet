import { useState, useEffect, useRef } from "react";
import SongList from "./components/SongList";
import Player from "./components/Player";
import SearchBar from "./components/SearchBar";

function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE}/api/songs`);
        if (!response.ok) {
          throw new Error("Server returned an error while loading songs.");
        }
        const data = await response.json();
        setSongs(data);
        setCurrentSongIndex(0);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load songs. Please check backend or database.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [API_BASE]);

  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    audioRef.current.src = songs[currentSongIndex]?.audioUrl || "";
  }, [songs, currentSongIndex]);

  const filteredSongs = songs
    .map((song, index) => ({ ...song, originalIndex: index }))
    .filter((song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    );

  const currentSong = songs[currentSongIndex] || null;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#121212",
        display: "flex",
        justifyContent: "center",
        padding: "24px",
        paddingTop: "24px",
        paddingBottom: "120px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#181818",
          borderRadius: "10px",
          padding: "16px",
          boxSizing: "border-box",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>गीत</h1>
        <p style={{ textAlign: "center" }}>जो आपका दिल सुना चाहे</p>

        <SearchBar search={search} setSearch={setSearch} />

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading songs...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "#ff6b6b" }}>{error}</p>
        ) : (
          <div
            style={{
              marginTop: "16px",
              height: "320px",
              overflowY: "auto",
              borderRadius: "8px",
              background: "#111",
              padding: "8px 0",
              width: "100%",
              maxWidth: "360px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <SongList
              songs={filteredSongs}
              setCurrentSongIndex={setCurrentSongIndex}
              setIsPlaying={setIsPlaying}
            />
          </div>
        )}

        {showLyrics && currentSong && (
          <div
            style={{
              marginTop: "16px",
              maxHeight: "260px",
              overflowY: "auto",
              borderRadius: "8px",
              background: "#101010",
              padding: "12px 16px",
              fontSize: "14px",
              whiteSpace: "pre-line",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "8px",
                fontSize: "16px",
              }}
            >
              Lyrics
            </h3>
            <p style={{ margin: 0 }}>
              {currentSong.lyrics || "Lyrics not available."}
            </p>
          </div>
        )}
      </div>

      <audio ref={audioRef} />
      <Player
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        showLyrics={showLyrics}
        setShowLyrics={setShowLyrics}
      />
    </div>
  );
}

export default App;
