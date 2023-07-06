const ChosenDog = (props) => {
  const dog = props.dog
  return (
    <div className="card" styles="max-height: 20px;">
    <img src={dog.img} className="card-img" alt={dog.img} />
      <div className="card-body">
      <h5 className="card-title">{dog.name}</h5>
      <p className="card-text">{dog.name} is an age {dog.age}, {dog.breed} near {dog.zip_code}</p>
      {/* <button className='btn btn-primary'>Pick me</button> */}
      {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
    </div>
  </div>
  )
}

export default ChosenDog