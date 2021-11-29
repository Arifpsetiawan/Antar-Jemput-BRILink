import React, { useState, useCallback } from "react"
import { Form, Input, Button, Col, Typography } from "antd"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import useCreateCustomer from "../../Mutations/useCreateCustomer"
import { useAuthorizedContext } from "../../AuthorizedContext"
import "./Register.sass"

const { Title } = Typography

const RegisterCustomer = () => {
  const history = useHistory()
  const [customerState, setCustomerState] = useState({
    username: " ",
    password: " ",
    name: " ",
    noHandphone: " ",
  })
  const { setAuthorizedValue } = useAuthorizedContext()

  const handleErrorRegisterCust = useCallback((error) => {
    if (error) {
      console.log("ini error " + error)
      Swal.fire({
        icon: "error",
        text: error.message,
        title: "Gagal Registrasi",
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }, [])

  const { mutate: registerCustomer } = useCreateCustomer(
    customerState,
    (result) => {
      history.push("/")
    },
    handleErrorRegisterCust
  )
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [errorNumber, setErrorNumber] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

  const changePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    if (!value) {
      setErrorPassword("Password tidak boleh kosong")
    } else if (value.length < 8) {
      setErrorPassword("Password min harus 8 Karakter")
    } else {
      setErrorPassword("")
    }
    setCustomerState({
      ...customerState,
      password: e.target.value,
    })
  }

  const changeNoHandphone = (e) => {
    const value = e.target.value
    setPhoneNumber(value)
    if (!value) {
      setErrorNumber("Nomor Handphone tidak boleh kosong")
    } else if (value.length < 9) {
      setErrorNumber("Nomor Handphone min harus 9 Angka")
    } else {
      setErrorNumber("")
    }
    setCustomerState({
      ...customerState,
      noHandphone: e.target.value,
    })
  }

  const changeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (!value) {
      setErrorConfirmPassword("Konfirmasi Password tidak boleh kosong")
    } else if (password != value) {
      setErrorConfirmPassword("Password tidak cocok")
    } else {
      setErrorConfirmPassword("")
    }
  }

  const handleBackLogin = useCallback(() => {
    setAuthorizedValue(false)
    history.push("/")
  }, [setAuthorizedValue, history])

  return (
    <div className="outer-login">
      <div className="inner-login">
        <div>
          <Button
            type="link"
            style={{ marginLeft: "-40px", fontSize: "15px" }}
            onClick={handleBackLogin}
          >
            Kembali
          </Button>
        </div>
        <div className="logo" style={{ marginTop: "0", marginBottom: "45px" }}>
          <Title style={{ textAlign: "center" }}>Sign Up</Title>
        </div>
        <Form
          layout="vertical"
          name="normal_Register"
          className="login-Register"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: "-30px" }}
        >
          <Form.Item
            name="nama"
            label="Nama"
            rules={[
              {
                required: true,
                message: "Kolom nama tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Nama"
              name="nama"
              onChange={(event) => {
                setCustomerState({
                  ...customerState,
                  name: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            name="nomor-handphone"
            label="Nomor Handphone"
            rules={[
              {
                required: true,
                message: "Kolom Nomor Handphone tidak boleh kosong!",
              },
            ]}
          >
            <Input
              minLength="9"
              maxLength="12"
              placeholder="Masukkan Nomor Handphone"
              name="nomor-handphone"
              onChange={changeNoHandphone}
            />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              placeholder="Username"
              name="username"
              onChange={(event) => {
                setCustomerState({
                  ...customerState,
                  username: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                // message: "Please input your Password!",
              },
            ]}
          >
            <Input
              minLength="8"
              type="password"
              placeholder="Masukan Password"
              name="password"
              onChange={changePassword}
            />
            {errorPassword && <p className="text-danger">{errorPassword}</p>}
          </Form.Item>
          <Form.Item
            name="konfirmasi-password"
            label="Konfirmasi Password"
            rules={[
              {
                required: true,
                // message: "Please input your Password!",
              },
            ]}
          >
            <Input
              minLength="8"
              type="password"
              placeholder="Ulangi Password"
              name="password"
              onChange={changeConfirmPassword}
            />

            {errorConfirmPassword && (
              <p className="text-danger">{errorConfirmPassword}</p>
            )}
          </Form.Item>
          <Form.Item>
            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button className="btn-registerCustomer" onClick={registerCustomer}>
                Register Customer
              </Button>
            </Col>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterCustomer
