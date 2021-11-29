import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetAgen = (id) => {
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/agents?districtId=${id}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + cookies.get("accessToken"),
        }),
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const result = await response.json()
    console.log("result.data", result.data)

    return result.data
  }

  const { data, isLoading, isError, refetch } = useQuery(["agent:", id], fetchData, {
    cacheTime: 0,
    enabled: !!id,
  })

  return { data, isLoading, isError, refetch }
}

export default useGetAgen
