const assert = require('assert');
const hoki = require('../src/hoki');
const dispatch = hoki.dispatch;
const observe = hoki.observer;
const getEvents = hoki.getEvents;
const clear = hoki.clear;

describe('hoki', () => {
    it('should observe for an event and fetch it when dispatched', (done) => {
        observe('my-event', (data) => {
            assert('data yo' === data.msg);

            done();
        });

        dispatch('my-event', { msg: 'data yo' });
    });

    it('should be able to observe for the same event in multiple observers', (done) => {
        observe('my-second-event', (data) => {
            assert('data yo' === data.msg);
        });

        observe('my-second-event', (data) => {
            assert('data yo' === data.msg);
        });

        observe('my-second-event', (data) => {
            assert('data yo' === data.msg);

            done();
        });

        dispatch('my-second-event', { msg: 'data yo' });
    });

    it('should throw TypeError exception if the callback is not a function', () => {
        assert.throws(() => observe('my-event', 'im not a function') === /Callback must be a function/);
    });

    it('should throw TypeError exception if the event is not a string', () => {
        assert.throws(() => observe(() => {}) === /Event must be a string/);

        assert.throws(() => dispatch(() => {}) === /Event must be a string/);
    });

    it('should return null if there is no event', () => {
        assert(dispatch('event') === null);
    });

    it('should fire and empty callback if no data is sent by the dispatcher', (done) => {
        observe('empty-event', () => {
            assert(true);

            done();
        });

        dispatch('empty-event');
    });

    it('should return an array of all events available', () => {
        const e = ['my-event', 'my-second-event', 'empty-event'];

        e.map(event => assert(getEvents().indexOf(event) > -1));

        assert(getEvents().length === 3);
    });

    it('should clear provided evenet', () => {
        const e = ['my-second-event', 'empty-event'];

        clear('my-event');

        e.map(event => assert(getEvents().indexOf(event) > -1));

        assert(getEvents().length === 2);
    });

    it('should clear all events', () => {
        clear();

        assert(getEvents().length === 0);
    });
});
