var request = require('request');
var faker = require('faker');
var write = require('fs').writeFileSync;
var filename = require('path').resolve(__dirname, '../kokokaka', 'data.json');

request.get('https://api.imgur.com/3/gallery/r/kitten/top/year?q_all=sky&q_size_px=small',{
  headers: {
    Authorization: 'Client-ID 460b6bace197d72'
  },
}, function (err, response, body) {
  body = JSON.parse(body);
  body = body.data.map(function (img) {
    return {
      url: img.link,
      shortDescription: img.title,
      title: faker.company.bsNoun(),
      subtitle: faker.company.bs(),
      description: img.description || faker.lorem.sentences(),
      person: faker.name.findName(),
      company: faker.company.companyName(),
      company2: faker.company.companyName(),
      maleName: faker.name.firstName(),
    }
  });
  body = JSON.stringify(body, null, 2);
  console.log(body);
  write(filename, body);
  process.exit(0);
});
