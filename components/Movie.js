import React from "react"
import { Button } from "react-bootstrap"
import CountUp from "react-countup"

class Movie extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data && nextProps.isRatingOpen === this.props.isRatingOpen) return false
    return true
  }
  render() {
    console.log(this.props)
    if (!this.props.data) return null
    const { selectAnswer, data, info, isRatingOpen } = this.props
    const { num, name, imageUrl, userRating, criticRating, userReview } = data
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          WebkitAnimation: "slide 0.5s forwards",
          
        }}
      >
        <img
          src={imageUrl}
          style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", verticalAlign: "middle" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 1
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            verticalAlign: "middle",
            color: "white"
          }}
        >
          {" "}
          {info ? (
            <React.Fragment>
              <p>"{name}"</p>
              <p>평론가 평점 : {criticRating}</p>
              <p>유저 평점 : {userRating}</p>
              <p>유저 리뷰</p>
              <ul>
                {userReview.map((v, i) => (
                  <li>
                    {v.rating} / {v.text} / {v.like} / {v.date}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>"{name}"</p>
              {isRatingOpen ? (
                <div>
                  <CountUp end={criticRating} decimals={2} duration={2} />
                  <br></br>
                </div>
              ) : null}
              <Button variant="primary" onClick={() => selectAnswer("up")}>
                UP
              </Button>
              <Button variant="danger" onClick={() => selectAnswer("down")}>
                DOWN
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default Movie
