import { defineCE, expect, fixture } from '@open-wc/testing';
import { ReactiveElement } from 'lit';
import { ReducerController } from './reducer.js';

describe('ReducerController', function() {
  describe('with a counter reducer', function() {
    class Host extends ReactiveElement {
      public count = new ReducerController(this, function reducer(state, action) {
        switch (action.type) {
          case 'reset':
            return 0;
          case 'increment':
            return state + 1;
          case 'decrement':
            return state - 1;
        }
      }, 0);
    }

    let host; Host;

    beforeEach(async function() {
      const tag = defineCE(class extends Host {});
      host = await fixture(`<${tag}></${tag}>`);
      await host.updateComplete;
    });

    it('updates with state', async function() {
      expect(host.count.state).to.equal(0);
    });

    describe('dispatching increment', function() {
      beforeEach(async function() {
        host.count.dispatch({ type: 'increment' });
        await host.updateComplete;
      });
      it('increments count', function() {
        expect(host.count.state).to.equal(1);
      });
    });
    describe('dispatching decrement', function() {
      beforeEach(async function() {
        host.count.dispatch({ type: 'decrement' });
        await host.updateComplete;
      });
      it('decrements count', function() {
        expect(host.count.state).to.equal(-1);
      });
    });
  });
});
