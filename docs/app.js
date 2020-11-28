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

var toRoutes = mdl => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
        m.route.set(m.route.get());
      }

      mdl.state.route = route;
      route.onmatch(mdl, args, path, fullroute);
    },
    render: () => route.component(mdl)
  };
  return acc;
};

var App = mdl => mdl.Routes.reduce(toRoutes(mdl), {});

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
  currentList: Stream("Watching"),
  domList: null,
  mode: 'light',
  toast: {}
};
var toast = {
  show: Stream(false),
  duration: Stream(2000),
  status: Stream(null),
  msg: Stream(null)
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
  toast,
  Routes: _routes.default,
  state,
  user,
  data,
  errors
};
var _default = Model;
exports.default = _default;
});

;require.register("components/action-sheet.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSettings = void 0;

var _core = require("@ionic/core");

var showSettings = mdl => {
  var showAction = () => {
    _core.actionSheetController.create({
      header: "Settings",
      buttons: [{
        handler: () => {
          mdl.state.mode = mdl.state.mode == 'light' ? 'dark' : 'light';
          document.body.classList.toggle('dark');
          window.matchMedia('(prefers-color-scheme: dark)');
        },
        text: mdl.state.mode == 'light' ? 'Enter Dark Mode' : 'Enter Light Mode'
      }]
    }).then(x => x.present());
  };

  showAction();
};

exports.showSettings = showSettings;
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

var _modal = require("./modal.js");

Object.keys(_modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _modal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modal[key];
    }
  });
});

var _toast = require("./toast.js");

Object.keys(_toast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _toast[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toast[key];
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

var _index = _interopRequireDefault(require("../routes/index.js"));

var _Http = _interopRequireDefault(require("../Http.js"));

var _fns = require("../pages/fns.js");

var _actionSheet = require("./action-sheet");

var _toast = _interopRequireDefault(require("./toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchShows = mdl => (0, _fns.searchShowsTask)(mdl)(_Http.default).fork((0, _fns.onError)(mdl)("search"), mdl.data.shows);

var HomeToolBar = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return m("ion-segment", {
        "value": mdl.state.currentList()
      }, mdl.user.lists().map(list => m("ion-segment-button", {
        onclick: () => {
          mdl.state.currentList(list);
          mdl.state.listDom.closeSlidingItems();
        },
        "value": list
      }, list)));
    }
  };
};

var SearchToolBar = () => {
  return {
    onremove: (_ref2) => {
      var {
        attrs: {
          mdl
        }
      } = _ref2;
      return mdl.state.query(null);
    },
    view: (_ref3) => {
      var {
        attrs: {
          mdl
        }
      } = _ref3;
      return m('ion-searchbar', {
        style: {
          paddingTop: '12px'
        },
        animated: true,
        'show-cancel-button': "focus",
        placeholder: 'Search for a show',
        value: mdl.state.query(),
        oninput: e => mdl.state.query(e.target.value),
        onkeyup: () => searchShows(mdl)
      });
    }
  };
};

var Toolbar = () => {
  return {
    view: (_ref4) => {
      var {
        attrs: {
          mdl
        }
      } = _ref4;
      return m("ion-header", m("ion-toolbar", mdl.state.route.name == 'home' && m(HomeToolBar, {
        mdl
      }), mdl.state.route.name == 'search' && m(SearchToolBar, {
        mdl
      })));
    }
  };
};

var Footer = () => {
  return {
    view: (_ref5) => {
      var {
        attrs: {
          mdl
        }
      } = _ref5;
      return m("ion-footer", m("ion-tab-bar", m("ion-tabs", [_index.default.map(r => m("ion-tab", {
        tab: "".concat(r.route)
      })), m("ion-tab-bar", {
        slot: "bottom"
      }, [_index.default.map(r => m("ion-tab-button", {
        onclick: () => m.route.set(r.route),
        tab: "".concat(r.route)
      }, [m("ion-label", r.name), m("ion-icon", {
        name: r.icon
      })])), m("ion-tab-button", {
        onclick: () => (0, _actionSheet.showSettings)(mdl)
      }, [m("ion-label", 'settings'), m("ion-icon", {
        name: 'ellipsis-vertical-outline'
      })])])])));
    }
  };
};

var Layout = () => {
  return {
    view: (_ref6) => {
      var {
        attrs: {
          mdl
        },
        children
      } = _ref6;
      return m("ion-app", [m(Toolbar, {
        mdl
      }), m("ion-content", children), m(Footer, {
        mdl
      }), mdl.toast.show() && m(_toast.default, {
        mdl
      })]);
    }
  };
};

exports.Layout = Layout;
});

