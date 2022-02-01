const DeviceController = require('./controllers/bluepex_suite/device');
const DeviceTypeController = require('./controllers/bluepex_suite/device_type');

DeviceTypeController.getAll().then(data => {
//console.log(data);
});

DeviceController.getAll().then(async (data) => {
  console.log(data[0]);
});



