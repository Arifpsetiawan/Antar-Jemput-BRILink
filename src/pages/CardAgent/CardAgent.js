import React, { useCallback, useState } from "react"
import { Button, Card, Modal, Rate, Typography, Anchor } from "antd"
import moment from "moment"
import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
import Swal from "sweetalert2"
import "./CardAgent.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faBan,
  faClipboardCheck,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"
// import { useHistory } from "react-router-dom"
import useUpdateTransaction from "../../Mutations/useUpdateTransaction"
import RatingAgent from "../Rating/RatingAgent"

const { Link } = Anchor
const { Text } = Typography
const CardAgent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { mutate: deleteTransaction } = useDeleteTransaction(
    props.transaction.id,
    props.refetchTransactions
  )
  const handleDeleteTransaction = useCallback(() => {
    Swal.fire({
      title: "Anda yakin ingin menghapus transaksi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Transaksi Berhasil Dihapus.", "success")
        deleteTransaction()
      }
    })
  }, [deleteTransaction])

  const { mutate: acceptedTransaction } = useUpdateTransaction(
    props.transaction.id,
    { statusTransaction: 1 },
    props.refetchTransactions
  )

  const handleAcceptedTransaction = useCallback(() => {
    Swal.fire({
      title: "Anda yakin ingin menerima transaksi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Terima !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Transaksi Diterima.", "success")
        acceptedTransaction()
      }
    })
  }, [acceptedTransaction])

  const { mutate: doneTransaction } = useUpdateTransaction(
    props.transaction.id,
    { statusTransaction: 3 },
    props.refetchTransactions
  )

  const { mutate: rejectedTransaction } = useUpdateTransaction(
    props.transaction.id,
    { statusTransaction: 2 },
    props.refetchTransactions,
    () => {},
    () => {
      Swal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 2000,
      })
    }
  )

  const handleRejectedTransaction = useCallback(() => {
    Swal.fire({
      title: "Anda yakin ingin membatalkan transaksi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Terima !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Transaksi Dibatalkan.", "success")
        rejectedTransaction()
      }
    })
  }, [deleteTransaction])

  const formatMoney = (money) => {
    return money.toLocaleString("id-ID")
  }

  return (
    <Card
      style={{
        width: 450,
        border: "2px solid black",
        marginBottom: "20px",
      }}
    >
      <Text style={{ color: "#4B0082", fontWeight: "bold" }}>
        {" "}
        Nama Customer : {props.transaction.userCustomer.customer.Name}
      </Text>
      <br /> <br />
      <hr />
      <ul className="alignMe">
        <li>
          <b>Waktu Request</b>{" "}
          {moment(new Date(props.transaction.createdAt)).format(
            "DD MMMM YYYY, hh:mm A"
          )}
        </li>
        <li>
          <b>Jenis Transaksi</b>{" "}
          {
            props.transaction.transactionType.serviceTypeTransaction
              .nameServiceTransaction
          }
          - {props.transaction.transactionType.nameTransactionType}
        </li>
        <li>
          <b>Nominal Transaksi</b>Rp{formatMoney(props.transaction.amount)}
        </li>
        <li>
          <b>Alamat Customer</b>
          {props.transaction.address}
        </li>
        <li>
          <b>Nomer Customer</b>
          <Button
            type="link"
            style={{ padding: "0px" }}
            href={
              "https://wa.me/62" +
              props.transaction.userCustomer.customer.NoHandphone
            }
          >
            {props.transaction.userCustomer.customer.NoHandphone}
          </Button>
        </li>
        <li>
          <b>Agen BRILink</b> {props.transaction.userAgent.agent.agentName}
        </li>
        <li>
          <b>Alamat Anda</b> {props.transaction.userAgent.agent.address}
        </li>
        <li>
          <b>Status</b>{" "}
          {props.transaction.statusTransaction === 0
            ? "Menunggu konfirmasi agen"
            : props.transaction.statusTransaction === 1
            ? "Agen dalam perjalanan"
            : props.transaction.statusTransaction === 2
            ? "Ditolak atau Dibatalkan"
            : props.transaction.statusTransaction === 3
            ? "Selesai"
            : "Error"}
        </li>
      </ul>
      <div className="float-right">
        {props.transaction.statusTransaction === 0 ? (
          <>
            <Button
              type="primary"
              style={{
                margin: "0px",
                paddingRight: "15px",
                backgroundColor: "green",
                fontWeight: "bold",
                borderRadius: "10px",
                marginRight: "80px",
                marginLeft: "50px",
              }}
              onClick={handleAcceptedTransaction}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />{" "}
              Terima
            </Button>

            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                paddingRight: "15px",
                margin: "0px",
                marginLeft: "50px",
              }}
              onClick={handleRejectedTransaction}
            >
              <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: "5px" }} />{" "}
              Tolak
            </Button>
          </>
        ) : props.transaction.statusTransaction === 1 ? (
          <>
            <Button
              style={{
                margin: "0px",
                paddingRight: "15px",
                backgroundColor: "brown",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                marginLeft: "50px",
              }}
              onClick={handleRejectedTransaction}
            >
              <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />{" "}
              Batalkan
            </Button>

            <Button
              className="btn btn-primary"
              style={{ marginLeft: "70px", borderRadius: "5px" }}
              onClick={doneTransaction}
            >
              <FontAwesomeIcon
                icon={faClipboardCheck}
                style={{ marginRight: "8px" }}
              />
              Selesai
            </Button>
          </>
        ) : props.transaction.statusTransaction === 2 ? (
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              paddingRight: "15px",
              margin: "0px",
              marginLeft: "50px",
            }}
            onClick={handleDeleteTransaction}
          >
            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: "5px" }} />{" "}
            Hapus
          </Button>
        ) : (
          <>
            {props.transaction.rating ? (
              <>
                <span>
                  <Rate
                    value={props.transaction.rating}
                    style={{ marginRight: "15px", marginLeft: "40px" }}
                  />
                </span>
                <Button
                  onClick={showModal}
                  style={{
                    marginLeft: "30px",
                    backgroundColor: "yellow",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Lihat Detail Rating
                </Button>
                <Modal
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={350}
                >
                  <RatingAgent transaction={props.transaction} />
                </Modal>
              </>
            ) : (
              <Button
                disabled={true}
                style={{
                  marginLeft: "30px",
                  border: "2px solid #292961",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
              >
                Belum Ada Rating
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  )
}

export default CardAgent
