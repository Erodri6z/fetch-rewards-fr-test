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

    if (response.ok) {
      console.log('Login successful')
    } else {
      console.log('Login failed')
      throw new Error('Please ensure your information is correct')
    }
  } catch (err) {
  
    console.log(err)
    throw err
  }
}

async function logout() {
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'SameSite=None'
      },
      credentials: 'include',
    })
    if (res.ok) {
      console.log("logout successfull")
    }
  } catch (err) {
    console.error(err)
  }
}

export {signup, logout}