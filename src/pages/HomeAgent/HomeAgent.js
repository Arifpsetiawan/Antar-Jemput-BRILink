import React from "react"
import {Typography, Spin, Space, Alert, Image} from "antd"

import NavbarComponent from "../../components/navbarAgen/NavbarAgenComp"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import "./HomeAgent.sass"
import CardAgent from "../CardAgent/CardAgent"
import Background from "../../assets/image/white-wave-background-vector.jpg"
import NoData from "../../assets/image/no data.svg";

const { Title } = Typography



function HomeAgent() {

  const { isLoggedIn, userLevel } = useAuthorizedContext()
  console.log("value >> ", isLoggedIn, userLevel)
  const { data, isError, isLoading, refetch: refetchTransactions } = useGetTransaction()
  console.log("data >> ", isLoading, data)

  return (
    <div className="outer-home">
      <NavbarComponent />
      <div
        className="statusTransaksi"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="title">
          <Title style={{ fontFamily: "Playfair Display", color: "#292961" }}>
            Permintaan Transaksi Hari Ini
          </Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : isError ? (
              <Alert message="Gagal Memuat Data" type="error" />
            ) :(
                data?.data?.length == 0 ? (
                    <>
                        <Image src={NoData} />
                        <h2>Belum Ada Permintaan Transaksi Hari ini</h2>
                    </>

                ) : (
                    data.data?.map((transaction) => (
                        <CardAgent
                            key={transaction.id}
                            transaction={transaction}
                            refetchTransactions={refetchTransactions}
                        />
                    ))
                )
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HomeAgent
