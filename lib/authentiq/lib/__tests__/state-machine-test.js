jest.autoMockOff();

import StateMachine from '../state-machine';

describe('StateMachine', function() {
  describe('transitions', function() {
    var sm;

    beforeEach(function () {
      sm = new StateMachine({
        initialState: 'initial',
        states: {
          initial: {
            foo: 'bar'
          },
          started: {
            baz: 'blah',
            foo: 'something new'
          }
        }
      });
    });

    it('starts in initial state', function () {
      expect(sm.currentStateName).toEqual('initial');
      expect(sm.state.foo).toEqual('bar');
      expect(sm.state.baz).toBeUndefined;
    });

    it('transitions to started', function () {
      sm.transitionTo('started');
      expect(sm.currentStateName).toEqual('started');
      expect(sm.state.foo).toEqual('something new');
      expect(sm.state.baz).toEqual('blah');
    });
  })
})
