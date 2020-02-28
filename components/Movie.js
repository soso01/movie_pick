import React from "react"
import axios from "axios"

class Movie extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data) return false
    return true
  }
  render() {
    console.log(this.props.data)
    if (!this.props.data) return null
    const { num, name, imageUrl, userRating, criticRating, userReview } = this.props.data
    return (
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <img
          src={imageUrl}
          style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", verticalAlign: "middle" }}
        ></img>
        {
            this.props.info ? 
            <div style={{position: 'absolute', width: "100%", height: "100%", backgroundColor: 'green'}}>

            </div>
            : null
        }
      </div>
    )
  }
}

export default Movie
