import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        padding: "25px 15px",
        marginTop: "40px",
        textAlign: "center",
        borderTop: `1px solid ${theme.border}`,
        color: theme.text,
        fontSize: "14px",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} JustOneMeal. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}