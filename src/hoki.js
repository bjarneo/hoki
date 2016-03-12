const isString = require('lodash.isstring');
const isFunc = require('lodash.isfunction');

var events = {};

function dispatch(event, data) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!events.hasOwnProperty(event)) {
        return null;
    }

    if (!data) {
        data = '';
    }

    events[event].forEach((callback) => data ? callback(data) : callback());
}

function observer(event, callback) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!isFunc(callback)) {
        throw new TypeError('Callback must be a function');
    }

    if (events.hasOwnProperty(event)) {
        events[event].push(callback);
    } else {
        events[event] = [callback];
    }
}

function getEvents() {
    return Object.keys(events);
}

function clear(event) {
    if (!event) {
        events = {};
    }

    delete events[event];
}

module.exports = {
    dispatch: dispatch,
    observer: observer,
    getEvents: getEvents,
    clear: clear
};
