import { QueryClient, QueryClientProvider } from "react-query"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import TransaksiPage from "./pages/Transaksi/TransaksiPage"
import Login from "./pages/login/Login"
import Home from "./pages/HomeCustomer/HomeCustomer"
import Logout from "./pages/Logout/Logout"
import RegisterAgen from "./pages/Register/RegisterAgen"
import RegisterCustomer from "./pages/Register/RegisterCustomer"
import AuthorizedRoute from "./AuthorizedRoute"
import RestrictedWrapper from "./RestrictedWrapper"
import { AuthorizedContextProvider } from "./AuthorizedContext"
import RateComponent from "./pages/Rating/RateComponent"
import HomeAgent from "./pages/HomeAgent/HomeAgent"


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizedContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <RestrictedWrapper>
                <Login />
              </RestrictedWrapper>
            </Route>
            <Route path="/register-agen" exact>
              <RegisterAgen />
            </Route>
            <Route path="/register-customer" exact>
              <RegisterCustomer />
            </Route>
            <Route path="/rate" exact>
              <RateComponent />
            </Route>
            <AuthorizedRoute
              path="/Transaksi"
              exact
              component={TransaksiPage}
            ></AuthorizedRoute>
            <Route path="/signout" exact>
              <Logout />
            </Route>
            <AuthorizedRoute path="/home" exact component={Home}></AuthorizedRoute>
            <AuthorizedRoute
              path="/home-agent"
              exact
              component={HomeAgent}
            ></AuthorizedRoute>
          </Switch>
        </Router>
      </AuthorizedContextProvider>
    </QueryClientProvider>
  )
}

export default App
