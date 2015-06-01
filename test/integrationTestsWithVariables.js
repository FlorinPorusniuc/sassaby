'use strict';

var sassaby = require('../src/sassaby');
var assert = sassaby.assert;

describe('sample-with-variables.scss', function() {
  sassaby.setFile(__dirname + '/fixtures/sample-with-variables.scss');
  sassaby.setVariables({
    'grid-columns': 12
  });

  describe('make-offset', function() {
    var mixin = assert.standaloneMixin("make-offset(md, 6)");

    it('should return 1 declarations', function() {
      mixin.hasNumDeclarations(1);
    });

    it('should create the correct class', function() {
      mixin.createsSelector(".col-md-offset-6");
    });

    it('should have a webkit prefixed declaration', function() {
      mixin.declares("margin-left", "50%");
    });
  });
});
