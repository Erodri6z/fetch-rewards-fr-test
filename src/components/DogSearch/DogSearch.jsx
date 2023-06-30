import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  useEffect(() => {
    const fetchAllBreeds = async () => {
      const dogBreeds = await dogService.getBreeds()
      setBreeds(dogBreeds)
    }
    fetchAllBreeds()
  }, [])
  
  return (
    <>
    {breeds.map(b => 
      <p key={b}>{b}</p>
    )}
    </>
  )
}

export default DogsSearch