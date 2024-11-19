import React, { Component } from 'react'
import loading from "./loading.gif"
export class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading..." style={{width: "60px",height:"60px",margin:"auto",display:"block"}}/>
      </div>
    )
  }
}

export default Spinner