import Promise from 'bluebird';
var invariant = require('invariant');

var providers = {};

class Authentiq {
  /**
   * Construct a new Authentiq instance with a given provider.
   *
   * @param  {String} providerName
   */
  constructor(providerName) {
    invariant(!!providers[providerName], `Provider (${providerName}) is not registered`);
    this.provider = new providers[providerName];
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

/**
 * Register a new provider to the global registry.
 *
 * @param  {Provider} provider
 */
Authentiq.registerProvider = function(provider) {
  if (provider.name) {
    invariant(typeof(providers[provider.name]) === 'undefined',
      "Provider (%s) is already defined", provider.name);
    providers[provider.name] = provider;
  }
};

export default Authentiq;
