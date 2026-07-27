export default function Pagination({
  pageNumber,
  totalPages,
  previousPage,
  nextPage,
  fetchRecipes,
  setPageNumber,
}) {
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
          width: "40px",
          height: "40px",
          border: "none",
          borderRadius: "12px",
          backgroundColor: "white",
          cursor: previousPage ? "pointer" : "default",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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
            minWidth: "40px",
            height: "40px",
            border: "none",
            borderRadius: "12px",
            backgroundColor:
              pageNumber === index + 1 ? "#ff7043" : "white",
            color:
              pageNumber === index + 1 ? "white" : "#333",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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
          width: "40px",
          height: "40px",
          border: "none",
          borderRadius: "12px",
          backgroundColor: "white",
          cursor: nextPage ? "pointer" : "default",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          opacity: nextPage ? 1 : 0.5,
        }}
      >
        ▶
      </button>
    </div>
  );
}