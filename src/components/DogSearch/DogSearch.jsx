import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'
import styles from './DogsSearch.module.css'
// import DogCard from "../DogCards/DogCards"
// import { Await } from "react-router-dom"

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  const [next, setNext] = useState({})
  const [dogs, setDogs] = useState([])
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


  useEffect(() => {
    const fetchDogs = async () => {
      const doggos = await dogService.getDogs()
      setDogs(await dogService.getDetails(doggos.resultIds))
      // console.log('useEffect')
      // setDogs(doggos)
    }
    fetchDogs()
  }, [])
  
  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     const details = await dogService.getDetails(dogs)
  //     setDogs(details)
  //   }
  //   fetchDetails()
  // }, [])
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
      setDogs((await dogService.getDogs(searchParams.zipCode.substring(0, 5), searchParams.breed)).resultIds)
      setNext((await dogService.getDogs(searchParams.zipCode.substring(0, 5), searchParams.breed)).next)
    }catch (err){
      console.log(err)
    }
  }
  
  const handleNextPage = async () => {
    setDogs((await dogService.getNextPage(next)).resultIds)
    setNext((await dogService.getNextPage(next)).next)
  }
  
  // const handleDogDetails = async () => {
    //   setDogs( await dogService.getDetails(dogs))
    //   .then(
      //     console.log(dogs) 
      //   )
      // }
      
      

      
      // console.log((dogService.getDogs(searchParams.zipCode.substring(0, 5), searchParams.breed)).resultIds)
      
      
      // console.log(dogService.getDetails(dogs))
      console.log(dogService.getDetails(dogs))
      
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
    {/* <div>
    {dogs?.length?
    dogs.map(d => 
      // <DogCard d={d} key={d}/>
      <p key={d}>{d}</p>
    )
    :
    <span></span>
    }
    <button onClick={handleNextPage}>Next</button>
    </div> */}
    {/* <h3>looking for {location[0].state}, {location[0].city}</h3> */}
    </>
  )
}

export default DogsSearch