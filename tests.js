/* jshint globalstrict: true, node:true, mocha: true */

'use strict';

var sassafras = require('./src/sassafras');
var assert = require('assert');

describe('sample.scss', function() {
  sassafras.setFile('sample.scss');

  describe('#appearance', function() {
    var mixin = sassafras.includedMixin("appearance(button)");

    it('should return 3 declarations', function() {
      assert(mixin.hasNDeclarations(3));
    });

    it('should have a webkit prefixed declaration', function() {
      assert(mixin.declares("-webkit-appearance", "button"));
    });

    it('should have the correct entire output', function() {
      assert(mixin.equals("-webkit-appearance: button; -moz-appearance: button; appearance: button;"));
    });
  });

  describe('#make-column', function() {
    var mixin = sassafras.standaloneMixin("make-column(md, 6)");

    it('should define the correct class', function() {
      assert(mixin.createsSelector(".col-md-6"));
    });

    it('should return 2 declarations', function() {
      assert(mixin.hasNDeclarations(2));
    });

    it('should have a webkit prefixed declaration', function() {
      assert(mixin.declares("max-width", "50%"));
    });

    it('should have the correct entire output', function() {
      assert(mixin.equals(".col-md-6 { flex-basis: 50%; max-width: 50%; }"));
    });
  });

  describe('#remy', function() {
    it('convert to px units to rem units', function() {
      assert(sassafras.func("remy(32px, 16px)").equals("2rem"));
    });
  });

  describe('#boolean-switch', function() {
    it('should return true if passed true', function() {
      assert(sassafras.func("boolean-switch(true)").isTrue());
    });

    it('should return false if passed false', function() {
      assert(sassafras.func("boolean-switch(false)").isFalse());
    });
  });

  describe('#return-self', function() {
    it('testing truthy', function() {
      assert(sassafras.func("return-self(true)").isTruthy());
      assert(sassafras.func("return-self(1)").isTruthy());
      assert(sassafras.func("return-self('a')").isTruthy());
      assert(sassafras.func("return-self('')").isTruthy());
    });

    it('testing falsey', function() {
      assert(sassafras.func("return-self(false)").isFalsey());
      assert(sassafras.func("return-self(null)").isFalsey());
    });
  });

  describe('#make-general-alignments', function() {
    var mixin = sassafras.standaloneMixin("make-general-alignments(md)");

    it('should call the correct mixins', function() {
      assert(mixin.calls("make-align-left(md)"));
      assert(mixin.calls("make-align-center(md)"));
      assert(mixin.calls("make-align-right(md)"));
    });
  });

  describe('#animation', function() {
    var mixin = sassafras.includedMixin("animation(test, 500)");

    it('should have the correct output', function() {
      assert(mixin.declares("animation-name", "test"));
      assert(mixin.declares("animation-duration", 500));
    });

    it('should call the correct mixins', function() {
      assert(mixin.calls("prefixer(webkit, animation-name, test)"));
      assert(mixin.calls("prefixer(moz, animation-name, test)"));
      assert(mixin.calls("prefixer(webkit, animation-duration, 500)"));
      assert(mixin.calls("prefixer(moz, animation-duration, 500)"));
    });
  });
});
