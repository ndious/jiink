var
  request = require('./request'),
  Point = require('./point'),
  orientation = require('./orientation'),
  config = require('./config'),
  ui = require('./ui')(),
  session = require('./session'),

  positions = {
    me: false,
    target: false,
  },

  updatePositon = function () {
    if (positions.me && positions.target) {
      ui.setDistance(orientation.getDistance(positions.me, positions.target));
      ui.printUnit();
    }
  },

  synchronize = function () {
    var promise = request(positions.me);
    promise.then(function (response) {

      document.getElementById('hash').innerHTML = 'Session: <b>' + session.getHash() + '</b>';
      document.getElementById('connected').innerHTML = 'Linked: ' + (response.connected == true ? '✓' : 'non');

      if((response.connected) == 1){
        document.body.style.background = '#097d09';
        document.body.style.background = 'linear-gradient(to left, #097d09, #06bf06)'; // GREEN
        document.getElementById('infoDiv').innerHTML = 'Connected';
      }else{
        document.body.style.background = '#ff8a00';
        document.body.style.background = 'linear-gradient(to left, #ff8a00, #ffd200)'; // ORANGE
        document.getElementById('infoDiv').innerHTML = 'Disconnected but still tracking';
      }

      var count = document.getElementById('request-count');
      count.innerHTML = parseInt(count.innerHTML, 10) + 1;

      positions.target = new Point({
        latitude: response.position.lat,
        longitude: response.position.lng
      });
      updatePositon();
      setTimeout(synchronize, ui.getLoopSpeed());
    }).catch(function () {

      setTimeout(synchronize, 10000);
    });
  };


//document.getElementById('distance').onclick = ui.changeUnit;

document.getElementById('link').onclick = function linkOnClick() {
  document.getElementById('link').select();
};

document.getElementById('connect').onclick = function connectOnClick() {
  ui.showArrow();
  synchronize();
};

document.getElementById('restore').onclick = function restoreOnClick() {
  ui.showArrow();
  session.restoreOldSession();
  synchronize();
};

window.addEventListener('orientationchange', ui.onOrientationChange);

//document.body.onresize = ui.onResizeWindow;
//ui.onResizeWindow();

session.start();

if (config.debug === false) {
  document.getElementById('debug').style = 'display: none;';
}

if (session.isNew()) {
  ui.showHome();
  ui.printLink(config.base_url + '#' + session.getHash());
  //ui.printSendMessage(config.base_url + '#' + session.getHash());
} else {
  ui.showArrow();
  synchronize();
}



if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(function geolocationWatchPosition(position) {
    positions.me = new Point(position.coords);
    updatePositon();
    var count = document.getElementById('watch-count');
    count.innerHTML = parseInt(count.innerHTML, 10) + 1;
    if (config.debug === true) {
      document.getElementById('lat').innerHTML = positions.me.getY();
      document.getElementById('lng').innerHTML = positions.me.getX();

      document.getElementById('trg-lat').innerHTML = positions.target.getY();
      document.getElementById('trg-lng').innerHTML = positions.target.getX();
    }
  }, function () {

  }, {
    enableHighAccuracy: true,
    maximumAge: 0
  });

  window.ondeviceorientation =  function onDeviceOrientation(event) {
    if (positions.me !== false && positions.target !== false) {
      var delta = (orientation.getDelta(positions.me, positions.target, (360 - event.alpha)) * Math.PI / 180);
      ui.arrow.rotate(delta);

      if (config.debug === true) {
        console.log(delta);
        console.log(orientation.getDistance(positions.me, positions.target));
      }
    }
  };
}
