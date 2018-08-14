<template>
  <div
    id="scrollTarget"
    @mousemove="changeHueSat"
    @wheel="changeValue">
    <div
      class="ui-overlay top left"
      :class="[lightUi ? 'white' : 'black']">
    </div>
    <div
      class="ui-overlay top right"
      :class="[lightUi ? 'white' : 'black']">
    </div>
    <div
      class="ui-overlay bottom right"
      :class="[lightUi ? 'white' : 'black']">
    </div>
    <div
      class="ui-overlay bottom left"
      :class="[lightUi ? 'white' : 'black']">
    </div>
    <font-awesome-icon
      v-if="locked"
      icon="lock"
      id="lock-icon"
      class="ui-overlay"
      :class="getOverlayColor()" />
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faLock);

export default {
  name: "Touchpad",
  components: {
    FontAwesomeIcon
  },
  props: {
    locked: {
      type: Boolean,
      required: true
    },
    lightUi: {
      type: Boolean,
      required: true
    },
    color: {
      type: Object,
      required: true,
      validator: value => {
        return value.h !== null && value.s !== null && value.v !== null;
      }
    }
  },
  methods: {
    test: function(event) {
      console.log("v-on event", event);
    },
    changeHueSat: function(event) {
      if (this.locked) return;
      let yPos = event.offsetY / event.target.offsetHeight;
      let xPos = event.offsetX / event.target.offsetWidth;
      this.color.h = Math.max(Math.floor(xPos * 360), 0);
      this.color.s = 1 - yPos;
    },
    changeValue: function(event) {
      if (this.locked) return;
      this.stopEvent(event);
      let changeAmount = event.deltaY * 0.0006;
      this.color.v = Math.min(1, Math.max(0, this.color.v + changeAmount));
    },
    getOverlayColor: function() {
      return this.lightUi ? "white" : "black";
    },
    stopEvent: function(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style>
#lock-icon {
  width: 15vw;
  height: 15vw;
  margin: 0;
  padding: 0;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#lock-icon > i {
  font-size: 20vw;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
