import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.logout}>
        <li>
          <button className={styles.btn}>Log Out</button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav