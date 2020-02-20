const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')

const parse = async () => {
  const data = JSON.parse(fs.readFileSync('movieData.json', 'utf8'))
  for (let i = 164000; i < 200000; i++) {
    try {
      const html = await axios.get(
        "https://movie.naver.com/movie/bi/mi/basic.nhn?code=" + i
      );
      const $ = cheerio.load(html.data);
      const rating = $(
        "#content > div.article > div.section_group.section_group_frst > div:nth-child(5) > div:nth-child(2) > div.score_area > div.special_score > div > div > em"
      )
        .text()
        .trim();
      const review_count = $(".score_total > .total > em")
        .text()
        .trim()
        .replace(",", "");
      if (Number(rating) > 0 && Number(review_count) > 500) data.push(i);
      console.log(i)
      if(i % 1000 === 0) {
        console.log('save')
        fs.writeFileSync('movieData.json', JSON.stringify(data))
      }
    } catch (err) {
      console.log(err);
      continue;
    }
  }
};

parse()