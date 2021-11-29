import React from "react"

import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { expect } from "chai"

import Logout from "../pages/Status/Logout"

Enzyme.configure({ adapter: new Adapter() })

describe("Logout", () => {
  test("has a button", () => {
    const wrapper = shallow(<Logout />)
    expect(wrapper.find("Button")).length(1)
    expect(wrapper.find("Button").text()).equal("Keluar")
  })
  test("renders modal when visible is true", () => {
    const props = { visible: true }
    const wrapper = shallow(<Logout {...props} />)
    wrapper.update()
    expect(wrapper.find(".my-modal-window").exists()).equal(true)
  })
})
