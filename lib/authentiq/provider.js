class Provider {
  /**
  * The name of the provider
  * @property {string} name
  */

  constructor(){
    this.responseType = 'code'
    this.appId = null
    this.clientID = null
  }

  get config(){
    return this.config;
  }

  set config(newConfig){
    return this.config = newConfig;
  }

  // get name(){
  //   return this.name;
  // }
}
export default Provider;
