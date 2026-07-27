export default function Header({ recipes }) {
  return (

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 40px auto",
          padding: "35px 30px",
          textAlign: "center",
          backgroundImage: "url('/images/texture-wood.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "24px",
          color: "#3b2a1a",
          textShadow: "0 1px 2px rgba(255,255,255,0.3)",
          boxShadow: "0 6px 18px rgba(60,40,20,0.12)",
        }}
      >

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
            color: "#3b2a1a",
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
            opacity: "0.95",
          }}
        >
          Recetas sencillas para cualquier día.
        </p>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.25)",
            padding: "10px 18px",
            borderRadius: "999px",

            fontSize: "20px",
            fontWeight: "600",
            color: "#3b2a1a",
          }}
        >
          <span>
            {recipes.length} recetas disponibles
          </span>
        </div>
      </div>

  );
}