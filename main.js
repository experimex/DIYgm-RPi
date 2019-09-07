var bleno = require('bleno');
var fs = require('fs');

var BlenoPrimaryService = bleno.PrimaryService;

var EchoCharacteristic = require('./characteristic');

var name = "";

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    name = fs.readFileSync("name.txt").toString();
    bleno.startAdvertising(name, ['e3754285-8072-458b-a45b-94a0dab368ef']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  if (!error) {
    console.log("iOS server - started advertising as " + name);
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'e3754285-8072-458b-a45b-94a0dab368ef',
        characteristics: [
          new EchoCharacteristic()
        ]
      })
    ]);
  }
  else {
    console.log("error: " + error);
  };
});
