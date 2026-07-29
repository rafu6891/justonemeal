export default function Header({
  recipes,
  theme,
  darkMode,
  setDarkMode,
}) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "900px",
        margin: "0 auto 40px auto",
        padding: "35px 30px",
        textAlign: "center",
        backgroundImage: darkMode
          ? "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/texture-wood.jpg')"
          : "url('/images/texture-wood.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "24px",
        color: theme.text,
        textShadow: darkMode
          ? "0 1px 3px rgba(0,0,0,0.8)"
          : "0 1px 2px rgba(255,255,255,0.3)",
        boxShadow: theme.shadow,
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "22px",
          background: theme.card,
          color: theme.text,
          boxShadow: theme.shadow,
          transition: "0.3s",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <img
        src="/images/logo-jom-icon.png"
        alt="JustOneMeal"
        style={{
          height: "180px",
          marginBottom: "10px",
        }}
      />

      <h1
        style={{
          margin: 0,
          fontSize: "56px",
          color: theme.text,
          fontWeight: "700",
        }}
      >
        JustOneMeal
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginTop: "15px",
          marginBottom: "20px",
          color: theme.text,
          opacity: 0.95,
        }}
      >
        Recetas sencillas para cualquier día.
      </p>

      <div
        style={{
          display: "inline-block",
          backgroundColor: darkMode
            ? "rgba(255,255,255,0.12)"
            : "rgba(255,255,255,0.25)",
          padding: "10px 18px",
          borderRadius: "999px",
          fontSize: "20px",
          fontWeight: "600",
          color: theme.text,
        }}
      >
        {recipes.length} recetas disponibles
      </div>
    </div>
  );
}