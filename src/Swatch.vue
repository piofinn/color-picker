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
        icon="copy"
        class="ui-overlay"
        :class="getUiColor()"
        @click="test" />
      <font-awesome-icon
        icon="trash"
        class="ui-overlay"
        :class="getUiColor()"
        @click.prevent="deleteColor" />
    </p>
  </div>
</template>

<script>
import { hsvToRgb, findColorLightness } from "./util/colorConversion.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faCopy, faTrash);
const convertToHex = true;

export default {
  name: "Swatch",
  props: {
    color: {
      type: Object,
      required: true
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    colorValue: function () {
      return this.color.color;
    },
    colorId: function() {
      return this.color.id;
    },
    hexValue: function() {
      return hsvToRgb(this.colorValue, convertToHex);
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
    deleteColor: function() {
      this.$emit("delete-action", this.colorId);
    },
    getUiColor: function() {
      return findColorLightness(this.colorValue) < 0.1791 ? "white" : "black";
    }
  },
  created () {
    console.log(this.colorId);
  }
};
</script>

<style scoped>
.swatch {
  position: relative;
  width: auto;
  padding: 16px;
  margin: 0 16px 16px 16px;
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
  font-family: "Archivo Black", "Gill Sans", "Gill Sans MT", Calibri,
    "Trebuchet MS", sans-serif;
  font-size: 2vw;
}
</style>
