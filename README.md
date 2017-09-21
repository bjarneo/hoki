hoki
======
![Travis](https://travis-ci.org/bjarneo/hoki.svg?branch=master)

Lightweight observer and dispatcher.

Should cover basic use cases.

No bloat.

Clean code.

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
const {register, unregister, observer, dispatcher, events} = require('hoki');

// Can register an event or array of events
register(string || []);

// Can unregister an event or array of events
unregister(string || []);

// Can observe for an event, and fire a callback if the event occurs
observe(string, function);

// Dispatch an event with data. Can also dispatch an empty event
dispatch(string, function/object/string/number/etc);

// List all events
events();
```

Example
```js
const {register, dispatcher, observer} = require('hoki');

// Register your event
register('cat-names');

// Observe for an event
observer('cat-names', name => {
    console.log(name);
});
// output in correct order:
// furguson
// mittens
// boots

dispatcher('cat-names', 'furguson');
dispatcher('cat-names', 'mittens');
dispatcher('cat-names', 'boots');
```

You can also add multiple observers for the same event
```js
const {register, observer, dispatcher} = require('hoki');

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

dispatcher('cat-names', 'furguson');
dispatcher('cat-names', 'mittens');
dispatcher('cat-names', 'boots');
```

Listen once?
```js
const {register, unregister, observer, dispatcher} = require('hoki');

register('listenOnce');

observer('listenOnce', data => {
    unregister('listenOnce');
    
    console.log(data);
});

dispatcher('listenOnce', 'should run only once');
dispatcher('listenOnce', 'should run only once');

```

List all events available
```js
const {events} = require('hoki');

console.log(events());
// [ 'cat-names' ]
```

Unregister
```js
const {events, unregister} = require('hoki');

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
