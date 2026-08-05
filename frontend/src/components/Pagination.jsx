import { useTheme } from "../context/ThemeContext";

export default function Pagination({
  pageNumber,
  totalPages,
  previousPage,
  nextPage,
  fetchRecipes,
  setPageNumber,
}) {
  const { theme } = useTheme();
  
  const buttonStyle = {
    width: "40px",
    height: "40px",
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    backgroundColor: theme.card,
    color: theme.text,
    cursor: "pointer",
    boxShadow: theme.shadow,
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "40px",
        flexWrap: "wrap",
      }}
    >
      <button
        disabled={!previousPage}
        onClick={() => {
          fetchRecipes(previousPage);
          setPageNumber((p) => p - 1);
        }}
        style={{
          ...buttonStyle,
          cursor: previousPage ? "pointer" : "default",
          opacity: previousPage ? 1 : 0.5,
        }}
      >
        ◀
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => {
            fetchRecipes(index + 1);
            setPageNumber(index + 1);
          }}
          style={{
            ...buttonStyle,
            backgroundColor:
              pageNumber === index + 1
                ? theme.primary
                : theme.card,
            color:
              pageNumber === index + 1
                ? "#fff"
                : theme.text,
          }}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={!nextPage}
        onClick={() => {
          fetchRecipes(nextPage);
          setPageNumber((p) => p + 1);
        }}
        style={{
          ...buttonStyle,
          cursor: nextPage ? "pointer" : "default",
          opacity: nextPage ? 1 : 0.5,
        }}
      >
        ▶
      </button>
    </div>
  );
}