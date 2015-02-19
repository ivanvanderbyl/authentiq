jest.autoMockOff();

import Authentiq from '../authentiq';
import DigitalOceanProvider from '../authentiq/providers/digitalocean-oauth2';

describe('Authentiq', function() {
  it('can be constructed with a provider string', function () {
    var authentiq = new Authentiq('DigitalOceanOAuth2');
    expect(authentiq.provider.constructor).toBe(DigitalOceanProvider);
  });

  describe('method proxies', function() {
    var authentiq;
    beforeEach(function () {
      authentiq = new Authentiq('DigitalOceanOAuth2');
      authentiq.provider.open = jest.genMockFn();
      authentiq.provider.fetch = jest.genMockFn();
      authentiq.provider.close = jest.genMockFn();
    });

    it('proxies open to the provider', function () {
      authentiq.open()
      expect(authentiq.provider.open).toBeCalled();
    });

    it('proxies fetch to the provider', function () {
      authentiq.fetch()
      expect(authentiq.provider.fetch).toBeCalled();
    });

    it('proxies close to the provider', function () {
      authentiq.close()
      expect(authentiq.provider.close).toBeCalled();
    });
  });
});
