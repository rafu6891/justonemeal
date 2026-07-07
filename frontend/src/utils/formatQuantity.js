export function formatQuantity(quantity) {
  const value = Number(quantity);

  const fractions = {
    0.25: "¼",
    0.5: "½",
    0.75: "¾",
    1.25: "1¼",
    1.5: "1½",
    1.75: "1¾",
    2.25: "2¼",
    2.5: "2½",
    2.75: "2¾",
  };

  return fractions[value] || quantity;
}