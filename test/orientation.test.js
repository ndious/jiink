var
  test = require('tape'),
  Point = require('./../src/point'),
  orientation = require('./../src/orientation'),
  round = function (value) {
    return Math.round(value * 10000) / 10000;
  };

test('Orientation test 0', function (t) {
  t.plan(5);
  
  var
    pointA = Point([1, 1]),
    pointB = Point([2, 1]);

  t.equal(orientation.getDelta(pointA, pointB, 0), 0);
  t.equal(orientation.getDelta(pointA, pointB, 25), 0 - 25);
  t.equal(orientation.getDelta(pointA, pointB, 98), 0 - 98);
  t.equal(orientation.getDelta(pointA, pointB, 203), 0 - 203);
  t.equal(orientation.getDelta(pointA, pointB, 306), 0 - 306);
});

test('Orientation test 1 to 44', function (t) {
  t.plan(5);
    
  var
    pointA = Point([1, 1]),
    pointB = Point([5, 4]),
    zero = Math.acos(4/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});
  
test('Orientation test 45', function (t) {  
  t.plan(5);

  var
    pointA = Point([1, 1]),
    pointB = Point([2, 2]);

  t.equal(orientation.getDelta(pointA, pointB, 45), 0);
  t.equal(orientation.getDelta(pointA, pointB, 15), 45 - 15);
  t.equal(orientation.getDelta(pointA, pointB, 133), 45 - 133);
  t.equal(orientation.getDelta(pointA, pointB, 225), 45 - 225);
  t.equal(orientation.getDelta(pointA, pointB, 316), 45 - 316);
});

test('Orientation test 46 to 89', function (t) {
  t.plan(5);

  var
    pointA = Point([1, 1]),
    pointB = Point([4, 5]),
    zero = Math.acos(3/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Orientation test 90', function (t) {
  t.plan(5);
  
  var
    pointA = Point([1, 1]),
    pointB = Point([1, 2]);

  t.equal(orientation.getDelta(pointA, pointB, 90), 0);
  t.equal(orientation.getDelta(pointA, pointB, 15), 90 - 15);
  t.equal(orientation.getDelta(pointA, pointB, 165), 90 - 165);
  t.equal(orientation.getDelta(pointA, pointB, 235), 90 - 235);
  t.equal(orientation.getDelta(pointA, pointB, 354), 90 - 354);
});

test('Orientation test 91 to 134', function (t) {
  t.plan(5);
  
  var
    pointA = Point([-1, 1]),
    pointB = Point([-4, 5]),
    zero = 90 + Math.acos(4/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Orientation test 135', function (t) {
  t.plan(5);
  
  var
    pointA = Point([2, 1]),
    pointB = Point([1, 2]);
  
  t.equal(orientation.getDelta(pointA, pointB, 135), 0);
  t.equal(orientation.getDelta(pointA, pointB, 47), 135 - 47);
  t.equal(orientation.getDelta(pointA, pointB, 165), 135 - 165);
  t.equal(orientation.getDelta(pointA, pointB, 254), 135 - 254);
  t.equal(orientation.getDelta(pointA, pointB, 315), 135 - 315);
});

test('Orientation test 136 to 179', function (t) {
  t.plan(5);
  
  var
    pointA = Point([-1, 1]),
    pointB = Point([-5, 4]),
    zero = 90 + Math.acos(3/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Orientation test 180', function (t) {
  t.plan(5);
  
  var
    pointA = Point([1, 1]),
    pointB = Point([2, 1]);
  
  t.equal(orientation.getDelta(pointB, pointA, 180), 0);
  t.equal(orientation.getDelta(pointB, pointA, 15), 180 - 15);
  t.equal(orientation.getDelta(pointB, pointA, 132), 180 - 132);
  t.equal(orientation.getDelta(pointB, pointA, 211), 180 - 211);
  t.equal(orientation.getDelta(pointB, pointA, 314), 180 - 314);
});

test('Orientation test 181 to 224', function (t) {
  t.plan(5);
  
  var
    pointA = Point([-1, -1]),
    pointB = Point([-5, -4]),
    zero = 180 + Math.acos(4/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Orientation test 225', function (t) {
  t.plan(5);
  
  var
    pointA = Point([1, 1]),
    pointB = Point([2, 2]);
  
  t.equal(orientation.getDelta(pointB, pointA, 225), 0);
  t.equal(orientation.getDelta(pointB, pointA, 45), 225 - 45);
  t.equal(orientation.getDelta(pointB, pointA, 175), 225 - 175);
  t.equal(orientation.getDelta(pointB, pointA, 195), 225 - 195);
  t.equal(orientation.getDelta(pointB, pointA, 318), 225 - 318);
});

test('Orientation test 226 to 269', function (t) {
  t.plan(5);
  
  var
    pointA = Point([-1, -1]),
    pointB = Point([-4, -5]),
    zero = 180 + Math.acos(3/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Orientation test 270', function (t) {
  t.plan(5);
  
  var
    pointA = Point([1, 1]),
    pointB = Point([1, 2]);
  
  t.equal(orientation.getDelta(pointB, pointA, 270), 0);
  t.equal(orientation.getDelta(pointB, pointA, 35), 270 - 35);
  t.equal(orientation.getDelta(pointB, pointA, 92), 270 - 92);
  t.equal(orientation.getDelta(pointB, pointA, 205), 270 - 205);
  t.equal(orientation.getDelta(pointB, pointA, 286), 270 - 286);
});

test('Orientation test 271 to 314', function (t) {
  t.plan(5);
  
  var
    pointA = Point([1, -1]),
    pointB = Point([4, -5]),
    zero = 270 + Math.acos(4/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Orientation test 315', function (t) {
  t.plan(5);
  
  var
    pointA = Point([2, 1]),
    pointB = Point([1, 2]);
  
  t.equal(orientation.getDelta(pointB, pointA, 315), 0);
  t.equal(orientation.getDelta(pointB, pointA, 16), 315 - 16);
  t.equal(orientation.getDelta(pointB, pointA, 135), 315 - 135);
  t.equal(orientation.getDelta(pointB, pointA, 195), 315 - 195);
  t.equal(orientation.getDelta(pointB, pointA, 343), 315 - 343);
});

test('Orientation test 316 to 359', function (t) {
  t.plan(5);
    
  var
    pointA = Point([1, -1]),
    pointB = Point([5, -4]),
    zero = 270 + Math.acos(3/5) * 180 / Math.PI;

  t.equal(round(orientation.getDelta(pointA, pointB, zero)), 0);
  t.equal(round(orientation.getDelta(pointA, pointB, 25)), round(zero - 25));
  t.equal(round(orientation.getDelta(pointA, pointB, 98)), round(zero - 98));
  t.equal(round(orientation.getDelta(pointA, pointB, 203)), round(zero - 203));
  t.equal(round(orientation.getDelta(pointA, pointB, 306)), round(zero - 306));
});

test('Distance test', function (t) {
  t.plan(2);
  
  var
    pointA = Point([1, 1]),
    pointB = Point([2, 2]);
  
  t.equal(orientation.getDistance(pointA, pointB), Math.sqrt(2) * 100000);
  
  pointA = Point([1, 1]);
  pointB = Point([3, 4]);
  
  t.equal(orientation.getDistance(pointA, pointB), Math.sqrt(13) * 100000);
});
