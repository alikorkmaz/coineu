import React, { Component } from "react";

class ReverseMain extends Component {
  render() {
    const gidenToplam =
      +this.props.attributes.yollanan - +this.props.attributes.wireBedeli;
    const paribudanKomisyonlu =
      gidenToplam - (gidenToplam * this.props.attributes.paribuKomisyon) / 100;
    const paribudanAlinan =
      paribudanKomisyonlu / this.props.attributes.paribuFiyat;
    const bitstampKomisyonlu =
      paribudanAlinan -
      (paribudanAlinan * this.props.attributes.bitstampKomisyon) / 100;
    const bitstampdenGelen =
      bitstampKomisyonlu * this.props.attributes.bitstampFiyat;
    const kur = this.props.attributes.yollanan / bitstampdenGelen;
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
        BS Komisyon: {this.props.attributes.bitstampKomisyon}%
        <br />
        PA Komisyon: {this.props.attributes.paribuKomisyon}%
        <br />
        BS Fiyat: €{(+this.props.attributes.bitstampFiyat).toFixed(3)}
        <br />
        PA Fiyat: ₺{(+this.props.attributes.paribuFiyat).toFixed(3)}
        <br />
        Giden: ₺{gidenToplam}
        <br />
        BS: {paribudanAlinan.toFixed(3)}
        <br />
        PA: ₺{bitstampdenGelen.toFixed(2)}
        <br />
        Alım Kur: €{kur.toFixed(3)}
        <div className="row">
          <div className="col-xs-6">
            <button
              onClick={() =>
                this.props.onIncrease(
                  +this.props.ratio * -1,
                  this.props.type,
                  this.props.attributes.bitstampFiyat
                )
              }
              className="custom-btn btn btn-primary btn-xs"
            >
              -{this.props.ratio}
            </button>
          </div>
          <div className="col-xs-6">
            <button
              onClick={() =>
                this.props.onIncrease(
                  this.props.ratio,
                  this.props.type,
                  this.props.attributes.bitstampFiyat
                )
              }
              className="custom-btn btn btn-primary btn-xs"
            >
              +{this.props.ratio}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReverseMain;
