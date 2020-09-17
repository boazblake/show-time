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
require.register("App.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./Routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toRoutes = function toRoutes(mdl) {
  return function (acc, route) {
    acc[route.route] = {
      onmatch: function onmatch(args, path, fullroute) {
        if (route.group.includes("authenticated") && !mdl.State.isAuth()) {
          m.route.set(m.route.get());
        }

        mdl.State.route = route;
        route.onmatch(mdl, args, path, fullroute);
      },
      render: function render() {
        return route.component(mdl);
      }
    };
    return acc;
  };
};

var App = function App(mdl) {
  return _index.default.reduce(toRoutes(mdl), {});
};

var _default = App;
exports.default = _default;
});

;require.register("Components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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

;require.register("Components/layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _core = require("@ionic/core");

var _index = _interopRequireDefault(require("../Routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showSettings = function showSettings(mdl) {
  var showAction = function showAction(e) {
    var actionSheet = _core.actionSheetController.create({
      header: "Albums",
      buttons: [{
        text: "Delete",
        role: "destructive"
      }, {
        text: "Share"
      }, {
        text: "Play"
      }, {
        text: "Favorite"
      }, {
        text: "Cancel",
        role: "cancel"
      }]
    }).then(function (x) {
      console.log(x);
      x.present();
    });
  };

  showAction();
};

var Menu = function Menu() {
  return {
    view: function view() {
      return m("ion-menu", {
        "content-id": "main-content"
      }, [m("ion-header", m("ion-toolbar", {
        color: "primary"
      }, m("ion-title", "Menu"))), m("ion-content", m("ion-list", [m("ion-list-header", " Navigate "), m("ion-menu-toggle", {
        "auto-hide": "false"
      }, m("ion-item", {
        button: ""
      }, [m("ion-icon", {
        slot: "start",
        name: "home"
      }), m("ion-label", " Home ")]))]))]);
    }
  };
};

var Toolbar = function Toolbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m("ion-header", m("ion-toolbar", [m("ion-title", m.route.get())]));
    }
  };
};

var Router = function Router() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m("ion-router", _index.default.map(function (r) {
        console.log(r);
        return m("ion-route", {
          url: "/#!/".concat(r.name)
        });
      }));
    }
  };
};

var Footer = function Footer() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return m("ion-footer", m("ion-tab-bar", m("ion-tabs", [_index.default.map(function (r) {
        return m("ion-tab", {
          tab: "/#!/".concat(r.name)
        });
      }), m("ion-tab-bar", {
        slot: "bottom"
      }, [_index.default.map(function (r) {
        return m("ion-tab-button", {
          onclick: function onclick() {
            return m.route.set(r.route);
          },
          tab: "/#!/".concat(r.name)
        }, [m("ion-label", r.name), m("ion-icon", {
          name: r.icon
        })]);
      }), m("ion-tab-button", {
        onclick: function onclick() {
          return showSettings(mdl);
        }
      }, [m("ion-label", "Settings"), m("ion-icon", {
        name: "ellipsis-vertical-outline"
      })])])])));
    }
  };
};

var Layout = function Layout() {
  return {
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl,
          children = _ref4.children;
      return m("ion-app", [m(Toolbar, {
        mdl: mdl
      }), m("ion-contents", children), m(Footer, {
        mdl: mdl
      })]);
    }
  };
};

exports.Layout = Layout;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var State = {
  isAuth: Stream(false),
  route: ""
};
var Model = {
  State: State
};
var _default = Model;
exports.default = _default;
});

;require.register("Pages/alarm.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alarm = void 0;

var Alarm = function Alarm() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".alarm", m("ion-list", [m("ion-item", m("ion-input", {
        placeholder: "Title"
      })), m("ion-item", m("ion-input", {
        placeholder: "Location"
      })), m("ion-item-divider"), m("ion-item", [m("ion-label", "Start Date"), m("ion-datetime", {
        value: "1990-02-19",
        placeholder: "Select Date"
      })]), m("ion-item", [m("ion-label", "Start Time"), m("ion-datetime", {
        "display-format": "h:mm A",
        "picker-format": "h:mm A",
        value: "1990-02-19T07:43Z"
      })]), m("ion-item", [m("ion-label", "Ends"), m("ion-datetime", {
        value: "1990-02-20",
        placeholder: "Select Date"
      })]), m("ion-item", [m("ion-label", "Repeat"), m("ion-datetime", {
        placeholder: "Never",
        disabled: false
      })]), m("ion-item", [m("ion-label", "Travel Time"), m("ion-datetime", {
        placeholder: "None",
        disabled: false
      })]), m("ion-item-divider"), m("ion-item", [m("ion-label", "Alert"), m("ion-datetime", {
        placeholder: "None",
        disabled: false
      })])]));
    }
  };
};

exports.Alarm = Alarm;
});

;require.register("Pages/camera-page.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraPage = void 0;

var _core = require("@ionic/core");

console.log(_core.Camera);

var CameraPage = function CameraPage() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".camera", {
        onclick: function onclick(e) {}
      }, "camera");
    }
  };
};

exports.CameraPage = CameraPage;
});

;require.register("Pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var Home = function Home() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".home", "HOME");
    }
  };
};

exports.Home = Home;
});

;require.register("Pages/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require("./home.js");

Object.keys(_home).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _home[key];
    }
  });
});

var _alarm = require("./alarm.js");

Object.keys(_alarm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _alarm[key];
    }
  });
});

var _cameraPage = require("./camera-page.js");

Object.keys(_cameraPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cameraPage[key];
    }
  });
});
});

;require.register("Pages/tab.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = void 0;

var Tab = function Tab() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          name = _ref$attrs.name,
          mdl = _ref$attrs.mdl;
      return m(".tab", name);
    }
  };
};

exports.Tab = Tab;
});

;require.register("Routes/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mainRoutes = _interopRequireDefault(require("./main-routes.js"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = (0, _ramda.flatten)([_mainRoutes.default]);
var _default = Routes;
exports.default = _default;
});

;require.register("Routes/main-routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pages = require("Pages");

var _Components = require("Components");

var Routes = [{
  id: "home",
  name: "home",
  icon: "home",
  route: "/home",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute) {},
  component: function component(mdl) {
    return m(_Components.Layout, {
      mdl: mdl
    }, m(_Pages.Home, {
      mdl: mdl
    }));
  }
}, {
  id: "alarm",
  name: "alarm",
  icon: "alarm-outline",
  route: "/alarm",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute) {},
  component: function component(mdl) {
    return m(_Components.Layout, {
      mdl: mdl
    }, m(_Pages.Alarm, {
      mdl: mdl
    }));
  }
}, {
  id: "camera",
  name: "camera",
  icon: "camera-outline",
  route: "/camera",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute) {},
  component: function component(mdl) {
    return m(_Components.Layout, {
      mdl: mdl
    }, m(_Pages.CameraPage, {
      mdl: mdl
    }));
  }
}];
var _default = Routes;
exports.default = _default;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _App = _interopRequireDefault(require("./App.js"));

var _Models = _interopRequireDefault(require("Models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.body;

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
      }).catch(function (registrationError) {
        console.log("🧟 SW registration failed: ", registrationError);
      });
    });
  }
}

console.log((0, _App.default)(_Models.default));
m.route(root, "/home", (0, _App.default)(_Models.default));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  return require("./index.js");
});
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map