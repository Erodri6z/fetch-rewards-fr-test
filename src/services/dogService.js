const BASE_URL = 'https://frontend-take-home-service.fetch.com'

async function getBreeds() {
  const res = fetch(`{BASE_URL}/dogs/breeds`, {
    'Cookies': 'include',
    'Content Type': 'application/json'
  })
  return await res.json
}