;require.register("components/modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _core = require("@ionic/core");

var _Http = _interopRequireDefault(require("../Http"));

var _fns = require("../pages/fns");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  show: '',
  modal: null,
  status: null
};

var updateUserShows = mdl => dto => mdl.user.shows((0, _ramda.sortBy)((0, _ramda.prop)('name'), mdl.user.shows().filter(show => show.tvmazeId !== dto.tvmazeId).concat([dto])));

var dismissModal = mdl => mdl.state.details.selected(null);

var onError = mdl => err => {
  var msg = JSON.parse(JSON.stringify(err)).response.message;
  state.error = err;
  (0, _fns.makeToast)({
    mdl,
    status: false,
    msg
  });
};

var onSuccess = show => {
  state.show = show;
  state.error = null;
};

var addUserShows = mdl => (show, list) => (0, _fns.addUserShowsTask)(mdl)(_Http.default)(show)(list).fork(onError(mdl), shows => {
  mdl.user.shows(shows);
  dismissModal(mdl);
});

var updateShowDetails = mdl => update => (0, _fns.updateShowDetailsTask)(mdl)(_Http.default)(update).chain(_ => (0, _fns.getShowDetailsTask)(_Http.default)(mdl.state.details.selected().objectId)).fork(onError(mdl), dto => {
  updateUserShows(mdl)(dto);
  onSuccess(dto);
  (0, _fns.makeToast)({
    mdl,
    status: true,
    msg: 'Show successfully updated'
  });
});

var getShowDetails = mdl => mdl.state.details.selected().objectId ? (0, _fns.getShowDetailsTask)(_Http.default)(mdl.state.details.selected().objectId).fork(onError(mdl), onSuccess) : (0, _fns.getShowTvMazeDetailsTask)(_Http.default)(mdl.state.details.selected()).fork(onError(mdl), onSuccess);

var Episode = () => {
  var data;

  var getEpisode = mdl => episode => (0, _fns.getEpisodeTask)(_Http.default)(episode).fork(onError(mdl), dto => data = dto);

  return {
    oninit: (_ref) => {
      var {
        attrs: {
          mdl,
          ep: {
            href
          }
        }
      } = _ref;
      return getEpisode(mdl)(href);
    },
    onremove: () => data = null,
    view: (_ref2) => {
      var {
        attrs: {
          ep: {
            label
          }
        }
      } = _ref2;
      return data && m(".", [m('h3', label), m("ion-img", {
        src: data.image
      }), m('ion-item', m('ion-label', data.name), m('p', data.airdate), m('ion-label', 'Season - Ep:'), m('p', "".concat(data.season, " - ").concat(data.number)))]);
    }
  };
};

