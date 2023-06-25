import * as tokenService from './tokenService'
const BASE_URL = `https://frontend-take-home-service.fetch.com/auth`


async function signup(user) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    })
    const json = await res.json()
    if (json.err) {
      throw new Error(json.err)
    } else if (json.token) {
      tokenService.setToken(json.token)
    }
  } catch (err) {
    throw err
  }
}