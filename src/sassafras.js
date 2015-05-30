'use strict';

var fs = require('fs');
var IncludedMixin = require('./types/includedMixin');
var StandaloneMixin = require('./types/standaloneMixin');
var Func = require('./types/func');

var Sassafras = {
  file: null,

  setFile: function(filename) {
    this.filename = filename;
    this.file = fs.readFileSync(filename).toString();
  },

  assert: {
    includedMixin: function(call) {
      return new IncludedMixin(Sassafras.file, call);
    },

    standaloneMixin: function(call) {
      return new StandaloneMixin(Sassafras.file, call);
    },

    func: function(call) {
      return new Func(Sassafras.file, call);
    }
  }
};

module.exports = Sassafras;
