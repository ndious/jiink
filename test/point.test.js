var
  test = require('tape'),
  Point = require('../src/point');

test('Point creation test', function (t) {
  t.plan(4);

  var
    point = new Point([56, 12]),
    point2 = new Point({latitude: 65, longitude: 21});

  t.equal(point.getX(), 12);
  t.equal(point.getY(), 56);

  t.equal(point2.getX(), 21);
  t.equal(point2.getY(), 65);
});