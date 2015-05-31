var
  request = require('./request'),
  Point = require('./point'),
  orientation = require('./orientation'),
  config = require('./config'),
  ui = require('./ui'),

  me = false,
  target = false;

document.getElementById('distance').onclick = ui.changeUnit;

document.getElementById('link').onclick = function linkOnClick() {
  document.getElementById('link').select();
};

document.getElementById('conect').onclick = function connectOnClick() {
  ui.showArrow();
};

document.getElementById('restore').onclick = function restoreOnClick() {
  ui.showArrow();
  session.restoreOldSession();
};

document.body.onresize = ui.onResizeWindow;
ui.onResizeWindow();

session.start();

if (session.isNew()) {
  ui.showHome();
  ui.printLink(config.base_url + '#' + session.getHash());
} else {
  ui.showArrow();
}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(function geolocationWatchPosition(position) {
    me = new Point(create(position.coords));
  });

  window.ondeviceorientation =  function onDeviceOrientation(event) {

    if (me !== false && target !== false) {
      delta = (orientation.getDelta(me, target, (360 - event.alpha)) * Math.PI / 180);
      ui.setDistance(orientation.getDistance(me, target));
    }

    ui.arrow.rotate(delta);
  };
}