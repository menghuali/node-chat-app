const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate message', () => {
    var from = 'Mike';
    var text = 'Hello';
    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate location message', () => {
    var from = 'Mike';
    var latitude = '1234';
    var longitude = '5678';
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message).toMatchObject({from, url});
    expect(typeof message.createdAt).toBe('number');
  });
});
