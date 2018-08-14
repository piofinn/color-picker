import { shallowMount, render } from "@vue/test-utils";
import Swatch from "../src/Swatch.vue";
const expect = require('chai').expect;

describe("Mocha", () => {
  it("can assert", () => {
    expect(1).to.equal(1);
  });
});

const colorMock = {
  id: 1,
  color: { h: 0, s: 0, v: 0 }
}

describe("Swatch.vue", () => {
  it("mounts", () => {
    const wrapper = shallowMount(Swatch, {
      propsData: {
        color: colorMock
      }
    });
    expect(wrapper.contains('div.swatch')).to.be.true;
  });

  it("renders an svg", () => {
    const wrapper = shallowMount(Swatch, {
      propsData: {
        color: colorMock
      }
    });
    expect(wrapper.contains('svg')).to.be.true;
  })
})