const plus = { name: "plus", symbol: "+", icon: null };
const minus = { name: "minus", symbol: "-", icon: null };
const multiply = { name: "multiply", symbol: "*", icon: null };
// const divide = { name: "divide", symbol: "/", icon: null };

export const REGISTERED_SPECIAL_KEYS = Object.freeze({
  plus,
  minus,
  multiply,
});

export const ALLOWED_OPERATORS = Object.freeze(
  [plus, minus, multiply].map((_) => _.symbol)
);

export const KEY_TYPES = Object.freeze({
  CATEGORY: "CATEGORY",
  DIGIT: "DIGIT",
  OPERATION: "OPERATION",
});

export const DEFAULT_CATEGORIES = [
  {
    name: "Quesos",
    id: "QUESO",
    icon: "cheese.png",
    shortcut: "Q",
  },
  {
    name: "Yogur",
    id: "YOGUR",
    icon: "yogur.png",
    shortcut: "Y",
  },
  {
    name: "Torta",
    id: "TORTA",
    icon: "cake.png",
    shortcut: "T",
  },
];
