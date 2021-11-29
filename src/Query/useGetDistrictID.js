import { useQuery } from "react-query"
// import Cookies from "universal-cookie"

// const cookies = new Cookies()

const useGetDistrictID = (regencyId) => {
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/locations/districts?regencyId=${regencyId}`,
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

  const { data, isLoading, isError } = useQuery(
    ["districtID:", regencyId],
    fetchData,
    {
      cacheTime: 0,
      enabled: !!regencyId,
    }
  )

  return { data, isLoading, isError }
}

export default useGetDistrictID
