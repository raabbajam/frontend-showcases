var url = process.argv[2];
var format = process.argv[3].split('x');
var destination = require('path').resolve(process.argv[4] || '.');

// var Download = require('download');
var gm = require('gm');
var action = gm(url);
action.resize.apply(action, format);
action.noProfile()
  .write(destination, function (err) {
    if (err) {
      console.error('Error!', err.stack);
      process.exit(1);
    } else {
      console.log('Done!');
      process.exit(0);
    }
  })
