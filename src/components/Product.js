import NewsItem from './ProductItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from 'react';
import axios from 'axios';

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [totalResults, setTotalResults] = useState(0)
  const url = `https://dummyjson.com/products?limit=${limit}`
  const updateNews = async () => {
    props.setProgress(20)
    setLoading(true)
    try {
      let data = await axios.get(url)
      props.setProgress(40)
      let parsedData = await data.data
      props.setProgress(70)
      setArticles(parsedData.products)
      setTotalResults(parsedData.total)
      setLoading(false)

      props.setProgress(100)
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    updateNews()
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let data = await axios.get(url)
    let parsedData = await data.data
    setArticles(articles.concat(parsedData.products))
    setTotalResults(parsedData.total)
    setLimit(limit + 5)

  };

  return (
    <>

      <div className='container' >
        <h1 className='text-center my-4'>Welcome to MyProduct  </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {articles.map((element) => {
                return <div key={element.id} className="col-md-4">
                  <NewsItem title={element.title} imageUrl={element.images[0]} description={element.description} rating={element.rating} price={element.price} brand={element.brand} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default News
