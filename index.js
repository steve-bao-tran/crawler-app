const PORT = 5005;
const express = require('express');
const bussiness = require("./bussiness");

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// app.get("/cr", async function (res, req) {
//   try {
//     const url = "https://coinmarketcap.com/";
//     axios(url).then((response) => {
//       const html_data = response.data;
//       const $ = cheerio.load(html_data);
//       console.log("🚀 ~ file: index.js ~ line 15 ~ axios ~ $", $);
//     });

//     return res.json($);
//   } catch (error) {
//     console.debug(error);

//     throw Error(error);
//   }
// });

app.get("/api/crypto", async (req, res) => {
  try {
    const crypto = await bussiness.cryptopriceScraper();
    return res.status(200).json({
      result: crypto,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

app.post("/api/screen", async (req, res) => {
  try {
    console.log("🚀 ~ file: index.js ~ line 41 ~ app.post ~ req.body", req.body);
    const screen = await bussiness.screenpriceScraper(req.body.url);
    return res.status(200).json({
      result: screen,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});
