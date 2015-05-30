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
    retrun JSON.stringify({
        position: position,
        track: session.getTrakId()
    });
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
        fulfill(JSON.parse(this.responseText));
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
      var xhr = new XMLHttpRequest(),

      xhr.onreadystatechange = onreadystatechange.bind(xmlhttp, fulfill, reject);

      xhr.open(config.action, config.url, true);
      xhr.responseType = config.type;
      xhr.setRequestHeader('Accept', config.accept);
      xhr.setRequestHeader('session-identifier', session.getHash());

      xhr.send(buildRequestContent(position));
    });

    return promise;
  };

module.exports = sendRequest;
