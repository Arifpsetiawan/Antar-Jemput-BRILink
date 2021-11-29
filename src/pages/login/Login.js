import React, { useState, useCallback } from "react"
import { Form, Input, Button, Select, Row } from "antd"
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import "./login.sass"
import BRI from "../../assets/image/BRI2.png"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useLogin from "../../Mutations/useLogin"
import Background from "../../assets/image/Waves-Login.svg"

const { Option } = Select

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState({})
  const [selectedUserLevel, setSelectedUserLevel] = useState()
  const { setAuthorizedValue } = useAuthorizedContext()

  const handleSuccessLogin = useCallback(() => {
    if (selectedUserLevel == 2) {
      setAuthorizedValue(true, selectedUserLevel)
      Swal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 2000,
      })
      history.push("/home")
    } else {
      setAuthorizedValue(true, selectedUserLevel)
      Swal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 2000,
      })
      history.push("/home-agent")
    }
    localStorage.setItem("userLevel", selectedUserLevel)
  }, [setAuthorizedValue, history, selectedUserLevel])

  const handleErrorLogin = useCallback(
    (error) => {
      if (error) {
        Swal.fire({
          icon: "error",
          text: error.message,
          title: "Login gagal",
          showConfirmButton: false,
          timer: 2000,
        })
        history.push("/")
      }
    },
    [history]
  )

  const { mutate: login } = useLogin(
    { username: username, password: password, role: selectedUserLevel },
    handleSuccessLogin,
    handleErrorLogin
  )

  const onFinish = (values) => {
    console.log("Received values of form: ", values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  const handleSelectedUserLevel = useCallback((value) => {
    setSelectedUserLevel(parseInt(`${value}`))
  }, [])
  const UserType = [
    {
      key: 2,
      value: 2,
      label: "Customer",
    },
    {
      key: 1,
      value: 1,
      label: "Agen",
    },
  ]

  const handleChange = useCallback(
    (e) => {
      const name = e.target.name
      const value = e.target.value
      switch (name) {
        case "username":
          setUsername(value)
          setData({ ...data, [name]: value })
          break
        case "password":
          setPassword(value)
          setData({ ...data, [name]: value })
          break
        default:
      }
    },
    [data]
  )

  const handleRegisterAgen = useCallback(() => {
    history.push("/register-agen")
  }, [history])

  const handleRegisterCustomer = useCallback(() => {
    history.push("/register-customer")
  }, [history])

  const showModal = () => {
    Swal.fire({
      icon: "question",
      text: "Register Sebagai",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Customer",
      denyButtonText: `Agen`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleRegisterCustomer()
      } else if (result.isDenied) {
        handleRegisterAgen()
      }
    })
  }

  return (
    <div className="outer-login" style={{ backgroundImage: `url(${Background})` }}>
      <div className="inner-login">
        <div className="logo" style={{ marginTop: "-50px", width: "200px" }}>
          <img src={BRI} alt="logo" />
        </div>

        <Form
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: "-40px" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Isi Username Anda !",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            labelAlign="left"
            name="password"
            rules={[
              {
                required: true,
                message: "Isi Password Anda!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item labelCol={{ span: 6 }} name="role">
            <Select
              // defaultValue={selectedUserLevel}
              name="role"
              placeholder="Login Sebagai"
              onChange={handleSelectedUserLevel}
              value={selectedUserLevel}
            >
              {UserType.map((option) => (
                <Option key={option.key} value={option.value} label={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Button className="btn-register" onClick={showModal}>
                Register
              </Button>
              <Button className="btn-login" onClick={login}>
                Login
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
