import { mount } from "@vue/test-utils";
import Swatch from "../src/Swatch.vue";
import { hsvToRgb } from "../src/util/colorConversion.js";
const expect = require('chai').expect;


// SET UP TEST INSTANCE WITH MOCK PROP

const colorMock = {
  id: 5,
  color: { h: 0, s: 0, v: 0 }
}
const wrapper = mount(Swatch, {
  propsData: {
    color: colorMock
  }
});

// UNIT TESTS

describe("Swatch.vue", () => {
  it("mounts as a div with class swatch", () => {
    expect(wrapper.is('div.swatch')).to.be.true;
  });

  it("correctly converts color value to hex", () => {
    const controlHex = hsvToRgb(colorMock.color, true);
    expect(wrapper.vm.hexValue).to.equal(controlHex);
  });

  it("renders a delete button as an svg", () => {
    expect(wrapper.contains('svg.fa-trash')).to.be.true;
  });

  it("emits a delete-action when delete button is clicked", () => {
    wrapper.find('.fa-trash').trigger('click');
    expect(wrapper.emitted('delete-action')).to.have.lengthOf.least(1);
  });

  it("emits the correct id as payload on delete-action", () => {
    expect(wrapper.emitted('delete-action')[0]).to.contain(5);
  });
})