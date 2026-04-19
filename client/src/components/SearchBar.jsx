function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="What are you looking for 🔎︎"
      style={{
        textAlign: "center",
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        fontSize: "16px"
      }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
