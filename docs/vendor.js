(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};

require.register("@ionic/core/dist/cjs/animation-9929f2ae.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

var helpers = require('./helpers-7e840ed2.js');

var animationPrefix;
/**
 * Web Animations requires hyphenated CSS properties
 * to be written in camelCase when animating
 */

var processKeyframes = keyframes => {
  keyframes.forEach(keyframe => {
    for (var key in keyframe) {
      if (keyframe.hasOwnProperty(key)) {
        var value = keyframe[key];

        if (key === 'easing') {
          var newKey = 'animation-timing-function';
          keyframe[newKey] = value;
          delete keyframe[key];
        } else {
          var _newKey = convertCamelCaseToHypen(key);

          if (_newKey !== key) {
            keyframe[_newKey] = value;
            delete keyframe[key];
          }
        }
      }
    }
  });
  return keyframes;
};

var convertCamelCaseToHypen = str => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

var getAnimationPrefix = el => {
  if (animationPrefix === undefined) {
    var supportsUnprefixed = el.style.animationName !== undefined;
    var supportsWebkitPrefix = el.style.webkitAnimationName !== undefined;
    animationPrefix = !supportsUnprefixed && supportsWebkitPrefix ? '-webkit-' : '';
  }

  return animationPrefix;
};

var setStyleProperty = (element, propertyName, value) => {
  var prefix = propertyName.startsWith('animation') ? getAnimationPrefix(element) : '';
  element.style.setProperty(prefix + propertyName, value);
};

var removeStyleProperty = (element, propertyName) => {
  var prefix = propertyName.startsWith('animation') ? getAnimationPrefix(element) : '';
  element.style.removeProperty(prefix + propertyName);
};

var animationEnd = (el, callback) => {
  var unRegTrans;
  var opts = {
    passive: true
  };

  var unregister = () => {
    if (unRegTrans) {
      unRegTrans();
    }
  };

  var onTransitionEnd = ev => {
    if (el === ev.target) {
      unregister();
      callback(ev);
    }
  };

  if (el) {
    el.addEventListener('webkitAnimationEnd', onTransitionEnd, opts);
    el.addEventListener('animationend', onTransitionEnd, opts);

    unRegTrans = () => {
      el.removeEventListener('webkitAnimationEnd', onTransitionEnd, opts);
      el.removeEventListener('animationend', onTransitionEnd, opts);
    };
  }

  return unregister;
};

var generateKeyframeRules = function generateKeyframeRules() {
  var keyframes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return keyframes.map(keyframe => {
    var offset = keyframe.offset;
    var frameString = [];

    for (var property in keyframe) {
      if (keyframe.hasOwnProperty(property) && property !== 'offset') {
        frameString.push("".concat(property, ": ").concat(keyframe[property], ";"));
      }
    }

    return "".concat(offset * 100, "% { ").concat(frameString.join(' '), " }");
  }).join(' ');
};

var keyframeIds = [];

var generateKeyframeName = keyframeRules => {
  var index = keyframeIds.indexOf(keyframeRules);

  if (index < 0) {
    index = keyframeIds.push(keyframeRules) - 1;
  }

  return "ion-animation-".concat(index);
};

var getStyleContainer = element => {
  var rootNode = element.getRootNode();
  return rootNode.head || rootNode;
};

var createKeyframeStylesheet = (keyframeName, keyframeRules, element) => {
  var styleContainer = getStyleContainer(element);
  var keyframePrefix = getAnimationPrefix(element);
  var existingStylesheet = styleContainer.querySelector('#' + keyframeName);

  if (existingStylesheet) {
    return existingStylesheet;
  }

  var stylesheet = (element.ownerDocument || document).createElement('style');
  stylesheet.id = keyframeName;
  stylesheet.textContent = "@".concat(keyframePrefix, "keyframes ").concat(keyframeName, " { ").concat(keyframeRules, " } @").concat(keyframePrefix, "keyframes ").concat(keyframeName, "-alt { ").concat(keyframeRules, " }");
  styleContainer.appendChild(stylesheet);
  return stylesheet;
};

var addClassToArray = function addClassToArray() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var className = arguments.length > 1 ? arguments[1] : undefined;

  if (className !== undefined) {
    var classNameToAppend = Array.isArray(className) ? className : [className];
    return [...classes, ...classNameToAppend];
  }

  return classes;
};

var createAnimation = animationId => {
  var _delay;

  var _duration;

  var _easing;

  var _iterations;

  var _fill;

  var _direction;

  var _keyframes = [];
  var beforeAddClasses = [];
  var beforeRemoveClasses = [];
  var initialized = false;
  var parentAnimation;
  var beforeStylesValue = {};
  var afterAddClasses = [];
  var afterRemoveClasses = [];
  var afterStylesValue = {};
  var numAnimationsRunning = 0;
  var shouldForceLinearEasing = false;
  var shouldForceSyncPlayback = false;
  var cssAnimationsTimerFallback;
  var forceDirectionValue;
  var forceDurationValue;
  var forceDelayValue;
  var willComplete = true;
  var finished = false;
  var shouldCalculateNumAnimations = true;
  var keyframeName;
  var ani;
  var id = animationId;
  var onFinishCallbacks = [];
  var onFinishOneTimeCallbacks = [];
  var elements = [];
  var childAnimations = [];
  var stylesheets = [];
  var _beforeAddReadFunctions = [];
  var _beforeAddWriteFunctions = [];
  var _afterAddReadFunctions = [];
  var _afterAddWriteFunctions = [];
  var webAnimations = [];
  var supportsAnimationEffect = typeof AnimationEffect === 'function' || typeof window.AnimationEffect === 'function';
  var supportsWebAnimations = typeof Element === 'function' && typeof Element.prototype.animate === 'function' && supportsAnimationEffect;
  var ANIMATION_END_FALLBACK_PADDING_MS = 100;

  var getWebAnimations = () => {
    return webAnimations;
  };

  var destroy = clearStyleSheets => {
    childAnimations.forEach(childAnimation => {
      childAnimation.destroy(clearStyleSheets);
    });
    cleanUp(clearStyleSheets);
    elements.length = 0;
    childAnimations.length = 0;
    _keyframes.length = 0;
    clearOnFinish();
    initialized = false;
    shouldCalculateNumAnimations = true;
    return ani;
  };
  /**
   * Cancels any Web Animations, removes
   * any animation properties from the
   * animation's elements, and removes the
   * animation's stylesheets from the DOM.
   */


  var cleanUp = clearStyleSheets => {
    cleanUpElements();

    if (clearStyleSheets) {
      cleanUpStyleSheets();
    }
  };

  var resetFlags = () => {
    shouldForceLinearEasing = false;
    shouldForceSyncPlayback = false;
    shouldCalculateNumAnimations = true;
    forceDirectionValue = undefined;
    forceDurationValue = undefined;
    forceDelayValue = undefined;
    numAnimationsRunning = 0;
    finished = false;
    willComplete = true;
  };

  var onFinish = (callback, opts) => {
    var callbacks = opts && opts.oneTimeCallback ? onFinishOneTimeCallbacks : onFinishCallbacks;
    callbacks.push({
      c: callback,
      o: opts
    });
    return ani;
  };

  var clearOnFinish = () => {
    onFinishCallbacks.length = 0;
    onFinishOneTimeCallbacks.length = 0;
    return ani;
  };
  /**
   * Cancels any Web Animations and removes
   * any animation properties from the
   * the animation's elements.
   */


  var cleanUpElements = () => {
    if (supportsWebAnimations) {
      webAnimations.forEach(animation => {
        animation.cancel();
      });
      webAnimations.length = 0;
    } else {
      var elementsArray = elements.slice();
      helpers.raf(() => {
        elementsArray.forEach(element => {
          removeStyleProperty(element, 'animation-name');
          removeStyleProperty(element, 'animation-duration');
          removeStyleProperty(element, 'animation-timing-function');
          removeStyleProperty(element, 'animation-iteration-count');
          removeStyleProperty(element, 'animation-delay');
          removeStyleProperty(element, 'animation-play-state');
          removeStyleProperty(element, 'animation-fill-mode');
          removeStyleProperty(element, 'animation-direction');
        });
      });
    }
  };
  /**
   * Removes the animation's stylesheets
   * from the DOM.
   */


  var cleanUpStyleSheets = () => {
    stylesheets.forEach(stylesheet => {
      /**
       * When sharing stylesheets, it's possible
       * for another animation to have already
       * cleaned up a particular stylesheet
       */
      if (stylesheet && stylesheet.parentNode) {
        stylesheet.parentNode.removeChild(stylesheet);
      }
    });
    stylesheets.length = 0;
  };

  var beforeAddRead = readFn => {
    _beforeAddReadFunctions.push(readFn);

    return ani;
  };

  var beforeAddWrite = writeFn => {
    _beforeAddWriteFunctions.push(writeFn);

    return ani;
  };

  var afterAddRead = readFn => {
    _afterAddReadFunctions.push(readFn);

    return ani;
  };

  var afterAddWrite = writeFn => {
    _afterAddWriteFunctions.push(writeFn);

    return ani;
  };

  var beforeAddClass = className => {
    beforeAddClasses = addClassToArray(beforeAddClasses, className);
    return ani;
  };

  var beforeRemoveClass = className => {
    beforeRemoveClasses = addClassToArray(beforeRemoveClasses, className);
    return ani;
  };
  /**
   * Set CSS inline styles to the animation's
   * elements before the animation begins.
   */


  var beforeStyles = function beforeStyles() {
    var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    beforeStylesValue = styles;
    return ani;
  };
  /**
   * Clear CSS inline styles from the animation's
   * elements before the animation begins.
   */


  var beforeClearStyles = function beforeClearStyles() {
    var propertyNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    for (var property of propertyNames) {
      beforeStylesValue[property] = '';
    }

    return ani;
  };

  var afterAddClass = className => {
    afterAddClasses = addClassToArray(afterAddClasses, className);
    return ani;
  };

  var afterRemoveClass = className => {
    afterRemoveClasses = addClassToArray(afterRemoveClasses, className);
    return ani;
  };

  var afterStyles = function afterStyles() {
    var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    afterStylesValue = styles;
    return ani;
  };

  var afterClearStyles = function afterClearStyles() {
    var propertyNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    for (var property of propertyNames) {
      afterStylesValue[property] = '';
    }

    return ani;
  };

  var getFill = () => {
    if (_fill !== undefined) {
      return _fill;
    }

    if (parentAnimation) {
      return parentAnimation.getFill();
    }

    return 'both';
  };

  var getDirection = () => {
    if (forceDirectionValue !== undefined) {
      return forceDirectionValue;
    }

    if (_direction !== undefined) {
      return _direction;
    }

    if (parentAnimation) {
      return parentAnimation.getDirection();
    }

    return 'normal';
  };

  var getEasing = () => {
    if (shouldForceLinearEasing) {
      return 'linear';
    }

    if (_easing !== undefined) {
      return _easing;
    }

    if (parentAnimation) {
      return parentAnimation.getEasing();
    }

    return 'linear';
  };

  var getDuration = () => {
    if (shouldForceSyncPlayback) {
      return 0;
    }

    if (forceDurationValue !== undefined) {
      return forceDurationValue;
    }

    if (_duration !== undefined) {
      return _duration;
    }

    if (parentAnimation) {
      return parentAnimation.getDuration();
    }

    return 0;
  };

  var getIterations = () => {
    if (_iterations !== undefined) {
      return _iterations;
    }

    if (parentAnimation) {
      return parentAnimation.getIterations();
    }

    return 1;
  };

  var getDelay = () => {
    if (forceDelayValue !== undefined) {
      return forceDelayValue;
    }

    if (_delay !== undefined) {
      return _delay;
    }

    if (parentAnimation) {
      return parentAnimation.getDelay();
    }

    return 0;
  };

  var getKeyframes = () => {
    return _keyframes;
  };

  var direction = animationDirection => {
    _direction = animationDirection;
    update(true);
    return ani;
  };

  var fill = animationFill => {
    _fill = animationFill;
    update(true);
    return ani;
  };

  var delay = animationDelay => {
    _delay = animationDelay;
    update(true);
    return ani;
  };

  var easing = animationEasing => {
    _easing = animationEasing;
    update(true);
    return ani;
  };

  var duration = animationDuration => {
    /**
     * CSS Animation Durations of 0ms work fine on Chrome
     * but do not run on Safari, so force it to 1ms to
     * get it to run on both platforms.
     */
    if (!supportsWebAnimations && animationDuration === 0) {
      animationDuration = 1;
    }

    _duration = animationDuration;
    update(true);
    return ani;
  };

  var iterations = animationIterations => {
    _iterations = animationIterations;
    update(true);
    return ani;
  };

  var parent = animation => {
    parentAnimation = animation;
    return ani;
  };

  var addElement = el => {
    if (el != null) {
      if (el.nodeType === 1) {
        elements.push(el);
      } else if (el.length >= 0) {
        for (var i = 0; i < el.length; i++) {
          elements.push(el[i]);
        }
      } else {
        console.error('Invalid addElement value');
      }
    }

    return ani;
  };

  var addAnimation = animationToAdd => {
    if (animationToAdd != null) {
      if (Array.isArray(animationToAdd)) {
        for (var animation of animationToAdd) {
          animation.parent(ani);
          childAnimations.push(animation);
        }
      } else {
        animationToAdd.parent(ani);
        childAnimations.push(animationToAdd);
      }
    }

    return ani;
  };

  var keyframes = keyframeValues => {
    _keyframes = keyframeValues;
    return ani;
  };
  /**
   * Run all "before" animation hooks.
   */


  var beforeAnimation = () => {
    // Runs all before read callbacks
    _beforeAddReadFunctions.forEach(callback => callback()); // Runs all before write callbacks


    _beforeAddWriteFunctions.forEach(callback => callback()); // Updates styles and classes before animation runs


    var addClasses = beforeAddClasses;
    var removeClasses = beforeRemoveClasses;
    var styles = beforeStylesValue;
    elements.forEach(el => {
      var elementClassList = el.classList;
      addClasses.forEach(c => elementClassList.add(c));
      removeClasses.forEach(c => elementClassList.remove(c));

      for (var property in styles) {
        if (styles.hasOwnProperty(property)) {
          setStyleProperty(el, property, styles[property]);
        }
      }
    });
  };
  /**
   * Run all "after" animation hooks.
   */


  var afterAnimation = () => {
    clearCSSAnimationsTimeout(); // Runs all after read callbacks

    _afterAddReadFunctions.forEach(callback => callback()); // Runs all after write callbacks


    _afterAddWriteFunctions.forEach(callback => callback()); // Updates styles and classes before animation ends


    var currentStep = willComplete ? 1 : 0;
    var addClasses = afterAddClasses;
    var removeClasses = afterRemoveClasses;
    var styles = afterStylesValue;
    elements.forEach(el => {
      var elementClassList = el.classList;
      addClasses.forEach(c => elementClassList.add(c));
      removeClasses.forEach(c => elementClassList.remove(c));

      for (var property in styles) {
        if (styles.hasOwnProperty(property)) {
          setStyleProperty(el, property, styles[property]);
        }
      }
    });
    onFinishCallbacks.forEach(onFinishCallback => {
      return onFinishCallback.c(currentStep, ani);
    });
    onFinishOneTimeCallbacks.forEach(onFinishCallback => {
      return onFinishCallback.c(currentStep, ani);
    });
    onFinishOneTimeCallbacks.length = 0;
    shouldCalculateNumAnimations = true;

    if (willComplete) {
      finished = true;
    }

    willComplete = true;
  };

  var animationFinish = () => {
    if (numAnimationsRunning === 0) {
      return;
    }

    numAnimationsRunning--;

    if (numAnimationsRunning === 0) {
      afterAnimation();

      if (parentAnimation) {
        parentAnimation.animationFinish();
      }
    }
  };

  var initializeCSSAnimation = function initializeCSSAnimation() {
    var toggleAnimationName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    cleanUpStyleSheets();
    var processedKeyframes = processKeyframes(_keyframes);
    elements.forEach(element => {
      if (processedKeyframes.length > 0) {
        var keyframeRules = generateKeyframeRules(processedKeyframes);
        keyframeName = animationId !== undefined ? animationId : generateKeyframeName(keyframeRules);
        var stylesheet = createKeyframeStylesheet(keyframeName, keyframeRules, element);
        stylesheets.push(stylesheet);
        setStyleProperty(element, 'animation-duration', "".concat(getDuration(), "ms"));
        setStyleProperty(element, 'animation-timing-function', getEasing());
        setStyleProperty(element, 'animation-delay', "".concat(getDelay(), "ms"));
        setStyleProperty(element, 'animation-fill-mode', getFill());
        setStyleProperty(element, 'animation-direction', getDirection());
        var iterationsCount = getIterations() === Infinity ? 'infinite' : getIterations().toString();
        setStyleProperty(element, 'animation-iteration-count', iterationsCount);
        setStyleProperty(element, 'animation-play-state', 'paused');

        if (toggleAnimationName) {
          setStyleProperty(element, 'animation-name', "".concat(stylesheet.id, "-alt"));
        }

        helpers.raf(() => {
          setStyleProperty(element, 'animation-name', stylesheet.id || null);
        });
      }
    });
  };

  var initializeWebAnimation = () => {
    elements.forEach(element => {
      var animation = element.animate(_keyframes, {
        id,
        delay: getDelay(),
        duration: getDuration(),
        easing: getEasing(),
        iterations: getIterations(),
        fill: getFill(),
        direction: getDirection()
      });
      animation.pause();
      webAnimations.push(animation);
    });

    if (webAnimations.length > 0) {
      webAnimations[0].onfinish = () => {
        animationFinish();
      };
    }
  };

  var initializeAnimation = function initializeAnimation() {
    var toggleAnimationName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    beforeAnimation();

    if (_keyframes.length > 0) {
      if (supportsWebAnimations) {
        initializeWebAnimation();
      } else {
        initializeCSSAnimation(toggleAnimationName);
      }
    }

    initialized = true;
  };

  var setAnimationStep = step => {
    step = Math.min(Math.max(step, 0), 0.9999);

    if (supportsWebAnimations) {
      webAnimations.forEach(animation => {
        animation.currentTime = animation.effect.getComputedTiming().delay + getDuration() * step;
        animation.pause();
      });
    } else {
      var animationDuration = "-".concat(getDuration() * step, "ms");
      elements.forEach(element => {
        if (_keyframes.length > 0) {
          setStyleProperty(element, 'animation-delay', animationDuration);
          setStyleProperty(element, 'animation-play-state', 'paused');
        }
      });
    }
  };

  var updateWebAnimation = step => {
    webAnimations.forEach(animation => {
      animation.effect.updateTiming({
        delay: getDelay(),
        duration: getDuration(),
        easing: getEasing(),
        iterations: getIterations(),
        fill: getFill(),
        direction: getDirection()
      });
    });

    if (step !== undefined) {
      setAnimationStep(step);
    }
  };

  var updateCSSAnimation = function updateCSSAnimation() {
    var toggleAnimationName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var step = arguments.length > 1 ? arguments[1] : undefined;
    helpers.raf(() => {
      elements.forEach(element => {
        setStyleProperty(element, 'animation-name', keyframeName || null);
        setStyleProperty(element, 'animation-duration', "".concat(getDuration(), "ms"));
        setStyleProperty(element, 'animation-timing-function', getEasing());
        setStyleProperty(element, 'animation-delay', step !== undefined ? "-".concat(step * getDuration(), "ms") : "".concat(getDelay(), "ms"));
        setStyleProperty(element, 'animation-fill-mode', getFill() || null);
        setStyleProperty(element, 'animation-direction', getDirection() || null);
        var iterationsCount = getIterations() === Infinity ? 'infinite' : getIterations().toString();
        setStyleProperty(element, 'animation-iteration-count', iterationsCount);

        if (toggleAnimationName) {
          setStyleProperty(element, 'animation-name', "".concat(keyframeName, "-alt"));
        }

        helpers.raf(() => {
          setStyleProperty(element, 'animation-name', keyframeName || null);
        });
      });
    });
  };

  var update = function update() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var toggleAnimationName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var step = arguments.length > 2 ? arguments[2] : undefined;

    if (deep) {
      childAnimations.forEach(animation => {
        animation.update(deep, toggleAnimationName, step);
      });
    }

    if (supportsWebAnimations) {
      updateWebAnimation(step);
    } else {
      updateCSSAnimation(toggleAnimationName, step);
    }

    return ani;
  };

  var progressStart = function progressStart() {
    var forceLinearEasing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var step = arguments.length > 1 ? arguments[1] : undefined;
    childAnimations.forEach(animation => {
      animation.progressStart(forceLinearEasing, step);
    });
    pauseAnimation();
    shouldForceLinearEasing = forceLinearEasing;

    if (!initialized) {
      initializeAnimation();
    } else {
      update(false, true, step);
    }

    return ani;
  };

  var progressStep = step => {
    childAnimations.forEach(animation => {
      animation.progressStep(step);
    });
    setAnimationStep(step);
    return ani;
  };

  var progressEnd = (playTo, step, dur) => {
    shouldForceLinearEasing = false;
    childAnimations.forEach(animation => {
      animation.progressEnd(playTo, step, dur);
    });

    if (dur !== undefined) {
      forceDurationValue = dur;
    }

    finished = false; // tslint:disable-next-line: strict-boolean-conditions

    willComplete = true;

    if (playTo === 0) {
      forceDirectionValue = getDirection() === 'reverse' ? 'normal' : 'reverse';

      if (forceDirectionValue === 'reverse') {
        willComplete = false;
      }

      if (supportsWebAnimations) {
        update();
        setAnimationStep(1 - step);
      } else {
        forceDelayValue = (1 - step) * getDuration() * -1;
        update(false, false);
      }
    } else if (playTo === 1) {
      if (supportsWebAnimations) {
        update();
        setAnimationStep(step);
      } else {
        forceDelayValue = step * getDuration() * -1;
        update(false, false);
      }
    }

    if (playTo !== undefined) {
      onFinish(() => {
        forceDurationValue = undefined;
        forceDirectionValue = undefined;
        forceDelayValue = undefined;
      }, {
        oneTimeCallback: true
      });

      if (!parentAnimation) {
        play();
      }
    }

    return ani;
  };

  var pauseAnimation = () => {
    if (initialized) {
      if (supportsWebAnimations) {
        webAnimations.forEach(animation => {
          animation.pause();
        });
      } else {
        elements.forEach(element => {
          setStyleProperty(element, 'animation-play-state', 'paused');
        });
      }
    }
  };

  var pause = () => {
    childAnimations.forEach(animation => {
      animation.pause();
    });
    pauseAnimation();
    return ani;
  };

  var onAnimationEndFallback = () => {
    cssAnimationsTimerFallback = undefined;
    animationFinish();
  };

  var clearCSSAnimationsTimeout = () => {
    if (cssAnimationsTimerFallback) {
      clearTimeout(cssAnimationsTimerFallback);
    }
  };

  var playCSSAnimations = () => {
    clearCSSAnimationsTimeout();
    helpers.raf(() => {
      elements.forEach(element => {
        if (_keyframes.length > 0) {
          setStyleProperty(element, 'animation-play-state', 'running');
        }
      });
    });

    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    } else {
      /**
       * This is a catchall in the event that a CSS Animation did not finish.
       * The Web Animations API has mechanisms in place for preventing this.
       * CSS Animations will not fire an `animationend` event
       * for elements with `display: none`. The Web Animations API
       * accounts for this, but using raw CSS Animations requires
       * this workaround.
       */
      var animationDelay = getDelay() || 0;
      var animationDuration = getDuration() || 0;
      var animationIterations = getIterations() || 1; // No need to set a timeout when animation has infinite iterations

      if (isFinite(animationIterations)) {
        cssAnimationsTimerFallback = setTimeout(onAnimationEndFallback, animationDelay + animationDuration * animationIterations + ANIMATION_END_FALLBACK_PADDING_MS);
      }

      animationEnd(elements[0], () => {
        clearCSSAnimationsTimeout();
        /**
         * Ensure that clean up
         * is always done a frame
         * before the onFinish handlers
         * are fired. Otherwise, there
         * may be flickering if a new
         * animation is started on the same
         * element too quickly
         *
         * TODO: Is there a cleaner way to do this?
         */

        helpers.raf(() => {
          clearCSSAnimationPlayState();
          helpers.raf(animationFinish);
        });
      });
    }
  };

  var clearCSSAnimationPlayState = () => {
    elements.forEach(element => {
      removeStyleProperty(element, 'animation-duration');
      removeStyleProperty(element, 'animation-delay');
      removeStyleProperty(element, 'animation-play-state');
    });
  };

  var playWebAnimations = () => {
    webAnimations.forEach(animation => {
      animation.play();
    });

    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    }
  };

  var resetAnimation = () => {
    if (supportsWebAnimations) {
      setAnimationStep(0);
      updateWebAnimation();
    } else {
      updateCSSAnimation();
    }
  };

  var play = opts => {
    return new Promise(resolve => {
      if (opts && opts.sync) {
        shouldForceSyncPlayback = true;
        onFinish(() => shouldForceSyncPlayback = false, {
          oneTimeCallback: true
        });
      }

      if (!initialized) {
        initializeAnimation();
      }

      if (finished) {
        resetAnimation();
        finished = false;
      }

      if (shouldCalculateNumAnimations) {
        numAnimationsRunning = childAnimations.length + 1;
        shouldCalculateNumAnimations = false;
      }

      onFinish(() => resolve(), {
        oneTimeCallback: true
      });
      childAnimations.forEach(animation => {
        animation.play();
      });

      if (supportsWebAnimations) {
        playWebAnimations();
      } else {
        playCSSAnimations();
      }
    });
  };

  var stop = () => {
    childAnimations.forEach(animation => {
      animation.stop();
    });

    if (initialized) {
      cleanUpElements();
      initialized = false;
    }

    resetFlags();
  };

  var from = (property, value) => {
    var firstFrame = _keyframes[0];

    if (firstFrame !== undefined && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
      firstFrame[property] = value;
    } else {
      _keyframes = [{
        offset: 0,
        [property]: value
      }, ..._keyframes];
    }

    return ani;
  };

  var to = (property, value) => {
    var lastFrame = _keyframes[_keyframes.length - 1];

    if (lastFrame !== undefined && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
      lastFrame[property] = value;
    } else {
      _keyframes = [..._keyframes, {
        offset: 1,
        [property]: value
      }];
    }

    return ani;
  };

  var fromTo = (property, fromValue, toValue) => {
    return from(property, fromValue).to(property, toValue);
  };

  return ani = {
    parentAnimation,
    elements,
    childAnimations,
    id,
    animationFinish,
    from,
    to,
    fromTo,
    parent,
    play,
    pause,
    stop,
    destroy,
    keyframes,
    addAnimation,
    addElement,
    update,
    fill,
    direction,
    iterations,
    duration,
    easing,
    delay,
    getWebAnimations,
    getKeyframes,
    getFill,
    getDirection,
    getDelay,
    getIterations,
    getEasing,
    getDuration,
    afterAddRead,
    afterAddWrite,
    afterClearStyles,
    afterStyles,
    afterRemoveClass,
    afterAddClass,
    beforeAddRead,
    beforeAddWrite,
    beforeClearStyles,
    beforeStyles,
    beforeRemoveClass,
    beforeAddClass,
    onFinish,
    progressStart,
    progressStep,
    progressEnd
  };
};

exports.createAnimation = createAnimation;
  })();
});
require.register("@ionic/core/dist/cjs/cubic-bezier-0b2ccc35.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';
/**
 * Based on:
 * https://stackoverflow.com/questions/7348009/y-coordinate-for-a-given-x-cubic-bezier
 * https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
 * TODO: Reduce rounding error
 */

/**
 * EXPERIMENTAL
 * Given a cubic-bezier curve, get the x value (time) given
 * the y value (progression).
 * Ex: cubic-bezier(0.32, 0.72, 0, 1);
 * P0: (0, 0)
 * P1: (0.32, 0.72)
 * P2: (0, 1)
 * P3: (1, 1)
 *
 * If you give a cubic bezier curve that never reaches the
 * provided progression, this function will return an empty array.
 */

var getTimeGivenProgression = (p0, p1, p2, p3, progression) => {
  return solveCubicBezier(p0[1], p1[1], p2[1], p3[1], progression).map(tValue => {
    return solveCubicParametricEquation(p0[0], p1[0], p2[0], p3[0], tValue);
  });
};
/**
 * Solve a cubic equation in one dimension (time)
 */


var solveCubicParametricEquation = (p0, p1, p2, p3, t) => {
  var partA = 3 * p1 * Math.pow(t - 1, 2);
  var partB = -3 * p2 * t + 3 * p2 + p3 * t;
  var partC = p0 * Math.pow(t - 1, 3);
  return t * (partA + t * partB) - partC;
};
/**
 * Find the `t` value for a cubic bezier using Cardano's formula
 */


var solveCubicBezier = (p0, p1, p2, p3, refPoint) => {
  p0 -= refPoint;
  p1 -= refPoint;
  p2 -= refPoint;
  p3 -= refPoint;
  var roots = solveCubicEquation(p3 - 3 * p2 + 3 * p1 - p0, 3 * p2 - 6 * p1 + 3 * p0, 3 * p1 - 3 * p0, p0);
  return roots.filter(root => root >= 0 && root <= 1);
};

var solveQuadraticEquation = (a, b, c) => {
  var discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return [];
  } else {
    return [(-b + Math.sqrt(discriminant)) / (2 * a), (-b - Math.sqrt(discriminant)) / (2 * a)];
  }
};

var solveCubicEquation = (a, b, c, d) => {
  if (a === 0) {
    return solveQuadraticEquation(b, c, d);
  }

  b /= a;
  c /= a;
  d /= a;
  var p = (3 * c - b * b) / 3;
  var q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;

  if (p === 0) {
    return [Math.pow(-q, 1 / 3)];
  } else if (q === 0) {
    return [Math.sqrt(-p), -Math.sqrt(-p)];
  }

  var discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

  if (discriminant === 0) {
    return [Math.pow(q / 2, 1 / 2) - b / 3];
  } else if (discriminant > 0) {
    return [Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow(q / 2 + Math.sqrt(discriminant), 1 / 3) - b / 3];
  }

  var r = Math.sqrt(Math.pow(-(p / 3), 3));
  var phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
  var s = 2 * Math.pow(r, 1 / 3);
  return [s * Math.cos(phi / 3) - b / 3, s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3, s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3];
};

exports.getTimeGivenProgression = getTimeGivenProgression;
  })();
});
require.register("@ionic/core/dist/cjs/gesture-controller-29adda71.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

class GestureController {
  constructor() {
    this.gestureId = 0;
    this.requestedStart = new Map();
    this.disabledGestures = new Map();
    this.disabledScroll = new Set();
  }
  /**
   * Creates a gesture delegate based on the GestureConfig passed
   */


  createGesture(config) {
    return new GestureDelegate(this, this.newID(), config.name, config.priority || 0, !!config.disableScroll);
  }
  /**
   * Creates a blocker that will block any other gesture events from firing. Set in the ion-gesture component.
   */


  createBlocker() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new BlockerDelegate(this, this.newID(), opts.disable, !!opts.disableScroll);
  }

  start(gestureName, id, priority) {
    if (!this.canStart(gestureName)) {
      this.requestedStart.delete(id);
      return false;
    }

    this.requestedStart.set(id, priority);
    return true;
  }

  capture(gestureName, id, priority) {
    if (!this.start(gestureName, id, priority)) {
      return false;
    }

    var requestedStart = this.requestedStart;
    var maxPriority = -10000;
    requestedStart.forEach(value => {
      maxPriority = Math.max(maxPriority, value);
    });

    if (maxPriority === priority) {
      this.capturedId = id;
      requestedStart.clear();
      var event = new CustomEvent('ionGestureCaptured', {
        detail: {
          gestureName
        }
      });
      document.dispatchEvent(event);
      return true;
    }

    requestedStart.delete(id);
    return false;
  }

  release(id) {
    this.requestedStart.delete(id);

    if (this.capturedId === id) {
      this.capturedId = undefined;
    }
  }

  disableGesture(gestureName, id) {
    var set = this.disabledGestures.get(gestureName);

    if (set === undefined) {
      set = new Set();
      this.disabledGestures.set(gestureName, set);
    }

    set.add(id);
  }

  enableGesture(gestureName, id) {
    var set = this.disabledGestures.get(gestureName);

    if (set !== undefined) {
      set.delete(id);
    }
  }

  disableScroll(id) {
    this.disabledScroll.add(id);

    if (this.disabledScroll.size === 1) {
      document.body.classList.add(BACKDROP_NO_SCROLL);
    }
  }

  enableScroll(id) {
    this.disabledScroll.delete(id);

    if (this.disabledScroll.size === 0) {
      document.body.classList.remove(BACKDROP_NO_SCROLL);
    }
  }

  canStart(gestureName) {
    if (this.capturedId !== undefined) {
      // a gesture already captured
      return false;
    }

    if (this.isDisabled(gestureName)) {
      return false;
    }

    return true;
  }

  isCaptured() {
    return this.capturedId !== undefined;
  }

  isScrollDisabled() {
    return this.disabledScroll.size > 0;
  }

  isDisabled(gestureName) {
    var disabled = this.disabledGestures.get(gestureName);

    if (disabled && disabled.size > 0) {
      return true;
    }

    return false;
  }

  newID() {
    this.gestureId++;
    return this.gestureId;
  }

}

class GestureDelegate {
  constructor(ctrl, id, name, priority, disableScroll) {
    this.id = id;
    this.name = name;
    this.disableScroll = disableScroll;
    this.priority = priority * 1000000 + id;
    this.ctrl = ctrl;
  }

  canStart() {
    if (!this.ctrl) {
      return false;
    }

    return this.ctrl.canStart(this.name);
  }

  start() {
    if (!this.ctrl) {
      return false;
    }

    return this.ctrl.start(this.name, this.id, this.priority);
  }

  capture() {
    if (!this.ctrl) {
      return false;
    }

    var captured = this.ctrl.capture(this.name, this.id, this.priority);

    if (captured && this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }

    return captured;
  }

  release() {
    if (this.ctrl) {
      this.ctrl.release(this.id);

      if (this.disableScroll) {
        this.ctrl.enableScroll(this.id);
      }
    }
  }

  destroy() {
    this.release();
    this.ctrl = undefined;
  }

}

class BlockerDelegate {
  constructor(ctrl, id, disable, disableScroll) {
    this.id = id;
    this.disable = disable;
    this.disableScroll = disableScroll;
    this.ctrl = ctrl;
  }

  block() {
    if (!this.ctrl) {
      return;
    }

    if (this.disable) {
      for (var gesture of this.disable) {
        this.ctrl.disableGesture(gesture, this.id);
      }
    }

    if (this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
  }

  unblock() {
    if (!this.ctrl) {
      return;
    }

    if (this.disable) {
      for (var gesture of this.disable) {
        this.ctrl.enableGesture(gesture, this.id);
      }
    }

    if (this.disableScroll) {
      this.ctrl.enableScroll(this.id);
    }
  }

  destroy() {
    this.unblock();
    this.ctrl = undefined;
  }

}

var BACKDROP_NO_SCROLL = 'backdrop-no-scroll';
var GESTURE_CONTROLLER = new GestureController();
exports.GESTURE_CONTROLLER = GESTURE_CONTROLLER;
  })();
});
require.register("@ionic/core/dist/cjs/hardware-back-button-87eee3af.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var startHardwareBackButton = () => {
  var doc = document;
  var busy = false;
  doc.addEventListener('backbutton', () => {
    if (busy) {
      return;
    }

    var index = 0;
    var handlers = [];
    var ev = new CustomEvent('ionBackButton', {
      bubbles: false,
      detail: {
        register(priority, handler) {
          handlers.push({
            priority,
            handler,
            id: index++
          });
        }

      }
    });
    doc.dispatchEvent(ev);

    var executeAction = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (handlerRegister) {
        try {
          if (handlerRegister && handlerRegister.handler) {
            var result = handlerRegister.handler(processHandlers);

            if (result != null) {
              yield result;
            }
          }
        } catch (e) {
          console.error(e);
        }
      });

      return function executeAction(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var processHandlers = () => {
      if (handlers.length > 0) {
        var selectedHandler = {
          priority: Number.MIN_SAFE_INTEGER,
          handler: () => undefined,
          id: -1
        };
        handlers.forEach(handler => {
          if (handler.priority >= selectedHandler.priority) {
            selectedHandler = handler;
          }
        });
        busy = true;
        handlers = handlers.filter(handler => handler.id !== selectedHandler.id);
        executeAction(selectedHandler).then(() => busy = false);
      }
    };

    processHandlers();
  });
};

var OVERLAY_BACK_BUTTON_PRIORITY = 100;
var MENU_BACK_BUTTON_PRIORITY = 99; // 1 less than overlay priority since menu is displayed behind overlays

exports.MENU_BACK_BUTTON_PRIORITY = MENU_BACK_BUTTON_PRIORITY;
exports.OVERLAY_BACK_BUTTON_PRIORITY = OVERLAY_BACK_BUTTON_PRIORITY;
exports.startHardwareBackButton = startHardwareBackButton;
  })();
});
require.register("@ionic/core/dist/cjs/helpers-7e840ed2.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';
/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `ion-input` should inherit
 * the `title` attribute that developers set directly on `ion-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */

var inheritAttributes = function inheritAttributes(el) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var attributeObject = {};
  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      var value = el.getAttribute(attr);

      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }

      el.removeAttribute(attr);
    }
  });
  return attributeObject;
};

var addEventListener = (el, eventName, callback, opts) => {
  if (typeof window !== 'undefined') {
    var win = window;
    var config = win && win.Ionic && win.Ionic.config;

    if (config) {
      var ael = config.get('_ael');

      if (ael) {
        return ael(el, eventName, callback, opts);
      } else if (config._ael) {
        return config._ael(el, eventName, callback, opts);
      }
    }
  }

  return el.addEventListener(eventName, callback, opts);
};

var removeEventListener = (el, eventName, callback, opts) => {
  if (typeof window !== 'undefined') {
    var win = window;
    var config = win && win.Ionic && win.Ionic.config;

    if (config) {
      var rel = config.get('_rel');

      if (rel) {
        return rel(el, eventName, callback, opts);
      } else if (config._rel) {
        return config._rel(el, eventName, callback, opts);
      }
    }
  }

  return el.removeEventListener(eventName, callback, opts);
};
/**
 * Gets the root context of a shadow dom element
 * On newer browsers this will be the shadowRoot,
 * but for older browser this may just be the
 * element itself.
 *
 * Useful for whenever you need to explicitly
 * do "myElement.shadowRoot!.querySelector(...)".
 */


var getElementRoot = function getElementRoot(el) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : el;
  return el.shadowRoot || fallback;
};
/**
 * Patched version of requestAnimationFrame that avoids ngzone
 * Use only when you know ngzone should not run
 */


var raf = h => {
  if (typeof __zone_symbol__requestAnimationFrame === 'function') {
    return __zone_symbol__requestAnimationFrame(h);
  }

  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(h);
  }

  return setTimeout(h);
};

var hasShadowDom = el => {
  return !!el.shadowRoot && !!el.attachShadow;
};

var findItemLabel = componentEl => {
  var itemEl = componentEl.closest('ion-item');

  if (itemEl) {
    return itemEl.querySelector('ion-label');
  }

  return null;
};
/**
 * This method is used for Ionic's input components that use Shadow DOM. In
 * order to properly label the inputs to work with screen readers, we need
 * to get the text content of the label outside of the shadow root and pass
 * it to the input inside of the shadow root.
 *
 * Referencing label elements by id from outside of the component is
 * impossible due to the shadow boundary, read more here:
 * https://developer.salesforce.com/blogs/2020/01/accessibility-for-web-components.html
 *
 * @param componentEl The shadow element that needs the aria label
 * @param inputId The unique identifier for the input
 */


var getAriaLabel = (componentEl, inputId) => {
  var labelText; // If the user provides their own label via the aria-labelledby attr
  // we should use that instead of looking for an ion-label

  var labelledBy = componentEl.getAttribute('aria-labelledby'); // Grab the id off of the component in case they are using
  // a custom label using the label element

  var componentId = componentEl.id;
  var labelId = labelledBy !== null && labelledBy.trim() !== '' ? labelledBy : inputId + '-lbl';
  var label = labelledBy !== null && labelledBy.trim() !== '' ? document.querySelector("#".concat(labelledBy)) : findItemLabel(componentEl);

  if (label) {
    if (labelledBy === null) {
      label.id = labelId;
    }

    labelText = label.textContent;
    label.setAttribute('aria-hidden', 'true'); // if there is no label, check to see if the user has provided
    // one by setting an id on the component and using the label element
  } else if (componentId.trim() !== '') {
    label = document.querySelector("label[for=".concat(componentId, "]"));

    if (label) {
      label.id = labelId = "".concat(componentId, "-lbl");
      labelText = label.textContent;
    }
  }

  return {
    label,
    labelId,
    labelText
  };
};
/**
 * This method is used to add a hidden input to a host element that contains
 * a Shadow DOM. It does not add the input inside of the Shadow root which
 * allows it to be picked up inside of forms. It should contain the same
 * values as the host element.
 *
 * @param always Add a hidden input even if the container does not use Shadow
 * @param container The element where the input will be added
 * @param name The name of the input
 * @param value The value of the input
 * @param disabled If true, the input is disabled
 */


var renderHiddenInput = (always, container, name, value, disabled) => {
  if (always || hasShadowDom(container)) {
    var input = container.querySelector('input.aux-input');

    if (!input) {
      input = container.ownerDocument.createElement('input');
      input.type = 'hidden';
      input.classList.add('aux-input');
      container.appendChild(input);
    }

    input.disabled = disabled;
    input.name = name;
    input.value = value || '';
  }
};

var clamp = (min, n, max) => {
  return Math.max(min, Math.min(n, max));
};

var assert = (actual, reason) => {
  if (!actual) {
    var message = 'ASSERT: ' + reason;
    console.error(message);
    debugger; // tslint:disable-line

    throw new Error(message);
  }
};

var now = ev => {
  return ev.timeStamp || Date.now();
};

var pointerCoord = ev => {
  // get X coordinates for either a mouse click
  // or a touch depending on the given event
  if (ev) {
    var changedTouches = ev.changedTouches;

    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0];
      return {
        x: touch.clientX,
        y: touch.clientY
      };
    }

    if (ev.pageX !== undefined) {
      return {
        x: ev.pageX,
        y: ev.pageY
      };
    }
  }

  return {
    x: 0,
    y: 0
  };
};
/**
 * @hidden
 * Given a side, return if it should be on the end
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 */


var isEndSide = side => {
  var isRTL = document.dir === 'rtl';

  switch (side) {
    case 'start':
      return isRTL;

    case 'end':
      return !isRTL;

    default:
      throw new Error("\"".concat(side, "\" is not a valid value for [side]. Use \"start\" or \"end\" instead."));
  }
};

var debounceEvent = (event, wait) => {
  var original = event._original || event;
  return {
    _original: event,
    emit: debounce(original.emit.bind(original), wait)
  };
};

var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var timer;
  return function () {
    clearTimeout(timer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    timer = setTimeout(func, wait, ...args);
  };
};

exports.addEventListener = addEventListener;
exports.assert = assert;
exports.clamp = clamp;
exports.debounce = debounce;
exports.debounceEvent = debounceEvent;
exports.findItemLabel = findItemLabel;
exports.getAriaLabel = getAriaLabel;
exports.getElementRoot = getElementRoot;
exports.hasShadowDom = hasShadowDom;
exports.inheritAttributes = inheritAttributes;
exports.isEndSide = isEndSide;
exports.now = now;
exports.pointerCoord = pointerCoord;
exports.raf = raf;
exports.removeEventListener = removeEventListener;
exports.renderHiddenInput = renderHiddenInput;
  })();
});
require.register("@ionic/core/dist/cjs/index-3d9409db.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var index = require('./index-a35cc20f.js');

var LIFECYCLE_WILL_ENTER = 'ionViewWillEnter';
var LIFECYCLE_DID_ENTER = 'ionViewDidEnter';
var LIFECYCLE_WILL_LEAVE = 'ionViewWillLeave';
var LIFECYCLE_DID_LEAVE = 'ionViewDidLeave';
var LIFECYCLE_WILL_UNLOAD = 'ionViewWillUnload';

var iosTransitionAnimation = () => Promise.resolve().then(function () {
  return require('./ios.transition-93930998.js');
});

var mdTransitionAnimation = () => Promise.resolve().then(function () {
  return require('./md.transition-407efd2b.js');
});

var transition = opts => {
  return new Promise((resolve, reject) => {
    index.writeTask(() => {
      beforeTransition(opts);
      runTransition(opts).then(result => {
        if (result.animation) {
          result.animation.destroy();
        }

        afterTransition(opts);
        resolve(result);
      }, error => {
        afterTransition(opts);
        reject(error);
      });
    });
  });
};

var beforeTransition = opts => {
  var enteringEl = opts.enteringEl;
  var leavingEl = opts.leavingEl;
  setZIndex(enteringEl, leavingEl, opts.direction);

  if (opts.showGoBack) {
    enteringEl.classList.add('can-go-back');
  } else {
    enteringEl.classList.remove('can-go-back');
  }

  setPageHidden(enteringEl, false);

  if (leavingEl) {
    setPageHidden(leavingEl, false);
  }
};

var runTransition = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (opts) {
    var animationBuilder = yield getAnimationBuilder(opts);
    var ani = animationBuilder && index.Build.isBrowser ? animation(animationBuilder, opts) : noAnimation(opts); // fast path for no animation

    return ani;
  });

  return function runTransition(_x) {
    return _ref.apply(this, arguments);
  };
}();

var afterTransition = opts => {
  var enteringEl = opts.enteringEl;
  var leavingEl = opts.leavingEl;
  enteringEl.classList.remove('ion-page-invisible');

  if (leavingEl !== undefined) {
    leavingEl.classList.remove('ion-page-invisible');
  }
};

var getAnimationBuilder = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (opts) {
    if (!opts.leavingEl || !opts.animated || opts.duration === 0) {
      return undefined;
    }

    if (opts.animationBuilder) {
      return opts.animationBuilder;
    }

    var getAnimation = opts.mode === 'ios' ? (yield iosTransitionAnimation()).iosTransitionAnimation : (yield mdTransitionAnimation()).mdTransitionAnimation;
    return getAnimation;
  });

  return function getAnimationBuilder(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var animation = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (animationBuilder, opts) {
    yield waitForReady(opts, true);
    var trans = animationBuilder(opts.baseEl, opts);
    fireWillEvents(opts.enteringEl, opts.leavingEl);
    var didComplete = yield playTransition(trans, opts);

    if (opts.progressCallback) {
      opts.progressCallback(undefined);
    }

    if (didComplete) {
      fireDidEvents(opts.enteringEl, opts.leavingEl);
    }

    return {
      hasCompleted: didComplete,
      animation: trans
    };
  });

  return function animation(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var noAnimation = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (opts) {
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    yield waitForReady(opts, false);
    fireWillEvents(enteringEl, leavingEl);
    fireDidEvents(enteringEl, leavingEl);
    return {
      hasCompleted: true
    };
  });

  return function noAnimation(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var waitForReady = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (opts, defaultDeep) {
    var deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;
    var promises = deep ? [deepReady(opts.enteringEl), deepReady(opts.leavingEl)] : [shallowReady(opts.enteringEl), shallowReady(opts.leavingEl)];
    yield Promise.all(promises);
    yield notifyViewReady(opts.viewIsReady, opts.enteringEl);
  });

  return function waitForReady(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var notifyViewReady = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (viewIsReady, enteringEl) {
    if (viewIsReady) {
      yield viewIsReady(enteringEl);
    }
  });

  return function notifyViewReady(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var playTransition = (trans, opts) => {
  var progressCallback = opts.progressCallback;
  var promise = new Promise(resolve => {
    trans.onFinish(currentStep => resolve(currentStep === 1));
  }); // cool, let's do this, start the transition

  if (progressCallback) {
    // this is a swipe to go back, just get the transition progress ready
    // kick off the swipe animation start
    trans.progressStart(true);
    progressCallback(trans);
  } else {
    // only the top level transition should actually start "play"
    // kick it off and let it play through
    // ******** DOM WRITE ****************
    trans.play();
  } // create a callback for when the animation is done


  return promise;
};

var fireWillEvents = (enteringEl, leavingEl) => {
  lifecycle(leavingEl, LIFECYCLE_WILL_LEAVE);
  lifecycle(enteringEl, LIFECYCLE_WILL_ENTER);
};

var fireDidEvents = (enteringEl, leavingEl) => {
  lifecycle(enteringEl, LIFECYCLE_DID_ENTER);
  lifecycle(leavingEl, LIFECYCLE_DID_LEAVE);
};

var lifecycle = (el, eventName) => {
  if (el) {
    var ev = new CustomEvent(eventName, {
      bubbles: false,
      cancelable: false
    });
    el.dispatchEvent(ev);
  }
};

var shallowReady = el => {
  if (el && el.componentOnReady) {
    return el.componentOnReady();
  }

  return Promise.resolve();
};

var deepReady = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (el) {
    var element = el;

    if (element) {
      if (element.componentOnReady != null) {
        var stencilEl = yield element.componentOnReady();

        if (stencilEl != null) {
          return;
        }
      }

      yield Promise.all(Array.from(element.children).map(deepReady));
    }
  });

  return function deepReady(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var setPageHidden = (el, hidden) => {
  if (hidden) {
    el.setAttribute('aria-hidden', 'true');
    el.classList.add('ion-page-hidden');
  } else {
    el.hidden = false;
    el.removeAttribute('aria-hidden');
    el.classList.remove('ion-page-hidden');
  }
};

var setZIndex = (enteringEl, leavingEl, direction) => {
  if (enteringEl !== undefined) {
    enteringEl.style.zIndex = direction === 'back' ? '99' : '101';
  }

  if (leavingEl !== undefined) {
    leavingEl.style.zIndex = '100';
  }
};

var getIonPageElement = element => {
  if (element.classList.contains('ion-page')) {
    return element;
  }

  var ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');

  if (ionPage) {
    return ionPage;
  } // idk, return the original element so at least something animates and we don't have a null pointer


  return element;
};

exports.LIFECYCLE_DID_ENTER = LIFECYCLE_DID_ENTER;
exports.LIFECYCLE_DID_LEAVE = LIFECYCLE_DID_LEAVE;
exports.LIFECYCLE_WILL_ENTER = LIFECYCLE_WILL_ENTER;
exports.LIFECYCLE_WILL_LEAVE = LIFECYCLE_WILL_LEAVE;
exports.LIFECYCLE_WILL_UNLOAD = LIFECYCLE_WILL_UNLOAD;
exports.deepReady = deepReady;
exports.getIonPageElement = getIonPageElement;
exports.lifecycle = lifecycle;
exports.setPageHidden = setPageHidden;
exports.transition = transition;
  })();
});
require.register("@ionic/core/dist/cjs/index-98d43f07.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

var gestureController = require('./gesture-controller-29adda71.js');

var addEventListener = (el, eventName, callback, opts) => {
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  var listenerOpts = supportsPassive(el) ? {
    'capture': !!opts.capture,
    'passive': !!opts.passive
  } : !!opts.capture;
  var add;
  var remove;

  if (el['__zone_symbol__addEventListener']) {
    add = '__zone_symbol__addEventListener';
    remove = '__zone_symbol__removeEventListener';
  } else {
    add = 'addEventListener';
    remove = 'removeEventListener';
  }

  el[add](eventName, callback, listenerOpts);
  return () => {
    el[remove](eventName, callback, listenerOpts);
  };
};

var supportsPassive = node => {
  if (_sPassive === undefined) {
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: () => {
          _sPassive = true;
        }
      });
      node.addEventListener('optsTest', () => {
        return;
      }, opts);
    } catch (e) {
      _sPassive = false;
    }
  }

  return !!_sPassive;
};

var _sPassive;

var MOUSE_WAIT = 2000;

var createPointerEvents = (el, pointerDown, pointerMove, pointerUp, options) => {
  var rmTouchStart;
  var rmTouchMove;
  var rmTouchEnd;
  var rmTouchCancel;
  var rmMouseStart;
  var rmMouseMove;
  var rmMouseUp;
  var lastTouchEvent = 0;

  var handleTouchStart = ev => {
    lastTouchEvent = Date.now() + MOUSE_WAIT;

    if (!pointerDown(ev)) {
      return;
    }

    if (!rmTouchMove && pointerMove) {
      rmTouchMove = addEventListener(el, 'touchmove', pointerMove, options);
    }

    if (!rmTouchEnd) {
      rmTouchEnd = addEventListener(el, 'touchend', handleTouchEnd, options);
    }

    if (!rmTouchCancel) {
      rmTouchCancel = addEventListener(el, 'touchcancel', handleTouchEnd, options);
    }
  };

  var handleMouseDown = ev => {
    if (lastTouchEvent > Date.now()) {
      return;
    }

    if (!pointerDown(ev)) {
      return;
    }

    if (!rmMouseMove && pointerMove) {
      rmMouseMove = addEventListener(getDocument(el), 'mousemove', pointerMove, options);
    }

    if (!rmMouseUp) {
      rmMouseUp = addEventListener(getDocument(el), 'mouseup', handleMouseUp, options);
    }
  };

  var handleTouchEnd = ev => {
    stopTouch();

    if (pointerUp) {
      pointerUp(ev);
    }
  };

  var handleMouseUp = ev => {
    stopMouse();

    if (pointerUp) {
      pointerUp(ev);
    }
  };

  var stopTouch = () => {
    if (rmTouchMove) {
      rmTouchMove();
    }

    if (rmTouchEnd) {
      rmTouchEnd();
    }

    if (rmTouchCancel) {
      rmTouchCancel();
    }

    rmTouchMove = rmTouchEnd = rmTouchCancel = undefined;
  };

  var stopMouse = () => {
    if (rmMouseMove) {
      rmMouseMove();
    }

    if (rmMouseUp) {
      rmMouseUp();
    }

    rmMouseMove = rmMouseUp = undefined;
  };

  var stop = () => {
    stopTouch();
    stopMouse();
  };

  var enable = function enable() {
    var isEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (!isEnabled) {
      if (rmTouchStart) {
        rmTouchStart();
      }

      if (rmMouseStart) {
        rmMouseStart();
      }

      rmTouchStart = rmMouseStart = undefined;
      stop();
    } else {
      if (!rmTouchStart) {
        rmTouchStart = addEventListener(el, 'touchstart', handleTouchStart, options);
      }

      if (!rmMouseStart) {
        rmMouseStart = addEventListener(el, 'mousedown', handleMouseDown, options);
      }
    }
  };

  var destroy = () => {
    enable(false);
    pointerUp = pointerMove = pointerDown = undefined;
  };

  return {
    enable,
    stop,
    destroy
  };
};

var getDocument = node => {
  return node instanceof Document ? node : node.ownerDocument;
};

var createPanRecognizer = (direction, thresh, maxAngle) => {
  var radians = maxAngle * (Math.PI / 180);
  var isDirX = direction === 'x';
  var maxCosine = Math.cos(radians);
  var threshold = thresh * thresh;
  var startX = 0;
  var startY = 0;
  var dirty = false;
  var isPan = 0;
  return {
    start(x, y) {
      startX = x;
      startY = y;
      isPan = 0;
      dirty = true;
    },

    detect(x, y) {
      if (!dirty) {
        return false;
      }

      var deltaX = x - startX;
      var deltaY = y - startY;
      var distance = deltaX * deltaX + deltaY * deltaY;

      if (distance < threshold) {
        return false;
      }

      var hypotenuse = Math.sqrt(distance);
      var cosine = (isDirX ? deltaX : deltaY) / hypotenuse;

      if (cosine > maxCosine) {
        isPan = 1;
      } else if (cosine < -maxCosine) {
        isPan = -1;
      } else {
        isPan = 0;
      }

      dirty = false;
      return true;
    },

    isGesture() {
      return isPan !== 0;
    },

    getDirection() {
      return isPan;
    }

  };
};

var createGesture = config => {
  var hasCapturedPan = false;
  var hasStartedPan = false;
  var hasFiredStart = true;
  var isMoveQueued = false;
  var finalConfig = Object.assign({
    disableScroll: false,
    direction: 'x',
    gesturePriority: 0,
    passive: true,
    maxAngle: 40,
    threshold: 10
  }, config);
  var canStart = finalConfig.canStart;
  var onWillStart = finalConfig.onWillStart;
  var onStart = finalConfig.onStart;
  var onEnd = finalConfig.onEnd;
  var notCaptured = finalConfig.notCaptured;
  var onMove = finalConfig.onMove;
  var threshold = finalConfig.threshold;
  var passive = finalConfig.passive;
  var blurOnStart = finalConfig.blurOnStart;
  var detail = {
    type: 'pan',
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    currentY: 0,
    velocityX: 0,
    velocityY: 0,
    deltaX: 0,
    deltaY: 0,
    currentTime: 0,
    event: undefined,
    data: undefined
  };
  var pan = createPanRecognizer(finalConfig.direction, finalConfig.threshold, finalConfig.maxAngle);
  var gesture = gestureController.GESTURE_CONTROLLER.createGesture({
    name: config.gestureName,
    priority: config.gesturePriority,
    disableScroll: config.disableScroll
  });

  var pointerDown = ev => {
    var timeStamp = now(ev);

    if (hasStartedPan || !hasFiredStart) {
      return false;
    }

    updateDetail(ev, detail);
    detail.startX = detail.currentX;
    detail.startY = detail.currentY;
    detail.startTime = detail.currentTime = timeStamp;
    detail.velocityX = detail.velocityY = detail.deltaX = detail.deltaY = 0;
    detail.event = ev; // Check if gesture can start

    if (canStart && canStart(detail) === false) {
      return false;
    } // Release fallback


    gesture.release(); // Start gesture

    if (!gesture.start()) {
      return false;
    }

    hasStartedPan = true;

    if (threshold === 0) {
      return tryToCapturePan();
    }

    pan.start(detail.startX, detail.startY);
    return true;
  };

  var pointerMove = ev => {
    // fast path, if gesture is currently captured
    // do minimum job to get user-land even dispatched
    if (hasCapturedPan) {
      if (!isMoveQueued && hasFiredStart) {
        isMoveQueued = true;
        calcGestureData(detail, ev);
        requestAnimationFrame(fireOnMove);
      }

      return;
    } // gesture is currently being detected


    calcGestureData(detail, ev);

    if (pan.detect(detail.currentX, detail.currentY)) {
      if (!pan.isGesture() || !tryToCapturePan()) {
        abortGesture();
      }
    }
  };

  var fireOnMove = () => {
    // Since fireOnMove is called inside a RAF, onEnd() might be called,
    // we must double check hasCapturedPan
    if (!hasCapturedPan) {
      return;
    }

    isMoveQueued = false;

    if (onMove) {
      onMove(detail);
    }
  };

  var tryToCapturePan = () => {
    if (gesture && !gesture.capture()) {
      return false;
    }

    hasCapturedPan = true;
    hasFiredStart = false; // reset start position since the real user-land event starts here
    // If the pan detector threshold is big, not resetting the start position
    // will cause a jump in the animation equal to the detector threshold.
    // the array of positions used to calculate the gesture velocity does not
    // need to be cleaned, more points in the positions array always results in a
    // more accurate value of the velocity.

    detail.startX = detail.currentX;
    detail.startY = detail.currentY;
    detail.startTime = detail.currentTime;

    if (onWillStart) {
      onWillStart(detail).then(fireOnStart);
    } else {
      fireOnStart();
    }

    return true;
  };

  var blurActiveElement = () => {
    /* tslint:disable-next-line */
    if (typeof document !== 'undefined') {
      var activeElement = document.activeElement;

      if (activeElement !== null && activeElement.blur) {
        activeElement.blur();
      }
    }
  };

  var fireOnStart = () => {
    if (blurOnStart) {
      blurActiveElement();
    }

    if (onStart) {
      onStart(detail);
    }

    hasFiredStart = true;
  };

  var reset = () => {
    hasCapturedPan = false;
    hasStartedPan = false;
    isMoveQueued = false;
    hasFiredStart = true;
    gesture.release();
  }; // END *************************


  var pointerUp = ev => {
    var tmpHasCaptured = hasCapturedPan;
    var tmpHasFiredStart = hasFiredStart;
    reset();

    if (!tmpHasFiredStart) {
      return;
    }

    calcGestureData(detail, ev); // Try to capture press

    if (tmpHasCaptured) {
      if (onEnd) {
        onEnd(detail);
      }

      return;
    } // Not captured any event


    if (notCaptured) {
      notCaptured(detail);
    }
  };

  var pointerEvents = createPointerEvents(finalConfig.el, pointerDown, pointerMove, pointerUp, {
    capture: false,
    passive
  });

  var abortGesture = () => {
    reset();
    pointerEvents.stop();

    if (notCaptured) {
      notCaptured(detail);
    }
  };

  return {
    enable() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!enable) {
        if (hasCapturedPan) {
          pointerUp(undefined);
        }

        reset();
      }

      pointerEvents.enable(enable);
    },

    destroy() {
      gesture.destroy();
      pointerEvents.destroy();
    }

  };
};

var calcGestureData = (detail, ev) => {
  if (!ev) {
    return;
  }

  var prevX = detail.currentX;
  var prevY = detail.currentY;
  var prevT = detail.currentTime;
  updateDetail(ev, detail);
  var currentX = detail.currentX;
  var currentY = detail.currentY;
  var timestamp = detail.currentTime = now(ev);
  var timeDelta = timestamp - prevT;

  if (timeDelta > 0 && timeDelta < 100) {
    var velocityX = (currentX - prevX) / timeDelta;
    var velocityY = (currentY - prevY) / timeDelta;
    detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
    detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
  }

  detail.deltaX = currentX - detail.startX;
  detail.deltaY = currentY - detail.startY;
  detail.event = ev;
};

var updateDetail = (ev, detail) => {
  // get X coordinates for either a mouse click
  // or a touch depending on the given event
  var x = 0;
  var y = 0;

  if (ev) {
    var changedTouches = ev.changedTouches;

    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else if (ev.pageX !== undefined) {
      x = ev.pageX;
      y = ev.pageY;
    }
  }

  detail.currentX = x;
  detail.currentY = y;
};

var now = ev => {
  return ev.timeStamp || Date.now();
};

exports.GESTURE_CONTROLLER = gestureController.GESTURE_CONTROLLER;
exports.createGesture = createGesture;
  })();
});
require.register("@ionic/core/dist/cjs/index-a35cc20f.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);

  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function get() {
            return e[k];
          }
        });
      }
    });
  }

  n['default'] = e;
  return Object.freeze(n);
}

var NAMESPACE = 'ionic';
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var queuePending = false;
var win = typeof window !== 'undefined' ? window : {};
var CSS = win.CSS;
var doc = win.document || {
  head: {}
};
var plt = {
  $flags$: 0,
  $resourcesUrl$: '',
  jmp: h => h(),
  raf: h => requestAnimationFrame(h),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts)
};

var supportsShadow = /*@__PURE__*/(() => (doc.head.attachShadow + '').indexOf('[native') > -1)();

var promiseResolve = v => Promise.resolve(v);

var supportsConstructibleStylesheets = /*@__PURE__*/(() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (e) {}

  return false;
})();

var addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
  if (listeners) {
    listeners.map((_ref) => {
      var [flags, name, method] = _ref;
      var target = getHostListenerTarget(elm, flags);
      var handler = hostListenerProxy(hostRef, method);
      var opts = hostListenerOpts(flags);
      plt.ael(target, name, handler, opts);
      (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
    });
  }
};

var hostListenerProxy = (hostRef, methodName) => ev => {
  try {
    {
      if (hostRef.$flags$ & 256
      /* isListenReady */
      ) {
          // instance is ready, let's call it's member method for this event
          hostRef.$lazyInstance$[methodName](ev);
        } else {
        (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
      }
    }
  } catch (e) {
    consoleError(e);
  }
};

var getHostListenerTarget = (elm, flags) => {
  if (flags & 4
  /* TargetDocument */
  ) return doc;
  if (flags & 8
  /* TargetWindow */
  ) return win;
  if (flags & 16
  /* TargetBody */
  ) return doc.body;
  return elm;
}; // prettier-ignore


var hostListenerOpts = flags => (flags & 2
/* Capture */
) !== 0;

var CONTENT_REF_ID = 'r';
var ORG_LOCATION_ID = 'o';
var SLOT_NODE_ID = 's';
var TEXT_NODE_ID = 't';
var HYDRATE_ID = 's-id';
var HYDRATED_STYLE_ID = 'sty-id';
var HYDRATE_CHILD_ID = 'c-id';
var HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
var XLINK_NS = 'http://www.w3.org/1999/xlink';

var createTime = function createTime(fnName) {
  var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  {
    return () => {
      return;
    };
  }
};

var uniqueTime = (key, measureText) => {
  {
    return () => {
      return;
    };
  }
};

var rootAppliedStyles = new WeakMap();

var registerStyle = (scopeId, cssText, allowCS) => {
  var style = styles.get(scopeId);

  if (supportsConstructibleStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    style.replace(cssText);
  } else {
    style = cssText;
  }

  styles.set(scopeId, style);
};

var addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
  var scopeId = getScopeId(cmpMeta, mode);
  var style = styles.get(scopeId); // if an element is NOT connected then getRootNode() will return the wrong root node
  // so the fallback is to always use the document for the root node in those cases

  styleContainerNode = styleContainerNode.nodeType === 11
  /* DocumentFragment */
  ? styleContainerNode : doc;

  if (style) {
    if (typeof style === 'string') {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      var appliedStyles = rootAppliedStyles.get(styleContainerNode);
      var styleElm;

      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = new Set());
      }

      if (!appliedStyles.has(scopeId)) {
        if (styleContainerNode.host && (styleElm = styleContainerNode.querySelector("[".concat(HYDRATED_STYLE_ID, "=\"").concat(scopeId, "\"]")))) {
          // This is only happening on native shadow-dom, do not needs CSS var shim
          styleElm.innerHTML = style;
        } else {
          if (plt.$cssShim$) {
            styleElm = plt.$cssShim$.createHostStyle(hostElm, scopeId, style, !!(cmpMeta.$flags$ & 10
            /* needsScopedEncapsulation */
            ));
            var newScopeId = styleElm['s-sc'];

            if (newScopeId) {
              scopeId = newScopeId; // we don't want to add this styleID to the appliedStyles Set
              // since the cssVarShim might need to apply several different
              // stylesheets for the same component

              appliedStyles = null;
            }
          } else {
            styleElm = doc.createElement('style');
            styleElm.innerHTML = style;
          }

          styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
        }

        if (appliedStyles) {
          appliedStyles.add(scopeId);
        }
      }
    } else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
      styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
    }
  }

  return scopeId;
};

var attachStyles = hostRef => {
  var cmpMeta = hostRef.$cmpMeta$;
  var elm = hostRef.$hostElement$;
  var flags = cmpMeta.$flags$;
  var endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
  var scopeId = addStyle(supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$, elm);

  if (flags & 10
  /* needsScopedEncapsulation */
  ) {
      // only required when we're NOT using native shadow dom (slot)
      // or this browser doesn't support native shadow dom
      // and this host element was NOT created with SSR
      // let's pick out the inner content for slot projection
      // create a node to represent where the original
      // content was first placed, which is useful later on
      // DOM WRITE!!
      elm['s-sc'] = scopeId;
      elm.classList.add(scopeId + '-h');

      if (flags & 2
      /* scopedCssEncapsulation */
      ) {
          elm.classList.add(scopeId + '-s');
        }
    }

  endAttachStyles();
};

var getScopeId = (cmp, mode) => 'sc-' + (mode && cmp.$flags$ & 32
/* hasMode */
? cmp.$tagName$ + '-' + mode : cmp.$tagName$);

var convertScopedToShadow = css => css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, '$1{'); // Private


var computeMode = elm => modeResolutionChain.map(h => h(elm)).find(m => !!m); // Public


var setMode = handler => modeResolutionChain.push(handler);

var getMode = ref => getHostRef(ref).$modeName$;
/**
 * Default style mode id
 */

/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */


var EMPTY_OBJ = {};
/**
 * Namespaces
 */

var SVG_NS = 'http://www.w3.org/2000/svg';
var HTML_NS = 'http://www.w3.org/1999/xhtml';

var isDef = v => v != null;

var isComplexType = o => {
  // https://jsperf.com/typeof-fn-object/5
  o = typeof o;
  return o === 'object' || o === 'function';
};
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;


var h = function h(nodeName, vnodeData) {
  var child = null;
  var key = null;
  var slotName = null;
  var simple = false;
  var lastSimple = false;
  var vNodeChildren = [];

  var walk = c => {
    for (var i = 0; i < c.length; i++) {
      child = c[i];

      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== 'boolean') {
        if (simple = typeof nodeName !== 'function' && !isComplexType(child)) {
          child = String(child);
        }

        if (simple && lastSimple) {
          // If the previous child was simple (string), we merge both
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          // Append a new vNode, if it's text, we create a text vNode
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }

        lastSimple = simple;
      }
    }
  };

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  walk(children);

  if (vnodeData) {
    // normalize class / classname attributes
    if (vnodeData.key) {
      key = vnodeData.key;
    }

    if (vnodeData.name) {
      slotName = vnodeData.name;
    }

    {
      var classData = vnodeData.className || vnodeData.class;

      if (classData) {
        vnodeData.class = typeof classData !== 'object' ? classData : Object.keys(classData).filter(k => classData[k]).join(' ');
      }
    }
  }

  if (typeof nodeName === 'function') {
    // nodeName is a functional component
    return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
  }

  var vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;

  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }

  {
    vnode.$key$ = key;
  }
  {
    vnode.$name$ = slotName;
  }
  return vnode;
};

var newVNode = (tag, text) => {
  var vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null
  };
  {
    vnode.$attrs$ = null;
  }
  {
    vnode.$key$ = null;
  }
  {
    vnode.$name$ = null;
  }
  return vnode;
};

var Host = {};

var isHost = node => node && node.$tag$ === Host;

var vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
};

var convertToPublic = node => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$
});

var convertToPrivate = node => {
  if (typeof node.vtag === 'function') {
    var vnodeData = Object.assign({}, node.vattrs);

    if (node.vkey) {
      vnodeData.key = node.vkey;
    }

    if (node.vname) {
      vnodeData.name = node.vname;
    }

    return h(node.vtag, vnodeData, ...(node.vchildren || []));
  }

  var vnode = newVNode(node.vtag, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */


var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    var isProp = isMemberInElement(elm, memberName);
    var ln = memberName.toLowerCase();

    if (memberName === 'class') {
      var classList = elm.classList;
      var oldClasses = parseClassList(oldValue);
      var newClasses = parseClassList(newValue);
      classList.remove(...oldClasses.filter(c => c && !newClasses.includes(c)));
      classList.add(...newClasses.filter(c => c && !oldClasses.includes(c)));
    } else if (memberName === 'style') {
      // update style attribute, css properties and values
      {
        for (var prop in oldValue) {
          if (!newValue || newValue[prop] == null) {
            if (prop.includes('-')) {
              elm.style.removeProperty(prop);
            } else {
              elm.style[prop] = '';
            }
          }
        }
      }

      for (var _prop in newValue) {
        if (!oldValue || newValue[_prop] !== oldValue[_prop]) {
          if (_prop.includes('-')) {
            elm.style.setProperty(_prop, newValue[_prop]);
          } else {
            elm.style[_prop] = newValue[_prop];
          }
        }
      }
    } else if (memberName === 'key') ;else if (memberName === 'ref') {
      // minifier will clean this up
      if (newValue) {
        newValue(elm);
      }
    } else if (!isProp && memberName[0] === 'o' && memberName[1] === 'n') {
      // Event Handlers
      // so if the member name starts with "on" and the 3rd characters is
      // a capital letter, and it's not already a member on the element,
      // then we're assuming it's an event listener
      if (memberName[2] === '-') {
        // on- prefixed events
        // allows to be explicit about the dom event to listen without any magic
        // under the hood:
        // <my-cmp on-click> // listens for "click"
        // <my-cmp on-Click> // listens for "Click"
        // <my-cmp on-ionChange> // listens for "ionChange"
        // <my-cmp on-EVENTS> // listens for "EVENTS"
        memberName = memberName.slice(3);
      } else if (isMemberInElement(win, ln)) {
        // standard event
        // the JSX attribute could have been "onMouseOver" and the
        // member name "onmouseover" is on the window's prototype
        // so let's add the listener "mouseover", which is all lowercased
        memberName = ln.slice(2);
      } else {
        // custom event
        // the JSX attribute could have been "onMyCustomEvent"
        // so let's trim off the "on" prefix and lowercase the first character
        // and add the listener "myCustomEvent"
        // except for the first character, we keep the event name case
        memberName = ln[2] + memberName.slice(3);
      }

      if (oldValue) {
        plt.rel(elm, memberName, oldValue, false);
      }

      if (newValue) {
        plt.ael(elm, memberName, newValue, false);
      }
    } else {
      // Set property if it exists and it's not a SVG
      var isComplex = isComplexType(newValue);

      if ((isProp || isComplex && newValue !== null) && !isSvg) {
        try {
          if (!elm.tagName.includes('-')) {
            var n = newValue == null ? '' : newValue; // Workaround for Safari, moving the <input> caret when re-assigning the same valued

            if (memberName === 'list') {
              isProp = false; // tslint:disable-next-line: triple-equals
            } else if (oldValue == null || elm[memberName] != n) {
              elm[memberName] = n;
            }
          } else {
            elm[memberName] = newValue;
          }
        } catch (e) {}
      }
      /**
       * Need to manually update attribute if:
       * - memberName is not an attribute
       * - if we are rendering the host element in order to reflect attribute
       * - if it's a SVG, since properties might not work in <svg>
       * - if the newValue is null/undefined or 'false'.
       */


      var xlink = false;
      {
        if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
          memberName = ln;
          xlink = true;
        }
      }

      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === '') {
          if (xlink) {
            elm.removeAttributeNS(XLINK_NS, memberName);
          } else {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4
      /* isHost */
      || isSvg) && !isComplex) {
        newValue = newValue === true ? '' : newValue;

        if (xlink) {
          elm.setAttributeNS(XLINK_NS, memberName, newValue);
        } else {
          elm.setAttribute(memberName, newValue);
        }
      }
    }
  }
};

var parseClassListRegex = /\s/;

var parseClassList = value => !value ? [] : value.split(parseClassListRegex);

var updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
  // if the element passed in is a shadow root, which is a document fragment
  // then we want to be adding attrs/props to the shadow root's "host" element
  // if it's not a shadow root, then we add attrs/props to the same element
  var elm = newVnode.$elm$.nodeType === 11
  /* DocumentFragment */
  && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  var oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || EMPTY_OBJ;
  var newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
  {
    // remove attributes no longer present on the vnode by setting them to undefined
    for (memberName in oldVnodeAttrs) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
      }
    }
  } // add new & update changed attributes

  for (memberName in newVnodeAttrs) {
    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
  }
};

var createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  // tslint:disable-next-line: prefer-const
  var newVNode = newParentVNode.$children$[childIndex];
  var i = 0;
  var elm;
  var childNode;
  var oldVNode;

  if (!useNativeShadowDom) {
    // remember for later we need to check to relocate nodes
    checkSlotRelocate = true;

    if (newVNode.$tag$ === 'slot') {
      if (scopeId) {
        // scoped css needs to add its scoped id to the parent element
        parentElm.classList.add(scopeId + '-s');
      }

      newVNode.$flags$ |= newVNode.$children$ ? // slot element has fallback content
      2
      /* isSlotFallback */
      : // slot element does not have fallback content
      1
      /* isSlotReference */
      ;
    }
  }

  if (newVNode.$text$ !== null) {
    // create text node
    elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
  } else if (newVNode.$flags$ & 1
  /* isSlotReference */
  ) {
      // create a slot reference node
      elm = newVNode.$elm$ = doc.createTextNode('');
    } else {
    if (!isSvgMode) {
      isSvgMode = newVNode.$tag$ === 'svg';
    } // create element


    elm = newVNode.$elm$ = doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$flags$ & 2
    /* isSlotFallback */
    ? 'slot-fb' : newVNode.$tag$);

    if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
      isSvgMode = false;
    } // add css classes, attrs, props, listeners, etc.


    {
      updateElement(null, newVNode, isSvgMode);
    }

    if (isDef(scopeId) && elm['s-si'] !== scopeId) {
      // if there is a scopeId and this is the initial render
      // then let's add the scopeId as a css class
      elm.classList.add(elm['s-si'] = scopeId);
    }

    if (newVNode.$children$) {
      for (i = 0; i < newVNode.$children$.length; ++i) {
        // create the node
        childNode = createElm(oldParentVNode, newVNode, i, elm); // return node could have been null

        if (childNode) {
          // append our new node
          elm.appendChild(childNode);
        }
      }
    }

    {
      if (newVNode.$tag$ === 'svg') {
        // Only reset the SVG context when we're exiting <svg> element
        isSvgMode = false;
      } else if (elm.tagName === 'foreignObject') {
        // Reenter SVG context when we're exiting <foreignObject> element
        isSvgMode = true;
      }
    }
  }

  {
    elm['s-hn'] = hostTagName;

    if (newVNode.$flags$ & (2
    /* isSlotFallback */
    | 1
    /* isSlotReference */
    )) {
      // remember the content reference comment
      elm['s-sr'] = true; // remember the content reference comment

      elm['s-cr'] = contentRef; // remember the slot name, or empty string for default slot

      elm['s-sn'] = newVNode.$name$ || ''; // check if we've got an old vnode for this slot

      oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];

      if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
        // we've got an old slot vnode and the wrapper is being replaced
        // so let's move the old slot content back to it's original location
        putBackInOriginalLocation(oldParentVNode.$elm$, false);
      }
    }
  }
  return elm;
};

var putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1
  /* isTmpDisconnected */
  ;
  var oldSlotChildNodes = parentElm.childNodes;

  for (var i = oldSlotChildNodes.length - 1; i >= 0; i--) {
    var childNode = oldSlotChildNodes[i];

    if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
      // // this child node in the old element is from another component
      // // remove this node from the old slot's parent
      // childNode.remove();
      // and relocate it back to it's original location
      parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode)); // remove the old original location comment entirely
      // later on the patch function will know what to do
      // and move this to the correct spot in need be

      childNode['s-ol'].remove();
      childNode['s-ol'] = undefined;
      checkSlotRelocate = true;
    }

    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }

  plt.$flags$ &= ~1
  /* isTmpDisconnected */
  ;
};

var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  var containerElm = parentElm['s-cr'] && parentElm['s-cr'].parentNode || parentElm;
  var childNode;

  if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }

  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx, parentElm);

      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        containerElm.insertBefore(childNode, referenceNode(before));
      }
    }
  }
};

var removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnode = vnodes[startIdx]) {
      elm = vnode.$elm$;
      callNodeRefs(vnode);
      {
        // we're removing this element
        // so it's possible we need to show slot fallback content now
        checkSlotFallbackVisibility = true;

        if (elm['s-ol']) {
          // remove the original location comment
          elm['s-ol'].remove();
        } else {
          // it's possible that child nodes of the node
          // that's being removed are slot nodes
          putBackInOriginalLocation(elm, true);
        }
      } // remove the vnode's element from the dom

      elm.remove();
    }
  }
};

var updateChildren = (parentElm, oldCh, newVNode, newCh) => {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var idxInOld = 0;
  var i = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  var node;
  var elmToMove;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      // Vnode might have been moved left
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
      }

      patch(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
      }

      patch(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // createKeyToOldIdx
      idxInOld = -1;
      {
        for (i = oldStartIdx; i <= oldEndIdx; ++i) {
          if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
            idxInOld = i;
            break;
          }
        }
      }

      if (idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];

        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
        } else {
          patch(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          node = elmToMove.$elm$;
        }

        newStartVnode = newCh[++newStartIdx];
      } else {
        // new element
        node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
        newStartVnode = newCh[++newStartIdx];
      }

      if (node) {
        {
          parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) {
    addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};

var isSameVnode = (vnode1, vnode2) => {
  // compare if two vnode to see if they're "technically" the same
  // need to have the same element tag, and same key to be the same
  if (vnode1.$tag$ === vnode2.$tag$) {
    if (vnode1.$tag$ === 'slot') {
      return vnode1.$name$ === vnode2.$name$;
    }

    {
      return vnode1.$key$ === vnode2.$key$;
    }
  }

  return false;
};

var referenceNode = node => {
  // this node was relocated to a new location in the dom
  // because of some other component's slot
  // but we still have an html comment in place of where
  // it's original location was according to it's original vdom
  return node && node['s-ol'] || node;
};

var parentReferenceNode = node => (node['s-ol'] ? node['s-ol'] : node).parentNode;

var patch = (oldVNode, newVNode) => {
  var elm = newVNode.$elm$ = oldVNode.$elm$;
  var oldChildren = oldVNode.$children$;
  var newChildren = newVNode.$children$;
  var tag = newVNode.$tag$;
  var text = newVNode.$text$;
  var defaultHolder;

  if (text === null) {
    {
      // test if we're rendering an svg element, or still rendering nodes inside of one
      // only add this to the when the compiler sees we're using an svg somewhere
      isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
    } // element node

    {
      if (tag === 'slot') ;else {
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(oldVNode, newVNode, isSvgMode);
      }
    }

    if (oldChildren !== null && newChildren !== null) {
      // looks like there's child vnodes for both the old and new vnodes
      updateChildren(elm, oldChildren, newVNode, newChildren);
    } else if (newChildren !== null) {
      // no old child vnodes, but there are new child vnodes to add
      if (oldVNode.$text$ !== null) {
        // the old vnode was text, so be sure to clear it out
        elm.textContent = '';
      } // add the new vnode children


      addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
    } else if (oldChildren !== null) {
      // no new child vnodes, but there are old child vnodes to remove
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }

    if (isSvgMode && tag === 'svg') {
      isSvgMode = false;
    }
  } else if (defaultHolder = elm['s-cr']) {
    // this element has slotted content
    defaultHolder.parentNode.textContent = text;
  } else if (oldVNode.$text$ !== text) {
    // update the text content for the text only vnode
    // and also only if the text is different than before
    elm.data = text;
  }
};

var updateFallbackSlotVisibility = elm => {
  // tslint:disable-next-line: prefer-const
  var childNodes = elm.childNodes;
  var childNode;
  var i;
  var ilen;
  var j;
  var slotNameAttr;
  var nodeType;

  for (i = 0, ilen = childNodes.length; i < ilen; i++) {
    childNode = childNodes[i];

    if (childNode.nodeType === 1
    /* ElementNode */
    ) {
        if (childNode['s-sr']) {
          // this is a slot fallback node
          // get the slot name for this slot reference node
          slotNameAttr = childNode['s-sn']; // by default always show a fallback slot node
          // then hide it if there are other slots in the light dom

          childNode.hidden = false;

          for (j = 0; j < ilen; j++) {
            if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
              // this sibling node is from a different component
              nodeType = childNodes[j].nodeType;

              if (slotNameAttr !== '') {
                // this is a named fallback slot node
                if (nodeType === 1
                /* ElementNode */
                && slotNameAttr === childNodes[j].getAttribute('slot')) {
                  childNode.hidden = true;
                  break;
                }
              } else {
                // this is a default fallback slot node
                // any element or text node (with content)
                // should hide the default fallback slot node
                if (nodeType === 1
                /* ElementNode */
                || nodeType === 3
                /* TextNode */
                && childNodes[j].textContent.trim() !== '') {
                  childNode.hidden = true;
                  break;
                }
              }
            }
          }
        } // keep drilling down


        updateFallbackSlotVisibility(childNode);
      }
  }
};

var relocateNodes = [];

var relocateSlotContent = elm => {
  // tslint:disable-next-line: prefer-const
  var childNode;
  var node;
  var hostContentNodes;
  var slotNameAttr;
  var relocateNodeData;
  var j;
  var i = 0;
  var childNodes = elm.childNodes;
  var ilen = childNodes.length;

  for (; i < ilen; i++) {
    childNode = childNodes[i];

    if (childNode['s-sr'] && (node = childNode['s-cr'])) {
      // first got the content reference comment node
      // then we got it's parent, which is where all the host content is in now
      hostContentNodes = node.parentNode.childNodes;
      slotNameAttr = childNode['s-sn'];

      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j];

        if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
          // let's do some relocating to its new home
          // but never relocate a content reference node
          // that is suppose to always represent the original content location
          if (isNodeLocatedInSlot(node, slotNameAttr)) {
            // it's possible we've already decided to relocate this node
            relocateNodeData = relocateNodes.find(r => r.$nodeToRelocate$ === node); // made some changes to slots
            // let's make sure we also double check
            // fallbacks are correctly hidden or shown

            checkSlotFallbackVisibility = true;
            node['s-sn'] = node['s-sn'] || slotNameAttr;

            if (relocateNodeData) {
              // previously we never found a slot home for this node
              // but turns out we did, so let's remember it now
              relocateNodeData.$slotRefNode$ = childNode;
            } else {
              // add to our list of nodes to relocate
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node
              });
            }

            if (node['s-sr']) {
              relocateNodes.map(relocateNode => {
                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                  relocateNodeData = relocateNodes.find(r => r.$nodeToRelocate$ === node);

                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                  }
                }
              });
            }
          } else if (!relocateNodes.some(r => r.$nodeToRelocate$ === node)) {
            // so far this element does not have a slot home, not setting slotRefNode on purpose
            // if we never find a home for this element then we'll need to hide it
            relocateNodes.push({
              $nodeToRelocate$: node
            });
          }
        }
      }
    }

    if (childNode.nodeType === 1
    /* ElementNode */
    ) {
        relocateSlotContent(childNode);
      }
  }
};

var isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
  if (nodeToRelocate.nodeType === 1
  /* ElementNode */
  ) {
      if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
        return true;
      }

      if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
        return true;
      }

      return false;
    }

  if (nodeToRelocate['s-sn'] === slotNameAttr) {
    return true;
  }

  return slotNameAttr === '';
};

var callNodeRefs = vNode => {
  {
    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
    vNode.$children$ && vNode.$children$.map(callNodeRefs);
  }
};

var renderVdom = (hostRef, renderFnResults) => {
  var hostElm = hostRef.$hostElement$;
  var cmpMeta = hostRef.$cmpMeta$;
  var oldVNode = hostRef.$vnode$ || newVNode(null, null);
  var rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;

  if (cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.map((_ref2) => {
      var [propName, attribute] = _ref2;
      return rootVnode.$attrs$[attribute] = hostElm[propName];
    });
  }

  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4
  /* isHost */
  ;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = hostElm.shadowRoot || hostElm;
  {
    scopeId = hostElm['s-sc'];
  }
  {
    contentRef = hostElm['s-cr'];
    useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1
    /* shadowDomEncapsulation */
    ) !== 0; // always reset

    checkSlotFallbackVisibility = false;
  } // synchronous patch

  patch(oldVNode, rootVnode);
  {
    // while we're moving nodes around existing nodes, temporarily disable
    // the disconnectCallback from working
    plt.$flags$ |= 1
    /* isTmpDisconnected */
    ;

    if (checkSlotRelocate) {
      relocateSlotContent(rootVnode.$elm$);
      var relocateData;
      var nodeToRelocate;
      var orgLocationNode;
      var parentNodeRef;
      var insertBeforeNode;
      var refNode;
      var i = 0;

      for (; i < relocateNodes.length; i++) {
        relocateData = relocateNodes[i];
        nodeToRelocate = relocateData.$nodeToRelocate$;

        if (!nodeToRelocate['s-ol']) {
          // add a reference node marking this node's original location
          // keep a reference to this node for later lookups
          orgLocationNode = doc.createTextNode('');
          orgLocationNode['s-nr'] = nodeToRelocate;
          nodeToRelocate.parentNode.insertBefore(nodeToRelocate['s-ol'] = orgLocationNode, nodeToRelocate);
        }
      }

      for (i = 0; i < relocateNodes.length; i++) {
        relocateData = relocateNodes[i];
        nodeToRelocate = relocateData.$nodeToRelocate$;

        if (relocateData.$slotRefNode$) {
          // by default we're just going to insert it directly
          // after the slot reference node
          parentNodeRef = relocateData.$slotRefNode$.parentNode;
          insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
          orgLocationNode = nodeToRelocate['s-ol'];

          while (orgLocationNode = orgLocationNode.previousSibling) {
            refNode = orgLocationNode['s-nr'];

            if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
              refNode = refNode.nextSibling;

              if (!refNode || !refNode['s-nr']) {
                insertBeforeNode = refNode;
                break;
              }
            }
          }

          if (!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode || nodeToRelocate.nextSibling !== insertBeforeNode) {
            // we've checked that it's worth while to relocate
            // since that the node to relocate
            // has a different next sibling or parent relocated
            if (nodeToRelocate !== insertBeforeNode) {
              if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                // probably a component in the index.html that doesn't have it's hostname set
                nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
              } // add it back to the dom but in its new home


              parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
            }
          }
        } else {
          // this node doesn't have a slot home to go to, so let's hide it
          if (nodeToRelocate.nodeType === 1
          /* ElementNode */
          ) {
              nodeToRelocate.hidden = true;
            }
        }
      }
    }

    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$);
    } // done moving nodes around
    // allow the disconnect callback to work again


    plt.$flags$ &= ~1
    /* isTmpDisconnected */
    ; // always reset

    relocateNodes.length = 0;
  }
};

var getElement = ref => getHostRef(ref).$hostElement$;

var createEvent = (ref, name, flags) => {
  var elm = getElement(ref);
  return {
    emit: detail => {
      return emitEvent(elm, name, {
        bubbles: !!(flags & 4
        /* Bubbles */
        ),
        composed: !!(flags & 2
        /* Composed */
        ),
        cancelable: !!(flags & 1
        /* Cancellable */
        ),
        detail
      });
    }
  };
};

var emitEvent = (elm, name, opts) => {
  var ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};

var attachToAncestor = (hostRef, ancestorComponent) => {
  if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
    ancestorComponent['s-p'].push(new Promise(r => hostRef.$onRenderResolve$ = r));
  }
};

var scheduleUpdate = (hostRef, isInitialLoad) => {
  {
    hostRef.$flags$ |= 16
    /* isQueuedForUpdate */
    ;
  }

  if (hostRef.$flags$ & 4
  /* isWaitingForChildren */
  ) {
      hostRef.$flags$ |= 512
      /* needsRerender */
      ;
      return;
    }

  attachToAncestor(hostRef, hostRef.$ancestorComponent$); // there is no ancestor component or the ancestor component
  // has already fired off its lifecycle update then
  // fire off the initial update

  var dispatch = () => dispatchHooks(hostRef, isInitialLoad);

  return writeTask(dispatch);
};

var dispatchHooks = (hostRef, isInitialLoad) => {
  var endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
  var instance = hostRef.$lazyInstance$;
  var promise;

  if (isInitialLoad) {
    {
      hostRef.$flags$ |= 256
      /* isListenReady */
      ;

      if (hostRef.$queuedListeners$) {
        hostRef.$queuedListeners$.map((_ref3) => {
          var [methodName, event] = _ref3;
          return safeCall(instance, methodName, event);
        });
        hostRef.$queuedListeners$ = null;
      }
    }
    {
      promise = safeCall(instance, 'componentWillLoad');
    }
  }

  {
    promise = then(promise, () => safeCall(instance, 'componentWillRender'));
  }
  endSchedule();
  return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
};

var updateComponent = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (hostRef, instance, isInitialLoad) {
    // updateComponent
    var elm = hostRef.$hostElement$;
    var endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    var rc = elm['s-rc'];

    if (isInitialLoad) {
      // DOM WRITE!
      attachStyles(hostRef);
    }

    var endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
      {
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // DOM WRITE!
        {
          renderVdom(hostRef, callRender(hostRef, instance));
        }
      }
    }

    if (plt.$cssShim$) {
      plt.$cssShim$.updateHost(elm);
    }

    if (rc) {
      // ok, so turns out there are some child host elements
      // waiting on this parent element to load
      // let's fire off all update callbacks waiting
      rc.map(cb => cb());
      elm['s-rc'] = undefined;
    }

    endRender();
    endUpdate();
    {
      var childrenPromises = elm['s-p'];

      var postUpdate = () => postUpdateComponent(hostRef);

      if (childrenPromises.length === 0) {
        postUpdate();
      } else {
        Promise.all(childrenPromises).then(postUpdate);
        hostRef.$flags$ |= 4
        /* isWaitingForChildren */
        ;
        childrenPromises.length = 0;
      }
    }
  });

  return function updateComponent(_x, _x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

var callRender = (hostRef, instance) => {
  try {
    instance = instance.render && instance.render();
    {
      hostRef.$flags$ &= ~16
      /* isQueuedForUpdate */
      ;
    }
    {
      hostRef.$flags$ |= 2
      /* hasRendered */
      ;
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }

  return instance;
};

var postUpdateComponent = hostRef => {
  var tagName = hostRef.$cmpMeta$.$tagName$;
  var elm = hostRef.$hostElement$;
  var endPostUpdate = createTime('postUpdate', tagName);
  var instance = hostRef.$lazyInstance$;
  var ancestorComponent = hostRef.$ancestorComponent$;

  if (!(hostRef.$flags$ & 64
  /* hasLoadedComponent */
  )) {
    hostRef.$flags$ |= 64
    /* hasLoadedComponent */
    ;
    {
      // DOM WRITE!
      addHydratedFlag(elm);
    }
    {
      safeCall(instance, 'componentDidLoad');
    }
    endPostUpdate();
    {
      hostRef.$onReadyResolve$(elm);

      if (!ancestorComponent) {
        appDidLoad();
      }
    }
  } else {
    {
      safeCall(instance, 'componentDidUpdate');
    }
    endPostUpdate();
  }

  {
    hostRef.$onInstanceResolve$(elm);
  } // load events fire from bottom to top
  // the deepest elements load first then bubbles up

  {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = undefined;
    }

    if (hostRef.$flags$ & 512
    /* needsRerender */
    ) {
        nextTick(() => scheduleUpdate(hostRef, false));
      }

    hostRef.$flags$ &= ~(4
    /* isWaitingForChildren */
    | 512
    /* needsRerender */
    );
  } // ( •_•)
  // ( •_•)>⌐■-■
  // (⌐■_■)
};

var forceUpdate = ref => {
  {
    var hostRef = getHostRef(ref);
    var isConnected = hostRef.$hostElement$.isConnected;

    if (isConnected && (hostRef.$flags$ & (2
    /* hasRendered */
    | 16
    /* isQueuedForUpdate */
    )) === 2
    /* hasRendered */
    ) {
        scheduleUpdate(hostRef, false);
      } // Returns "true" when the forced update was successfully scheduled


    return isConnected;
  }
};

var appDidLoad = who => {
  // on appload
  // we have finish the first big initial render
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(() => emitEvent(win, 'appload', {
    detail: {
      namespace: NAMESPACE
    }
  }));
};

var safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e);
    }
  }

  return undefined;
};

var then = (promise, thenFn) => {
  return promise && promise.then ? promise.then(thenFn) : thenFn();
};

var addHydratedFlag = elm => elm.classList.add('hydrated');

var initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
  var endHydrate = createTime('hydrateClient', tagName);
  var shadowRoot = hostElm.shadowRoot;
  var childRenderNodes = [];
  var slotNodes = [];
  var shadowRootNodes = shadowRoot ? [] : null;
  var vnode = hostRef.$vnode$ = newVNode(tagName, null);

  if (!plt.$orgLocNodes$) {
    initializeDocumentHydrate(doc.body, plt.$orgLocNodes$ = new Map());
  }

  hostElm[HYDRATE_ID] = hostId;
  hostElm.removeAttribute(HYDRATE_ID);
  clientHydrate(vnode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, hostElm, hostId);
  childRenderNodes.map(c => {
    var orgLocationId = c.$hostId$ + '.' + c.$nodeId$;
    var orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
    var node = c.$elm$;

    if (orgLocationNode && supportsShadow && orgLocationNode['s-en'] === '') {
      orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
    }

    if (!shadowRoot) {
      node['s-hn'] = tagName;

      if (orgLocationNode) {
        node['s-ol'] = orgLocationNode;
        node['s-ol']['s-nr'] = node;
      }
    }

    plt.$orgLocNodes$.delete(orgLocationId);
  });

  if (shadowRoot) {
    shadowRootNodes.map(shadowRootNode => {
      if (shadowRootNode) {
        shadowRoot.appendChild(shadowRootNode);
      }
    });
  }

  endHydrate();
};

var clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId) => {
  var childNodeType;
  var childIdSplt;
  var childVNode;
  var i;

  if (node.nodeType === 1
  /* ElementNode */
  ) {
      childNodeType = node.getAttribute(HYDRATE_CHILD_ID);

      if (childNodeType) {
        // got the node data from the element's attribute
        // `${hostId}.${nodeId}.${depth}.${index}`
        childIdSplt = childNodeType.split('.');

        if (childIdSplt[0] === hostId || childIdSplt[0] === '0') {
          childVNode = {
            $flags$: 0,
            $hostId$: childIdSplt[0],
            $nodeId$: childIdSplt[1],
            $depth$: childIdSplt[2],
            $index$: childIdSplt[3],
            $tag$: node.tagName.toLowerCase(),
            $elm$: node,
            $attrs$: null,
            $children$: null,
            $key$: null,
            $name$: null,
            $text$: null
          };
          childRenderNodes.push(childVNode);
          node.removeAttribute(HYDRATE_CHILD_ID); // this is a new child vnode
          // so ensure its parent vnode has the vchildren array

          if (!parentVNode.$children$) {
            parentVNode.$children$ = [];
          } // add our child vnode to a specific index of the vnode's children


          parentVNode.$children$[childVNode.$index$] = childVNode; // this is now the new parent vnode for all the next child checks

          parentVNode = childVNode;

          if (shadowRootNodes && childVNode.$depth$ === '0') {
            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
          }
        }
      } // recursively drill down, end to start so we can remove nodes


      for (i = node.childNodes.length - 1; i >= 0; i--) {
        clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.childNodes[i], hostId);
      }

      if (node.shadowRoot) {
        // keep drilling down through the shadow root nodes
        for (i = node.shadowRoot.childNodes.length - 1; i >= 0; i--) {
          clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.shadowRoot.childNodes[i], hostId);
        }
      }
    } else if (node.nodeType === 8
  /* CommentNode */
  ) {
      // `${COMMENT_TYPE}.${hostId}.${nodeId}.${depth}.${index}`
      childIdSplt = node.nodeValue.split('.');

      if (childIdSplt[1] === hostId || childIdSplt[1] === '0') {
        // comment node for either the host id or a 0 host id
        childNodeType = childIdSplt[0];
        childVNode = {
          $flags$: 0,
          $hostId$: childIdSplt[1],
          $nodeId$: childIdSplt[2],
          $depth$: childIdSplt[3],
          $index$: childIdSplt[4],
          $elm$: node,
          $attrs$: null,
          $children$: null,
          $key$: null,
          $name$: null,
          $tag$: null,
          $text$: null
        };

        if (childNodeType === TEXT_NODE_ID) {
          childVNode.$elm$ = node.nextSibling;

          if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3
          /* TextNode */
          ) {
              childVNode.$text$ = childVNode.$elm$.textContent;
              childRenderNodes.push(childVNode); // remove the text comment since it's no longer needed

              node.remove();

              if (!parentVNode.$children$) {
                parentVNode.$children$ = [];
              }

              parentVNode.$children$[childVNode.$index$] = childVNode;

              if (shadowRootNodes && childVNode.$depth$ === '0') {
                shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
              }
            }
        } else if (childVNode.$hostId$ === hostId) {
          // this comment node is specifcally for this host id
          if (childNodeType === SLOT_NODE_ID) {
            // `${SLOT_NODE_ID}.${hostId}.${nodeId}.${depth}.${index}.${slotName}`;
            childVNode.$tag$ = 'slot';

            if (childIdSplt[5]) {
              node['s-sn'] = childVNode.$name$ = childIdSplt[5];
            } else {
              node['s-sn'] = '';
            }

            node['s-sr'] = true;

            if (shadowRootNodes) {
              // browser support shadowRoot and this is a shadow dom component
              // create an actual slot element
              childVNode.$elm$ = doc.createElement(childVNode.$tag$);

              if (childVNode.$name$) {
                // add the slot name attribute
                childVNode.$elm$.setAttribute('name', childVNode.$name$);
              } // insert the new slot element before the slot comment


              node.parentNode.insertBefore(childVNode.$elm$, node); // remove the slot comment since it's not needed for shadow

              node.remove();

              if (childVNode.$depth$ === '0') {
                shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
              }
            }

            slotNodes.push(childVNode);

            if (!parentVNode.$children$) {
              parentVNode.$children$ = [];
            }

            parentVNode.$children$[childVNode.$index$] = childVNode;
          } else if (childNodeType === CONTENT_REF_ID) {
            // `${CONTENT_REF_ID}.${hostId}`;
            if (shadowRootNodes) {
              // remove the content ref comment since it's not needed for shadow
              node.remove();
            } else {
              hostElm['s-cr'] = node;
              node['s-cn'] = true;
            }
          }
        }
      }
    } else if (parentVNode && parentVNode.$tag$ === 'style') {
    var vnode = newVNode(null, node.textContent);
    vnode.$elm$ = node;
    vnode.$index$ = '0';
    parentVNode.$children$ = [vnode];
  }
};

var initializeDocumentHydrate = (node, orgLocNodes) => {
  if (node.nodeType === 1
  /* ElementNode */
  ) {
      var i = 0;

      for (; i < node.childNodes.length; i++) {
        initializeDocumentHydrate(node.childNodes[i], orgLocNodes);
      }

      if (node.shadowRoot) {
        for (i = 0; i < node.shadowRoot.childNodes.length; i++) {
          initializeDocumentHydrate(node.shadowRoot.childNodes[i], orgLocNodes);
        }
      }
    } else if (node.nodeType === 8
  /* CommentNode */
  ) {
      var childIdSplt = node.nodeValue.split('.');

      if (childIdSplt[0] === ORG_LOCATION_ID) {
        orgLocNodes.set(childIdSplt[1] + '.' + childIdSplt[2], node);
        node.nodeValue = ''; // useful to know if the original location is
        // the root light-dom of a shadow dom component

        node['s-en'] = childIdSplt[3];
      }
    }
};

var parsePropertyValue = (propValue, propType) => {
  // ensure this value is of the correct prop type
  if (propValue != null && !isComplexType(propValue)) {
    if (propType & 4
    /* Boolean */
    ) {
        // per the HTML spec, any string value means it is a boolean true value
        // but we'll cheat here and say that the string "false" is the boolean false
        return propValue === 'false' ? false : propValue === '' || !!propValue;
      }

    if (propType & 2
    /* Number */
    ) {
        // force it to be a number
        return parseFloat(propValue);
      }

    if (propType & 1
    /* String */
    ) {
        // could have been passed as a number or boolean
        // but we still want it as a string
        return String(propValue);
      } // redundant return here for better minification


    return propValue;
  } // not sure exactly what type we want
  // so no need to change to a different type


  return propValue;
};

var getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);

var setValue = (ref, propName, newVal, cmpMeta) => {
  // check our new property value against our internal value
  var hostRef = getHostRef(ref);
  var elm = hostRef.$hostElement$;
  var oldVal = hostRef.$instanceValues$.get(propName);
  var flags = hostRef.$flags$;
  var instance = hostRef.$lazyInstance$;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);

  if ((!(flags & 8
  /* isConstructingInstance */
  ) || oldVal === undefined) && newVal !== oldVal) {
    // gadzooks! the property's value has changed!!
    // set our new value!
    hostRef.$instanceValues$.set(propName, newVal);

    if (instance) {
      // get an array of method names of watch functions to call
      if (cmpMeta.$watchers$ && flags & 128
      /* isWatchReady */
      ) {
          var watchMethods = cmpMeta.$watchers$[propName];

          if (watchMethods) {
            // this instance is watching for when this property changed
            watchMethods.map(watchMethodName => {
              try {
                // fire off each of the watch methods that are watching this property
                instance[watchMethodName](newVal, oldVal, propName);
              } catch (e) {
                consoleError(e, elm);
              }
            });
          }
        }

      if ((flags & (2
      /* hasRendered */
      | 16
      /* isQueuedForUpdate */
      )) === 2
      /* hasRendered */
      ) {
          // looks like this value actually changed, so we've got work to do!
          // but only if we've already rendered, otherwise just chill out
          // queue that we need to do an update, but don't worry about queuing
          // up millions cuz this function ensures it only runs once
          scheduleUpdate(hostRef, false);
        }
    }
  }
};

var proxyComponent = (Cstr, cmpMeta, flags) => {
  if (cmpMeta.$members$) {
    if (Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers;
    } // It's better to have a const than two Object.entries()


    var members = Object.entries(cmpMeta.$members$);
    var prototype = Cstr.prototype;
    members.map((_ref5) => {
      var [memberName, [memberFlags]] = _ref5;

      if (memberFlags & 31
      /* Prop */
      || flags & 2
      /* proxyState */
      && memberFlags & 32
      /* State */
      ) {
        // proxyComponent - prop
        Object.defineProperty(prototype, memberName, {
          get() {
            // proxyComponent, get value
            return getValue(this, memberName);
          },

          set(newValue) {
            // proxyComponent, set value
            setValue(this, memberName, newValue, cmpMeta);
          },

          configurable: true,
          enumerable: true
        });
      } else if (flags & 1
      /* isElementConstructor */
      && memberFlags & 64
      /* Method */
      ) {
          // proxyComponent - method
          Object.defineProperty(prototype, memberName, {
            value() {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              var ref = getHostRef(this);
              return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
            }

          });
        }
    });

    if (flags & 1
    /* isElementConstructor */
    ) {
        var attrNameToPropName = new Map();

        prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
          plt.jmp(() => {
            var propName = attrNameToPropName.get(attrName);
            this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
          });
        }; // create an array of attributes to observe
        // and also create a map of html attribute name to js property name


        Cstr.observedAttributes = members.filter((_ref6) => {
          var [_, m] = _ref6;
          return m[0] & 15;
        }
        /* HasAttribute */
        ) // filter to only keep props that should match attributes
        .map((_ref7) => {
          var [propName, m] = _ref7;
          var attrName = m[1] || propName;
          attrNameToPropName.set(attrName, propName);

          if (m[0] & 512
          /* ReflectAttr */
          ) {
              cmpMeta.$attrsToReflect$.push([propName, attrName]);
            }

          return attrName;
        });
      }
  }

  return Cstr;
};

var initializeComponent = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (elm, hostRef, cmpMeta, hmrVersionId, Cstr) {
    // initializeComponent
    if ((hostRef.$flags$ & 32
    /* hasInitializedComponent */
    ) === 0) {
      {
        // we haven't initialized this element yet
        hostRef.$flags$ |= 32
        /* hasInitializedComponent */
        ; // lazy loaded components
        // request the component's implementation to be
        // wired up with the host element

        Cstr = loadModule(cmpMeta);

        if (Cstr.then) {
          // Await creates a micro-task avoid if possible
          var endLoad = uniqueTime();
          Cstr = yield Cstr;
          endLoad();
        }

        if (!Cstr.isProxied) {
          // we'eve never proxied this Constructor before
          // let's add the getters/setters to its prototype before
          // the first time we create an instance of the implementation
          {
            cmpMeta.$watchers$ = Cstr.watchers;
          }
          proxyComponent(Cstr, cmpMeta, 2
          /* proxyState */
          );
          Cstr.isProxied = true;
        }

        var endNewInstance = createTime('createInstance', cmpMeta.$tagName$); // ok, time to construct the instance
        // but let's keep track of when we start and stop
        // so that the getters/setters don't incorrectly step on data

        {
          hostRef.$flags$ |= 8
          /* isConstructingInstance */
          ;
        } // construct the lazy-loaded component implementation
        // passing the hostRef is very important during
        // construction in order to directly wire together the
        // host element and the lazy-loaded instance

        try {
          new Cstr(hostRef);
        } catch (e) {
          consoleError(e);
        }

        {
          hostRef.$flags$ &= ~8
          /* isConstructingInstance */
          ;
        }
        {
          hostRef.$flags$ |= 128
          /* isWatchReady */
          ;
        }
        endNewInstance();
        fireConnectedCallback(hostRef.$lazyInstance$);
      }

      if (Cstr.style) {
        // this component has styles but we haven't registered them yet
        var style = Cstr.style;

        if (typeof style !== 'string') {
          style = style[hostRef.$modeName$ = computeMode(elm)];
        }

        var _scopeId = getScopeId(cmpMeta, hostRef.$modeName$);

        if (!styles.has(_scopeId)) {
          var endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);

          if (cmpMeta.$flags$ & 8
          /* needsShadowDomShim */
          ) {
              style = yield Promise.resolve().then(function () {
                return require('./shadow-css-476b8fcf.js');
              }).then(m => m.scopeCss(style, _scopeId, false));
            }

          registerStyle(_scopeId, style, !!(cmpMeta.$flags$ & 1
          /* shadowDomEncapsulation */
          ));
          endRegisterStyles();
        }
      }
    } // we've successfully created a lazy instance


    var ancestorComponent = hostRef.$ancestorComponent$;

    var schedule = () => scheduleUpdate(hostRef, true);

    if (ancestorComponent && ancestorComponent['s-rc']) {
      // this is the intial load and this component it has an ancestor component
      // but the ancestor component has NOT fired its will update lifecycle yet
      // so let's just cool our jets and wait for the ancestor to continue first
      // this will get fired off when the ancestor component
      // finally gets around to rendering its lazy self
      // fire off the initial update
      ancestorComponent['s-rc'].push(schedule);
    } else {
      schedule();
    }
  });

  return function initializeComponent(_x4, _x5, _x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

var fireConnectedCallback = instance => {
  {
    safeCall(instance, 'connectedCallback');
  }
};

var connectedCallback = elm => {
  if ((plt.$flags$ & 1
  /* isTmpDisconnected */
  ) === 0) {
    var hostRef = getHostRef(elm);
    var cmpMeta = hostRef.$cmpMeta$;
    var endConnected = createTime('connectedCallback', cmpMeta.$tagName$);

    if (!(hostRef.$flags$ & 1
    /* hasConnected */
    )) {
      // first time this component has connected
      hostRef.$flags$ |= 1
      /* hasConnected */
      ;
      var hostId;
      {
        hostId = elm.getAttribute(HYDRATE_ID);

        if (hostId) {
          if (supportsShadow && cmpMeta.$flags$ & 1
          /* shadowDomEncapsulation */
          ) {
              var _scopeId2 = addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute('s-mode'));

              elm.classList.remove(_scopeId2 + '-h', _scopeId2 + '-s');
            }

          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }

      if (!hostId) {
        // initUpdate
        // if the slot polyfill is required we'll need to put some nodes
        // in here to act as original content anchors as we move nodes around
        // host element has been connected to the DOM
        if (cmpMeta.$flags$ & (4
        /* hasSlotRelocation */
        | 8
        /* needsShadowDomShim */
        )) {
          setContentReference(elm);
        }
      }

      {
        // find the first ancestor component (if there is one) and register
        // this component as one of the actively loading child components for its ancestor
        var ancestorComponent = elm;

        while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
          // climb up the ancestors looking for the first
          // component that hasn't finished its lifecycle update yet
          if (ancestorComponent.nodeType === 1
          /* ElementNode */
          && ancestorComponent.hasAttribute('s-id') && ancestorComponent['s-p'] || ancestorComponent['s-p']) {
            // we found this components first ancestor component
            // keep a reference to this component's ancestor component
            attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
            break;
          }
        }
      } // Lazy properties
      // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties

      if (cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map((_ref9) => {
          var [memberName, [memberFlags]] = _ref9;

          if (memberFlags & 31
          /* Prop */
          && elm.hasOwnProperty(memberName)) {
            var value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }

      {
        // connectedCallback, taskQueue, initialLoad
        // angular sets attribute AFTER connectCallback
        // https://github.com/angular/angular/issues/18909
        // https://github.com/angular/angular/issues/19940
        nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
      }
    } else {
      // not the first time this has connected
      // reattach any event listeners to the host
      // since they would have been removed when disconnected
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$); // fire off connectedCallback() on component instance

      fireConnectedCallback(hostRef.$lazyInstance$);
    }

    endConnected();
  }
};

var setContentReference = elm => {
  // only required when we're NOT using native shadow dom (slot)
  // or this browser doesn't support native shadow dom
  // and this host element was NOT created with SSR
  // let's pick out the inner content for slot projection
  // create a node to represent where the original
  // content was first placed, which is useful later on
  var contentRefElm = elm['s-cr'] = doc.createComment('');
  contentRefElm['s-cn'] = true;
  elm.insertBefore(contentRefElm, elm.firstChild);
};

var disconnectedCallback = elm => {
  if ((plt.$flags$ & 1
  /* isTmpDisconnected */
  ) === 0) {
    var hostRef = getHostRef(elm);
    var instance = hostRef.$lazyInstance$;
    {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map(rmListener => rmListener());
        hostRef.$rmListeners$ = undefined;
      }
    } // clear CSS var-shim tracking

    if (plt.$cssShim$) {
      plt.$cssShim$.removeHost(elm);
    }

    {
      safeCall(instance, 'disconnectedCallback');
    }
  }
};

var bootstrapLazy = function bootstrapLazy(lazyBundles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var endBootstrap = createTime();
  var cmpTags = [];
  var exclude = options.exclude || [];
  var customElements = win.customElements;
  var head = doc.head;
  var metaCharset = /*@__PURE__*/head.querySelector('meta[charset]');
  var visibilityStyle = /*@__PURE__*/doc.createElement('style');
  var deferredConnectedCallbacks = [];
  var styles = /*@__PURE__*/doc.querySelectorAll("[".concat(HYDRATED_STYLE_ID, "]"));
  var appLoadFallback;
  var isBootstrapping = true;
  var i = 0;
  Object.assign(plt, options);
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href;
  {
    // If the app is already hydrated there is not point to disable the
    // async queue. This will improve the first input delay
    plt.$flags$ |= 2
    /* appLoaded */
    ;
  }
  {
    for (; i < styles.length; i++) {
      registerStyle(styles[i].getAttribute(HYDRATED_STYLE_ID), convertScopedToShadow(styles[i].innerHTML), true);
    }
  }
  lazyBundles.map(lazyBundle => lazyBundle[1].map(compactMeta => {
    var cmpMeta = {
      $flags$: compactMeta[0],
      $tagName$: compactMeta[1],
      $members$: compactMeta[2],
      $listeners$: compactMeta[3]
    };
    {
      cmpMeta.$members$ = compactMeta[2];
    }
    {
      cmpMeta.$listeners$ = compactMeta[3];
    }
    {
      cmpMeta.$attrsToReflect$ = [];
    }
    {
      cmpMeta.$watchers$ = {};
    }

    if (!supportsShadow && cmpMeta.$flags$ & 1
    /* shadowDomEncapsulation */
    ) {
        cmpMeta.$flags$ |= 8
        /* needsShadowDomShim */
        ;
      }

    var tagName = cmpMeta.$tagName$;
    var HostElement = class extends HTMLElement {
      // StencilLazyHost
      constructor(self) {
        // @ts-ignore
        super(self);
        self = this;
        registerHost(self, cmpMeta);

        if (cmpMeta.$flags$ & 1
        /* shadowDomEncapsulation */
        ) {
            // this component is using shadow dom
            // and this browser supports shadow dom
            // add the read-only property "shadowRoot" to the host element
            // adding the shadow root build conditionals to minimize runtime
            if (supportsShadow) {
              {
                self.attachShadow({
                  mode: 'open',
                  delegatesFocus: !!(cmpMeta.$flags$ & 16
                  /* shadowDelegatesFocus */
                  )
                });
              }
            } else if (!('shadowRoot' in self)) {
              self.shadowRoot = self;
            }
          }
      }

      connectedCallback() {
        if (appLoadFallback) {
          clearTimeout(appLoadFallback);
          appLoadFallback = null;
        }

        if (isBootstrapping) {
          // connectedCallback will be processed once all components have been registered
          deferredConnectedCallbacks.push(this);
        } else {
          plt.jmp(() => connectedCallback(this));
        }
      }

      disconnectedCallback() {
        plt.jmp(() => disconnectedCallback(this));
      }

      componentOnReady() {
        return getHostRef(this).$onReadyPromise$;
      }

    };
    cmpMeta.$lazyBundleId$ = lazyBundle[0];

    if (!exclude.includes(tagName) && !customElements.get(tagName)) {
      cmpTags.push(tagName);
      customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1
      /* isElementConstructor */
      ));
    }
  }));
  {
    visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
    visibilityStyle.setAttribute('data-styles', '');
    head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
  } // Process deferred connectedCallbacks now all components have been registered

  isBootstrapping = false;

  if (deferredConnectedCallbacks.length) {
    deferredConnectedCallbacks.map(host => host.connectedCallback());
  } else {
    {
      plt.jmp(() => appLoadFallback = setTimeout(appDidLoad, 30));
    }
  } // Fallback appLoad event


  endBootstrap();
};

var getAssetPath = path => {
  var assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin ? assetUrl.href : assetUrl.pathname;
};

var hostRefs = new WeakMap();

var getHostRef = ref => hostRefs.get(ref);

var registerInstance = (lazyInstance, hostRef) => hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);

var registerHost = (elm, cmpMeta) => {
  var hostRef = {
    $flags$: 0,
    $hostElement$: elm,
    $cmpMeta$: cmpMeta,
    $instanceValues$: new Map()
  };
  {
    hostRef.$onInstancePromise$ = new Promise(r => hostRef.$onInstanceResolve$ = r);
  }
  {
    hostRef.$onReadyPromise$ = new Promise(r => hostRef.$onReadyResolve$ = r);
    elm['s-p'] = [];
    elm['s-rc'] = [];
  }
  addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
  return hostRefs.set(elm, hostRef);
};

var isMemberInElement = (elm, memberName) => memberName in elm;

var consoleError = (e, el) => (0, console.error)(e, el);

var cmpModules = /*@__PURE__*/new Map();

var loadModule = (cmpMeta, hostRef, hmrVersionId) => {
  // loadModuleImport
  var exportName = cmpMeta.$tagName$.replace(/-/g, '_');
  var bundleId = cmpMeta.$lazyBundleId$;
  var module = cmpModules.get(bundleId);

  if (module) {
    return module[exportName];
  }

  return Promise.resolve().then(function () {
    return /*#__PURE__*/_interopNamespace(require(
    /* webpackInclude: /\.entry\.js$/ */

    /* webpackExclude: /\.system\.entry\.js$/ */

    /* webpackMode: "lazy" */
    "./".concat(bundleId, ".entry.js")));
  }).then(importedModule => {
    {
      cmpModules.set(bundleId, importedModule);
    }
    return importedModule[exportName];
  }, consoleError);
};

var styles = new Map();
var modeResolutionChain = [];
var queueDomReads = [];
var queueDomWrites = [];

var queueTask = (queue, write) => cb => {
  queue.push(cb);

  if (!queuePending) {
    queuePending = true;

    if (write && plt.$flags$ & 4
    /* queueSync */
    ) {
        nextTick(flush);
      } else {
      plt.raf(flush);
    }
  }
};

var consume = queue => {
  for (var i = 0; i < queue.length; i++) {
    try {
      queue[i](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }

  queue.length = 0;
};

var flush = () => {
  // always force a bunch of medium callbacks to run, but still have
  // a throttle on how many can run in a certain time
  // DOM READS!!!
  consume(queueDomReads); // DOM WRITES!!!

  {
    consume(queueDomWrites);

    if (queuePending = queueDomReads.length > 0) {
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      plt.raf(flush);
    }
  }
};

var nextTick = /*@__PURE__*/cb => promiseResolve().then(cb);

var readTask = /*@__PURE__*/queueTask(queueDomReads, false);
var writeTask = /*@__PURE__*/queueTask(queueDomWrites, true);
var Build = {
  isDev: false,
  isBrowser: true,
  isServer: false,
  isTesting: false
};
exports.Build = Build;
exports.CSS = CSS;
exports.Host = Host;
exports.NAMESPACE = NAMESPACE;
exports.bootstrapLazy = bootstrapLazy;
exports.createEvent = createEvent;
exports.doc = doc;
exports.forceUpdate = forceUpdate;
exports.getAssetPath = getAssetPath;
exports.getElement = getElement;
exports.getMode = getMode;
exports.h = h;
exports.plt = plt;
exports.promiseResolve = promiseResolve;
exports.readTask = readTask;
exports.registerInstance = registerInstance;
exports.setMode = setMode;
exports.win = win;
exports.writeTask = writeTask;
  })();
});
require.register("@ionic/core/dist/cjs/index-e1bb33c3.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';
/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */

var sanitizeDOMString = untrustedString => {
  try {
    if (untrustedString instanceof IonicSafeString) {
      return untrustedString.value;
    }

    if (!isSanitizerEnabled() || typeof untrustedString !== 'string' || untrustedString === '') {
      return untrustedString;
    }
    /**
     * Create a document fragment
     * separate from the main DOM,
     * create a div to do our work in
     */


    var documentFragment = document.createDocumentFragment();
    var workingDiv = document.createElement('div');
    documentFragment.appendChild(workingDiv);
    workingDiv.innerHTML = untrustedString;
    /**
     * Remove any elements
     * that are blocked
     */

    blockedTags.forEach(blockedTag => {
      var getElementsToRemove = documentFragment.querySelectorAll(blockedTag);

      for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
        var element = getElementsToRemove[elementIndex];

        if (element.parentNode) {
          element.parentNode.removeChild(element);
        } else {
          documentFragment.removeChild(element);
        }
        /**
         * We still need to sanitize
         * the children of this element
         * as they are left behind
         */


        var childElements = getElementChildren(element);
        /* tslint:disable-next-line */

        for (var childIndex = 0; childIndex < childElements.length; childIndex++) {
          sanitizeElement(childElements[childIndex]);
        }
      }
    });
    /**
     * Go through remaining elements and remove
     * non-allowed attribs
     */
    // IE does not support .children on document fragments, only .childNodes

    var dfChildren = getElementChildren(documentFragment);
    /* tslint:disable-next-line */

    for (var childIndex = 0; childIndex < dfChildren.length; childIndex++) {
      sanitizeElement(dfChildren[childIndex]);
    } // Append document fragment to div


    var fragmentDiv = document.createElement('div');
    fragmentDiv.appendChild(documentFragment); // First child is always the div we did our work in

    var getInnerDiv = fragmentDiv.querySelector('div');
    return getInnerDiv !== null ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;
  } catch (err) {
    console.error(err);
    return '';
  }
};
/**
 * Clean up current element based on allowed attributes
 * and then recursively dig down into any child elements to
 * clean those up as well
 */


var sanitizeElement = element => {
  // IE uses childNodes, so ignore nodes that are not elements
  if (element.nodeType && element.nodeType !== 1) {
    return;
  }

  for (var i = element.attributes.length - 1; i >= 0; i--) {
    var attribute = element.attributes.item(i);
    var attributeName = attribute.name; // remove non-allowed attribs

    if (!allowedAttributes.includes(attributeName.toLowerCase())) {
      element.removeAttribute(attributeName);
      continue;
    } // clean up any allowed attribs
    // that attempt to do any JS funny-business


    var attributeValue = attribute.value;
    /* tslint:disable-next-line */

    if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {
      element.removeAttribute(attributeName);
    }
  }
  /**
   * Sanitize any nested children
   */


  var childElements = getElementChildren(element);
  /* tslint:disable-next-line */

  for (var _i = 0; _i < childElements.length; _i++) {
    sanitizeElement(childElements[_i]);
  }
};
/**
 * IE doesn't always support .children
 * so we revert to .childNodes instead
 */


var getElementChildren = el => {
  return el.children != null ? el.children : el.childNodes;
};

var isSanitizerEnabled = () => {
  var win = window;
  var config = win && win.Ionic && win.Ionic.config;

  if (config) {
    if (config.get) {
      return config.get('sanitizerEnabled', true);
    } else {
      return config.sanitizerEnabled === true || config.sanitizerEnabled === undefined;
    }
  }

  return true;
};

var allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];
var blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];

class IonicSafeString {
  constructor(value) {
    this.value = value;
  }

}

exports.IonicSafeString = IonicSafeString;
exports.sanitizeDOMString = sanitizeDOMString;
  })();
});
require.register("@ionic/core/dist/cjs/index-f22257b2.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ionicGlobal = require('./ionic-global-75ba08dd.js');

var animation = require('./animation-9929f2ae.js');

var hardwareBackButton = require('./hardware-back-button-87eee3af.js');
/**
 * baseAnimation
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */


var baseAnimation = isIos => {
  // https://material.io/guidelines/motion/movement.html#movement-movement-in-out-of-screen-bounds
  // https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves

  /**
   * "Apply the sharp curve to items temporarily leaving the screen that may return
   * from the same exit point. When they return, use the deceleration curve. On mobile,
   * this transition typically occurs over 300ms" -- MD Motion Guide
   */
  return animation.createAnimation().duration(isIos ? 400 : 300);
};
/**
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */


var menuOverlayAnimation = menu => {
  var closedX;
  var openedX;
  var width = menu.width + 8;
  var menuAnimation = animation.createAnimation();
  var backdropAnimation = animation.createAnimation();

  if (menu.isEndSide) {
    // right side
    closedX = width + 'px';
    openedX = '0px';
  } else {
    // left side
    closedX = -width + 'px';
    openedX = '0px';
  }

  menuAnimation.addElement(menu.menuInnerEl).fromTo('transform', "translateX(".concat(closedX, ")"), "translateX(".concat(openedX, ")"));
  var mode = ionicGlobal.getIonMode(menu);
  var isIos = mode === 'ios';
  var opacity = isIos ? 0.2 : 0.25;
  backdropAnimation.addElement(menu.backdropEl).fromTo('opacity', 0.01, opacity);
  return baseAnimation(isIos).addAnimation([menuAnimation, backdropAnimation]);
};
/**
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */


var menuPushAnimation = menu => {
  var contentOpenedX;
  var menuClosedX;
  var mode = ionicGlobal.getIonMode(menu);
  var width = menu.width;

  if (menu.isEndSide) {
    contentOpenedX = -width + 'px';
    menuClosedX = width + 'px';
  } else {
    contentOpenedX = width + 'px';
    menuClosedX = -width + 'px';
  }

  var menuAnimation = animation.createAnimation().addElement(menu.menuInnerEl).fromTo('transform', "translateX(".concat(menuClosedX, ")"), 'translateX(0px)');
  var contentAnimation = animation.createAnimation().addElement(menu.contentEl).fromTo('transform', 'translateX(0px)', "translateX(".concat(contentOpenedX, ")"));
  var backdropAnimation = animation.createAnimation().addElement(menu.backdropEl).fromTo('opacity', 0.01, 0.32);
  return baseAnimation(mode === 'ios').addAnimation([menuAnimation, contentAnimation, backdropAnimation]);
};
/**
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */


var menuRevealAnimation = menu => {
  var mode = ionicGlobal.getIonMode(menu);
  var openedX = menu.width * (menu.isEndSide ? -1 : 1) + 'px';
  var contentOpen = animation.createAnimation().addElement(menu.contentEl) // REVIEW
  .fromTo('transform', 'translateX(0px)', "translateX(".concat(openedX, ")"));
  return baseAnimation(mode === 'ios').addAnimation(contentOpen);
};

var createMenuController = () => {
  var menuAnimations = new Map();
  var menus = [];

  var open = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (menu) {
      var menuEl = yield get(menu);

      if (menuEl) {
        return menuEl.open();
      }

      return false;
    });

    return function open(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var close = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (menu) {
      var menuEl = yield menu !== undefined ? get(menu) : getOpen();

      if (menuEl !== undefined) {
        return menuEl.close();
      }

      return false;
    });

    return function close(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var toggle = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (menu) {
      var menuEl = yield get(menu);

      if (menuEl) {
        return menuEl.toggle();
      }

      return false;
    });

    return function toggle(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var enable = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* (shouldEnable, menu) {
      var menuEl = yield get(menu);

      if (menuEl) {
        menuEl.disabled = !shouldEnable;
      }

      return menuEl;
    });

    return function enable(_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  var swipeGesture = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(function* (shouldEnable, menu) {
      var menuEl = yield get(menu);

      if (menuEl) {
        menuEl.swipeGesture = shouldEnable;
      }

      return menuEl;
    });

    return function swipeGesture(_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  var isOpen = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* (menu) {
      if (menu != null) {
        var menuEl = yield get(menu);
        return menuEl !== undefined && menuEl.isOpen();
      } else {
        var _menuEl = yield getOpen();

        return _menuEl !== undefined;
      }
    });

    return function isOpen(_x8) {
      return _ref6.apply(this, arguments);
    };
  }();

  var isEnabled = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(function* (menu) {
      var menuEl = yield get(menu);

      if (menuEl) {
        return !menuEl.disabled;
      }

      return false;
    });

    return function isEnabled(_x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  var get = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(function* (menu) {
      yield waitUntilReady();

      if (menu === 'start' || menu === 'end') {
        // there could be more than one menu on the same side
        // so first try to get the enabled one
        var menuRef = find(m => m.side === menu && !m.disabled);

        if (menuRef) {
          return menuRef;
        } // didn't find a menu side that is enabled
        // so try to get the first menu side found


        return find(m => m.side === menu);
      } else if (menu != null) {
        // the menuId was not left or right
        // so try to get the menu by its "id"
        return find(m => m.menuId === menu);
      } // return the first enabled menu


      var menuEl = find(m => !m.disabled);

      if (menuEl) {
        return menuEl;
      } // get the first menu in the array, if one exists


      return menus.length > 0 ? menus[0].el : undefined;
    });

    return function get(_x10) {
      return _ref8.apply(this, arguments);
    };
  }();
  /**
   * Get the instance of the opened menu. Returns `null` if a menu is not found.
   */


  var getOpen = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(function* () {
      yield waitUntilReady();
      return _getOpenSync();
    });

    return function getOpen() {
      return _ref9.apply(this, arguments);
    };
  }();
  /**
   * Get all menu instances.
   */


  var getMenus = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(function* () {
      yield waitUntilReady();
      return getMenusSync();
    });

    return function getMenus() {
      return _ref10.apply(this, arguments);
    };
  }();
  /**
   * Get whether or not a menu is animating. Returns `true` if any
   * menu is currently animating.
   */


  var isAnimating = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(function* () {
      yield waitUntilReady();
      return isAnimatingSync();
    });

    return function isAnimating() {
      return _ref11.apply(this, arguments);
    };
  }();

  var registerAnimation = (name, animation) => {
    menuAnimations.set(name, animation);
  };

  var _register = menu => {
    if (menus.indexOf(menu) < 0) {
      if (!menu.disabled) {
        _setActiveMenu(menu);
      }

      menus.push(menu);
    }
  };

  var _unregister = menu => {
    var index = menus.indexOf(menu);

    if (index > -1) {
      menus.splice(index, 1);
    }
  };

  var _setActiveMenu = menu => {
    // if this menu should be enabled
    // then find all the other menus on this same side
    // and automatically disable other same side menus
    var side = menu.side;
    menus.filter(m => m.side === side && m !== menu).forEach(m => m.disabled = true);
  };

  var _setOpen = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(function* (menu, shouldOpen, animated) {
      if (isAnimatingSync()) {
        return false;
      }

      if (shouldOpen) {
        var openedMenu = yield getOpen();

        if (openedMenu && menu.el !== openedMenu) {
          yield openedMenu.setOpen(false, false);
        }
      }

      return menu._setOpen(shouldOpen, animated);
    });

    return function _setOpen(_x11, _x12, _x13) {
      return _ref12.apply(this, arguments);
    };
  }();

  var _createAnimation = (type, menuCmp) => {
    var animationBuilder = menuAnimations.get(type);

    if (!animationBuilder) {
      throw new Error('animation not registered');
    }

    var animation = animationBuilder(menuCmp);
    return animation;
  };

  var _getOpenSync = () => {
    return find(m => m._isOpen);
  };

  var getMenusSync = () => {
    return menus.map(menu => menu.el);
  };

  var isAnimatingSync = () => {
    return menus.some(menu => menu.isAnimating);
  };

  var find = predicate => {
    var instance = menus.find(predicate);

    if (instance !== undefined) {
      return instance.el;
    }

    return undefined;
  };

  var waitUntilReady = () => {
    return Promise.all(Array.from(document.querySelectorAll('ion-menu')).map(menu => menu.componentOnReady()));
  };

  registerAnimation('reveal', menuRevealAnimation);
  registerAnimation('push', menuPushAnimation);
  registerAnimation('overlay', menuOverlayAnimation);
  /* tslint:disable-next-line */

  if (typeof document !== 'undefined') {
    document.addEventListener('ionBackButton', ev => {
      var openMenu = _getOpenSync();

      if (openMenu) {
        ev.detail.register(hardwareBackButton.MENU_BACK_BUTTON_PRIORITY, () => {
          return openMenu.close();
        });
      }
    });
  }

  return {
    registerAnimation,
    get,
    getMenus,
    getOpen,
    isEnabled,
    swipeGesture,
    isAnimating,
    isOpen,
    enable,
    toggle,
    close,
    open,
    _getOpenSync,
    _createAnimation,
    _register,
    _unregister,
    _setOpen,
    _setActiveMenu
  };
};

var menuController = /*@__PURE__*/createMenuController();
exports.menuController = menuController;
  })();
});
require.register("@ionic/core/dist/cjs/index.cjs.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('./index-a35cc20f.js');

var ionicGlobal = require('./ionic-global-75ba08dd.js');

require('./helpers-7e840ed2.js');

var animation = require('./animation-9929f2ae.js');

var index$2 = require('./index-3d9409db.js');

var ios_transition = require('./ios.transition-93930998.js');

var md_transition = require('./md.transition-407efd2b.js');

var cubicBezier = require('./cubic-bezier-0b2ccc35.js');

require('./gesture-controller-29adda71.js');

var index = require('./index-98d43f07.js');

var index$1 = require('./index-e1bb33c3.js');

require('./hardware-back-button-87eee3af.js');

var index$3 = require('./index-f22257b2.js');

var overlays = require('./overlays-deffa27d.js');

var setupConfig = config => {
  var win = window;
  var Ionic = win.Ionic;

  if (Ionic && Ionic.config && Ionic.config.constructor.name !== 'Object') {
    console.error('ionic config was already initialized');
    return;
  }

  win.Ionic = win.Ionic || {};
  win.Ionic.config = Object.assign(Object.assign({}, win.Ionic.config), config);
  return win.Ionic.config;
};

var getMode = () => {
  var win = window;
  var config = win && win.Ionic && win.Ionic.config;

  if (config) {
    if (config.mode) {
      return config.mode;
    } else {
      return config.get('mode');
    }
  }

  return 'md';
};

exports.getPlatforms = ionicGlobal.getPlatforms;
exports.isPlatform = ionicGlobal.isPlatform;
exports.createAnimation = animation.createAnimation;
exports.LIFECYCLE_DID_ENTER = index$2.LIFECYCLE_DID_ENTER;
exports.LIFECYCLE_DID_LEAVE = index$2.LIFECYCLE_DID_LEAVE;
exports.LIFECYCLE_WILL_ENTER = index$2.LIFECYCLE_WILL_ENTER;
exports.LIFECYCLE_WILL_LEAVE = index$2.LIFECYCLE_WILL_LEAVE;
exports.LIFECYCLE_WILL_UNLOAD = index$2.LIFECYCLE_WILL_UNLOAD;
exports.iosTransitionAnimation = ios_transition.iosTransitionAnimation;
exports.mdTransitionAnimation = md_transition.mdTransitionAnimation;
exports.getTimeGivenProgression = cubicBezier.getTimeGivenProgression;
exports.createGesture = index.createGesture;
exports.IonicSafeString = index$1.IonicSafeString;
exports.menuController = index$3.menuController;
exports.actionSheetController = overlays.actionSheetController;
exports.alertController = overlays.alertController;
exports.loadingController = overlays.loadingController;
exports.modalController = overlays.modalController;
exports.pickerController = overlays.pickerController;
exports.popoverController = overlays.popoverController;
exports.toastController = overlays.toastController;
exports.getMode = getMode;
exports.setupConfig = setupConfig;
  })();
});
require.register("@ionic/core/dist/cjs/ionic-global-75ba08dd.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

var index = require('./index-a35cc20f.js');

var getPlatforms = win => setupPlatforms(win);

var isPlatform = (winOrPlatform, platform) => {
  if (typeof winOrPlatform === 'string') {
    platform = winOrPlatform;
    winOrPlatform = undefined;
  }

  return getPlatforms(winOrPlatform).includes(platform);
};

var setupPlatforms = function setupPlatforms() {
  var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  if (typeof win === 'undefined') {
    return [];
  }

  win.Ionic = win.Ionic || {};
  var platforms = win.Ionic.platforms;

  if (platforms == null) {
    platforms = win.Ionic.platforms = detectPlatforms(win);
    platforms.forEach(p => win.document.documentElement.classList.add("plt-".concat(p)));
  }

  return platforms;
};

var detectPlatforms = win => Object.keys(PLATFORMS_MAP).filter(p => PLATFORMS_MAP[p](win));

var isMobileWeb = win => isMobile(win) && !isHybrid(win);

var isIpad = win => {
  // iOS 12 and below
  if (testUserAgent(win, /iPad/i)) {
    return true;
  } // iOS 13+


  if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
    return true;
  }

  return false;
};

var isIphone = win => testUserAgent(win, /iPhone/i);

var isIOS = win => testUserAgent(win, /iPhone|iPod/i) || isIpad(win);

var isAndroid = win => testUserAgent(win, /android|sink/i);

var isAndroidTablet = win => {
  return isAndroid(win) && !testUserAgent(win, /mobile/i);
};

var isPhablet = win => {
  var width = win.innerWidth;
  var height = win.innerHeight;
  var smallest = Math.min(width, height);
  var largest = Math.max(width, height);
  return smallest > 390 && smallest < 520 && largest > 620 && largest < 800;
};

var isTablet = win => {
  var width = win.innerWidth;
  var height = win.innerHeight;
  var smallest = Math.min(width, height);
  var largest = Math.max(width, height);
  return isIpad(win) || isAndroidTablet(win) || smallest > 460 && smallest < 820 && largest > 780 && largest < 1400;
};

var isMobile = win => matchMedia(win, '(any-pointer:coarse)');

var isDesktop = win => !isMobile(win);

var isHybrid = win => isCordova(win) || isCapacitorNative(win);

var isCordova = win => !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);

var isCapacitorNative = win => {
  var capacitor = win['Capacitor'];
  return !!(capacitor && capacitor.isNative);
};

var isElectron = win => testUserAgent(win, /electron/i);

var isPWA = win => !!(win.matchMedia('(display-mode: standalone)').matches || win.navigator.standalone);

var testUserAgent = (win, expr) => expr.test(win.navigator.userAgent);

var matchMedia = (win, query) => win.matchMedia(query).matches;

var PLATFORMS_MAP = {
  'ipad': isIpad,
  'iphone': isIphone,
  'ios': isIOS,
  'android': isAndroid,
  'phablet': isPhablet,
  'tablet': isTablet,
  'cordova': isCordova,
  'capacitor': isCapacitorNative,
  'electron': isElectron,
  'pwa': isPWA,
  'mobile': isMobile,
  'mobileweb': isMobileWeb,
  'desktop': isDesktop,
  'hybrid': isHybrid
};

class Config {
  constructor() {
    this.m = new Map();
  }

  reset(configObj) {
    this.m = new Map(Object.entries(configObj));
  }

  get(key, fallback) {
    var value = this.m.get(key);
    return value !== undefined ? value : fallback;
  }

  getBoolean(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var val = this.m.get(key);

    if (val === undefined) {
      return fallback;
    }

    if (typeof val === 'string') {
      return val === 'true';
    }

    return !!val;
  }

  getNumber(key, fallback) {
    var val = parseFloat(this.m.get(key));
    return isNaN(val) ? fallback !== undefined ? fallback : NaN : val;
  }

  set(key, value) {
    this.m.set(key, value);
  }

}

var config = /*@__PURE__*/new Config();

var configFromSession = win => {
  try {
    var configStr = win.sessionStorage.getItem(IONIC_SESSION_KEY);
    return configStr !== null ? JSON.parse(configStr) : {};
  } catch (e) {
    return {};
  }
};

var saveConfig = (win, c) => {
  try {
    win.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(c));
  } catch (e) {
    return;
  }
};

var configFromURL = win => {
  var configObj = {};
  win.location.search.slice(1).split('&').map(entry => entry.split('=')).map((_ref) => {
    var [key, value] = _ref;
    return [decodeURIComponent(key), decodeURIComponent(value)];
  }).filter((_ref2) => {
    var [key] = _ref2;
    return startsWith(key, IONIC_PREFIX);
  }).map((_ref3) => {
    var [key, value] = _ref3;
    return [key.slice(IONIC_PREFIX.length), value];
  }).forEach((_ref4) => {
    var [key, value] = _ref4;
    configObj[key] = value;
  });
  return configObj;
};

var startsWith = (input, search) => {
  return input.substr(0, search.length) === search;
};

var IONIC_PREFIX = 'ionic:';
var IONIC_SESSION_KEY = 'ionic-persist-config';
var defaultMode;

var getIonMode = ref => {
  return ref && index.getMode(ref) || defaultMode;
};

var appGlobalScript = () => {
  var doc = document;
  var win = window;
  var Ionic = win.Ionic = win.Ionic || {}; // Setup platforms

  setupPlatforms(win); // create the Ionic.config from raw config object (if it exists)
  // and convert Ionic.config into a ConfigApi that has a get() fn

  var configObj = Object.assign(Object.assign(Object.assign(Object.assign({}, configFromSession(win)), {
    persistConfig: false
  }), Ionic.config), configFromURL(win));
  config.reset(configObj);

  if (config.getBoolean('persistConfig')) {
    saveConfig(win, configObj);
  } // first see if the mode was set as an attribute on <html>
  // which could have been set by the user, or by pre-rendering
  // otherwise get the mode via config settings, and fallback to md


  Ionic.config = config;
  Ionic.mode = defaultMode = config.get('mode', doc.documentElement.getAttribute('mode') || (isPlatform(win, 'ios') ? 'ios' : 'md'));
  config.set('mode', defaultMode);
  doc.documentElement.setAttribute('mode', defaultMode);
  doc.documentElement.classList.add(defaultMode);

  if (config.getBoolean('_testing')) {
    config.set('animated', false);
  }

  var isIonicElement = elm => elm.tagName && elm.tagName.startsWith('ION-');

  var isAllowedIonicModeValue = elmMode => ['ios', 'md'].includes(elmMode);

  index.setMode(elm => {
    while (elm) {
      var elmMode = elm.mode || elm.getAttribute('mode');

      if (elmMode) {
        if (isAllowedIonicModeValue(elmMode)) {
          return elmMode;
        } else if (isIonicElement(elm)) {
          console.warn('Invalid ionic mode: "' + elmMode + '", expected: "ios" or "md"');
        }
      }

      elm = elm.parentElement;
    }

    return defaultMode;
  });
};

exports.appGlobalScript = appGlobalScript;
exports.config = config;
exports.getIonMode = getIonMode;
exports.getPlatforms = getPlatforms;
exports.isPlatform = isPlatform;
  })();
});
require.register("@ionic/core/dist/cjs/ios.transition-93930998.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

require('./index-a35cc20f.js');

require('./helpers-7e840ed2.js');

var animation = require('./animation-9929f2ae.js');

var index = require('./index-3d9409db.js');

var DURATION = 540;

var getClonedElement = tagName => {
  return document.querySelector("".concat(tagName, ".ion-cloned-element"));
};

var shadow = el => {
  return el.shadowRoot || el;
};

var getLargeTitle = refEl => {
  var tabs = refEl.tagName === 'ION-TABS' ? refEl : refEl.querySelector('ion-tabs');
  var query = 'ion-header:not(.header-collapse-condense-inactive) ion-title.title-large';

  if (tabs != null) {
    var activeTab = tabs.querySelector('ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)');
    return activeTab != null ? activeTab.querySelector(query) : null;
  }

  return refEl.querySelector(query);
};

var getBackButton = (refEl, backDirection) => {
  var tabs = refEl.tagName === 'ION-TABS' ? refEl : refEl.querySelector('ion-tabs');
  var buttonsList = [];

  if (tabs != null) {
    var activeTab = tabs.querySelector('ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)');

    if (activeTab != null) {
      buttonsList = activeTab.querySelectorAll('ion-buttons');
    }
  } else {
    buttonsList = refEl.querySelectorAll('ion-buttons');
  }

  for (var buttons of buttonsList) {
    var parentHeader = buttons.closest('ion-header');
    var activeHeader = parentHeader && !parentHeader.classList.contains('header-collapse-condense-inactive');
    var backButton = buttons.querySelector('ion-back-button');
    var buttonsCollapse = buttons.classList.contains('buttons-collapse');
    var startSlot = buttons.slot === 'start' || buttons.slot === '';

    if (backButton !== null && startSlot && (buttonsCollapse && activeHeader && backDirection || !buttonsCollapse)) {
      return backButton;
    }
  }

  return null;
};

var createLargeTitleTransition = (rootAnimation, rtl, backDirection, enteringEl, leavingEl) => {
  var enteringBackButton = getBackButton(enteringEl, backDirection);
  var leavingLargeTitle = getLargeTitle(leavingEl);
  var enteringLargeTitle = getLargeTitle(enteringEl);
  var leavingBackButton = getBackButton(leavingEl, backDirection);
  var shouldAnimationForward = enteringBackButton !== null && leavingLargeTitle !== null && !backDirection;
  var shouldAnimationBackward = enteringLargeTitle !== null && leavingBackButton !== null && backDirection;

  if (shouldAnimationForward) {
    var leavingLargeTitleBox = leavingLargeTitle.getBoundingClientRect();
    var enteringBackButtonBox = enteringBackButton.getBoundingClientRect();
    animateLargeTitle(rootAnimation, rtl, backDirection, leavingLargeTitle, leavingLargeTitleBox, enteringBackButtonBox);
    animateBackButton(rootAnimation, rtl, backDirection, enteringBackButton, leavingLargeTitleBox, enteringBackButtonBox);
  } else if (shouldAnimationBackward) {
    var enteringLargeTitleBox = enteringLargeTitle.getBoundingClientRect();
    var leavingBackButtonBox = leavingBackButton.getBoundingClientRect();
    animateLargeTitle(rootAnimation, rtl, backDirection, enteringLargeTitle, enteringLargeTitleBox, leavingBackButtonBox);
    animateBackButton(rootAnimation, rtl, backDirection, leavingBackButton, enteringLargeTitleBox, leavingBackButtonBox);
  }

  return {
    forward: shouldAnimationForward,
    backward: shouldAnimationBackward
  };
};

var animateBackButton = (rootAnimation, rtl, backDirection, backButtonEl, largeTitleBox, backButtonBox) => {
  var BACK_BUTTON_START_OFFSET = rtl ? "calc(100% - ".concat(backButtonBox.right + 4, "px)") : "".concat(backButtonBox.left - 4, "px");
  var START_TEXT_TRANSLATE = rtl ? '7px' : '-7px';
  var END_TEXT_TRANSLATE = rtl ? '-4px' : '4px';
  var ICON_TRANSLATE = rtl ? '-4px' : '4px';
  var TEXT_ORIGIN_X = rtl ? 'right' : 'left';
  var ICON_ORIGIN_X = rtl ? 'left' : 'right';
  var FORWARD_TEXT_KEYFRAMES = [{
    offset: 0,
    opacity: 0,
    transform: "translate3d(".concat(START_TEXT_TRANSLATE, ", ").concat(largeTitleBox.top - 40, "px, 0) scale(2.1)")
  }, {
    offset: 1,
    opacity: 1,
    transform: "translate3d(".concat(END_TEXT_TRANSLATE, ", ").concat(backButtonBox.top - 46, "px, 0) scale(1)")
  }];
  var BACKWARD_TEXT_KEYFRAMES = [{
    offset: 0,
    opacity: 1,
    transform: "translate3d(".concat(END_TEXT_TRANSLATE, ", ").concat(backButtonBox.top - 46, "px, 0) scale(1)")
  }, {
    offset: 0.6,
    opacity: 0
  }, {
    offset: 1,
    opacity: 0,
    transform: "translate3d(".concat(START_TEXT_TRANSLATE, ", ").concat(largeTitleBox.top - 40, "px, 0) scale(2.1)")
  }];
  var TEXT_KEYFRAMES = backDirection ? BACKWARD_TEXT_KEYFRAMES : FORWARD_TEXT_KEYFRAMES;
  var FORWARD_ICON_KEYFRAMES = [{
    offset: 0,
    opacity: 0,
    transform: "translate3d(".concat(ICON_TRANSLATE, ", ").concat(backButtonBox.top - 41, "px, 0) scale(0.6)")
  }, {
    offset: 1,
    opacity: 1,
    transform: "translate3d(".concat(ICON_TRANSLATE, ", ").concat(backButtonBox.top - 46, "px, 0) scale(1)")
  }];
  var BACKWARD_ICON_KEYFRAMES = [{
    offset: 0,
    opacity: 1,
    transform: "translate3d(".concat(ICON_TRANSLATE, ", ").concat(backButtonBox.top - 46, "px, 0) scale(1)")
  }, {
    offset: 0.2,
    opacity: 0,
    transform: "translate3d(".concat(ICON_TRANSLATE, ", ").concat(backButtonBox.top - 41, "px, 0) scale(0.6)")
  }, {
    offset: 1,
    opacity: 0,
    transform: "translate3d(".concat(ICON_TRANSLATE, ", ").concat(backButtonBox.top - 41, "px, 0) scale(0.6)")
  }];
  var ICON_KEYFRAMES = backDirection ? BACKWARD_ICON_KEYFRAMES : FORWARD_ICON_KEYFRAMES;
  var enteringBackButtonTextAnimation = animation.createAnimation();
  var enteringBackButtonIconAnimation = animation.createAnimation();
  var clonedBackButtonEl = getClonedElement('ion-back-button');
  var backButtonTextEl = shadow(clonedBackButtonEl).querySelector('.button-text');
  var backButtonIconEl = shadow(clonedBackButtonEl).querySelector('ion-icon');
  clonedBackButtonEl.text = backButtonEl.text;
  clonedBackButtonEl.mode = backButtonEl.mode;
  clonedBackButtonEl.icon = backButtonEl.icon;
  clonedBackButtonEl.color = backButtonEl.color;
  clonedBackButtonEl.disabled = backButtonEl.disabled;
  clonedBackButtonEl.style.setProperty('display', 'block');
  clonedBackButtonEl.style.setProperty('position', 'fixed');
  enteringBackButtonIconAnimation.addElement(backButtonIconEl);
  enteringBackButtonTextAnimation.addElement(backButtonTextEl);
  enteringBackButtonTextAnimation.beforeStyles({
    'transform-origin': "".concat(TEXT_ORIGIN_X, " center")
  }).beforeAddWrite(() => {
    backButtonEl.style.setProperty('display', 'none');
    clonedBackButtonEl.style.setProperty(TEXT_ORIGIN_X, BACK_BUTTON_START_OFFSET);
  }).afterAddWrite(() => {
    backButtonEl.style.setProperty('display', '');
    clonedBackButtonEl.style.setProperty('display', 'none');
    clonedBackButtonEl.style.removeProperty(TEXT_ORIGIN_X);
  }).keyframes(TEXT_KEYFRAMES);
  enteringBackButtonIconAnimation.beforeStyles({
    'transform-origin': "".concat(ICON_ORIGIN_X, " center")
  }).keyframes(ICON_KEYFRAMES);
  rootAnimation.addAnimation([enteringBackButtonTextAnimation, enteringBackButtonIconAnimation]);
};

var animateLargeTitle = (rootAnimation, rtl, backDirection, largeTitleEl, largeTitleBox, backButtonBox) => {
  var TITLE_START_OFFSET = rtl ? "calc(100% - ".concat(largeTitleBox.right, "px)") : "".concat(largeTitleBox.left, "px");
  var START_TRANSLATE = rtl ? '-18px' : '18px';
  var ORIGIN_X = rtl ? 'right' : 'left';
  var BACKWARDS_KEYFRAMES = [{
    offset: 0,
    opacity: 0,
    transform: "translate3d(".concat(START_TRANSLATE, ", ").concat(backButtonBox.top - 4, "px, 0) scale(0.49)")
  }, {
    offset: 0.1,
    opacity: 0
  }, {
    offset: 1,
    opacity: 1,
    transform: "translate3d(0, ".concat(largeTitleBox.top - 2, "px, 0) scale(1)")
  }];
  var FORWARDS_KEYFRAMES = [{
    offset: 0,
    opacity: 0.99,
    transform: "translate3d(0, ".concat(largeTitleBox.top - 2, "px, 0) scale(1)")
  }, {
    offset: 0.6,
    opacity: 0
  }, {
    offset: 1,
    opacity: 0,
    transform: "translate3d(".concat(START_TRANSLATE, ", ").concat(backButtonBox.top - 4, "px, 0) scale(0.5)")
  }];
  var KEYFRAMES = backDirection ? BACKWARDS_KEYFRAMES : FORWARDS_KEYFRAMES;
  var clonedTitleEl = getClonedElement('ion-title');
  var clonedLargeTitleAnimation = animation.createAnimation();
  clonedTitleEl.innerText = largeTitleEl.innerText;
  clonedTitleEl.size = largeTitleEl.size;
  clonedTitleEl.color = largeTitleEl.color;
  clonedLargeTitleAnimation.addElement(clonedTitleEl);
  clonedLargeTitleAnimation.beforeStyles({
    'transform-origin': "".concat(ORIGIN_X, " center"),
    'height': '46px',
    'display': '',
    'position': 'relative',
    [ORIGIN_X]: TITLE_START_OFFSET
  }).beforeAddWrite(() => {
    largeTitleEl.style.setProperty('display', 'none');
  }).afterAddWrite(() => {
    largeTitleEl.style.setProperty('display', '');
    clonedTitleEl.style.setProperty('display', 'none');
  }).keyframes(KEYFRAMES);
  rootAnimation.addAnimation(clonedLargeTitleAnimation);
};

var iosTransitionAnimation = (navEl, opts) => {
  try {
    var EASING = 'cubic-bezier(0.32,0.72,0,1)';
    var OPACITY = 'opacity';
    var TRANSFORM = 'transform';
    var CENTER = '0%';
    var OFF_OPACITY = 0.8;
    var isRTL = navEl.ownerDocument.dir === 'rtl';
    var OFF_RIGHT = isRTL ? '-99.5%' : '99.5%';
    var OFF_LEFT = isRTL ? '33%' : '-33%';
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    var backDirection = opts.direction === 'back';
    var contentEl = enteringEl.querySelector(':scope > ion-content');
    var headerEls = enteringEl.querySelectorAll(':scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *');
    var enteringToolBarEls = enteringEl.querySelectorAll(':scope > ion-header > ion-toolbar');
    var rootAnimation = animation.createAnimation();
    var enteringContentAnimation = animation.createAnimation();
    rootAnimation.addElement(enteringEl).duration(opts.duration || DURATION).easing(opts.easing || EASING).fill('both').beforeRemoveClass('ion-page-invisible');

    if (leavingEl && navEl) {
      var navDecorAnimation = animation.createAnimation();
      navDecorAnimation.addElement(navEl);
      rootAnimation.addAnimation(navDecorAnimation);
    }

    if (!contentEl && enteringToolBarEls.length === 0 && headerEls.length === 0) {
      enteringContentAnimation.addElement(enteringEl.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs')); // REVIEW
    } else {
      enteringContentAnimation.addElement(contentEl); // REVIEW

      enteringContentAnimation.addElement(headerEls);
    }

    rootAnimation.addAnimation(enteringContentAnimation);

    if (backDirection) {
      enteringContentAnimation.beforeClearStyles([OPACITY]).fromTo('transform', "translateX(".concat(OFF_LEFT, ")"), "translateX(".concat(CENTER, ")")).fromTo(OPACITY, OFF_OPACITY, 1);
    } else {
      // entering content, forward direction
      enteringContentAnimation.beforeClearStyles([OPACITY]).fromTo('transform', "translateX(".concat(OFF_RIGHT, ")"), "translateX(".concat(CENTER, ")"));
    }

    if (contentEl) {
      var enteringTransitionEffectEl = shadow(contentEl).querySelector('.transition-effect');

      if (enteringTransitionEffectEl) {
        var enteringTransitionCoverEl = enteringTransitionEffectEl.querySelector('.transition-cover');
        var enteringTransitionShadowEl = enteringTransitionEffectEl.querySelector('.transition-shadow');
        var enteringTransitionEffect = animation.createAnimation();
        var enteringTransitionCover = animation.createAnimation();
        var enteringTransitionShadow = animation.createAnimation();
        enteringTransitionEffect.addElement(enteringTransitionEffectEl).beforeStyles({
          opacity: '1',
          display: 'block'
        }).afterStyles({
          opacity: '',
          display: ''
        });
        enteringTransitionCover.addElement(enteringTransitionCoverEl) // REVIEW
        .beforeClearStyles([OPACITY]).fromTo(OPACITY, 0, 0.1);
        enteringTransitionShadow.addElement(enteringTransitionShadowEl) // REVIEW
        .beforeClearStyles([OPACITY]).fromTo(OPACITY, 0.03, 0.70);
        enteringTransitionEffect.addAnimation([enteringTransitionCover, enteringTransitionShadow]);
        enteringContentAnimation.addAnimation([enteringTransitionEffect]);
      }
    }

    var enteringContentHasLargeTitle = enteringEl.querySelector('ion-header.header-collapse-condense');
    var {
      forward,
      backward
    } = createLargeTitleTransition(rootAnimation, isRTL, backDirection, enteringEl, leavingEl);
    enteringToolBarEls.forEach(enteringToolBarEl => {
      var enteringToolBar = animation.createAnimation();
      enteringToolBar.addElement(enteringToolBarEl);
      rootAnimation.addAnimation(enteringToolBar);
      var enteringTitle = animation.createAnimation();
      enteringTitle.addElement(enteringToolBarEl.querySelector('ion-title')); // REVIEW

      var enteringToolBarButtons = animation.createAnimation();
      var buttons = Array.from(enteringToolBarEl.querySelectorAll('ion-buttons,[menuToggle]'));
      var parentHeader = enteringToolBarEl.closest('ion-header');
      var inactiveHeader = parentHeader && parentHeader.classList.contains('header-collapse-condense-inactive');
      var buttonsToAnimate;

      if (backDirection) {
        buttonsToAnimate = buttons.filter(button => {
          var isCollapseButton = button.classList.contains('buttons-collapse');
          return isCollapseButton && !inactiveHeader || !isCollapseButton;
        });
      } else {
        buttonsToAnimate = buttons.filter(button => !button.classList.contains('buttons-collapse'));
      }

      enteringToolBarButtons.addElement(buttonsToAnimate);
      var enteringToolBarItems = animation.createAnimation();
      enteringToolBarItems.addElement(enteringToolBarEl.querySelectorAll(':scope > *:not(ion-title):not(ion-buttons):not([menuToggle])'));
      var enteringToolBarBg = animation.createAnimation();
      enteringToolBarBg.addElement(shadow(enteringToolBarEl).querySelector('.toolbar-background')); // REVIEW

      var enteringBackButton = animation.createAnimation();
      var backButtonEl = enteringToolBarEl.querySelector('ion-back-button');

      if (backButtonEl) {
        enteringBackButton.addElement(backButtonEl);
      }

      enteringToolBar.addAnimation([enteringTitle, enteringToolBarButtons, enteringToolBarItems, enteringToolBarBg, enteringBackButton]);
      enteringToolBarButtons.fromTo(OPACITY, 0.01, 1);
      enteringToolBarItems.fromTo(OPACITY, 0.01, 1);

      if (backDirection) {
        if (!inactiveHeader) {
          enteringTitle.fromTo('transform', "translateX(".concat(OFF_LEFT, ")"), "translateX(".concat(CENTER, ")")).fromTo(OPACITY, 0.01, 1);
        }

        enteringToolBarItems.fromTo('transform', "translateX(".concat(OFF_LEFT, ")"), "translateX(".concat(CENTER, ")")); // back direction, entering page has a back button

        enteringBackButton.fromTo(OPACITY, 0.01, 1);
      } else {
        // entering toolbar, forward direction
        if (!enteringContentHasLargeTitle) {
          enteringTitle.fromTo('transform', "translateX(".concat(OFF_RIGHT, ")"), "translateX(".concat(CENTER, ")")).fromTo(OPACITY, 0.01, 1);
        }

        enteringToolBarItems.fromTo('transform', "translateX(".concat(OFF_RIGHT, ")"), "translateX(".concat(CENTER, ")"));
        enteringToolBarBg.beforeClearStyles([OPACITY, 'transform']);
        var translucentHeader = parentHeader === null || parentHeader === void 0 ? void 0 : parentHeader.translucent;

        if (!translucentHeader) {
          enteringToolBarBg.fromTo(OPACITY, 0.01, 'var(--opacity)');
        } else {
          enteringToolBarBg.fromTo('transform', isRTL ? 'translateX(-100%)' : 'translateX(100%)', 'translateX(0px)');
        } // forward direction, entering page has a back button


        if (!forward) {
          enteringBackButton.fromTo(OPACITY, 0.01, 1);
        }

        if (backButtonEl && !forward) {
          var enteringBackBtnText = animation.createAnimation();
          enteringBackBtnText.addElement(shadow(backButtonEl).querySelector('.button-text')) // REVIEW
          .fromTo("transform", isRTL ? 'translateX(-100px)' : 'translateX(100px)', 'translateX(0px)');
          enteringToolBar.addAnimation(enteringBackBtnText);
        }
      }
    }); // setup leaving view

    if (leavingEl) {
      var leavingContent = animation.createAnimation();
      var leavingContentEl = leavingEl.querySelector(':scope > ion-content');
      var leavingToolBarEls = leavingEl.querySelectorAll(':scope > ion-header > ion-toolbar');
      var leavingHeaderEls = leavingEl.querySelectorAll(':scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *');

      if (!leavingContentEl && leavingToolBarEls.length === 0 && leavingHeaderEls.length === 0) {
        leavingContent.addElement(leavingEl.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs')); // REVIEW
      } else {
        leavingContent.addElement(leavingContentEl); // REVIEW

        leavingContent.addElement(leavingHeaderEls);
      }

      rootAnimation.addAnimation(leavingContent);

      if (backDirection) {
        // leaving content, back direction
        leavingContent.beforeClearStyles([OPACITY]).fromTo('transform', "translateX(".concat(CENTER, ")"), isRTL ? 'translateX(-100%)' : 'translateX(100%)');
        var leavingPage = index.getIonPageElement(leavingEl);
        rootAnimation.afterAddWrite(() => {
          if (rootAnimation.getDirection() === 'normal') {
            leavingPage.style.setProperty('display', 'none');
          }
        });
      } else {
        // leaving content, forward direction
        leavingContent.fromTo('transform', "translateX(".concat(CENTER, ")"), "translateX(".concat(OFF_LEFT, ")")).fromTo(OPACITY, 1, OFF_OPACITY);
      }

      if (leavingContentEl) {
        var leavingTransitionEffectEl = shadow(leavingContentEl).querySelector('.transition-effect');

        if (leavingTransitionEffectEl) {
          var leavingTransitionCoverEl = leavingTransitionEffectEl.querySelector('.transition-cover');
          var leavingTransitionShadowEl = leavingTransitionEffectEl.querySelector('.transition-shadow');
          var leavingTransitionEffect = animation.createAnimation();
          var leavingTransitionCover = animation.createAnimation();
          var leavingTransitionShadow = animation.createAnimation();
          leavingTransitionEffect.addElement(leavingTransitionEffectEl).beforeStyles({
            opacity: '1',
            display: 'block'
          }).afterStyles({
            opacity: '',
            display: ''
          });
          leavingTransitionCover.addElement(leavingTransitionCoverEl) // REVIEW
          .beforeClearStyles([OPACITY]).fromTo(OPACITY, 0.1, 0);
          leavingTransitionShadow.addElement(leavingTransitionShadowEl) // REVIEW
          .beforeClearStyles([OPACITY]).fromTo(OPACITY, 0.70, 0.03);
          leavingTransitionEffect.addAnimation([leavingTransitionCover, leavingTransitionShadow]);
          leavingContent.addAnimation([leavingTransitionEffect]);
        }
      }

      leavingToolBarEls.forEach(leavingToolBarEl => {
        var leavingToolBar = animation.createAnimation();
        leavingToolBar.addElement(leavingToolBarEl);
        var leavingTitle = animation.createAnimation();
        leavingTitle.addElement(leavingToolBarEl.querySelector('ion-title')); // REVIEW

        var leavingToolBarButtons = animation.createAnimation();
        var buttons = leavingToolBarEl.querySelectorAll('ion-buttons,[menuToggle]');
        var parentHeader = leavingToolBarEl.closest('ion-header');
        var inactiveHeader = parentHeader && parentHeader.classList.contains('header-collapse-condense-inactive');
        var buttonsToAnimate = Array.from(buttons).filter(button => {
          var isCollapseButton = button.classList.contains('buttons-collapse');
          return isCollapseButton && !inactiveHeader || !isCollapseButton;
        });
        leavingToolBarButtons.addElement(buttonsToAnimate);
        var leavingToolBarItems = animation.createAnimation();
        var leavingToolBarItemEls = leavingToolBarEl.querySelectorAll(':scope > *:not(ion-title):not(ion-buttons):not([menuToggle])');

        if (leavingToolBarItemEls.length > 0) {
          leavingToolBarItems.addElement(leavingToolBarItemEls);
        }

        var leavingToolBarBg = animation.createAnimation();
        leavingToolBarBg.addElement(shadow(leavingToolBarEl).querySelector('.toolbar-background')); // REVIEW

        var leavingBackButton = animation.createAnimation();
        var backButtonEl = leavingToolBarEl.querySelector('ion-back-button');

        if (backButtonEl) {
          leavingBackButton.addElement(backButtonEl);
        }

        leavingToolBar.addAnimation([leavingTitle, leavingToolBarButtons, leavingToolBarItems, leavingBackButton, leavingToolBarBg]);
        rootAnimation.addAnimation(leavingToolBar); // fade out leaving toolbar items

        leavingBackButton.fromTo(OPACITY, 0.99, 0);
        leavingToolBarButtons.fromTo(OPACITY, 0.99, 0);
        leavingToolBarItems.fromTo(OPACITY, 0.99, 0);

        if (backDirection) {
          if (!inactiveHeader) {
            // leaving toolbar, back direction
            leavingTitle.fromTo('transform', "translateX(".concat(CENTER, ")"), isRTL ? 'translateX(-100%)' : 'translateX(100%)').fromTo(OPACITY, 0.99, 0);
          }

          leavingToolBarItems.fromTo('transform', "translateX(".concat(CENTER, ")"), isRTL ? 'translateX(-100%)' : 'translateX(100%)');
          leavingToolBarBg.beforeClearStyles([OPACITY, 'transform']); // leaving toolbar, back direction, and there's no entering toolbar
          // should just slide out, no fading out

          var translucentHeader = parentHeader === null || parentHeader === void 0 ? void 0 : parentHeader.translucent;

          if (!translucentHeader) {
            leavingToolBarBg.fromTo(OPACITY, 'var(--opacity)', 0);
          } else {
            leavingToolBarBg.fromTo('transform', 'translateX(0px)', isRTL ? 'translateX(-100%)' : 'translateX(100%)');
          }

          if (backButtonEl && !backward) {
            var leavingBackBtnText = animation.createAnimation();
            leavingBackBtnText.addElement(shadow(backButtonEl).querySelector('.button-text')) // REVIEW
            .fromTo('transform', "translateX(".concat(CENTER, ")"), "translateX(".concat((isRTL ? -124 : 124) + 'px', ")"));
            leavingToolBar.addAnimation(leavingBackBtnText);
          }
        } else {
          // leaving toolbar, forward direction
          if (!inactiveHeader) {
            leavingTitle.fromTo('transform', "translateX(".concat(CENTER, ")"), "translateX(".concat(OFF_LEFT, ")")).fromTo(OPACITY, 0.99, 0).afterClearStyles([TRANSFORM, OPACITY]);
          }

          leavingToolBarItems.fromTo('transform', "translateX(".concat(CENTER, ")"), "translateX(".concat(OFF_LEFT, ")")).afterClearStyles([TRANSFORM, OPACITY]);
          leavingBackButton.afterClearStyles([OPACITY]);
          leavingTitle.afterClearStyles([OPACITY]);
          leavingToolBarButtons.afterClearStyles([OPACITY]);
        }
      });
    }

    return rootAnimation;
  } catch (err) {
    throw err;
  }
};

exports.iosTransitionAnimation = iosTransitionAnimation;
exports.shadow = shadow;
  })();
});
require.register("@ionic/core/dist/cjs/md.transition-407efd2b.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

require('./index-a35cc20f.js');

require('./helpers-7e840ed2.js');

var animation = require('./animation-9929f2ae.js');

var index = require('./index-3d9409db.js');

var mdTransitionAnimation = (_, opts) => {
  var OFF_BOTTOM = '40px';
  var CENTER = '0px';
  var backDirection = opts.direction === 'back';
  var enteringEl = opts.enteringEl;
  var leavingEl = opts.leavingEl;
  var ionPageElement = index.getIonPageElement(enteringEl);
  var enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
  var rootTransition = animation.createAnimation();
  rootTransition.addElement(ionPageElement).fill('both').beforeRemoveClass('ion-page-invisible'); // animate the component itself

  if (backDirection) {
    rootTransition.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
  } else {
    rootTransition.duration(opts.duration || 280).easing('cubic-bezier(0.36,0.66,0.04,1)').fromTo('transform', "translateY(".concat(OFF_BOTTOM, ")"), "translateY(".concat(CENTER, ")")).fromTo('opacity', 0.01, 1);
  } // Animate toolbar if it's there


  if (enteringToolbarEle) {
    var enteringToolBar = animation.createAnimation();
    enteringToolBar.addElement(enteringToolbarEle);
    rootTransition.addAnimation(enteringToolBar);
  } // setup leaving view


  if (leavingEl && backDirection) {
    // leaving content
    rootTransition.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
    var leavingPage = animation.createAnimation();
    leavingPage.addElement(index.getIonPageElement(leavingEl)).onFinish(currentStep => {
      if (currentStep === 1 && leavingPage.elements.length > 0) {
        leavingPage.elements[0].style.setProperty('display', 'none');
      }
    }).fromTo('transform', "translateY(".concat(CENTER, ")"), "translateY(".concat(OFF_BOTTOM, ")")).fromTo('opacity', 1, 0);
    rootTransition.addAnimation(leavingPage);
  }

  return rootTransition;
};

exports.mdTransitionAnimation = mdTransitionAnimation;
  })();
});
require.register("@ionic/core/dist/cjs/overlays-deffa27d.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ionicGlobal = require('./ionic-global-75ba08dd.js');

var helpers = require('./helpers-7e840ed2.js');

var hardwareBackButton = require('./hardware-back-button-87eee3af.js');

var lastId = 0;
var activeAnimations = new WeakMap();

var createController = tagName => {
  return {
    create(options) {
      return createOverlay(tagName, options);
    },

    dismiss(data, role, id) {
      return dismissOverlay(document, data, role, tagName, id);
    },

    getTop() {
      return _asyncToGenerator(function* () {
        return getOverlay(document, tagName);
      })();
    }

  };
};

var alertController = /*@__PURE__*/createController('ion-alert');
var actionSheetController = /*@__PURE__*/createController('ion-action-sheet');
var loadingController = /*@__PURE__*/createController('ion-loading');
var modalController = /*@__PURE__*/createController('ion-modal');
var pickerController = /*@__PURE__*/createController('ion-picker');
var popoverController = /*@__PURE__*/createController('ion-popover');
var toastController = /*@__PURE__*/createController('ion-toast');

var prepareOverlay = el => {
  /* tslint:disable-next-line */
  if (typeof document !== 'undefined') {
    connectListeners(document);
  }

  var overlayIndex = lastId++;
  el.overlayIndex = overlayIndex;

  if (!el.hasAttribute('id')) {
    el.id = "ion-overlay-".concat(overlayIndex);
  }
};

var createOverlay = (tagName, opts) => {
  /* tslint:disable-next-line */
  if (typeof customElements !== 'undefined') {
    return customElements.whenDefined(tagName).then(() => {
      var element = document.createElement(tagName);
      element.classList.add('overlay-hidden'); // convert the passed in overlay options into props
      // that get passed down into the new overlay

      Object.assign(element, opts); // append the overlay element to the document body

      getAppRoot(document).appendChild(element);
      return element.componentOnReady();
    });
  }

  return Promise.resolve();
};

var focusableQueryString = '[tabindex]:not([tabindex^="-"]), input:not([type=hidden]):not([tabindex^="-"]), textarea:not([tabindex^="-"]), button:not([tabindex^="-"]), select:not([tabindex^="-"]), .ion-focusable:not([tabindex^="-"])';
var innerFocusableQueryString = 'input:not([type=hidden]), textarea, button, select';

var focusFirstDescendant = (ref, overlay) => {
  var firstInput = ref.querySelector(focusableQueryString);
  var shadowRoot = firstInput && firstInput.shadowRoot;

  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    firstInput = shadowRoot.querySelector(innerFocusableQueryString) || firstInput;
  }

  if (firstInput) {
    firstInput.focus();
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus();
  }
};

var focusLastDescendant = (ref, overlay) => {
  var inputs = Array.from(ref.querySelectorAll(focusableQueryString));
  var lastInput = inputs.length > 0 ? inputs[inputs.length - 1] : null;
  var shadowRoot = lastInput && lastInput.shadowRoot;

  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    lastInput = shadowRoot.querySelector(innerFocusableQueryString) || lastInput;
  }

  if (lastInput) {
    lastInput.focus();
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus();
  }
};
/**
 * Traps keyboard focus inside of overlay components.
 * Based on https://w3c.github.io/aria-practices/examples/dialog-modal/alertdialog.html
 * This includes the following components: Action Sheet, Alert, Loading, Modal,
 * Picker, and Popover.
 * Should NOT include: Toast
 */


var trapKeyboardFocus = (ev, doc) => {
  var lastOverlay = getOverlay(doc);
  var target = ev.target; // If no active overlay, ignore this event

  if (!lastOverlay || !target) {
    return;
  }
  /**
   * If we are focusing the overlay, clear
   * the last focused element so that hitting
   * tab activates the first focusable element
   * in the overlay wrapper.
   */


  if (lastOverlay === target) {
    lastOverlay.lastFocus = undefined;
    /**
     * Otherwise, we must be focusing an element
     * inside of the overlay. The two possible options
     * here are an input/button/etc or the ion-focus-trap
     * element. The focus trap element is used to prevent
     * the keyboard focus from leaving the overlay when
     * using Tab or screen assistants.
     */
  } else {
    /**
     * We do not want to focus the traps, so get the overlay
     * wrapper element as the traps live outside of the wrapper.
     */
    var overlayRoot = helpers.getElementRoot(lastOverlay);

    if (!overlayRoot.contains(target)) {
      return;
    }

    var overlayWrapper = overlayRoot.querySelector('.ion-overlay-wrapper');

    if (!overlayWrapper) {
      return;
    }
    /**
     * If the target is inside the wrapper, let the browser
     * focus as normal and keep a log of the last focused element.
     */


    if (overlayWrapper.contains(target)) {
      lastOverlay.lastFocus = target;
    } else {
      /**
       * Otherwise, we must have focused one of the focus traps.
       * We need to wrap the focus to either the first element
       * or the last element.
       */

      /**
       * Once we call `focusFirstDescendant` and focus the first
       * descendant, another focus event will fire which will
       * cause `lastOverlay.lastFocus` to be updated before
       * we can run the code after that. We will cache the value
       * here to avoid that.
       */
      var lastFocus = lastOverlay.lastFocus; // Focus the first element in the overlay wrapper

      focusFirstDescendant(overlayWrapper, lastOverlay);
      /**
       * If the cached last focused element is the
       * same as the active element, then we need
       * to wrap focus to the last descendant. This happens
       * when the first descendant is focused, and the user
       * presses Shift + Tab. The previous line will focus
       * the same descendant again (the first one), causing
       * last focus to equal the active element.
       */

      if (lastFocus === doc.activeElement) {
        focusLastDescendant(overlayWrapper, lastOverlay);
      }

      lastOverlay.lastFocus = doc.activeElement;
    }
  }
};

var connectListeners = doc => {
  if (lastId === 0) {
    lastId = 1;
    doc.addEventListener('focus', ev => trapKeyboardFocus(ev, doc), true); // handle back-button click

    doc.addEventListener('ionBackButton', ev => {
      var lastOverlay = getOverlay(doc);

      if (lastOverlay && lastOverlay.backdropDismiss) {
        ev.detail.register(hardwareBackButton.OVERLAY_BACK_BUTTON_PRIORITY, () => {
          return lastOverlay.dismiss(undefined, BACKDROP);
        });
      }
    }); // handle ESC to close overlay

    doc.addEventListener('keyup', ev => {
      if (ev.key === 'Escape') {
        var lastOverlay = getOverlay(doc);

        if (lastOverlay && lastOverlay.backdropDismiss) {
          lastOverlay.dismiss(undefined, BACKDROP);
        }
      }
    });
  }
};

var dismissOverlay = (doc, data, role, overlayTag, id) => {
  var overlay = getOverlay(doc, overlayTag, id);

  if (!overlay) {
    return Promise.reject('overlay does not exist');
  }

  return overlay.dismiss(data, role);
};

var getOverlays = (doc, selector) => {
  if (selector === undefined) {
    selector = 'ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast';
  }

  return Array.from(doc.querySelectorAll(selector)).filter(c => c.overlayIndex > 0);
};

var getOverlay = (doc, overlayTag, id) => {
  var overlays = getOverlays(doc, overlayTag);
  return id === undefined ? overlays[overlays.length - 1] : overlays.find(o => o.id === id);
};

var present = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (overlay, name, iosEnterAnimation, mdEnterAnimation, opts) {
    if (overlay.presented) {
      return;
    }

    overlay.presented = true;
    overlay.willPresent.emit();
    var mode = ionicGlobal.getIonMode(overlay); // get the user's animation fn if one was provided

    var animationBuilder = overlay.enterAnimation ? overlay.enterAnimation : ionicGlobal.config.get(name, mode === 'ios' ? iosEnterAnimation : mdEnterAnimation);
    var completed = yield overlayAnimation(overlay, animationBuilder, overlay.el, opts);

    if (completed) {
      overlay.didPresent.emit();
    }
    /**
     * When an overlay that steals focus
     * is dismissed, focus should be returned
     * to the element that was focused
     * prior to the overlay opening. Toast
     * does not steal focus and is excluded
     * from returning focus as a result.
     */


    if (overlay.el.tagName !== 'ION-TOAST') {
      focusPreviousElementOnDismiss(overlay.el);
    }

    if (overlay.keyboardClose) {
      overlay.el.focus();
    }
  });

  return function present(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * When an overlay component is dismissed,
 * focus should be returned to the element
 * that presented the overlay. Otherwise
 * focus will be set on the body which
 * means that people using screen readers
 * or tabbing will need to re-navigate
 * to where they were before they
 * opened the overlay.
 */


var focusPreviousElementOnDismiss = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (overlayEl) {
    var previousElement = document.activeElement;

    if (!previousElement) {
      return;
    }

    var shadowRoot = previousElement && previousElement.shadowRoot;

    if (shadowRoot) {
      // If there are no inner focusable elements, just focus the host element.
      previousElement = shadowRoot.querySelector(innerFocusableQueryString) || previousElement;
    }

    yield overlayEl.onDidDismiss();
    previousElement.focus();
  });

  return function focusPreviousElementOnDismiss(_x6) {
    return _ref2.apply(this, arguments);
  };
}();

var dismiss = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (overlay, data, role, name, iosLeaveAnimation, mdLeaveAnimation, opts) {
    if (!overlay.presented) {
      return false;
    }

    overlay.presented = false;

    try {
      // Overlay contents should not be clickable during dismiss
      overlay.el.style.setProperty('pointer-events', 'none');
      overlay.willDismiss.emit({
        data,
        role
      });
      var mode = ionicGlobal.getIonMode(overlay);
      var animationBuilder = overlay.leaveAnimation ? overlay.leaveAnimation : ionicGlobal.config.get(name, mode === 'ios' ? iosLeaveAnimation : mdLeaveAnimation); // If dismissed via gesture, no need to play leaving animation again

      if (role !== 'gesture') {
        yield overlayAnimation(overlay, animationBuilder, overlay.el, opts);
      }

      overlay.didDismiss.emit({
        data,
        role
      });
      activeAnimations.delete(overlay);
    } catch (err) {
      console.error(err);
    }

    overlay.el.remove();
    return true;
  });

  return function dismiss(_x7, _x8, _x9, _x10, _x11, _x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}();

var getAppRoot = doc => {
  return doc.querySelector('ion-app') || doc.body;
};

var overlayAnimation = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (overlay, animationBuilder, baseEl, opts) {
    // Make overlay visible in case it's hidden
    baseEl.classList.remove('overlay-hidden');
    var aniRoot = baseEl.shadowRoot || overlay.el;
    var animation = animationBuilder(aniRoot, opts);

    if (!overlay.animated || !ionicGlobal.config.getBoolean('animated', true)) {
      animation.duration(0);
    }

    if (overlay.keyboardClose) {
      animation.beforeAddWrite(() => {
        var activeElement = baseEl.ownerDocument.activeElement;

        if (activeElement && activeElement.matches('input, ion-input, ion-textarea')) {
          activeElement.blur();
        }
      });
    }

    var activeAni = activeAnimations.get(overlay) || [];
    activeAnimations.set(overlay, [...activeAni, animation]);
    yield animation.play();
    return true;
  });

  return function overlayAnimation(_x14, _x15, _x16, _x17) {
    return _ref4.apply(this, arguments);
  };
}();

var eventMethod = (element, eventName) => {
  var resolve;
  var promise = new Promise(r => resolve = r);
  onceEvent(element, eventName, event => {
    resolve(event.detail);
  });
  return promise;
};

var onceEvent = (element, eventName, callback) => {
  var handler = ev => {
    helpers.removeEventListener(element, eventName, handler);
    callback(ev);
  };

  helpers.addEventListener(element, eventName, handler);
};

var isCancel = role => {
  return role === 'cancel' || role === BACKDROP;
};

var defaultGate = h => h();

var safeCall = (handler, arg) => {
  if (typeof handler === 'function') {
    var jmp = ionicGlobal.config.get('_zoneGate', defaultGate);
    return jmp(() => {
      try {
        return handler(arg);
      } catch (e) {
        console.error(e);
      }
    });
  }

  return undefined;
};

var BACKDROP = 'backdrop';
exports.BACKDROP = BACKDROP;
exports.actionSheetController = actionSheetController;
exports.activeAnimations = activeAnimations;
exports.alertController = alertController;
exports.dismiss = dismiss;
exports.eventMethod = eventMethod;
exports.isCancel = isCancel;
exports.loadingController = loadingController;
exports.modalController = modalController;
exports.pickerController = pickerController;
exports.popoverController = popoverController;
exports.prepareOverlay = prepareOverlay;
exports.present = present;
exports.safeCall = safeCall;
exports.toastController = toastController;
  })();
});
require.register("@ionic/core/dist/cjs/shadow-css-476b8fcf.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    'use strict';
/*
 Stencil Client Platform v2.1.2 | MIT Licensed | https://stenciljs.com
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
 */

var safeSelector = selector => {
  var placeholders = [];
  var index = 0;
  var content; // Replaces attribute selectors with placeholders.
  // The WS in [attr="va lue"] would otherwise be interpreted as a selector separator.

  selector = selector.replace(/(\[[^\]]*\])/g, (_, keep) => {
    var replaceBy = "__ph-".concat(index, "__");
    placeholders.push(keep);
    index++;
    return replaceBy;
  }); // Replaces the expression in `:nth-child(2n + 1)` with a placeholder.
  // WS and "+" would otherwise be interpreted as selector separators.

  content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
    var replaceBy = "__ph-".concat(index, "__");
    placeholders.push(exp);
    index++;
    return pseudo + replaceBy;
  });
  var ss = {
    content,
    placeholders
  };
  return ss;
};

var restoreSafeSelector = (placeholders, content) => {
  return content.replace(/__ph-(\d+)__/g, (_, index) => placeholders[+index]);
};

var _polyfillHost = '-shadowcsshost';
var _polyfillSlotted = '-shadowcssslotted'; // note: :host-context pre-processed to -shadowcsshostcontext.

var _polyfillHostContext = '-shadowcsscontext';

var _parenSuffix = ')(?:\\((' + '(?:\\([^)(]*\\)|[^)(]*)+?' + ')\\))?([^,{]*)';

var _cssColonHostRe = new RegExp('(' + _polyfillHost + _parenSuffix, 'gim');

var _cssColonHostContextRe = new RegExp('(' + _polyfillHostContext + _parenSuffix, 'gim');

var _cssColonSlottedRe = new RegExp('(' + _polyfillSlotted + _parenSuffix, 'gim');

var _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';

var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
var _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
var _selectorReSuffix = '([>\\s~+[.,{:][\\s\\S]*)?$';
var _polyfillHostRe = /-shadowcsshost/gim;
var _colonHostRe = /:host/gim;
var _colonSlottedRe = /::slotted/gim;
var _colonHostContextRe = /:host-context/gim;
var _commentRe = /\/\*\s*[\s\S]*?\*\//g;

var stripComments = input => {
  return input.replace(_commentRe, '');
};

var _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;

var extractCommentsWithHash = input => {
  return input.match(_commentWithHashRe) || [];
};

var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
var _curlyRe = /([{}])/g;
var OPEN_CURLY = '{';
var CLOSE_CURLY = '}';
var BLOCK_PLACEHOLDER = '%BLOCK%';

var processRules = (input, ruleCallback) => {
  var inputWithEscapedBlocks = escapeBlocks(input);
  var nextBlockIndex = 0;
  return inputWithEscapedBlocks.escapedString.replace(_ruleRe, function () {
    var selector = arguments.length <= 2 ? undefined : arguments[2];
    var content = '';
    var suffix = arguments.length <= 4 ? undefined : arguments[4];
    var contentPrefix = '';

    if (suffix && suffix.startsWith('{' + BLOCK_PLACEHOLDER)) {
      content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
      suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
      contentPrefix = '{';
    }

    var cssRule = {
      selector,
      content
    };
    var rule = ruleCallback(cssRule);
    return "".concat(arguments.length <= 1 ? undefined : arguments[1]).concat(rule.selector).concat(arguments.length <= 3 ? undefined : arguments[3]).concat(contentPrefix).concat(rule.content).concat(suffix);
  });
};

var escapeBlocks = input => {
  var inputParts = input.split(_curlyRe);
  var resultParts = [];
  var escapedBlocks = [];
  var bracketCount = 0;
  var currentBlockParts = [];

  for (var partIndex = 0; partIndex < inputParts.length; partIndex++) {
    var part = inputParts[partIndex];

    if (part === CLOSE_CURLY) {
      bracketCount--;
    }

    if (bracketCount > 0) {
      currentBlockParts.push(part);
    } else {
      if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(''));
        resultParts.push(BLOCK_PLACEHOLDER);
        currentBlockParts = [];
      }

      resultParts.push(part);
    }

    if (part === OPEN_CURLY) {
      bracketCount++;
    }
  }

  if (currentBlockParts.length > 0) {
    escapedBlocks.push(currentBlockParts.join(''));
    resultParts.push(BLOCK_PLACEHOLDER);
  }

  var strEscapedBlocks = {
    escapedString: resultParts.join(''),
    blocks: escapedBlocks
  };
  return strEscapedBlocks;
};

var insertPolyfillHostInCssText = selector => {
  selector = selector.replace(_colonHostContextRe, _polyfillHostContext).replace(_colonHostRe, _polyfillHost).replace(_colonSlottedRe, _polyfillSlotted);
  return selector;
};

var convertColonRule = (cssText, regExp, partReplacer) => {
  // m[1] = :host(-context), m[2] = contents of (), m[3] rest of rule
  return cssText.replace(regExp, function () {
    for (var _len = arguments.length, m = new Array(_len), _key = 0; _key < _len; _key++) {
      m[_key] = arguments[_key];
    }

    if (m[2]) {
      var parts = m[2].split(',');
      var r = [];

      for (var i = 0; i < parts.length; i++) {
        var p = parts[i].trim();
        if (!p) break;
        r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
      }

      return r.join(',');
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
};

var colonHostPartReplacer = (host, part, suffix) => {
  return host + part.replace(_polyfillHost, '') + suffix;
};

var convertColonHost = cssText => {
  return convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
};

var colonHostContextPartReplacer = (host, part, suffix) => {
  if (part.indexOf(_polyfillHost) > -1) {
    return colonHostPartReplacer(host, part, suffix);
  } else {
    return host + part + suffix + ', ' + part + ' ' + host + suffix;
  }
};

var convertColonSlotted = (cssText, slotScopeId) => {
  var slotClass = '.' + slotScopeId + ' > ';
  var selectors = [];
  cssText = cssText.replace(_cssColonSlottedRe, function () {
    for (var _len2 = arguments.length, m = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      m[_key2] = arguments[_key2];
    }

    if (m[2]) {
      var compound = m[2].trim();
      var suffix = m[3];
      var slottedSelector = slotClass + compound + suffix;
      var prefixSelector = '';

      for (var i = m[4] - 1; i >= 0; i--) {
        var char = m[5][i];

        if (char === '}' || char === ',') {
          break;
        }

        prefixSelector = char + prefixSelector;
      }

      var orgSelector = prefixSelector + slottedSelector;
      var addedSelector = "".concat(prefixSelector.trimRight()).concat(slottedSelector.trim());

      if (orgSelector.trim() !== addedSelector.trim()) {
        var updatedSelector = "".concat(addedSelector, ", ").concat(orgSelector);
        selectors.push({
          orgSelector,
          updatedSelector
        });
      }

      return slottedSelector;
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
  return {
    selectors,
    cssText
  };
};

var convertColonHostContext = cssText => {
  return convertColonRule(cssText, _cssColonHostContextRe, colonHostContextPartReplacer);
};

var convertShadowDOMSelectors = cssText => {
  return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, ' '), cssText);
};

var makeScopeMatcher = scopeSelector => {
  var lre = /\[/g;
  var rre = /\]/g;
  scopeSelector = scopeSelector.replace(lre, '\\[').replace(rre, '\\]');
  return new RegExp('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
};

var selectorNeedsScoping = (selector, scopeSelector) => {
  var re = makeScopeMatcher(scopeSelector);
  return !re.test(selector);
};

var applySimpleSelectorScope = (selector, scopeSelector, hostSelector) => {
  // In Android browser, the lastIndex is not reset when the regex is used in String.replace()
  _polyfillHostRe.lastIndex = 0;

  if (_polyfillHostRe.test(selector)) {
    var replaceBy = ".".concat(hostSelector);
    return selector.replace(_polyfillHostNoCombinatorRe, (_, selector) => {
      return selector.replace(/([^:]*)(:*)(.*)/, (_, before, colon, after) => {
        return before + replaceBy + colon + after;
      });
    }).replace(_polyfillHostRe, replaceBy + ' ');
  }

  return scopeSelector + ' ' + selector;
};

var applyStrictSelectorScope = (selector, scopeSelector, hostSelector) => {
  var isRe = /\[is=([^\]]*)\]/g;
  scopeSelector = scopeSelector.replace(isRe, function (_) {
    return arguments.length <= 1 ? undefined : arguments[1];
  });
  var className = '.' + scopeSelector;

  var _scopeSelectorPart = p => {
    var scopedP = p.trim();

    if (!scopedP) {
      return '';
    }

    if (p.indexOf(_polyfillHostNoCombinator) > -1) {
      scopedP = applySimpleSelectorScope(p, scopeSelector, hostSelector);
    } else {
      // remove :host since it should be unnecessary
      var t = p.replace(_polyfillHostRe, '');

      if (t.length > 0) {
        var matches = t.match(/([^:]*)(:*)(.*)/);

        if (matches) {
          scopedP = matches[1] + className + matches[2] + matches[3];
        }
      }
    }

    return scopedP;
  };

  var safeContent = safeSelector(selector);
  selector = safeContent.content;
  var scopedSelector = '';
  var startIndex = 0;
  var res;
  var sep = /( |>|\+|~(?!=))\s*/g; // If a selector appears before :host it should not be shimmed as it
  // matches on ancestor elements and not on elements in the host's shadow
  // `:host-context(div)` is transformed to
  // `-shadowcsshost-no-combinatordiv, div -shadowcsshost-no-combinator`
  // the `div` is not part of the component in the 2nd selectors and should not be scoped.
  // Historically `component-tag:host` was matching the component so we also want to preserve
  // this behavior to avoid breaking legacy apps (it should not match).
  // The behavior should be:
  // - `tag:host` -> `tag[h]` (this is to avoid breaking legacy apps, should not match anything)
  // - `tag :host` -> `tag [h]` (`tag` is not scoped because it's considered part of a
  //   `:host-context(tag)`)

  var hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1; // Only scope parts after the first `-shadowcsshost-no-combinator` when it is present

  var shouldScope = !hasHost;

  while ((res = sep.exec(selector)) !== null) {
    var separator = res[1];

    var _part = selector.slice(startIndex, res.index).trim();

    shouldScope = shouldScope || _part.indexOf(_polyfillHostNoCombinator) > -1;
    var scopedPart = shouldScope ? _scopeSelectorPart(_part) : _part;
    scopedSelector += "".concat(scopedPart, " ").concat(separator, " ");
    startIndex = sep.lastIndex;
  }

  var part = selector.substring(startIndex);
  shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
  scopedSelector += shouldScope ? _scopeSelectorPart(part) : part; // replace the placeholders with their original values

  return restoreSafeSelector(safeContent.placeholders, scopedSelector);
};

var scopeSelector = (selector, scopeSelectorText, hostSelector, slotSelector) => {
  return selector.split(',').map(shallowPart => {
    if (slotSelector && shallowPart.indexOf('.' + slotSelector) > -1) {
      return shallowPart.trim();
    }

    if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
      return applyStrictSelectorScope(shallowPart, scopeSelectorText, hostSelector).trim();
    } else {
      return shallowPart.trim();
    }
  }).join(', ');
};

var scopeSelectors = (cssText, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector) => {
  return processRules(cssText, rule => {
    var selector = rule.selector;
    var content = rule.content;

    if (rule.selector[0] !== '@') {
      selector = scopeSelector(rule.selector, scopeSelectorText, hostSelector, slotSelector);
    } else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') || rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
      content = scopeSelectors(rule.content, scopeSelectorText, hostSelector, slotSelector);
    }

    var cssRule = {
      selector: selector.replace(/\s{2,}/g, ' ').trim(),
      content
    };
    return cssRule;
  });
};

var scopeCssText = (cssText, scopeId, hostScopeId, slotScopeId, commentOriginalSelector) => {
  cssText = insertPolyfillHostInCssText(cssText);
  cssText = convertColonHost(cssText);
  cssText = convertColonHostContext(cssText);
  var slotted = convertColonSlotted(cssText, slotScopeId);
  cssText = slotted.cssText;
  cssText = convertShadowDOMSelectors(cssText);

  if (scopeId) {
    cssText = scopeSelectors(cssText, scopeId, hostScopeId, slotScopeId);
  }

  cssText = cssText.replace(/-shadowcsshost-no-combinator/g, ".".concat(hostScopeId));
  cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, ' $1 ');
  return {
    cssText: cssText.trim(),
    slottedSelectors: slotted.selectors
  };
};

var scopeCss = (cssText, scopeId, commentOriginalSelector) => {
  var hostScopeId = scopeId + '-h';
  var slotScopeId = scopeId + '-s';
  var commentsWithHash = extractCommentsWithHash(cssText);
  cssText = stripComments(cssText);
  var orgSelectors = [];

  if (commentOriginalSelector) {
    var processCommentedSelector = rule => {
      var placeholder = "/*!@___".concat(orgSelectors.length, "___*/");
      var comment = "/*!@".concat(rule.selector, "*/");
      orgSelectors.push({
        placeholder,
        comment
      });
      rule.selector = placeholder + rule.selector;
      return rule;
    };

    cssText = processRules(cssText, rule => {
      if (rule.selector[0] !== '@') {
        return processCommentedSelector(rule);
      } else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') || rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
        rule.content = processRules(rule.content, processCommentedSelector);
        return rule;
      }

      return rule;
    });
  }

  var scoped = scopeCssText(cssText, scopeId, hostScopeId, slotScopeId);
  cssText = [scoped.cssText, ...commentsWithHash].join('\n');

  if (commentOriginalSelector) {
    orgSelectors.forEach((_ref) => {
      var {
        placeholder,
        comment
      } = _ref;
      cssText = cssText.replace(placeholder, comment);
    });
  }

  scoped.slottedSelectors.forEach(slottedSelector => {
    cssText = cssText.replace(slottedSelector.orgSelector, slottedSelector.updatedSelector);
  });
  return cssText;
};

exports.scopeCss = scopeCss;
  })();
});
require.register("@ionic/core/dist/index.cjs.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@ionic/core");
  (function() {
    "use strict";

module.exports = require('./cjs/index.cjs.js');
  })();
});
require.register("base64-js/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "base64-js");
  (function() {
    'use strict';

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;

  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}
  })();
});;
require.register("browser-resolve/empty.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "browser-resolve");
  (function() {
    "use strict";
  })();
});;
require.register("buffer/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "buffer");
  var _Buffer = require('buffer'); var Buffer = _Buffer && _Buffer.Buffer;
(function() {
    /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */
'use strict';

var base64 = require('base64-js');

var ieee754 = require('ieee754');

var customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' ? // eslint-disable-line dot-notation
Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
: null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */

Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
  console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
}

function typedArraySupport() {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1);
    var proto = {
      foo: function foo() {
        return 42;
      }
    };
    Object.setPrototypeOf(proto, Uint8Array.prototype);
    Object.setPrototypeOf(arr, proto);
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function get() {
    if (!Buffer.isBuffer(this)) return undefined;
    return this.buffer;
  }
});
Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function get() {
    if (!Buffer.isBuffer(this)) return undefined;
    return this.byteOffset;
  }
});

function createBuffer(length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"');
  } // Return an augmented `Uint8Array` instance


  var buf = new Uint8Array(length);
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError('The "string" argument must be of type string. Received type number');
    }

    return allocUnsafe(arg);
  }

  return from(arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

function from(value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset);
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value);
  }

  if (value == null) {
    throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
  }

  if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }

  if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }

  if (typeof value === 'number') {
    throw new TypeError('The "value" argument must not be of type number. Received type number');
  }

  var valueOf = value.valueOf && value.valueOf();

  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length);
  }

  var b = fromObject(value);
  if (b) return b;

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
  }

  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length);
}; // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148


Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number');
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"');
  }
}

function alloc(size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
  }

  return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding);
};

function allocUnsafe(size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size);
};

function fromString(string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding);
  }

  var length = byteLength(string, encoding) | 0;
  var buf = createBuffer(length);
  var actual = buf.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf;
}

function fromArrayLike(array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(length);

  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }

  return buf;
}

function fromArrayView(arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView);
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
  }

  return fromArrayLike(arrayView);
}

function fromArrayBuffer(array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds');
  }

  var buf;

  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  } // Return an augmented `Uint8Array` instance


  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}

function fromObject(obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(len);

    if (buf.length === 0) {
      return buf;
    }

    obj.copy(buf, 0, 0, len);
    return buf;
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0);
    }

    return fromArrayLike(obj);
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data);
  }
}

function checked(length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return b != null && b._isBuffer === true && b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
};

Buffer.compare = function compare(a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);

  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos);
      } else {
        Uint8Array.prototype.set.call(buffer, buf, pos);
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    } else {
      buf.copy(buffer, pos);
    }

    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + typeof string);
  }

  var len = string.length;
  var mustMatch = arguments.length > 2 && arguments[2] === true;
  if (!mustMatch && len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
        }

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coercion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.toLocaleString = Buffer.prototype.toString;

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
  if (this.length > max) str += ' ... ';
  return '<Buffer ' + str + '>';
};

if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength);
  }

  if (!Buffer.isBuffer(target)) {
    throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + typeof target);
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  }

  var strLen = string.length;

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;

    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]];
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = ''; // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)

  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf = this.subarray(start, end); // Return an augmented `Uint8Array` instance

  Object.setPrototypeOf(newBuf, Buffer.prototype);
  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  return offset + 2;
};

Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = value >>> 8;
  this[offset + 1] = value & 0xff;
  return offset + 2;
};

Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = value >>> 24;
  this[offset + 2] = value >>> 16;
  this[offset + 1] = value >>> 8;
  this[offset] = value & 0xff;
  return offset + 4;
};

Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = value >>> 24;
  this[offset + 1] = value >>> 16;
  this[offset + 2] = value >>> 8;
  this[offset + 3] = value & 0xff;
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = value >>> 8;
  this[offset + 1] = value & 0xff;
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  this[offset + 2] = value >>> 16;
  this[offset + 3] = value >>> 24;
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = value >>> 24;
  this[offset + 1] = value >>> 16;
  this[offset + 2] = value >>> 8;
  this[offset + 3] = value & 0xff;
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;

  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;

  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } else if (typeof val === 'boolean') {
    val = Number(val);
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
    var len = bytes.length;

    if (len === 0) {
      throw new TypeError('The value "' + val + '" is invalid for argument "value"');
    }

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]; // Node strips out invalid characters like \n and \t from the string, base64-js does not

  str = str.trim().replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
} // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166


function isInstance(obj, type) {
  return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}

function numberIsNaN(obj) {
  // For IE11 support
  return obj !== obj; // eslint-disable-line no-self-compare
} // Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219


var hexSliceLookupTable = function () {
  var alphabet = '0123456789abcdef';
  var table = new Array(256);

  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16;

    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j];
    }
  }

  return table;
}();
  })();
});;
require.register("data.task/lib/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "data.task");
  (function() {
    "use strict";

module.exports = require('./task');
  })();
});
require.register("data.task/lib/task.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "data.task");
  (function() {
    'use strict';
/**
 * A helper for delaying the execution of a function.
 * @private
 * @summary (Any... -> Any) -> Void
 */

var delayed = typeof setImmediate !== 'undefined' ? setImmediate : typeof process !== 'undefined' ? process.nextTick :
/* otherwise */
setTimeout;
/**
 * @module lib/task
 */

module.exports = Task; // -- Implementation ---------------------------------------------------

/**
 * The `Task[α, β]` structure represents values that depend on time. This
 * allows one to model time-based effects explicitly, such that one can have
 * full knowledge of when they're dealing with delayed computations, latency,
 * or anything that can not be computed immediately.
 *
 * A common use for this structure is to replace the usual Continuation-Passing
 * Style form of programming, in order to be able to compose and sequence
 * time-dependent effects using the generic and powerful monadic operations.
 *
 * @class
 * @summary
 * ((α → Void), (β → Void) → Void), (Void → Void) → Task[α, β]
 *
 * Task[α, β] <: Chain[β]
 *               , Monad[β]
 *               , Functor[β]
 *               , Applicative[β]
 *               , Semigroup[β]
 *               , Monoid[β]
 *               , Show
 */

function Task(computation, cleanup) {
  this.fork = computation;

  this.cleanup = cleanup || function () {};
}
/**
 * Constructs a new `Task[α, β]` containing the single value `β`.
 *
 * `β` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary β → Task[α, β]
 */


Task.prototype.of = function _of(b) {
  return new Task(function (_, resolve) {
    return resolve(b);
  });
};

Task.of = Task.prototype.of;
/**
 * Constructs a new `Task[α, β]` containing the single value `α`.
 *
 * `α` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary α → Task[α, β]
 */

Task.prototype.rejected = function _rejected(a) {
  return new Task(function (reject) {
    return reject(a);
  });
};

Task.rejected = Task.prototype.rejected; // -- Functor ----------------------------------------------------------

/**
 * Transforms the successful value of the `Task[α, β]` using a regular unary
 * function.
 *
 * @summary @Task[α, β] => (β → γ) → Task[α, γ]
 */

Task.prototype.map = function _map(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(a);
    }, function (b) {
      return resolve(f(b));
    });
  }, cleanup);
}; // -- Chain ------------------------------------------------------------

/**
 * Transforms the succesful value of the `Task[α, β]` using a function to a
 * monad.
 *
 * @summary @Task[α, β] => (β → Task[α, γ]) → Task[α, γ]
 */


Task.prototype.chain = function _chain(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(a);
    }, function (b) {
      return f(b).fork(reject, resolve);
    });
  }, cleanup);
}; // -- Apply ------------------------------------------------------------

/**
 * Applys the successful value of the `Task[α, (β → γ)]` to the successful
 * value of the `Task[α, β]`
 *
 * @summary @Task[α, (β → γ)] => Task[α, β] → Task[α, γ]
 */


Task.prototype.ap = function _ap(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task(function (reject, resolve) {
    var func,
        funcLoaded = false;
    var val,
        valLoaded = false;
    var rejected = false;
    var allState;
    var thisState = forkThis(guardReject, guardResolve(function (x) {
      funcLoaded = true;
      func = x;
    }));
    var thatState = forkThat(guardReject, guardResolve(function (x) {
      valLoaded = true;
      val = x;
    }));

    function guardResolve(setter) {
      return function (x) {
        if (rejected) {
          return;
        }

        setter(x);

        if (funcLoaded && valLoaded) {
          delayed(function () {
            cleanupBoth(allState);
          });
          return resolve(func(val));
        } else {
          return x;
        }
      };
    }

    function guardReject(x) {
      if (!rejected) {
        rejected = true;
        return reject(x);
      }
    }

    return allState = [thisState, thatState];
  }, cleanupBoth);
}; // -- Semigroup ------------------------------------------------------------

/**
 * Selects the earlier of the two tasks `Task[α, β]`
 *
 * @summary @Task[α, β] => Task[α, β] → Task[α, β]
 */


Task.prototype.concat = function _concat(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task(function (reject, resolve) {
    var done = false;
    var allState;
    var thisState = forkThis(guard(reject), guard(resolve));
    var thatState = forkThat(guard(reject), guard(resolve));
    return allState = [thisState, thatState];

    function guard(f) {
      return function (x) {
        if (!done) {
          done = true;
          delayed(function () {
            cleanupBoth(allState);
          });
          return f(x);
        }
      };
    }
  }, cleanupBoth);
}; // -- Monoid ------------------------------------------------------------

/**
 * Returns a Task that will never resolve
 *
 * @summary Void → Task[α, _]
 */


Task.empty = function _empty() {
  return new Task(function () {});
};

Task.prototype.empty = Task.empty; // -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Task[α, β]`
 *
 * @summary @Task[α, β] => Void → String
 */

Task.prototype.toString = function _toString() {
  return 'Task';
}; // -- Extracting and recovering ----------------------------------------

/**
 * Transforms a failure value into a new `Task[α, β]`. Does nothing if the
 * structure already contains a successful value.
 *
 * @summary @Task[α, β] => (α → Task[γ, β]) → Task[γ, β]
 */


Task.prototype.orElse = function _orElse(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return f(a).fork(reject, resolve);
    }, function (b) {
      return resolve(b);
    });
  }, cleanup);
}; // -- Folds and extended transformations -------------------------------

/**
 * Catamorphism. Takes two functions, applies the leftmost one to the failure
 * value, and the rightmost one to the successful value, depending on which one
 * is present.
 *
 * @summary @Task[α, β] => (α → γ), (β → γ) → Task[δ, γ]
 */


Task.prototype.fold = function _fold(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return resolve(f(a));
    }, function (b) {
      return resolve(g(b));
    });
  }, cleanup);
};
/**
 * Catamorphism.
 *
 * @summary @Task[α, β] => { Rejected: α → γ, Resolved: β → γ } → Task[δ, γ]
 */


Task.prototype.cata = function _cata(pattern) {
  return this.fold(pattern.Rejected, pattern.Resolved);
};
/**
 * Swaps the disjunction values.
 *
 * @summary @Task[α, β] => Void → Task[β, α]
 */


Task.prototype.swap = function _swap() {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return resolve(a);
    }, function (b) {
      return reject(b);
    });
  }, cleanup);
};
/**
 * Maps both sides of the disjunction.
 *
 * @summary @Task[α, β] => (α → γ), (β → δ) → Task[γ, δ]
 */


Task.prototype.bimap = function _bimap(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(f(a));
    }, function (b) {
      return resolve(g(b));
    });
  }, cleanup);
};
/**
 * Maps the left side of the disjunction (failure).
 *
 * @summary @Task[α, β] => (α → γ) → Task[γ, β]
 */


Task.prototype.rejectedMap = function _rejectedMap(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;
  return new Task(function (reject, resolve) {
    return fork(function (a) {
      return reject(f(a));
    }, function (b) {
      return resolve(b);
    });
  }, cleanup);
};
  })();
});
require.register("events/events.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "events");
  (function() {
    // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter;
module.exports.once = once; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function get() {
    return defaultMaxListeners;
  },
  set: function set(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      ReflectApply(listeners[i], this, args);
    }
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }

      resolve([].slice.call(arguments));
    }

    ;
    var errorListener; // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.

    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}
  })();
});;
require.register("ieee754/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ieee754");
  (function() {
    "use strict";

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};
  })();
});;
require.register("inherits/inherits_browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "inherits");
  (function() {
    "use strict";

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function TempCtor() {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
  })();
});;
require.register("mithril-stream/stream.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril-stream");
  (function() {
    "use strict";

/* eslint-disable */
;

(function () {
  "use strict";
  /* eslint-enable */

  Stream.SKIP = {};
  Stream.lift = lift;
  Stream.scan = scan;
  Stream.merge = merge;
  Stream.combine = combine;
  Stream.scanMerge = scanMerge;
  Stream["fantasy-land/of"] = Stream;
  var warnedHalt = false;
  Object.defineProperty(Stream, "HALT", {
    get: function get() {
      warnedHalt || console.log("HALT is deprecated and has been renamed to SKIP");
      warnedHalt = true;
      return Stream.SKIP;
    }
  });

  function Stream(value) {
    var dependentStreams = [];
    var dependentFns = [];

    function stream(v) {
      if (arguments.length && v !== Stream.SKIP) {
        value = v;

        if (open(stream)) {
          stream.changing();
          stream.state = "active";
          dependentStreams.forEach(function (s, i) {
            s(dependentFns[i](value));
          });
        }
      }

      return value;
    }

    stream.constructor = Stream;
    stream.state = arguments.length && value !== Stream.SKIP ? "active" : "pending";
    stream.parents = [];

    stream.changing = function () {
      open(stream) && (stream.state = "changing");
      dependentStreams.forEach(function (s) {
        s.changing();
      });
    };

    stream.map = function (fn, ignoreInitial) {
      var target = stream.state === "active" && ignoreInitial !== Stream.SKIP ? Stream(fn(value)) : Stream();
      target.parents.push(stream);
      dependentStreams.push(target);
      dependentFns.push(fn);
      return target;
    };

    var end;

    function createEnd() {
      end = Stream();
      end.map(function (value) {
        if (value === true) {
          stream.parents.forEach(function (p) {
            p.unregisterChild(stream);
          });
          stream.state = "ended";
          stream.parents.length = dependentStreams.length = dependentFns.length = 0;
        }

        return value;
      });
      return end;
    }

    stream.toJSON = function () {
      return value != null && typeof value.toJSON === "function" ? value.toJSON() : value;
    };

    stream["fantasy-land/map"] = stream.map;

    stream["fantasy-land/ap"] = function (x) {
      return combine(function (s1, s2) {
        return s1()(s2());
      }, [x, stream]);
    };

    stream.unregisterChild = function (child) {
      var childIndex = dependentStreams.indexOf(child);

      if (childIndex !== -1) {
        dependentStreams.splice(childIndex, 1);
        dependentFns.splice(childIndex, 1);
      }
    };

    Object.defineProperty(stream, "end", {
      get: function get() {
        return end || createEnd();
      }
    });
    return stream;
  }

  function combine(fn, streams) {
    var ready = streams.every(function (s) {
      if (s.constructor !== Stream) throw new Error("Ensure that each item passed to stream.combine/stream.merge/lift is a stream");
      return s.state === "active";
    });
    var stream = ready ? Stream(fn.apply(null, streams.concat([streams]))) : Stream();
    var changed = [];
    var mappers = streams.map(function (s) {
      return s.map(function (value) {
        changed.push(s);

        if (ready || streams.every(function (s) {
          return s.state !== "pending";
        })) {
          ready = true;
          stream(fn.apply(null, streams.concat([changed])));
          changed = [];
        }

        return value;
      }, Stream.SKIP);
    });
    var endStream = stream.end.map(function (value) {
      if (value === true) {
        mappers.forEach(function (mapper) {
          mapper.end(true);
        });
        endStream.end(true);
      }

      return undefined;
    });
    return stream;
  }

  function merge(streams) {
    return combine(function () {
      return streams.map(function (s) {
        return s();
      });
    }, streams);
  }

  function scan(fn, acc, origin) {
    var stream = origin.map(function (v) {
      var next = fn(acc, v);
      if (next !== Stream.SKIP) acc = next;
      return next;
    });
    stream(acc);
    return stream;
  }

  function scanMerge(tuples, seed) {
    var streams = tuples.map(function (tuple) {
      return tuple[0];
    });
    var stream = combine(function () {
      var changed = arguments[arguments.length - 1];
      streams.forEach(function (stream, i) {
        if (changed.indexOf(stream) > -1) seed = tuples[i][1](seed, stream());
      });
      return seed;
    }, streams);
    stream(seed);
    return stream;
  }

  function lift() {
    var fn = arguments[0];
    var streams = Array.prototype.slice.call(arguments, 1);
    return merge(streams).map(function (streams) {
      return fn.apply(undefined, streams);
    });
  }

  function open(s) {
    return s.state === "pending" || s.state === "active" || s.state === "changing";
  }

  if (typeof module !== "undefined") module["exports"] = Stream;else if (typeof window.m === "function" && !("stream" in window.m)) window.m.stream = Stream;else window.m = {
    stream: Stream
  };
})();
  })();
});
require.register("mithril/api/mount-redraw.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode");

module.exports = function (render, schedule, console) {
  var subscriptions = [];
  var rendering = false;
  var pending = false;

  function sync() {
    if (rendering) throw new Error("Nested m.redraw.sync() call");
    rendering = true;

    for (var i = 0; i < subscriptions.length; i += 2) {
      try {
        render(subscriptions[i], Vnode(subscriptions[i + 1]), redraw);
      } catch (e) {
        console.error(e);
      }
    }

    rendering = false;
  }

  function redraw() {
    if (!pending) {
      pending = true;
      schedule(function () {
        pending = false;
        sync();
      });
    }
  }

  redraw.sync = sync;

  function mount(root, component) {
    if (component != null && component.view == null && typeof component !== "function") {
      throw new TypeError("m.mount(element, component) expects a component, not a vnode");
    }

    var index = subscriptions.indexOf(root);

    if (index >= 0) {
      subscriptions.splice(index, 2);
      render(root, [], redraw);
    }

    if (component != null) {
      subscriptions.push(root, component);
      render(root, Vnode(component), redraw);
    }
  }

  return {
    mount: mount,
    redraw: redraw
  };
};
  })();
});;
require.register("mithril/api/router.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode");

var m = require("../render/hyperscript");

var Promise = require("../promise/promise");

var buildPathname = require("../pathname/build");

var parsePathname = require("../pathname/parse");

var compileTemplate = require("../pathname/compileTemplate");

var assign = require("../pathname/assign");

var sentinel = {};

module.exports = function ($window, mountRedraw) {
  var fireAsync;

  function setPath(path, data, options) {
    path = buildPathname(path, data);

    if (fireAsync != null) {
      fireAsync();
      var state = options ? options.state : null;
      var title = options ? options.title : null;
      if (options && options.replace) $window.history.replaceState(state, title, route.prefix + path);else $window.history.pushState(state, title, route.prefix + path);
    } else {
      $window.location.href = route.prefix + path;
    }
  }

  var currentResolver = sentinel,
      component,
      attrs,
      currentPath,
      _lastUpdate;

  var SKIP = route.SKIP = {};

  function route(root, defaultRoute, routes) {
    if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined"); // 0 = start
    // 1 = init
    // 2 = ready

    var state = 0;
    var compiled = Object.keys(routes).map(function (route) {
      if (route[0] !== "/") throw new SyntaxError("Routes must start with a `/`");

      if (/:([^\/\.-]+)(\.{3})?:/.test(route)) {
        throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");
      }

      return {
        route: route,
        component: routes[route],
        check: compileTemplate(route)
      };
    });
    var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
    var p = Promise.resolve();
    var scheduled = false;
    var onremove;
    fireAsync = null;

    if (defaultRoute != null) {
      var defaultData = parsePathname(defaultRoute);

      if (!compiled.some(function (i) {
        return i.check(defaultData);
      })) {
        throw new ReferenceError("Default route doesn't match any known routes");
      }
    }

    function resolveRoute() {
      scheduled = false; // Consider the pathname holistically. The prefix might even be invalid,
      // but that's not our problem.

      var prefix = $window.location.hash;

      if (route.prefix[0] !== "#") {
        prefix = $window.location.search + prefix;

        if (route.prefix[0] !== "?") {
          prefix = $window.location.pathname + prefix;
          if (prefix[0] !== "/") prefix = "/" + prefix;
        }
      } // This seemingly useless `.concat()` speeds up the tests quite a bit,
      // since the representation is consistently a relatively poorly
      // optimized cons string.


      var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent).slice(route.prefix.length);
      var data = parsePathname(path);
      assign(data.params, $window.history.state);

      function fail() {
        if (path === defaultRoute) throw new Error("Could not resolve default route " + defaultRoute);
        setPath(defaultRoute, null, {
          replace: true
        });
      }

      loop(0);

      function loop(i) {
        // 0 = init
        // 1 = scheduled
        // 2 = done
        for (; i < compiled.length; i++) {
          if (compiled[i].check(data)) {
            var payload = compiled[i].component;
            var matchedRoute = compiled[i].route;
            var localComp = payload;

            var update = _lastUpdate = function lastUpdate(comp) {
              if (update !== _lastUpdate) return;
              if (comp === SKIP) return loop(i + 1);
              component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
              attrs = data.params, currentPath = path, _lastUpdate = null;
              currentResolver = payload.render ? payload : null;
              if (state === 2) mountRedraw.redraw();else {
                state = 2;
                mountRedraw.redraw.sync();
              }
            }; // There's no understating how much I *wish* I could
            // use `async`/`await` here...


            if (payload.view || typeof payload === "function") {
              payload = {};
              update(localComp);
            } else if (payload.onmatch) {
              p.then(function () {
                return payload.onmatch(data.params, path, matchedRoute);
              }).then(update, fail);
            } else update("div");

            return;
          }
        }

        fail();
      }
    } // Set it unconditionally so `m.route.set` and `m.route.Link` both work,
    // even if neither `pushState` nor `hashchange` are supported. It's
    // cleared if `hashchange` is used, since that makes it automatically
    // async.


    fireAsync = function fireAsync() {
      if (!scheduled) {
        scheduled = true;
        callAsync(resolveRoute);
      }
    };

    if (typeof $window.history.pushState === "function") {
      onremove = function onremove() {
        $window.removeEventListener("popstate", fireAsync, false);
      };

      $window.addEventListener("popstate", fireAsync, false);
    } else if (route.prefix[0] === "#") {
      fireAsync = null;

      onremove = function onremove() {
        $window.removeEventListener("hashchange", resolveRoute, false);
      };

      $window.addEventListener("hashchange", resolveRoute, false);
    }

    return mountRedraw.mount(root, {
      onbeforeupdate: function onbeforeupdate() {
        state = state ? 2 : 1;
        return !(!state || sentinel === currentResolver);
      },
      oncreate: resolveRoute,
      onremove: onremove,
      view: function view() {
        if (!state || sentinel === currentResolver) return; // Wrap in a fragment to preserve existing key semantics

        var vnode = [Vnode(component, attrs.key, attrs)];
        if (currentResolver) vnode = currentResolver.render(vnode[0]);
        return vnode;
      }
    });
  }

  route.set = function (path, data, options) {
    if (_lastUpdate != null) {
      options = options || {};
      options.replace = true;
    }

    _lastUpdate = null;
    setPath(path, data, options);
  };

  route.get = function () {
    return currentPath;
  };

  route.prefix = "#!";
  route.Link = {
    view: function view(vnode) {
      var options = vnode.attrs.options; // Remove these so they don't get overwritten

      var attrs = {},
          onclick,
          href;
      assign(attrs, vnode.attrs); // The first two are internal, but the rest are magic attributes
      // that need censored to not screw up rendering.

      attrs.selector = attrs.options = attrs.key = attrs.oninit = attrs.oncreate = attrs.onbeforeupdate = attrs.onupdate = attrs.onbeforeremove = attrs.onremove = null; // Do this now so we can get the most current `href` and `disabled`.
      // Those attributes may also be specified in the selector, and we
      // should honor that.

      var child = m(vnode.attrs.selector || "a", attrs, vnode.children); // Let's provide a *right* way to disable a route link, rather than
      // letting people screw up accessibility on accident.
      //
      // The attribute is coerced so users don't get surprised over
      // `disabled: 0` resulting in a button that's somehow routable
      // despite being visibly disabled.

      if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
        child.attrs.href = null;
        child.attrs["aria-disabled"] = "true"; // If you *really* do want to do this on a disabled link, use
        // an `oncreate` hook to add it.

        child.attrs.onclick = null;
      } else {
        onclick = child.attrs.onclick;
        href = child.attrs.href;
        child.attrs.href = route.prefix + href;

        child.attrs.onclick = function (e) {
          var result;

          if (typeof onclick === "function") {
            result = onclick.call(e.currentTarget, e);
          } else if (onclick == null || typeof onclick !== "object") {// do nothing
          } else if (typeof onclick.handleEvent === "function") {
            onclick.handleEvent(e);
          } // Adapted from React Router's implementation:
          // https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js
          //
          // Try to be flexible and intuitive in how we handle links.
          // Fun fact: links aren't as obvious to get right as you
          // would expect. There's a lot more valid ways to click a
          // link than this, and one might want to not simply click a
          // link, but right click or command-click it to copy the
          // link target, etc. Nope, this isn't just for blind people.


          if ( // Skip if `onclick` prevented default
          result !== false && !e.defaultPrevented && ( // Ignore everything but left clicks
          e.button === 0 || e.which === 0 || e.which === 1) && ( // Let the browser handle `target=_blank`, etc.
          !e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
          !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
            e.preventDefault();
            e.redraw = false;
            route.set(href, null, options);
          }
        };
      }

      return child;
    }
  };

  route.param = function (key) {
    return attrs && key != null ? attrs[key] : attrs;
  };

  return route;
};
  })();
});;
require.register("mithril/hyperscript.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var hyperscript = require("./render/hyperscript");

hyperscript.trust = require("./render/trust");
hyperscript.fragment = require("./render/fragment");
module.exports = hyperscript;
  })();
});;
require.register("mithril/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var hyperscript = require("./hyperscript");

var request = require("./request");

var mountRedraw = require("./mount-redraw");

var m = function m() {
  return hyperscript.apply(this, arguments);
};

m.m = hyperscript;
m.trust = hyperscript.trust;
m.fragment = hyperscript.fragment;
m.mount = mountRedraw.mount;
m.route = require("./route");
m.render = require("./render");
m.redraw = mountRedraw.redraw;
m.request = request.request;
m.jsonp = request.jsonp;
m.parseQueryString = require("./querystring/parse");
m.buildQueryString = require("./querystring/build");
m.parsePathname = require("./pathname/parse");
m.buildPathname = require("./pathname/build");
m.vnode = require("./render/vnode");
m.PromisePolyfill = require("./promise/polyfill");
module.exports = m;
  })();
});;
require.register("mithril/mount-redraw.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var render = require("./render");

module.exports = require("./api/mount-redraw")(render, requestAnimationFrame, console);
  })();
});;
require.register("mithril/pathname/assign.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

module.exports = Object.assign || function (target, source) {
  if (source) Object.keys(source).forEach(function (key) {
    target[key] = source[key];
  });
};
  })();
});;
require.register("mithril/pathname/build.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var buildQueryString = require("../querystring/build");

var assign = require("./assign"); // Returns `path` from `template` + `params`


module.exports = function (template, params) {
  if (/:([^\/\.-]+)(\.{3})?:/.test(template)) {
    throw new SyntaxError("Template parameter names *must* be separated");
  }

  if (params == null) return template;
  var queryIndex = template.indexOf("?");
  var hashIndex = template.indexOf("#");
  var queryEnd = hashIndex < 0 ? template.length : hashIndex;
  var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
  var path = template.slice(0, pathEnd);
  var query = {};
  assign(query, params);
  var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function (m, key, variadic) {
    delete query[key]; // If no such parameter exists, don't interpolate it.

    if (params[key] == null) return m; // Escape normal parameters, but not variadic ones.

    return variadic ? params[key] : encodeURIComponent(String(params[key]));
  }); // In case the template substitution adds new query/hash parameters.

  var newQueryIndex = resolved.indexOf("?");
  var newHashIndex = resolved.indexOf("#");
  var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
  var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
  var result = resolved.slice(0, newPathEnd);
  if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
  if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
  var querystring = buildQueryString(query);
  if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
  if (hashIndex >= 0) result += template.slice(hashIndex);
  if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
  return result;
};
  })();
});;
require.register("mithril/pathname/compileTemplate.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var parsePathname = require("./parse"); // Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.


module.exports = function (template) {
  var templateData = parsePathname(template);
  var templateKeys = Object.keys(templateData.params);
  var keys = [];
  var regexp = new RegExp("^" + templateData.path.replace( // I escape literal text so people can use things like `:file.:ext` or
  // `:lang-:locale` in routes. This is all merged into one pass so I
  // don't also accidentally escape `-` and make it harder to detect it to
  // ban it from template parameters.
  /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, function (m, key, extra) {
    if (key == null) return "\\" + m;
    keys.push({
      k: key,
      r: extra === "..."
    });
    if (extra === "...") return "(.*)";
    if (extra === ".") return "([^/]+)\\.";
    return "([^/]+)" + (extra || "");
  }) + "$");
  return function (data) {
    // First, check the params. Usually, there isn't any, and it's just
    // checking a static set.
    for (var i = 0; i < templateKeys.length; i++) {
      if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false;
    } // If no interpolations exist, let's skip all the ceremony


    if (!keys.length) return regexp.test(data.path);
    var values = regexp.exec(data.path);
    if (values == null) return false;

    for (var i = 0; i < keys.length; i++) {
      data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
    }

    return true;
  };
};
  })();
});;
require.register("mithril/pathname/parse.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var parseQueryString = require("../querystring/parse"); // Returns `{path, params}` from `url`


module.exports = function (url) {
  var queryIndex = url.indexOf("?");
  var hashIndex = url.indexOf("#");
  var queryEnd = hashIndex < 0 ? url.length : hashIndex;
  var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
  var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
  if (!path) path = "/";else {
    if (path[0] !== "/") path = "/" + path;
    if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1);
  }
  return {
    path: path,
    params: queryIndex < 0 ? {} : parseQueryString(url.slice(queryIndex + 1, queryEnd))
  };
};
  })();
});;
require.register("mithril/promise/polyfill.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";
/** @constructor */

var PromisePolyfill = function PromisePolyfill(executor) {
  if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`");
  if (typeof executor !== "function") throw new TypeError("executor must be a function");
  var self = this,
      resolvers = [],
      rejectors = [],
      resolveCurrent = handler(resolvers, true),
      rejectCurrent = handler(rejectors, false);
  var instance = self._instance = {
    resolvers: resolvers,
    rejectors: rejectors
  };
  var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;

  function handler(list, shouldAbsorb) {
    return function execute(value) {
      var then;

      try {
        if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
          if (value === self) throw new TypeError("Promise can't be resolved w/ itself");
          executeOnce(then.bind(value));
        } else {
          callAsync(function () {
            if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);

            for (var i = 0; i < list.length; i++) {
              list[i](value);
            }

            resolvers.length = 0, rejectors.length = 0;
            instance.state = shouldAbsorb;

            instance.retry = function () {
              execute(value);
            };
          });
        }
      } catch (e) {
        rejectCurrent(e);
      }
    };
  }

  function executeOnce(then) {
    var runs = 0;

    function run(fn) {
      return function (value) {
        if (runs++ > 0) return;
        fn(value);
      };
    }

    var onerror = run(rejectCurrent);

    try {
      then(run(resolveCurrent), onerror);
    } catch (e) {
      onerror(e);
    }
  }

  executeOnce(executor);
};

PromisePolyfill.prototype.then = function (onFulfilled, onRejection) {
  var self = this,
      instance = self._instance;

  function handle(callback, list, next, state) {
    list.push(function (value) {
      if (typeof callback !== "function") next(value);else try {
        resolveNext(callback(value));
      } catch (e) {
        if (rejectNext) rejectNext(e);
      }
    });
    if (typeof instance.retry === "function" && state === instance.state) instance.retry();
  }

  var resolveNext, rejectNext;
  var promise = new PromisePolyfill(function (resolve, reject) {
    resolveNext = resolve, rejectNext = reject;
  });
  handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
  return promise;
};

PromisePolyfill.prototype.catch = function (onRejection) {
  return this.then(null, onRejection);
};

PromisePolyfill.prototype.finally = function (callback) {
  return this.then(function (value) {
    return PromisePolyfill.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return PromisePolyfill.resolve(callback()).then(function () {
      return PromisePolyfill.reject(reason);
    });
  });
};

PromisePolyfill.resolve = function (value) {
  if (value instanceof PromisePolyfill) return value;
  return new PromisePolyfill(function (resolve) {
    resolve(value);
  });
};

PromisePolyfill.reject = function (value) {
  return new PromisePolyfill(function (resolve, reject) {
    reject(value);
  });
};

PromisePolyfill.all = function (list) {
  return new PromisePolyfill(function (resolve, reject) {
    var total = list.length,
        count = 0,
        values = [];
    if (list.length === 0) resolve([]);else for (var i = 0; i < list.length; i++) {
      (function (i) {
        function consume(value) {
          count++;
          values[i] = value;
          if (count === total) resolve(values);
        }

        if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
          list[i].then(consume, reject);
        } else consume(list[i]);
      })(i);
    }
  });
};

PromisePolyfill.race = function (list) {
  return new PromisePolyfill(function (resolve, reject) {
    for (var i = 0; i < list.length; i++) {
      list[i].then(resolve, reject);
    }
  });
};

module.exports = PromisePolyfill;
  })();
});;
require.register("mithril/promise/promise.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var PromisePolyfill = require("./polyfill");

if (typeof window !== "undefined") {
  if (typeof window.Promise === "undefined") {
    window.Promise = PromisePolyfill;
  } else if (!window.Promise.prototype.finally) {
    window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
  }

  module.exports = window.Promise;
} else if (typeof global !== "undefined") {
  if (typeof global.Promise === "undefined") {
    global.Promise = PromisePolyfill;
  } else if (!global.Promise.prototype.finally) {
    global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
  }

  module.exports = global.Promise;
} else {
  module.exports = PromisePolyfill;
}
  })();
});;
require.register("mithril/querystring/build.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

module.exports = function (object) {
  if (Object.prototype.toString.call(object) !== "[object Object]") return "";
  var args = [];

  for (var key in object) {
    destructure(key, object[key]);
  }

  return args.join("&");

  function destructure(key, value) {
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        destructure(key + "[" + i + "]", value[i]);
      }
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      for (var i in value) {
        destructure(key + "[" + i + "]", value[i]);
      }
    } else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
  }
};
  })();
});;
require.register("mithril/querystring/parse.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

module.exports = function (string) {
  if (string === "" || string == null) return {};
  if (string.charAt(0) === "?") string = string.slice(1);
  var entries = string.split("&"),
      counters = {},
      data = {};

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i].split("=");
    var key = decodeURIComponent(entry[0]);
    var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
    if (value === "true") value = true;else if (value === "false") value = false;
    var levels = key.split(/\]\[?|\[/);
    var cursor = data;
    if (key.indexOf("[") > -1) levels.pop();

    for (var j = 0; j < levels.length; j++) {
      var level = levels[j],
          nextLevel = levels[j + 1];
      var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));

      if (level === "") {
        var key = levels.slice(0, j).join();

        if (counters[key] == null) {
          counters[key] = Array.isArray(cursor) ? cursor.length : 0;
        }

        level = counters[key]++;
      } // Disallow direct prototype pollution
      else if (level === "__proto__") break;

      if (j === levels.length - 1) cursor[level] = value;else {
        // Read own properties exclusively to disallow indirect
        // prototype pollution
        var desc = Object.getOwnPropertyDescriptor(cursor, level);
        if (desc != null) desc = desc.value;
        if (desc == null) cursor[level] = desc = isNumber ? [] : {};
        cursor = desc;
      }
    }
  }

  return data;
};
  })();
});;
require.register("mithril/render.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

module.exports = require("./render/render")(window);
  })();
});;
require.register("mithril/render/fragment.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode");

var hyperscriptVnode = require("./hyperscriptVnode");

module.exports = function () {
  var vnode = hyperscriptVnode.apply(0, arguments);
  vnode.tag = "[";
  vnode.children = Vnode.normalizeChildren(vnode.children);
  return vnode;
};
  })();
});;
require.register("mithril/render/hyperscript.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode");

var hyperscriptVnode = require("./hyperscriptVnode");

var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
var selectorCache = {};
var hasOwn = {}.hasOwnProperty;

function isEmpty(object) {
  for (var key in object) {
    if (hasOwn.call(object, key)) return false;
  }

  return true;
}

function compileSelector(selector) {
  var match,
      tag = "div",
      classes = [],
      attrs = {};

  while (match = selectorParser.exec(selector)) {
    var type = match[1],
        value = match[2];
    if (type === "" && value !== "") tag = value;else if (type === "#") attrs.id = value;else if (type === ".") classes.push(value);else if (match[3][0] === "[") {
      var attrValue = match[6];
      if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
      if (match[4] === "class") classes.push(attrValue);else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
    }
  }

  if (classes.length > 0) attrs.className = classes.join(" ");
  return selectorCache[selector] = {
    tag: tag,
    attrs: attrs
  };
}

function execSelector(state, vnode) {
  var attrs = vnode.attrs;
  var children = Vnode.normalizeChildren(vnode.children);
  var hasClass = hasOwn.call(attrs, "class");
  var className = hasClass ? attrs.class : attrs.className;
  vnode.tag = state.tag;
  vnode.attrs = null;
  vnode.children = undefined;

  if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
    var newAttrs = {};

    for (var key in attrs) {
      if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key];
    }

    attrs = newAttrs;
  }

  for (var key in state.attrs) {
    if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)) {
      attrs[key] = state.attrs[key];
    }
  }

  if (className != null || state.attrs.className != null) attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
  if (hasClass) attrs.class = null;

  for (var key in attrs) {
    if (hasOwn.call(attrs, key) && key !== "key") {
      vnode.attrs = attrs;
      break;
    }
  }

  if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
    vnode.text = children[0].children;
  } else {
    vnode.children = children;
  }

  return vnode;
}

function hyperscript(selector) {
  if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
    throw Error("The selector must be either a string or a component.");
  }

  var vnode = hyperscriptVnode.apply(1, arguments);

  if (typeof selector === "string") {
    vnode.children = Vnode.normalizeChildren(vnode.children);
    if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
  }

  vnode.tag = selector;
  return vnode;
}

module.exports = hyperscript;
  })();
});;
require.register("mithril/render/hyperscriptVnode.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode"); // Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }


module.exports = function () {
  var attrs = arguments[this],
      start = this + 1,
      children;

  if (attrs == null) {
    attrs = {};
  } else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
    attrs = {};
    start = this;
  }

  if (arguments.length === start + 1) {
    children = arguments[start];
    if (!Array.isArray(children)) children = [children];
  } else {
    children = [];

    while (start < arguments.length) {
      children.push(arguments[start++]);
    }
  }

  return Vnode("", attrs.key, attrs, children);
};
  })();
});;
require.register("mithril/render/render.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode");

module.exports = function ($window) {
  var $doc = $window && $window.document;
  var currentRedraw;
  var nameSpace = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML"
  };

  function getNameSpace(vnode) {
    return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
  } //sanity check to discourage people from doing `vnode.state = ...`


  function checkState(vnode, original) {
    if (vnode.state !== original) throw new Error("`vnode.state` must not be modified");
  } //Note: the hook is passed as the `this` argument to allow proxying the
  //arguments without requiring a full array allocation to do so. It also
  //takes advantage of the fact the current `vnode` is the first argument in
  //all lifecycle methods.


  function callHook(vnode) {
    var original = vnode.state;

    try {
      return this.apply(original, arguments);
    } finally {
      checkState(vnode, original);
    }
  } // IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
  // inside an iframe. Catch and swallow this error, and heavy-handidly return null.


  function activeElement() {
    try {
      return $doc.activeElement;
    } catch (e) {
      return null;
    }
  } //create


  function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
    for (var i = start; i < end; i++) {
      var vnode = vnodes[i];

      if (vnode != null) {
        createNode(parent, vnode, hooks, ns, nextSibling);
      }
    }
  }

  function createNode(parent, vnode, hooks, ns, nextSibling) {
    var tag = vnode.tag;

    if (typeof tag === "string") {
      vnode.state = {};
      if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);

      switch (tag) {
        case "#":
          createText(parent, vnode, nextSibling);
          break;

        case "<":
          createHTML(parent, vnode, ns, nextSibling);
          break;

        case "[":
          createFragment(parent, vnode, hooks, ns, nextSibling);
          break;

        default:
          createElement(parent, vnode, hooks, ns, nextSibling);
      }
    } else createComponent(parent, vnode, hooks, ns, nextSibling);
  }

  function createText(parent, vnode, nextSibling) {
    vnode.dom = $doc.createTextNode(vnode.children);
    insertNode(parent, vnode.dom, nextSibling);
  }

  var possibleParents = {
    caption: "table",
    thead: "table",
    tbody: "table",
    tfoot: "table",
    tr: "tbody",
    th: "tr",
    td: "tr",
    colgroup: "table",
    col: "colgroup"
  };

  function createHTML(parent, vnode, ns, nextSibling) {
    var match = vnode.children.match(/^\s*?<(\w+)/im) || []; // not using the proper parent makes the child element(s) vanish.
    //     var div = document.createElement("div")
    //     div.innerHTML = "<td>i</td><td>j</td>"
    //     console.log(div.innerHTML)
    // --> "ij", no <td> in sight.

    var temp = $doc.createElement(possibleParents[match[1]] || "div");

    if (ns === "http://www.w3.org/2000/svg") {
      temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode.children + "</svg>";
      temp = temp.firstChild;
    } else {
      temp.innerHTML = vnode.children;
    }

    vnode.dom = temp.firstChild;
    vnode.domSize = temp.childNodes.length; // Capture nodes to remove, so we don't confuse them.

    vnode.instance = [];
    var fragment = $doc.createDocumentFragment();
    var child;

    while (child = temp.firstChild) {
      vnode.instance.push(child);
      fragment.appendChild(child);
    }

    insertNode(parent, fragment, nextSibling);
  }

  function createFragment(parent, vnode, hooks, ns, nextSibling) {
    var fragment = $doc.createDocumentFragment();

    if (vnode.children != null) {
      var children = vnode.children;
      createNodes(fragment, children, 0, children.length, hooks, null, ns);
    }

    vnode.dom = fragment.firstChild;
    vnode.domSize = fragment.childNodes.length;
    insertNode(parent, fragment, nextSibling);
  }

  function createElement(parent, vnode, hooks, ns, nextSibling) {
    var tag = vnode.tag;
    var attrs = vnode.attrs;
    var is = attrs && attrs.is;
    ns = getNameSpace(vnode) || ns;
    var element = ns ? is ? $doc.createElementNS(ns, tag, {
      is: is
    }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, {
      is: is
    }) : $doc.createElement(tag);
    vnode.dom = element;

    if (attrs != null) {
      setAttrs(vnode, attrs, ns);
    }

    insertNode(parent, element, nextSibling);

    if (!maybeSetContentEditable(vnode)) {
      if (vnode.text != null) {
        if (vnode.text !== "") element.textContent = vnode.text;else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)];
      }

      if (vnode.children != null) {
        var children = vnode.children;
        createNodes(element, children, 0, children.length, hooks, null, ns);
        if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs);
      }
    }
  }

  function initComponent(vnode, hooks) {
    var sentinel;

    if (typeof vnode.tag.view === "function") {
      vnode.state = Object.create(vnode.tag);
      sentinel = vnode.state.view;
      if (sentinel.$$reentrantLock$$ != null) return;
      sentinel.$$reentrantLock$$ = true;
    } else {
      vnode.state = void 0;
      sentinel = vnode.tag;
      if (sentinel.$$reentrantLock$$ != null) return;
      sentinel.$$reentrantLock$$ = true;
      vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
    }

    initLifecycle(vnode.state, vnode, hooks);
    if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
    vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
    if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
    sentinel.$$reentrantLock$$ = null;
  }

  function createComponent(parent, vnode, hooks, ns, nextSibling) {
    initComponent(vnode, hooks);

    if (vnode.instance != null) {
      createNode(parent, vnode.instance, hooks, ns, nextSibling);
      vnode.dom = vnode.instance.dom;
      vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
    } else {
      vnode.domSize = 0;
    }
  } //update

  /**
   * @param {Element|Fragment} parent - the parent element
   * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
   *                               this part of the tree
   * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
   * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
   * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
   *                                       fragment that is not the last item in its
   *                                       parent
   * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
   * @returns void
   */
  // This function diffs and patches lists of vnodes, both keyed and unkeyed.
  //
  // We will:
  //
  // 1. describe its general structure
  // 2. focus on the diff algorithm optimizations
  // 3. discuss DOM node operations.
  // ## Overview:
  //
  // The updateNodes() function:
  // - deals with trivial cases
  // - determines whether the lists are keyed or unkeyed based on the first non-null node
  //   of each list.
  // - diffs them and patches the DOM if needed (that's the brunt of the code)
  // - manages the leftovers: after diffing, are there:
  //   - old nodes left to remove?
  // 	 - new nodes to insert?
  // 	 deal with them!
  //
  // The lists are only iterated over once, with an exception for the nodes in `old` that
  // are visited in the fourth part of the diff and in the `removeNodes` loop.
  // ## Diffing
  //
  // Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
  // may be good for context on longest increasing subsequence-based logic for moving nodes.
  //
  // In order to diff keyed lists, one has to
  //
  // 1) match nodes in both lists, per key, and update them accordingly
  // 2) create the nodes present in the new list, but absent in the old one
  // 3) remove the nodes present in the old list, but absent in the new one
  // 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
  //
  // To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
  // over the new list and for each new vnode, find the corresponding vnode in the old list using
  // the map.
  // 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
  // and must be created.
  // For the removals, we actually remove the nodes that have been updated from the old list.
  // The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
  // The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
  // algorithm.
  //
  // the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
  // from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
  // corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
  //  match the above lists, for example).
  //
  // In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
  // can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
  //
  // @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
  // the longest increasing subsequence *of old nodes still present in the new list*).
  //
  // It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
  // and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
  // the `LIS` and a temporary one to create the LIS).
  //
  // So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
  // the LIS and can be updated without moving them.
  //
  // If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
  // the exception of the last node if the list is fully reversed).
  //
  // ## Finding the next sibling.
  //
  // `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
  // When the list is being traversed top-down, at any index, the DOM nodes up to the previous
  // vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
  // list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
  //
  // In the other scenarios (swaps, upwards traversal, map-based diff),
  // the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
  // bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
  // as the next sibling (cached in the `nextSibling` variable).
  // ## DOM node moves
  //
  // In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
  // this is not the case if the node moved (second and fourth part of the diff algo). We move
  // the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
  // variable rather than fetching it using `getNextSibling()`.
  //
  // The fourth part of the diff currently inserts nodes unconditionally, leading to issues
  // like #1791 and #1999. We need to be smarter about those situations where adjascent old
  // nodes remain together in the new list in a way that isn't covered by parts one and
  // three of the diff algo.


  function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
    if (old === vnodes || old == null && vnodes == null) return;else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length);else {
      var isOldKeyed = old[0] != null && old[0].key != null;
      var isKeyed = vnodes[0] != null && vnodes[0].key != null;
      var start = 0,
          oldStart = 0;
      if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) {
        oldStart++;
      }
      if (!isKeyed) while (start < vnodes.length && vnodes[start] == null) {
        start++;
      }
      if (isKeyed === null && isOldKeyed == null) return; // both lists are full of nulls

      if (isOldKeyed !== isKeyed) {
        removeNodes(parent, old, oldStart, old.length);
        createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
      } else if (!isKeyed) {
        // Don't index past the end of either list (causes deopts).
        var commonLength = old.length < vnodes.length ? old.length : vnodes.length; // Rewind if necessary to the first non-null index on either side.
        // We could alternatively either explicitly create or remove nodes when `start !== oldStart`
        // but that would be optimizing for sparse lists which are more rare than dense ones.

        start = start < oldStart ? start : oldStart;

        for (; start < commonLength; start++) {
          o = old[start];
          v = vnodes[start];
          if (o === v || o == null && v == null) continue;else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));else if (v == null) removeNode(parent, o);else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
        }

        if (old.length > commonLength) removeNodes(parent, old, start, old.length);
        if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
      } else {
        // keyed diff
        var oldEnd = old.length - 1,
            end = vnodes.length - 1,
            map,
            o,
            v,
            oe,
            ve,
            topSibling; // bottom-up

        while (oldEnd >= oldStart && end >= start) {
          oe = old[oldEnd];
          ve = vnodes[end];
          if (oe.key !== ve.key) break;
          if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
          if (ve.dom != null) nextSibling = ve.dom;
          oldEnd--, end--;
        } // top-down


        while (oldEnd >= oldStart && end >= start) {
          o = old[oldStart];
          v = vnodes[start];
          if (o.key !== v.key) break;
          oldStart++, start++;
          if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
        } // swaps and list reversals


        while (oldEnd >= oldStart && end >= start) {
          if (start === end) break;
          if (o.key !== ve.key || oe.key !== v.key) break;
          topSibling = getNextSibling(old, oldStart, nextSibling);
          moveNodes(parent, oe, topSibling);
          if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns);
          if (++start <= --end) moveNodes(parent, o, nextSibling);
          if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
          if (ve.dom != null) nextSibling = ve.dom;
          oldStart++;
          oldEnd--;
          oe = old[oldEnd];
          ve = vnodes[end];
          o = old[oldStart];
          v = vnodes[start];
        } // bottom up once again


        while (oldEnd >= oldStart && end >= start) {
          if (oe.key !== ve.key) break;
          if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
          if (ve.dom != null) nextSibling = ve.dom;
          oldEnd--, end--;
          oe = old[oldEnd];
          ve = vnodes[end];
        }

        if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1);else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);else {
          // inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
          var originalNextSibling = nextSibling,
              vnodesLength = end - start + 1,
              oldIndices = new Array(vnodesLength),
              li = 0,
              i = 0,
              pos = 2147483647,
              matched = 0,
              map,
              lisIndices;

          for (i = 0; i < vnodesLength; i++) {
            oldIndices[i] = -1;
          }

          for (i = end; i >= start; i--) {
            if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1);
            ve = vnodes[i];
            var oldIndex = map[ve.key];

            if (oldIndex != null) {
              pos = oldIndex < pos ? oldIndex : -1; // becomes -1 if nodes were re-ordered

              oldIndices[i - start] = oldIndex;
              oe = old[oldIndex];
              old[oldIndex] = null;
              if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
              if (ve.dom != null) nextSibling = ve.dom;
              matched++;
            }
          }

          nextSibling = originalNextSibling;
          if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1);
          if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);else {
            if (pos === -1) {
              // the indices of the indices of the items that are part of the
              // longest increasing subsequence in the oldIndices list
              lisIndices = makeLisIndices(oldIndices);
              li = lisIndices.length - 1;

              for (i = end; i >= start; i--) {
                v = vnodes[i];
                if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);else {
                  if (lisIndices[li] === i - start) li--;else moveNodes(parent, v, nextSibling);
                }
                if (v.dom != null) nextSibling = vnodes[i].dom;
              }
            } else {
              for (i = end; i >= start; i--) {
                v = vnodes[i];
                if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                if (v.dom != null) nextSibling = vnodes[i].dom;
              }
            }
          }
        }
      }
    }
  }

  function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
    var oldTag = old.tag,
        tag = vnode.tag;

    if (oldTag === tag) {
      vnode.state = old.state;
      vnode.events = old.events;
      if (shouldNotUpdate(vnode, old)) return;

      if (typeof oldTag === "string") {
        if (vnode.attrs != null) {
          updateLifecycle(vnode.attrs, vnode, hooks);
        }

        switch (oldTag) {
          case "#":
            updateText(old, vnode);
            break;

          case "<":
            updateHTML(parent, old, vnode, ns, nextSibling);
            break;

          case "[":
            updateFragment(parent, old, vnode, hooks, nextSibling, ns);
            break;

          default:
            updateElement(old, vnode, hooks, ns);
        }
      } else updateComponent(parent, old, vnode, hooks, nextSibling, ns);
    } else {
      removeNode(parent, old);
      createNode(parent, vnode, hooks, ns, nextSibling);
    }
  }

  function updateText(old, vnode) {
    if (old.children.toString() !== vnode.children.toString()) {
      old.dom.nodeValue = vnode.children;
    }

    vnode.dom = old.dom;
  }

  function updateHTML(parent, old, vnode, ns, nextSibling) {
    if (old.children !== vnode.children) {
      removeHTML(parent, old);
      createHTML(parent, vnode, ns, nextSibling);
    } else {
      vnode.dom = old.dom;
      vnode.domSize = old.domSize;
      vnode.instance = old.instance;
    }
  }

  function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
    updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
    var domSize = 0,
        children = vnode.children;
    vnode.dom = null;

    if (children != null) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child != null && child.dom != null) {
          if (vnode.dom == null) vnode.dom = child.dom;
          domSize += child.domSize || 1;
        }
      }

      if (domSize !== 1) vnode.domSize = domSize;
    }
  }

  function updateElement(old, vnode, hooks, ns) {
    var element = vnode.dom = old.dom;
    ns = getNameSpace(vnode) || ns;

    if (vnode.tag === "textarea") {
      if (vnode.attrs == null) vnode.attrs = {};

      if (vnode.text != null) {
        vnode.attrs.value = vnode.text; //FIXME handle multiple children

        vnode.text = undefined;
      }
    }

    updateAttrs(vnode, old.attrs, vnode.attrs, ns);

    if (!maybeSetContentEditable(vnode)) {
      if (old.text != null && vnode.text != null && vnode.text !== "") {
        if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text;
      } else {
        if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)];
        if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)];
        updateNodes(element, old.children, vnode.children, hooks, null, ns);
      }
    }
  }

  function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
    vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
    if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
    updateLifecycle(vnode.state, vnode, hooks);
    if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);

    if (vnode.instance != null) {
      if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
      vnode.dom = vnode.instance.dom;
      vnode.domSize = vnode.instance.domSize;
    } else if (old.instance != null) {
      removeNode(parent, old.instance);
      vnode.dom = undefined;
      vnode.domSize = 0;
    } else {
      vnode.dom = old.dom;
      vnode.domSize = old.domSize;
    }
  }

  function getKeyMap(vnodes, start, end) {
    var map = Object.create(null);

    for (; start < end; start++) {
      var vnode = vnodes[start];

      if (vnode != null) {
        var key = vnode.key;
        if (key != null) map[key] = start;
      }
    }

    return map;
  } // Lifted from ivi https://github.com/ivijs/ivi/
  // takes a list of unique numbers (-1 is special and can
  // occur multiple times) and returns an array with the indices
  // of the items that are part of the longest increasing
  // subsequece


  var lisTemp = [];

  function makeLisIndices(a) {
    var result = [0];
    var u = 0,
        v = 0,
        i = 0;
    var il = lisTemp.length = a.length;

    for (var i = 0; i < il; i++) {
      lisTemp[i] = a[i];
    }

    for (var i = 0; i < il; ++i) {
      if (a[i] === -1) continue;
      var j = result[result.length - 1];

      if (a[j] < a[i]) {
        lisTemp[i] = j;
        result.push(i);
        continue;
      }

      u = 0;
      v = result.length - 1;

      while (u < v) {
        // Fast integer average without overflow.
        // eslint-disable-next-line no-bitwise
        var c = (u >>> 1) + (v >>> 1) + (u & v & 1);

        if (a[result[c]] < a[i]) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (a[i] < a[result[u]]) {
        if (u > 0) lisTemp[i] = result[u - 1];
        result[u] = i;
      }
    }

    u = result.length;
    v = result[u - 1];

    while (u-- > 0) {
      result[u] = v;
      v = lisTemp[v];
    }

    lisTemp.length = 0;
    return result;
  }

  function getNextSibling(vnodes, i, nextSibling) {
    for (; i < vnodes.length; i++) {
      if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
    }

    return nextSibling;
  } // This covers a really specific edge case:
  // - Parent node is keyed and contains child
  // - Child is removed, returns unresolved promise in `onbeforeremove`
  // - Parent node is moved in keyed diff
  // - Remaining children still need moved appropriately
  //
  // Ideally, I'd track removed nodes as well, but that introduces a lot more
  // complexity and I'm not exactly interested in doing that.


  function moveNodes(parent, vnode, nextSibling) {
    var frag = $doc.createDocumentFragment();
    moveChildToFrag(parent, frag, vnode);
    insertNode(parent, frag, nextSibling);
  }

  function moveChildToFrag(parent, frag, vnode) {
    // Dodge the recursion overhead in a few of the most common cases.
    while (vnode.dom != null && vnode.dom.parentNode === parent) {
      if (typeof vnode.tag !== "string") {
        vnode = vnode.instance;
        if (vnode != null) continue;
      } else if (vnode.tag === "<") {
        for (var i = 0; i < vnode.instance.length; i++) {
          frag.appendChild(vnode.instance[i]);
        }
      } else if (vnode.tag !== "[") {
        // Don't recurse for text nodes *or* elements, just fragments
        frag.appendChild(vnode.dom);
      } else if (vnode.children.length === 1) {
        vnode = vnode.children[0];
        if (vnode != null) continue;
      } else {
        for (var i = 0; i < vnode.children.length; i++) {
          var child = vnode.children[i];
          if (child != null) moveChildToFrag(parent, frag, child);
        }
      }

      break;
    }
  }

  function insertNode(parent, dom, nextSibling) {
    if (nextSibling != null) parent.insertBefore(dom, nextSibling);else parent.appendChild(dom);
  }

  function maybeSetContentEditable(vnode) {
    if (vnode.attrs == null || vnode.attrs.contenteditable == null && // attribute
    vnode.attrs.contentEditable == null // property
    ) return false;
    var children = vnode.children;

    if (children != null && children.length === 1 && children[0].tag === "<") {
      var content = children[0].children;
      if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
    } else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted");

    return true;
  } //remove


  function removeNodes(parent, vnodes, start, end) {
    for (var i = start; i < end; i++) {
      var vnode = vnodes[i];
      if (vnode != null) removeNode(parent, vnode);
    }
  }

  function removeNode(parent, vnode) {
    var mask = 0;
    var original = vnode.state;
    var stateResult, attrsResult;

    if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
      var result = callHook.call(vnode.state.onbeforeremove, vnode);

      if (result != null && typeof result.then === "function") {
        mask = 1;
        stateResult = result;
      }
    }

    if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
      var result = callHook.call(vnode.attrs.onbeforeremove, vnode);

      if (result != null && typeof result.then === "function") {
        // eslint-disable-next-line no-bitwise
        mask |= 2;
        attrsResult = result;
      }
    }

    checkState(vnode, original); // If we can, try to fast-path it and avoid all the overhead of awaiting

    if (!mask) {
      onremove(vnode);
      removeChild(parent, vnode);
    } else {
      if (stateResult != null) {
        var next = function next() {
          // eslint-disable-next-line no-bitwise
          if (mask & 1) {
            mask &= 2;
            if (!mask) reallyRemove();
          }
        };

        stateResult.then(next, next);
      }

      if (attrsResult != null) {
        var next = function next() {
          // eslint-disable-next-line no-bitwise
          if (mask & 2) {
            mask &= 1;
            if (!mask) reallyRemove();
          }
        };

        attrsResult.then(next, next);
      }
    }

    function reallyRemove() {
      checkState(vnode, original);
      onremove(vnode);
      removeChild(parent, vnode);
    }
  }

  function removeHTML(parent, vnode) {
    for (var i = 0; i < vnode.instance.length; i++) {
      parent.removeChild(vnode.instance[i]);
    }
  }

  function removeChild(parent, vnode) {
    // Dodge the recursion overhead in a few of the most common cases.
    while (vnode.dom != null && vnode.dom.parentNode === parent) {
      if (typeof vnode.tag !== "string") {
        vnode = vnode.instance;
        if (vnode != null) continue;
      } else if (vnode.tag === "<") {
        removeHTML(parent, vnode);
      } else {
        if (vnode.tag !== "[") {
          parent.removeChild(vnode.dom);
          if (!Array.isArray(vnode.children)) break;
        }

        if (vnode.children.length === 1) {
          vnode = vnode.children[0];
          if (vnode != null) continue;
        } else {
          for (var i = 0; i < vnode.children.length; i++) {
            var child = vnode.children[i];
            if (child != null) removeChild(parent, child);
          }
        }
      }

      break;
    }
  }

  function onremove(vnode) {
    if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode);
    if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode);

    if (typeof vnode.tag !== "string") {
      if (vnode.instance != null) onremove(vnode.instance);
    } else {
      var children = vnode.children;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child != null) onremove(child);
        }
      }
    }
  } //attrs


  function setAttrs(vnode, attrs, ns) {
    for (var key in attrs) {
      setAttr(vnode, key, null, attrs[key], ns);
    }
  }

  function setAttr(vnode, key, old, value, ns) {
    if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object") return;
    if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value);
    if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);else if (key === "style") updateStyle(vnode.dom, old, value);else if (hasPropertyKey(vnode, key, ns)) {
      if (key === "value") {
        // Only do the coercion if we're actually going to check the value.

        /* eslint-disable no-implicit-coercion */
        //setting input[value] to same value by typing on focused element moves cursor to end in Chrome
        if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && vnode.dom === activeElement()) return; //setting select[value] to same value while having select open blinks select dropdown in Chrome

        if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return; //setting option[value] to same value while having select open blinks select dropdown in Chrome

        if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return;
        /* eslint-enable no-implicit-coercion */
      } // If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.


      if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value);else vnode.dom[key] = value;
    } else {
      if (typeof value === "boolean") {
        if (value) vnode.dom.setAttribute(key, "");else vnode.dom.removeAttribute(key);
      } else vnode.dom.setAttribute(key === "className" ? "class" : key, value);
    }
  }

  function removeAttr(vnode, key, old, ns) {
    if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return;
    if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined);else if (key === "style") updateStyle(vnode.dom, old, null);else if (hasPropertyKey(vnode, key, ns) && key !== "className" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement())) && !(vnode.tag === "input" && key === "type")) {
      vnode.dom[key] = null;
    } else {
      var nsLastIndex = key.indexOf(":");
      if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1);
      if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key);
    }
  }

  function setLateSelectAttrs(vnode, attrs) {
    if ("value" in attrs) {
      if (attrs.value === null) {
        if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null;
      } else {
        var normalized = "" + attrs.value; // eslint-disable-line no-implicit-coercion

        if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
          vnode.dom.value = normalized;
        }
      }
    }

    if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined);
  }

  function updateAttrs(vnode, old, attrs, ns) {
    if (attrs != null) {
      for (var key in attrs) {
        setAttr(vnode, key, old && old[key], attrs[key], ns);
      }
    }

    var val;

    if (old != null) {
      for (var key in old) {
        if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) {
          removeAttr(vnode, key, val, ns);
        }
      }
    }
  }

  function isFormAttribute(vnode, attr) {
    return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement;
  }

  function isLifecycleMethod(attr) {
    return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
  }

  function hasPropertyKey(vnode, key, ns) {
    // Filter out namespaced keys
    return ns === undefined && ( // If it's a custom element, just keep it.
    vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is || // If it's a normal element, let's try to avoid a few browser bugs.
    key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height" // && key !== "type"
    // Defer the property check until *after* we check everything.
    ) && key in vnode.dom;
  } //style


  var uppercaseRegex = /[A-Z]/g;

  function toLowerCase(capital) {
    return "-" + capital.toLowerCase();
  }

  function normalizeKey(key) {
    return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase);
  }

  function updateStyle(element, old, style) {
    if (old === style) {// Styles are equivalent, do nothing.
    } else if (style == null) {
      // New style is missing, just clear it.
      element.style.cssText = "";
    } else if (typeof style !== "object") {
      // New style is a string, let engine deal with patching.
      element.style.cssText = style;
    } else if (old == null || typeof old !== "object") {
      // `old` is missing or a string, `style` is an object.
      element.style.cssText = ""; // Add new style properties

      for (var key in style) {
        var value = style[key];
        if (value != null) element.style.setProperty(normalizeKey(key), String(value));
      }
    } else {
      // Both old & new are (different) objects.
      // Update style properties that have changed
      for (var key in style) {
        var value = style[key];

        if (value != null && (value = String(value)) !== String(old[key])) {
          element.style.setProperty(normalizeKey(key), value);
        }
      } // Remove style properties that no longer exist


      for (var key in old) {
        if (old[key] != null && style[key] == null) {
          element.style.removeProperty(normalizeKey(key));
        }
      }
    }
  } // Here's an explanation of how this works:
  // 1. The event names are always (by design) prefixed by `on`.
  // 2. The EventListener interface accepts either a function or an object
  //    with a `handleEvent` method.
  // 3. The object does not inherit from `Object.prototype`, to avoid
  //    any potential interference with that (e.g. setters).
  // 4. The event name is remapped to the handler before calling it.
  // 5. In function-based event handlers, `ev.target === this`. We replicate
  //    that below.
  // 6. In function-based event handlers, `return false` prevents the default
  //    action and stops event propagation. We replicate that below.


  function EventDict() {
    // Save this, so the current redraw is correctly tracked.
    this._ = currentRedraw;
  }

  EventDict.prototype = Object.create(null);

  EventDict.prototype.handleEvent = function (ev) {
    var handler = this["on" + ev.type];
    var result;
    if (typeof handler === "function") result = handler.call(ev.currentTarget, ev);else if (typeof handler.handleEvent === "function") handler.handleEvent(ev);
    if (this._ && ev.redraw !== false) (0, this._)();

    if (result === false) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }; //event


  function updateEvent(vnode, key, value) {
    if (vnode.events != null) {
      if (vnode.events[key] === value) return;

      if (value != null && (typeof value === "function" || typeof value === "object")) {
        if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false);
        vnode.events[key] = value;
      } else {
        if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
        vnode.events[key] = undefined;
      }
    } else if (value != null && (typeof value === "function" || typeof value === "object")) {
      vnode.events = new EventDict();
      vnode.dom.addEventListener(key.slice(2), vnode.events, false);
      vnode.events[key] = value;
    }
  } //lifecycle


  function initLifecycle(source, vnode, hooks) {
    if (typeof source.oninit === "function") callHook.call(source.oninit, vnode);
    if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode));
  }

  function updateLifecycle(source, vnode, hooks) {
    if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode));
  }

  function shouldNotUpdate(vnode, old) {
    do {
      if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
        var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
        if (force !== undefined && !force) break;
      }

      if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
        var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
        if (force !== undefined && !force) break;
      }

      return false;
    } while (false); // eslint-disable-line no-constant-condition


    vnode.dom = old.dom;
    vnode.domSize = old.domSize;
    vnode.instance = old.instance; // One would think having the actual latest attributes would be ideal,
    // but it doesn't let us properly diff based on our current internal
    // representation. We have to save not only the old DOM info, but also
    // the attributes used to create it, as we diff *that*, not against the
    // DOM directly (with a few exceptions in `setAttr`). And, of course, we
    // need to save the children and text as they are conceptually not
    // unlike special "attributes" internally.

    vnode.attrs = old.attrs;
    vnode.children = old.children;
    vnode.text = old.text;
    return true;
  }

  return function (dom, vnodes, redraw) {
    if (!dom) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
    var hooks = [];
    var active = activeElement();
    var namespace = dom.namespaceURI; // First time rendering into a node clears it out

    if (dom.vnodes == null) dom.textContent = "";
    vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
    var prevRedraw = currentRedraw;

    try {
      currentRedraw = typeof redraw === "function" ? redraw : undefined;
      updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace);
    } finally {
      currentRedraw = prevRedraw;
    }

    dom.vnodes = vnodes; // `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement

    if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus();

    for (var i = 0; i < hooks.length; i++) {
      hooks[i]();
    }
  };
};
  })();
});;
require.register("mithril/render/trust.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var Vnode = require("../render/vnode");

module.exports = function (html) {
  if (html == null) html = "";
  return Vnode("<", undefined, undefined, html, undefined, undefined);
};
  })();
});;
require.register("mithril/render/vnode.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

function Vnode(tag, key, attrs, children, text, dom) {
  return {
    tag: tag,
    key: key,
    attrs: attrs,
    children: children,
    text: text,
    dom: dom,
    domSize: undefined,
    state: undefined,
    events: undefined,
    instance: undefined
  };
}

Vnode.normalize = function (node) {
  if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined);
  if (node == null || typeof node === "boolean") return null;
  if (typeof node === "object") return node;
  return Vnode("#", undefined, undefined, String(node), undefined, undefined);
};

Vnode.normalizeChildren = function (input) {
  var children = [];

  if (input.length) {
    var isKeyed = input[0] != null && input[0].key != null; // Note: this is a *very* perf-sensitive check.
    // Fun fact: merging the loop like this is somehow faster than splitting
    // it, noticeably so.

    for (var i = 1; i < input.length; i++) {
      if ((input[i] != null && input[i].key != null) !== isKeyed) {
        throw new TypeError("Vnodes must either always have keys or never have keys!");
      }
    }

    for (var i = 0; i < input.length; i++) {
      children[i] = Vnode.normalize(input[i]);
    }
  }

  return children;
};

module.exports = Vnode;
  })();
});;
require.register("mithril/request.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var PromisePolyfill = require("./promise/promise");

var mountRedraw = require("./mount-redraw");

module.exports = require("./request/request")(window, PromisePolyfill, mountRedraw.redraw);
  })();
});;
require.register("mithril/request/request.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var buildPathname = require("../pathname/build");

module.exports = function ($window, Promise, oncompletion) {
  var callbackCount = 0;

  function PromiseProxy(executor) {
    return new Promise(executor);
  } // In case the global Promise is some userland library's where they rely on
  // `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
  // similar. Let's *not* break them.


  PromiseProxy.prototype = Promise.prototype;
  PromiseProxy.__proto__ = Promise; // eslint-disable-line no-proto

  function makeRequest(factory) {
    return function (url, args) {
      if (typeof url !== "string") {
        args = url;
        url = url.url;
      } else if (args == null) args = {};

      var promise = new Promise(function (resolve, reject) {
        factory(buildPathname(url, args.params), args, function (data) {
          if (typeof args.type === "function") {
            if (Array.isArray(data)) {
              for (var i = 0; i < data.length; i++) {
                data[i] = new args.type(data[i]);
              }
            } else data = new args.type(data);
          }

          resolve(data);
        }, reject);
      });
      if (args.background === true) return promise;
      var count = 0;

      function complete() {
        if (--count === 0 && typeof oncompletion === "function") oncompletion();
      }

      return wrap(promise);

      function wrap(promise) {
        var then = promise.then; // Set the constructor, so engines know to not await or resolve
        // this as a native promise. At the time of writing, this is
        // only necessary for V8, but their behavior is the correct
        // behavior per spec. See this spec issue for more details:
        // https://github.com/tc39/ecma262/issues/1577. Also, see the
        // corresponding comment in `request/tests/test-request.js` for
        // a bit more background on the issue at hand.

        promise.constructor = PromiseProxy;

        promise.then = function () {
          count++;
          var next = then.apply(promise, arguments);
          next.then(complete, function (e) {
            complete();
            if (count === 0) throw e;
          });
          return wrap(next);
        };

        return promise;
      }
    };
  }

  function hasHeader(args, name) {
    for (var key in args.headers) {
      if ({}.hasOwnProperty.call(args.headers, key) && name.test(key)) return true;
    }

    return false;
  }

  return {
    request: makeRequest(function (url, args, resolve, reject) {
      var method = args.method != null ? args.method.toUpperCase() : "GET";
      var body = args.body;
      var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData);
      var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
      var xhr = new $window.XMLHttpRequest(),
          aborted = false;
      var original = xhr,
          replacedAbort;
      var abort = xhr.abort;

      xhr.abort = function () {
        aborted = true;
        abort.call(this);
      };

      xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);

      if (assumeJSON && body != null && !hasHeader(args, /^content-type$/i)) {
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      }

      if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) {
        xhr.setRequestHeader("Accept", "application/json, text/*");
      }

      if (args.withCredentials) xhr.withCredentials = args.withCredentials;
      if (args.timeout) xhr.timeout = args.timeout;
      xhr.responseType = responseType;

      for (var key in args.headers) {
        if ({}.hasOwnProperty.call(args.headers, key)) {
          xhr.setRequestHeader(key, args.headers[key]);
        }
      }

      xhr.onreadystatechange = function (ev) {
        // Don't throw errors on xhr.abort().
        if (aborted) return;

        if (ev.target.readyState === 4) {
          try {
            var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url); // When the response type isn't "" or "text",
            // `xhr.responseText` is the wrong thing to use.
            // Browsers do the right thing and throw here, and we
            // should honor that and do the right thing by
            // preferring `xhr.response` where possible/practical.

            var response = ev.target.response,
                message;

            if (responseType === "json") {
              // For IE and Edge, which don't implement
              // `responseType: "json"`.
              if (!ev.target.responseType && typeof args.extract !== "function") response = JSON.parse(ev.target.responseText);
            } else if (!responseType || responseType === "text") {
              // Only use this default if it's text. If a parsed
              // document is needed on old IE and friends (all
              // unsupported), the user should use a custom
              // `config` instead. They're already using this at
              // their own risk.
              if (response == null) response = ev.target.responseText;
            }

            if (typeof args.extract === "function") {
              response = args.extract(ev.target, args);
              success = true;
            } else if (typeof args.deserialize === "function") {
              response = args.deserialize(response);
            }

            if (success) resolve(response);else {
              try {
                message = ev.target.responseText;
              } catch (e) {
                message = response;
              }

              var error = new Error(message);
              error.code = ev.target.status;
              error.response = response;
              reject(error);
            }
          } catch (e) {
            reject(e);
          }
        }
      };

      if (typeof args.config === "function") {
        xhr = args.config(xhr, args, url) || xhr; // Propagate the `abort` to any replacement XHR as well.

        if (xhr !== original) {
          replacedAbort = xhr.abort;

          xhr.abort = function () {
            aborted = true;
            replacedAbort.call(this);
          };
        }
      }

      if (body == null) xhr.send();else if (typeof args.serialize === "function") xhr.send(args.serialize(body));else if (body instanceof $window.FormData) xhr.send(body);else xhr.send(JSON.stringify(body));
    }),
    jsonp: makeRequest(function (url, args, resolve, reject) {
      var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
      var script = $window.document.createElement("script");

      $window[callbackName] = function (data) {
        delete $window[callbackName];
        script.parentNode.removeChild(script);
        resolve(data);
      };

      script.onerror = function () {
        delete $window[callbackName];
        script.parentNode.removeChild(script);
        reject(new Error("JSONP request failed"));
      };

      script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
      $window.document.documentElement.appendChild(script);
    })
  };
};
  })();
});;
require.register("mithril/route.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "mithril");
  (function() {
    "use strict";

var mountRedraw = require("./mount-redraw");

module.exports = require("./api/router")(window, mountRedraw);
  })();
});;
require.register("process/browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "process");
  (function() {
    "use strict";

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
  })();
});
require.register("ramda/src/F.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.T
 * @example
 *
 *      R.F(); //=> false
 */
var F = function F() {
  return false;
};

module.exports = F;
  })();
});
require.register("ramda/src/T.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.F
 * @example
 *
 *      R.T(); //=> true
 */
var T = function T() {
  return true;
};

module.exports = T;
  })();
});
require.register("ramda/src/__.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @name __
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      const greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = {
  '@@functional/placeholder': true
};
  })();
});
require.register("ramda/src/add.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */


var add = /*#__PURE__*/_curry2(function add(a, b) {
  return Number(a) + Number(b);
});

module.exports = add;
  })();
});
require.register("ramda/src/addIndex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> ((a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      const mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */


var addIndex = /*#__PURE__*/_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);

    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };

    return fn.apply(this, args);
  });
});

module.exports = addIndex;
  })();
});
require.register("ramda/src/adjust.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> (a -> a) -> [a] -> [a]
 * @param {Number} idx The index.
 * @param {Function} fn The function to apply.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 *      R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * @symb R.adjust(-1, f, [a, b]) = [a, f(b)]
 * @symb R.adjust(0, f, [a, b]) = [f(a), b]
 */


var adjust = /*#__PURE__*/_curry3(function adjust(idx, fn, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }

  var start = idx < 0 ? list.length : 0;

  var _idx = start + idx;

  var _list = _concat(list);

  _list[_idx] = fn(list[_idx]);
  return _list;
});

module.exports = adjust;
  })();
});
require.register("ramda/src/all.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xall = /*#__PURE__*/require("./internal/_xall");
/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      const equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */


var all = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }

    idx += 1;
  }

  return true;
}));

module.exports = all;
  })();
});
require.register("ramda/src/allPass.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var curryN = /*#__PURE__*/require("./curryN");

var max = /*#__PURE__*/require("./max");

var pluck = /*#__PURE__*/require("./pluck");

var reduce = /*#__PURE__*/require("./reduce");
/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      const isQueen = R.propEq('rank', 'Q');
 *      const isSpade = R.propEq('suit', '♠︎');
 *      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */


var allPass = /*#__PURE__*/_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }

      idx += 1;
    }

    return true;
  });
});

module.exports = allPass;
  })();
});
require.register("ramda/src/always.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      const t = R.always('Tee');
 *      t(); //=> 'Tee'
 */


var always = /*#__PURE__*/_curry1(function always(val) {
  return function () {
    return val;
  };
});

module.exports = always;
  })();
});
require.register("ramda/src/and.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both, R.xor
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */


var and = /*#__PURE__*/_curry2(function and(a, b) {
  return a && b;
});

module.exports = and;
  })();
});
require.register("ramda/src/andThen.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _assertPromise = /*#__PURE__*/require("./internal/_assertPromise");
/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Function
 * @sig (a -> b) -> (Promise e a) -> (Promise e b)
 * @sig (a -> (Promise e b)) -> (Promise e a) -> (Promise e b)
 * @param {Function} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(onSuccess)`
 * @see R.otherwise
 * @example
 *
 *      var makeQuery = (email) => ({ query: { email }});
 *
 *      //getMemberName :: String -> Promise ({firstName, lastName})
 *      var getMemberName = R.pipe(
 *        makeQuery,
 *        fetchMember,
 *        R.andThen(R.pick(['firstName', 'lastName']))
 *      );
 */


var andThen = /*#__PURE__*/_curry2(function andThen(f, p) {
  _assertPromise('andThen', p);

  return p.then(f);
});

module.exports = andThen;
  })();
});
require.register("ramda/src/any.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xany = /*#__PURE__*/require("./internal/_xany");
/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      const lessThan0 = R.flip(R.lt)(0);
 *      const lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */


var any = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}));

module.exports = any;
  })();
});
require.register("ramda/src/anyPass.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var curryN = /*#__PURE__*/require("./curryN");

var max = /*#__PURE__*/require("./max");

var pluck = /*#__PURE__*/require("./pluck");

var reduce = /*#__PURE__*/require("./reduce");
/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      const isClub = R.propEq('suit', '♣');
 *      const isSpade = R.propEq('suit', '♠');
 *      const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */


var anyPass = /*#__PURE__*/_curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }

      idx += 1;
    }

    return false;
  });
});

module.exports = anyPass;
  })();
});
require.register("ramda/src/ap.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var map = /*#__PURE__*/require("./map");
/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */


var ap = /*#__PURE__*/_curry2(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : _reduce(function (acc, f) {
    return _concat(acc, map(f, applyX));
  }, [], applyF);
});

module.exports = ap;
  })();
});
require.register("ramda/src/aperture.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _aperture = /*#__PURE__*/require("./internal/_aperture");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xaperture = /*#__PURE__*/require("./internal/_xaperture");
/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */


var aperture = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xaperture, _aperture));

module.exports = aperture;
  })();
});
require.register("ramda/src/append.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */


var append = /*#__PURE__*/_curry2(function append(el, list) {
  return _concat(list, [el]);
});

module.exports = append;
  })();
});
require.register("ramda/src/apply.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      const nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */


var apply = /*#__PURE__*/_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});

module.exports = apply;
  })();
});
require.register("ramda/src/applySpec.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var apply = /*#__PURE__*/require("./apply");

var curryN = /*#__PURE__*/require("./curryN");

var max = /*#__PURE__*/require("./max");

var pluck = /*#__PURE__*/require("./pluck");

var reduce = /*#__PURE__*/require("./reduce");

var keys = /*#__PURE__*/require("./keys");

var values = /*#__PURE__*/require("./values"); // Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map


function mapValues(fn, obj) {
  return keys(obj).reduce(function (acc, key) {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}
/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec = /*#__PURE__*/_curry1(function applySpec(spec) {
  spec = mapValues(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
    var args = arguments;
    return mapValues(function (f) {
      return apply(f, args);
    }, spec);
  });
});

module.exports = applySpec;
  })();
});
require.register("ramda/src/applyTo.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @func
 * @memberOf R
 * @since v0.25.0
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {*} x The value
 * @param {Function} f The function to apply
 * @return {*} The result of applying `f` to `x`
 * @example
 *
 *      const t42 = R.applyTo(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 */


var applyTo = /*#__PURE__*/_curry2(function applyTo(x, f) {
  return f(x);
});

module.exports = applyTo;
  })();
});
require.register("ramda/src/ascend.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      const byAge = R.ascend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByYoungestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */


var ascend = /*#__PURE__*/_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

module.exports = ascend;
  })();
});
require.register("ramda/src/assoc.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc, R.pick
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc = /*#__PURE__*/_curry3(function assoc(prop, val, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
});

module.exports = assoc;
  })();
});
require.register("ramda/src/assocPath.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var _has = /*#__PURE__*/require("./internal/_has");

var _isArray = /*#__PURE__*/require("./internal/_isArray");

var _isInteger = /*#__PURE__*/require("./internal/_isInteger");

var assoc = /*#__PURE__*/require("./assoc");

var isNil = /*#__PURE__*/require("./isNil");
/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath = /*#__PURE__*/_curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  var idx = path[0];

  if (path.length > 1) {
    var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});

module.exports = assocPath;
  })();
});
require.register("ramda/src/binary.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var nAry = /*#__PURE__*/require("./nAry");
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      const takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      const takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */


var binary = /*#__PURE__*/_curry1(function binary(fn) {
  return nAry(2, fn);
});

module.exports = binary;
  })();
});
require.register("ramda/src/bind.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

module.exports = bind;
  })();
});
require.register("ramda/src/both.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isFunction = /*#__PURE__*/require("./internal/_isFunction");

var and = /*#__PURE__*/require("./and");

var lift = /*#__PURE__*/require("./lift");
/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      const gt10 = R.gt(R.__, 10)
 *      const lt20 = R.lt(R.__, 20)
 *      const f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 *
 *      R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 *      R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 */


var both = /*#__PURE__*/_curry2(function both(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift(and)(f, g);
});

module.exports = both;
  })();
});
require.register("ramda/src/call.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var curry = /*#__PURE__*/require("./curry");
/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      const indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      const format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */


var call = /*#__PURE__*/curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
module.exports = call;
  })();
});
require.register("ramda/src/chain.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _makeFlat = /*#__PURE__*/require("./internal/_makeFlat");

var _xchain = /*#__PURE__*/require("./internal/_xchain");

var map = /*#__PURE__*/require("./map");
/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */


var chain = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }

  return _makeFlat(false)(map(fn, monad));
}));

module.exports = chain;
  })();
});
require.register("ramda/src/clamp.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */


var clamp = /*#__PURE__*/_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
});

module.exports = clamp;
  })();
});
require.register("ramda/src/clone.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _clone = /*#__PURE__*/require("./internal/_clone");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      const objects = [{}, {}, {}];
 *      const objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */


var clone = /*#__PURE__*/_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});

module.exports = clone;
  })();
});
require.register("ramda/src/comparator.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      const byAge = R.comparator((a, b) => a.age < b.age);
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByIncreasingAge = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */


var comparator = /*#__PURE__*/_curry1(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

module.exports = comparator;
  })();
});
require.register("ramda/src/complement.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var lift = /*#__PURE__*/require("./lift");

var not = /*#__PURE__*/require("./not");
/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      const isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */


var complement = /*#__PURE__*/lift(not);
module.exports = complement;
  })();
});
require.register("ramda/src/compose.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var pipe = /*#__PURE__*/require("./pipe");

var reverse = /*#__PURE__*/require("./reverse");
/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return pipe.apply(this, reverse(arguments));
}

module.exports = compose;
  })();
});
require.register("ramda/src/composeK.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var chain = /*#__PURE__*/require("./chain");

var compose = /*#__PURE__*/require("./compose");

var map = /*#__PURE__*/require("./map");
/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @deprecated since v0.26.0
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       const get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       const getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */


function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }

  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
}

module.exports = composeK;
  })();
});
require.register("ramda/src/composeP.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var pipeP = /*#__PURE__*/require("./pipeP");

var reverse = /*#__PURE__*/require("./reverse");
/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The last arguments may have any arity; the remaining
 * arguments must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @deprecated since v0.26.0
 * @example
 *
 *      const db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      const lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      const lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      const followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */


function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }

  return pipeP.apply(this, reverse(arguments));
}

module.exports = composeP;
  })();
});
require.register("ramda/src/composeWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var pipeWith = /*#__PURE__*/require("./pipeWith");

var reverse = /*#__PURE__*/require("./reverse");
/**
 * Performs right-to-left function composition using transforming function. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried. Transforming function is not used on the
 * last argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [(y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeWith
 * @example
 *
 *      const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 *      composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 *      composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 *
 * @symb R.composeWith(f)([g, h, i])(...args) = f(g, f(h, i(...args)))
 */


var composeWith = /*#__PURE__*/_curry2(function composeWith(xf, list) {
  return pipeWith.apply(this, [xf, reverse(list)]);
});

module.exports = composeWith;
  })();
});
require.register("ramda/src/concat.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isArray = /*#__PURE__*/require("./internal/_isArray");

var _isFunction = /*#__PURE__*/require("./internal/_isFunction");

var _isString = /*#__PURE__*/require("./internal/_isString");

var toString = /*#__PURE__*/require("./toString");
/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */


var concat = /*#__PURE__*/_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }

    throw new TypeError(toString(b) + ' is not an array');
  }

  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }

    throw new TypeError(toString(b) + ' is not a string');
  }

  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }

  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }

  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

module.exports = concat;
  })();
});
require.register("ramda/src/cond.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var map = /*#__PURE__*/require("./map");

var max = /*#__PURE__*/require("./max");

var reduce = /*#__PURE__*/require("./reduce");
/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @see R.ifElse, R.unless, R.when
 * @example
 *
 *      const fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */


var cond = /*#__PURE__*/_curry1(function cond(pairs) {
  var arity = reduce(max, 0, map(function (pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function () {
    var idx = 0;

    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }

      idx += 1;
    }
  });
});

module.exports = cond;
  })();
});
require.register("ramda/src/construct.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var constructN = /*#__PURE__*/require("./constructN");
/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      const AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      const animalTypes = ["Lion", "Tiger", "Bear"];
 *      const animalSighting = R.invoker(0, 'sighting');
 *      const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */


var construct = /*#__PURE__*/_curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});

module.exports = construct;
  })();
});
require.register("ramda/src/constructN.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var curry = /*#__PURE__*/require("./curry");

var nAry = /*#__PURE__*/require("./nAry");
/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      const ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */


var constructN = /*#__PURE__*/_curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }

  if (n === 0) {
    return function () {
      return new Fn();
    };
  }

  return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);

      case 2:
        return new Fn($0, $1);

      case 3:
        return new Fn($0, $1, $2);

      case 4:
        return new Fn($0, $1, $2, $3);

      case 5:
        return new Fn($0, $1, $2, $3, $4);

      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);

      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);

      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);

      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);

      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

module.exports = constructN;
  })();
});
require.register("ramda/src/contains.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includes = /*#__PURE__*/require("./internal/_includes");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Works also with strings.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.includes
 * @deprecated since v0.26.0
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 *      R.contains('ba', 'banana'); //=>true
 */


var contains = /*#__PURE__*/_curry2(_includes);

module.exports = contains;
  })();
});
require.register("ramda/src/converge.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _map = /*#__PURE__*/require("./internal/_map");

var curryN = /*#__PURE__*/require("./curryN");

var max = /*#__PURE__*/require("./max");

var pluck = /*#__PURE__*/require("./pluck");

var reduce = /*#__PURE__*/require("./reduce");
/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */


var converge = /*#__PURE__*/_curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

module.exports = converge;
  })();
});
require.register("ramda/src/countBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var reduceBy = /*#__PURE__*/require("./reduceBy");
/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */


var countBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return acc + 1;
}, 0);
module.exports = countBy;
  })();
});
require.register("ramda/src/curry.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.partial
 * @example
 *
 *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */


var curry = /*#__PURE__*/_curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

module.exports = curry;
  })();
});
require.register("ramda/src/curryN.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _curryN = /*#__PURE__*/require("./internal/_curryN");
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */


var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }

  return _arity(length, _curryN(length, [], fn));
});

module.exports = curryN;
  })();
});
require.register("ramda/src/dec.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var add = /*#__PURE__*/require("./add");
/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */


var dec = /*#__PURE__*/add(-1);
module.exports = dec;
  })();
});
require.register("ramda/src/defaultTo.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      const defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42(false);  //=> false
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */


var defaultTo = /*#__PURE__*/_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

module.exports = defaultTo;
  })();
});
require.register("ramda/src/descend.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const byAge = R.descend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByOldestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 */


var descend = /*#__PURE__*/_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

module.exports = descend;
  })();
});
require.register("ramda/src/difference.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _Set = /*#__PURE__*/require("./internal/_Set");
/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */


var difference = /*#__PURE__*/_curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new _Set();

  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }

    idx += 1;
  }

  return out;
});

module.exports = difference;
  })();
});
require.register("ramda/src/differenceWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includesWith = /*#__PURE__*/require("./internal/_includesWith");

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */


var differenceWith = /*#__PURE__*/_curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;

  while (idx < firstLen) {
    if (!_includesWith(pred, first[idx], second) && !_includesWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }

    idx += 1;
  }

  return out;
});

module.exports = differenceWith;
  })();
});
require.register("ramda/src/dissoc.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc, R.omit
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */


var dissoc = /*#__PURE__*/_curry2(function dissoc(prop, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  delete result[prop];
  return result;
});

module.exports = dissoc;
  })();
});
require.register("ramda/src/dissocPath.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isInteger = /*#__PURE__*/require("./internal/_isInteger");

var _isArray = /*#__PURE__*/require("./internal/_isArray");

var assoc = /*#__PURE__*/require("./assoc");

var dissoc = /*#__PURE__*/require("./dissoc");

var remove = /*#__PURE__*/require("./remove");

var update = /*#__PURE__*/require("./update");
/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath = /*#__PURE__*/_curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;

    case 1:
      return _isInteger(path[0]) && _isArray(obj) ? remove(path[0], 1, obj) : dissoc(path[0], obj);

    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);

      if (obj[head] == null) {
        return obj;
      } else if (_isInteger(head) && _isArray(obj)) {
        return update(head, dissocPath(tail, obj[head]), obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }

  }
});

module.exports = dissocPath;
  })();
});
require.register("ramda/src/divide.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      const half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      const reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */


var divide = /*#__PURE__*/_curry2(function divide(a, b) {
  return a / b;
});

module.exports = divide;
  })();
});
require.register("ramda/src/drop.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xdrop = /*#__PURE__*/require("./internal/_xdrop");

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


var drop = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

module.exports = drop;
  })();
});
require.register("ramda/src/dropLast.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _dropLast = /*#__PURE__*/require("./internal/_dropLast");

var _xdropLast = /*#__PURE__*/require("./internal/_xdropLast");
/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */


var dropLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLast, _dropLast));

module.exports = dropLast;
  })();
});
require.register("ramda/src/dropLastWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _dropLastWhile = /*#__PURE__*/require("./internal/_dropLastWhile");

var _xdropLastWhile = /*#__PURE__*/require("./internal/_xdropLastWhile");
/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      const lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */


var dropLastWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLastWhile, _dropLastWhile));

module.exports = dropLastWhile;
  })();
});
require.register("ramda/src/dropRepeats.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xdropRepeatsWith = /*#__PURE__*/require("./internal/_xdropRepeatsWith");

var dropRepeatsWith = /*#__PURE__*/require("./dropRepeatsWith");

var equals = /*#__PURE__*/require("./equals");
/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */


var dropRepeats = /*#__PURE__*/_curry1( /*#__PURE__*/_dispatchable([], /*#__PURE__*/_xdropRepeatsWith(equals), /*#__PURE__*/dropRepeatsWith(equals)));

module.exports = dropRepeats;
  })();
});
require.register("ramda/src/dropRepeatsWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xdropRepeatsWith = /*#__PURE__*/require("./internal/_xdropRepeatsWith");

var last = /*#__PURE__*/require("./last");
/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */


var dropRepeatsWith = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;

  if (len !== 0) {
    result[0] = list[0];

    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }

      idx += 1;
    }
  }

  return result;
}));

module.exports = dropRepeatsWith;
  })();
});
require.register("ramda/src/dropWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xdropWhile = /*#__PURE__*/require("./internal/_xdropWhile");

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      const lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */


var dropWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }

  return slice(idx, Infinity, xs);
}));

module.exports = dropWhile;
  })();
});
require.register("ramda/src/either.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isFunction = /*#__PURE__*/require("./internal/_isFunction");

var lift = /*#__PURE__*/require("./lift");

var or = /*#__PURE__*/require("./or");
/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      const gt10 = x => x > 10;
 *      const even = x => x % 2 === 0;
 *      const f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 *
 *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 */


var either = /*#__PURE__*/_curry2(function either(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift(or)(f, g);
});

module.exports = either;
  })();
});
require.register("ramda/src/empty.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _isArguments = /*#__PURE__*/require("./internal/_isArguments");

var _isArray = /*#__PURE__*/require("./internal/_isArray");

var _isObject = /*#__PURE__*/require("./internal/_isObject");

var _isString = /*#__PURE__*/require("./internal/_isString");
/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */


var empty = /*#__PURE__*/_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() : void 0 // else
  ;
});

module.exports = empty;
  })();
});
require.register("ramda/src/endsWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var equals = /*#__PURE__*/require("./equals");

var takeLast = /*#__PURE__*/require("./takeLast");
/**
 * Checks if a list ends with the provided sublist.
 *
 * Similarly, checks if a string ends with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @see R.startsWith
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var endsWith = /*#__PURE__*/_curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});

module.exports = endsWith;
  })();
});
require.register("ramda/src/eqBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var equals = /*#__PURE__*/require("./equals");
/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */


var eqBy = /*#__PURE__*/_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});

module.exports = eqBy;
  })();
});
require.register("ramda/src/eqProps.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var equals = /*#__PURE__*/require("./equals");
/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      const o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      const o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */


var eqProps = /*#__PURE__*/_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});

module.exports = eqProps;
  })();
});
require.register("ramda/src/equals.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _equals = /*#__PURE__*/require("./internal/_equals");
/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


var equals = /*#__PURE__*/_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

module.exports = equals;
  })();
});
require.register("ramda/src/evolve.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      const transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */


var evolve = /*#__PURE__*/_curry2(function evolve(transformations, object) {
  var result = object instanceof Array ? [] : {};
  var transformation, key, type;

  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }

  return result;
});

module.exports = evolve;
  })();
});
require.register("ramda/src/filter.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _filter = /*#__PURE__*/require("./internal/_filter");

var _isObject = /*#__PURE__*/require("./internal/_isObject");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var _xfilter = /*#__PURE__*/require("./internal/_xfilter");

var keys = /*#__PURE__*/require("./keys");
/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}));

module.exports = filter;
  })();
});
require.register("ramda/src/find.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xfind = /*#__PURE__*/require("./internal/_xfind");
/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */


var find = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx += 1;
  }
}));

module.exports = find;
  })();
});
require.register("ramda/src/findIndex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xfindIndex = /*#__PURE__*/require("./internal/_xfindIndex");
/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}));

module.exports = findIndex;
  })();
});
require.register("ramda/src/findLast.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xfindLast = /*#__PURE__*/require("./internal/_xfindLast");
/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */


var findLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx -= 1;
  }
}));

module.exports = findLast;
  })();
});
require.register("ramda/src/findLastIndex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xfindLastIndex = /*#__PURE__*/require("./internal/_xfindLastIndex");
/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findLastIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }

    idx -= 1;
  }

  return -1;
}));

module.exports = findLastIndex;
  })();
});
require.register("ramda/src/flatten.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _makeFlat = /*#__PURE__*/require("./internal/_makeFlat");
/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */


var flatten = /*#__PURE__*/_curry1( /*#__PURE__*/_makeFlat(true));

module.exports = flatten;
  })();
});
require.register("ramda/src/flip.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */


var flip = /*#__PURE__*/_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

module.exports = flip;
  })();
});
require.register("ramda/src/forEach.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _checkForMethod = /*#__PURE__*/require("./internal/_checkForMethod");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      const printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */


var forEach = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;

  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }

  return list;
}));

module.exports = forEach;
  })();
});
require.register("ramda/src/forEachObjIndexed.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var keys = /*#__PURE__*/require("./keys");
/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */


var forEachObjIndexed = /*#__PURE__*/_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

module.exports = forEachObjIndexed;
  })();
});
require.register("ramda/src/fromPairs.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */


var fromPairs = /*#__PURE__*/_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;

  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }

  return result;
});

module.exports = fromPairs;
  })();
});
require.register("ramda/src/groupBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _checkForMethod = /*#__PURE__*/require("./internal/_checkForMethod");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var reduceBy = /*#__PURE__*/require("./reduceBy");
/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.reduceBy, R.transduce
 * @example
 *
 *      const byGrade = R.groupBy(function(student) {
 *        const score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      const students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */


var groupBy = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('groupBy', /*#__PURE__*/reduceBy(function (acc, item) {
  if (acc == null) {
    acc = [];
  }

  acc.push(item);
  return acc;
}, null)));

module.exports = groupBy;
  })();
});
require.register("ramda/src/groupWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */


var groupWith = /*#__PURE__*/_curry2(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    var nextidx = idx + 1;

    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }

    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }

  return res;
});

module.exports = groupWith;
  })();
});
require.register("ramda/src/gt.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */


var gt = /*#__PURE__*/_curry2(function gt(a, b) {
  return a > b;
});

module.exports = gt;
  })();
});
require.register("ramda/src/gte.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */


var gte = /*#__PURE__*/_curry2(function gte(a, b) {
  return a >= b;
});

module.exports = gte;
  })();
});
require.register("ramda/src/has.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var hasPath = /*#__PURE__*/require("./hasPath");
/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */


var has = /*#__PURE__*/_curry2(function has(prop, obj) {
  return hasPath([prop], obj);
});

module.exports = has;
  })();
});
require.register("ramda/src/hasIn.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      const square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */


var hasIn = /*#__PURE__*/_curry2(function hasIn(prop, obj) {
  return prop in obj;
});

module.exports = hasIn;
  })();
});
require.register("ramda/src/hasPath.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _has = /*#__PURE__*/require("./internal/_has");

var isNil = /*#__PURE__*/require("./isNil");
/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see R.has
 * @example
 *
 *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      R.hasPath(['a', 'b'], {});                  // => false
 */


var hasPath = /*#__PURE__*/_curry2(function hasPath(_path, obj) {
  if (_path.length === 0 || isNil(obj)) {
    return false;
  }

  var val = obj;
  var idx = 0;

  while (idx < _path.length) {
    if (!isNil(val) && _has(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }

  return true;
});

module.exports = hasPath;
  })();
});
require.register("ramda/src/head.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var nth = /*#__PURE__*/require("./nth");
/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


var head = /*#__PURE__*/nth(0);
module.exports = head;
  })();
});
require.register("ramda/src/identical.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _objectIs = /*#__PURE__*/require("./internal/_objectIs");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      const o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


var identical = /*#__PURE__*/_curry2(_objectIs);

module.exports = identical;
  })();
});
require.register("ramda/src/identity.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _identity = /*#__PURE__*/require("./internal/_identity");
/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */


var identity = /*#__PURE__*/_curry1(_identity);

module.exports = identity;
  })();
});
require.register("ramda/src/ifElse.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when, R.cond
 * @example
 *
 *      const incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */


var ifElse = /*#__PURE__*/_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});

module.exports = ifElse;
  })();
});
require.register("ramda/src/inc.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var add = /*#__PURE__*/require("./add");
/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */


var inc = /*#__PURE__*/add(1);
module.exports = inc;
  })();
});
require.register("ramda/src/includes.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includes = /*#__PURE__*/require("./internal/_includes");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Works also with strings.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.includes(3, [1, 2, 3]); //=> true
 *      R.includes(4, [1, 2, 3]); //=> false
 *      R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.includes([42], [[42]]); //=> true
 *      R.includes('ba', 'banana'); //=>true
 */


var includes = /*#__PURE__*/_curry2(_includes);

module.exports = includes;
  })();
});
require.register("ramda/src/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

module.exports = {};
module.exports.F = /*#__PURE__*/require("./F");
module.exports.T = /*#__PURE__*/require("./T");
module.exports.__ = /*#__PURE__*/require("./__");
module.exports.add = /*#__PURE__*/require("./add");
module.exports.addIndex = /*#__PURE__*/require("./addIndex");
module.exports.adjust = /*#__PURE__*/require("./adjust");
module.exports.all = /*#__PURE__*/require("./all");
module.exports.allPass = /*#__PURE__*/require("./allPass");
module.exports.always = /*#__PURE__*/require("./always");
module.exports.and = /*#__PURE__*/require("./and");
module.exports.any = /*#__PURE__*/require("./any");
module.exports.anyPass = /*#__PURE__*/require("./anyPass");
module.exports.ap = /*#__PURE__*/require("./ap");
module.exports.aperture = /*#__PURE__*/require("./aperture");
module.exports.append = /*#__PURE__*/require("./append");
module.exports.apply = /*#__PURE__*/require("./apply");
module.exports.applySpec = /*#__PURE__*/require("./applySpec");
module.exports.applyTo = /*#__PURE__*/require("./applyTo");
module.exports.ascend = /*#__PURE__*/require("./ascend");
module.exports.assoc = /*#__PURE__*/require("./assoc");
module.exports.assocPath = /*#__PURE__*/require("./assocPath");
module.exports.binary = /*#__PURE__*/require("./binary");
module.exports.bind = /*#__PURE__*/require("./bind");
module.exports.both = /*#__PURE__*/require("./both");
module.exports.call = /*#__PURE__*/require("./call");
module.exports.chain = /*#__PURE__*/require("./chain");
module.exports.clamp = /*#__PURE__*/require("./clamp");
module.exports.clone = /*#__PURE__*/require("./clone");
module.exports.comparator = /*#__PURE__*/require("./comparator");
module.exports.complement = /*#__PURE__*/require("./complement");
module.exports.compose = /*#__PURE__*/require("./compose");
module.exports.composeK = /*#__PURE__*/require("./composeK");
module.exports.composeP = /*#__PURE__*/require("./composeP");
module.exports.composeWith = /*#__PURE__*/require("./composeWith");
module.exports.concat = /*#__PURE__*/require("./concat");
module.exports.cond = /*#__PURE__*/require("./cond");
module.exports.construct = /*#__PURE__*/require("./construct");
module.exports.constructN = /*#__PURE__*/require("./constructN");
module.exports.contains = /*#__PURE__*/require("./contains");
module.exports.converge = /*#__PURE__*/require("./converge");
module.exports.countBy = /*#__PURE__*/require("./countBy");
module.exports.curry = /*#__PURE__*/require("./curry");
module.exports.curryN = /*#__PURE__*/require("./curryN");
module.exports.dec = /*#__PURE__*/require("./dec");
module.exports.defaultTo = /*#__PURE__*/require("./defaultTo");
module.exports.descend = /*#__PURE__*/require("./descend");
module.exports.difference = /*#__PURE__*/require("./difference");
module.exports.differenceWith = /*#__PURE__*/require("./differenceWith");
module.exports.dissoc = /*#__PURE__*/require("./dissoc");
module.exports.dissocPath = /*#__PURE__*/require("./dissocPath");
module.exports.divide = /*#__PURE__*/require("./divide");
module.exports.drop = /*#__PURE__*/require("./drop");
module.exports.dropLast = /*#__PURE__*/require("./dropLast");
module.exports.dropLastWhile = /*#__PURE__*/require("./dropLastWhile");
module.exports.dropRepeats = /*#__PURE__*/require("./dropRepeats");
module.exports.dropRepeatsWith = /*#__PURE__*/require("./dropRepeatsWith");
module.exports.dropWhile = /*#__PURE__*/require("./dropWhile");
module.exports.either = /*#__PURE__*/require("./either");
module.exports.empty = /*#__PURE__*/require("./empty");
module.exports.endsWith = /*#__PURE__*/require("./endsWith");
module.exports.eqBy = /*#__PURE__*/require("./eqBy");
module.exports.eqProps = /*#__PURE__*/require("./eqProps");
module.exports.equals = /*#__PURE__*/require("./equals");
module.exports.evolve = /*#__PURE__*/require("./evolve");
module.exports.filter = /*#__PURE__*/require("./filter");
module.exports.find = /*#__PURE__*/require("./find");
module.exports.findIndex = /*#__PURE__*/require("./findIndex");
module.exports.findLast = /*#__PURE__*/require("./findLast");
module.exports.findLastIndex = /*#__PURE__*/require("./findLastIndex");
module.exports.flatten = /*#__PURE__*/require("./flatten");
module.exports.flip = /*#__PURE__*/require("./flip");
module.exports.forEach = /*#__PURE__*/require("./forEach");
module.exports.forEachObjIndexed = /*#__PURE__*/require("./forEachObjIndexed");
module.exports.fromPairs = /*#__PURE__*/require("./fromPairs");
module.exports.groupBy = /*#__PURE__*/require("./groupBy");
module.exports.groupWith = /*#__PURE__*/require("./groupWith");
module.exports.gt = /*#__PURE__*/require("./gt");
module.exports.gte = /*#__PURE__*/require("./gte");
module.exports.has = /*#__PURE__*/require("./has");
module.exports.hasIn = /*#__PURE__*/require("./hasIn");
module.exports.hasPath = /*#__PURE__*/require("./hasPath");
module.exports.head = /*#__PURE__*/require("./head");
module.exports.identical = /*#__PURE__*/require("./identical");
module.exports.identity = /*#__PURE__*/require("./identity");
module.exports.ifElse = /*#__PURE__*/require("./ifElse");
module.exports.inc = /*#__PURE__*/require("./inc");
module.exports.includes = /*#__PURE__*/require("./includes");
module.exports.indexBy = /*#__PURE__*/require("./indexBy");
module.exports.indexOf = /*#__PURE__*/require("./indexOf");
module.exports.init = /*#__PURE__*/require("./init");
module.exports.innerJoin = /*#__PURE__*/require("./innerJoin");
module.exports.insert = /*#__PURE__*/require("./insert");
module.exports.insertAll = /*#__PURE__*/require("./insertAll");
module.exports.intersection = /*#__PURE__*/require("./intersection");
module.exports.intersperse = /*#__PURE__*/require("./intersperse");
module.exports.into = /*#__PURE__*/require("./into");
module.exports.invert = /*#__PURE__*/require("./invert");
module.exports.invertObj = /*#__PURE__*/require("./invertObj");
module.exports.invoker = /*#__PURE__*/require("./invoker");
module.exports.is = /*#__PURE__*/require("./is");
module.exports.isEmpty = /*#__PURE__*/require("./isEmpty");
module.exports.isNil = /*#__PURE__*/require("./isNil");
module.exports.join = /*#__PURE__*/require("./join");
module.exports.juxt = /*#__PURE__*/require("./juxt");
module.exports.keys = /*#__PURE__*/require("./keys");
module.exports.keysIn = /*#__PURE__*/require("./keysIn");
module.exports.last = /*#__PURE__*/require("./last");
module.exports.lastIndexOf = /*#__PURE__*/require("./lastIndexOf");
module.exports.length = /*#__PURE__*/require("./length");
module.exports.lens = /*#__PURE__*/require("./lens");
module.exports.lensIndex = /*#__PURE__*/require("./lensIndex");
module.exports.lensPath = /*#__PURE__*/require("./lensPath");
module.exports.lensProp = /*#__PURE__*/require("./lensProp");
module.exports.lift = /*#__PURE__*/require("./lift");
module.exports.liftN = /*#__PURE__*/require("./liftN");
module.exports.lt = /*#__PURE__*/require("./lt");
module.exports.lte = /*#__PURE__*/require("./lte");
module.exports.map = /*#__PURE__*/require("./map");
module.exports.mapAccum = /*#__PURE__*/require("./mapAccum");
module.exports.mapAccumRight = /*#__PURE__*/require("./mapAccumRight");
module.exports.mapObjIndexed = /*#__PURE__*/require("./mapObjIndexed");
module.exports.match = /*#__PURE__*/require("./match");
module.exports.mathMod = /*#__PURE__*/require("./mathMod");
module.exports.max = /*#__PURE__*/require("./max");
module.exports.maxBy = /*#__PURE__*/require("./maxBy");
module.exports.mean = /*#__PURE__*/require("./mean");
module.exports.median = /*#__PURE__*/require("./median");
module.exports.memoizeWith = /*#__PURE__*/require("./memoizeWith");
module.exports.merge = /*#__PURE__*/require("./merge");
module.exports.mergeAll = /*#__PURE__*/require("./mergeAll");
module.exports.mergeDeepLeft = /*#__PURE__*/require("./mergeDeepLeft");
module.exports.mergeDeepRight = /*#__PURE__*/require("./mergeDeepRight");
module.exports.mergeDeepWith = /*#__PURE__*/require("./mergeDeepWith");
module.exports.mergeDeepWithKey = /*#__PURE__*/require("./mergeDeepWithKey");
module.exports.mergeLeft = /*#__PURE__*/require("./mergeLeft");
module.exports.mergeRight = /*#__PURE__*/require("./mergeRight");
module.exports.mergeWith = /*#__PURE__*/require("./mergeWith");
module.exports.mergeWithKey = /*#__PURE__*/require("./mergeWithKey");
module.exports.min = /*#__PURE__*/require("./min");
module.exports.minBy = /*#__PURE__*/require("./minBy");
module.exports.modulo = /*#__PURE__*/require("./modulo");
module.exports.move = /*#__PURE__*/require("./move");
module.exports.multiply = /*#__PURE__*/require("./multiply");
module.exports.nAry = /*#__PURE__*/require("./nAry");
module.exports.negate = /*#__PURE__*/require("./negate");
module.exports.none = /*#__PURE__*/require("./none");
module.exports.not = /*#__PURE__*/require("./not");
module.exports.nth = /*#__PURE__*/require("./nth");
module.exports.nthArg = /*#__PURE__*/require("./nthArg");
module.exports.o = /*#__PURE__*/require("./o");
module.exports.objOf = /*#__PURE__*/require("./objOf");
module.exports.of = /*#__PURE__*/require("./of");
module.exports.omit = /*#__PURE__*/require("./omit");
module.exports.once = /*#__PURE__*/require("./once");
module.exports.or = /*#__PURE__*/require("./or");
module.exports.otherwise = /*#__PURE__*/require("./otherwise");
module.exports.over = /*#__PURE__*/require("./over");
module.exports.pair = /*#__PURE__*/require("./pair");
module.exports.partial = /*#__PURE__*/require("./partial");
module.exports.partialRight = /*#__PURE__*/require("./partialRight");
module.exports.partition = /*#__PURE__*/require("./partition");
module.exports.path = /*#__PURE__*/require("./path");
module.exports.paths = /*#__PURE__*/require("./paths");
module.exports.pathEq = /*#__PURE__*/require("./pathEq");
module.exports.pathOr = /*#__PURE__*/require("./pathOr");
module.exports.pathSatisfies = /*#__PURE__*/require("./pathSatisfies");
module.exports.pick = /*#__PURE__*/require("./pick");
module.exports.pickAll = /*#__PURE__*/require("./pickAll");
module.exports.pickBy = /*#__PURE__*/require("./pickBy");
module.exports.pipe = /*#__PURE__*/require("./pipe");
module.exports.pipeK = /*#__PURE__*/require("./pipeK");
module.exports.pipeP = /*#__PURE__*/require("./pipeP");
module.exports.pipeWith = /*#__PURE__*/require("./pipeWith");
module.exports.pluck = /*#__PURE__*/require("./pluck");
module.exports.prepend = /*#__PURE__*/require("./prepend");
module.exports.product = /*#__PURE__*/require("./product");
module.exports.project = /*#__PURE__*/require("./project");
module.exports.prop = /*#__PURE__*/require("./prop");
module.exports.propEq = /*#__PURE__*/require("./propEq");
module.exports.propIs = /*#__PURE__*/require("./propIs");
module.exports.propOr = /*#__PURE__*/require("./propOr");
module.exports.propSatisfies = /*#__PURE__*/require("./propSatisfies");
module.exports.props = /*#__PURE__*/require("./props");
module.exports.range = /*#__PURE__*/require("./range");
module.exports.reduce = /*#__PURE__*/require("./reduce");
module.exports.reduceBy = /*#__PURE__*/require("./reduceBy");
module.exports.reduceRight = /*#__PURE__*/require("./reduceRight");
module.exports.reduceWhile = /*#__PURE__*/require("./reduceWhile");
module.exports.reduced = /*#__PURE__*/require("./reduced");
module.exports.reject = /*#__PURE__*/require("./reject");
module.exports.remove = /*#__PURE__*/require("./remove");
module.exports.repeat = /*#__PURE__*/require("./repeat");
module.exports.replace = /*#__PURE__*/require("./replace");
module.exports.reverse = /*#__PURE__*/require("./reverse");
module.exports.scan = /*#__PURE__*/require("./scan");
module.exports.sequence = /*#__PURE__*/require("./sequence");
module.exports.set = /*#__PURE__*/require("./set");
module.exports.slice = /*#__PURE__*/require("./slice");
module.exports.sort = /*#__PURE__*/require("./sort");
module.exports.sortBy = /*#__PURE__*/require("./sortBy");
module.exports.sortWith = /*#__PURE__*/require("./sortWith");
module.exports.split = /*#__PURE__*/require("./split");
module.exports.splitAt = /*#__PURE__*/require("./splitAt");
module.exports.splitEvery = /*#__PURE__*/require("./splitEvery");
module.exports.splitWhen = /*#__PURE__*/require("./splitWhen");
module.exports.startsWith = /*#__PURE__*/require("./startsWith");
module.exports.subtract = /*#__PURE__*/require("./subtract");
module.exports.sum = /*#__PURE__*/require("./sum");
module.exports.symmetricDifference = /*#__PURE__*/require("./symmetricDifference");
module.exports.symmetricDifferenceWith = /*#__PURE__*/require("./symmetricDifferenceWith");
module.exports.tail = /*#__PURE__*/require("./tail");
module.exports.take = /*#__PURE__*/require("./take");
module.exports.takeLast = /*#__PURE__*/require("./takeLast");
module.exports.takeLastWhile = /*#__PURE__*/require("./takeLastWhile");
module.exports.takeWhile = /*#__PURE__*/require("./takeWhile");
module.exports.tap = /*#__PURE__*/require("./tap");
module.exports.test = /*#__PURE__*/require("./test");
module.exports.andThen = /*#__PURE__*/require("./andThen");
module.exports.times = /*#__PURE__*/require("./times");
module.exports.toLower = /*#__PURE__*/require("./toLower");
module.exports.toPairs = /*#__PURE__*/require("./toPairs");
module.exports.toPairsIn = /*#__PURE__*/require("./toPairsIn");
module.exports.toString = /*#__PURE__*/require("./toString");
module.exports.toUpper = /*#__PURE__*/require("./toUpper");
module.exports.transduce = /*#__PURE__*/require("./transduce");
module.exports.transpose = /*#__PURE__*/require("./transpose");
module.exports.traverse = /*#__PURE__*/require("./traverse");
module.exports.trim = /*#__PURE__*/require("./trim");
module.exports.tryCatch = /*#__PURE__*/require("./tryCatch");
module.exports.type = /*#__PURE__*/require("./type");
module.exports.unapply = /*#__PURE__*/require("./unapply");
module.exports.unary = /*#__PURE__*/require("./unary");
module.exports.uncurryN = /*#__PURE__*/require("./uncurryN");
module.exports.unfold = /*#__PURE__*/require("./unfold");
module.exports.union = /*#__PURE__*/require("./union");
module.exports.unionWith = /*#__PURE__*/require("./unionWith");
module.exports.uniq = /*#__PURE__*/require("./uniq");
module.exports.uniqBy = /*#__PURE__*/require("./uniqBy");
module.exports.uniqWith = /*#__PURE__*/require("./uniqWith");
module.exports.unless = /*#__PURE__*/require("./unless");
module.exports.unnest = /*#__PURE__*/require("./unnest");
module.exports.until = /*#__PURE__*/require("./until");
module.exports.update = /*#__PURE__*/require("./update");
module.exports.useWith = /*#__PURE__*/require("./useWith");
module.exports.values = /*#__PURE__*/require("./values");
module.exports.valuesIn = /*#__PURE__*/require("./valuesIn");
module.exports.view = /*#__PURE__*/require("./view");
module.exports.when = /*#__PURE__*/require("./when");
module.exports.where = /*#__PURE__*/require("./where");
module.exports.whereEq = /*#__PURE__*/require("./whereEq");
module.exports.without = /*#__PURE__*/require("./without");
module.exports.xor = /*#__PURE__*/require("./xor");
module.exports.xprod = /*#__PURE__*/require("./xprod");
module.exports.zip = /*#__PURE__*/require("./zip");
module.exports.zipObj = /*#__PURE__*/require("./zipObj");
module.exports.zipWith = /*#__PURE__*/require("./zipWith");
module.exports.thunkify = /*#__PURE__*/require("./thunkify");
  })();
});
require.register("ramda/src/indexBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var reduceBy = /*#__PURE__*/require("./reduceBy");
/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */


var indexBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return elem;
}, null);
module.exports = indexBy;
  })();
});
require.register("ramda/src/indexOf.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _indexOf = /*#__PURE__*/require("./internal/_indexOf");

var _isArray = /*#__PURE__*/require("./internal/_isArray");
/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */


var indexOf = /*#__PURE__*/_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});

module.exports = indexOf;
  })();
});
require.register("ramda/src/init.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */


var init = /*#__PURE__*/slice(0, -1);
module.exports = init;
  })();
});
require.register("ramda/src/innerJoin.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includesWith = /*#__PURE__*/require("./internal/_includesWith");

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var _filter = /*#__PURE__*/require("./internal/_filter");
/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */


var innerJoin = /*#__PURE__*/_curry3(function innerJoin(pred, xs, ys) {
  return _filter(function (x) {
    return _includesWith(pred, x, ys);
  }, xs);
});

module.exports = innerJoin;
  })();
});
require.register("ramda/src/insert.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */


var insert = /*#__PURE__*/_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

module.exports = insert;
  })();
});
require.register("ramda/src/insertAll.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */


var insertAll = /*#__PURE__*/_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});

module.exports = insertAll;
  })();
});
require.register("ramda/src/internal/_Set.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includes = /*#__PURE__*/require("./_includes");

var _Set = /*#__PURE__*/function () {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  } // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //


  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  }; //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //


  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  }; //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //


  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;

  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }

          return false;
        }
      } // these types can all utilise the native Set


      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }

          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }

          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;

        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }

          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }

        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }

          return false;
        }

        if (!_includes(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }

          return false;
        }

        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }

        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }

          return false;
        }

        return true;
      }

    /* falls through */

    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);

      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }

        return false;
      } // scan through all previously applied items


      if (!_includes(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }

        return false;
      }

      return true;
  }
} // A simple Set type that honours R.equals semantics


module.exports = _Set;
  })();
});
require.register("ramda/src/internal/_aperture.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);

  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }

  return acc;
}

module.exports = _aperture;
  })();
});
require.register("ramda/src/internal/_arity.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

module.exports = _arity;
  })();
});
require.register("ramda/src/internal/_arrayFromIterator.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

module.exports = _arrayFromIterator;
  })();
});
require.register("ramda/src/internal/_assertPromise.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _isFunction = /*#__PURE__*/require("./_isFunction");

var _toString = /*#__PURE__*/require("./_toString");

function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}

module.exports = _assertPromise;
  })();
});
require.register("ramda/src/internal/_checkForMethod.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _isArray = /*#__PURE__*/require("./_isArray");
/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

module.exports = _checkForMethod;
  })();
});
require.register("ramda/src/internal/_clone.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _cloneRegExp = /*#__PURE__*/require("./_cloneRegExp");

var type = /*#__PURE__*/require("../type");
/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */


function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;

    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }

      idx += 1;
    }

    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;

    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }

    return copiedValue;
  };

  switch (type(value)) {
    case 'Object':
      return copy({});

    case 'Array':
      return copy([]);

    case 'Date':
      return new Date(value.valueOf());

    case 'RegExp':
      return _cloneRegExp(value);

    default:
      return value;
  }
}

module.exports = _clone;
  })();
});
require.register("ramda/src/internal/_cloneRegExp.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}

module.exports = _cloneRegExp;
  })();
});
require.register("ramda/src/internal/_complement.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

module.exports = _complement;
  })();
});
require.register("ramda/src/internal/_concat.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

module.exports = _concat;
  })();
});
require.register("ramda/src/internal/_createPartialApplicator.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./_arity");

var _curry2 = /*#__PURE__*/require("./_curry2");

function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

module.exports = _createPartialApplicator;
  })();
});
require.register("ramda/src/internal/_curry1.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _isPlaceholder = /*#__PURE__*/require("./_isPlaceholder");
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = _curry1;
  })();
});
require.register("ramda/src/internal/_curry2.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./_curry1");

var _isPlaceholder = /*#__PURE__*/require("./_isPlaceholder");
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

module.exports = _curry2;
  })();
});
require.register("ramda/src/internal/_curry3.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./_curry1");

var _curry2 = /*#__PURE__*/require("./_curry2");

var _isPlaceholder = /*#__PURE__*/require("./_isPlaceholder");
/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

module.exports = _curry3;
  })();
});
require.register("ramda/src/internal/_curryN.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./_arity");

var _isPlaceholder = /*#__PURE__*/require("./_isPlaceholder");
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

module.exports = _curryN;
  })();
});
require.register("ramda/src/internal/_dispatchable.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _isArray = /*#__PURE__*/require("./_isArray");

var _isTransformer = /*#__PURE__*/require("./_isTransformer");
/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();

    if (!_isArray(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }

        idx += 1;
      }

      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

module.exports = _dispatchable;
  })();
});
require.register("ramda/src/internal/_dropLast.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var take = /*#__PURE__*/require("../take");

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}

module.exports = dropLast;
  })();
});
require.register("ramda/src/internal/_dropLastWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var slice = /*#__PURE__*/require("../slice");

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }

  return slice(0, idx + 1, xs);
}

module.exports = dropLastWhile;
  })();
});
require.register("ramda/src/internal/_equals.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arrayFromIterator = /*#__PURE__*/require("./_arrayFromIterator");

var _includesWith = /*#__PURE__*/require("./_includesWith");

var _functionName = /*#__PURE__*/require("./_functionName");

var _has = /*#__PURE__*/require("./_has");

var _objectIs = /*#__PURE__*/require("./_objectIs");

var keys = /*#__PURE__*/require("../keys");

var type = /*#__PURE__*/require("../type");
/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */


function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);

  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !_includesWith(function (b, aItem) {
    return !_includesWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (_objectIs(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && _objectIs(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!_objectIs(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);

  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

module.exports = _equals;
  })();
});
require.register("ramda/src/internal/_filter.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

module.exports = _filter;
  })();
});
require.register("ramda/src/internal/_flatCat.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _forceReduced = /*#__PURE__*/require("./_forceReduced");

var _isArrayLike = /*#__PURE__*/require("./_isArrayLike");

var _reduce = /*#__PURE__*/require("./_reduce");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var preservingReduced = function preservingReduced(xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function transducerResult(result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function transducerStep(result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function transducerResult(result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function transducerStep(result, input) {
      return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
    }
  };
};

module.exports = _flatCat;
  })();
});
require.register("ramda/src/internal/_forceReduced.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

module.exports = _forceReduced;
  })();
});
require.register("ramda/src/internal/_functionName.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

module.exports = _functionName;
  })();
});
require.register("ramda/src/internal/_has.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = _has;
  })();
});
require.register("ramda/src/internal/_identity.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _identity(x) {
  return x;
}

module.exports = _identity;
  })();
});
require.register("ramda/src/internal/_includes.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _indexOf = /*#__PURE__*/require("./_indexOf");

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

module.exports = _includes;
  })();
});
require.register("ramda/src/internal/_includesWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

module.exports = _includesWith;
  })();
});
require.register("ramda/src/internal/_indexOf.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var equals = /*#__PURE__*/require("../equals");

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

module.exports = _indexOf;
  })();
});
require.register("ramda/src/internal/_isArguments.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _has = /*#__PURE__*/require("./_has");

var toString = Object.prototype.toString;

var _isArguments = /*#__PURE__*/function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
}();

module.exports = _isArguments;
  })();
});
require.register("ramda/src/internal/_isArray.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};
  })();
});
require.register("ramda/src/internal/_isArrayLike.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./_curry1");

var _isArray = /*#__PURE__*/require("./_isArray");

var _isString = /*#__PURE__*/require("./_isString");
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (_isString(x)) {
    return false;
  }

  if (x.nodeType === 1) {
    return !!x.length;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

module.exports = _isArrayLike;
  })();
});
require.register("ramda/src/internal/_isFunction.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

module.exports = _isFunction;
  })();
});
require.register("ramda/src/internal/_isInteger.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
  })();
});
require.register("ramda/src/internal/_isNumber.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

module.exports = _isNumber;
  })();
});
require.register("ramda/src/internal/_isObject.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

module.exports = _isObject;
  })();
});
require.register("ramda/src/internal/_isPlaceholder.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

module.exports = _isPlaceholder;
  })();
});
require.register("ramda/src/internal/_isRegExp.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

module.exports = _isRegExp;
  })();
});
require.register("ramda/src/internal/_isString.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

module.exports = _isString;
  })();
});
require.register("ramda/src/internal/_isTransformer.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

module.exports = _isTransformer;
  })();
});
require.register("ramda/src/internal/_makeFlat.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _isArrayLike = /*#__PURE__*/require("./_isArrayLike");
/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */


function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
}

module.exports = _makeFlat;
  })();
});
require.register("ramda/src/internal/_map.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

module.exports = _map;
  })();
});
require.register("ramda/src/internal/_objectAssign.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _has = /*#__PURE__*/require("./_has"); // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

module.exports = typeof Object.assign === 'function' ? Object.assign : _objectAssign;
  })();
});
require.register("ramda/src/internal/_objectIs.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

module.exports = typeof Object.is === 'function' ? Object.is : _objectIs;
  })();
});
require.register("ramda/src/internal/_of.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _of(x) {
  return [x];
}

module.exports = _of;
  })();
});
require.register("ramda/src/internal/_pipe.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

module.exports = _pipe;
  })();
});
require.register("ramda/src/internal/_pipeP.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}

module.exports = _pipeP;
  })();
});
require.register("ramda/src/internal/_quote.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

module.exports = _quote;
  })();
});
require.register("ramda/src/internal/_reduce.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _isArrayLike = /*#__PURE__*/require("./_isArrayLike");

var _xwrap = /*#__PURE__*/require("./_xwrap");

var bind = /*#__PURE__*/require("../bind");

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }

  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }

  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

module.exports = _reduce;
  })();
});
require.register("ramda/src/internal/_reduced.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

module.exports = _reduced;
  })();
});
require.register("ramda/src/internal/_stepCat.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _objectAssign = /*#__PURE__*/require("./_objectAssign");

var _identity = /*#__PURE__*/require("./_identity");

var _isArrayLike = /*#__PURE__*/require("./_isArrayLike");

var _isTransformer = /*#__PURE__*/require("./_isTransformer");

var objOf = /*#__PURE__*/require("../objOf");

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function transducerStep(xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function transducerStep(a, b) {
    return a + b;
  },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function transducerStep(result, input) {
    return _objectAssign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity
};

function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }

  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }

  if (typeof obj === 'string') {
    return _stepCatString;
  }

  if (typeof obj === 'object') {
    return _stepCatObject;
  }

  throw new Error('Cannot create transformer for ' + obj);
}

module.exports = _stepCat;
  })();
});
require.register("ramda/src/internal/_toISOString.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

module.exports = _toISOString;
  })();
});
require.register("ramda/src/internal/_toString.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includes = /*#__PURE__*/require("./_includes");

var _map = /*#__PURE__*/require("./_map");

var _quote = /*#__PURE__*/require("./_quote");

var _toISOString = /*#__PURE__*/require("./_toISOString");

var keys = /*#__PURE__*/require("../keys");

var reject = /*#__PURE__*/require("../reject");

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function mapPairs(obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';

    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return /^\d+$/.test(k);
      }, keys(x)))).join(', ') + ']';

    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';

    case '[object Null]':
      return 'null';

    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);

    case '[object Undefined]':
      return 'undefined';

    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();

        if (repr !== '[object Object]') {
          return repr;
        }
      }

      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}

module.exports = _toString;
  })();
});
require.register("ramda/src/internal/_xall.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduced = /*#__PURE__*/require("./_reduced");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XAll = /*#__PURE__*/function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }

  XAll.prototype['@@transducer/init'] = _xfBase.init;

  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }

    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/_curry2(function _xall(f, xf) {
  return new XAll(f, xf);
});

module.exports = _xall;
  })();
});
require.register("ramda/src/internal/_xany.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduced = /*#__PURE__*/require("./_reduced");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XAny = /*#__PURE__*/function () {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }

  XAny.prototype['@@transducer/init'] = _xfBase.init;

  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }

    return result;
  };

  return XAny;
}();

var _xany = /*#__PURE__*/_curry2(function _xany(f, xf) {
  return new XAny(f, xf);
});

module.exports = _xany;
  })();
});
require.register("ramda/src/internal/_xaperture.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./_concat");

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XAperture = /*#__PURE__*/function () {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XAperture.prototype['@@transducer/init'] = _xfBase.init;

  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };

  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  XAperture.prototype.getCopy = function () {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture = /*#__PURE__*/_curry2(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});

module.exports = _xaperture;
  })();
});
require.register("ramda/src/internal/_xchain.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _flatCat = /*#__PURE__*/require("./_flatCat");

var map = /*#__PURE__*/require("../map");

var _xchain = /*#__PURE__*/_curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});

module.exports = _xchain;
  })();
});
require.register("ramda/src/internal/_xdrop.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XDrop = /*#__PURE__*/function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop = /*#__PURE__*/_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});

module.exports = _xdrop;
  })();
});
require.register("ramda/src/internal/_xdropLast.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XDropLast = /*#__PURE__*/function () {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XDropLast.prototype['@@transducer/init'] = _xfBase.init;

  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }

    this.store(input);
    return result;
  };

  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast = /*#__PURE__*/_curry2(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});

module.exports = _xdropLast;
  })();
});
require.register("ramda/src/internal/_xdropLastWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduce = /*#__PURE__*/require("./_reduce");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XDropLastWhile = /*#__PURE__*/function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }

  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;

  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };

  XDropLastWhile.prototype.flush = function (result, input) {
    result = _reduce(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };

  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile = /*#__PURE__*/_curry2(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});

module.exports = _xdropLastWhile;
  })();
});
require.register("ramda/src/internal/_xdropRepeatsWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XDropRepeatsWith = /*#__PURE__*/function () {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;

  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;

    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }

    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith = /*#__PURE__*/_curry2(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});

module.exports = _xdropRepeatsWith;
  })();
});
require.register("ramda/src/internal/_xdropWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XDropWhile = /*#__PURE__*/function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;

  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }

      this.f = null;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile = /*#__PURE__*/_curry2(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});

module.exports = _xdropWhile;
  })();
});
require.register("ramda/src/internal/_xfBase.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

module.exports = {
  init: function init() {
    return this.xf['@@transducer/init']();
  },
  result: function result(_result) {
    return this.xf['@@transducer/result'](_result);
  }
};
  })();
});
require.register("ramda/src/internal/_xfilter.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XFilter = /*#__PURE__*/function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

module.exports = _xfilter;
  })();
});
require.register("ramda/src/internal/_xfind.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduced = /*#__PURE__*/require("./_reduced");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XFind = /*#__PURE__*/function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }

  XFind.prototype['@@transducer/init'] = _xfBase.init;

  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }

    return result;
  };

  return XFind;
}();

var _xfind = /*#__PURE__*/_curry2(function _xfind(f, xf) {
  return new XFind(f, xf);
});

module.exports = _xfind;
  })();
});
require.register("ramda/src/internal/_xfindIndex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduced = /*#__PURE__*/require("./_reduced");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XFindIndex = /*#__PURE__*/function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }

  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }

    return result;
  };

  return XFindIndex;
}();

var _xfindIndex = /*#__PURE__*/_curry2(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});

module.exports = _xfindIndex;
  })();
});
require.register("ramda/src/internal/_xfindLast.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XFindLast = /*#__PURE__*/function () {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFindLast.prototype['@@transducer/init'] = _xfBase.init;

  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };

  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }

    return result;
  };

  return XFindLast;
}();

var _xfindLast = /*#__PURE__*/_curry2(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});

module.exports = _xfindLast;
  })();
});
require.register("ramda/src/internal/_xfindLastIndex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XFindLastIndex = /*#__PURE__*/function () {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }

  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };

  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.lastIdx = this.idx;
    }

    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex = /*#__PURE__*/_curry2(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});

module.exports = _xfindLastIndex;
  })();
});
require.register("ramda/src/internal/_xmap.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XMap = /*#__PURE__*/function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});

module.exports = _xmap;
  })();
});
require.register("ramda/src/internal/_xreduceBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curryN = /*#__PURE__*/require("./_curryN");

var _has = /*#__PURE__*/require("./_has");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XReduceBy = /*#__PURE__*/function () {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }

  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;

  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;

    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);

        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }

    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };

  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy = /*#__PURE__*/_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});

module.exports = _xreduceBy;
  })();
});
require.register("ramda/src/internal/_xtake.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduced = /*#__PURE__*/require("./_reduced");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XTake = /*#__PURE__*/function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }

  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;

  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return XTake;
}();

var _xtake = /*#__PURE__*/_curry2(function _xtake(n, xf) {
  return new XTake(n, xf);
});

module.exports = _xtake;
  })();
});
require.register("ramda/src/internal/_xtakeWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _reduced = /*#__PURE__*/require("./_reduced");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XTakeWhile = /*#__PURE__*/function () {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;

  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile = /*#__PURE__*/_curry2(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});

module.exports = _xtakeWhile;
  })();
});
require.register("ramda/src/internal/_xtap.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./_curry2");

var _xfBase = /*#__PURE__*/require("./_xfBase");

var XTap = /*#__PURE__*/function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;

  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap = /*#__PURE__*/_curry2(function _xtap(f, xf) {
  return new XTap(f, xf);
});

module.exports = _xtap;
  })();
});
require.register("ramda/src/internal/_xwrap.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

module.exports = _xwrap;
  })();
});
require.register("ramda/src/intersection.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includes = /*#__PURE__*/require("./internal/_includes");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _filter = /*#__PURE__*/require("./internal/_filter");

var flip = /*#__PURE__*/require("./flip");

var uniq = /*#__PURE__*/require("./uniq");
/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */


var intersection = /*#__PURE__*/_curry2(function intersection(list1, list2) {
  var lookupList, filteredList;

  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }

  return uniq(_filter(flip(_includes)(lookupList), filteredList));
});

module.exports = intersection;
  })();
});
require.register("ramda/src/intersperse.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _checkForMethod = /*#__PURE__*/require("./internal/_checkForMethod");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */


var intersperse = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;

  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }

    idx += 1;
  }

  return out;
}));

module.exports = intersperse;
  })();
});
require.register("ramda/src/into.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _clone = /*#__PURE__*/require("./internal/_clone");

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var _isTransformer = /*#__PURE__*/require("./internal/_isTransformer");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var _stepCat = /*#__PURE__*/require("./internal/_stepCat");
/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.transduce
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      const intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */


var into = /*#__PURE__*/_curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});

module.exports = into;
  })();
});
require.register("ramda/src/invert.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _has = /*#__PURE__*/require("./internal/_has");

var keys = /*#__PURE__*/require("./keys");
/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      const raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */


var invert = /*#__PURE__*/_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }

  return out;
});

module.exports = invert;
  })();
});
require.register("ramda/src/invertObj.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var keys = /*#__PURE__*/require("./keys");
/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      const raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      const raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */


var invertObj = /*#__PURE__*/_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
});

module.exports = invertObj;
  })();
});
require.register("ramda/src/invoker.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isFunction = /*#__PURE__*/require("./internal/_isFunction");

var curryN = /*#__PURE__*/require("./curryN");

var toString = /*#__PURE__*/require("./toString");
/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      const sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      const sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      const dog = {
 *        speak: async () => 'Woof!'
 *      };
 *      const speak = R.invoker(0, 'speak');
 *      speak(dog).then(console.log) //~> 'Woof!'
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */


var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];

    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }

    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});

module.exports = invoker;
  })();
});
require.register("ramda/src/is.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */


var is = /*#__PURE__*/_curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});

module.exports = is;
  })();
});
require.register("ramda/src/isEmpty.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var empty = /*#__PURE__*/require("./empty");

var equals = /*#__PURE__*/require("./equals");
/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */


var isEmpty = /*#__PURE__*/_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

module.exports = isEmpty;
  })();
});
require.register("ramda/src/isNil.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil = /*#__PURE__*/_curry1(function isNil(x) {
  return x == null;
});

module.exports = isNil;
  })();
});
require.register("ramda/src/join.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var invoker = /*#__PURE__*/require("./invoker");
/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      const spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */


var join = /*#__PURE__*/invoker(1, 'join');
module.exports = join;
  })();
});
require.register("ramda/src/juxt.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var converge = /*#__PURE__*/require("./converge");
/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */


var juxt = /*#__PURE__*/_curry1(function juxt(fns) {
  return converge(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});

module.exports = juxt;
  })();
});
require.register("ramda/src/keys.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _has = /*#__PURE__*/require("./internal/_has");

var _isArguments = /*#__PURE__*/require("./internal/_isArguments"); // cover IE < 9 keys issues


var hasEnumBug = ! /*#__PURE__*/{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? /*#__PURE__*/_curry1(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /*#__PURE__*/_curry1(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});
module.exports = keys;
  })();
});
require.register("ramda/src/keysIn.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */


var keysIn = /*#__PURE__*/_curry1(function keysIn(obj) {
  var prop;
  var ks = [];

  for (prop in obj) {
    ks[ks.length] = prop;
  }

  return ks;
});

module.exports = keysIn;
  })();
});
require.register("ramda/src/last.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var nth = /*#__PURE__*/require("./nth");
/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */


var last = /*#__PURE__*/nth(-1);
module.exports = last;
  })();
});
require.register("ramda/src/lastIndexOf.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isArray = /*#__PURE__*/require("./internal/_isArray");

var equals = /*#__PURE__*/require("./equals");
/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */


var lastIndexOf = /*#__PURE__*/_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;

    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }

      idx -= 1;
    }

    return -1;
  }
});

module.exports = lastIndexOf;
  })();
});
require.register("ramda/src/length.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _isNumber = /*#__PURE__*/require("./internal/_isNumber");
/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */


var length = /*#__PURE__*/_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});

module.exports = length;
  })();
});
require.register("ramda/src/lens.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var map = /*#__PURE__*/require("./map");
/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lens = /*#__PURE__*/_curry2(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});

module.exports = lens;
  })();
});
require.register("ramda/src/lensIndex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var lens = /*#__PURE__*/require("./lens");

var nth = /*#__PURE__*/require("./nth");

var update = /*#__PURE__*/require("./update");
/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over, R.nth
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */


var lensIndex = /*#__PURE__*/_curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});

module.exports = lensIndex;
  })();
});
require.register("ramda/src/lensPath.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var assocPath = /*#__PURE__*/require("./assocPath");

var lens = /*#__PURE__*/require("./lens");

var path = /*#__PURE__*/require("./path");
/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */


var lensPath = /*#__PURE__*/_curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});

module.exports = lensPath;
  })();
});
require.register("ramda/src/lensProp.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var assoc = /*#__PURE__*/require("./assoc");

var lens = /*#__PURE__*/require("./lens");

var prop = /*#__PURE__*/require("./prop");
/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lensProp = /*#__PURE__*/_curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});

module.exports = lensProp;
  })();
});
require.register("ramda/src/lift.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var liftN = /*#__PURE__*/require("./liftN");
/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      const madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */


var lift = /*#__PURE__*/_curry1(function lift(fn) {
  return liftN(fn.length, fn);
});

module.exports = lift;
  })();
});
require.register("ramda/src/liftN.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var ap = /*#__PURE__*/require("./ap");

var curryN = /*#__PURE__*/require("./curryN");

var map = /*#__PURE__*/require("./map");
/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      const madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */


var liftN = /*#__PURE__*/_curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function () {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

module.exports = liftN;
  })();
});
require.register("ramda/src/lt.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */


var lt = /*#__PURE__*/_curry2(function lt(a, b) {
  return a < b;
});

module.exports = lt;
  })();
});
require.register("ramda/src/lte.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */


var lte = /*#__PURE__*/_curry2(function lte(a, b) {
  return a <= b;
});

module.exports = lte;
  })();
});
require.register("ramda/src/map.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _map = /*#__PURE__*/require("./internal/_map");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var _xmap = /*#__PURE__*/require("./internal/_xmap");

var curryN = /*#__PURE__*/require("./curryN");

var keys = /*#__PURE__*/require("./keys");
/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */


var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));

    default:
      return _map(fn, functor);
  }
}));

module.exports = map;
  })();
});
require.register("ramda/src/mapAccum.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.scan, R.addIndex, R.mapAccumRight
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */


var mapAccum = /*#__PURE__*/_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];

  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }

  return [tuple[0], result];
});

module.exports = mapAccum;
  })();
});
require.register("ramda/src/mapAccumRight.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [b + a, b + a];
 *
 *      R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   f(f(f(a, d)[0], c)[0], b)[0],
 *   [
 *     f(a, d)[1],
 *     f(f(a, d)[0], c)[1],
 *     f(f(f(a, d)[0], c)[0], b)[1]
 *   ]
 * ]
 */


var mapAccumRight = /*#__PURE__*/_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];

  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }

  return [tuple[0], result];
});

module.exports = mapAccumRight;
  })();
});
require.register("ramda/src/mapObjIndexed.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var keys = /*#__PURE__*/require("./keys");
/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      const xyz = { x: 1, y: 2, z: 3 };
 *      const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */


var mapObjIndexed = /*#__PURE__*/_curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});

module.exports = mapObjIndexed;
  })();
});
require.register("ramda/src/match.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */


var match = /*#__PURE__*/_curry2(function match(rx, str) {
  return str.match(rx) || [];
});

module.exports = match;
  })();
});
require.register("ramda/src/mathMod.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isInteger = /*#__PURE__*/require("./internal/_isInteger");
/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      const clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      const seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */


var mathMod = /*#__PURE__*/_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }

  if (!_isInteger(p) || p < 1) {
    return NaN;
  }

  return (m % p + p) % p;
});

module.exports = mathMod;
  })();
});
require.register("ramda/src/max.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */


var max = /*#__PURE__*/_curry2(function max(a, b) {
  return b > a ? b : a;
});

module.exports = max;
  })();
});
require.register("ramda/src/maxBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */


var maxBy = /*#__PURE__*/_curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});

module.exports = maxBy;
  })();
});
require.register("ramda/src/mean.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var sum = /*#__PURE__*/require("./sum");
/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */


var mean = /*#__PURE__*/_curry1(function mean(list) {
  return sum(list) / list.length;
});

module.exports = mean;
  })();
});
require.register("ramda/src/median.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var mean = /*#__PURE__*/require("./mean");
/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */


var median = /*#__PURE__*/_curry1(function median(list) {
  var len = list.length;

  if (len === 0) {
    return NaN;
  }

  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

module.exports = median;
  })();
});
require.register("ramda/src/memoizeWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _has = /*#__PURE__*/require("./internal/_has");
/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoizeWith = /*#__PURE__*/_curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = mFn.apply(this, arguments);

    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }

    return cache[key];
  });
});

module.exports = memoizeWith;
  })();
});
require.register("ramda/src/merge.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _objectAssign = /*#__PURE__*/require("./internal/_objectAssign");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @deprecated since v0.26.0
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.merge({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge(a, b) = {...a, ...b}
 */


var merge = /*#__PURE__*/_curry2(function merge(l, r) {
  return _objectAssign({}, l, r);
});

module.exports = merge;
  })();
});
require.register("ramda/src/mergeAll.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _objectAssign = /*#__PURE__*/require("./internal/_objectAssign");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */


var mergeAll = /*#__PURE__*/_curry1(function mergeAll(list) {
  return _objectAssign.apply(null, [{}].concat(list));
});

module.exports = mergeAll;
  })();
});
require.register("ramda/src/mergeDeepLeft.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var mergeDeepWithKey = /*#__PURE__*/require("./mergeDeepWithKey");
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */


var mergeDeepLeft = /*#__PURE__*/_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});

module.exports = mergeDeepLeft;
  })();
});
require.register("ramda/src/mergeDeepRight.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var mergeDeepWithKey = /*#__PURE__*/require("./mergeDeepWithKey");
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight = /*#__PURE__*/_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

module.exports = mergeDeepRight;
  })();
});
require.register("ramda/src/mergeDeepWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var mergeDeepWithKey = /*#__PURE__*/require("./mergeDeepWithKey");
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */


var mergeDeepWith = /*#__PURE__*/_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});

module.exports = mergeDeepWith;
  })();
});
require.register("ramda/src/mergeDeepWithKey.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var _isObject = /*#__PURE__*/require("./internal/_isObject");

var mergeWithKey = /*#__PURE__*/require("./mergeWithKey");
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey = /*#__PURE__*/_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

module.exports = mergeDeepWithKey;
  })();
});
require.register("ramda/src/mergeLeft.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _objectAssign = /*#__PURE__*/require("./internal/_objectAssign");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */


var mergeLeft = /*#__PURE__*/_curry2(function mergeLeft(l, r) {
  return _objectAssign({}, r, l);
});

module.exports = mergeLeft;
  })();
});
require.register("ramda/src/mergeRight.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _objectAssign = /*#__PURE__*/require("./internal/_objectAssign");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeRight(a, b) = {...a, ...b}
 */


var mergeRight = /*#__PURE__*/_curry2(function mergeRight(l, r) {
  return _objectAssign({}, l, r);
});

module.exports = mergeRight;
  })();
});
require.register("ramda/src/mergeWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var mergeWithKey = /*#__PURE__*/require("./mergeWithKey");
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */


var mergeWith = /*#__PURE__*/_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

module.exports = mergeWith;
  })();
});
require.register("ramda/src/mergeWithKey.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var _has = /*#__PURE__*/require("./internal/_has");
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey = /*#__PURE__*/_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});

module.exports = mergeWithKey;
  })();
});
require.register("ramda/src/min.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */


var min = /*#__PURE__*/_curry2(function min(a, b) {
  return b < a ? b : a;
});

module.exports = min;
  })();
});
require.register("ramda/src/minBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */


var minBy = /*#__PURE__*/_curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});

module.exports = minBy;
  })();
});
require.register("ramda/src/modulo.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      const isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */


var modulo = /*#__PURE__*/_curry2(function modulo(a, b) {
  return a % b;
});

module.exports = modulo;
  })();
});
require.register("ramda/src/move.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} from The source index
 * @param {Number} to The destination index
 * @param {Array} list The list which will serve to realise the move
 * @return {Array} The new list reordered
 * @example
 *
 *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */


var move = /*#__PURE__*/_curry3(function (from, to, list) {
  var length = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});

module.exports = move;
  })();
});
require.register("ramda/src/multiply.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      const double = R.multiply(2);
 *      const triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */


var multiply = /*#__PURE__*/_curry2(function multiply(a, b) {
  return a * b;
});

module.exports = multiply;
  })();
});
require.register("ramda/src/nAry.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      const takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */


var nAry = /*#__PURE__*/_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };

    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };

    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };

    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

module.exports = nAry;
  })();
});
require.register("ramda/src/negate.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */


var negate = /*#__PURE__*/_curry1(function negate(n) {
  return -n;
});

module.exports = negate;
  })();
});
require.register("ramda/src/none.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _complement = /*#__PURE__*/require("./internal/_complement");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var all = /*#__PURE__*/require("./all");
/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *      const isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */


var none = /*#__PURE__*/_curry2(function none(fn, input) {
  return all(_complement(fn), input);
});

module.exports = none;
  })();
});
require.register("ramda/src/not.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


var not = /*#__PURE__*/_curry1(function not(a) {
  return !a;
});

module.exports = not;
  })();
});
require.register("ramda/src/nth.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isString = /*#__PURE__*/require("./internal/_isString");
/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

module.exports = nth;
  })();
});
require.register("ramda/src/nthArg.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var curryN = /*#__PURE__*/require("./curryN");

var nth = /*#__PURE__*/require("./nth");
/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */


var nthArg = /*#__PURE__*/_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});

module.exports = nthArg;
  })();
});
require.register("ramda/src/o.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      const yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */


var o = /*#__PURE__*/_curry3(function o(f, g, x) {
  return f(g(x));
});

module.exports = o;
  })();
});
require.register("ramda/src/objOf.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      const matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */


var objOf = /*#__PURE__*/_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

module.exports = objOf;
  })();
});
require.register("ramda/src/of.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _of = /*#__PURE__*/require("./internal/_of");
/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */


var of = /*#__PURE__*/_curry1(_of);

module.exports = of;
  })();
});
require.register("ramda/src/omit.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */


var omit = /*#__PURE__*/_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

module.exports = omit;
  })();
});
require.register("ramda/src/once.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      const addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */


var once = /*#__PURE__*/_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }

    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

module.exports = once;
  })();
});
require.register("ramda/src/or.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either, R.xor
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */


var or = /*#__PURE__*/_curry2(function or(a, b) {
  return a || b;
});

module.exports = or;
  })();
});
require.register("ramda/src/otherwise.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _assertPromise = /*#__PURE__*/require("./internal/_assertPromise");
/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig (e -> b) -> (Promise e a) -> (Promise e b)
 * @sig (e -> (Promise f b)) -> (Promise e a) -> (Promise f b)
 * @param {Function} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(null, onFailure)`
 * @see R.then
 * @example
 *
 *      var failedFetch = (id) => Promise.reject('bad ID');
 *      var useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' })
 *
 *      //recoverFromFailure :: String -> Promise ({firstName, lastName})
 *      var recoverFromFailure = R.pipe(
 *        failedFetch,
 *        R.otherwise(useDefault),
 *        R.then(R.pick(['firstName', 'lastName'])),
 *      );
 *      recoverFromFailure(12345).then(console.log)
 */


var otherwise = /*#__PURE__*/_curry2(function otherwise(f, p) {
  _assertPromise('otherwise', p);

  return p.then(null, f);
});

module.exports = otherwise;
  })();
});
require.register("ramda/src/over.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3"); // `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.


var Identity = function Identity(x) {
  return {
    value: x,
    map: function map(f) {
      return Identity(f(x));
    }
  };
};
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */


var over = /*#__PURE__*/_curry3(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});

module.exports = over;
  })();
});
require.register("ramda/src/pair.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */


var pair = /*#__PURE__*/_curry2(function pair(fst, snd) {
  return [fst, snd];
});

module.exports = pair;
  })();
});
require.register("ramda/src/partial.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _createPartialApplicator = /*#__PURE__*/require("./internal/_createPartialApplicator");
/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight, R.curry
 * @example
 *
 *      const multiply2 = (a, b) => a * b;
 *      const double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partial(greet, ['Hello']);
 *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */


var partial = /*#__PURE__*/_createPartialApplicator(_concat);

module.exports = partial;
  })();
});
require.register("ramda/src/partialRight.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _createPartialApplicator = /*#__PURE__*/require("./internal/_createPartialApplicator");

var flip = /*#__PURE__*/require("./flip");
/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */


var partialRight = /*#__PURE__*/_createPartialApplicator( /*#__PURE__*/flip(_concat));

module.exports = partialRight;
  })();
});
require.register("ramda/src/partition.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var filter = /*#__PURE__*/require("./filter");

var juxt = /*#__PURE__*/require("./juxt");

var reject = /*#__PURE__*/require("./reject");
/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */


var partition = /*#__PURE__*/juxt([filter, reject]);
module.exports = partition;
  })();
});
require.register("ramda/src/path.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var paths = /*#__PURE__*/require("./paths");
/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 */


var path = /*#__PURE__*/_curry2(function path(pathAr, obj) {
  return paths([pathAr], obj)[0];
});

module.exports = path;
  })();
});
require.register("ramda/src/pathEq.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var equals = /*#__PURE__*/require("./equals");

var path = /*#__PURE__*/require("./path");
/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      const user1 = { address: { zipCode: 90210 } };
 *      const user2 = { address: { zipCode: 55555 } };
 *      const user3 = { name: 'Bob' };
 *      const users = [ user1, user2, user3 ];
 *      const isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */


var pathEq = /*#__PURE__*/_curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});

module.exports = pathEq;
  })();
});
require.register("ramda/src/pathOr.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var defaultTo = /*#__PURE__*/require("./defaultTo");

var path = /*#__PURE__*/require("./path");
/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */


var pathOr = /*#__PURE__*/_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});

module.exports = pathOr;
  })();
});
require.register("ramda/src/pathSatisfies.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var path = /*#__PURE__*/require("./path");
/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 *      R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 */


var pathSatisfies = /*#__PURE__*/_curry3(function pathSatisfies(pred, propPath, obj) {
  return pred(path(propPath, obj));
});

module.exports = pathSatisfies;
  })();
});
require.register("ramda/src/paths.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isInteger = /*#__PURE__*/require("./internal/_isInteger");

var nth = /*#__PURE__*/require("./nth");
/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Object
 * @typedefn Idx = [String | Int]
 * @sig [Idx] -> {a} -> [a | Undefined]
 * @param {Array} pathsArray The array of paths to be fetched.
 * @param {Object} obj The object to retrieve the nested properties from.
 * @return {Array} A list consisting of values at paths specified by "pathsArray".
 * @see R.path
 * @example
 *
 *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */


var paths = /*#__PURE__*/_curry2(function paths(pathsArray, obj) {
  return pathsArray.map(function (paths) {
    var val = obj;
    var idx = 0;
    var p;

    while (idx < paths.length) {
      if (val == null) {
        return;
      }

      p = paths[idx];
      val = _isInteger(p) ? nth(p, val) : val[p];
      idx += 1;
    }

    return val;
  });
});

module.exports = paths;
  })();
});
require.register("ramda/src/pick.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */


var pick = /*#__PURE__*/_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;

  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }

    idx += 1;
  }

  return result;
});

module.exports = pick;
  })();
});
require.register("ramda/src/pickAll.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */


var pickAll = /*#__PURE__*/_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }

  return result;
});

module.exports = pickAll;
  })();
});
require.register("ramda/src/pickBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      const isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */


var pickBy = /*#__PURE__*/_curry2(function pickBy(test, obj) {
  var result = {};

  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

module.exports = pickBy;
  })();
});
require.register("ramda/src/pipe.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _pipe = /*#__PURE__*/require("./internal/_pipe");

var reduce = /*#__PURE__*/require("./reduce");

var tail = /*#__PURE__*/require("./tail");
/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}

module.exports = pipe;
  })();
});
require.register("ramda/src/pipeK.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var composeK = /*#__PURE__*/require("./composeK");

var reverse = /*#__PURE__*/require("./reverse");
/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @deprecated since v0.26.0
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      const getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */


function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }

  return composeK.apply(this, reverse(arguments));
}

module.exports = pipeK;
  })();
});
require.register("ramda/src/pipeP.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _pipeP = /*#__PURE__*/require("./internal/_pipeP");

var reduce = /*#__PURE__*/require("./reduce");

var tail = /*#__PURE__*/require("./tail");
/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The first argument may have any arity; the remaining arguments
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @deprecated since v0.26.0
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      const followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */


function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
}

module.exports = pipeP;
  })();
});
require.register("ramda/src/pipeWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var head = /*#__PURE__*/require("./head");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var tail = /*#__PURE__*/require("./tail");

var identity = /*#__PURE__*/require("./identity");
/**
 * Performs left-to-right function composition using transforming function. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)([g, h, i])(...args) = f(i, f(h, g(...args)))
 */


var pipeWith = /*#__PURE__*/_curry2(function pipeWith(xf, list) {
  if (list.length <= 0) {
    return identity;
  }

  var headList = head(list);
  var tailList = tail(list);
  return _arity(headList.length, function () {
    return _reduce(function (result, f) {
      return xf.call(this, f, result);
    }, headList.apply(this, arguments), tailList);
  });
});

module.exports = pipeWith;
  })();
});
require.register("ramda/src/pluck.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var map = /*#__PURE__*/require("./map");

var prop = /*#__PURE__*/require("./prop");
/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      var getAges = R.pluck('age');
 *      getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 *      R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */


var pluck = /*#__PURE__*/_curry2(function pluck(p, list) {
  return map(prop(p), list);
});

module.exports = pluck;
  })();
});
require.register("ramda/src/prepend.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */


var prepend = /*#__PURE__*/_curry2(function prepend(el, list) {
  return _concat([el], list);
});

module.exports = prepend;
  })();
});
require.register("ramda/src/product.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var multiply = /*#__PURE__*/require("./multiply");

var reduce = /*#__PURE__*/require("./reduce");
/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */


var product = /*#__PURE__*/reduce(multiply, 1);
module.exports = product;
  })();
});
require.register("ramda/src/project.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _map = /*#__PURE__*/require("./internal/_map");

var identity = /*#__PURE__*/require("./identity");

var pickAll = /*#__PURE__*/require("./pickAll");

var useWith = /*#__PURE__*/require("./useWith");
/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      const kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */


var project = /*#__PURE__*/useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity

module.exports = project;
  })();
});
require.register("ramda/src/prop.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var path = /*#__PURE__*/require("./path");
/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */


var prop = /*#__PURE__*/_curry2(function prop(p, obj) {
  return path([p], obj);
});

module.exports = prop;
  })();
});
require.register("ramda/src/propEq.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var equals = /*#__PURE__*/require("./equals");
/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      const kids = [abby, fred, rusty, alois];
 *      const hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */


var propEq = /*#__PURE__*/_curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});

module.exports = propEq;
  })();
});
require.register("ramda/src/propIs.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var is = /*#__PURE__*/require("./is");
/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */


var propIs = /*#__PURE__*/_curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});

module.exports = propIs;
  })();
});
require.register("ramda/src/propOr.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var pathOr = /*#__PURE__*/require("./pathOr");
/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const favorite = R.prop('favoriteLibrary');
 *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */


var propOr = /*#__PURE__*/_curry3(function propOr(val, p, obj) {
  return pathOr(val, [p], obj);
});

module.exports = propOr;
  })();
});
require.register("ramda/src/propSatisfies.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */


var propSatisfies = /*#__PURE__*/_curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});

module.exports = propSatisfies;
  })();
});
require.register("ramda/src/props.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var path = /*#__PURE__*/require("./path");
/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */


var props = /*#__PURE__*/_curry2(function props(ps, obj) {
  return ps.map(function (p) {
    return path([p], obj);
  });
});

module.exports = props;
  })();
});
require.register("ramda/src/range.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isNumber = /*#__PURE__*/require("./internal/_isNumber");
/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */


var range = /*#__PURE__*/_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }

  var result = [];
  var n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
});

module.exports = range;
  })();
});
require.register("ramda/src/reduce.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var _reduce = /*#__PURE__*/require("./internal/_reduce");
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce = /*#__PURE__*/_curry3(_reduce);

module.exports = reduce;
  })();
});
require.register("ramda/src/reduceBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _clone = /*#__PURE__*/require("./internal/_clone");

var _curryN = /*#__PURE__*/require("./internal/_curryN");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _has = /*#__PURE__*/require("./internal/_has");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var _xreduceBy = /*#__PURE__*/require("./internal/_xreduceBy");
/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      const groupNames = (acc, {name}) => acc.concat(name)
 *      const toGrade = ({score}) =>
 *        score < 65 ? 'F' :
 *        score < 70 ? 'D' :
 *        score < 80 ? 'C' :
 *        score < 90 ? 'B' : 'A'
 *
 *      var students = [
 *        {name: 'Abby', score: 83},
 *        {name: 'Bart', score: 62},
 *        {name: 'Curt', score: 88},
 *        {name: 'Dora', score: 92},
 *      ]
 *
 *      reduceBy(groupNames, [], toGrade, students)
 *      //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 */


var reduceBy = /*#__PURE__*/_curryN(4, [], /*#__PURE__*/_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
  return _reduce(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, [], [], false), elt);
    return acc;
  }, {}, list);
}));

module.exports = reduceBy;
  })();
});
require.register("ramda/src/reduceRight.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */


var reduceRight = /*#__PURE__*/_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }

  return acc;
});

module.exports = reduceRight;
  })();
});
require.register("ramda/src/reduceWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curryN = /*#__PURE__*/require("./internal/_curryN");

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var _reduced = /*#__PURE__*/require("./internal/_reduced");
/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      const isOdd = (acc, x) => x % 2 === 1;
 *      const xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      const ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */


var reduceWhile = /*#__PURE__*/_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});

module.exports = reduceWhile;
  })();
});
require.register("ramda/src/reduced.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _reduced = /*#__PURE__*/require("./internal/_reduced");
/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is only available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`transduce`](#transduce)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.reduceWhile, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */


var reduced = /*#__PURE__*/_curry1(_reduced);

module.exports = reduced;
  })();
});
require.register("ramda/src/reject.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _complement = /*#__PURE__*/require("./internal/_complement");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var filter = /*#__PURE__*/require("./filter");
/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

module.exports = reject;
  })();
});
require.register("ramda/src/remove.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @see R.without
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */


var remove = /*#__PURE__*/_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

module.exports = remove;
  })();
});
require.register("ramda/src/repeat.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var always = /*#__PURE__*/require("./always");

var times = /*#__PURE__*/require("./times");
/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      const obj = {};
 *      const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */


var repeat = /*#__PURE__*/_curry2(function repeat(value, n) {
  return times(always(value), n);
});

module.exports = repeat;
  })();
});
require.register("ramda/src/replace.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */


var replace = /*#__PURE__*/_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

module.exports = replace;
  })();
});
require.register("ramda/src/reverse.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _isString = /*#__PURE__*/require("./internal/_isString");
/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

module.exports = reverse;
  })();
});
require.register("ramda/src/scan.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce, R.mapAccum
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */


var scan = /*#__PURE__*/_curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];

  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }

  return result;
});

module.exports = scan;
  })();
});
require.register("ramda/src/sequence.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var ap = /*#__PURE__*/require("./ap");

var map = /*#__PURE__*/require("./map");

var prepend = /*#__PURE__*/require("./prepend");

var reduceRight = /*#__PURE__*/require("./reduceRight");
/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */


var sequence = /*#__PURE__*/_curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (x, acc) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});

module.exports = sequence;
  })();
});
require.register("ramda/src/set.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var always = /*#__PURE__*/require("./always");

var over = /*#__PURE__*/require("./over");
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */


var set = /*#__PURE__*/_curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});

module.exports = set;
  })();
});
require.register("ramda/src/slice.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _checkForMethod = /*#__PURE__*/require("./internal/_checkForMethod");

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

module.exports = slice;
  })();
});
require.register("ramda/src/sort.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      const diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */


var sort = /*#__PURE__*/_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

module.exports = sort;
  })();
});
require.register("ramda/src/sortBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */


var sortBy = /*#__PURE__*/_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

module.exports = sortBy;
  })();
});
require.register("ramda/src/sortWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      const alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      const bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      const people = [clara, bob, alice];
 *      const ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */


var sortWith = /*#__PURE__*/_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;

    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }

    return result;
  });
});

module.exports = sortWith;
  })();
});
require.register("ramda/src/split.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var invoker = /*#__PURE__*/require("./invoker");
/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `sep`.
 * @see R.join
 * @example
 *
 *      const pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */


var split = /*#__PURE__*/invoker(1, 'split');
module.exports = split;
  })();
});
require.register("ramda/src/splitAt.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var length = /*#__PURE__*/require("./length");

var slice = /*#__PURE__*/require("./slice");
/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */


var splitAt = /*#__PURE__*/_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});

module.exports = splitAt;
  })();
});
require.register("ramda/src/splitEvery.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var slice = /*#__PURE__*/require("./slice");
/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */


var splitEvery = /*#__PURE__*/_curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }

  return result;
});

module.exports = splitEvery;
  })();
});
require.register("ramda/src/splitWhen.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */


var splitWhen = /*#__PURE__*/_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});

module.exports = splitWhen;
  })();
});
require.register("ramda/src/startsWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var equals = /*#__PURE__*/require("./equals");

var take = /*#__PURE__*/require("./take");
/**
 * Checks if a list starts with the provided sublist.
 *
 * Similarly, checks if a string starts with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @see R.endsWith
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var startsWith = /*#__PURE__*/_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});

module.exports = startsWith;
  })();
});
require.register("ramda/src/subtract.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      const minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      const complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */


var subtract = /*#__PURE__*/_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});

module.exports = subtract;
  })();
});
require.register("ramda/src/sum.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var add = /*#__PURE__*/require("./add");

var reduce = /*#__PURE__*/require("./reduce");
/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */


var sum = /*#__PURE__*/reduce(add, 0);
module.exports = sum;
  })();
});
require.register("ramda/src/symmetricDifference.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var concat = /*#__PURE__*/require("./concat");

var difference = /*#__PURE__*/require("./difference");
/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */


var symmetricDifference = /*#__PURE__*/_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});

module.exports = symmetricDifference;
  })();
});
require.register("ramda/src/symmetricDifferenceWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var concat = /*#__PURE__*/require("./concat");

var differenceWith = /*#__PURE__*/require("./differenceWith");
/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      const eqA = R.eqBy(R.prop('a'));
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */


var symmetricDifferenceWith = /*#__PURE__*/_curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});

module.exports = symmetricDifferenceWith;
  })();
});
require.register("ramda/src/tail.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _checkForMethod = /*#__PURE__*/require("./internal/_checkForMethod");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));

module.exports = tail;
  })();
});
require.register("ramda/src/take.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xtake = /*#__PURE__*/require("./internal/_xtake");

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      const personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      const takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


var take = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));

module.exports = take;
  })();
});
require.register("ramda/src/takeLast.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var drop = /*#__PURE__*/require("./drop");
/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


var takeLast = /*#__PURE__*/_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

module.exports = takeLast;
  })();
});
require.register("ramda/src/takeLastWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      const isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */


var takeLastWhile = /*#__PURE__*/_curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }

  return slice(idx + 1, Infinity, xs);
});

module.exports = takeLastWhile;
  })();
});
require.register("ramda/src/takeWhile.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xtakeWhile = /*#__PURE__*/require("./internal/_xtakeWhile");

var slice = /*#__PURE__*/require("./slice");
/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      const isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */


var takeWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }

  return slice(0, idx, xs);
}));

module.exports = takeWhile;
  })();
});
require.register("ramda/src/tap.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _dispatchable = /*#__PURE__*/require("./internal/_dispatchable");

var _xtap = /*#__PURE__*/require("./internal/_xtap");
/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      const sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */


var tap = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));

module.exports = tap;
  })();
});
require.register("ramda/src/test.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _cloneRegExp = /*#__PURE__*/require("./internal/_cloneRegExp");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _isRegExp = /*#__PURE__*/require("./internal/_isRegExp");

var toString = /*#__PURE__*/require("./toString");
/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */


var test = /*#__PURE__*/_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }

  return _cloneRegExp(pattern).test(str);
});

module.exports = test;
  })();
});
require.register("ramda/src/thunkify.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var curryN = /*#__PURE__*/require("./curryN");

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
 * @param {Function} fn A function to wrap in a thunk
 * @return {Function} Expects arguments for `fn` and returns a new function
 *  that, when called, applies those arguments to `fn`.
 * @see R.partial, R.partialRight
 * @example
 *
 *      R.thunkify(R.identity)(42)(); //=> 42
 *      R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 */


var thunkify = /*#__PURE__*/_curry1(function thunkify(fn) {
  return curryN(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});

module.exports = thunkify;
  })();
});
require.register("ramda/src/times.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times = /*#__PURE__*/_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }

  list = new Array(len);

  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }

  return list;
});

module.exports = times;
  })();
});
require.register("ramda/src/toLower.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var invoker = /*#__PURE__*/require("./invoker");
/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */


var toLower = /*#__PURE__*/invoker(0, 'toLowerCase');
module.exports = toLower;
  })();
});
require.register("ramda/src/toPairs.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _has = /*#__PURE__*/require("./internal/_has");
/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */


var toPairs = /*#__PURE__*/_curry1(function toPairs(obj) {
  var pairs = [];

  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }

  return pairs;
});

module.exports = toPairs;
  })();
});
require.register("ramda/src/toPairsIn.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */


var toPairsIn = /*#__PURE__*/_curry1(function toPairsIn(obj) {
  var pairs = [];

  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
});

module.exports = toPairsIn;
  })();
});
require.register("ramda/src/toString.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var _toString = /*#__PURE__*/require("./internal/_toString");
/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */


var toString = /*#__PURE__*/_curry1(function toString(val) {
  return _toString(val, []);
});

module.exports = toString;
  })();
});
require.register("ramda/src/toUpper.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var invoker = /*#__PURE__*/require("./invoker");
/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */


var toUpper = /*#__PURE__*/invoker(0, 'toUpperCase');
module.exports = toUpper;
  })();
});
require.register("ramda/src/transduce.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _reduce = /*#__PURE__*/require("./internal/_reduce");

var _xwrap = /*#__PURE__*/require("./internal/_xwrap");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      const isOdd = (x) => x % 2 === 1;
 *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */


var transduce = /*#__PURE__*/curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
module.exports = transduce;
  })();
});
require.register("ramda/src/transpose.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */


var transpose = /*#__PURE__*/_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];

  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;

    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }

      result[j].push(innerlist[j]);
      j += 1;
    }

    i += 1;
  }

  return result;
});

module.exports = transpose;
  })();
});
require.register("ramda/src/traverse.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var map = /*#__PURE__*/require("./map");

var sequence = /*#__PURE__*/require("./sequence");
/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Maybe.Nothing` if the given divisor is `0`
 *      const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 */


var traverse = /*#__PURE__*/_curry3(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : sequence(of, map(f, traversable));
});

module.exports = traverse;
  })();
});
require.register("ramda/src/trim.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */

var trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? /*#__PURE__*/_curry1(function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
}) : /*#__PURE__*/_curry1(function trim(str) {
  return str.trim();
});
module.exports = trim;
  })();
});
require.register("ramda/src/tryCatch.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _arity = /*#__PURE__*/require("./internal/_arity");

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(() => { throw 'foo'}, R.always('catched'))('bar') // => 'catched'
 *      R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 *      R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 */


var tryCatch = /*#__PURE__*/_curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});

module.exports = tryCatch;
  })();
});
require.register("ramda/src/type.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */


var type = /*#__PURE__*/_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

module.exports = type;
  })();
});
require.register("ramda/src/unapply.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */


var unapply = /*#__PURE__*/_curry1(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

module.exports = unapply;
  })();
});
require.register("ramda/src/unary.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var nAry = /*#__PURE__*/require("./nAry");
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      const takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */


var unary = /*#__PURE__*/_curry1(function unary(fn) {
  return nAry(1, fn);
});

module.exports = unary;
  })();
});
require.register("ramda/src/uncurryN.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */


var uncurryN = /*#__PURE__*/_curry2(function uncurryN(depth, fn) {
  return curryN(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;

    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }

    return value;
  });
});

module.exports = uncurryN;
  })();
});
require.register("ramda/src/unfold.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      const f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */


var unfold = /*#__PURE__*/_curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];

  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }

  return result;
});

module.exports = unfold;
  })();
});
require.register("ramda/src/union.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var compose = /*#__PURE__*/require("./compose");

var uniq = /*#__PURE__*/require("./uniq");
/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */


var union = /*#__PURE__*/_curry2( /*#__PURE__*/compose(uniq, _concat));

module.exports = union;
  })();
});
require.register("ramda/src/unionWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _concat = /*#__PURE__*/require("./internal/_concat");

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var uniqWith = /*#__PURE__*/require("./uniqWith");
/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const l1 = [{a: 1}, {a: 2}];
 *      const l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */


var unionWith = /*#__PURE__*/_curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});

module.exports = unionWith;
  })();
});
require.register("ramda/src/uniq.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var identity = /*#__PURE__*/require("./identity");

var uniqBy = /*#__PURE__*/require("./uniqBy");
/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */


var uniq = /*#__PURE__*/uniqBy(identity);
module.exports = uniq;
  })();
});
require.register("ramda/src/uniqBy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _Set = /*#__PURE__*/require("./internal/_Set");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */


var uniqBy = /*#__PURE__*/_curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);

    if (set.add(appliedItem)) {
      result.push(item);
    }

    idx += 1;
  }

  return result;
});

module.exports = uniqBy;
  })();
});
require.register("ramda/src/uniqWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includesWith = /*#__PURE__*/require("./internal/_includesWith");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      const strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */


var uniqWith = /*#__PURE__*/_curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;

  while (idx < len) {
    item = list[idx];

    if (!_includesWith(pred, item, result)) {
      result[result.length] = item;
    }

    idx += 1;
  }

  return result;
});

module.exports = uniqWith;
  })();
});
require.register("ramda/src/unless.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when, R.cond
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */


var unless = /*#__PURE__*/_curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

module.exports = unless;
  })();
});
require.register("ramda/src/unnest.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _identity = /*#__PURE__*/require("./internal/_identity");

var chain = /*#__PURE__*/require("./chain");
/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */


var unnest = /*#__PURE__*/chain(_identity);
module.exports = unnest;
  })();
});
require.register("ramda/src/until.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */


var until = /*#__PURE__*/_curry3(function until(pred, fn, init) {
  var val = init;

  while (!pred(val)) {
    val = fn(val);
  }

  return val;
});

module.exports = until;
  })();
});
require.register("ramda/src/update.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");

var adjust = /*#__PURE__*/require("./adjust");

var always = /*#__PURE__*/require("./always");
/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 *      R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */


var update = /*#__PURE__*/_curry3(function update(idx, x, list) {
  return adjust(idx, always(x), list);
});

module.exports = update;
  })();
});
require.register("ramda/src/useWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var curryN = /*#__PURE__*/require("./curryN");
/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */


var useWith = /*#__PURE__*/_curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function () {
    var args = [];
    var idx = 0;

    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }

    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

module.exports = useWith;
  })();
});
require.register("ramda/src/values.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");

var keys = /*#__PURE__*/require("./keys");
/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */


var values = /*#__PURE__*/_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

module.exports = values;
  })();
});
require.register("ramda/src/valuesIn.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry1 = /*#__PURE__*/require("./internal/_curry1");
/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */


var valuesIn = /*#__PURE__*/_curry1(function valuesIn(obj) {
  var prop;
  var vs = [];

  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }

  return vs;
});

module.exports = valuesIn;
  })();
});
require.register("ramda/src/view.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2"); // `Const` is a functor that effectively ignores the function given to `map`.


var Const = function Const(x) {
  return {
    value: x,
    'fantasy-land/map': function fantasyLandMap() {
      return this;
    }
  };
};
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */


var view = /*#__PURE__*/_curry2(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});

module.exports = view;
  })();
});
require.register("ramda/src/when.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless, R.cond
 * @example
 *
 *      // truncate :: String -> String
 *      const truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */


var when = /*#__PURE__*/_curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

module.exports = when;
  })();
});
require.register("ramda/src/where.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var _has = /*#__PURE__*/require("./internal/_has");
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */


var where = /*#__PURE__*/_curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }

  return true;
});

module.exports = where;
  })();
});
require.register("ramda/src/whereEq.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var equals = /*#__PURE__*/require("./equals");

var map = /*#__PURE__*/require("./map");

var where = /*#__PURE__*/require("./where");
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */


var whereEq = /*#__PURE__*/_curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});

module.exports = whereEq;
  })();
});
require.register("ramda/src/without.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _includes = /*#__PURE__*/require("./internal/_includes");

var _curry2 = /*#__PURE__*/require("./internal/_curry2");

var flip = /*#__PURE__*/require("./flip");

var reject = /*#__PURE__*/require("./reject");
/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */


var without = /*#__PURE__*/_curry2(function (xs, list) {
  return reject(flip(_includes)(xs), list);
});

module.exports = without;
  })();
});
require.register("ramda/src/xor.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {Any} a
 * @param {Any} b
 * @return {Boolean} true if one of the arguments is truthy and the other is falsy
 * @see R.or, R.and
 * @example
 *
 *      R.xor(true, true); //=> false
 *      R.xor(true, false); //=> true
 *      R.xor(false, true); //=> true
 *      R.xor(false, false); //=> false
 */


var xor = /*#__PURE__*/_curry2(function xor(a, b) {
  return Boolean(!a ^ !b);
});

module.exports = xor;
  })();
});
require.register("ramda/src/xprod.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */


var xprod = /*#__PURE__*/_curry2(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];

  while (idx < ilen) {
    j = 0;

    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }

    idx += 1;
  }

  return result;
});

module.exports = xprod;
  })();
});
require.register("ramda/src/zip.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */


var zip = /*#__PURE__*/_curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }

  return rv;
});

module.exports = zip;
  })();
});
require.register("ramda/src/zipObj.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry2 = /*#__PURE__*/require("./internal/_curry2");
/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */


var zipObj = /*#__PURE__*/_curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};

  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }

  return out;
});

module.exports = zipObj;
  })();
});
require.register("ramda/src/zipWith.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "ramda");
  (function() {
    "use strict";

var _curry3 = /*#__PURE__*/require("./internal/_curry3");
/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      const f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */


var zipWith = /*#__PURE__*/_curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }

  return rv;
});

module.exports = zipWith;
  })();
});
require.register("safe-buffer/index.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "safe-buffer");
  var _Buffer = require('buffer'); var Buffer = _Buffer && _Buffer.Buffer;
(function() {
    "use strict";

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer');

var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
}

SafeBuffer.prototype = Object.create(Buffer.prototype); // Copy static methods from Buffer

copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }

  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  var buf = Buffer(size);

  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }

  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return buffer.SlowBuffer(size);
};
  })();
});;
require.register("stream-http/node_modules/readable-stream/errors-browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    'use strict';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError = /*#__PURE__*/function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/_stream_duplex.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/_stream_readable.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  var _Buffer = require('buffer'); var Buffer = _Buffer && _Buffer.Buffer;
(function() {
    // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
  })();
});;
require.register("stream-http/node_modules/readable-stream/lib/_stream_writable.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  var _Buffer = require('buffer'); var Buffer = _Buffer && _Buffer.Buffer;
(function() {
    // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/async_iterator.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this; // if we have detected an error in the meanwhile
    // reject straight away


    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this; // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to


  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/buffer_list.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  var _Buffer = require('buffer'); var Buffer = _Buffer && _Buffer.Buffer;
(function() {
    'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports = /*#__PURE__*/function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/end-of-stream.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    // Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/from-browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    "use strict";

module.exports = function () {
  throw new Error('Readable.from is not available in the browser');
};
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/state.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
  })();
});
require.register("stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"util":false,"worker_threads":false}, "stream-http/node_modules/readable-stream");
  (function() {
    "use strict";

module.exports = require('events').EventEmitter;
  })();
});
require.register("stream-http/node_modules/string_decoder/lib/string_decoder.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "stream-http/node_modules/string_decoder");
  var _Buffer = require('buffer'); var Buffer = _Buffer && _Buffer.Buffer;
(function() {
    // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/


var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;

  switch (encoding && encoding.toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
    case 'raw':
      return true;

    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;

  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';

      case 'latin1':
      case 'binary':
        return 'latin1';

      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;

      default:
        if (retried) return; // undefined

        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
}

; // Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings

function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);

  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
} // StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.


exports.StringDecoder = StringDecoder;

function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;

  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;

    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;

    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;

    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }

  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;

  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }

  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End; // Returns only complete characters in a Buffer

StringDecoder.prototype.text = utf8Text; // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer

StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }

  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
}; // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.


function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
} // Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.


function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }

  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }

  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }

    return nb;
  }

  return 0;
} // Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.


function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }

  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }

    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
} // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.


function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;

  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }

  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
} // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.


function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
} // For UTF-8, a replacement character is added when ending on a partial
// character.


function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
} // UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.


function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);

    if (r) {
      var c = r.charCodeAt(r.length - 1);

      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }

    return r;
  }

  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
} // For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.


function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';

  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }

  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;

  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }

  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
} // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)


function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
  })();
});;
require.register("util-deprecate/browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "util-deprecate");
  (function() {
    "use strict";

/**
 * Module exports.
 */
module.exports = deprecate;
/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate(fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
}
/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */


function config(name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }

  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}
  })();
});;require.alias("@ionic/core/dist/index.cjs.js", "@ionic/core");
require.alias("buffer/index.js", "buffer");
require.alias("data.task/lib/index.js", "data.task");
require.alias("events/events.js", "events");
require.alias("stream-http/index.js", "http");
require.alias("inherits/inherits_browser.js", "inherits");
require.alias("mithril-stream/stream.js", "mithril-stream");
require.alias("process/browser.js", "process");
require.alias("node-browser-modules/node_modules/punycode/punycode.js", "punycode");
require.alias("querystring-es3/index.js", "querystring");
require.alias("ramda/src/index.js", "ramda");
require.alias("stream-http/node_modules/readable-stream/errors-browser.js", "stream-http/node_modules/readable-stream/errors");
require.alias("stream-http/node_modules/readable-stream/lib/internal/streams/from-browser.js", "stream-http/node_modules/readable-stream/lib/internal/streams/from");
require.alias("stream-http/node_modules/readable-stream/lib/internal/streams/from-browser.js", "stream-http/node_modules/readable-stream/lib/internal/streams/from.js");
require.alias("stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js", "stream-http/node_modules/readable-stream/lib/internal/streams/stream");
require.alias("stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js", "stream-http/node_modules/readable-stream/lib/internal/streams/stream.js");
require.alias("stream-http/node_modules/string_decoder/lib/string_decoder.js", "stream-http/node_modules/string_decoder");
require.alias("url/url.js", "url");
require.alias("util-deprecate/browser.js", "util-deprecate");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');

"use strict";

/* jshint ignore:start */
(function () {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch = window.brunch || {};
  var ar = br['auto-reload'] = br['auto-reload'] || {};
  if (!WebSocket || ar.disabled) return;
  if (window._ar) return;
  window._ar = true;

  var cacheBuster = function cacheBuster(url) {
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'cacheBuster=' + date;
  };

  var browser = navigator.userAgent.toLowerCase();
  var forceRepaint = ar.forceRepaint || browser.indexOf('chrome') > -1;
  var reloaders = {
    page: function page() {
      window.location.reload(true);
    },
    stylesheet: function stylesheet() {
      [].slice.call(document.querySelectorAll('link[rel=stylesheet]')).filter(function (link) {
        var val = link.getAttribute('data-autoreload');
        return link.href && val != 'false';
      }).forEach(function (link) {
        link.href = cacheBuster(link.href);
      }); // Hack to force page repaint after 25ms.

      if (forceRepaint) setTimeout(function () {
        document.body.offsetHeight;
      }, 25);
    },
    javascript: function javascript() {
      var scripts = [].slice.call(document.querySelectorAll('script'));
      var textScripts = scripts.map(function (script) {
        return script.text;
      }).filter(function (text) {
        return text.length > 0;
      });
      var srcScripts = scripts.filter(function (script) {
        return script.src;
      });
      var loaded = 0;
      var all = srcScripts.length;

      var onLoad = function onLoad() {
        loaded = loaded + 1;

        if (loaded === all) {
          textScripts.forEach(function (script) {
            eval(script);
          });
        }
      };

      srcScripts.forEach(function (script) {
        var src = script.src;
        script.remove();
        var newScript = document.createElement('script');
        newScript.src = cacheBuster(src);
        newScript.async = true;
        newScript.onload = onLoad;
        document.head.appendChild(newScript);
      });
    }
  };
  var port = ar.port || 9485;
  var host = br.server || window.location.hostname || 'localhost';

  var connect = function connect() {
    var connection = new WebSocket('ws://' + host + ':' + port);

    connection.onmessage = function (event) {
      if (ar.disabled) return;
      var message = event.data;
      var reloader = reloaders[message] || reloaders.page;
      reloader();
    };

    connection.onerror = function () {
      if (connection.readyState) connection.close();
    };

    connection.onclose = function () {
      window.setTimeout(connect, 1000);
    };
  };

  connect();
})();
/* jshint ignore:end */
;
//# sourceMappingURL=vendor.js.map