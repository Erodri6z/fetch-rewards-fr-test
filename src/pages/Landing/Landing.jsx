// import { useEffect } from "react"
import { useState } from "react"
import Register from "../../components/Login/Register"
import { logout } from "../../services/authService"
import Nav from "../../components/Nav/Nav"
import DogsSearch from "../../components/DogSearch/DogSearch"


const Landing = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const completeLogout = () => {
    setLoggedIn(false)
    logout()
  }

  const completeLogin = () => {
    setLoggedIn(true)
  }

  return(
    isLoggedIn?
    <>
    <Nav />
    <DogsSearch />
    <p>{`${isLoggedIn}`}</p>
    {/* <button onClick={completeLogout}>logout</button> */}
    </>
    :
    <>
    <Register completeLogin={completeLogin}/>
    </>
  )
}

export default Landing