import { useQuery } from "react-query"
// import Cookies from "universal-cookie"

// const cookies = new Cookies()

const useGetProvinces = () => {
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/locations/provinces`,
      {
        headers: new Headers({
          // Authorization: "Bearer " + cookies.get("accessToken"),
        }),
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const result = await response.json()

    return result.data
  }

  const { data, isLoading, isError } = useQuery(`provinces:`, fetchData, {
    cacheTime: 0,
  })

  return { data, isLoading, isError }
}

export default useGetProvinces
