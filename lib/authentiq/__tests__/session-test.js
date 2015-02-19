jest.autoMockOff();

import Promise from 'bluebird';
import Session from '../session';

var mockAuthentiq = jest.genMockFromModule('../../authentiq');

function mockOpenWithSuccess() {
  mockAuthentiq.open = jest.genMockFunction().mockImplementation(function() {
    return Promise.resolve({ name: "Ivan" });
  });
}

function mockOpenWithFailure() {
  mockAuthentiq.open = jest.genMockFunction().mockImplementation(function() {
    return Promise.reject(new Error('Invalid authentication redirect'));
  });
}

describe('Authentiq Session', function() {
  describe('open', function() {
    var session;
    var completed;

    beforeEach(function () {
      session = new Session(mockAuthentiq);
      completed = false;
    });

    it('requests a new session from the provider', function () {
      mockOpenWithSuccess();
      var authorization = null;

      runs(function() {
        var auth = session.open();
        auth.then(function(user) {
          authorization = user;
          completed = true;
        });
      });

      waitsFor(function() {
        return !!completed;
      }, 'session to authenticate', 100);

      runs(function() {
        expect(authorization).toEqual({ name: 'Ivan' })
      })
    });

    it('returns a rejection if the provider fails', function () {
      mockOpenWithFailure();
      var result = null;

      runs(function() {
        var auth = session.open();
        auth.then(null, function(err) {
          result = err;
          completed = true;
        });
      });

      waitsFor(function() {
        return !!completed;
      }, 'session to authenticate', 100);

      runs(function() {
        expect(result.message).toEqual('Invalid authentication redirect')
      })
    });
  });
})
