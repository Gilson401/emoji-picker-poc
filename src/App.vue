<template>
  <div ref="actions" id="app">
    <p>Selecione um emoji</p>
    <div class="inputs">
      <input type="text" v-model="textInput" />
      <button type="button" @click="showPicker = !showPicker">
        Show/Hide Emojis
      </button>
      <div class="emoji-selector">
        <emoji-picker v-show="showPicker" @click="selectEmoji" ref="emoji" />
      </div>
    </div>
  </div>
</template>

<script>
import "emoji-picker-element";

export default {
  name: "App",
  data() {
    return {
      showPicker: false,
      textInput: "",
    };
  },
  mounted() {
    this.$refs.emoji.addEventListener("emoji-click", this.selectEmoji);
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    this.$refs.emoji.removeEventListener("emoji-click", this.selectEmoji);
    document.removeEventListener("click", this.close);
  },
  methods: {
    selectEmoji(event) {
      const { detail } = event;
      if (typeof detail === "object") {
        this.textInput = this.textInput.concat(detail.emoji.unicode);
      }
    },
    close(e) {
      this.$nextTick(() => {
        if (this.$refs.actions && !this.$refs.actions.contains(e.target)) {
          this.showPicker = false;
        }
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.inputs {
  position: relative;
  display: inline-block;
  width: auto;
}
.emoji-selector {
  display: block;
  position: absolute;
  margin: 5px 0;
}

emoji-picker > .picker {
  text-align: center;
}

@media screen and (max-width: 320px) {
  emoji-picker {
    --num-columns: 6;
    --category-emoji-size: 1.125rem;
  }
}
</style>
