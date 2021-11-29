import { useMutation } from "react-query"
import Cookies from "universal-cookie"
import Swal from "sweetalert2"

const cookies = new Cookies()

const useCreateRate = (transactionId, rating, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BE_TRANSACTIONS}/rating/${transactionId}`,
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("accessToken"),
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(rating), // body data type must match "Content-Type" header
        }
      )
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Rating Sukses Dikirim",
          showConfirmButton: false,
          timer: 2000,
        })
        return await response.json()
      } else {
        const errorResult = await response.json()
        let errorMessage = ""
        if (errorResult.message == "Error in field: Rating") {
          errorMessage = "Silahkan Isi Rating"
          Swal.fire({
            icon: "error",
            text: errorMessage,
            title: "Gagal!",
            showConfirmButton: false,
            timer: 2000,
          })
          throw new Error(errorMessage)
        } else {
          throw new Error("Network response was not ok")
        }
      }
    },
    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useCreateRate
