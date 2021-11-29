import React, { useState, useCallback } from "react"
import { Row, Form, Input, Button, Select, Col, Typography } from "antd"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import useGetProvinces from "../../Query/useGetProvinces"
import useGetCity from "../../Query/useGetCity"
import useGetDistrictID from "../../Query/useGetDistrictID"
import useCreateAgen from "../../Mutations/useCreateAgen"
import "./Register.sass"
import { useAuthorizedContext } from "../../AuthorizedContext"

const { Option } = Select
const { Title } = Typography

const RegisterAgen = () => {
  const history = useHistory()
  const { setAuthorizedValue } = useAuthorizedContext()
  const [selectedProvinsi, setSelectedProvinsi] = useState(null)
  const [selectedKabupaten, setSelectedKabupaten] = useState(null)
  const [selectedDistrictID, setSelectedDistrictID] = useState(null)
  const [agentState, setAgentState] = useState({
    username: "",
    password: "",
    agentName: "",
    noHandphone: "",
    districtId: "",
    address: "",
  })

  const {
    data: dataProvinces,
    isLoading: isLoadingProvinces,
    isError: isErrorProvinces,
  } = useGetProvinces()
  const {
    data: dataCity,
    isLoading: isLoadingCity,
    isError: isErrorCity,
  } = useGetCity(selectedProvinsi)
  const {
    data: dataDistrictID,
    isLoading: isLoadingDistrictID,
    isError: isErrorDistrictID,
  } = useGetDistrictID(selectedKabupaten)

  const handleBackLogin = useCallback(() => {
    setAuthorizedValue(false)
    history.push("/")
  }, [setAuthorizedValue, history])

  const handleErrorRegister = useCallback((error) => {
    if (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        title: "Register gagal",
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }, [])

  const {
    mutate: registerAgent,
   isLoading:isLoadingAgent,
    isError: isErrorAgent,
  } = useCreateAgen(
    agentState,
    (result) => {
      history.push("/")
    },
    handleErrorRegister
  )
  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value)
  }
  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value)
  }

  const handleSelectedDistrictID = (value) => {
    setSelectedDistrictID(value)
  }
  const handleFormDistrictID = (value) => {
    setAgentState({ ...agentState, districtId: value })
  }

  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
    setAgentState({
      ...agentState,
      password: e.target.value,
    })
  }

  const changeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (!value) {
      setErrorConfirmPassword("Konfirmasi Password tidak boleh kosong")
    } else if (password != value) {
      setErrorConfirmPassword("password tidak cocok")
    } else {
      setErrorConfirmPassword("")
    }
  }

  return (
    <div className="outer-register">
      <div className="inner-register">
      <div style={{marginTop:'30px'}}>
          <Button
            type="link"
            style={{ marginLeft: "-40px", fontSize: "15px" }}
            onClick={handleBackLogin}
          >
            Kembali
          </Button>
        </div>
        <div>
          <Button
            type="link"
            style={{ marginLeft: "-40px", fontSize: "15px" }}
            onClick={handleBackLogin}
          >
            Kembali
          </Button>
        </div>
        <div className="logo" style={{ marginTop: "20px", marginBottom: "45px" }}>
          <Title style={{ textAlign: "center" }}>Sign Up</Title>
        </div>
        <Form
          name="normal_register"
          s
          className="register-form"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: "-30px" }}
        >
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="Nama"
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
              name="Nama"
              onChange={(event) => {
                setAgentState({
                  ...agentState,
                  agentName: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            name="Alamat"
            style={{ marginBottom: " 8px", padding: "0px" }}
            label="Alamat"
            rules={[
              {
                required: true,
                message: "Kolom alamat tidak boleh kosong!",
              },
            ]}
          >
            <Row justify="space-between" style={{ marginBottom: "10px" }}>
              <Col span={7}>
                <Select
                  placeholder="Pilih Provinsi"
                  onChange={(e) => {
                    handleSelectedProvinsi(e)
                  }}
                >
                  {dataProvinces?.map((provinces, id) => (
                    <Option key={id.toString()} value={provinces.id}>
                      {provinces.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={7}>
                <Select
                  placeholder="Pilih Kabupaten"
                  onChange={(e) => {
                    handleSelectedKabupaten(e)
                  }}
                >
                  {dataCity?.map((city, id) => (
                    <Option key={id.toString()} value={city.id}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={7}>
                <Select
                  placeholder="Pilih Kecamatan"
                  onChange={(e) => {
                    handleSelectedDistrictID(e)
                    handleFormDistrictID(e)
                  }}
                >
                  {dataDistrictID?.map((district, id) => (
                    <Option key={id.toString()} value={district.id}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="alamat-Kantor"
            label="Detail Alamat"
            rules={[
              {
                required: true,
                message: "Kolom Alamat Kantor tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Detail Alamat Anda"
              name="alamat-Kantor"
              onChange={(event) => {
                setAgentState({
                  ...agentState,
                  address: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="Nomor-Handphone"
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
              name="Nomor-Handphone"
              onChange={(event) => {
                setAgentState({
                  ...agentState,
                  noHandphone: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Kolom Username tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Username"
              name="Username"
              onChange={(event) => {
                setAgentState({
                  ...agentState,
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
              offset={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button className="btn-registerAgen" onClick={registerAgent}>
                Register Agen
              </Button>
            </Col>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterAgen
