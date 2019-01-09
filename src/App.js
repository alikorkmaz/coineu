import React, { Component } from "react";
import Main from "./components/main";
import ReverseMain from "./components/reverseMain";
import "./App.css";
import Parser from "html-react-parser";

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchApi();
    this.increase = this.increase.bind(this);
    this.increaseReverse = this.increaseReverse.bind(this);
  }

  state = {};

  fetchApi() {
    fetch("https://cors-anywhere.herokuapp.com/https://www.paribu.com/ticker")
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          paribuBtcBid: jsonData.BTC_TL.highestBid,
          paribuBtcAsk: jsonData.BTC_TL.lowestAsk,
          paribuEthBid: jsonData.ETH_TL.highestBid,
          paribuEthAsk: jsonData.ETH_TL.lowestAsk,
          paribuLtcBid: jsonData.LTC_TL.highestBid,
          paribuLtcAsk: jsonData.LTC_TL.lowestAsk,
          paribuXrpBid: jsonData.XRP_TL.highestBid,
          paribuXrpAsk: jsonData.XRP_TL.lowestAsk,
          yollanan: 25000,
          wireBedeli: 50,
          transferBedeli: 10,
          bitstampKomisyon: 0.22,
          paribuKomisyon: 0.15
        });
        fetch(
          "https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/xrpeur/"
        )
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              bitstampXrpBid: jsonData.bid,
              bitstampXrpAsk: jsonData.ask
            });
          });
        fetch(
          "https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/etheur/"
        )
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              bitstampEthBid: jsonData.bid,
              bitstampEthAsk: jsonData.ask
            });
          });
        fetch(
          "https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/btceur/"
        )
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              bitstampBtcBid: jsonData.bid,
              bitstampBtcAsk: jsonData.ask
            });
          });
        fetch(
          "https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/ltceur/"
        )
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              bitstampLtcBid: jsonData.bid,
              bitstampLtcAsk: jsonData.ask
            });
          });
        fetch(
          "https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/bcheur/"
        )
          .then(res => res.json())
          .then(jsonData => {
            this.setState({
              bitstampBchBid: jsonData.bid,
              bitstampBchAsk: jsonData.ask
            });
          });

        let headers = new Headers({
          "User-Agent": ""
        });
        fetch("https://cors-anywhere.herokuapp.com/https://www.doviz.com", {
          method: "GET",
          headers: headers
        }).then(res => {
          res
            .text()
            .then(result => Parser(result))
            .then(
              result =>
                result.props.children[1].props.children[10].props.children[1]
                  .props.children[1].props.children[1].props.children[3].props
                  .children[5].props.children[1].props.children[3].props
                  .children
            )
            .then(result => {
              this.setState({
                guncelKur: result
              });
            });
        });
      });
  }

  getGuncelKur() {
    let gk;
    if (typeof this.state.guncelKur !== "undefined")
      gk = +this.state.guncelKur.replace(",", ".");
    else gk = NaN;
    return gk;
  }

  getData(type) {
    return {
      yollanan: this.state.yollanan,
      wireBedeli: this.state.wireBedeli,
      bitstampKomisyon: this.state.bitstampKomisyon,
      paribuKomisyon: this.state.paribuKomisyon,
      paribuFiyat: this.state["paribu" + type + "Bid"],
      bitstampFiyat: this.state["bitstamp" + type + "Ask"],
      guncelKur: this.getGuncelKur()
    };
  }

  getDataReverse(type) {
    return {
      yollanan: this.state.yollanan,
      wireBedeli: this.state.transferBedeli,
      bitstampKomisyon: this.state.bitstampKomisyon,
      paribuKomisyon: this.state.paribuKomisyon,
      paribuFiyat: this.state["paribu" + type + "Ask"],
      bitstampFiyat: this.state["bitstamp" + type + "Bid"],
      guncelKur: this.getGuncelKur()
    };
  }

  increase(ratio, type, oldVal) {
    let newVal = +oldVal + +ratio;

    this.setState({
      ["paribu" + type + "Bid"]: newVal
    });
  }

  increaseReverse(ratio, type, oldVal) {
    let newVal = +oldVal + +ratio;

    this.setState({
      ["bitstamp" + type + "Bid"]: newVal
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <b>Kur: {this.state.guncelKur}</b>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-6">
              {
                <Main
                  attributes={this.getData("Btc")}
                  ratio="50"
                  title="BTC"
                  type="Btc"
                  onIncrease={this.increase}
                />
              }
            </div>
            <div className="col-xs-6">
              {
                <ReverseMain
                  attributes={this.getDataReverse("Btc")}
                  ratio="10"
                  title="Reverse BTC"
                  type="Btc"
                  onIncrease={this.increaseReverse}
                />
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-6">
              {
                <Main
                  attributes={this.getData("Xrp")}
                  title="XRP"
                  ratio="0.01"
                  type="Xrp"
                  onIncrease={this.increase}
                />
              }
            </div>
            <div className="col-xs-6">
              {
                <ReverseMain
                  attributes={this.getDataReverse("Xrp")}
                  title="Reverse XRP"
                  ratio="0.002"
                  onIncrease={this.increaseReverse}
                  type="Xrp"
                />
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-6">
              {
                <Main
                  attributes={this.getData("Eth")}
                  ratio="5"
                  title="ETH"
                  type="Eth"
                  onIncrease={this.increase}
                />
              }
            </div>
            <div className="col-xs-6">
              {
                <ReverseMain
                  attributes={this.getDataReverse("Eth")}
                  ratio="1"
                  title="Reverse ETH"
                  onIncrease={this.increaseReverse}
                  type="Eth"
                />
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-6">
              {
                <Main
                  attributes={this.getData("Ltc")}
                  ratio="1"
                  title="LTC"
                  type="Ltc"
                  onIncrease={this.increase}
                />
              }
            </div>
            <div className="col-xs-6">
              {
                <ReverseMain
                  attributes={this.getDataReverse("Ltc")}
                  ratio="0.2"
                  title="Reverse LTC"
                  onIncrease={this.increaseReverse}
                  type="Ltc"
                />
              }
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
