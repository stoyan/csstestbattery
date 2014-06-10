var system = require('system');
var exec = require('child_process').execFile;
var write = require('fs').write;

var url = system.args[1];
var idx = system.args[2];

var dontbother = ['jpg', 'png', 'gif', 'jpeg', 'woff', 'ttf', 'otf', 'eot', 'swf'];

var page = require('webpage').create();
page.settings.loadImages = false;
page.settings.javascriptCanOpenWindows = false;
page.settings.javascriptCanCloseWindows = false;

page.onResourceRequested = function(requestData, request) {
  var path = requestData.url.split('?')[0];
  var ext = path.substring(path.lastIndexOf('.') + 1);
  if (dontbother.indexOf(ext) !== -1) {
    request.abort();
  }
};

page.open(url, function (status) {
  if (status !== 'success') {
    console.log('Unable to access the network!');
  }

  var inlinestyles = page.evaluate(function() {
    var styles = [];
    [].slice.call(document.querySelectorAll('style')).forEach(function(s) {
      styles.push('/**** inline ****/');
      styles.push(s.textContent);
    })
    return styles.join('\n');
  });

  var external = page.evaluate(function() {
    var urls = [];
    [].slice.call(document.querySelectorAll('link[rel=stylesheet]')).forEach(function(s) {
      urls.push(s.href);
    })
    return urls;
  });

  var curls = [];
  external.forEach(function(f, i) {
    curls.push('curl "' + f + '" -o data/alexa1000/before/' + idx + '.' + i + '.css');
  })

  write('data/alexa1000/html/' + idx + '.html', page.content);
  write('data/alexa1000/before/' + idx + '.inline.css', inlinestyles);
  write('data/alexa1000/before/' + idx + '.sh', curls.join('\n'));

  phantom.exit();
});