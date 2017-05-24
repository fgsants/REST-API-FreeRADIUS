'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountingSchema = new Schema({
  "User-Name": {
    type:String,
  },
  "NAS-IP-Address": {
    type:String,
   },
  "NAS-Port": {
    type:String,
   },
  "Framed-IP-Address": {
    type:String,
   },
  "Called-Station-Id": {
    type:String,
   },
  "NAS-Identifier": {
    type:String,
   },
  "Acct-Status-Type": {
    type:String,
   },
  "Acct-Session-Id": {
    type:String,
   },
  "Event-Timestamp": {
    type:Date,
   },
  "WISPr-Location-ID": {
    type:String,
   },
  "WISPr-Location-Name":  {
    type:String,
   },
  "Acct-Unique-Session-Id": {
    type:String,
  },
});

module.exports = mongoose.model('Accounting', AccountingSchema);