const BASE_URL = 'https://frontend-take-home-service.fetch.com'

async function getBreeds() {
  const res = await fetch(`${BASE_URL}/dogs/breeds`, {
    'Content-Type': 'application/json',
    credentials: 'include'
  }
  )
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
  return await res.json()
}

async function getDogs(zipCode, breed ) {
  let url = `${BASE_URL}/dogs/search?sort=breed:asc`

  if (zipCode) {
    url += `&zipCodes=${zipCode}`
  }

  if (breed) {
    url += `&breeds=${breed}`
  }

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
  })
  const dogs = await res.json()
  const dogDetails = fetch(`${BASE_URL}/dogs`,  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    body: JSON.stringify(dogs.resultIds)
  })
  let dogDetailArr = (await dogDetails).json()
  
  let results = {
    dogDetails :  await dogDetailArr, 
    next : dogs.next
  }
  return results
}
async function getDogsDesc(zipCode, breed ) {
  let url = `${BASE_URL}/dogs/search?sort=breed:desc`

  if (zipCode) {
    url += `&zipCodes=${zipCode}`
  }

  if (breed) {
    url += `&breeds=${breed}`
  }

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
  })
  const dogs = await res.json()
  const dogDetails = fetch(`${BASE_URL}/dogs`,  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    body: JSON.stringify(dogs.resultIds)
  })
  let dogDetailArr = (await dogDetails).json()
  
  let results = {
    dogDetails :  await dogDetailArr, 
    next : dogs.next
  }
  return results
}

async function getNextPage(next) {
  const res = await fetch(`${BASE_URL}${next}`, {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
  })
  let dogs = await res.json()
  const dogDetails = await fetch(`${BASE_URL}/dogs`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    body: JSON.stringify(dogs.resultIds)
  })
  let dogDetailArr = (await dogDetails).json()
  let results = {
    dogDetails :  await dogDetailArr, 
    next : dogs.next
  }
  return results
}



async function getMatch(dogs) {
  const dogId = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    body: JSON.stringify(dogs)
  }) 
  const matchedDog = await dogId.json()
  const match = [matchedDog.match]
  console.log(match)

  const dogDetails = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    body: JSON.stringify(match)
  })
  let dogDetail = await dogDetails.json()

  return dogDetail

}

export {
  getBreeds,
  getLocations,
  getDogs,
  getDogsDesc,
  getNextPage,
  getMatch

}