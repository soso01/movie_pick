import React from "react"
import Head from "next/head"
import movieData from "../movieData.json"
import axios from "axios"

import Movie from "../components/Movie"
import StartModal from "../components/StartModal"
import EndModal from "../components/EndModal"

class Home extends React.Component {
  state = {
    score: 0,
    highScore: 0,
    data: [null, null],
    finishedNum: [],
    isRatingOpen: false,
    status: "newGame"
  }

  init = async () => {
    this.setState({
      score: 0,
      finishedNum: []
    })
    await this.getData()
    await this.getData()
    await this.getData()
  }

  getData = async () => {
    const { finishedNum, data } = this.state
    await this.setState({
      isRatingOpen: false,
      data: [data[1], data[2], null]
    })
    let num
    do num = movieData[Math.floor(Math.random() * movieData.length)]
    while (finishedNum.findIndex(el => el == num) !== -1)
    const newData = await axios.get("/getData/" + num)

    this.setState({
      finishedNum: [...finishedNum, num],
      data: [data[1], data[2], newData.data]
    })
  }

  selectAnswer = async type => {
    const data = this.state.data
    await this.setState({ isRatingOpen: true })

    setTimeout(() => {
      if (type == "up") {
        if (data[1].criticRating >= data[0].criticRating) {
          this.setState({ score: this.state.score + 1 })
          this.getData()
        } else {
          this.setState({ status: "endGame" })
        }
      } else if (type == "down") {
        if (data[1].criticRating <= data[0].criticRating) {
          this.setState({ score: this.state.score + 1 })
          this.getData()
        } else {
          this.setState({ status: "endGame" })
        }
      }
    }, 3000)
  }

  render() {
    const { status, highScore, score, data, isRatingOpen } = this.state
    return (
      <div style={{ height: "100%" }}>
        <Head>
          <title>Movie Pick!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StartModal
          show={status === "newGame"}
          onHide={async () => {
            await this.init()
            this.setState({ status: "inGame" })
          }}
        ></StartModal>
        <EndModal
          score={score}
          show={status === "endGame"}
          onHide={async () => {
            await this.init()
            this.setState({ status: "inGame" })
          }}
        ></EndModal>
        <div className="hero" style={{ backgroundColor: "black", height: "100%" }}>
          <div style={{ width: "100%", height: "10%", color: "white" }}>
            <button
              onClick={() => {
                this.init()
              }}
            >
              init
            </button>
            <button
              onClick={() => {
                this.getData()
              }}
            >
              getData
            </button>
            <h3>최고점수 : {highScore}</h3>
            <h3>현재점수 : {score}</h3>
          </div>
          <div style={{ width: "50%", height: "90%", float: "left" }}>
            <Movie data={data[0]} info={true} />
          </div>
          <div style={{ width: "50%", height: "90%", float: "left" }}>
            <Movie data={data[1]} info={false} selectAnswer={this.selectAnswer} isRatingOpen={isRatingOpen} />
          </div>
          <div style={{ width: 0, height: 0, float: "left" }}>
            <Movie data={data[2]} isRatingOpen={false} />
          </div>
        </div>
        <style jsx global>
          {`
             {
              html,
              body,
              div#__next {
                height: 100%;
                margin: 0px;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default Home
