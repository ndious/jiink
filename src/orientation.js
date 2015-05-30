var
  /**
   * Compute Hypothenuse
   *
   * @param  {Number} distance on X
   * @param  {Number} distance on Y
   * @return {Number} Hypotenuse length
   */
  hypot = function hypot(x, y) {
    return Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
  },
  /**
   * Compute alpha angle
   *
   * @param  {Number} distance X
   * @param  {Number} distance Y
   * @return {Number} alpha
   */
  computeAlpha = function computeAlpha(x, y) {
    var
      alpha = 0,
      h = hypot(x, y);

    if (x === y) {
      alpha = 45;
    } else {
      alpha = (Math.acos(Math.abs(x)/h) * 180 / Math.PI);
    }

    return alpha;
  },
  /**
   * Compute beta angle
   *
   * @param  {Number} distance X
   * @param  {Number} distance Y
   * @param  {Number} angle alpha
   * @return {Number} angle Beta
   */
  computeBeta = function computeBeta(x, y, alpha) {
    var
      beta = 0,
      xIsPos = (x === Math.abs(x)),
      yIsPos = (y === Math.abs(y));

    if (x === 0 || y === 0) {
      if (x === 0 && yIsPos) {
        beta = 0;
      } else if (x === 0 && !yIsPos) {
        beta = 180;
      } else if (xIsPos && y === 0) {
        beta = 90;
      } else if (!xIsPos && y === 0) {
        beta = 270;
      }
    } else {
      if (xIsPos && yIsPos) {
        beta = 90 - alpha;
      } else if (xIsPos && !yIsPos) {
        beta = 90 + alpha;
      } else if (!xIsPos && yIsPos) {
        beta = 270 + alpha;
      } else if (!xIsPos && !yIsPos) {
        beta = 270 - alpha;
      }
    }

    return beta;
  },
  /**
   * Orientation public Api
   *
   * @type {Object}
   */
  orientation = {
    /**
     * Compute delta angle. Delta represent the angle behind Heading (gama) and the orientation of the line via the pointA and pointB.
     *
     * @param  {Point}
     * @param  {Point}
     * @param  {Number} angle alpha
     * @return {Number} angle Beta
     */
    getDelta: function orientation_getDelta(pointA, pointB, gamma) {
      var
        x = pointB.getX() - pointA.getX(),
        y = pointB.getY() - pointA.getY(),
        alpha = computeAlpha(x, y),
        beta = computeBeta(x, y, alpha);

      return (beta - gamma);
    },
    /**
     * Compute the shortest distance behind point1 and pointB
     *
     * @param  {Point}
     * @param  {Point}
     * @return {Nu;ber}
     */
    getDistance: function orientation_getDistance(pointA, pointB) {
      var
        x = pointB.getX() - pointA.getX(),
        y = pointB.getY() - pointA.getY();

      return hypot(x, y) * 100000;
    }
  };

module.exports = orientation;
