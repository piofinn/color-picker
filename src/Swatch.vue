<template>
  <div
    class="swatch"
    :style="backgroundStyle">
    <p
      class="color-value"
      :class="getUiColor()">
      {{ hexValue }}
    </p>
    <p
      class="actions">
      <font-awesome-icon
        icon="clone"
        class="ui-overlay"
        :class="getUiColor()"
        @click="test" />
      <font-awesome-icon
        icon="trash"
        class="ui-overlay"
        :class="getUiColor()"
        @click="test" />
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
  },
  methods: {
    test: function(event) {
      console.log("event triggered", event);
    },
    getUiColor: function() {
      return this.lightUi ? "white" : "black";
    }
  }
};
</script>

<style scoped>
.swatch {
  position: relative;
  width: auto;
  padding: 16px;
  margin: 16px;
  transition: height ease-in-out 0.3s;
  -webkit-transition: height ease-in-out 0.3s;
}
p {
  margin: 0;
}
p.actions {
  padding: 8px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  text-align: end;
}
p.actions > svg {
  padding: 8px;
  cursor: pointer;
}
.color-value {
  padding-bottom: 3em;
  font-family: "Archivo Black", "Gill Sans", "Gill Sans MT", Calibri,
    "Trebuchet MS", sans-serif;
  font-size: 2vw;
}
</style>
