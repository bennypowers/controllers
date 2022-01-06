import { defineCE, expect, fixture } from '@open-wc/testing';
import { ReactiveElement } from 'lit';
import { ReducerController } from './reducer.js';

describe('ReducerController', function() {
  describe('with a counter reducer', function() {
    type CountAction = { type: 'reset'|'increment'|'decrement' };

    class Host extends ReactiveElement {
      public count = new ReducerController(this, function reducer(state, action: CountAction) {
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

    let host: Host;

    beforeEach(async function() {
      const tag = defineCE(class extends Host {});
      host = await fixture(`<${tag}></${tag}>`);
      await host.updateComplete;
    });

    it('updates with state', () => expect(host.count.state).to.equal(0));

    describe('dispatching increment', function() {
      beforeEach(() => host.count.dispatch({ type: 'increment' }));
      it('increments count', () => {
        expect(host.count.state).to.equal(1);
      });
      describe('then dispatching reset', function() {
        beforeEach(() => host.count.dispatch({ type: 'reset' }));
        it('resets count', function() {
          expect(host.count.state).to.equal(0);
        });
      });
    });
    describe('dispatching decrement', function() {
      beforeEach(() => host.count.dispatch({ type: 'decrement' }));
      it('decrements count', function() {
        expect(host.count.state).to.equal(-1);
      });
    });
  });
});
