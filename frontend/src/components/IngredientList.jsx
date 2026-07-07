import { formatQuantity } from "../utils/formatQuantity";

export default function IngredientList({ ingredients }) {
  if (!ingredients?.length) {
    return <p>Sin ingredientes</p>;
  }

  return (
    <ul
      style={{
        paddingLeft: "20px",
        lineHeight: "2",
        margin: 0,
      }}
    >
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          {ingredient.to_taste ? (
            <>
              {ingredient.name} al gusto
            </>
          ) : ingredient.unit === "unit" ? (
            <>
              {formatQuantity(ingredient.quantity)} {ingredient.name}
            </>
          ) : (
            <>
              {formatQuantity(ingredient.quantity)}{" "}
              {ingredient.unit_display} {ingredient.name}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}