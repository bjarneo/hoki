var isString = require('lodash.isstring');
var isFunc = require('lodash.isfunction');
var isArray = require('lodash.isarray');

var eventContainer = {};

function handleRegisterType(type) {
    if (!isString(type) && !isArray(type)) {
        throw new TypeError('Event must be a string(event) or array of strings(events)');
    }
}

function evtStrToArr(event) {
    if (!isString(event)) {
        return event;
    }

    return event = [event];
}

function register(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(function(e) {
        if (eventContainer.hasOwnProperty(e)) {
            return null;
        }

        eventContainer[e] = [];
    });
}

function unregister(event) {
    handleRegisterType(event);

    evtStrToArr(event).forEach(function(e) {
        if (!eventContainer.hasOwnProperty(e)) {
            return null;
        }

        delete eventContainer[e];
    });
}

function observer(event, callback) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!isFunc(callback)) {
        throw new TypeError('Callback must be a function');
    }

    if (!eventContainer.hasOwnProperty(event)) {
        return null;
    }

    eventContainer[event].push(callback);
}

function dispatch(event, data) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!eventContainer.hasOwnProperty(event)) {
        return null;
    }

    if (!data) {
        data = '';
    }

    eventContainer[event].forEach(function(callback) {
        return data ? callback(data) : callback() ;
    });
}

function events() {
    return Object.keys(eventContainer);
}

module.exports = {
    register: register,
    unregister: unregister,
    dispatch: dispatch,
    observer: observer,
    events: events
};
