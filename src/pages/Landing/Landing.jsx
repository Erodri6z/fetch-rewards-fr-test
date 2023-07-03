// import { useEffect } from "react"
import { useEffect, useState } from "react"
import Register from "../../components/Login/Register"
import { logout } from "../../services/authService"
import Nav from "../../components/Nav/Nav"
import DogsSearch from "../../components/DogSearch/DogSearch"
// import * as dogService from "../../services/dogService"


const Landing = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [dogs, setDogs] = useState({})

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
    <DogsSearch dogs={dogs}/>
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