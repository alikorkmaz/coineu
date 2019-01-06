import React, { Component } from "react";

class Main extends Component {
  render() {
    const gidenToplam =
      +this.props.attributes.yollanan - +this.props.attributes.wireBedeli;
    const coinbasedenKomisyonlu =
      gidenToplam -
      (gidenToplam * this.props.attributes.coinbaseKomisyon) / 100;
    const coinbasedenAlinan =
      coinbasedenKomisyonlu / this.props.attributes.coinbaseFiyat;
    const paribuKomisyonlu =
      coinbasedenAlinan -
      (coinbasedenAlinan * this.props.attributes.paribuKomisyon) / 100;
    const paribudanGelen = paribuKomisyonlu * this.props.attributes.paribuFiyat;
    const kur = paribudanGelen / this.props.attributes.yollanan;
    return (
      <div>
        <b>{this.props.title}</b>
        <br />
        Yollanan: ${this.props.attributes.yollanan}
        <br />
        Wire Bedeli: ${this.props.attributes.wireBedeli}
        <br />
        Coinbase Komisyon: {this.props.attributes.coinbaseKomisyon}%
        <br />
        Paribu Komisyon: {this.props.attributes.paribuKomisyon}%
        <br />
        Coinbase Fiyat: ${this.props.attributes.coinbaseFiyat}
        <br />
        Paribu Fiyat: ₺{this.props.attributes.paribuFiyat}
        <br />
        <br />
        Giden Toplam: ${gidenToplam}
        <br />
        Coinbaseden Alinan: {coinbasedenAlinan.toFixed(3)}
        <br />
        Paribudan Gelen: ₺{paribudanGelen.toFixed(2)}
        <br />
        Kur: ${kur.toFixed(3)}
        <hr />
      </div>
    );
  }
}

export default Main;
