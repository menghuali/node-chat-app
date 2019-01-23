const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate message', () => {
    var from = 'Mike';
    var text = 'Hello';
    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createAt).toBe('number');
  });
});
