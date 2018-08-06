<template>
  <div
    id="main-container"
    :style="backgroundStyle"
    @copy.stop="copyValue">
    <h1
      class="ui-overlay"
      :class="[lightUi ? 'white' : 'black']">
      {{ hexValue }}
    </h1>
    <Touchpad
      :color="color"
      :light-ui="lightUi"
      :locked="locked"
      @click="console.log('v-on:click')" />
    <div id="swatches-container">
      <Swatch
        v-for="singleColor in this.savedColors"
        :key="singleColor.id"
        :color="singleColor.color" />
    </div>
  </div>
</template>

<script>
import { hsvToRgb, findColorLightness } from "./util/colorConversion.js";
import Touchpad from "./Touchpad.vue";
import Swatch from "./Swatch.vue";

export default {
  data: function() {
    return {
      color: {
        h: Math.floor(Math.random() * 360),
        s: Math.random(),
        v: 1
      },
      savedColors: [],
      colorId: 0,
      locked: false
    };
  },
  computed: {
    hexValue: function() {
      return hsvToRgb(this.color, true);
    },
    lightUi: function() {
      return findColorLightness(this.color) < 0.1791;
    },
    backgroundStyle: function() {
      return {
        backgroundColor: this.hexValue
      };
    }
  },
  components: {
    Touchpad,
    Swatch
  },
  methods: {
    copyValue: function(event) {
      event.clipboardData.setData("text/plain", this.hexValue);
      event.preventDefault();
    },
    toggleLock: function() {
      this.locked = !this.locked;
    },
    saveColor: function() {
      this.savedColors.push({
        id: this.colorId++,
        color: Object.assign({}, this.color)
      });
    },
    makeListeners: function() {
      var lockFunc = this.toggleLock;
      var saveFunc = this.saveColor;
      return function(event) {
        if (event.keyCode === 32) {
          lockFunc();
          event.preventDefault();
        } else if (event.key == "s" && (event.ctrlKey || event.metaKey)) {
          saveFunc();
          event.preventDefault();
        }
      };
    }
  },
  mounted: function() {
    document.addEventListener("keydown", this.makeListeners(), false);
  }
};
</script>

<style>
#swatches-container {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  width: 300px;
  height: 100vh;
  padding-top: 2rem;
  background-color: #222;
  overflow-y: scroll;
}
</style>