var Modal = () => {
  return {
    oninit: (_ref3) => {
      var {
        attrs: {
          mdl
        }
      } = _ref3;
      return getShowDetails(mdl, state);
    },
    oncreate: (_ref4) => {
      var {
        dom
      } = _ref4;

      _core.modalController.create({
        component: dom,
        backdropDismiss: false
      }).then(modal => {
        state.modal = modal;
        state.modal.present();
      });
    },
    onremove: (_ref5) => {
      var {
        attrs: {
          mdl
        }
      } = _ref5;
      return state.modal && state.modal.dismiss().then(() => {
        state.modal = null;
        state.show = null;
        dismissModal(mdl);
      });
    },
    onbeforeremove: (_ref6) => {
      var {
        attrs: {
          mdl
        }
      } = _ref6;
      return state.modal.dismiss().then(() => {
        state.modal = null;
        state.show = null;
        dismissModal(mdl);
      });
    },
    view: (_ref7) => {
      var {
        attrs: {
          mdl
        }
      } = _ref7;
      return m('ion-modal-view', state.show && [m("ion-header", m("ion-toolbar", m("ion-title", "".concat(state.show.name, " - ").concat(state.show.premiered.split('-')[0], " | ").concat(state.show.network || state.show.webChannel)), m("ion-buttons", {
        slot: "primary"
      }, m("ion-button", {
        onclick: e => dismissModal(mdl)
      }, m("ion-icon", {
        slot: "icon-only",
        name: "close"
      })))), !state.show.listStatus && m('ion-item', m('ion-label', 'Add to: '), m("ion-buttons", mdl.user.lists().map(list => m('ion-button.ion-activatable ripple-parent', {
        onclick: e => addUserShows(mdl)(state.show, list)
      }, m('ion-ripple'), list))))), m('ion-content', {
        padding: true
      }, m('ion-grid', m('ion-row', m('ion-col', m('ion-img', {
        src: state.show.image
      })), m('ion-col', m.trust(state.show.summary))), m('ion-row', m('ion-col', m('pre', "status: ".concat(state.show.status))), m('ion-col', state.show.listStatus && m('pre', "list status: ".concat(state.show.listStatus)))), state.show.listStatus && m('ion-row', m('ion-textarea', {
        placeholder: 'Notes',
        value: state.show.notes,
        onkeyup: e => state.show.notes = e.target.value
      }), m('ion-button', {
        onclick: () => updateShowDetails(mdl)({
          notes: state.show.notes
        })
      }, 'Save note'))), m('', m('h3', 'Episodes'), state.show.links.map(ep => m(Episode, {
        mdl,
        ep
      })) // m('', JSON.stringify(state.show) ) ,
      ))]);
    }
  };
};

exports.Modal = Modal;
});

;require.register("components/toast.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@ionic/core");

var Toast = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return m('ion-toast', {
        oncreate: (_ref2) => {
          var {
            dom
          } = _ref2;

          _core.toastController.create({
            component: dom,
            message: mdl.toast.msg(),
            duration: mdl.toast.duration(),
            showCloseButton: true,
            animated: true,
            color: mdl.toast.status() ? 'success' : 'danger'
          }).then(toast => toast.present());
        }
      });
    }
  };
};

var _default = Toast;
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
m.route.set('/home');
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

