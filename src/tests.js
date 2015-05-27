'use strict';

var sassafras = require('./sassafras');

describe('sample.scss', function() {
  sassafras.setFile('src/sample.scss');
  
  describe('#appearance', function() {
    it('should return 3 declarations', function() {
      sassafras.setCall(".test { @include appearance(button) }");
      sassafras.assertDeclarationsNumber(3);
    });

    it('should have a webkit prefixed declaration', function() {
      sassafras.setCall(".test { @include appearance(button) }");
      sassafras.assertDeclaration("-webkit-appearance", "button");
    });

    it('should have the correct entire output', function() {
      sassafras.setCall(".test { @include appearance(button) }");
      var result = ".test { -webkit-appearance: button; -moz-appearance: button; appearance: button; }";
      sassafras.assertEntireOutput(result);
    });
  });

  describe('#make-column', function() {
    it('should define the correct class', function() {
      sassafras.setCall("@include make-column(md, 6);");
      sassafras.assertSelectorCreation(".col-md-6");
    });
  });

  describe('#remy', function() {
    it('convert to px units to rem units', function() {
      sassafras.setCall("remy(32px, 16px)");
      sassafras.assertFunctionEqual("2rem");
    });
  });
});
