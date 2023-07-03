import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'
import styles from './DogsSearch.module.css'
// import { Await } from "react-router-dom"

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  const [location, setLocation] = useState({})
  const [searchParams, setSearchParams] = useState({
    zipCode: '',
    breed: ''
  })
  const locationData = [parseInt(searchParams.zipCode.substring(0, 5))]

  useEffect(() => {
    const fetchAllBreeds = async () => {
      const dogBreeds = await dogService.getBreeds()
      setBreeds(dogBreeds)
    }
    fetchAllBreeds()
  }, [])
  
  const handleChange = async e => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleSearch = async e => {
    e.preventDefault()
    try {
      // setLocation( await dogService.getLocations(locationData))
      return await dogService.getDogs(searchParams.zipCode.substring(0, 5), searchParams.breed)
      

    }catch (err){
      console.log(err)
    }
  }


  // console.log(location[0].city)



  return (
    <>
    <div>
      <form onSubmit={handleSearch}>
        <label>Select a Breed</label>
        <select name="breed" 
        id="breed" 
        value={searchParams.breed} 
        onChange={handleChange}
        >
          <option value="">
            Select a breed
          </option>
          {breeds.map(b => 
            <option value={b} key={b}>{b}</option>
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
        value={searchParams.zipCode} 
        name="zipCode"
        inputMode="numeric" 
        id={styles.zipcode} 
        pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" 
        onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
    {/* <h3>looking for {location[0].state}, {location[0].city}</h3> */}
    </>
  )
}

export default DogsSearch