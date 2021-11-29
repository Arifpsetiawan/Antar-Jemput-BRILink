import React, { useEffect } from "react"
import { Route, useHistory } from "react-router-dom"

import { useAuthorizedContext } from "./AuthorizedContext"

const AuthorizedRoute = (props) => {
  const { isLoggedIn } = useAuthorizedContext()
  const history = useHistory()

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/")
    }
  }, [isLoggedIn, history])

  return <Route {...props} />
}

export default AuthorizedRoute
