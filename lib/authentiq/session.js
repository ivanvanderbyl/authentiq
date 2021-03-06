import Promise from 'bluebird';
import createStateMachine from './session/state-machine';

class Session {
  constructor(authentiq){
    this.authentiq = authentiq;
    this.state = null;
    this.stateMachine = createStateMachine(this);
  }

  /**
   * Open a new session, by requesting a session from the provider, and fetching
   * a new user from the adapter.
   *
   * @param  {Object} options
   *
   * @return {Promise}
   */
  open(options = {}){
    var sm = this.stateMachine,
        authentiq = this.authentiq;

    return new Promise(function(resolve, reject) {
      sm.send('startOpen');
      resolve();
    }).then(function() {
      return authentiq.open(options);
    }).then(function(authorization){
      // TODO(ivanvanderbyl): Send this to an adapter and get the user
      authentiq.authorization = authorization;
      return Promise.resolve(authorization);
    }).then(function(user){
      sm.send('finishOpen', user);
      return user;
    }).catch(function(error){
      sm.send('failOpen', error);
      return Promise.reject(error);
    });
  }

  fetch(options = {}){

  }

  close(options = {}){

  }
}

export default Session;
