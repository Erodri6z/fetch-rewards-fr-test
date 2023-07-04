const DogCard = (props) => {

  const dog = props.d

  return (
    <div className="card" style="width: 18rem;">
      <img src={dog.img} className="card-img-top" alt="..." />
        <div className="card-body">
        <h5 className="card-title">{dog.name}</h5>
        <p className="card-text">{dog.name} is an age {dog.age}, {dog.breed} near {dog.zipcode}</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  )
}

export default DogCard