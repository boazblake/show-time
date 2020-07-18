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
require.register("Utils.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;

var log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

exports.log = log;

var secureImg = function secureImg(url) {
  return url.match(/(https)./) ? url : url.replace("http", "https");
};
});

;require.register("components/hamburger.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hamburger = void 0;
var Hamburger = {
  view: function view(_ref) {
    var mdl = _ref.attrs.mdl;
    return m("button[type='button'].hamburger.hamburger--emphatic.js-hamburger", {
      "class": mdl.status.sidebar ? "is-active" : "",
      onclick: function onclick(e) {
        return mdl.status.sidebar = !mdl.status.sidebar;
      }
    }, m("span.hamburger-box", m("span.hamburger-inner")));
  }
};
exports.Hamburger = Hamburger;
});

;require.register("components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hamburger = require("./hamburger.js");

Object.keys(_hamburger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hamburger[key];
    }
  });
});

var _sidebar = require("./sidebar.js");

Object.keys(_sidebar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sidebar[key];
    }
  });
});

var _layout = require("./layout.js");

Object.keys(_layout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _layout[key];
    }
  });
});
});

;require.register("components/layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _components = require("components");

var _animations = require("styles/animations");

var Header = {
  view: function view(_ref) {
    var mdl = _ref.attrs.mdl;
    return m(".header", m(_components.Hamburger, {
      mdl: mdl
    }));
  }
};

var Layout = function Layout() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl,
          children = _ref2.children;
      return m(".", [m(Header, {
        mdl: mdl
      }), children, mdl.status.sidebar && m(_components.SideBar, {
        oncreate: (0, _animations.animateCSS)("slideInRight"),
        mdl: mdl
      })]);
    }
  };
};

exports.Layout = Layout;
});

;require.register("components/loader.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var loader = m(".holder", [m(".preloader", [m("div"), m("div"), m("div"), m("div"), m("div"), m("div"), m("div")])]);
var _default = loader;
exports["default"] = _default;
});

;require.register("components/sidebar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideBar = void 0;

var _animations = require("styles/animations");

var SideBar = function SideBar() {
  var routeName = function routeName(route) {
    return route.split("/")[1].toUpperCase();
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m("ul.sidebar", {
        oncreate: (0, _animations.AnimateSideBar)("slideInLeft")
      }, mdl.routes.filter(function (r) {
        return r !== m.route.get();
      }).map(function (route) {
        return m(m.route.Link, {
          href: route,
          selector: "li"
        }, routeName(route));
      }));
    }
  };
};

exports.SideBar = SideBar;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _routes = _interopRequireDefault(require("./routes.js"));

var _model = _interopRequireDefault(require("./model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var root = document.body;
var winW = window.innerWidth;

if (module.hot) {
  module.hot.accept();
}

if ('development' == "development") {
  console.log("Looks like we are in development mode!");
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js").then(function (registration) {
        console.log("⚙️ SW registered: ", registration);
      })["catch"](function (registrationError) {
        console.log("🧟 SW registration failed: ", registrationError);
      });
    });
  }
} // set display profiles


var getProfile = function getProfile(w) {
  if (w < 668) return "phone";
  if (w < 920) return "tablet";
  return "desktop";
};

var checkWidth = function checkWidth(winW) {
  var w = window.innerWidth;

  if (winW !== w) {
    winW = w;
    var lastProfile = _model["default"].settings.profile;
    _model["default"].settings.profile = getProfile(w);
    if (lastProfile != _model["default"].settings.profile) m.redraw();
  }

  return requestAnimationFrame(checkWidth);
};

_model["default"].settings.profile = getProfile(winW);
checkWidth(winW);

if (sessionStorage.getItem("user")) {
  _model["default"].user = JSON.parse(sessionStorage.getItem("user"));
}

m.route(root, "/home", (0, _routes["default"])(_model["default"]));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  require("./index.js");
});
});

;require.register("model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var model = {
  state: {
    isLoading: false,
    loadingProgress: {
      max: 0,
      value: 0
    },
    isLoggedIn: function isLoggedIn() {
      return sessionStorage.getItem("token");
    }
  },
  routes: ["/home", "/portfolio", "/snippets", "/resume"],
  status: {
    sidebar: false
  },
  settings: {},
  slug: ""
};
var _default = model;
exports["default"] = _default;
});

;require.register("pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var Home = function Home() {
  return {
    view: function view() {
      return m(".page", [m("section.pic", m("img.profile-pic", {
        src: "pic"
      })), m("br"), m(".row", m("section.intro", [m("code.intro-text", "I am a Front-End web developer with 3 + years industry experience  building a variety of different applications and using a multitude of different frameworks and languages. "), m("br"), m("code.intro-text", "After serving as a paratrooper in the IDF I spent the next decade in Academia studying the effects of changes in environment on Human Performance, from pregancy to sports-injuries to space-flight."), m("br"), m("code.intro-text", ["My background in programming started at a 3 month boot-camp at the Iron Yard in Houston (since closed) supplemented with various online courses ", m("a.intro-text", {
        href: "https://online-learning.harvard.edu/course/cs50-introduction-computer-science",
        target: "_blank"
      }, "from the Harvard CS50 course"), " to ", m("a.intro-text", {
        href: "https://www.youtube.com/watch?v=I8LbkfSSR58",
        target: "_blank"
      }, "Bartosz Milewski's Category Theory,"), " as well as working through An Introduction to Functional Programming Through Lambda Calculus,", m("a.intro-text", {
        href: "https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript",
        target: "_blank"
      }, " and Brian Lonsdorf's Professor Frisbies Egghead Course on FP in JS,"), m("a.intro-text", {
        href: "https://github.com/boazblake?tab=repositories",
        target: "_blank"
      }, " and lots of time spent on personal projects,"), "and on-the-job training (Agile, SCRUM). "]), m("br"), m("code.intro-text", "My current personal interests lie in the nexus of true object oriented programming - as per Alan Kay, and functional programming in JavaScript. I am also a fan of Douglas Crockford and Kyle Simpson’s philosophy of JavaScripts behavior delegation / Objects linked to other Objects and I favour composition over hierarchy.")]))]);
    }
  };
};

