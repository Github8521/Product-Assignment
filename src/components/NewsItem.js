import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    
  let  {title,description,imageUrl,url,author,date}=this.props
    return (
       <div className="card mx-2 my-3" >
  <img  src={imageUrl}className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5  className="card-title">{title}</h5>
    <p  className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted"> By:{author} |  <strong>{new Date(date).toDateString() }</strong> </small></p>
    <a rel="noreferrer" href={url}target="_blank"  className="btn btn-sm btn-dark">Read More</a>
  </div>

</div>
    )
  }
}

export default NewsItem
