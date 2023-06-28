// import * as tokenService from './tokenService'
const BASE_URL = `https://frontend-take-home-service.fetch.com`


async function signup(data) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'SameSite=None'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    console.log(response)

    if (response) {
      console.log('Login successful')
    } else {
      console.log('Login failed')
      throw new Error('Failed to login')
    }
  } catch (err) {
  
    console.log(err)
    throw err
  }
}

export {signup}