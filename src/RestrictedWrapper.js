import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAuthorizedContext } from "./AuthorizedContext"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const RestrictedWrapper = (props) => {
  const { isLoggedIn, setAuthorizedValue } = useAuthorizedContext()
  const [userLevel, setUserLevel] = useState()
  const history = useHistory()

  const accessToken = cookies.get("accessToken")

  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem("userLevel") == 1) {
        history.push("/home-agent")
      } else {
        history.push("/home")
      }
    } else {
      history.push("/")
    }
  }, [isLoggedIn, history])

  useEffect(() => {
    if (accessToken) {
      setAuthorizedValue(true)
    }
  }, [accessToken, setAuthorizedValue])

  return isLoggedIn ? null : props.children
}

export default RestrictedWrapper
