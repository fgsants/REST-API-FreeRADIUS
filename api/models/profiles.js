'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  "profile-name": {
    type:String,
    Required: 'Inform Profile name'
  }, 
  "MaxDownload": {
    type:Number,
    Required: 'Inform Max Download Speed'
  },
  "MaxUpload":  {
    type:Number,
    Required: 'Inform Max Upload Speed'
  },
  "AccessPeriod": {
    type:Number,
  }
}, {toJSON: { virtuals: false }});

module.exports = mongoose.model('Profiles', ProfileSchema);