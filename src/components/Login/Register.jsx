import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import * as authService from '../../services/authService'

const Register = () => {
  // const navigate = useNavigate()
  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    fullName: '',
    occupation: '',
    state: '',
    email: '',
    password: ''
  })

  const updateMessage = msg => {
    setMessage(msg)
  }


  const handleChange = e => {
    updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  const checkDisabled = () => {
    if (document.getElementById('button').disabled) {
      return true
    }else{
      return false
    }
  }

  console.log(formData)

  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
    } catch (err) {
      updateMessage(err.message)
    }
  }

  const { fullName, occupation, state, email, password, passwordConf } = formData
  
  const isFormInvalid = () => {
    return !(fullName && occupation && state && email && password && password === passwordConf)
  }


  return (
    <>
    <p>{message}</p>
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="fullName" className={styles.label}>Full Name</label>
        <br />
        <input
          type="text"
          autoComplete="off"
          id="fullName"
          value={fullName}
          name="fullName"
          onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="occupation" className={styles.label}>Occupation</label>
        <br />
        <input
          type="text"
          autoComplete="off"
          id="occupation"
          value={occupation}
          name="occupation"
          onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="state">State</label>
        <br />
        <select name="state" id="state" value={state} onChange={handleChange}>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <br />
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <br />
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={password}
          name="password"
          onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirm" className={styles.label}>
          Confirm Password
        </label>
        <br />
        <input
          type="password"
          autoComplete="off"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button} id="btn">
          Sign Up
        </button>
      </div>
    </form>
    </>
  )
}

export default Register