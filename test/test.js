'use strict';
var assert = require('assert');
var fs = require('fs');
var NamedList = require('../lib/main');

describe('NamedList.isKey', () => {
    var validKeys = ['[aaa]', '[[[b nd df]]]', '[  ]'];
    var invalidKeys = ['[][]', '[][', 'a', ' ', ' [aaa]'];
    var expKeys = ['[]'];

    for (let key of validKeys) {
        it(`Valid key: ${key}`, () => {
            assert(NamedList.isKey(key));
        });
    }

    for (let key of invalidKeys) {
        it(`Invalid key: ${key}`, () => {
            assert(NamedList.isKey(key) === false);
        });
    }

    for (let key of expKeys) {
        it(`Key with exception: ${key}`, () => {
            assert.throws(() => {
                NamedList.isKey(key);
            });
        });
    }
});

describe('NamedList.isEntity', () => {
    var validEntities = ['[]aaa', '[][]', '[] ', '[][[['];
    var invalidEntities = ['[[[]]]', '][', 'a', ' '];

    for (let key of validEntities) {
        it(`Valid entity: ${key}`, () => {
            assert(NamedList.isEntity(key));
        });
    }

    for (let key of invalidEntities) {
        it(`Invalid entity: ${key}`, () => {
            assert(NamedList.isEntity(key) === false);
        });
    }
});

describe('NamedList.extractKeyContent', () => {
    it('[a] == a', () => {
        assert.equal(NamedList.extractKeyContent('[a]'), 'a');
    });
});

describe('NamedList.extractEntityContent', () => {
    it('[][[[]]] == [[[]]]', () => {
        assert.equal(NamedList.extractKeyContent('[][[[]]]'), '[[[]]]');
    });
});

describe('NamedList.parse', () => {
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
