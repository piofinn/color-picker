<template>
  <div
    id="scrollTarget"
    @mousemove="changeHueSat"
    @wheel.stop="changeValue">
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
    <p
      v-if="locked"
      id="lock-icon">
      <i
        class="ui-overlay material-icons"
        :class="[lightUi ? 'white' : 'black']">
        lock  
      </i>
    </p>							
  </div>
</template>

<script>
export default {
  name: "Touchpad",
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
      let changeAmount = event.deltaY * 0.0006;
      this.color.v = Math.min(1, Math.max(0, this.color.v + changeAmount));
    }
  }
};
</script>

<style>
#lock-icon {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#lock-icon > i {
  font-size: 20vw;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
