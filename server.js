const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");

const dev = process.env.NODE_ENV === "development";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const axios = require('axios')
const cheerio = require('cheerio')

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  
  server.get('/getData/:num', async (req, res) => {
      const num = req.params.num
      const html = await axios.get(
        "https://movie.naver.com/movie/bi/mi/basic.nhn?code=" + num
      );
      const imghtml = await axios.get(
          "https://movie.naver.com/movie/bi/mi/photoViewPopup.nhn?movieCode=" + num
      )
      const $ = cheerio.load(html.data);
      const $$ = cheerio.load(imghtml.data);
      const criticRating = $(
        "#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_area > div.special_score > div > div > em"
      ).text();
      const userRating = $(
        "#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_area > div.netizen_score > div > div > em"
      ).text();
      const name = $("#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)").text()
      const imageUrl = $$("#targetImage").attr('src')
      const userReview = [];
      for (let i = 1; i <= 5; i++) {
        const review = {};
        review.rating = $(
          `#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_result > ul > li:nth-child(${i}) > div.star_score > em`
        ).text();
        review.text = $(
          `#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_result > ul > li:nth-child(${i}) > div.score_reple > p`
        )
          .text()
          .trim();
        review.like = $(
          `#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_result > ul > li:nth-child(${i}) > div.btn_area > a._sympathyButton > strong`
        ).text();
        review.date = $(
          `#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_result > ul > li:nth-child(${i}) > div.score_reple > dl > dt > em:nth-child(2)`
        ).text();
        userReview.push(review);
      }
      res.json({ num, name, imageUrl, criticRating, userRating, userReview })
  })

  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log("Server ready on http://localhost" + port);
  });
});
