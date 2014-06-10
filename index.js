var cssdiff = require('cssdiff');
var fs = require('fs');
var path = require('path');

var dir = fs.readdirSync;
var exists = fs.existsSync;
var stat = fs.statSync;

module.exports = {
  getLocations: function() {
    var res = [];
    var p = './data';
    dir(p).forEach(function(topdir) {
      topdir = path.join(p, topdir);
      if (!stat(topdir).isDirectory()) {
        return;
      }

      var beforedir = path.join(topdir, '/before');
      var afterdir = path.join(topdir, '/after');
      var htmldir = path.join(topdir, '/html');

      var index = exists(htmldir)
        ? ''
        : path.join(topdir, 'index.html');

      dir(beforedir).forEach(function(file) {
        var abs = path.join(beforedir, file);
        if (path.extname(file) === '.css' && stat(abs).size) {
          res.push({
            before: path.join(abs),
            after: path.join(afterdir, file),
            html: index || path.join(htmldir, file.replace('.css', '.html'))
          });
        }
      })

    });
    return res;
  },

  assert: function(cb) {
    var files = this.getLocations();
    var me = this;
    var index = -1;
    function die(msg, diff) {
      cb(false, {message: msg, diff: diff});
    }
    function next() {
      index++;
      if (!files[index]) {
        cb(true);
      }
      me.assertOne(files[index], next, die);
    }
    next();
  },

  assertOne: function(next, success_cb, fail_cb) {
    cssdiff(next.html, next.before, next.after, function(ok, msg, diff) {
      ok ? success_cb() : fail_cb(msg, diff);
    });
  }
};
