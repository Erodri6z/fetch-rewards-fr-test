import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h2 className={styles.title}>Lets Fetch You A Dog!</h2>
      <ul className={styles.logout}>
        <button className={styles.btn}>Log Out</button>
      </ul>
    </nav>
  )
}

export default Nav