exports.Home = Home;
});

;require.register("pages/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require("./home");

Object.keys(_home).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _home[key];
    }
  });
});

var _portfolio = require("./portfolio");

Object.keys(_portfolio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _portfolio[key];
    }
  });
});

var _snippets = require("./snippets");

Object.keys(_snippets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _snippets[key];
    }
  });
});

var _resume = require("./resume");

Object.keys(_resume).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _resume[key];
    }
  });
});
});

;require.register("pages/portfolio.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Portfolio = void 0;

var Portfolio = function Portfolio() {
  return {
    view: function view() {
      return m(".page", "PORTFOLIO");
    }
  };
};

exports.Portfolio = Portfolio;
});

;require.register("pages/resume.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resume = void 0;

var Resume = function Resume() {
  return {
    view: function view() {
      return m(".page", "RESUME");
    }
  };
};

exports.Resume = Resume;
});

;require.register("pages/snippets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snippets = void 0;

var Snippets = function Snippets() {
  return {
    view: function view() {
      return m(".page", "SNIPPETS");
    }
  };
};

exports.Snippets = Snippets;
});

;require.register("routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = require("components");

var _animations = require("styles/animations");

var _pages = require("pages");

var _Utils = require("Utils");

var routes = function routes(mdl) {
  return {
    "/home": {
      onmatch: function onmatch(_, b) {
        mdl.slug = b;
        mdl.status.sidebar = false;
      },
      render: function render() {
        return m(_components.Layout, {
          mdl: mdl
        }, m(_pages.Home, {
          oncreate: (0, _animations.animatePageCSS)("slideInLeft"),
          onbeforeremove: (0, _animations.animatePageCSS)("slideOutRight"),
          mdl: mdl
        }));
      }
    },
    "/portfolio": {
      onmatch: function onmatch(_, b) {
        mdl.slug = b;
        mdl.status.sidebar = false;
      },
      render: function render() {
        return m(_components.Layout, {
          mdl: mdl
        }, m(_pages.Portfolio, {
          oncreate: (0, _animations.animatePageCSS)("slideInLeft"),
          onbeforeremove: (0, _animations.animatePageCSS)("slideOutRight"),
          mdl: mdl
        }));
      }
    },
    "/resume": {
      onmatch: function onmatch(_, b) {
        mdl.slug = b;
        mdl.status.sidebar = false;
      },
      render: function render() {
        return m(_components.Layout, {
          mdl: mdl
        }, m(_pages.Resume, {
          oncreate: (0, _animations.animatePageCSS)("slideInLeft"),
          onbeforeremove: (0, _animations.animatePageCSS)("slideOutRight"),
          mdl: mdl
        }));
      }
    },
    "/snippets": {
      onmatch: function onmatch(_, b) {
        mdl.slug = b;
        mdl.status.sidebar = false;
      },
      render: function render() {
        return m(_components.Layout, {
          mdl: mdl
        }, m(_pages.Snippets, {
          oncreate: (0, _animations.animatePageCSS)("slideInLeft"),
          onbeforeremove: (0, _animations.animatePageCSS)("slideOutRight"),
          mdl: mdl
        }));
      }
    }
  };
};

var _default = routes;
exports["default"] = _default;
});

;require.register("styles/animations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimateSideBar = exports.SlideChildrenInRight = exports.animateCSS = exports.animatePageCSS = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var animatePageCSS = function animatePageCSS(animation) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "animate__";
  return function (_ref) {
    var dom = _ref.dom;
    return new Promise(function (resolve) {
      var cs = _toConsumableArray(dom.classList).filter(function (c) {
        return !c.includes("animate__");
      });

      dom.classList = cs;
      dom.classList.add("".concat(prefix, "animated"), "".concat(prefix).concat(animation));
      dom.style.position = "absolute";
      dom.style.top = -19;
      dom.style.width = "100%";
      setTimeout(function () {
        dom.style.position = "";
        dom.style.top = "";
        resolve();
      }, 1000);
    });
  };
};

exports.animatePageCSS = animatePageCSS;

var animateCSS = function animateCSS(animation) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "animate__";
  return function (_ref2) {
    var dom = _ref2.dom;
    return new Promise(function (resolve) {
      var cs = _toConsumableArray(dom.classList).filter(function (c) {
        return !c.includes("animate__");
      });

      dom.classList = cs;
      dom.classList.add("".concat(prefix, "animated"), "".concat(prefix).concat(animation));
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  };
};

exports.animateCSS = animateCSS;

var SlideChildrenInRight = function SlideChildrenInRight(animation) {
  return function (_ref3) {
    var dom = _ref3.dom;

    var children = _toConsumableArray(dom.children);

    return children.map(function (child, idx) {
      child.style.opacity = 0;
      setTimeout(function () {
        child.style.opacity = 1;
        animateCSS(animation)({
          dom: child
        });
      }, idx * 100);
    });
  };
};

exports.SlideChildrenInRight = SlideChildrenInRight;

var AnimateSideBar = function AnimateSideBar(animation) {
  return function (_ref4) {
    var dom = _ref4.dom;
    return SlideChildrenInRight(animation)({
      dom: dom
    });
  };
};

exports.AnimateSideBar = AnimateSideBar;
});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");


});})();require('___globals___');


//# sourceMappingURL=app.js.map