import './DogCards.css'


const DogCard = (props) => {

  const dog = props.d

  return (
    <>
    <div className="card" styles="max-height: 20px;">
      <img src={dog.img} className="card-img-top" styles={"max-height: 18px; max-width: 30px;"} alt={dog.img} />
        <div className="card-body">
        <h5 className="card-title">{dog.name}</h5>
        <p className="card-text">Age : {dog.age} year(s) old</p>
      <p className="card-text">Breed : {dog.breed}</p>
      <p className="card-text">Location : {dog.zip_code}</p>
      </div>
    </div>
    </>
  )
}

export default DogCard