var
  session = require('./session');
  /**
   * Element dictionary
   *
   * @type {Object}
   */
  element = {
    /**
     * distance view
     *
     * @type {NodeElement}
     */
    distance: document.getElementById('distance'),
    /**
     * distance view
     *
     * @type {NodeElement}
     */
    number: document.getElementById('number'),
    /**
     * Unit view
     *
     * @type {NodeElement}
     */
    unit: document.getElementById('unit'),
    /**
     * Arrow element
     *
     * @type {NodeElement}
     */
    arrow: document.getElementById('arrow'),
    /**
     * Home view
     *
     * @type {NodeElement}
     */
    home: document.getElementById('home'),
    /**
     * background element
     *
     * @type {NodeElement}
     */
    wallpaper: document.getElementById('wallpaper'),
    /**
     * Screen content
     *
     * @type {NodeElement}
     */
    content: document.getElementById('content'),
    /**
     * Restore session button
     *
     * @type {NodeElement}
     */
    restore: document.getElementById('restore')
  },
  /**
   * User is using metric system
   *
   * @return {Boolean}
   */
  isMetricSytem = function isMetricSytem() {
    if (element.unit.dataset.unit === 'metric') {
      return true;
    }
    return false;
  },
  /**
   * Convert meters to milles
   *
   * @param  {Number} distance in meters
   * @return {Number} distance in milles
   */
  convertToMilles = function convertToMilles(number) {
    return Math.round(number * 1.0936);
  },
  /**
   * Convert unit for bigger distance
   *
   * @param  {Number} in m or yd
   * @return {Number} in km or mi
   */
  upgradeUnit = function upgradeUnit(number) {
    if (isMetricSytem()) {
      element.unit.innerHTML = 'km';
      number = (Math.round(element.number.dataset.value / 100) / 10);
    } else {
      element.unit.innerHTML = 'mi';
      number = (Math.round(element.number.dataset.value * 0.0006213 * 10) / 10);
    }
    return number;
  },
  /**
   * UI api
   *
   * @type {Object}
   */
  ui = {
    /**
     * Update distance view
     *
     * @param {Number}
     * @return {Void}
     */
    setDistance: function ui_setDistance(distance) {
      distance = Math.round(distance);

      if (distance === undefined && element.number.dataset.value !== undefined) {
        distance = element.number.dataset.value
      } else if (distance === undefined) {
        distance = 0;
      }

      element.number.dataset.value = distance;

      if (!isMetricSytem()) {
        distance = convertToMilles(distance);
      }

      if (distance > 999) {
        distance = upgradeUnit(distance);
      }

      if (isNaN(distance)) {
        distance = 0;
      }

      element.number.innerHTML = distance;
    },
    /**
     * change unit of mesure and update unit view
     * From m to yd or yd to m
     *
     * @return {Void}
     */
    changeUnit: function ui_changeUnit() {
      if (isMetricSytem()) {
        element.unit.innerHTML = 'yd';
        element.unit.dataset.unit = 'datum'
      } else {
        element.unit.innerHTML = 'm';
        element.unit.dataset.unit = 'metric'
      }
      ui.printDistance();
    },
    /**
     * On resize navigator window
     *
     * @return {Void}
     */
    onResizeWindow: function ui_onResizeWindow() {
      var height = document.body.clientHeight,
      width = document.body.clientWidth,
      margintop = 0;

      if (height > width) {
        margintop = (height - ((width/100)*80)) / 2;
      } else {
        margintop = (height - ((height/100)*80)) / 2;
      }
      element.arrow.style.marginTop = margintop.toString() + 'px';
      element.home.style.marginTop = margintop.toString() + 'px';
    },
    /**
     * Update target activity
     *
     * @param {boolean}
     */
    setActivity: function ui_setActivity(activ) {
      if (activ) {
        element.wallpaper.classList.remove('inactive');
        element.wallpaper.classList.add('active');
      } else {
        element.wallpaper.classList.remove('active');
        element.wallpaper.classList.add('inactive');
      }
    },
    /**
     * Show home view
     *
     * @return {Void}
     */
    showHome: function ui_printHome() {
      element.home.style.display = 'block';
      element.restore.style.display = 'block';
      element.arrow.style.display = 'none';
      element.distance.style.display = 'none';
    },
    /**
     * show Arrow view
     *
     * @return {Void}
     */
    showArrow: function ui_printArrow() {
      element.home.style.display = 'none';
      element.restore.style.display = 'none';
      element.arrow.style.display = 'block';
      element.distance.style.display = 'block';
    },
    /**
     * print personal user link
     *
     * @param  {String}
     * @return {Void}
     */
    printLink: function ui_printLink(url) {
      document.getElementById('link').value = url;
    },
    /**
     * Arrow api
     *
     * @type {Object}
     */
    arrow: {
      /**
       * rotate arrow
       * @param  {Number} angle in radiant
       * @return {Void}
       */
      rotate: function arrow_rotate(radiant) {
        element.arrow.style.transform = 'rotate(' + radiant + 'rad)';
      },
      /**
       * center Arrow
       * @return {Void}
       */
      center: function arrow_center() {
        rotateArrow(0);
      }
    }
  },
  /**
   * Ui constructor
   *
   * @return {Ui}
   */
  initUi = function initUi() {
    return ui;
  };

module.exports = initUi;
