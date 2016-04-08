var
  config = {
    request: {
      url: 'http://jiink.io/index.php',
      type: 'json',
      action: 'POST',
      accept: 'application/json'
    },

    base_url: 'http://jiink.io/',

    token_length: 4,

    debug: false
  };

module.exports = config;