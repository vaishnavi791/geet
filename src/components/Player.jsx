import { useState, useEffect } from "react";

function Player({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
  audioRef,
  showLyrics,
  setShowLyrics
}) {

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentSongIndex]);

  const nextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex(
      currentSongIndex - 1 < 0
        ? songs.length - 1
        : currentSongIndex - 1
    );
    setIsPlaying(true);
  };

return (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,        
      right: 0,     
      backgroundColor: "#4f0101ff",
      padding: "20px",
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",
      gap: "20px"
    }}
  >
    <div style={{ textAlign: "center"}}>
      <h3 style={{ margin: "0" }}>{songs[currentSongIndex].title}</h3>
      <p style={{margin:0, fontSize: "14px"}}>
        {songs[currentSongIndex].artist}
      </p>
    </div>

    <img
      src={songs[currentSongIndex].cover}
      alt="cover"
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "10px",
        objectFit: "cover"
      }}
    />

    <button onClick={prevSong}> ⏮ </button>
    <button onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? " ❚❚ " : " ► "}
    </button>
    <button onClick={nextSong}> ⏭ </button>
    <button onClick={() => setShowLyrics((prev) => !prev)}>
      {showLyrics ? "Hide lyrics" : "Lyrics"}
    </button>

  </div>
);
}

export default Player;
