import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'
import styles from './DogsSearch.module.css'
import DogCard from "../DogCards/DogCards"
import ChosenDog from "../ChosenDog/ChosenDog"

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  const [next, setNext] = useState({})
  const [dogs, setDogs] = useState([])
  const [favorites, setFavorites]= useState([])
  const [searchParams, setSearchParams] = useState({
    zipCode: '',
    breed: ''
  })
  


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
  
      return (
        <>
    <div className={styles.searchForm}>
      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.form}>

        <div className="input-group mb-3">
          {/* <div className="input-group">
            <label className="input-group-text">Select a Breed</label>
          </div> */}
          <select name="breed" 
          id={styles.breed} 
          className="form-control"
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
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label 
            htmlFor="location"
            className="input-group-text"
            >
            Zipcode
          </label>
          </div>
          <input 
          type="number" 
          value={searchParams.zipCode} 
          name="zipCode"
          inputMode="numeric" 
          id={styles.zipcode}
          className="form-control" 
          pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" 
          onChange={handleChange}
          />
          </div>

        </div>
        <button type="submit" className="btn btn-success" id={styles.btn}>Search</button>
      </form>
      <div className={styles.sort}>
        <button onClick={sortAsc}>Asc</button>
        <button onClick={sortDesc}>Dsc</button>
      </div>
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
    <p>Total of {favorites.length} dog(s) are being considered</p>
    </div>
    <button onClick={chooseRandom}>See whos a Match</button>
    <button onClick={handleNextPage} className={styles.btn}>Next</button>
    </>
  )
}

export default DogsSearch