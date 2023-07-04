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

async function getDogs(zipCode, breed ) {
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
  // console.log(await results.dogDetails)
  return results
}

// async function getNext

async function getNextPage(next) {
  const res = await fetch(`${BASE_URL}${next}`, {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'SameSite=None'
    },
    credentials: 'include',
    // body: JSON.stringify(searchParams)
  })
  // console.log(await res.json())
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

  // return await res.json()

// async function getDetails(dogs) {
//   const res = await fetch(`${BASE_URL}/dogs`, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//       'Set-Cookie': 'SameSite=None'
//     },
//     credentials: 'include',
//     body: JSON.stringify(dogs)
//   })
//   // console.log(await res.json())
//   return res.json()
// }

export {
  getBreeds,
  getLocations,
  getDogs,
  getNextPage
  // getDetails
}