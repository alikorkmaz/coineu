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
      <div
        className={
          this.props.attributes.guncelKur > kur && !this.props.passive
            ? "positive"
            : "negative"
        }
      >
        <b>{this.props.title}</b>
        <br />
        Yollanan: ₺{this.props.attributes.yollanan}
        <br />
        Transfer Bedeli: ₺{this.props.attributes.wireBedeli}
        <br />
        CB Komisyon: {this.props.attributes.coinbaseKomisyon}%
        <br />
        PA Komisyon: {this.props.attributes.paribuKomisyon}%
        <br />
        CB Fiyat: ${(+this.props.attributes.coinbaseFiyat).toFixed(3)}
        <br />
        PA Fiyat: ₺{(+this.props.attributes.paribuFiyat).toFixed(3)}
        <br />
        Giden: ₺{gidenToplam}
        <br />
        CB: {paribudanAlinan.toFixed(3)}
        <br />
        PA: ₺{coinbasedenGelen.toFixed(2)}
        <br />
        Alım Kur: ${kur.toFixed(3)}
        <div className="row">
          <div className="col-xs-6">
            <button
              onClick={() =>
                this.props.onIncrease(
                  this.props.ratio,
                  this.props.type,
                  this.props.attributes.coinbaseFiyat
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
                  this.props.attributes.coinbaseFiyat
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

export default ReverseMain;
