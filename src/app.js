var
  request = require('./request'),
  Point = require('./point'),
  orientation = require('./orientation'),
  config = require('./config'),
  ui = require('./ui')(),
  session = require('./session'),

  me = false,
  target = false,

  synchronize = function () {
    var promise = request(me);
    promise.then(
      function (response) {
        document.getElementById('hash').innerHTML = 'Session: <b>' + session.getHash() + '</b>';
        document.getElementById('connected').innerHTML = 'Linked: ' + (response.connected == true ? '✓' : 'non');

       if((response.connected) == 1){
			document.body.style.background = '#097d09';
			document.body.style.background = 'linear-gradient(to left, #097d09, #06bf06)'; // GREEN
		}else{
			document.body.style.background = '#ff8a00';
			document.body.style.background = 'linear-gradient(to left, #ff8a00, #ffd200)'; // ORANGE
		}

        var count = document.getElementById('request-count');
        count.innerHTML = parseInt(count.innerHTML, 10) + 1;

        target = new Point({
          latitude: response.position.lat,
          longitude: response.position.lng
        });
        setTimeout(synchronize, 2000);
      }
    );
  };


document.getElementById('distance').onclick = ui.changeUnit;

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
    me = new Point(position.coords);
    ui.setDistance(orientation.getDistance(me, target));
    ui.printUnit();
    var count = document.getElementById('watch-count');
    count.innerHTML = parseInt(count.innerHTML, 10) + 1;
    if (config.debug === true) {
      document.getElementById('lat').innerHTML = position.coords.latitude;
      document.getElementById('lng').innerHTML = position.coords.longitude;

      document.getElementById('trg-lat').innerHTML = target.getY();
      document.getElementById('trg-lng').innerHTML = target.getX();

      console.log('me', me);
      console.log('target', target);
      console.log('distance', orientation.getDistance(me, target));
    } 
  }, function () {

  }, {
    enableHighAccuracy: true,
    maximumAge: 0
  });

  window.ondeviceorientation =  function onDeviceOrientation(event) {
    if (me !== false && target !== false) {
      var delta = (orientation.getDelta(me, target, (360 - event.alpha)) * Math.PI / 180);
      ui.arrow.rotate(delta);

      if (config.debug === true) {
        console.log(delta);
        console.log(orientation.getDistance(me, target));
      }
    }
  };
}
