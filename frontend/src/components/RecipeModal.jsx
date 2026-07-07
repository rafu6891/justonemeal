export default function RecipeModal({ recipe, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
            position: "relative",
            backgroundColor: "white",
            width: "900px",
            maxWidth: "95%",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "20px",
        }}
      >
        {recipe.image && (
            <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                }}
            />
            )}

            <div
            style={{
                padding: "30px",
            }}
            >
            <h1
                style={{
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "34px",
                color: "#333",
                }}
            >
                {recipe.title}
            </h1>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px",
                    color: "#666",
                    fontWeight: "600",
                    fontSize: "15px",
                }}
            >
                <span>❤️ {recipe.likes}</span>
                <span>⏱️ {recipe.time_minutes} min</span>
                <span>{recipe.difficulty}</span>
            </div>

            <button
                onClick={onClose}
                style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,.15)",
                }}
            >
                ✕
            </button>
            </div>
      </div>
    </div>
  );
}