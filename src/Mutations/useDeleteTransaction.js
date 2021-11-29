import { useMutation } from "react-query"
import Cookies from "universal-cookie";
import Swal from "sweetalert2";


const cookies = new Cookies();

const useDeleteTransaction = (deleteId, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BE_TRANSACTIONS}/${deleteId}`,
        {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.get("accessToken"),
          },
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      } else {
          Swal.fire({
              icon: "success",
              text: response.message,
              title: "Berhasil Dihapus!",
              showConfirmButton: false,
              timer: 2000,
          })
      }
      return response.json()
    },
    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useDeleteTransaction
