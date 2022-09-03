
const NewsItem = (props) => {
  let { title, description, imageUrl, rating, price } = props
  return (
    <div className="card mx-2 my-3" >
      <img style={{ height: "350px" }} src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">Modal : {title}</h5>
          <h6 className="card-title">Rating:{rating}</h6>
        </div>
        <h6 className="card-title">Price:{price}$</h6>
        <p className="card-text">{description}</p>
      </div>
    </div>
  )
}

export default NewsItem
