import React from "react"
import { Typography, Image, Row } from "antd"

import Avatar from "../../assets/image/avatar-svgrepo-com.svg"
import NavbarComponent from "../../components/navbarAgen/NavbarAgenComp"
import "./ProfileAgent.sass"

const { Title, Text } = Typography

const ProfileAgent = () => {
  return (
    <div className="outer-profile">
      <NavbarComponent />
      <div className="inner-profile">
        <div className="profile">
          <div className="Image">
            <Image src={Avatar} width={200}></Image>
          </div>
        </div>
        <div>
          <Row justify="center">
            <Text span={4} strong>
              User Name
            </Text>
          </Row>
          <Row justify="center">
            <Text span={4} style={{ fontSize: "12px" }}>
              User Name
            </Text>
          </Row>

          <li>
            <b>Nama</b>
          </li>
          <li>
            <b>Alamat</b>
          </li>
          <li>
            <b>Nomer Handpone</b>
          </li>
        </div>
      </div>
    </div>
  )
}

export default ProfileAgent
