import Promise from 'bluebird';
import container from './authentiq/container';
var invariant = require('invariant');

import DigitalOceanOAuth2 from './authentiq/providers/digitalocean-oauth2';

class Authentiq {
  /**
   * Construct a new Authentiq instance with a given provider.
   *
   * @param  {String} providerName
   */
  constructor(providerName) {
    var provider = container.lookup(providerName);
    this.provider = new provider;
  }

  open(args) {
    this._proxyToProvider('open', true, args);
  }

  fetch(args){
    this._proxyToProvider('fetch', false, args);
  }

  close(args) {
    this._proxyToProvider('close', false, args);
  }

  _proxyToProvider(methodName, requireMethod = false, ...args) {
    if (!this.provider[methodName]) {
      invariant(!this.provider[methodName] && requireMethod, "Expected provider '%s' to define the '%s' method.", this.provider.name, methodName);
      return Promise.resolve({});
    }

    return Promise.resolve( this.provider[methodName](...args) );
  }
}

export default Authentiq;
