import { useState, useRef } from "react";
import { songs } from "./songs";
import SongList from "./components/SongList";
import Player from "./components/Player";
import SearchBar from "./components/SearchBar";

function App() {
  const [search, setSearch] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef(null);

  const filteredSongs = songs
    .map((song, index) => ({ ...song, originalIndex: index }))
    .filter((song) =>
      song.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    // main container
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#121212",
        display: "flex",
        justifyContent: "center",
        padding:"24px",
        paddingTop: "24px",
        paddingBottom: "120px",
        boxSizing: "border-box", 
      }}
    >
      {/* main card */}
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

        {/* scroll bar for song list */}
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

        {/* lyrics panel */}
        {showLyrics && (
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
              {songs[currentSongIndex].lyrics || "Lyrics not available."}
            </p>
          </div>
        )}
      </div>

      {/* audio and player container */}
      <audio ref={audioRef} src={songs[currentSongIndex].src} />
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
