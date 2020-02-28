import React from "react"
import Head from "next/head"
import Movie from "../components/Movie"
import movieData from "../movieData.json"
import axios from "axios"
import cheerio from "cheerio"

class Home extends React.Component {
  state = {
    score: 0,
    highScore: 0,
    data: [null, null],
    finishedNum: [],
    info: [true, false]
  }

  init = async () => {
    this.setState({
      score: 0,
      finishedNum: []
    })
    await this.getData()
    await this.getData()
  }

  getData = async () => {
    const { finishedNum, data } = this.state
    let num
    do num = movieData[Math.floor(Math.random() * movieData.length)]
    while (finishedNum.findIndex(el => el == num) !== -1)
    const newData = await axios.get("/getData/" + num)

    this.setState({
      finishedNum: [...finishedNum, num],
      data: [data[1], newData.data]
    })
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="hero" style={{ backgroundColor: "black", height: "100%" }}>
          <div style={{ width: "100%", height: "10%" }}>
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
          </div>
          <div style={{ width: "50%", height: "90%", float: "left" }}>
            <Movie data={this.state.data[0]} info={this.state.info[0]} />
          </div>
          <div style={{ width: "50%", height: "90%", float: "left" }}>
            <Movie data={this.state.data[1]} info={this.state.info[1]} />
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
