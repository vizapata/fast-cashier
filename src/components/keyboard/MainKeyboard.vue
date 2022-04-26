<script>
import { mapActions } from "pinia";
import Button from "primevue/button";
import { ALLOWED_ACTIONS, KEY_TYPES } from "../../config";
import { keyboardStore } from "../../stores/keyboard";
export default {
  components: { Button },
  data() {
    return {
      leftValue: 0,
      operator: "",
      rightValue: null,
      result: 0,
      hasResult: false,
      actions: Object.freeze([
        {
          name: "key-clear",
          value: ALLOWED_ACTIONS.DELETE,
          display: "C",
          type: KEY_TYPES.ACTION,
        },
        {
          name: "key-return",
          value: ALLOWED_ACTIONS.BACKSPACE,
          display: "<-",
          type: KEY_TYPES.ACTION,
        },
        {
          name: "key-equals",
          value: ALLOWED_ACTIONS.ENTER,
          display: "=",
          type: KEY_TYPES.ACTION,
        },
      ]),
      keys: Object.freeze([
        { name: "key-1", value: 1, display: "1", type: KEY_TYPES.DIGIT },
        { name: "key-2", value: 2, display: "2", type: KEY_TYPES.DIGIT },
        { name: "key-3", value: 3, display: "3", type: KEY_TYPES.DIGIT },
        { name: "key-4", value: 4, display: "4", type: KEY_TYPES.DIGIT },
        { name: "key-5", value: 5, display: "5", type: KEY_TYPES.DIGIT },
        { name: "key-6", value: 6, display: "6", type: KEY_TYPES.DIGIT },
        { name: "key-7", value: 7, display: "7", type: KEY_TYPES.DIGIT },
        { name: "key-8", value: 8, display: "8", type: KEY_TYPES.DIGIT },
        { name: "key-9", value: 9, display: "9", type: KEY_TYPES.DIGIT },
        { name: "key-0", value: 0, display: "0", type: KEY_TYPES.DIGIT },
        {
          name: "key-00",
          value: ALLOWED_ACTIONS.HUNDRED,
          display: ALLOWED_ACTIONS.HUNDRED,
          type: KEY_TYPES.ACTION,
        },
        {
          name: "key-000",
          value: ALLOWED_ACTIONS.THOUSAND,
          display: ALLOWED_ACTIONS.THOUSAND,
          type: KEY_TYPES.ACTION,
        },
        {
          name: "key-multiply",
          value: "*",
          display: "*",
          type: KEY_TYPES.OPERATION,
        },
        {
          name: "key-plus",
          value: "+",
          display: "+",
          type: KEY_TYPES.OPERATION,
        },
      ]),
    };
  },
  mounted() {
    this.actions.forEach((key) => this.registerKey(key.value, key));
    this.keys.forEach((key) => this.registerKey(key.value, key));
  },
  beforeUnmount() {
    this.keys.forEach((key) => this.unRegisterKey(key.value, key));
    this.actions.forEach((key) => this.unRegisterKey(key.value, key));
  },
  methods: {
    ...mapActions(keyboardStore, [
      "keyPressed",
      "registerKey",
      "unRegisterKey",
    ]),
    equals() {
      this.leftValue = Math.floor(eval(this.displayValue));
      this.rightValue = null;
      this.operator = "";
      this.hasResult = true;
    },
    clear() {
      this.leftValue = 0;
      this.rightValue = null;
      this.operator = "";
      this.hasResult = false;
      this.result = 0;
    },
    backspace() {
      if (this.rightValue !== null) {
        if (this.rightValue <= 9) this.rightValue = null;
        else this.rightValue = Math.floor(this.rightValue / 10);
      } else if (this.operator !== "") this.operator = "";
      else this.leftValue = Math.floor(this.leftValue / 10);
    },
  },
  computed: {
    displayValue() {
      const r = this.rightValue > 0 ? this.rightValue : "";
      if (this.operator === "") return `${this.leftValue}`;
      else return `${this.leftValue} ${this.operator} ${r}`;
    },
  },
};
</script>

<template>
  <div class="keyboard">
    <div class="actions">
      <Button
        v-for="key in this.actions"
        :key="key.name"
        :class="`p-button-outlined p-button-secondary ${key.name}`"
        :label="key.display"
        @click="keyPressed(key)"
      />
    </div>
    <div class="numbers">
      <Button
        v-for="key in this.keys"
        :key="key.name"
        :class="`p-button-outlined p-button-secondary ${key.name}`"
        :label="key.display"
        @click="keyPressed(key)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.display {
  color: darkgray;
  text-align: right;
  padding: 30px 0;
  font-size: 2em;
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .key {
    padding: 10px;
    text-align: center;
    border: solid 1px darkgray;
    border-radius: 3px;
    display: block;
    cursor: pointer;
    font-size: large;
    color: darkgray;
    background-color: #000;
    font-weight: bolder;

    &:hover {
      color: darkgray;
    }
  }

  .numbers {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);

    .key-7,
    .key-8,
    .key-9,
    .key-multiply {
      grid-row-start: 1;
    }

    .key-4,
    .key-5,
    .key-6,
    .key-divide {
      grid-row-start: 2;
    }

    .key-1,
    .key-2,
    .key-3,
    .key-plus {
      grid-row-start: 3;
    }

    .key-0,
    .key-00,
    .key-000,
    .key-minus {
      grid-row-start: 4;
    }

    .key-multiply,
    .key-plus {
      grid-row-end: span 2;
    }
  }

  .actions {
    @extend .numbers;
    grid-template-rows: 1fr;
  }
}
</style>
