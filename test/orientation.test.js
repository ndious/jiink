var
  test = require('tape'),
  Point = require('./../src/point'),
  orientation = require('./../src/orientation');

test('Orientation test', function (t) {
  t.plan(20);

  var
    pointA = Point([1, 1]),
    pointB = Point([2, 2]);

  t.equal(orientation.getDistance(pointA, pointB), Math.sqrt(2) * 100000);

  t.equal(orientation.getDelta(pointA, pointB, 45), 0);
  t.equal(orientation.getDelta(pointA, pointB, 15), 45 - 15);
  t.equal(orientation.getDelta(pointA, pointB, 75), 45 - 75);
  t.equal(orientation.getDelta(pointA, pointB, 225), 45 - 225);
  t.equal(orientation.getDelta(pointB, pointA, 315), 45 - 315);

  t.equal(orientation.getDelta(pointB, pointA, 225), 0);
  t.equal(orientation.getDelta(pointB, pointA, 195), 225 - 195);
  t.equal(orientation.getDelta(pointB, pointA, 255), 225 - 255);
  t.equal(orientation.getDelta(pointB, pointA, 45), 225 - 45);
  t.equal(orientation.getDelta(pointB, pointA, 315), 225 - 315);

  var
    pointA = Point([2, 1]),
    pointB = Point([1, 2]);

  t.equal(orientation.getDistance(pointA, pointB), Math.sqrt(2) * 100000);

  t.equal(orientation.getDelta(pointA, pointB, 135), 0);
  t.equal(orientation.getDelta(pointA, pointB, 105), 135 - 105);
  t.equal(orientation.getDelta(pointA, pointB, 165), 135 - 165);
  t.equal(orientation.getDelta(pointA, pointB, 315), 135 - 315);

  t.equal(orientation.getDelta(pointB, pointA, 315), 0);
  t.equal(orientation.getDelta(pointB, pointA, 285), 315 - 285);
  t.equal(orientation.getDelta(pointB, pointA, 345), 315 - 345);
  t.equal(orientation.getDelta(pointB, pointA, 135), 315 - 135);
});

test('Particular Orientation test', function (t) {
  t.plan(12);

  var
    pointA = Point([1, 1]),
    pointB = Point([2, 1]);

  t.equal(orientation.getDelta(pointA, pointB, 0), 0);
  t.equal(orientation.getDelta(pointA, pointB, 15), 0 - 15);
  t.equal(orientation.getDelta(pointA, pointB, 75), 0 - 75);

  t.equal(orientation.getDelta(pointB, pointA, 180), 0);
  t.equal(orientation.getDelta(pointB, pointA, 15), 180 - 15);
  t.equal(orientation.getDelta(pointB, pointA, 75), 180 - 75);

  var
    pointA = Point([1, 1]),
    pointB = Point([1, 2]);

  t.equal(orientation.getDelta(pointA, pointB, 90), 0);
  t.equal(orientation.getDelta(pointA, pointB, 15), 90 - 15);
  t.equal(orientation.getDelta(pointA, pointB, 75), 90 - 75);

  t.equal(orientation.getDelta(pointB, pointA, 270), 0);
  t.equal(orientation.getDelta(pointB, pointA, 15), 270 - 15);
  t.equal(orientation.getDelta(pointB, pointA, 75), 270 - 75);
});