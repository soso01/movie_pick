import React from "react";
import Head from "next/head";

class Home extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="hero" style={{ backgroundColor: "black", height: '100%' }}>
          <div
            style={{ backgroundColor: "blue", width: "50%", height: "100%" }}
          >
            ㅇㄴㄹㅁㄹㅇㄴ
          </div>
          <div></div>
        </div>
        <style jsx global>{`{
          html, body, div#__next {
            height: 100%;
            margin: 0px;
          }
        }`}
        </style>
      </div>
    );
  }
}

export default Home;
