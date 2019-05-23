L.TileLayer.WMTS = L.TileLayer.extend({
  db: null,
  initialize: function (url, options, db) {
    this.db = db;
    this._url = url;
    var wmtsParams = L.extend({}, this.defaultWmtsParams),
      tileSize = options.tileSize || this.options.tileSize;
    if (options.detectRetina && L.Browser.retina) {
      wmtsParams.width = wmtsParams.height = tileSize * 2;
    } else {
      wmtsParams.width = wmtsParams.height = tileSize;
    }
    for (var i in options) {
      if (!this.options.hasOwnProperty(i) && i != "matrixIds") {
        wmtsParams[i] = options[i];
      }
    }
    this.wmtsParams = wmtsParams;
    this.matrixIds = options.matrixIds || this.getDefaultMatrix();
    L.setOptions(this, options);
  },
  onAdd: function (map) {
    L.TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function (tilePoint, tile) {
    var z = this._getZoomForUrl();
    var map = this._map;
    var crs = map.options.crs;
    var tileSize = this.options.tileSize;
    var nwPoint = tilePoint.multiplyBy(tileSize);
    nwPoint.x += 1;
    nwPoint.y -= 1;
    var sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
    var nw = crs.project(map.unproject(nwPoint, z));
    var se = crs.project(map.unproject(sePoint, z));

    var tilewidth = se.x - nw.x;
    var ident = this.matrixIds[z].identifier;
    var X0 = this.matrixIds[z].topLeftCorner.lng;
    var Y0 = this.matrixIds[z].topLeftCorner.lat;

    var tilecol = Math.floor((nw.x - X0) / tilewidth);
    var tilerow = -Math.floor((nw.y - Y0) / tilewidth);
    this.db.transaction((tx) => {
      var sql = `SELECT tile_data FROM tiles WHERE zoom_level = ${ident} AND tile_column = ${tilecol} AND tile_row = ${tilerow};`;
      console.log(sql);
      tx.executeSql(sql, [], (tx, res) => {
        console.log(`res.rows.length: ${res.rows.length}`);
        tile.src = `data:image/png;base64,${res.rows.length >=1? res.rows.item(0).tile_data: ''}`.replace(/\n/g, '');
      }, (err, msg) => {
        console.log('error with executeSql', err);
        console.log('message ', msg);
      });
    }, (err, msg) => {
      console.log("Transaction err:", err);
      console.log('message ', msg);
    });
  },
  setParams: function (params, noRedraw) {
    L.extend(this.wmtsParams, params);
    if (!noRedraw) {
      this.redraw();
    }
    return this;
  },
  getDefaultMatrix: function () {
    var matrixIds3857 = new Array(22);
    for (var i = 0; i < 22; i++) {
      matrixIds3857[i] = {
        identifier: "" + i,
        topLeftCorner: new L.LatLng(90, -180)
      };
    }
    return matrixIds3857;
  },
  _loadTile: function (tile, tilePoint) {
    tile._layer = this;
    tile.onload = this._tileOnLoad;
    tile.onerror = this._tileOnError;
    this.getTileUrl(tilePoint, tile);
  }
});

L.tileLayer.wmts = function (url, options) {
  return new L.TileLayer.WMTS(url, options);
};