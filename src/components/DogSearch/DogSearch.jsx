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
    <div>
      <form>
        <label>Select a Breed</label>
        <select name="breed" id="breed">
          <option value="">
            Select a breed
          </option>
          {breeds.map(b => 
            <option value="b">{b}</option>
          )}

        </select>
      </form>
    </div>
    </>
  )
}

export default DogsSearch