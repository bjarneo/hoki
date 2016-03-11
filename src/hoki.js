const isString = require('lodash.isstring');
const isFunc = require('lodash.isfunction');

const events = {};

function dispatch(event, data) {
    if (!isString(event)) {
        throw new TypeError('Event must be a string');
    }

    if (!events.hasOwnProperty(event)) {
        return null;
    }

    events[event].forEach((callback) => callback.call(null, data));
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

module.exports = {
    dispatch: dispatch,
    observer: observer
};
