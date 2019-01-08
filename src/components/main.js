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
      <div
        className={
          this.props.attributes.guncelKur < kur && !this.props.passive
            ? "positive"
            : "negative"
        }
      >
        <b>{this.props.title}</b>
        <br />
        Yollanan: ${this.props.attributes.yollanan}
        <br />
        Wire Bedeli: ${this.props.attributes.wireBedeli}
        <br />
        CB Komisyon: {this.props.attributes.coinbaseKomisyon}%
        <br />
        PA Komisyon: {this.props.attributes.paribuKomisyon}%
        <br />
        CB Fiyat: ${(+this.props.attributes.coinbaseFiyat).toFixed(3)}
        <br />
        PA Fiyat: ₺{(+this.props.attributes.paribuFiyat).toFixed(3)}
        <br />
        Giden : ${gidenToplam}
        <br />
        CB: {coinbasedenAlinan.toFixed(3)}
        <br />
        PA: ₺{paribudanGelen.toFixed(2)}
        <br />
        Satım Kur: ${kur.toFixed(3)}
        <div className="row">
          <div className="col-xs-6">
            <button
              onClick={() =>
                this.props.onIncrease(
                  this.props.ratio,
                  this.props.type,
                  this.props.attributes.paribuFiyat
                )
              }
              className="custom-btn btn btn-primary btn-xs"
            >
              +{this.props.ratio}
            </button>
          </div>
          <div className="col-xs-6">
            <button
              onClick={() =>
                this.props.onIncrease(
                  +this.props.ratio * -1,
                  this.props.type,
                  this.props.attributes.paribuFiyat
                )
              }
              className="custom-btn btn btn-primary btn-xs"
            >
              -{this.props.ratio}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
