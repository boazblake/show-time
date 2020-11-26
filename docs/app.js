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

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toRoutes = mdl => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.State.isAuth()) {
        m.route.set(m.route.get());
      }

      mdl.State.route = route;
      route.onmatch(mdl, args, path, fullroute);
    },
    render: () => route.component(mdl)
  };
  return acc;
};

var App = mdl => _index.default.reduce(toRoutes(mdl), {});

var _default = App;
exports.default = _default;
});

;require.register("Http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _secrets = require("./secrets.js");

var _data = _interopRequireDefault(require("data.task"));

var _Models = _interopRequireDefault(require("./Models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function onProgress(e) {
  if (e.lengthComputable) {
    // console.log("onprogress", e.total, e.loaded)
    _Models.default.state.loadingProgress.max(e.total);

    _Models.default.state.loadingProgress.value(e.loaded);

    m.redraw();
  }
}

function onLoad() {
  return false;
}

function onLoadStart() {
  _Models.default.state.isLoading(true);

  return false;
}

function onLoadEnd() {
  _Models.default.state.isLoading(false);

  _Models.default.state.loadingProgress.max(0);

  _Models.default.state.loadingProgress.value(0);

  return false;
}

var xhrProgress = {
  config: xhr => {
    // console.log(xhr)
    xhr.onprogress = onProgress;
    xhr.onload = onLoad;
    xhr.onloadstart = onLoadStart;
    xhr.onloadend = onLoadEnd;
  }
};

var _http = mdl => {
  mdl.state.isLoading(!mdl.state.isLoading);
  return m.request;
};

var headers = (url, args) => {
  // let tmdbBearerToken = url.includes("themoviedb") && tmdbAuth
  var contentType = {
    "Content-Type": "application/json;charset=utf-8"
  } && ["Get", "POST", "PUT", "PATCH"].includes(args.method);
  return {
    headers: _objectSpread({}, contentType)
  };
};

var _task = url => args => new _data.default((rej, res) => _http(_Models.default)(url, _objectSpread(_objectSpread(_objectSpread({}, args), headers(url, args)), xhrProgress)).then(res, rej));

var getTask = function getTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_objectSpread(_objectSpread({}, args), {}, {
    method: "GET"
  }));
};

var postTask = function postTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_objectSpread(_objectSpread({}, args), {}, {
    method: "POST"
  }));
};

var putTask = function putTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // console.log(args)
  return _task(url)(_objectSpread(_objectSpread({}, args), {}, {
    method: "PUT"
  }));
};

var deleteTask = function deleteTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_objectSpread(_objectSpread({}, args), {}, {
    method: "DELETE"
  }));
};

var backEndlessBaseUrl = "https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/";

var tvMazeSearchUrl = baseUrl => query => "".concat(baseUrl, "/search/shows?q=").concat(query);

var tvMazeShowByIdUrl = baseUrl => id => "".concat(baseUrl, "/shows/").concat(id);

var backendlessUrl = url => backEndlessBaseUrl + url;

var searchUrl = query => tvMazeSearchUrl(_secrets.tvMazeBaseUrl)(query);

var tvMazeDetailsUrl = id => tvMazeShowByIdUrl(_secrets.tvMazeBaseUrl)(id);

var http = {
  getTask,
  postTask,
  putTask,
  deleteTask,
  searchUrl,
  tvMazeDetailsUrl,
  backendlessUrl
};
var _default = http;
exports.default = _default;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  isAuth: Stream(false),
  route: "",
  paginate: {
    page: Stream(1),
    total_pages: Stream(0),
    total_results: Stream(0)
  },
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(null),
    value: Stream(null)
  },
  searchItem: {
    showMenu: Stream(false)
  },
  details: {
    selected: Stream(null)
  },
  currentList: Stream("Watching")
};
var data = {
  shows: Stream([]),
  details: Stream(null)
};
var errors = {
  details: Stream(null),
  search: Stream(null),
  user: Stream(null)
};
var user = {
  shows: Stream([]),
  lists: Stream(["Watching", "Wishlist"])
};
var Model = {
  Routes: _routes.default,
  state,
  user,
  data,
  errors
};
var _default = Model;
exports.default = _default;
});

