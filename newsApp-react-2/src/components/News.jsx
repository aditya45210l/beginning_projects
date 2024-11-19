import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page:1,
      totalResults: 0,
    };
  }
  handleNextButton = async() =>{
    this.setState({loading:true})
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
      let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=24030685c7384ad49895e3e45df73beb&page=${this.state.page + 1}&pageSize= ${this.props.pageSize}`;
      let promise = await fetch(apiUrl);
      let data = await promise.json();
      this.setState({
        page:this.state.page + 1,
        article:data.articles,
        loading:false,
      })
    }
   
  }
  handlePrevsButton = async() =>{
    this.setState({loading:true}) 
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=24030685c7384ad49895e3e45df73beb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let promise = await fetch(apiUrl);
    let data = await promise.json();
    this.setState({
      page:this.state.page - 1,
      article:data.articles,
      loading:false,
    })
  }
  async componentDidMount(){
    this.setState({loading:true})
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=24030685c7384ad49895e3e45df73beb&page=1&pageSize=${this.props.pageSize}`;
    let promise = await fetch(apiUrl);
    let data = await promise.json();
    this.setState({
      article:data.articles,
      totalResults:data.totalResults,
      loading:false,
    })
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.article.map((elements) => {
            return <div className="col-md-4" key={elements.url+elements.publishedAt}>
              <NewsItems
                title={elements? elements.title.slice(0,45):""}
                description={elements.description}
                imgUrl={elements.urlToImage?elements.urlToImage:"https://e7.pngegg.com/pngimages/519/64/png-clipart-logo-font-brand-product-line-breaking-news-logo-text-rectangle.png"}
                newsUrl={elements.url}
              />
            </div>;
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevsButton}>&larr; Preview</button>
        <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} className="btn btn-dark" onClick={this.handleNextButton}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
