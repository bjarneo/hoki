const assert = require('assert');
const hoki = require('../src/hoki');
const dispatch = hoki.dispatch;
const observe = hoki.observer;

describe('hoki', () => {
    it('should observe for an event and fetch it when dispatched', (done) => {
        observe('my-event', (data) => {
            assert('data yo', data.msg);

            done();
        });

        dispatch('my-event', { msg: 'data yo' });
    });

    it('should be able to observe for the same event in multiple observers', (done) => {
        observe('my-second-event', (data) => {
            assert('data yo', data.msg);
        });

        observe('my-second-event', (data) => {
            assert('data yo', data.msg);
        });

        observe('my-second-event', (data) => {
            assert('data yo', data.msg);

            done();
        });

        dispatch('my-second-event', { msg: 'data yo' });
    });

    it('should throw TypeError exception if the callback is not a function', () => {
        assert.throws(() => observe('my-event', 'im not a function'), /Callback must be a function/);
    });

    it('should throw TypeError exception if the event is not a string', () => {
        assert.throws(() => observe(() => {}), /Event must be a string/);

        assert.throws(() => dispatch(() => {}), /Event must be a string/);
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
});
