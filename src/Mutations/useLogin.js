import { useMutation } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useLogin = (loginData, onSuccess, onError) => {
  console.log("ini login", loginData)
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(loginData), // body data type must match "Content-Type" header
        })
        console.log("ini response ", response)
        if (response.ok) {
          const result = await response.json()

          let date = new Date(result.data.expiredAt)
          console.log("ini date " + date)
          cookies.set("accessToken", result.data.accessToken, { path: "/" , expires: date})

          return result
        }
        const errorResult = await response.json()
        let errorMessage = ''
        switch (errorResult.message) {
          case "Error in field: Role":
            errorMessage = "Role Tidak Boleh Kosong"
            throw new Error(errorMessage)
          case "Error in field: Password":
            errorMessage = "Password Tidak Boleh Kosong"
            throw new Error(errorMessage)
          case "Error in field: Username" :
            errorMessage = "Username Tidak Boleh Kosong"
            throw new Error(errorMessage)
          case "There is no match record in our database":
            errorMessage = "Tidak ada user tersebut di database"
            throw new Error(errorMessage)
          default :
            errorMessage = errorResult.message
            throw new Error(errorMessage)
        }

      } catch (error) {
        throw new Error(error)
      }
    },
    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useLogin
