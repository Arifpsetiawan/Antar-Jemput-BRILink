import { useQuery } from "react-query"
// import Cookies from "universal-cookie"

// const cookies = new Cookies()

const useGetCity = (provinceId) => {
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/locations?provinceId=${provinceId}`,
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

  const { data, isLoading, isError } = useQuery(["city:", provinceId], fetchData, {
    cacheTime: 0,
    enabled: !!provinceId,
  })

  return { data, isLoading, isError }
}

export default useGetCity
