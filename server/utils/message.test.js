var {generateMessage} = require('./message.js');
var expect = require('expect');

describe('generateMessage',() => {
	it('it should generateMessage',() => {
		var from = 'ananya';
		var text = 'some message';
		var message = generateMessage(from,text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
