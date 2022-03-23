const expressValidator = require('express-validator');

  exports.stubForValidation = function(done) {
    var req;
    req = {
      query: {},
      body: {},
      params: {},
      param: function(name) {
        return this.params[name];
      }
    };
    return expressValidator(req, {}, function() {
      return done(req);
    });
  };