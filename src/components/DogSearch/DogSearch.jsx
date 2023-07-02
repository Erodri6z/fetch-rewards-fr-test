import { useEffect, useState } from "react"
import * as dogService from '../../services/dogService'
import styles from './DogsSearch.module.css'

const DogsSearch = () => {
  const [breeds, setBreeds] = useState([])
  const [searchParams, setSearchParams] = useState({
    zipcode: '',
    breeds: ''
  })

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
        <br />
        <label htmlFor="location">Zipcode</label>
        <input type="number" inputMode="numeric" id={styles.zipcode} pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"/>
      </form>
      <button></button>
    </div>
    </>
  )
}

export default DogsSearch