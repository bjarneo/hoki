hoki
======
![Travis](https://travis-ci.org/bjarneo/hoki.svg?branch=master)

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
const register = require('hoki').register;
const unregister = require('hoki').unregister;
const observer = require('hoki').observer;
const dispatch = require('hoki').dispatch;
const events = require('hoki').events;

// Can register an event or array of events
register(string || []);

// Can unregister an event or array of events
unregister(string || []);

// Can observe for an event, and fire a callback if the event occurs
observer(string, function);

// Dispatch an event with data. Can also dispatch an empty event
dispatch(string, function/object/string/number/etc);

// List all events
events();
```

Example
```js
const register = require('hoki').register;
const observer = require('hoki').observer;
const dispatch = require('hoki').dispatch;

// Register your event
register('cat-names');

// Observe for an event
observer('cat-names', console.log);
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
const register = require('hoki').register;
const observer = require('hoki').observer;
const dispatch = require('hoki').dispatch;

register('cat-names');

observer('cat-names', console.log);
// output in correct order:
// furguson
// mittens
// boots

observer('cat-names', console.log);
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
const events = require('hoki').events;

console.log(events());
// [ 'cat-names' ]
```

Unregister
```js
const events = require('hoki').events;
const unregister = require('hoki').unregister;

unregister('cat-names');
console.log(events());
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
