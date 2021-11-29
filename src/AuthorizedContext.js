import React, { createContext, useContext, useState, useCallback } from "react"

const AuthorizedDefaultValue = {
  isLoggedIn: false,
  userLevel: "",
  setAuthorizedValue: () => {},
}

const AuthorizedContext = createContext(AuthorizedDefaultValue)

const AuthorizedContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userLevel, setUserLevel] = useState("")

  const setAuthorizedValue = useCallback(
    (loginStatus, userLevelStatus) => {
      setIsLoggedIn(loginStatus)
      setUserLevel(userLevelStatus)
    },
    [setIsLoggedIn, setUserLevel]
  )

  return (
    <AuthorizedContext.Provider
      value={{ isLoggedIn, userLevel, setAuthorizedValue }}
    >
      {props.children}
    </AuthorizedContext.Provider>
  )
}

const useAuthorizedContext = () => {
  const { isLoggedIn, userLevel, setAuthorizedValue } = useContext(AuthorizedContext)

  return { isLoggedIn, userLevel, setAuthorizedValue }
}

export { AuthorizedContextProvider, useAuthorizedContext }
