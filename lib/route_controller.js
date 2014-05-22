RouteController = function (router, route, options) {
  var self = this;

  if (!(router instanceof IronRouter))
    throw new Error('RouteController requires a router');

  if (!(route instanceof Route))
    throw new Error('RouteController requires a route');

  options = this.options = options || {};

  this.router = router;
  this.route = route;

  this.path = options.path || '';
  this.params = options.params || [];
  this.where = options.where || 'client';
  this.action = options.action || this.action;
};

RouteController.prototype = {
  constructor: RouteController,

  /**
   * Returns the value of a property, searching for the property in this lookup
   * order:
   *
   *   1. RouteController options
   *   2. RouteController prototype
   *   3. Route options
   *   4. Router options
   */
  lookupProperty: function (key) {
    var value;

    if (!_.isString(key))
      throw new Error('key must be a string');

    // 1. RouteController options
    if (typeof (value = this.options[key]) !== 'undefined')
      return value;

    // 2. RouteController instance
    if (typeof (value = this[key]) !== 'undefined')
      return value;

    var opts;
    
    // 3. Route options
    opts = this.route.options;
    if (opts && typeof (value = opts[key]) !== 'undefined')
      return value;

    // 4. Router options
    opts = this.router.options;
    if (opts && typeof (value = opts[key]) !== 'undefined')
      return value;

    // 5. Oops couldn't find property
    return undefined;
  },

  action: function () {
    throw new Error('not implemented');
  },

  stop: function (cb) {
    return this._stopController(cb);
  },

  _stopController: function (cb) {
    var self = this;

    if (this.isStopped)
      return;

    self.isRunning = false;
    self.isStopped = true;
    cb && cb.call(self);
  },

  _run: function () {
    throw new Error('not implemented');
  }
};

_.extend(RouteController, {
  /**
   * Inherit from RouteController
   *
   * @param {Object} definition Prototype properties for inherited class.
   */

  extend: function (definition) {
    return Utils.extend(this, definition, function (definition) {
      var klass = this;

      
      /*
        Allow calling a class method from javascript, directly in the subclass
        definition.

        Instead of this:
          MyController = RouteController.extend({...});
          MyController.before(function () {});

        You can do:
          MyController = RouteController.extend({
            before: function () {}
          });
       
        And in Coffeescript you can do:
         MyController extends RouteController
           @before function () {}
       */
    });
  }
});
