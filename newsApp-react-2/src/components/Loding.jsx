import React, { Component } from 'react'
import loadings from "./loadings";

export class Loding extends Component {
  render() {
    return (
      <div className='text-center'><img src={loadings}alt="Loding..." /></div>
    )
  }
}

export default Loding