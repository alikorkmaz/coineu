import React, { Component } from "react";

class ReverseMain extends Component {
  render() {
    const gidenToplam =
      +this.props.attributes.yollanan - +this.props.attributes.wireBedeli;
    const paribudanKomisyonlu =
      gidenToplam - (gidenToplam * this.props.attributes.paribuKomisyon) / 100;
    const paribudanAlinan =
      paribudanKomisyonlu / this.props.attributes.paribuFiyat;
    const coinbaseKomisyonlu =
      paribudanAlinan -
      (paribudanAlinan * this.props.attributes.coinbaseKomisyon) / 100;
    const coinbasedenGelen =
      coinbaseKomisyonlu * this.props.attributes.coinbaseFiyat;
    const kur = this.props.attributes.yollanan / coinbasedenGelen;
    return (
      <div>
        <b>{this.props.title}</b>
        <br />
        Yollanan: ₺{this.props.attributes.yollanan}
        <br />
        Wire Bedeli: ₺{this.props.attributes.wireBedeli}
        <br />
        Coinbase Komisyon: {this.props.attributes.coinbaseKomisyon}%
        <br />
        Paribu Komisyon: {this.props.attributes.paribuKomisyon}%
        <br />
        CoinbaseBid Fiyat: ${this.props.attributes.coinbaseFiyat}
        <br />
        ParibuAsk Fiyat: ₺{this.props.attributes.paribuFiyat}
        <br />
        <br />
        Giden Toplam: ₺{gidenToplam}
        <br />
        Coinbaseden Alinan: {paribudanAlinan.toFixed(3)}
        <br />
        Paribudan Gelen: ₺{coinbasedenGelen.toFixed(2)}
        <br />
        Kur: ${kur.toFixed(3)}
        <hr />
      </div>
    );
  }
}

export default ReverseMain;
