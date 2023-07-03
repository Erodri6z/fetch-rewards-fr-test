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

async function getLocations(zipcode) {
  const res = await fetch(`${BASE_URL}/locations`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    body: JSON.stringify(zipcode)
  })
  // console.log(res.json())
  return await res.json()
}

async function getDogs(zipCode, breed) {
  let url = `${BASE_URL}/dogs/search`

  if (zipCode) {
    url += `?zipCodes=${zipCode}`;
  }

  if (breed) {
    if (zipCode) {
      url += `&breeds=${breed}`;
    } else {
      url += `?breeds=${breed}`;
    }
  }
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    // body: JSON.stringify(searchParams)
  })
  return await res.json()
}

export {
  getBreeds,
  getLocations,
  getDogs
}