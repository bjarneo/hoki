'use strict';

const is = Object.prototype.toString;

const isString = str => is.call(str) === '[object String]';
const isFunc = func => is.call(func) === '[object Function]';
const isArray = Array.isArray;

// Holds all the events and callbacks
// {
//    eventName: [function() {}]
// }
const events = {};

// Error handling
function handleRegisterType(type) {
    if (!isString(type) && !isArray(type)) {
        throw new TypeError('Event must be a string(event) or array of strings(events)');
    }
}

// If the event is a string put it in an array and return
function evtStrToArr(event) {
    if (isArray(event)) {
        return event;
    }

    event = [event];

    return event;
}

// Register event(s)
function register(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(e => {
        if (events[e]) {
            return;
        }

        events[e] = [];
    });
}

// Unregister event(s)
function unregister(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(e => {
        if (!events[e]) {
            return;
        }

        delete events[e];
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

    if (!events[event]) {
        return;
    }

    events[event].push(callback);
}

// Dispatch events with or without data
function dispatcher(event, data) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!events[event]) {
        return;
    }

    events[event].forEach(callback => (data ? callback(data) : callback()));
}

// Return every event available
const list = () => Object.keys(events);

module.exports = {
    register: register,
    unregister: unregister,
    dispatcher: dispatcher,
    observer: observer,
    events: list
};