;require.register("pages/fns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEpisodeTask = exports.filterShowForUnselected = exports.filterShowsByListType = exports.getShowDetailsTask = exports.getShowTvMazeDetailsTask = exports.updateShowDetailsTask = exports.deleteShowTask = exports.updateUserShowsTask = exports.addUserShowsTask = exports.toDto = exports.showListSelection = exports.propIsDefined = exports.searchShowsTask = exports.getShows = exports.updateShowStatus = exports.onError = exports.toDbModel = exports.toSearchViewModel = exports.formatError = exports.makeToast = exports.log = void 0;

var _ramda = require("ramda");

var log = m => v => {
  console.log(m, v);
  return v;
};

exports.log = log;

var resetToast = mdl => {
  mdl.toast.show(false);
  mdl.toast.msg(null);
  mdl.toast.status(null);
};

var makeToast = (_ref) => {
  var {
    mdl,
    status,
    msg
  } = _ref;
  mdl.toast.show(true);
  mdl.toast.status(status);
  mdl.toast.msg(msg);
  setTimeout(() => resetToast(mdl), mdl.toast.duration());
};

exports.makeToast = makeToast;

var formatError = error => JSON.parse(JSON.stringify(error));

exports.formatError = formatError;

var getEpisodeLink = label => path => links => ({
  label,
  href: makeHttps((0, _ramda.view)((0, _ramda.lensPath)([path, "href"]), links))
});

var formatDetailsLinks = links => [getEpisodeLink('previous')("previousepisode")(links), getEpisodeLink('next')("nextepisode")(links)].filter(ep => !(0, _ramda.propEq)('href', undefined)(ep));

var formatEpisodeLinks = links => [getEpisodeLink('self')('self')(links)].filter(ep => !(0, _ramda.propEq)('href', undefined)(ep));

var toEpisodeViewModel = (_ref2) => {
  var {
    name,
    season,
    number,
    airdate,
    image,
    _links
  } = _ref2;
  return {
    name,
    season,
    number,
    airdate,
    image: image && (makeHttps(image.original) || makeHttps(image.medium)),
    links: formatEpisodeLinks(_links)
  };
};

var toDetailsViewModel = (_ref3) => {
  var {
    image,
    tvmazeId,
    objectId,
    listStatus,
    name,
    notes
  } = _ref3;
  return (_ref4) => {
    var {
      webChannel,
      status,
      network,
      genres,
      premiered,
      summary,
      _links
    } = _ref4;
    return {
      name,
      notes,
      genre: (0, _ramda.join)(" ", genres),
      premiered,
      summary,
      links: formatDetailsLinks(_links),
      image,
      tvmazeId,
      objectId,
      listStatus,
      webChannel: webChannel && webChannel.name,
      network: network && network.name,
      status
    };
  };
};

var makeHttps = url => url && url.replace("http", "https");

var toSearchViewModel = (_ref5) => {
  var {
    name,
    image,
    id
  } = _ref5;
  return {
    image: image && (makeHttps(image.original) || makeHttps(image.medium)),
    tvmazeId: id,
    name
  };
};

exports.toSearchViewModel = toSearchViewModel;

var toDbModel = (_ref6) => {
  var {
    listStatus,
    notes,
    name,
    tvmazeId,
    image,
    status
  } = _ref6;
  return {
    image,
    listStatus,
    notes,
    name,
    tvmazeId,
    status
  };
};

exports.toDbModel = toDbModel;

var onError = mdl => type => error => mdl.errors[type](error);

exports.onError = onError;

var rejectWithAttr = attr => value => (0, _ramda.reject)((0, _ramda.propEq)(attr, value));

var updateResults = result => show => {
  if (show) {
    return (0, _ramda.assoc)("objectId", show.objectId, (0, _ramda.set)((0, _ramda.lensProp)("listStatus"), (0, _ramda.prop)("listStatus", show), result));
  } else {
    return result;
  }
};

var updateShowStatus = shows => data => data.map(r => (0, _ramda.compose)(updateResults(r), (0, _ramda.find)((0, _ramda.propEq)("tvmazeId", r.tvmazeId)))(shows));

exports.updateShowStatus = updateShowStatus;

var getShows = http => http.getTask(http.backendlessUrl("prodshows?pagesize=100")).map((0, _ramda.sortBy)((0, _ramda.propEq)('name')));

exports.getShows = getShows;

var searchShowsTask = mdl => http => http.getTask(http.searchUrl(mdl.state.query())).map((0, _ramda.pluck)("show")).map((0, _ramda.map)(toSearchViewModel)).map(rejectWithAttr("image")(null)).map(updateShowStatus(mdl.user.shows()));

exports.searchShowsTask = searchShowsTask;

var itemSelected = mdl => result => (0, _ramda.equals)((0, _ramda.prop)("tvmazeId", result), mdl.state.searchItem.showMenu());

var propIsDefined = attr => (0, _ramda.compose)(_ramda.not, (0, _ramda.propEq)(attr, undefined));

exports.propIsDefined = propIsDefined;

var showListSelection = mdl => (0, _ramda.anyPass)([itemSelected(mdl), propIsDefined("objectId")]);

exports.showListSelection = showListSelection;

var updateListStatus = show => listType => (0, _ramda.over)((0, _ramda.lensProp)("listStatus"), () => listType, show);

var createBody = dto => ({
  body: toDbModel(dto)
});

var updateOrder = mdl => show => {
  show.order = (0, _ramda.filter)((0, _ramda.propEq)("listStatus", show.listStatus), mdl.user.shows()).length;
  return show;
};

var toDto = (mdl, show, listType) => (0, _ramda.compose)(createBody, updateOrder(mdl), updateListStatus(show))(listType);

exports.toDto = toDto;

var addUserShowsTask = mdl => http => show => list => http.postTask(http.backendlessUrl("prodshows"), toDto(mdl, show, list)).chain(_ => getShows(http)).map(mdl.user.shows);

exports.addUserShowsTask = addUserShowsTask;

var updateUserShowsTask = mdl => http => show => list => http.putTask(http.backendlessUrl("prodshows\\".concat(show.objectId)), toDto(mdl, show, list)).chain(_ => getShows(http));

exports.updateUserShowsTask = updateUserShowsTask;

var deleteShowTask = http => id => http.deleteTask(http.backendlessUrl("prodshows/".concat(id))).chain(_ => getShows(http));

exports.deleteShowTask = deleteShowTask;

var updateShowDetailsTask = mdl => http => dto => http.putTask(http.backendlessUrl("prodshows/".concat(mdl.state.details.selected().objectId)), {
  body: dto
}).chain((_ref7) => {
  var {
    objectId
  } = _ref7;
  return getShowDetailsTask(http)(objectId);
});

exports.updateShowDetailsTask = updateShowDetailsTask;

var getShowTvMazeDetailsTask = http => show => http.getTask(http.tvMazeDetailsUrl(show.tvmazeId)).map(toDetailsViewModel(show));

exports.getShowTvMazeDetailsTask = getShowTvMazeDetailsTask;

var findShowInDbTask = http => id => http.getTask(http.backendlessUrl("prodshows/".concat(id)));

var getShowDetailsTask = http => id => findShowInDbTask(http)(id).chain(getShowTvMazeDetailsTask(http));

exports.getShowDetailsTask = getShowDetailsTask;

var filterShowsByListType = mdl => (0, _ramda.filter)((0, _ramda.propEq)("listStatus", mdl.state.currentList()), mdl.user.shows());

exports.filterShowsByListType = filterShowsByListType;

var filterShowForUnselected = mdl => {
  var selected = (0, _ramda.pluck)('tvmazeId', mdl.user.shows());
  return mdl.data.shows().filter(show => !selected.includes(show.tvmazeId));
};

exports.filterShowForUnselected = filterShowForUnselected;

var getEpisodeTask = http => episodeUrl => http.getTask(episodeUrl).map(toEpisodeViewModel);

exports.getEpisodeTask = getEpisodeTask;
});

