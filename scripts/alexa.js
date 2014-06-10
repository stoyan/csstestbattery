var read = require('fs').readFileSync;
var exec = require('child_process').exec;
var sprintf = require('sprintf').sprintf;
var unlink = require('fs').unlink;

var urls = read('scripts/alexa1000.txt', 'utf8').toString().trim().split('\n');

download(0);

function download(idx) {

  console.log(idx);

  if (!urls[idx]) {
    return;
  }

  var cmd = sprintf('phantomjs scripts/alexaphan.js "%s" %s', urls[idx], idx + 1);

  exec(cmd, function() {
    var sh = sprintf('data/alexa1000/before/%s.sh', idx + 1);
    exec('sh ' + sh, function() {
      idx++;
      setTimeout(function(){download(idx)}, 2000);
      unlink(sh);
      setTimeout(function(){merge(idx)}, 20000);
    });
  });
}


function merge(idx) {
  var cmd = 'cat data/alexa1000/before/%s.*.css > data/alexa1000/before/%s.css';
  exec(sprintf(cmd, idx, idx), function() {
    exec(sprintf('rm data/alexa1000/before/%s.*.css', idx));
  })
}

