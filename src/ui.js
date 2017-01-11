
var
  session = require('./session'),
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
   * Real distance betwen the 2 points
   */
  realDistance = 0,
  /**
   * User is using metric system
   *
   * @return {Boolean}
   */
  isMetricSytem = function isMetricSytem() {
    if (!element.unit.dataset.unit || element.unit.dataset.unit === 'metric') {
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
      number = Math.round(Math.round(element.number.dataset.value / 100) / 10);
    } else {
      number = Math.round(Math.round(element.number.dataset.value * 0.0006213 * 10) / 10);
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

      realDistance = distance;

      if (distance > 999) {
        distance = upgradeUnit(distance);
      }

      //if (distance > 99) {
      //  element.number.style.fontSize = "80px";
      //} else {
      //  element.number.style.fontSize = "100px";
      //}

      if (isNaN(distance)) {
        distance = '<span style="font-size:20px;position:relative;bottom:25px;">Loading...</span>';
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
        element.unit.innerHTML = 'yards';
        element.unit.dataset.unit = 'datum';
      } else {
        element.unit.innerHTML = 'meters';
        element.unit.dataset.unit = 'metric';
      }
      ui.printDistance();
    },
    getLoopSpeed: function ui_getLoopSpeed() {
      if (realDistance < 75) {
        return 1000
      } else if (realDistance < 500) {
        return 2000
      } else {
        return 4000
      }
    },
    /**
     * show distance unit
     *
     * @return {Void}
     */
     printUnit: function ui_printUnit() {
       if (isMetricSytem()) {
         if (realDistance > 999) {
           element.unit.innerHTML = 'kilometers';
         } else {
           element.unit.innerHTML = 'meters';
         }
         element.unit.dataset.unit = 'metric';
      } else {
         element.unit.innerHTML = 'yards';
         element.unit.dataset.unit = 'datum';
      }
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
     * Recompute arow orientation on device orientation change
     *
     * @return {Void}
     */
    onOrientationChange: function ui_doOnOrientationChange()
    {
      console.log('orientation changing');
      switch (window.orientation) {
        case 90:
          var rotationScreenAddToAngle = "1,5708";
          document.getElementById('infoDiv').innerHTML = 'LANDSCAPE RIGHT';
          break;
        case -90:
          var rotationScreenAddToAngle = "-1,5708";
          document.getElementById('infoDiv').innerHTML = 'LANDSCAPE LEFT';
          break;
        default:
          document.getElementById('infoDiv').innerHTML = '';
          break;
      };
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
      header.style.opacity = '1';
    },
    /**
     * print personal user link
     *
     * @param  {String}
     * @return {Void}
     */
    printLink: function ui_printLink(url) {
      document.getElementById('link').innerHTML = url;
      if(session == null){
        element.restore.style.display = 'none';
      }
    },
    //** printSendMessage: function ui_printSendMessage(url) {
    //  var strLink = "sms://?body=Click%20le%20lien%20et%20autorise%20ton%20GPS.%20Jarrive%20\n" + url;
    //  document.getElementById("smslink").setAttribute("href",strLink);
    //},
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
        console.log(radiant);
        element.arrow.style.transform = 'rotate(' + radiant + 'rad)';
      },
      /**
       * center Arrow
       * @return {Void}
       */
      center: function arrow_center() {
        this.rotate(0);
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
