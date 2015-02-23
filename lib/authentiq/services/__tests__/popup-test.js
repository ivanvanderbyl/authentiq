jest.autoMockOff();

require('babel-core/polyfill');
import PopupService from '../popup';

describe('Popup', function() {
  var popup;
  var originalWindowOpen = window.open;

  beforeEach(function () {
    popup = new PopupService();
    window.name = 'original-window-name';
  });

  afterEach(function() {
    window.open = originalWindowOpen;
  });

  it('open resolves based on popup window', function () {
    var didOpen = false, data = null;
    var mockOpen = jest.genMockFn();
    window.open = mockOpen;

    var expectedUrl = 'http://authServer',
      expectedData = "__torii_message:http://someurl.com?code=fr";

    runs(function() {
      popup.open(expectedUrl, ['code']).then(function(d){
        didOpen = true;
        data = d;
      }, function(reason) {
        console.trace(reason);
      });
    });

    waitsFor(function() { return didOpen }, 150, 'popup window to open');

    runs(function() {
      expect(mockOpen).toBeCalled();
      expect(mockOpen.calls[0][0]).toEqual(expectedUrl);
      expect(window.name).toEqual('torii-opener');

      expect(window.name).toEqual('original-window-name');
      expect(data).toEqual({code: 'fr'});
    })
  });
})
