<template>
  <div
    class="swatch"
    :style="backgroundStyle">
    <p
      class="color-value"
      :class="[lightUi ? 'white' : 'black']">
      {{ hexValue }}
    </p>
    <p>
      <i
        class="material-icons"
        :class="[lightUi ? 'white' : 'black']">
        delete
      </i>
    </p>
  </div>
</template>

<script>
import { hsvToRgb, findColorLightness } from "./util/colorConversion.js";

export default {
  name: "Swatch",
  props: {
    color: {
      type: Object,
      required: true,
      validator: value => {
        return value.h !== null && value.s !== null && value.v !== null;
      }
    }
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
  }
};
</script>

<style scoped>
.swatch {
  position: relative;
  width: auto;
  padding: 1em;
  margin: 16px;
  transition: height ease-in-out 0.3s;
  -webkit-transition: height ease-in-out 0.3s;
}
p {
  margin: 0;
}
.color-value {
  padding-bottom: 3em;
  font-family: "Archivo Black", "Gill Sans", "Gill Sans MT", Calibri,
    "Trebuchet MS", sans-serif;
  font-size: 2vw;
}
.material-icons {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
  cursor: pointer;
}
</style>
