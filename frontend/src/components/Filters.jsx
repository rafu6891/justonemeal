import { useTheme } from "../context/ThemeContext";
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
  const { theme } = useTheme();
  
  const inputStyle = {
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    minWidth: "220px",
    fontSize: "16px",
    outline: "none",
  };

  const selectStyle = {
    padding: "12px 16px",
    borderRadius: "14px",
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    fontWeight: "600",
    outline: "none",
  };

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
        style={inputStyle}
      />

      <button
        onClick={() => fetchRecipes()}
        style={{
          padding: "12px 18px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: theme.primary,
          color: "#fff",
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
        style={selectStyle}
      >
        <option value="">Dificultad</option>
        <option value="easy">Fácil</option>
        <option value="medium">Media</option>
        <option value="hard">Difícil</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={selectStyle}
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
        style={selectStyle}
      >
        <option value="">Ordenar</option>
        <option value="-likes">Más likes ❤️</option>
        <option value="time_minutes">Tiempo preparación ⏱</option>
        <option value="title">Título A-Z</option>
      </select>
    </div>
  );
}