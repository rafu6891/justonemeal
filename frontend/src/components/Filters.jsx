export default function Filters({
  search,
  setSearch,
  fetchRecipes,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  order,
  setOrder,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "40px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Buscar receta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          minWidth: "220px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={() => fetchRecipes()}
        style={{
          padding: "12px 18px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#ff7043",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Buscar
      </button>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: "14px",
          border: "1px solid #ddd",
          backgroundColor: "white",
          fontWeight: "600",
        }}
      >
        <option value="">Dificultad</option>
        <option value="easy">Fácil</option>
        <option value="medium">Media</option>
        <option value="hard">Difícil</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: "14px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          backgroundColor: "white",
          fontWeight: "600",
        }}
      >
        <option value="">🍽️ Categorías</option>
        <option value="Desayuno">🍳 Desayuno</option>
        <option value="Comida">🍝 Comida</option>
        <option value="Cena">🌙 Cena</option>
        <option value="Postre">🍰 Postre</option>
        <option value="Snack">🥪 Snack</option>
      </select>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: "14px",
          border: "1px solid #ddd",
          backgroundColor: "white",
          fontWeight: "600",
        }}
      >
        <option value="">Ordenar</option>
        <option value="-likes">Más likes ❤️</option>
        <option value="time_minutes">Tiempo preparación ⏱</option>
        <option value="title">Título A-Z</option>
      </select>
    </div>
  );
}