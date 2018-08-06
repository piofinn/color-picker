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
    <svg
      v-if="locked"
      class="ui-overlay"
      :class="[lightUi ? 'white' : 'black']"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>								
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
