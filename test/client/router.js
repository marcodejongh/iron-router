// uiManager api tests
// hot code reload
// run (deps changed and current changed)

var mockedRouter = function() {
  var router = new IronRouter({
    autoStart: false,
    autoRender: false
  });
  
  router.configure({ location: new LocationMock, uiManager: new UIMock });
  return router;
}

Tinytest.add('ClientRouter - calling same route twice does not write to history', function (test) {
  var router = mockedRouter();
  
  router.map(function() {
    this.route('one');
    this.route('two');
  });
  
  var location = new LocationMock;
  var setCalled = 0, oldSet = location.set
  location.set = function() {
    setCalled += 1;
    oldSet.apply(this, arguments);
  }
  
  router.configure({ location: location });
  
  // starting the router doesn't set the url
  router.start();
  test.equal(setCalled, 0);
  
  router.go(router.path('one'));
  test.equal(setCalled, 0);
  router.go(router.path('two'));
  test.equal(setCalled, 1);
  router.go(router.path('one'));
  test.equal(setCalled, 2);
  router.go(router.path('one'));
  test.equal(setCalled, 2);
});
