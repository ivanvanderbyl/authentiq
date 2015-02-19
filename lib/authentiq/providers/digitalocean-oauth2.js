import Provider from '../provider';
import Authentiq from '../../authentiq';

class DigitalOceanOAuth2 extends Provider {
  open(){
    console.log("OPEN")
  }
}

Authentiq.registerProvider(DigitalOceanOAuth2);

export default DigitalOceanOAuth2;
