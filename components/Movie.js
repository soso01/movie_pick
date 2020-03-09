import React from "react"
import { Button } from "react-bootstrap"
import CountUp from "react-countup"

const getStars = rating => {
  let res = ""
  while (rating > 1) {
    rating -= 2
    res = res + "★"
  }
  if (rating == 1) res = res + "☆"
  return res
}

class Movie extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data && nextProps.isRatingOpen === this.props.isRatingOpen) return false
    return true
  }
  render() {
    if (!this.props.data) return null
    const { selectAnswer, data, info, isRatingOpen, hidden } = this.props
    const { num, name, imageUrl, userRating, criticRating, userReview } = data
    return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            textAlign: "center",
            transition: "all 0.5s"
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
              color: "white",
              display: "table"
            }}
          >
            <div style={{ display: "table-cell", verticalAlign: "middle", paddingLeft: "15%", paddingRight: "15%" }}>
              {info ? (
                <React.Fragment>
                  <h1>"{name}"</h1>
                  <h2>평론가 평점 : {criticRating}</h2>
                  <h3>(유저 평점 : {userRating})</h3>
                  <br></br>
                  <ul>
                    {userReview.map((v, i) => (
                      <div>
                        <h4>{getStars(v.rating)}</h4>
                        <h5>{v.text}</h5>
                        <br></br>
                      </div>
                    ))}
                  </ul>
                </React.Fragment>
              ) : !hidden && (
                <React.Fragment>
                  <h1>"{name}"</h1>
                  <br></br>
                  <br></br>
                  <br></br>
                  {isRatingOpen ? (
                    <div>
                      <h1>{<CountUp end={criticRating} decimals={2} duration={2} />}</h1>
                      <br></br>
                    </div>
                  ) : (
                    <br></br>
                  )}
                  {isRatingOpen ? null : (
                    <div>
                      <Button variant="primary" style={{ width: 100, height: 50 }} onClick={() => selectAnswer("up")}>
                        UP
                      </Button>
                      <br></br>
                      <br></br>
                      <Button variant="danger" style={{ width: 100, height: 50 }} onClick={() => selectAnswer("down")}>
                        DOWN
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
    )
  }
}

export default Movie
