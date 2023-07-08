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
          <p>Total of {favorites.length} dog(s) are being considered</p>
      <div className={styles.sort}>
        <button onClick={sortAsc}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-up-alt" viewBox="0 0 16 16">
            <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
            <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
            <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
          </svg>
        </button>
        <button onClick={sortDesc}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
          </svg>
        </button>
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
    </div>
    <button onClick={chooseRandom}>See whos a Match</button>
    <button onClick={handleNextPage} className={styles.btn}>Next</button>
    </>
  )
}

export default DogsSearch