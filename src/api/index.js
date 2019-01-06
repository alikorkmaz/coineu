export function fetchParam() {
  localStorage.setItem("yollanan", 25000);
  localStorage.setItem("wireBedeli", 100);
  localStorage.setItem("coinbaseKomisyon", 0);
  localStorage.setItem("paribuKomisyon", 0.15);
}

export function fetchApi() {
  fetch("https://cors-anywhere.herokuapp.com/https://www.paribu.com/ticker")
    .then(res => res.json())
    .then(jsonData => {
      console.log(jsonData);
      localStorage.setItem("paribuBtcBid", jsonData.BTC_TL.highestBid);
      localStorage.setItem("paribuBtcAsk", jsonData.BTC_TL.lowestAsk);
      localStorage.setItem("paribuEthBid", jsonData.ETH_TL.highestBid);
      localStorage.setItem("paribuEthAsk", jsonData.ETH_TL.lowestAsk);
      localStorage.setItem("paribuLtcBid", jsonData.LTC_TL.highestBid);
      localStorage.setItem("paribuLtcAsk", jsonData.LTC_TL.lowestAsk);
    });

  fetch("https://api.pro.coinbase.com/products/BTC-USD/ticker")
    .then(res => res.json())
    .then(jsonData => {
      localStorage.setItem("coinbaseBtcBid", jsonData.bid);
      localStorage.setItem("coinbaseBtcAsk", jsonData.ask);
    });
  fetch("https://api.pro.coinbase.com/products/ETH-USD/ticker")
    .then(res => res.json())
    .then(jsonData => {
      localStorage.setItem("coinbaseEthBid", jsonData.bid);
      localStorage.setItem("coinbaseEthAsk", jsonData.ask);
    });
  fetch("https://api.pro.coinbase.com/products/LTC-USD/ticker")
    .then(res => res.json())
    .then(jsonData => {
      localStorage.setItem("coinbaseLtcBid", jsonData.bid);
      localStorage.setItem("coinbaseLtcAsk", jsonData.ask);
    });
}

export function getData(type) {
  return {
    yollanan: localStorage.getItem("yollanan"),
    wireBedeli: localStorage.getItem("wireBedeli"),
    coinbaseKomisyon: localStorage.getItem("coinbaseKomisyon"),
    paribuKomisyon: localStorage.getItem("paribuKomisyon"),
    paribuFiyat: localStorage.getItem("paribu" + type + "Bid"),
    coinbaseFiyat: localStorage.getItem("coinbase" + type + "Ask")
  };
}
