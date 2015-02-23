import Promise from 'bluebird';
import QueryStringParser from '../lib/query-string-parser';
import EventEmitter from '../lib/event-emitter';

var postMessageFixed;
var postMessageDomain = window.location.protocol+'//'+window.location.host;
var postMessagePrefix = "__authentiq_message:";
// in IE11 window.attachEvent was removed.
if (window.attachEvent) {
  postMessageFixed = function postMessageFixed(win, data) {
    win.postMessageWithFix(postMessagePrefix+data, postMessageDomain);
  };
  window.postMessageWithFix = function postMessageWithFix(data, domain) {
    setTimeout(function(){
      window.postMessage(data, domain);
    }, 0);
  };
} else {
  postMessageFixed = function postMessageFixed(win, data) {
    win.postMessage(postMessagePrefix+data, postMessageDomain);
  };
}

export {postMessageFixed};

function stringifyOptions(options){
  var optionsStrings = [];
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      var value;
      switch (options[key]) {
        case true:
          value = '1';
          break;
        case false:
          value = '0';
          break;
        default:
          value = options[key];
      }
      optionsStrings.push(
        key+"="+value
      );
    }
  }
  return optionsStrings.join(',');
}

function prepareOptions(options){
  var width = options.width || 500,
      height = options.height || 500;
  return Object.assign({
    left: ((screen.width / 2) - (width / 2)),
    top: ((screen.height / 2) - (height / 2)),
    width: width,
    height: height
  }, options);
}

function readAuthentiqMessage(message){
  if (message && typeof message === 'string' && message.indexOf(postMessagePrefix) === 0) {
    return message.slice(postMessagePrefix.length);
  }
}

export {readAuthentiqMessage};

function parseMessage(url, keys){
  var parser = new QueryStringParser(url, keys),
      data = parser.parse();
  return data;
}

class PopupService extends EventEmitter {

  constructor(){
    super();
    this.popup = null;
    this.once('didClose', this.stopPolling.bind(this));
  }

  // Open a popup window. Returns a promise that resolves or rejects
  // accoring to if the popup is redirected with arguments in the URL.
  //
  // For example, an OAuth2 request:
  //
  // popup.open('http://some-oauth.com', ['code']).then(function(data){
  //   // resolves with data.code, as from http://app.com?code=13124
  // });
  //
  open(url, keys, options){
    var service   = this,
        lastPopup = this.popup;

    var oldName = window.name;
    // Is checked by the popup to see if it was opened by Authentiq
    window.name = 'authentiq-opener';

    return new Promise(function(resolve, reject){
      if (lastPopup) {
        service.close();
      }

      var optionsString = stringifyOptions(prepareOptions(options || {}));
      service.popup = window.open(url, 'authentiq-auth', optionsString);

      if (service.popup && !service.popup.closed) {
        service.popup.focus();
      } else {
        reject(new Error(
          'Popup could not open or was closed'));
        return;
      }

      service.once('didClose', function(){
        reject(new Error(
          'Popup was closed or authorization was denied'));
      });

      window.addEventListener('message.authentiq', function(event){
        var message = event.originalEvent.data;
        var authentiqMessage = readAuthentiqMessage(message);
        if (authentiqMessage) {
          var data = parseMessage(authentiqMessage, keys);
          resolve(data);
        }
      });

      service.schedulePolling();

    }).finally(function(){
      // didClose will reject this same promise, but it has already resolved.
      service.close();
      window.name = oldName;
      window.removeEventListener('message.authentiq');
    });
  }

  close(){
    if (this.popup) {
      this.popup = null;
      this.emit('didClose');
    }
  }

  pollPopup(){
    if (!this.popup) {
      return;
    }
    if (this.popup.closed) {
      this.emit('didClose');
    }
  }

  schedulePolling(){
    this.polling = setTimeout(function(){
      this.pollPopup();
      this.schedulePolling();
    }.bind(this), 35);
  }

  stopPolling(){
    clearTimeout(this.polling);
  }
};

export default PopupService;
