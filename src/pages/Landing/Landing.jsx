// import { useEffect } from "react"
import { useState } from "react"
import Register from "../../components/Login/Register"
import { logout } from "../../services/authService"


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
    <><h1>you are logged in</h1>
    <p>{`${isLoggedIn}`}</p>
    <button onClick={completeLogout}>logout</button>
    </>
    :
    <>
    <Register completeLogin={completeLogin}/>
    </>
  )
}

export default Landing