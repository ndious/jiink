var
  /**
   * token size
   *
   * @type {Number}
   */
  token_length = require('./config').token_length,
  /**
   * storage system usade
   *
   * @type {SessionStorage}
   */
  storage = window.sessionStorage,
  /**
   * chaactere available to hash
   *
   * @type {Array}
   */
  alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  /**
   * session is new
   *
   * @type {Boolean}
   */
  isNew = true,
  /**
   * Token generator
   *
   * @return {String}
   */
  generateToken = function generateToken() {
    var
      token = [],
      rand;

    for (var i = 0; i < token_length; i = i + 1) {
      rand = Math.floor(Math.random() * 36) + 1;
      token.push(alpha[rand]);
    }

    return token.join('');
  },
  /**
   * new session constructor
   *
   * @return {Void}
   */
  newSession = function newSession() {
      store(generateToken(), 1, 2);
  },
  /**
   * load previus session
   *
   * @param  {Stirng} session identifier
   * @return {Void}
   */
  loadSession = function loadSession(hash) {
      isNew = false;
      hash = hash.split('#');
      store(hash[1], 2, 1);
  },
  /**
   * Storage manipulator
   *
   * @param  {String} session identifier
   * @param  {Number} User id in the session
   * @param  {Number} Id tracked
   * @return {Void}
   */
  store = function store(session, id, track) {
    if (storage.getItem('hash') && storage.getItem('hash') !== session) {
      storage.setItem('old_hash', storage.getItem('hash'));
      storage.setItem('old_track', storage.getItem('track'));
      storage.setItem('old_id', storage.getItem('id'));
    }
    storage.setItem('hash', session);
    storage.setItem('track', track);
    storage.setItem('id', id);
  },
  /**
   * Session Api
   *
   * @type {Object}
   */
  session = {
    /**
     * User Preferences
     *
     * @type {Object}
     */
    preferences: {},
    /**
     * Start the session
     *
     * @return {Void}
     */
    start: function session_start() {
      if (document.location.hash === '') {
        newSession();
      } else {
        loadSession(document.location.hash);
      }
    },
    /**
     * get hash token
     *
     * @return {String}
     */
    getHash: function session_getHash() {
      return storage.getItem('hash');
    },
    /**
     * return user preference
     *
     * @param  {String} key preference identitfier
     * @return {Mixed}
     */
    getPreference: function session_getPreference(key)
    }
    /**
     * get tracked user Id
     *
     * @return {Number}
     */
    getTrakId: function session_getTrakId() {
      return storage.getItem('track');
    },
    /**
     * the session is new
     *
     * @return {Boolean}
     */
    isNew: function session_isNew() {
      return isNew;
    },
    /**
     * there is an old session in storage
     *
     * @return {Boolean}
     */
    isOldSession: function session_isOldSession() {
      return (storage.getItem('old_hash') !== null);
    },
    /**
     * restore old session
     *
     * @return {Void}
     */
    restoreOldSession: function session_restoreOldSession() {
      storage.setItem('hash', storage.getItem('old_hash'));
      storage.setItem('track', storage.getItem('old_track'));
      storage.setItem('id', storage.getItem('old_id'));

      storage.setItem('old_hash', null);
      storage.setItem('old_track', null);
      storage.setItem('old_id', null);
    }
  };

module.exports = session;
