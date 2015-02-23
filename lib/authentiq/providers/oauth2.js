import Base from './base';

var requiredOverrideError = new Error('You must override this property in your own provider');

class OAuth2 extends Base {
  constructor(){
    this.optionalUrlParams = ['scope'];
    this.requiredUrlParams = ['response_type', 'client_id', 'redirect_uri'];
  }

  /**
   * The parameters that must be included as query params in the 3rd-party
   * provider's url that we build.
   *
   * These properties are in the format that should be in the URL (i.e.,
   * usually underscored), but they are looked up as camelCased properties
   * on the instance of this provider. For example, if the 'client_id' is
   * a required url param, when building the URL we look up the value of
   * the 'clientId' (camel-cased) property and put it in the URL as
   * 'client_id=' + this.get('clientId')
   * Subclasses can add additional required url params.
   *
   * @property {array} requiredUrlParams
   */
  set requiredUrlParams(...additionalParams) {
    this._requiredUrlParams = this._requiredUrlParams || [];
    this._requiredUrlParams.concat(additionalParams);
  }

  get requiredUrlParams(){
    return this._requiredUrlParams;
  }

  /**
   * Parameters that may be included in the 3rd-party provider's url that we build.
   * Subclasses can add additional optional url params.
   *
   * @property {array} optionalUrlParams
   */
  set optionalUrlParams(...additionalParams) {
    this._optionalUrlParams = this._optionalUrlParams || [];
    this._optionalUrlParams.concat(additionalParams);
  }

  get optionalUrlParams(){
    return this._optionalUrlParams;
  }

  /**
   * The base url for the 3rd-party provider's OAuth2 flow
   * (example: 'https://github.com/login/oauth/authorize')
   *
   * @property {string} baseUrl
   */
  get baseUrl(){
    throw requiredOverrideError;
  }

  /**
   * The apiKey (sometimes called app id) that identifies the registered application at the 3rd-party provider
   *
   * @property {string} apiKey
   */
  // apiKey:       configurable('apiKey'),

  // scope:        configurable('scope', null),
  // clientId:     Ember.computed.alias('apiKey'),
}

export default OAuth2;
