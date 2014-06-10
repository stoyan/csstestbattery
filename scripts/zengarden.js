var exec = require('child_process').exec;

for (var i = 0; i <= 220; i++) {
  var file = i;
  if (i < 10) {
    file = '00' + i;
  } else if (i < 100) {
    file = '0' + i;
  }

  var cmd =
    'curl http://www.csszengarden.com/%s/%s.css??v=8may2013 -o data/zengarden/before/%s.css'.
    replace(/%s/g, file);
  setTimeout(
    function(){exec(this)}.bind(cmd),
    1000 * Math.random() + 1000
  );
}

exec('curl http://www.csszengarden.com/ -o data/zengarden/zen.html');