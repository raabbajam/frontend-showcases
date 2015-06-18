require('dotenv').load();
var faker = require('faker');
var fs = require('fs');
var path = require('path');

var filters = [ 'ig-xpro2', 'ig-willow', 'ig-walden', 'ig-valencia', 'ig-toaster', 'ig-sutro', 'ig-sierra', 'ig-rise', 'ig-nashville', 'ig-mayfair', 'ig-lofi', 'ig-kelvin', 'ig-inkwell', 'ig-hudson', 'hefe', 'ig-earlybird', 'ig-brannan', 'ig-amaro', 'ig-1977', ];
var write = fs.writeFileSync;
var filename = require('path').resolve(__dirname, '../k2/data/item.json');

var data = [];
for (var i = 0; i < 7; i++) {
  data.push({
    i: i + 1,
    h2: faker.company.catchPhraseDescriptor(),
    h3: faker.company.catchPhrase(),
    p: faker.company.catchPhraseNoun(),
    filter: faker.random.array_element(filters),
  })
}
data = JSON.stringify(data, null, 2);
console.log(data);
write(filename, data);
process.exit(0);
