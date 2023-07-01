const BASE_URL = 'https://frontend-take-home-service.fetch.com'

async function getBreeds() {
  const res = await fetch(`${BASE_URL}/dogs/breeds`, {
    'Content-Type': 'application/json',
    credentials: 'include'
  }
  )
  console.log(res)
  return await res.json()
}

async function getLocations() {
  const res = await fetch(`${BASE_URL}/locations/search`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  console.log(res.json())
}

export {
  getBreeds,
  getLocations
}