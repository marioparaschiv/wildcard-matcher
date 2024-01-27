const fs = require('fs');

const wildcards = fs.readFileSync('./wildcards.txt', 'utf-8').split(/\r\n|\r|\n/);
const names = fs.readFileSync('./names.txt', 'utf-8').split(/\r\n|\r|\n/);

const similar = {};

for (const wildcard of wildcards) {
   for (const name of names) {
      const status = { matched: 0 };

      const split = wildcard.split('**');
      for (const chunk of split) {
         if (~name.indexOf(chunk)) {
            status.matched++;
         }
      }

      if (status.matched >= 2) {
         similar[wildcard] ??= [];
         similar[wildcard].push(name);
      }
   }
}

fs.writeFileSync('./matches.json', JSON.stringify(similar, null, 2), 'utf-8');