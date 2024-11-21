import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - MonkeyNews`;
  }
  async update(_apiUrl) {
    this.setState({ loading: true })
    let promise = await fetch(_apiUrl);
    let data = await promise.json();
    this.setState({
      article: data.articles,
      totalResults: data.totalResults,
      loading: false,
    })
  }
  capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  async componentDidMount() {
    this.setState({ loading: true })
    this.update(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24030685c7384ad49895e3e45df73beb&pageSize=${this.props.pageSize}`)
  }


  handleNextButton = async () => {
    this.setState({ loading: true })
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      this.update(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24030685c7384ad49895e3e45df73beb&page=${this.state.page + 1}&pageSize= ${this.props.pageSize}`);
      this.state.page = this.state.page + 1;
    }

  }
  handlePrevsButton = async () => {
    this.setState({ loading: true })
    this.update(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24030685c7384ad49895e3e45df73beb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`);
    this.state.page = this.state.page - 1;
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    this.setState({ loading: true });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24030685c7384ad49895e3e45df73beb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "20px" }}>NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={this.state.article.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
            <div className="row">
              {this.state.article.map((elements) => {
                return <div className=" col-md-4" key={elements.url + elements.publishedAt}>
                  <NewsItems
                    title={elements ? elements.title.slice(0, 45) : ""}
                    description={elements.description}
                    imgUrl={elements.urlToImage ? elements.urlToImage : "https://e7.pngegg.com/pngimages/519/64/png-clipart-logo-font-brand-product-line-breaking-news-logo-text-rectangle.png"}
                    newsUrl={elements.url}
                    date={elements.publishedAt}
                    source={elements.source.name}
                  />
                </div>;
              })}
            </div>
            </div>
          </InfiniteScroll>
      </>
    );
  }
}

export default News;
