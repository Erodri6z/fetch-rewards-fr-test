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
        <button className={styles.btn} onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-closed" viewBox="0 0 16 16">
            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
          </svg>
        </button>
      </ul>
    </nav>
  )
}

export default Nav