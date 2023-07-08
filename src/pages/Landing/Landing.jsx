import { useState } from "react"
import Register from "../../components/Login/Register"
import { logout } from "../../services/authService"
import Nav from "../../components/Nav/Nav"
import DogsSearch from "../../components/DogSearch/DogSearch"



const Landing = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const completeLogout = () => {
    logout()
    setLoggedIn(false)
  }

  const completeLogin = () => {
    setLoggedIn(true)
  }

  return(
    isLoggedIn?
    <>
    <Nav completeLogout={completeLogout}/>
    <DogsSearch />
    </>
    :
    <>
    <Register completeLogin={completeLogin}/>
    </>
  )
}

export default Landing