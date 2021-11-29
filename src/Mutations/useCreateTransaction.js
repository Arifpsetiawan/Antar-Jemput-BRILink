import { useMutation } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useCreateTransaction = (transaction, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/transactions`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: "Bearer " + cookies.get("accessToken"),
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(transaction), // body data type must match "Content-Type" header
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },

    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useCreateTransaction
