import { defineStore } from "pinia";
import { ALLOWED_OPERATORS, KEY_TYPES } from "../config";

const isAllowedOperator = (operator) =>
  ALLOWED_OPERATORS.some((_) => _ === operator);

const applyNumericKey = (number, key) => number * 10 + key.value;

const digitPressed = (stack, key) => {
  const top = stack.pop();
  if (isAllowedOperator(top)) {
    stack.push(top);
    stack.push(key.value);
  } else {
    stack.push(applyNumericKey(top, key));
  }
};
const operatorPressed = (stack, key) => {
  const top = stack.pop();
  if (isAllowedOperator(top)) stack.push(key.value);
  else {
    stack.push(top);
    const result = eval(stack.join(" "));
    while (stack.length > 0) stack.pop();
    stack.push(result);
    stack.push(key.value);
  }
};

export const keyboardStore = defineStore({
  id: "keyboardStore",
  state: () => ({
    stack: [0],
    category: {},
    registeredKeys: new Map(),
  }),
  getters: {
    hasOperator: (state) => state.operator !== null,
    display: (state) => state.stack.join(" "),
    current: (state) => state.stack[0],
  },
  actions: {
    keyPressed(key) {
      // console.log("key pressed: ", key);
      switch (key.type) {
        case KEY_TYPES.DIGIT:
          digitPressed(this.stack, key);
          break;
        case KEY_TYPES.OPERATION:
          operatorPressed(this.stack, key);
          break;
        case KEY_TYPES.CATEGORY:
          this.category = key;
          break;
        default:
          break;
      }
    },
    registerKey(key, value) {
      this.registeredKeys.set(`${key}`.toUpperCase(), value);
    },
    unRegisterKey(key) {
      this.registeredKeys.delete(`${key}`.toUpperCase());
    },
    clearKeys() {
      this.registeredKeys.clear();
    },
    existingKeys() {
      return this.registeredKeys.keys;
    },
    hasKey(key) {
      return this.registeredKeys.has(`${key}`.toUpperCase());
    },
    emitKey(key) {
      this.hasKey(`${key}`.toUpperCase()) &&
        this.keyPressed(this.registeredKeys.get(`${key}`.toUpperCase()));
    },
  },
});
