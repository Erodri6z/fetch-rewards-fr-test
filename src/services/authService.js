// import * as tokenService from './tokenService'
const BASE_URL = `https://frontend-take-home-service.fetch.com`


async function signup(data) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (response.ok) {
      console.log('Login successful')
      return await response.json()
    } else {
      console.log('Login failed')
      throw new Error('Failed to login')
    }
  } catch (err) {
    throw err
  }
}

export {signup}