import React from "react";

export const NewsItems = (props) => {
    let { title, description, imgUrl, newsUrl, date,source} = props;
    return (
      <div>
        <div className="card my-2">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{zIndex:"1",left:"90%"}}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body" >
            <h5 className="card-title"><a target="_blank" style={{color:"black",textDecoration:"none"}} href={newsUrl}>{title}...</a></h5>
            <p className="card-text" style={{ margin: "0 0 3px" }}>
              {description}...
            </p>
            <p className="card-text" style={{ margin: "0 0 8px" }}><small className="text-body-secondary">{new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Reade More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItems;