;require.register("pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _ramda = require("ramda");

var _Http = _interopRequireDefault(require("../Http.js"));

var _fns = require("./fns.js");

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateUserShows = mdl => (show, list) => (0, _fns.updateUserShowsTask)(mdl)(_Http.default)(show)(list).fork((0, _fns.onError)(mdl)("search"), updatedShows => {
  m.route.set("/home");
  mdl.user.shows((0, _ramda.sortBy)((0, _ramda.prop)('name'), updatedShows));
});

var deleteShow = mdl => show => (0, _fns.deleteShowTask)(_Http.default)(show.objectId).fork((0, _fns.onError)(mdl)("details"), updatedShows => {
  m.route.set("/home");
  mdl.user.shows((0, _ramda.sortBy)((0, _ramda.prop)('name'), updatedShows));
});

var getShowsTask = mdl => http => (0, _fns.getShows)(http).fork(mdl.errors, mdl.user.shows);

var showModal = (mdl, show) => mdl.state.details.selected(show);

var otherList = mdl => (0, _ramda.without)([mdl.state.currentList()], mdl.user.lists())[0];

var Home = () => {
  return {
    oninit: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return getShowsTask(mdl)(_Http.default);
    },
    view: (_ref2) => {
      var {
        attrs: {
          mdl
        }
      } = _ref2;
      return mdl.state.details.selected() ? m(_components.Modal, {
        mdl
      }) : m('ion-list', {
        oncreate: (_ref3) => {
          var {
            dom
          } = _ref3;
          mdl.state.listDom = dom;
          dom.closeSlidingItems();
        }
      }, (0, _ramda.sortBy)((0, _ramda.prop)('name'), (0, _fns.filterShowsByListType)(mdl)).map(show => // show.listStatus == mdl.state.currentList() &&
      m('ion-item-sliding', m('ion-item', {
        onclick: () => {
          showModal(mdl, show);
          mdl.state.listDom.closeSlidingItems();
        }
      }, m('ion-thumbnail', m('ion-img', {
        src: show.image
      })), m('ion-label', {
        style: {
          paddingLeft: '12px'
        }
      }, m('h2', show.name), m('p', m('i', show.status)), m('p', show.notes))), m('ion-item-options', {
        side: 'start'
      }, m('ion-item-option', {
        onclick: () => {
          updateUserShows(mdl)(show, otherList(mdl));
          mdl.state.listDom.closeSlidingItems();
        }
      }, "move to ".concat(otherList(mdl)))), m('ion-item-options', m('ion-item-option', {
        color: 'danger',
        side: 'end',
        onclick: () => {
          deleteShow(mdl)(show);
          mdl.state.listDom.closeSlidingItems();
        }
      }, 'Delete')))));
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

var _searchPage = require("./search-page.js");

Object.keys(_searchPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _searchPage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _searchPage[key];
    }
  });
});
});

