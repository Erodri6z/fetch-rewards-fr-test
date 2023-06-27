// import * as tokenService from './tokenService'
const BASE_URL = `https://frontend-take-home-service.fetch.com`


async function signup(data) {
  try {
    const res = fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    return await res.json(data)
  } catch (err) {
    throw err
  }
}

export {signup}