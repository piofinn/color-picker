<template>
  <div id="main-container" :style="backgroundStyle" @copy.stop="copyValue">
    <h1 class="ui-overlay" :class="[lightUi ? 'white' : 'black']">{{ hexValue }}</h1>
    <Touchpad :color="color" :light-ui="lightUi" :locked="locked"/>
    <font-awesome-icon
      icon="bars"
      id="menu-open-button"
      class="ui-overlay"
      :class="[lightUi ? 'white' : 'black']"
      @click="toggleMenu"
    />
    <div id="swatches-container" :class="[showMenu ? 'open' : 'closed']">
      <p id="menu-close-button">
        <font-awesome-icon icon="times" @click.prevent="toggleMenu"/>
      </p>
      <Swatch
        v-for="color in this.savedColors"
        :key="color.id"
        :color="Object.assign({}, color)"
        @delete-action="deleteColor"
      />
    </div>
  </div>
</template>

<script>
import { hsvToRgb, findColorLightness } from "./util/colorConversion.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Touchpad from "./Touchpad.vue";
import Swatch from "./Swatch.vue";

library.add(faTimes, faBars);

export default {
  data: function() {
    return {
      color: {
        h: Math.floor(Math.random() * 360),
        s: Math.random(),
        v: 1
      },
      savedColors: [],
      nextColorId: 0,
      locked: false,
      showMenu: false
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
    Swatch,
    FontAwesomeIcon
  },
  methods: {
    copyValue: function(event) {
      event.clipboardData.setData("text/plain", this.hexValue);
      event.preventDefault();
    },
    toggleLock: function() {
      this.locked = !this.locked;
    },
    toggleMenu: function(event) {
      console.log(event);
      this.showMenu = !this.showMenu;
    },
    saveColor: function() {
      this.savedColors.push({
        id: this.nextColorId++,
        rand: Math.random(),
        color: Object.assign({}, this.color)
      });
    },
    deleteColor: function(idToDelete) {
      this.savedColors = this.savedColors.filter(
        color => color.id !== idToDelete
      );
    },
    makeListeners: function() {
      var lockFunc = this.toggleLock;
      var saveFunc = this.saveColor;
      var toggleFunc = this.toggleMenu;
      return function(event) {
        if (event.keyCode === 32) {
          lockFunc();
          event.preventDefault();
        } else if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
          saveFunc();
          event.preventDefault();
        } else if (event.key === "m") {
          toggleFunc();
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
  left: 100%;
  box-sizing: border-box;
  width: 300px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  overflow-y: scroll;
  transition: transform ease-in-out 0.2s;
}
#swatches-container.open {
  transform: translateX(-100%);
}
#menu-close-button {
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 7vh 4vh;
  width: 100%;
  text-align: right;
  font-size: 6vh;
  line-height: 6vh;
  color: #fff;
  text-decoration: none;
}
#menu-close-button > svg {
  cursor: pointer;
}
#menu-open-button {
  position: absolute;
  top: 7vh;
  right: 5vh;
  font-size: 6vh;
  cursor: pointer;
}
</style>
