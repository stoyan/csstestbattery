var mensch = require('mensch');
var fs = require('fs');
var exec = require('child_process').exec;

var read = fs.readFileSync;
var write = fs.writeFileSync;

var insanity = require('../index.js');

var loco = insanity.getLocations();

console.log('Transforming ' + loco.length + ' files ...');
loco.forEach(function(l) {
  var before = mensch.parse(read(l.before).toString(), {comments: false});
  write(l.after, mensch.stringify(before, {indentation: '  '}));
});

console.log('All transformed, now testing...');

insanity.assert(function(ok, stuffs) {
  if (ok) {
    console.log('All tested, no errors');
    process.exit(0);
  } else {
    console.log(stuffs.message);
    exec(stuffs.diff);
    process.exit(1);
  }
})
