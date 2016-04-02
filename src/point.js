var
  /**
   * Point object
   *
   * @type {Object}
   **/
  Point = function Point() {
    return {
      /**
       * Latitude
       *
       * @type {Number}
       **/
      lat: 0,
      /**
       * Longitude
       *
       * @type {Number}
       **/
      lng: 0,
      /**
       * Set point coordinates
       *
       * @param {Number} lat
       * @param {Number} lng
       * @return {Void}
       **/
      setCoords: function pointSetCoords(lat, lng) {
        this.lat = ((Math.round(lat * 1000000)) / 1000000);
        this.lng = ((Math.round(lng * 1000000)) / 1000000);
      },
      /**
       * Get value on X axis
       *
       * @return {Number}
       **/
      getX: function pointGetX() {
        
        return this.lng;
      },
      /**
       *  Get value on Y axis
       *
       * @return {Number}
       **/
      getY: function pointGetY() {
        return this.lat;
      }
    }
  },
  /**
   * Create new point
   *
   * @return {Point}
   **/
  create = function PointConstructor(coords) {
    var
      point = new Point();

    if(Object.prototype.toString.call(coords) === '[object Array]') {
      point.setCoords(coords[0], coords[1]);
    } else {
      point.setCoords(coords.latitude, coords.longitude);
    }

    return point;
  };

module.exports = create;
