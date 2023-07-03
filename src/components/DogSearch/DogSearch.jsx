import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'
import styles from './DogsSearch.module.css'
// import { Await } from "react-router-dom"

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  const [searchParams, setSearchParams] = useState({
    zipCode: '',
    breeds: ''
  })
  const locationData = [parseInt(searchParams.zipCode.substring(0, 5))]

  useEffect(() => {
    const fetchAllBreeds = async () => {
      const dogBreeds = await dogService.getBreeds()
      setBreeds(dogBreeds)
    }
    fetchAllBreeds()
  }, [])
  
  const handleChange = e => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleSearch = async e => {
    e.preventDefault()
    try {
      await dogService.getLocations(locationData)

    }catch (err){
      console.log(err)
    }
  }


  console.log(locationData)



  return (
    <>
    <div>
      <form onSubmit={handleSearch}>
        <label>Select a Breed</label>
        <select name="breeds" 
        id="breed" 
        value={breeds} 
        onChange={handleChange}
        >
          <option value="">
            Select a breed
          </option>
          {breeds.map(b => 
            <option value={b}>{b}</option>
          )}
        </select>
        <br />
        <label 
        htmlFor="location"
        >
          Zipcode
        </label>
        <input 
        type="number" 
        // value={zipCode} 
        name="zipCode" 
        inputMode="numeric" 
        id={styles.zipcode} 
        pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" 
        onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
    </>
  )
}

export default DogsSearch