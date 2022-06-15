import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(props){
        super(props)
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0,
            
        }
        document.title=`${ this.capitalize(this.props.category)}-NewsMonkey`
    }
     capitalize=(string )=>{

    return string && string[0].toUpperCase() + string.slice(1);
}
    async updateNews(){
      this.props.setProgress(20)

      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})

     let data=await fetch(url)
     this.props.setProgress(40)

     
     
     let parsedData=await data.json()
     this.props.setProgress(70)


     this.setState({articles:parsedData.articles,
      totalresults:parsedData.totalresults,
    loading:false})
   this.props.setProgress(100)



    }
    
    async componentDidMount(){
   
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d30fd1eed20c4a31bceef8477b0db7a5&page=${this.state.page}&pageSize=${this.props.pageSize}`
    //   this.setState({loading:true})

    //  let data=await fetch(url)
    //  let parsedData=await data.json()
    //  this.setState({articles:parsedData.articles,
    //   totalresults:parsedData.totalresults,
    // loading:false})
    this.updateNews()
    }
    // previousclick= async()=>{
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d30fd1eed20c4a31bceef8477b0db7a5&page=${this.state.page -1 }&pagesize=${this.props.pageSize}`
      // this.setState({loading:true})

      // let data=await fetch(url)
      // let parsedData=await data.json()
      // this.setState({articles:parsedData.articles,
      //   page:this.state.page-1,
      //   loading:false
      // })
    //   this.setState({page:this.state.page-1})
    //   this.updateNews()

    // }
    // nextclick= async()=>{
      // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
   
       

    
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d30fd1eed20c4a31bceef8477b0db7a5&page=${this.state.page +1 }&pagesize=${this.props.pageSize}`
      // this.setState({loading:true})
      // let data=await fetch(url)
      // let parsedData=await data.json()
      // this.setState({articles:parsedData.articles,
      //   page:this.state.page+1,
      //   loading:false
      // })}  
    //   this.setState({page:this.state.page+1})
    //   this.updateNews()

    // }
    fetchMoreData =async () => {
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
     let data=await fetch(url)
     let parsedData=await data.json()
     this.setState({articles:this.state.articles.concat( parsedData.articles),
      totalresults:parsedData.totalresults,
      page:this.state.page+1,
   })

    };
   
    
    
   
 
  render() {
    return (
      <>
      
      <div className='container' >
     
        <h1 className='text-center my-4'>Welcome to News-Monkey | Top { this.capitalize(this.props.category)} Headline </h1>
       {this.state.loading && <Spinner/>}
       <InfiniteScroll
        dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row ">
        { this.state.articles.map((element)=>{
           return  <div key={element.url} className="col-md-4">
            <NewsItem title={element.title?element.title:''} imageUrl={element.urlToImage?element.urlToImage:'https://images.moneycontrol.com/static-mcnews/2022/05/market-5-770x433.jpg'} description={element.description?element.description:''} author={element.author?element.author:''} date={element.publishedAt}/>
        {/* <div className="container d-flex justify-content-between">
  <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.previousclick}> &larr; Previous</button>
  <button id='nxtbtn' type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.nextclick}>Next &rarr;</button>
  </div> */}
      </div> })}
        </div>

</div>


</InfiniteScroll>
</div>

</>
)
}
}

export default News