;require.register("pages/search-page.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPage = void 0;

var _Http = _interopRequireDefault(require("../Http.js"));

var _fns = require("./fns.js");

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addUserShows = mdl => (show, list) => (0, _fns.addUserShowsTask)(mdl)(_Http.default)(show)(list).fork((0, _fns.onError)(mdl)("search"), mdl.user.shows);

var showModal = (mdl, show) => mdl.state.details.selected(show);

var SearchPage = () => {
  return {
    view: (_ref) => {
      var {
        attrs: {
          mdl
        }
      } = _ref;
      return mdl.state.details.selected() ? m(_components.Modal, {
        mdl
      }) : m('ion-list', {
        oncreate: (_ref2) => {
          var {
            dom
          } = _ref2;
          mdl.state.listDom = dom;
          dom.closeSlidingItems();
        }
      }, (0, _fns.filterShowForUnselected)(mdl).map((show, idx) => m('ion-item-sliding', {
        key: idx
      }, m('ion-item', {
        onclick: () => showModal(mdl, show)
      }, m('ion-thumbnail', {
        style: {
          'border-radius': '0'
        }
      }, m('ion-img', {
        src: show.image
      })), m('ion-label', {
        style: {
          paddingLeft: '12px'
        }
      }, m('h2', show.name))), m('ion-item-options', {
        side: 'start'
      }, mdl.user.lists().map(list => m('ion-item-option', {
        onclick: () => {
          addUserShows(mdl)(show, list);
          mdl.state.listDom.closeSlidingItems();
        }
      }, list))))));
    }
  };
};

exports.SearchPage = SearchPage;
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
  id: "search",
  name: "search",
  icon: "search-outline",
  route: "/search",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: (mdl, args, path, fullroute) => {},
  component: mdl => m(_components.Layout, {
    mdl
  }, m(_pages.SearchPage, {
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