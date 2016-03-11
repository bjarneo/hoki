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
```js
const observe = require('hoki').observer;
const dispatch = require('hoki').dispatch;

observe(string, function);
dispatch(string, function/object/string/number/etc);
```

```js
// Example
const observe = require('hoki').observer;
const dispatch = require('hoki').dispatch;

// You always need to specify the observer first so we can observe for events
observe('cat-names', (name) => {
    console.log(name);
    // output in correct order:
    // furguson
    // mittens
    // boots
});

dispatch('cat-names', 'furguson');
dispatch('cat-names', 'mittens');
dispatch('cat-names', 'boots');
```

```js
// You can also add multiple observers for the same event
const observe = require('hoki').observer;
const dispatch = require('hoki').dispatch;

// You always need to specify the observer first so we can observe for events
observe('cat-names', (name) => {
    console.log(name);
    // output in correct order:
    // furguson
    // mittens
    // boots
});

observe('cat-names', (name) => {
    console.log(name);
    // output in correct order:
    // furguson
    // mittens
    // boots
});

dispatch('cat-names', 'furguson');
dispatch('cat-names', 'mittens');
dispatch('cat-names', 'boots');
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
