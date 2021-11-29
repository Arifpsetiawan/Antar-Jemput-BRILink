import React from "react"

import App from "../App"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

describe("App Component", () => {
  it("should not have div", function () {
    const wrapper = shallow(<App />)
    expect(wrapper.find("div")).toHaveLength(0)
  })

  it("should have one Router", function () {
    const wrapper = shallow(<App />)
    expect(wrapper.find("Router")).toHaveLength(1)
  })

  it("should not have render", function () {
    const wrapper = shallow(<App />)
    expect(wrapper.find("Render")).toHaveLength(0)
  })

  it("should have two route", function () {
    const wrapper = shallow(<App />)
    expect(wrapper.find("Route")).toHaveLength(4)
  })

  it("should have one Switch", function () {
    const wrapper = shallow(<App />)
    expect(wrapper.find("Switch")).toHaveLength(1)
  })
})
