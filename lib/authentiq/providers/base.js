class Base {
  open(){
    return Promise.reject(new Error('You must override the "open" method on your provider'));
  }

  fetch(){
    return Promise.reject(new Error('You must override the "fetch" method on your provider'));
  }

  close(){
    return Promise.reject(new Error('You must override the "close" method on your provider'));
  }
}
export default Base;