;require.register("components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = require("./layout.js");

Object.keys(_layout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _layout[key]) return;
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

var _core = require("@ionic/core");

var _index = _interopRequireDefault(require("../routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showSettings = mdl => {
  var showAction = e => {
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
    }).then(x => {
      console.log(x);
      x.present();
    });
  };

  showAction();
};

var Menu = () => {
  return {
    view: () => m("ion-menu", {
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
    }), m("ion-label", " Home ")]))]))])
  };
};

var Toolbar = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return m("ion-header", m("ion-toolbar", [m("ion-title", m.route.get())]));
    }
  };
};

var Router = () => {
  return {
    view: (_ref2) => {
      var {
        attrs: {
          mdl
        }
      } = _ref2;
      return m("ion-router", _index.default.map(r => {
        console.log(r);
        return m("ion-route", {
          url: "/#!/".concat(r.name)
        });
      }));
    }
  };
};

var Footer = () => {
  return {
    view: (_ref3) => {
      var {
        attrs: {
          mdl
        }
      } = _ref3;
      return m("ion-footer", m("ion-tab-bar", m("ion-tabs", [_index.default.map(r => m("ion-tab", {
        tab: "/#!/".concat(r.name)
      })), m("ion-tab-bar", {
        slot: "bottom"
      }, [_index.default.map(r => m("ion-tab-button", {
        onclick: () => m.route.set(r.route),
        tab: "/#!/".concat(r.name)
      }, [m("ion-label", r.name), m("ion-icon", {
        name: r.icon
      })])), m("ion-tab-button", {
        onclick: () => showSettings(mdl)
      }, [m("ion-label", "Settings"), m("ion-icon", {
        name: "ellipsis-vertical-outline"
      })])])])));
    }
  };
};

var Layout = () => {
  return {
    view: (_ref4) => {
      var {
        attrs: {
          mdl
        },
        children
      } = _ref4;
      return m("ion-app", [m(Toolbar, {
        mdl
      }), m("ion-contents", children), m(Footer, {
        mdl
      })]);
    }
  };
};

exports.Layout = Layout;
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
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").then(registration => {
        console.log("⚙️ SW registered: ", registration);
      }).catch(registrationError => {
        console.log("🧟 SW registration failed: ", registrationError);
      });
    });
  }
}

m.route(root, "/home", (0, _App.default)(_Models.default));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", () => require("./index.js"));
});

;require.register("pages/alarm.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alarm = void 0;

var Alarm = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
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

;require.register("pages/camera-page.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraPage = void 0;

var _core = require("@capacitor/core");

var initCamera = () => {
  var state = {
    data: null,
    error: null
  };

  var onSuccess = image => {
    console.log('image', image);
    state.data = image;
  };

  var onError = e => {
    state.error = e;
  };

  _core.Plugins.Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: _core.CameraResultType.Uri
  }).then(onSuccess, onError);
};

var CameraPage = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return m(".camera", m('ion-button', {
        onclick: initCamera
      }, 'Camera'));
    }
  };
};

exports.CameraPage = CameraPage;
});

;require.register("pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _core = require("@capacitor/core");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  Modals
} = _core.Plugins;

function showAlert() {
  return _showAlert.apply(this, arguments);
}

function _showAlert() {
  _showAlert = _asyncToGenerator(function* () {
    var alertRet = yield Modals.alert({
      title: 'Stop',
      message: 'this is an error'
    });
  });
  return _showAlert.apply(this, arguments);
}

function showConfirm() {
  return _showConfirm.apply(this, arguments);
}

function _showConfirm() {
  _showConfirm = _asyncToGenerator(function* () {
    var confirmRet = yield Modals.confirm({
      title: 'Confirm',
      message: 'Are you sure you\'d like to press the red button?'
    });
    console.log('Confirm ret', confirmRet);
  });
  return _showConfirm.apply(this, arguments);
}

