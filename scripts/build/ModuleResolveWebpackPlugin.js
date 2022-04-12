var assign = require('object-assign');
var forEachBail = require('enhanced-resolve/lib/forEachBail');

module.exports = function (options = {}) {
  return {
    apply: doApply.bind(this, options)
  };
};

function doApply(options = {}, resolver) {
  var target = resolver.ensureHook("resolve");
  resolver.getHook("before-resolve")
    .tapAsync("ModuleResolveWebpackPlugin", (request, resolveContext, callback) => {
      var attempts = [];
      Object.keys(options).forEach(module => {
        Object.keys(options[module]).forEach(dep => {
          const reg = new RegExp(dep + '$');
          if (request.path.includes(module) && reg.test(request.request)) {
            var obj = assign({}, request, {
              request: 'react-router/umd/ReactRouter'
            });
            attempts.push(obj);
          }
        })
      })
      if (attempts.length) {
        forEachBail(
          attempts,
          function (obj, innerCallback) {
            resolver.doResolve(target, obj, " using " + request.request, resolveContext, innerCallback);
          },
          callback
        );
      } else {
        return callback();
      }
    });
}