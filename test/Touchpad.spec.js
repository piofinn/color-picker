import { mount, shallowMount } from "@vue/test-utils";
import Touchpad from "../src/Touchpad.vue";
import sinon from "sinon";
const expect = require("chai").expect;

const wrapper = mount(Touchpad, {
  propsData: {
    locked: false,
    lightUi: false,
    color: { h: 0, s: 0, v: 0 }
  }
})

describe("Touchpad.vue", () => {
  it("mounts as a div with id scrollTarget", () => {
    expect(wrapper.is("div#scrollTarget")).to.be.true;
  });

  it("does not render lock icon when color is not locked", () => {
    expect(wrapper.find("#lock-icon").exists()).to.be.false;
  });

  it("does render lock icon when color is locked", () => {
    wrapper.setProps({ locked: true });
    expect(wrapper.find("#lock-icon").exists()).to.be.true;
  });

  it("calls the changeValue function on mouse scroll", () => {
    const spy = sinon.spy();
    wrapper.setMethods({
      changeValue: spy
    });
    wrapper.trigger("wheel", { deltaY: 4000 });
    expect(spy.called).to.be.true
  });

  it("calls the changeHueSat function when mouse is moved", () => {
    const spy = sinon.spy();
    wrapper.setMethods({
      changeHueSat: spy
    });
    wrapper.trigger("mousemove");
    expect(spy.called).to.be.true;
  })
});