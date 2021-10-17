import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetTransactions = () => {
  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BE_TRANSACTIONS}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: "Bearer " + cookies.get("accessToken"),
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  }

  const { data, isLoading, isError, refetch } = useQuery(
    `transactions:`,
    fetchData,
    {
      cacheTime: 0,
    }
  )


  return { data, isLoading, isError, refetch }
}

export default useGetTransactions
