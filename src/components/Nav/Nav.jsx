import { useState } from 'react'
import styles from './Nav.module.css'


const Nav = ({ completeLogout }) => {
  // const [isLoggedIn, setLoggedIn] = useState()

  const handleLogout = () => {
    completeLogout()
  }

  return (
    <nav className={styles.nav}>
      <h2 className={styles.title}>Lets Fetch You A Dog!</h2>
      <ul className={styles.logout}>
        <button className={styles.btn} onClick={handleLogout}>Log Out</button>
      </ul>
    </nav>
  )
}

export default Nav