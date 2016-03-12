const isString = require('lodash.isstring');
const isFunc = require('lodash.isfunction');
const isArray = require('lodash.isarray');

var eventContainer = {};

function handleRegisterType(type) {
    if (!isString(type) && !isArray(type)) {
        throw new TypeError('Event must be a string(event) or array of strings(events)');
    }
}

function register(event) {
    handleRegisterType(event);

    if (isString(event)) {
        event = [event];
    }

    event.forEach((e) => {
        if (eventContainer.hasOwnProperty(e)) {
            return null;
        }

        eventContainer[e] = [];
    });
}

function unregister(event) {
    handleRegisterType(event);

    if (isString(event)) {
        event = [event];
    }

    event.forEach((e) => {
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

    eventContainer[event].forEach((callback) => data ? callback(data) : callback());
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