function showPrompt() {
  return _showPrompt.apply(this, arguments);
}

function _showPrompt() {
  _showPrompt = _asyncToGenerator(function* () {
    var promptRet = yield Modals.prompt({
      title: 'Hello',
      message: 'What\'s your name?'
    });
    console.log('Prompt ret', promptRet);
  });
  return _showPrompt.apply(this, arguments);
}

function showActions(_x) {
  return _showActions.apply(this, arguments);
}

function _showActions() {
  _showActions = _asyncToGenerator(function* (state) {
    var promptRet = yield Modals.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [{
        title: 'Upload'
      }, {
        title: 'Share'
      }, {
        title: 'Remove',
        style: _core.ActionSheetOptionStyle.Destructive
      }]
    });

    switch (promptRet.index) {
      case 0:
        showConfirm();
        break;

      case 1:
        showPrompt();
        break;

      case 2:
        showAlert();

      default:
        break;
    }
  });
  return _showActions.apply(this, arguments);
}

var Home = () => {
  var state = {};
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return m(".home", m('ion-button', {
        onclick: e => showActions(state)
      }, "HOME"));
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

var _home = require("./home.js");

Object.keys(_home).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _home[key]) return;
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
  if (key in exports && exports[key] === _alarm[key]) return;
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
  if (key in exports && exports[key] === _cameraPage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cameraPage[key];
    }
  });
});
});

;require.register("pages/tab.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = void 0;

var Tab = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          name,
          mdl
        }
      } = _ref;
      return m(".tab", name);
    }
  };
};

exports.Tab = Tab;
});

;require.register("routes/index.js", function(exports, require, module) {
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

;require.register("routes/main-routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pages = require("pages");

var _components = require("components");

var Routes = [{
  id: "home",
  name: "home",
  icon: "home",
  route: "/home",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: (mdl, args, path, fullroute) => {},
  component: mdl => m(_components.Layout, {
    mdl
  }, m(_pages.Home, {
    mdl
  }))
}, {
  id: "alarm",
  name: "alarm",
  icon: "alarm-outline",
  route: "/alarm",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: (mdl, args, path, fullroute) => {},
  component: mdl => m(_components.Layout, {
    mdl
  }, m(_pages.Alarm, {
    mdl
  }))
}, {
  id: "camera",
  name: "camera",
  icon: "camera-outline",
  route: "/camera",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: (mdl, args, path, fullroute) => {},
  component: mdl => m(_components.Layout, {
    mdl
  }, m(_pages.CameraPage, {
    mdl
  }))
}];
var _default = Routes;
exports.default = _default;
});

;require.register("secrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prismaUrl = exports.tvMazeBaseUrl = exports.tvMazeApiKey = exports.tmdbBaseUrl = exports.tmdbAuth = exports.tmdbApiKey = void 0;
var tmdbApiKey = "1e4d78ab60660282c63379725fc9b111";
exports.tmdbApiKey = tmdbApiKey;
var tmdbAuth = {
  Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTRkNzhhYjYwNjYwMjgyYzYzMzc5NzI1ZmM5YjExMSIsInN1YiI6IjVkYmNjMjBjOTdhNGU2MDAxNTdjNjkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgL91o4VHyQo4cm3KLx6nVICyrn8E8pXDC1zMdlDFsU"
};
exports.tmdbAuth = tmdbAuth;
var tmdbBaseUrl = "https://api.themoviedb.org/3";
exports.tmdbBaseUrl = tmdbBaseUrl;
var tvMazeApiKey = "F4-A2-dEzYi0oXvzbNWON3_nrnPSt9Yv";
exports.tvMazeApiKey = tvMazeApiKey;
var tvMazeBaseUrl = "https://api.tvmaze.com";
exports.tvMazeBaseUrl = tvMazeBaseUrl;
var prismaUrl = "https://eu1.prisma.sh/boaz-blake-8951e1/whensMyShow/dev";
exports.prismaUrl = prismaUrl;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map