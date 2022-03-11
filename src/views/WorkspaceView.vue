<script setup>
import MainKeyboard from '../components/keyboard/MainKeyboard.vue';
import KeyboardDisplay from '../components/keyboard/KeyboardDisplay.vue';
</script>

<template>
  <main>
    <div class="workspace">
      <div class="categories-component">categories</div>
      <div class="keyboard-component">
        <KeyboardDisplay />
        <MainKeyboard />
      </div>
      <div class="record-list-component">record list</div>
      <div class="total-info-component">total info</div>
    </div>
  </main>
</template>

<style lang="scss">
.workspace {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div {
    padding: 10px;
    border: solid red 1px;
  }
}
@media all and (min-width: 800px) {
  .workspace {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    .categories-component,
    .keyboard-component {
      grid-row: 1 / span 2;
    }
    .keyboard-component {
      grid-column-start: 3;
    }

    > div {
      padding: 10px;
      border: solid red 1px;
    }
  }
}
</style>