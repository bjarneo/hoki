hoki
======

What is this?
------
Just a plain straightforward observer and dispatcher.

Installation
------
It's available on npm.
```
npm install --save hoki
```

How can I use this library?
------

Usage
------
API
```js
const observe = require('hoki').observer;
const dispatch = require('hoki').dispatch;

observe(string, function);
dispatch(string, function/object/string/number/etc);
```

Example
```js
const observe = require('hoki').observer;
const dispatch = require('hoki').dispatch;

// You always need to specify the observer first so we can observe for events
observe('cat-names', console.log);
// output in correct order:
// furguson
// mittens
// boots

dispatch('cat-names', 'furguson');
dispatch('cat-names', 'mittens');
dispatch('cat-names', 'boots');
```
You can also add multiple observers for the same event
```js
const observe = require('hoki').observer;
const dispatch = require('hoki').dispatch;

// You always need to specify the observer first so we can observe for events
observe('cat-names', console.log);
// output in correct order:
// furguson
// mittens
// boots

observe('cat-names', console.log);
// output in correct order:
// furguson
// mittens
// boots

dispatch('cat-names', 'furguson');
dispatch('cat-names', 'mittens');
dispatch('cat-names', 'boots');
```

List all events available
```js
const getEvents = require('hoki').getEvents;

console.log(getEvents());
// [ 'cat-names' ]
```

Remove one event
```js
const getEvents = require('hoki').getEvents;
const clear = require('hoki').clear;

clear('cat-names');
console.log(getEvents());
// [ ]
```

Tests
------
```bash
$ npm test
```

Contribution
------
Contributions are appreciated.

License
------
MIT-licensed. See LICENSE.
