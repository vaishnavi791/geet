function SongList({ songs, setCurrentSongIndex, setIsPlaying }) {
  return (
    <div>
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => {
            setCurrentSongIndex(song.originalIndex); 
            setIsPlaying(true);
          }}
          style={{
            padding: "10px 16px",
            borderBottom: "1px solid #222",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          <strong>{song.title}</strong> — {song.artist}
        </div>
      ))}
    </div>
  );
}
export default SongList;