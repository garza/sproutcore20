// ==========================================================================
// Project:  SproutCore Metal
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals sc_assert */

require('sproutcore-metal/core');

/**
  @class

  Platform specific methods and feature detectors needed by the framework.
*/
SC.platform = {} ;

/**
  Identical to Object.create().  Implements if not available natively.
*/
SC.platform.create = Object.create;

//@if (legacy)
if (!SC.platform.create) {
  var O_ctor = function() {}, 
      O_proto = O_ctor.prototype;

  SC.platform.create = function(obj, descs) {
    O_ctor.prototype = obj;
    obj = new O_ctor();
    O_ctor.prototype = O_proto;
    
    if (descs !== undefined) {
      for(var key in descs) {
        if (!descs.hasOwnProperty(key)) continue;
        SC.platform.defineProperty(obj, key, descs[key]);
      }
    }
    
    return obj;
  };
  
  SC.platform.create.isSimulated = true;
}
//@endif

/**
  Identical to Object.defineProperty().  Implements as much functionality
  as possible if not available natively.
  
  @param {Object} obj The object to modify
  @param {String} keyName property name to modify
  @param {Object} desc descriptor hash
  @returns {void}
*/
SC.platform.defineProperty = Object.defineProperty;

/**
  Set to true if the platform supports native getters and setters.
*/
SC.platform.hasPropertyAccessors = true;

//@if (legacy)
if (!SC.platform.defineProperty) {
  SC.platform.hasPropertyAccessors = !!SC.platform.defineProperty;

  SC.platform.defineProperty = function(obj, keyName, desc) {
    sc_assert("property descriptor cannot have `get` or `set` on this platform", !desc.get && !desc.set);
    obj[keyName] = desc.value;
  };
  
  SC.platform.defineProperty.isSimulated = true;
}
//@endif

