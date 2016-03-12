const assert = require('assert');
const hoki = require('../src/hoki');
const register = hoki.register;
const unregister = hoki.unregister;
const observer = hoki.observer;
const dispatch = hoki.dispatch;
const events = hoki.events;

describe('hoki', () => {
    it('should register an event', () => {
        register('my-event');

        assert(events()[0] === 'my-event');
        assert(events().length === 1);
    });

    it('should be able to register multiple events', () => {
        register(['my-second-event', 'empty-event']);

        assert(events()[1] === 'my-second-event');
        assert(events()[2] === 'empty-event');
        assert(events().length === 3);
    });

    it('should observe for an event and fetch it when dispatched', (done) => {
        observer('my-event', (data) => {
            assert('data yo' === data.msg);

            done();
        });

        dispatch('my-event', { msg: 'data yo' });
    });

    it('should be able to observe for the same event in multiple observers', (done) => {
        observer('my-second-event', (data) => {
            assert('data yo' === data.msg);
        });

        observer('my-second-event', (data) => {
            assert('data yo' === data.msg);
        });

        observer('my-second-event', (data) => {
            assert('data yo' === data.msg);

            done();
        });

        dispatch('my-second-event', { msg: 'data yo' });
    });

    it('should throw TypeError exception if the callback is not a function', () => {
        assert.throws(() => observer('my-event', 'im not a function') === /Callback must be a function/);
    });

    it('should throw TypeError exception if the event is not a string', () => {
        assert.throws(() => observer(() => {}) === /Event must be a string/);

        assert.throws(() => dispatch(() => {}) === /Event must be a string/);
    });

    it('should return false if there is no event', () => {
        assert(!dispatch('event'));
    });

    it('should fire and empty callback if no data is sent by the dispatcher', (done) => {
        observer('empty-event', () => {
            assert(true);

            done();
        });

        dispatch('empty-event');
    });

    it('should return an array of all events available', () => {
        const e = ['my-event', 'my-second-event', 'empty-event'];

        e.map(event => assert(events().indexOf(event) > -1));

        assert(events().length === 3);
    });

    it('should unregister provided event', () => {
        const e = ['my-second-event', 'empty-event'];

        unregister('my-event');

        e.map(event => assert(events().indexOf(event) > -1));

        assert(events().length === 2);
    });

    it('should unregister provided events', () => {
        unregister(['my-second-event', 'empty-event']);

        assert(events().length === 0);
    });
});
