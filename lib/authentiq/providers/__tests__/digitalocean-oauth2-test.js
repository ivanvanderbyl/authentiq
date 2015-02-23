jest.autoMockOff();

import DigitalOceanProvider from '../digitalocean-oauth2';

describe('DigitalOcean OAuth2 Provider', function() {
  xit('can set additional required params', function () {
    var provider = new DigitalOceanProvider;
    expect(provider.requiredUrlParams).toEqual(['response_type','client_id','redirect_uri', 'origin','state']);
  });

  xit('can set additional optional params', function () {
    var provider = new DigitalOceanProvider;
    expect(provider.optionalUrlParams).toEqual(['state']);
  });

  xit('can get base url', function () {
    var provider = new DigitalOceanProvider;
    expect(function(){ provider.baseUrl }).toThrow(new Error("You must override this property in your own provider"));
  });


})
