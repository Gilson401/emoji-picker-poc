<template>
  <div id="app" class="flex flex-col h-screen bg-white relative">
    <!-- <div class="relative inset-x-0"> -->
    <emoji-picker
      v-show="showPicker"
      @click="selectEmoji"
      ref="emoji"
      class="-translate-x-1/2 -translate-y-1/2 absolute inset-1/2 transform"
    />
    <!-- </div> -->

    <div class="flex-grow">
      <p
        class="bg-blue-200 text-left m-2 p-2 rounded-md"
        v-for="(text, index) in textList"
        :key="index"
      >
        {{ text }}
      </p>
    </div>
    <div class="flex m-2">
      <button
        ref="action"
        type="button"
        class="text-3xl mr-2 border border-gray-400 rounded-md"
        @click="showPicker = !showPicker"
      >
        &#128578;
      </button>
      <div
        ref="content"
        class="content"
        contenteditable="true"
        data-placeholder="Mensagem"
        @blur="focusIn = false"
        @focus="focusIn = true"
        @input="handleInput"
        @keydown="handleKeydown"
        @paste="handlePaste"
      />
      <button
        type="button"
        class="text-3xl ml-2 border border-gray-400 rounded-md"
        @click="send"
      >
        ➤
      </button>
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
      textList: ["Hell or World"],
      focusIn: false,
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
        this.$refs.content.innerHTML = this.$refs.content.innerHTML.concat(
          detail.emoji.unicode
        );
      }
    },
    close(e) {
      console.log(e.target);
      this.$nextTick(() => {
        if (this.$refs.action && !this.$refs.action.contains(e.target)) {
          this.showPicker = false;
        }
      });
    },
    handleInput(event) {
      console.log("chat/INPUT_MESSAGE", event.target.innerText);
    },
    send() {
      this.textList.push(this.$refs.content.innerHTML);
      this.$refs.content.innerHTML = "";
    },
    handleKeydown(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        console.log("chat/sendMessage");
        this.textList.push(this.$refs.content.innerHTML);
        this.$refs.content.innerHTML = "";
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const plainText = event.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, plainText);
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
}
.inputs {
  position: relative;
  display: inline-block;
  width: auto;
}
/* .emoji-selector {
  display: block;
  position: absolute;

} */

.content {
  background-image: none;
  position: relative;
  border-style: none;
  overflow-x: hidden;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border: 1px solid grey;
  transition: height 100ms;
  max-height: calc(30rem - 1rem);
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
