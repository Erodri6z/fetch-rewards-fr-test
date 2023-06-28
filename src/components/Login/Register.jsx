import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import * as authService from '../../services/authService'

const Register = () => {
  // const navigate = useNavigate()
  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const { name, email} = formData
  
  const isFormInvalid = () => {
    return !(name && email)
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
        <label htmlFor="name" className={styles.label}>Full Name</label>
        <br />
        <input
          type="text"
          autoComplete="off"
          id="name"
          value={name}
          name="name"
          onChange={handleChange} />
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
        <button disabled={isFormInvalid()} className={styles.button} id="btn">
          Sign Up
        </button>
      </div>
    </form>
    </>
  )
}

export default Register