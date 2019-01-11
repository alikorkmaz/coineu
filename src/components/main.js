import React, { Component } from "react";

class Main extends Component {
  render() {
    const gidenToplam =
      +this.props.attributes.yollanan - +this.props.attributes.wireBedeli;
    const bitstampdenKomisyonlu =
      gidenToplam -
      (gidenToplam * this.props.attributes.bitstampKomisyon) / 100;
    const bitstampdenAlinan =
      bitstampdenKomisyonlu / this.props.attributes.bitstampFiyat;
    const paribuKomisyonlu =
      bitstampdenAlinan -
      (bitstampdenAlinan * this.props.attributes.paribuKomisyon) / 100;
    const paribudanGelen = paribuKomisyonlu * this.props.attributes.paribuFiyat;
    const kur = paribudanGelen / this.props.attributes.yollanan;
    return (
      <div
        className={
          this.props.attributes.guncelKur < kur ? "positive" : "negative"
        }
      >
        <b>{this.props.title}</b>
        <br />
        Yollanan: €{this.props.attributes.yollanan}
        <br />
        Wire Bedeli: €{this.props.attributes.wireBedeli}
        <br />
        BS Komisyon: {this.props.attributes.bitstampKomisyon}%
        <br />
        PA Komisyon: {this.props.attributes.paribuKomisyon}%
        <br />
        BS Fiyat: €{(+this.props.attributes.bitstampFiyat).toFixed(4)}
        <br />
        PA Fiyat: ₺{(+this.props.attributes.paribuFiyat).toFixed(3)}
        <br />
        Giden : €{gidenToplam}
        <br />
        BS: {bitstampdenAlinan.toFixed(3)}
        <br />
        PA: ₺{paribudanGelen.toFixed(2)}
        <br />
        Satım Kur: €{kur.toFixed(3)}
        <div className="row">
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
        </div>
      </div>
    );
  }
}

export default Main;
