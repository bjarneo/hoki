const assert = require('assert');
const hoki = require('../index');
const register = hoki.register;
const unregister = hoki.unregister;
const observe = hoki.observer;
const dispatch = hoki.dispatcher;
const events = hoki.events;

describe('hoki', () => {
    it('should register an event', () => {
        register('my-event');

        assert(events()[0] === 'my-event');
        assert(events().length === 1);

        unregister('my-event');
    });

    it('should be able to register multiple events', () => {
        register(['my-second-event', 'empty-event']);

        assert(events()[0] === 'my-second-event');
        assert(events()[1] === 'empty-event');
        assert(events().length === 2);

        unregister(['my-second-event', 'empty-event']);
    });

    it('should observe for an event and fetch it when dispatched', (done) => {
        register('my-event');

        observe('my-event', (data) => {
            assert('data yo' === data.msg);

            unregister('my-event');

            done();
        });

        dispatch('my-event', { msg: 'data yo' });
    });

    it('should support dispatched functions', (done) => {
        register('my-custom-event-data');

        observe('my-custom-event-data', (func) => {
            assert('data yo' === func());

            unregister('my-custom-event-data');

            done();
        });

        dispatch('my-custom-event-data', () => 'data yo');
    });

    it('should support dispatched strings', (done) => {
        register('my-custom-event-data');

        observe('my-custom-event-data', (str) => {
            assert('data yo' === str);

            unregister('my-custom-event-data');

            done();
        });

        dispatch('my-custom-event-data', 'data yo');
    });

    it('should support dispatched numbers', (done) => {
        register('my-custom-event-data');

        observe('my-custom-event-data', (n) => {
            assert(1337 === n);

            unregister('my-custom-event-data');

            done();
        });

        dispatch('my-custom-event-data', 1337);
    });

    it('should support dispatched objects', (done) => {
        register('my-custom-event-data');

        observe('my-custom-event-data', (o) => {
            assert(typeof o === 'object');

            unregister('my-custom-event-data');

            done();
        });

        dispatch('my-custom-event-data', {});
    });

    it('should be able to observe for the same event in multiple observers', (done) => {
        register('my-event');

        observe('my-event', (data) => {
            assert('data yo' === data.msg);
        });

        observe('my-event', (data) => {
            assert('data yo' === data.msg);
        });

        observe('my-event', (data) => {
            assert('data yo' === data.msg);

            unregister('my-event');

            done();
        });

        dispatch('my-event', { msg: 'data yo' });

    });

    it('should throw TypeError exception if the callback is not a function', () => {
        assert.throws(() => observe('my-event', 'im not a function') === /Callback must be a function/);
    });

    it('should throw TypeError exception if the event is not a string', () => {
        assert.throws(() => observe(() => {}) === /Event must be a string/);

        assert.throws(() => dispatch(() => {}) === /Event must be a string/);
    });

    it('should return false if there is no event', () => {
        assert(!dispatch('event'));
    });

    it('should fire and empty callback if no data is sent by the dispatcher', (done) => {
        register('empty-event');

        observe('empty-event', () => {
            assert(true);

            unregister('empty-event');

            done();
        });

        dispatch('empty-event');
    });

    it('should return an array of all events available', () => {
        const e = ['my-event', 'my-second-event', 'empty-event'];

        register(e);

        e.map(event => assert(events().indexOf(event) > -1));

        assert(events().length === 3);

        unregister(e);
    });

    it('should unregister provided event', () => {
        const e = ['my-second-event'];

        register(e);

        unregister('empty-event');

        e.map(event => assert(events().indexOf(event) > -1));

        assert(events().length === 1);

        unregister('my-second-event');
    });

    it('should unregister provided events', () => {
        register(['my-second-event', 'empty-event']);

        assert(events().length === 2);

        unregister(['my-second-event', 'empty-event']);

        assert(events().length === 0);
    });
});
