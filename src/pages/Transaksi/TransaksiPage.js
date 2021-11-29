import React, { useState } from "react"
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  InputNumber,
  Input,
  Spin,
  Table,
  Typography,
  Space,
} from "antd"
import { useHistory } from "react-router-dom"

import JenisTransaksi from "./DataJenisTransaksi"
import useGetAgen from "../../Query/useGetAgen"
import useGetProvinces from "../../Query/useGetProvinces"
import useGetCity from "../../Query/useGetCity"
import useGetDistrictID from "../../Query/useGetDistrictID"
import useCreateTransaction from "../../Mutations/useCreateTransaction"
import NavbarComponent from "../../components/navbar/NavbarComponent"
import "./TransaksiPage.sass"

const { Option } = Select
const { Text } = Typography

const TransaksiPage = () => {
  const [selectedProvinsi, setSelectedProvinsi] = useState(null)
  const [selectedKabupaten, setSelectedKabupaten] = useState(null)
  const [selectedDistrictID, setSelectedDistrictID] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showTableAgen, setShowTableAgen] = useState(false)
  const [disableButton, setDisableButton] = useState(true)
  const history = useHistory()

  const [formState, setFormState] = useState({
    address: " ",
    agentId: " ",
    amount: " ",
    districtId: " ",
    transactionTypeId: " ",
  })

  const { mutate, isLoading, isError } = useCreateTransaction(formState, () => {
    history.replace("/home")
  })

  const {
    data,
    isError: isErrorAgent,
    isLoading: isLoadingAgent,
  } = useGetAgen(selectedDistrictID)
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

  const dataTable = data?.map((row) => ({
    agentName: row.agent.agentName,
    noHandphone: row.agent.noHandphone,
    address: row.agent.address,
    agentRating: row.agent.agentRating,
    key: row.id,
  }))

  const currencyParser = (val) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0"
      }

      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("id-ID").format(1111).replace(/1/g, "")
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "")
      //  => 1232.21

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "")
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length
      const needsDigitsAppended = digitsAfterDecimalCount > 2

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2)
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value)
  }

  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value)
  }

  const handleSelectedDistrictID = (value) => {
    setSelectedDistrictID(value)
  }
  const handleFormDistrictID = (value) => {
    setFormState({ ...formState, districtId: value })
  }

  const handleCreateTransactions = (value) => {
    setFormState({ ...formState, agentId: value })
    setDisableButton(false)
  }

  const getTableAgen = () => setShowTableAgen(true)

  const ColumnsAgen = [
    {
      title: "Nama Agen",
      dataIndex: "agentName",
      key: "agentName",
      align: "center",
    },
    {
      title: "Nomer Whatsapp",
      dataIndex: "noHandphone",
      key: "noHandphone",
      align: "center",
      render: (text) => (
        <Button type="link" href={"https://wa.me/62" + text}>
          {text}
        </Button>
      ),
    },
    {
      title: "Alamat Agen",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Rating",
      dataIndex: "agentRating",
      key: "agentRating",
      align: "center",
      render: (agentRating) =>
        isNaN(agentRating) ? 0 : Math.floor(agentRating * 100) / 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            handleCreateTransactions(record.key)
          }}
        >
          Pilih Agen
        </Button>
      ),
    },
  ]

  const handleJenisTransaksi = (value) => {
    setShowForm(true),
      setFormState({
        ...formState,
        transactionTypeId: parseInt(value),
      })
  }

  return (
    <div>
      <NavbarComponent />
      <div className="formTransaksi" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24} style={{ paddingTop: "100px" }}>
              <Form style={{ width: "100%" }}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Jenis Transaksi"
                  name="Jenis Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <Select
                      placeholder="Pilih Jenis Transaksi"
                      onChange={handleJenisTransaksi}
                    >
                      {JenisTransaksi.map((option) => (
                        <Option
                          key={option.key}
                          value={option.value}
                          disabled={option.isDisabled}
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Form.Item>
              </Form>
              {showForm ? (
                <Form style={{ width: "100%" }}>
                  <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    labelAlign="left"
                    label="Nominal Transaksi"
                    name="Nominal Transaksi"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Col>
                      <InputNumber
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(value)
                        }
                        parser={currencyParser}
                        onChange={(value) => {
                          setFormState({
                            ...formState,
                            amount: parseInt(value),
                          })
                        }}
                      />
                    </Col>
                  </Form.Item>
                  <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    labelAlign="left"
                    label="Alamat Saat Ini"
                    name="address"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Row span={7} style={{ marginBottom: "10px" }}>
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
                    </Row>
                    <Row
                      span={7}
                      justify="space-between"
                      style={{ marginBottom: "10px" }}
                    >
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
                    </Row>
                    <Row
                      span={7}
                      justify="space-between"
                      style={{ marginBottom: "10px" }}
                    >
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
                    </Row>

                    <Row>
                      <Input.TextArea
                        placeholder="Nama Jalan, Gedung, No. Rumah"
                        onChange={(event) => {
                          setFormState({
                            ...formState,
                            address: event.target.value,
                          })
                        }}
                      />
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Col>
                      <Row justify="center">
                        <Button
                          type="primary"
                          className="searching-agent"
                          style={{
                            marginTop: "20px",
                            color: "white",
                            paddingRight: "15px",
                            backgroundColor: "#000080",
                            fontWeight: "bold",
                            borderRadius: "5px",
                            marginLeft: "50px",
                          }}
                          onClick={getTableAgen}
                        >
                          Cari Agen
                        </Button>
                      </Row>
                    </Col>
                  </Form.Item>
                </Form>
              ) : null}
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Row justify="center">
            {isLoadingAgent ? (
              <Spin />
            ) : isErrorAgent ? (
              <Space align="center" direction="vertical" size="large">
                <Text style={{ color: "red" }}> Gagal Mencari Agen</Text>
                <Table
                  columns={ColumnsAgen}
                  dataSource={dataTable}
                  pagination={false}
                />
              </Space>
            ) : (
              showTableAgen && (
                <Table
                  value
                  columns={ColumnsAgen}
                  dataSource={dataTable}
                  pagination={false}
                />
              )
            )}
          </Row>
        </div>

        <div>
          <Row justify="center">
            <Button
              type="primary"
              className="searching-agent"
              style={{
                marginTop: "10px",
                marginBottom: "40px",
                color: "white",
                paddingRight: "15px",
                backgroundColor: "#000080",
                fontWeight: "bold",
                borderRadius: "5px",
                marginLeft: "50px",
              }}
              hidden={disableButton}
              disabled={disableButton}
              onClick={mutate}
            >
              Buat Transaksi
            </Button>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default TransaksiPage
