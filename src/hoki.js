'use strict';

var isString = require('lodash.isstring');
var isFunc = require('lodash.isfunction');
var isArray = require('lodash.isarray');

// Holds all the events and callbacks
// {
//    eventName: [function() {}]
// }
var eventContainer = {};

// Error handling
function handleRegisterType(type) {
    if (!isString(type) && !isArray(type)) {
        throw new TypeError('Event must be a string(event) or array of strings(events)');
    }
}

// If the event is a string put it in an array and return
function evtStrToArr(event) {
    if (!isString(event)) {
        return event;
    }

    event = [event];

    return event;
}

// Register event(s)
function register(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(function(e) {
        if (eventContainer.hasOwnProperty(e)) {
            return;
        }

        eventContainer[e] = [];
    });
}

// Unregister event(s)
function unregister(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(function(e) {
        if (!eventContainer.hasOwnProperty(e)) {
            return;
        }

        delete eventContainer[e];
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

    if (!eventContainer.hasOwnProperty(event)) {
        return;
    }

    eventContainer[event].push(callback);
}

// Dispatch events with or without data
function dispatcher(event, data) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!eventContainer.hasOwnProperty(event)) {
        return;
    }

    eventContainer[event].forEach(function(callback) {
        return data ? callback(data) : callback();
    });
}

// Return every event available
function events() {
    return Object.keys(eventContainer);
}

module.exports = {
    register: register,
    unregister: unregister,
    dispatcher: dispatcher,
    observer: observer,
    events: events
};
