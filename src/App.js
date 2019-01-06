import React, { Component } from "react";
import Main from "./components/main";
import "./App.css";
import { fetchApi, fetchParam, getData } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
  }

  clear() {
    localStorage.clear();
  }

  setAll() {
    fetchParam();
    fetchApi();
  }

  setParam() {
    fetchParam();
  }

  setApi() {
    fetchApi();
  }

  render() {
    return (
      <div>
        <button onClick={this.clear}>CLEAR</button>
        <button onClick={this.setAll}>SET_ALL</button>
        <button onClick={this.setApi}>SET_API</button>
        <button onClick={this.setParam}>SET_PARAM</button>
        <br />
        {<Main attributes={getData("Btc")} title="Btc" />}
        {<Main attributes={getData("Eth")} title="Eth" />}
        {<Main attributes={getData("Ltc")} title="Ltc" />}
      </div>
    );
  }
}

export default App;
