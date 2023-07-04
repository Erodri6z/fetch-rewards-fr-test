import styles from './DogCards.css'

const DogCard = (props) => {

  const dog = props.d

  return (
    <>
    <div className="card" styles="max-width: 10rem">
      <img src={dog.img} className="card-img-top" styles="max-width: 18rem;" alt={dog.img} />
        <div className="card-body">
        <h5 className="card-title">{dog.name}</h5>
        <p className="card-text">{dog.name} is an age {dog.age}, {dog.breed} near {dog.zip_code}</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
    </>
  )
}

export default DogCard