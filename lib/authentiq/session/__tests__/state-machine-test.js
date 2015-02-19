jest.autoMockOff();

import stateMachineCreator from '../state-machine';

describe('Session StateMachine', function() {
  var sessionState;

  beforeEach(function () {
    sessionState = stateMachineCreator();
  });

  describe('initial state', function() {
    it('started as unauthenticated', function () {
      expect(sessionState.currentStateName).toEqual('unauthenticated');
      expect(sessionState.state.errorMessage).toBeNull();
      expect(sessionState.state.isAuthenticated).toBe(false);
    });
  })
});
