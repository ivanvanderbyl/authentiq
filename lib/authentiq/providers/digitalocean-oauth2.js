import Promise from 'bluebird';
import Provider from '../provider';
import Authentiq from '../../authentiq';
import container from '../container';
import OAuth2 from './oauth2';

class DigitalOceanOAuth2 extends OAuth2 {
  constructor(){
    super();
    this.scope = ['read', 'write', 'support'];
    this.appId = 'DIGITALOCEAN-APP-ID';

    this.requiredUrlParams = ['origin', 'state'];
  }

  open(){
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  fetch(){
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  close(){
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
}

/**
 * Automatically register the adapter with Authentiq
 */
container.register(DigitalOceanOAuth2);

export default DigitalOceanOAuth2;
