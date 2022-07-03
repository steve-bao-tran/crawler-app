const axios = require('axios');
const cheerio = require('cheerio');

async function screenpriceScraper(url = "") {
  console.log(`1111111111`);
  url = `https://tinhocngoisao.com/man-hinh-lcd-24-asus-vg247q1a-tuf-gaming-fhd-va-165hz-chinh-hang`;
  if (!url) { return; }
  const results = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    console.log("🚀 ~ file: bussiness.js ~ line 20 ~ awaitaxios ~ html_data", html_data);
    const a = $(html_data).text();
    results.push(a);
  });

  return results;
};

async function cryptopriceScraper() {
  const url = "https://coinmarketcap.com/";
  const coinArray = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

    const selectedElem =
      "#primary > div > div.mf-product-detail > div.summary entry-summary > p.price > ins > span.woocommerce-Price-amount.amount > bdi";
    const keys = [
      "No.",
      "Coin",
      "Price",
      "24h",
      "7d",
      "Marketcap",
      "Volume",
      "CirculatingSupply",
    ];

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 9) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        coinArray.push(coinDetails);
      }
    });
  });
  

  return coinArray;
}

module.exports = { cryptopriceScraper, screenpriceScraper };