const register = require('hoki').register;
const observer = require('hoki').observer;
const dispatch = require('hoki').dispatcher;

// Register your event
register('cat-names');

// Observe for an event
observe('cat-names', console.log);

// Dispatch events with data
dispatch('cat-names', 'furguson');
dispatch('cat-names', 'mittens');
dispatch('cat-names', 'boots');
