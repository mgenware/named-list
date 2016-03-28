# named-list

[![npm version](https://badge.fury.io/js/named-list.svg)](https://badge.fury.io/js/named-list)
[![Build Status](https://travis-ci.org/mgenware/named-list.svg?branch=master)](http://travis-ci.org/mgenware/named-list)

Named list for Node.js 4.0+.

## Installation
```sh
npm install named-list
```

# Get started
```js
var NamedList = require('named-list');
```
## NamedList.parse(str)
Parse a named list from a string, return an object.

## A basic list
* Key names are surrounded by square brackets.
* A key can have zero or multiple value(s).
```
[Key1]
Value 1
Value 2
[Key with spaces]
Value 1
[Key with no value]
```

Result
```json
{
    "Key1": ["Value 1", "Value 2"],
    "Key with spaces": ["Value 1"],
    "Key with no value": null
}
```

## Use [] to escape square brackets
```
[Key1]
[][I'm not a key]
[Key2]
```

Result
```json
{
    "Key1": ["[I'm not a key]"],
    "Key2": null
}
```

## Empty lines are simply ignored
```
[Key]

Value

```

Result
```json
{
    "Key": ["Value"]
}
```

## Run tests
```sh
npm test
```

# License
MIT
