import React, { Component } from "react";
import Main from "./components/main";
import ReverseMain from "./components/reverseMain";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchApi();
  }

  state = {};

  fetchApi() {
    fetch("https://cors-anywhere.herokuapp.com/https://www.paribu.com/ticker")
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          paribuBtcBid: jsonData.BTC_TL.highestBid,
          paribuBtcAsk: jsonData.BTC_TL.lowestAsk,
          paribuEthBid: jsonData.ETH_TL.highestBid,
          paribuEthAsk: jsonData.ETH_TL.lowestAsk,
          paribuLtcBid: jsonData.LTC_TL.highestBid,
          paribuLtcAsk: jsonData.LTC_TL.lowestAsk,
          yollanan: 25000,
          wireBedeli: 100,
          transferBedeli: 10,
          coinbaseKomisyon: 0,
          paribuKomisyon: 0.15
        });
        fetch("https://api.pro.coinbase.com/products/BTC-USD/ticker")
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              coinbaseBtcBid: jsonData.bid,
              coinbaseBtcAsk: jsonData.ask
            });
          });
        fetch("https://api.pro.coinbase.com/products/ETH-USD/ticker")
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              coinbaseEthBid: jsonData.bid,
              coinbaseEthAsk: jsonData.ask
            });
          });
        fetch("https://api.pro.coinbase.com/products/LTC-USD/ticker")
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              coinbaseLtcBid: jsonData.bid,
              coinbaseLtcAsk: jsonData.ask
            });
          });
      });
  }

  getData(type) {
    return {
      yollanan: this.state.yollanan,
      wireBedeli: this.state.wireBedeli,
      coinbaseKomisyon: this.state.coinbaseKomisyon,
      paribuKomisyon: this.state.paribuKomisyon,
      paribuFiyat: this.state["paribu" + type + "Bid"],
      coinbaseFiyat: this.state["coinbase" + type + "Ask"]
    };
  }

  getDataReverse(type) {
    return {
      yollanan: this.state.yollanan,
      wireBedeli: this.state.transferBedeli,
      coinbaseKomisyon: this.state.coinbaseKomisyon,
      paribuKomisyon: this.state.paribuKomisyon,
      paribuFiyat: this.state["paribu" + type + "Ask"],
      coinbaseFiyat: this.state["coinbase" + type + "Bid"]
    };
  }

  render() {
    return (
      <div className="App">
        {<Main attributes={this.getData("Btc")} title="Btc" />}
        {<Main attributes={this.getData("Eth")} title="Eth" />}
        {<Main attributes={this.getData("Ltc")} title="Ltc" />}
        <hr />
        <hr />
        {
          <ReverseMain
            attributes={this.getDataReverse("Btc")}
            title="ReverseBtc"
          />
        }
        {
          <ReverseMain
            attributes={this.getDataReverse("Eth")}
            title="ReverseEth"
          />
        }
        {
          <ReverseMain
            attributes={this.getDataReverse("Ltc")}
            title="ReverseLtc"
          />
        }
      </div>
    );
  }
}

export default App;
