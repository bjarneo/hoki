'use strict';

const isString = str => typeof str === 'string';
const isFunc = func => typeof func === 'function';
const isArray = Array.isArray;

// Holds all the events and callbacks
// {
//    eventName: [() => {}]
// }
const eventStore = {};

// Error handling
function handleRegisterType(type) {
    if (!isString(type) && !isArray(type)) {
        throw new TypeError(
            'Event must be a string(event) or array of strings(events)'
        );
    }
}

// If the event is a string put it in an array and return
const evtStrToArr = event => isArray(event) ? event : [event];

// Register event(s)
function register(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(e => {
        if (!eventStore[e]) {
            eventStore[e] = [];
        }
    });
}

// Unregister event(s)
function unregister(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(e => {
        if (eventStore[e]) {
            delete eventStore[e];
        }
    });
}

// Observe for events => fire a callback if we hit that event
function observer(event, callback) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!isFunc(callback)) {
        throw new TypeError('Callback must be a function');
    }

    if (eventStore[event]) {
        eventStore[event].push(callback);
    }
}

// Dispatch events
function dispatcher(event, data) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }
    
    // call every callback in event list
    if (eventStore[event]) {
        eventStore[event].forEach(cb => cb(data));
    }
}

// Return events available
const events = () => Object.keys(eventStore);

module.exports = {
    register,
    unregister,
    dispatcher,
    observer,
    events
}
