import './ChosenDog.css'

const ChosenDog = (props) => {
  const dog = props.dog
  return (
    <div className="card chosen-card" styles="margin: auto;">
    <img src={dog.img} className="card-img" alt={dog.img} />
      <div className="card-body">
      <h5 className="card-title">{dog.name}</h5>
      <p className="card-text">Age : {dog.age} year(s) old</p>
      <p className="card-text">Breed : {dog.breed}</p>
      <p className="card-text">Location : {dog.zip_code}</p>
    </div>
  </div>
  )
}

export default ChosenDog