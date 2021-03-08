// MongoDB initials

const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Exercise', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

exports.store = async (element) => {
    await element.save();
}