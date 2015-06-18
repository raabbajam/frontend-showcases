require('dotenv').load();
var dig = require('dummy-image-generator');
var faker = require('faker');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var write = fs.writeFileSync;
var filename = require('path').resolve(__dirname, '../kokokaka', 'data.json');
var filters = [ 'ig-xpro2', 'ig-willow', 'ig-walden', 'ig-valencia', 'ig-toaster', 'ig-sutro', 'ig-sierra', 'ig-rise', 'ig-nashville', 'ig-mayfair', 'ig-lofi', 'ig-kelvin', 'ig-inkwell', 'ig-hudson', 'hefe', 'ig-earlybird', 'ig-brannan', 'ig-amaro', 'ig-1977', ];

dig.downloader.init('kokokaka/.tmp')
  .then(function () {
    rimraf.sync('kokokaka/.tmp/*');
    rimraf.sync('kokokaka/images/*');
    return;
  })
  .then(function () {

    return dig.source({ adapter: 'imgur', query: 'unicorn', clientID: process.env.IMGUR_CLIENT_ID});

  })
  .then(function (links) {
    return dig.downloader.download(links);
  })
  .then(function () {
    var paths = fs.readdirSync('kokokaka/.tmp').map(function (file) {
      return path.resolve(__dirname, '../kokokaka/.tmp', file);
    });
    return dig.formatter({
      adapter: 'gm',
      paths: paths,//.slice(0, 10),//['/opt/lampp/htdocs/html/kokokaka/.tmp/KosFr2V.gif'],
      options: {
        resize: [319],
        noProfile: true,
        write: './kokokaka/images'
      }
    });
  })
  .then(function (links) {
    var data = links.map(function (link) {
      return {
        url: link.replace('/opt/lampp/htdocs/html/kokokaka/', ''),
        shortDescription: faker.lorem.sentence(),
        title: faker.company.bsNoun(),
        subtitle: faker.company.bs(),
        description: faker.lorem.sentences(),
        person: faker.name.findName(),
        company: faker.company.companyName(),
        company2: faker.company.companyName(),
        maleName: faker.name.firstName(),
      }
    });
    data = JSON.stringify(data, null, 2);
    console.log(data);
    write(filename, data);
    process.exit(0);
  })
  .catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
