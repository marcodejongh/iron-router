var createRouter = function () {
  return new IronRouter({
    autoRender: false,
    autoStart: false
  });
};

var initController = function (C, options) {
  var router = createRouter();
  var route = new Route(router, 'test', {});
  return new C(router, route, options);
};

var createController = function (proto, opts) {
  var createRouter = function () {
    return new IronRouter({
      autoRender: false,
      autoStart: false
    });
  };
  var route = new Route(Router, 'test', {});

  var R = RouteController.extend(proto || {});
  return new R(Router, route, opts);
};

Tinytest.add('RouteController - inheritance', function (test) {
  var Router = createRouter();
  var route = new Route(Router, 'test', {});

  var Parent = RouteController.extend({
    parentMethod: function () {}
  });

  var Child = Parent.extend({
    childMethod: function () {}
  });

  var inst = new Child(Router, route);

  test.isTrue(_.isFunction(inst.childMethod), 'child method not defined');
  test.isTrue(_.isFunction(inst.parentMethod), 'parent method not defined');
});

Tinytest.add('RouteController - lookupProperty', function (test) {
  var Router = createRouter();
  var route = new Route(Router, 'test', {});
  var inst = new RouteController(Router, route, {});
  var value;

  // undefined
  value = inst.lookupProperty('myProperty');
  test.isUndefined(value, 'property should be undefined');

  // router options
  Router.options.myProperty = 'myRouterValue';
  value = inst.lookupProperty('myProperty');
  test.equal(value, 'myRouterValue', 'property should be on router options');

  // route options
  route.options.myProperty = 'myRouteValue';
  value = inst.lookupProperty('myProperty');
  test.equal(value, 'myRouteValue', 'property should be on route options');

  // route controller instance
  inst.myProperty = 'myInstanceValue';
  value = inst.lookupProperty('myProperty');
  test.equal(value, 'myInstanceValue', 'property should be on instance');

  // route controller options
  inst.options.myProperty = 'myOptionsValue';
  value = inst.lookupProperty('myProperty');
  test.equal(value, 'myOptionsValue', 'property should be on instance options');
});

Tinytest.add('RouteController - stop', function (test) {
  var Router = createRouter();
  var route = new Route(Router, 'test', {});
  var inst = new RouteController(Router, route, {});

  var calls = [];

  inst.stop();

  test.isFalse(inst.isRunning, 'isRunning should be false');
  test.isTrue(inst.isStopped, 'isStopped should be true');
});