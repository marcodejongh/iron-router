Package.describe({
  summary: 'Routing specifically designed for Meteor'
});

Package.on_use(function (api) {
  api.use('reactive-dict', ['client']);
  api.use('deps', ['client']);
  api.use('underscore', ['client']);
  api.use('ejson', ['client']);
  api.use('jquery', 'client');

  // default ui manager
  // use unordered: true becuase of circular dependency
  api.use('templating');
  // for helpers
  api.use('ui', 'client');
 
  // default ui manager
  // unordered: true because blaze-layout package weakly
  // depends on iron-router so it can register itself with
  // the router. But we still want to pull in the blaze-layout
  // package automatically when users add iron-router.

  api.use('deps-ext');
  api.add_files('lib/layout.js', 'client');
  api.add_files('lib/overrides.js', 'client');

  api.add_files('lib/utils.js', ['client']);
  api.add_files('lib/route.js', ['client']);
  api.add_files('lib/route_controller.js', ['client']);
  api.add_files('lib/router.js', ['client']);

  api.add_files('lib/client/location.js', 'client');
  api.add_files('lib/client/router.js', 'client');
  api.add_files('lib/client/route_controller.js', 'client');
  api.add_files('lib/client/ui/helpers.js', 'client');



  api.export('RouteController', ['client']);
  api.export('Route', ['client']);
  api.export('Router', ['client']);
  api.export('IronLocation', 'client');

  api.export('Utils', ['client'], {testOnly: true});
  api.export('IronRouter', ['client'], {testOnly: true});

  api.export('Layout', 'client', {testOnly: true});
});

Package.on_test(function (api) {
  api.use('iron-router', ['client']);
  api.use('tinytest', ['client']);
  api.use('test-helpers', ['client']);
  api.use('reactive-dict', ['client']);
  api.use('deps-ext', 'client');

  api.add_files('test/test_helpers.js', ['client']);

  // client and server
  api.add_files('test/both/route.js', ['client']);
  api.add_files('test/both/route_controller.js', ['client']);
  api.add_files('test/both/router.js', ['client']);
  api.add_files('test/both/utils.js', ['client']);

  // client only
  api.add_files('test/client/mocks.js', 'client');
  api.add_files('test/client/router.js', 'client');
  api.add_files('test/client/route_controller.js', 'client');
});
