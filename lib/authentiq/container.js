var invariant = require('invariant');

var _providers = {};

/**
 * A container to register providers with.
 *
 * @type {Object}
 */
var container = {
  lookup: function(providerName){
    invariant(!!_providers[providerName.toString()],
        "Provider (%s) is not registered. Options are: %s", providerName, Object.keys(_providers).join(', '));
    return _providers[providerName];
  },

  /**
   * Register a new provider to the global registry.
   *
   * @param  {Provider} provider
   */
  register: function(provider) {
    if (provider.name) {
      invariant(typeof(_providers[provider.name]) === 'undefined',
        "Provider (%s) is already defined", provider.name);
      _providers[provider.name.toString()] = provider;
    }else{
      throw new Error(`Provider did not include a name`);
    }
  },
}

export default container;
