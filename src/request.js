require('es6-promise').polyfill();

var
  session = require('./session'),
  config = require('./config').request,
  /**
   * Build the request content
   *
   * @param  {Object}
   * @return {Void}
   */
  buildRequestContent = function buildRequestContent(position) {
    return 'lat=' + position.lat + '&lng=' + position.lng + '&track=' + session.getTrakId();
  },
  /**
   * Executed when Ajax call is ended
   *
   * @param  {Function} fulfill
   * @param  {Function} reject
   * @return {Void}
   */
  onreadystatechange = function onreadystatechange(fulfill, reject) {
    if (this.readyState == XMLHttpRequest.DONE) {
      if(199 < this.status && 300 > this.status){
        fulfill(this.response);
      } else {
        reject(this.status);
      }
    }
  },
  /**
   * Create a new ajax call
   *
   * @param  {Object}
   * @return {Promise}
   */
  sendRequest = function sendRequest(position) {
    var promise = new Promise(function (fulfill, reject) {
      var xhr = new XMLHttpRequest();
      var params = buildRequestContent(position);
      console.log(config, session.getHash());

      xhr.onreadystatechange = onreadystatechange.bind(xhr, fulfill, reject);

      /*xhr.ontimeout = function () {
        reject(504);
      };*/

      xhr.open(config.action, config.url, true);
      xhr.responseType = config.type;
      xhr.setRequestHeader('Accept', config.accept);
      xhr.setRequestHeader('session-identifier', session.getHash());
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      //xhr.timeout = 1500;

      xhr.send(params);
    });

    return promise;
  };

module.exports = sendRequest;
