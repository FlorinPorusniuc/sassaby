'use strict';

var sassaby = require('../src/sassaby');
var assert = sassaby.assert;

describe('sample.scss', function() {
  sassaby.setFile(__dirname + '/fixtures/sample.scss');

  describe('appearance', function() {
    var mixin = assert.includedMixin("appearance");

    it('should return 3 declarations', function() {
      mixin.calledWith('button').hasNumDeclarations(3);
    });

    it('should have a webkit prefixed declaration', function() {
      mixin.calledWith('button').declares("-webkit-appearance", "button");
    });

    it('should not make an incorrect declaration', function() {
      mixin.calledWith('button').doesNotDeclare("-webkit-appearance", "none");
      mixin.calledWith('button').doesNotDeclare("color", "red");
    });

    it('should have the correct entire output', function() {
      mixin.calledWith('button').equals("-webkit-appearance: button; -moz-appearance: button; appearance: button;");
    });

    it('should not equal the incorrect output', function() {
      mixin.calledWith('button').doesNotEqual("-moz-appearance: button; appearance: button;");
    });
  });

  describe('make-column', function() {
    var mixin = assert.standaloneMixin("make-column");

    it('should define the correct class', function() {
      mixin.calledWith('md', 6).createsSelector(".col-md-6");
    });

    it('should not define the incorrect class', function() {
      mixin.calledWith('md', 6).doesNotCreateSelector(".col-lg-6");
    });

    it('should return 2 declarations', function() {
      mixin.calledWith('md', 6).hasNumDeclarations(2);
    });

    it('should declare the correct width', function() {
      mixin.calledWith('md', 6).declares("max-width", "50%");
    });

    it('should not declare the incorrect width', function() {
      mixin.calledWith('md', 6).doesNotDeclare("max-width", "60%");
      mixin.calledWith('md', 6).doesNotDeclare("appearance", "button");
    });

    it('should have the correct entire output', function() {
      mixin.calledWith('md', 6).equals(".col-md-6 { flex-basis: 50%; max-width: 50%; }");
    });

    it('should not have incorrect output', function() {
      mixin.calledWith('md', 6).doesNotEqual(".col-md-8 { flex-basis: 50%; max-width: 50%; }");
    });
  });

  describe('remy', function() {
    it('convert to px units to rem units', function() {
      assert.func("remy").calledWith('32px', '16px').equals("2rem");
    });

    it('has the correct output unit', function() {
      assert.func("remy").calledWith('32px', '16px').doesNotEqual("2em");
    });
  });

  describe('boolean-switch', function() {
    it('should return true if passed true', function() {
      assert.func("boolean-switch").calledWith(true).isTrue();
    });

    it('should return false if passed false', function() {
      assert.func("boolean-switch").calledWith(false).isFalse();
    });
  });

  describe('return-self', function() {
    it('testing truthy', function() {
      assert.func("return-self").calledWith(true).isTruthy();
      assert.func("return-self").calledWith(1).isTruthy();
      assert.func("return-self").calledWith('a').isTruthy();
    });

    it('testing falsy', function() {
      assert.func("return-self").calledWith(false).isFalsy();
      assert.func("return-self").calledWith(null).isFalsy();
    });
  });

  describe('make-general-alignments', function() {
    var mixin = assert.standaloneMixin("make-general-alignments");

    it('should call the correct mixins', function() {
      mixin.calledWith('md').calls("make-align-left(md)");
      mixin.calledWith('md').calls("make-align-center(md)");
      mixin.calledWith('md').calls("make-align-right(md)");
    });

    it('should not call the incorrect mixin', function() {
      mixin.calledWith('md').doesNotCall("make-align-left(lg)");
    });
  });

  describe('animation', function() {
    var mixin = assert.includedMixin("animation");

    it('should have the correct output', function() {
      mixin.calledWith('test', 500).declares("animation-name", "test");
      mixin.calledWith('test', 500).declares("animation-duration", 500);
    });

    it('should call the correct mixins', function() {
      mixin.calledWith('test', 500).calls("prefixer(webkit, animation-name, test)");
      mixin.calledWith('test', 500).calls("prefixer(moz, animation-name, test)");
      mixin.calledWith('test', 500).calls("prefixer(webkit, animation-duration, 500)");
      mixin.calledWith('test', 500).calls("prefixer(moz, animation-duration, 500)");
    });

    it('should not call the incorrect mixins', function() {
      mixin.calledWith('test', 500).doesNotCall("prefixer(o, animation-name, test)");
    });
  });
});
