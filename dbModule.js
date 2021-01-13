const app = require('./app');
const mongoose = require('mongoose');
const dBAddress = app.dBAddress;
mongoose.connect(/*dBAddress*/ 'mongodb://localhost/Exercise', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});



exports.store = (element) => {
    element.save();
}