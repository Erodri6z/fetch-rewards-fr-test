import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'
import styles from './DogsSearch.module.css'
import DogCard from "../DogCards/DogCards"
import ChosenDog from "../ChosenDog/ChosenDog"
// import { Await } from "react-router-dom"

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  const [next, setNext] = useState({})
  const [dogs, setDogs] = useState([])
  const [favorites, setFavorites]= useState([])
  const [searchParams, setSearchParams] = useState({
    zipCode: '',
    breed: ''
  })
  
  // const locationData = [parseInt(searchParams.zipCode.substring(0, 5))]

  async function sortAsc() {
    const doggos = await dogService.getDogs()
    setDogs(doggos.dogDetails)
    setNext(doggos.next)
  }

  async function sortDesc() {
    const doggos = await dogService.getDogsDesc()
    setDogs(doggos.dogDetails)
    setNext(doggos.next)
  }
  
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
      setDogs(doggos.dogDetails)
      setNext(doggos.next)
    }
    fetchDogs()
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
      setDogs((await dogService.getDogs(searchParams.zipCode.substring(0, 5), searchParams.breed)).dogDetails)
      setNext((await dogService.getDogs(searchParams.zipCode.substring(0, 5), searchParams.breed)).next)
    }catch (err){
      console.log(err)
    }
  }
  
  const chooseDog = async (pups) => {
    try{
      let selectedDog = await dogService.getMatch(pups)
      setDogs(selectedDog)
    }catch (err) {
      console.log(err)
    }
  }

  const chooseRandom = () => {
    const options = favorites
    chooseDog(options)
  }

  const backToTheTop = () => {
    document.body.scrollIntoView()
  }



  const addFavorite = (dog) => {
    setFavorites([...favorites, dog])
  }

  const handleNextPage = async () => {
    setDogs((await dogService.getNextPage(next)).dogDetails)
    setNext((await dogService.getNextPage(next)).next)
    backToTheTop()
  }
  
  // console.log(dogService.getDetails(dogs))
  // console.log(dogIdNumbers)
      
      return (
        <>
    <div className={styles.searchForm}>
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
        {/* <br /> */}
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
      <button onClick={sortAsc}>Asc</button>
      <button onClick={sortDesc}>Dsc</button>
    </div>
    <div>
    </div>
    <div className={styles.dogContainer}>
    {dogs.length > 1?
    dogs.map(d => 
      <>
        <div key={d.id}>
          <DogCard d={d} key={d}/>
          <button onClick={() => addFavorite(d.id)}>Add to Favorites</button>
        </div>
      </>
    )
    :
    dogs.length === 1?
    <>
      <h2>Congratulations, We think that {dogs[0].name} would make the perfect companion for you!</h2>
      <ChosenDog dog={dogs[0]}/>
    </>
    :
    <h3>No Doggos found</h3>
    }
    </div>
    <button onClick={chooseRandom}>See whos a Match</button>
    <button onClick={handleNextPage} className={styles.btn}>Next</button>
    {/* <h3>looking for {location[0].state}, {location[0].city}</h3> */}
    </>
  )
}

export default DogsSearch