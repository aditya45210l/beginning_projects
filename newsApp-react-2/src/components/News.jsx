import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export const News = ({ country = "us", pageSize = 6, category = "general", apiKey, setProgress}) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoding] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);

  // Capitalize the first letter of the category for the title
  document.title = `${capitalizeFirstLetter(category)} - MonkeyNews`;

  const update = async (_apiUrl) => {
    setProgress(10)
    let promise = await fetch(_apiUrl);
    setProgress(28)
    let data = await promise.json();
    setProgress(35)
    setArticle(data.articles);
    setProgress(65)
    setTotalResults(data.totalResults);
    setProgress(100)
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  useEffect(() => {
    update(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`);
  }, [country, category, apiKey, pageSize]); // Added dependencies to update when props change

  const fetchMoreData = async () => {
    setLoding(true);
    setPage(page + 1);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`);
    let parsedData = await data.json();
    setArticle(article.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoding(false);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "20px" }}>NewsMonkey - Top Headlines from {capitalizeFirstLetter(category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {article.map((elements) => {
              return (
                <div className=" col-md-4" key={elements.url + elements.publishedAt}>
                  <NewsItems
                    title={elements ? elements.title.slice(0, 45) : ""}
                    description={elements.description}
                    imgUrl={elements.urlToImage ? elements.urlToImage : "https://e7.pngegg.com/pngimages/519/64/png-clipart-logo-font-brand-product-line-breaking-news-logo-text-rectangle.png"}
                    newsUrl={elements.url}
                    date={elements.publishedAt}
                    source={elements.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired, // Assuming apiKey is required, as it's used in the API URL
};

export default News;
