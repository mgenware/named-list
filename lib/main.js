'use strict';
const kKeyStart = '[';
const kKeyEnd = ']';
const kEntityStart = '[]';
const kDefaultKey = 'default';

class NamedList {
    static parse(str) {
        if (typeof str !== 'string') {
            throw new TypeError('str should be a string');
        }

        let lines = str.split(/\r?\n/);
        let obj = {};
        let curKey = null;
        let curValue = [];
        for (var line of lines) {
            if (!line) {
                continue;
            }
            if (this.isKey(line)) {
                curKey = this.tryInsertValue(curKey, curValue, obj);
                curValue = [];
                curKey = this.extractKeyContent(line);
            } else if (this.isEntity(line)) {
                curValue.push(this.extractEntityContent(line));
            } else {
                curValue.push(line);
            }
        }
        this.tryInsertValue(curKey, curValue, obj, line);
        return obj;
    }

    static tryInsertValue(curKey, curValue, obj) {
        if (!curKey) {
            curKey = kDefaultKey;
        }
        obj[curKey] = (curValue.length ? curValue : null);
    }

    static isKey(key) {
        if (key.startsWith(kKeyStart) && key.endsWith(kKeyEnd)) {
            if (key.length == 2) {
                throw new Error('Empty key is not allowed(use [][] to escape this)');
            }
            if (key.startsWith(kEntityStart)) {
                return false;
            }
            return true;
        }
        return false;
    }

    static isEntity(line) {
        return line.startsWith(kEntityStart);
    }

    static extractEntityContent(line) {
        return line.substr(kEntityStart.length);
    }

    static extractKeyContent(line) {
        return line.substr(1, line.length - 2);
    }
}

module.exports = NamedList;
