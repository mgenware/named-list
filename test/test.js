var assert = require('assert');
var fs = require('fs');
var NamedList = require('../lib/main');

describe('Suite 1', () => {
    var files = ['1'];
    var caseId = 1;

    for (var fileName of files) {
        var src = fs.readFileSync(__dirname + `/data/${fileName}.txt`, 'utf8');
        var dest = require(__dirname + `/data/${fileName}.js`);

        var srcObj = NamedList.parse(src);

        it(`File ${caseId++}`, () => {
            console.log('src ', srcObj);
            assert.deepEqual(srcObj, dest);
        });
    }
});
