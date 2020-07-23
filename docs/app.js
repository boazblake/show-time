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
exports.jsonCopy = exports.nameFromRoute = exports.NoPause = exports.Pause = exports.randomPause = exports.log = void 0;

var _mithrilStream = _interopRequireDefault(require("mithril-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var randomPause = function randomPause() {
  return Math.random() * 1000;
};

exports.randomPause = randomPause;

var Pause = function Pause(n) {
  return (0, _mithrilStream.default)(n * 1000);
};

exports.Pause = Pause;

var NoPause = function NoPause() {};

exports.NoPause = NoPause;

var nameFromRoute = function nameFromRoute(route) {
  return route.split("/")[1].toUpperCase();
};

exports.nameFromRoute = nameFromRoute;

var jsonCopy = function jsonCopy(data) {
  return JSON.parse(JSON.stringify(data));
};

exports.jsonCopy = jsonCopy;
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
    return m("div.nav-icon", {
      class: mdl.status.sidebar ? "is-active" : "",
      onclick: function onclick(e) {
        return mdl.status.sidebar = !mdl.status.sidebar;
      }
    }, m("div"));
  }
};
exports.Hamburger = Hamburger;
});

;require.register("components/header.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _animations = require("styles/animations");

var _components = require("components");

var _Utils = require("Utils");

var Header = {
  view: function view(_ref) {
    var mdl = _ref.attrs.mdl;
    return m("#header.frow.row-center.justify-between", [m("code", m("p.typewriter type-writer", {
      id: "logo-header" // oncreate: ({ dom }) =>
      //   (dom.onanimationend = () =>
      //     setTimeout(
      //       () => dom.classList.remove("type-writer"),
      //       Pause(2)
      //     )),

    }, "{Boaz Blake}")), mdl.settings.profile === "desktop" ? m(".navbar.frow", {// oncreate: AnimateNavBar(["slideInDown", NoPause, randomPause])
    }, mdl.routes.filter(function (r) {
      return r !== m.route.get();
    }).map(function (route) {
      return m(m.route.Link, {
        class: "navbar-item",
        href: route,
        selector: "li"
      }, (0, _Utils.nameFromRoute)(route));
    })) : m(_components.Hamburger, {
      mdl: mdl
    })]);
  }
};
exports.Header = Header;
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

var _header = require("./header.js");

Object.keys(_header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _header[key];
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

var _index = require("./snippets/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
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

var _Utils = require("Utils");

var Layout = function Layout() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl,
          children = _ref.children;
      return m(".app", [m(_components.Header, {
        mdl: mdl
      }), children, mdl.status.sidebar && mdl.settings.profile !== "desktop" && m(_components.SideBar, {
        // oncreate: animateCSS(["slideInRight", NoPause]),
        // onbeforeremove: animateCSS(["slideOutRight", NoPause]),
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
exports.default = void 0;
var loader = m(".holder", [m(".preloader", [m("div"), m("div"), m("div"), m("div"), m("div"), m("div"), m("div")])]);
var _default = loader;
exports.default = _default;
});

;require.register("components/sidebar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideBar = void 0;

var _animations = require("styles/animations");

var _Utils = require("Utils");

var SideBar = function SideBar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m("ul.sidebar", {// oncreate: AnimateSideBarIn(["slideInLeft", NoPause, randomPause]),
        // onbeforeremove: AnimateSideBarOut([
        //   "slideOutLeft",
        //   Pause(2),
        //   Pause(1),
        // ]),
      }, mdl.routes.filter(function (r) {
        return r !== m.route.get();
      }).map(function (route) {
        return m(m.route.Link, {
          class: "sidebar-item",
          href: route,
          selector: "li"
        }, (0, _Utils.nameFromRoute)(route));
      }));
    }
  };
};

exports.SideBar = SideBar;
});

;require.register("components/snippets/GOL/GOL.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GOL = void 0;
var GOL = 'const Stream  = m.stream\nconst compose = R.compose\nconst range = R.range\nconst without = R.without\nconst values = R.values\nconst root = document.getElementById(\'GameOfLife\')\nconst siblingCoords = [[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1]]\n\nconst model = {\n  isRunning: Stream(false),\n  board: {},\n  delay: Stream(1000),\n  randomized: Stream(15),\n  size: Stream(30),\n  width: Stream(800),\n  lifecycle: Stream(0)\n}\n\nconst restart = (mdl) => {\n  mdl.isRunning(false)\n  mdl.delay(1000)\n  mdl.randomized(15)\n  mdl.size(30)\n  mdl.width(800)\n  mdl.lifecycle(0)\n  return mdl\n}\n\n\nconst withinBounds = (limit) => (coords) =>\n  !(coords.includes(limit) || coords.includes(-1))\n\nconst toSiblingModel = (acc, sibling) => {\n  acc[sibling] = false\n  return acc\n}\n\nconst calcSiblings = (limit) => (sibCoords) => (coords) =>\n  sibCoords\n    .map((sib) => [sib[0] + coords[0], sib[1] + coords[1]])\n    .filter(withinBounds(limit))\n    .reduce(toSiblingModel, {})\n\nconst makeCell = (mdl) => (size) => (idx) => {\n  let coords = [idx % size, Math.floor(idx / size)]\n  let siblings = calcSiblings(size)(siblingCoords)(coords)\n  let cell = {\n    key: idx,\n    value: "",\n    isAlive: false,\n    coords,\n    siblings\n  }\n  mdl.board[coords] = cell\n\n  return mdl\n}\n\nconst makeBoardFromSize = (mdl, size) => {\n  mdl.size(size)\n  return range(0, size * size).map(makeCell(mdl)(size))\n}\n\nconst calculateCell = (mdl) => {\n  Object.keys(mdl.board).map((cell) => {\n    let cellsAlive = without([false], values(mdl.board[cell].siblings)).length\n\n    if (mdl.board[cell].isAlive) {\n      if (cellsAlive <= 2) {\n        mdl.board[cell].isAlive = false\n      }\n\n      if ([2, 3].includes(cellsAlive)) {\n        mdl.board[cell].isAlive = true\n      }\n\n      if (cellsAlive > 3) {\n        mdl.board[cell].isAlive = false\n      }\n    } else {\n      if (cellsAlive == 3) {\n        mdl.board[cell].isAlive = true\n      }\n    }\n  })\n  return mdl\n}\n\nconst updateSiblings = (mdl) => {\n  Object.keys(mdl.board).map((cell) =>\n    Object.keys(mdl.board[cell].siblings).map(\n      (sibling) =>\n        (mdl.board[cell].siblings[sibling] = mdl.board[sibling].isAlive)\n    )\n  )\n\n  return mdl\n}\n\nconst runGOL = (mdl) => {\n  if (mdl.isRunning()) {\n    mdl.lifecycle(mdl.lifecycle() + 1)\n    setTimeout(() => {\n      m.redraw()\n      return runGOL(updateCells(mdl))\n    }, mdl.delay())\n  } else {\n    return mdl\n  }\n}\n\nconst randomizeCells = (mdl) => {\n  let randomCells = Object.keys(mdl.board)\n    .sort(() => 0.5 - Math.random())\n    .slice(0, Math.floor((mdl.randomized() / 100) * (mdl.size() * mdl.size())))\n\n  randomCells.map((cell) => (mdl.board[cell].isAlive = true))\n\n  return mdl\n}\n\n\nconst initBoard = mdl =>   {  \n  makeBoardFromSize(mdl, Number(mdl.size()))\n  createSeed(mdl)\n}\n\nconst makeNewGame = mdl => e => {\n  restart(mdl)\n  initBoard(mdl)\n}\n\nconst advanceLifeCycle = mdl => (e) => {\n  mdl.isRunning(false)\n  mdl.lifecycle(mdl.lifecycle() + 1)\n  updateCells(mdl)\n}\n\nconst goForth = mdl => (e) => {\n  mdl.isRunning(true)\n  runGOL(mdl)\n}\n\nconst randomize = mdl => (e) =>{\n  mdl.randomized(e.target.value)\n  initBoard(mdl)\n}\n\nconst setDelay = mdl => (e) => mdl.delay(e.target.value)\n\nconst setBoardSize = mdl => (e) => {\n  mdl.size(e.target.value)\n  initBoard(mdl)\n}\n\nconst updateCells = compose(calculateCell, updateSiblings)\nconst createSeed = compose(updateSiblings, randomizeCells)\n\nconst Cell = {\n  view: ({ attrs: { mdl, cell } }) => {\n    return m(".cell", {\n      class: cell.isAlive ? "alive" : "dead",\n      style: {\n        fontSize: `${mdl.width() / mdl.size() / 2}px`,\n        height: `${mdl.width() / mdl.size() / 2}px`,\n        flex: `1 1 ${mdl.width() / mdl.size()}px`\n      },\n      onclick: () => {\n        mdl.board[cell.coords].isAlive = !cell.isAlive\n        updateSiblings(mdl)\n      }\n    })\n  }\n}\n\nconst Board = ({ attrs: { mdl } }) => {\n  initBoard(mdl)\n  return {\n    view: ({ attrs: { mdl } }) => {\n      return m(\n        ".board",\n        { style: { width: `${mdl.width()}px` } },\n        Object.keys(mdl.board).map((coord) => {\n          let cell = mdl.board[coord]\n          return m(Cell, { key: cell.key, cell, mdl })\n        })\n      )\n    }\n  }\n}\n\nconst Input = () => {\n  return {\n    view: ({ attrs: { mdl, label, min, max, step, value, fn } }) => [\n      m("label", [label,\n      m("input[type=\'number\']", {\n        inputmode: \'numeric\',\n        pattern:"[0-9]*",\n        min,\n        max,\n        step,\n        value,\n        onchange: e => fn(e)\n      })\n      ])\n    ]\n  }\n}\n\nconst Button = () => {\n  return {\n    view:({attrs:{mdl, label, fn}}) => m(\n        "button", {onclick: (e) => fn(e)},\n        label\n      )\n  }\n}\n\nconst TopRow = {\n  view:({attrs:{mdl}})=>\n   m(\'.topRow\', [m(Button, {mdl, fn: makeNewGame(mdl), label: \'New Game\'}),\n      m(Button, {mdl, fn: advanceLifeCycle(mdl), label:"Advance 1 Lifecycle"}),\n      m(Button, {mdl, fn:goForth(mdl), label:"Go Forth"})])\n}\n\nconst BottomRow = {\n  view:({attrs:{mdl}})=>\n    m(\'.bottomRow\',[\n      m(Input, { mdl, label: \'Randomize(%):\', min:0, max:100, step:1, value:mdl.randomized(), fn:randomize(mdl) }),\n      m(Input, { mdl, label: \'Delay(ms):\', min:0, max:1000, step:100, value:mdl.delay(), fn:setDelay(mdl) }),\n      m(Input, { mdl, label: \'size:\', min:30, max:100, step:10, value:mdl.size(), fn: setBoardSize(mdl) })])\n}\n\n      \nconst Toolbar = {\n  view: ({ attrs: { mdl } }) =>\n    m(".toolbar", [\n      m(TopRow, {mdl}),\n      m(BottomRow, {mdl})\n    ])\n}\n\nconst GameOfLife = {\n  view: ({ attrs: { mdl } }) => {\n    return m(".container", [\n      m(Toolbar, { mdl }),\n      m(Board, {\n        mdl\n      }),\n      m("h2", `lifecycle: ${mdl.lifecycle()}`)\n    ])\n  }\n}\n\nm.mount(root, {view:() => m(GameOfLife, {mdl:model})})';
exports.GOL = GOL;
});

;require.register("components/snippets/GOL/GOL_CSS.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GOL_CSS = void 0;
var GOL_CSS = "* {\n  font-family: Montserrat, Sans-Serif;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  outline: none;\n}\n\n.toolbar {\n  line-height: 70px;\n  padding: 10px;\n  border: 1px solid #ecf0f1;\n  justify-content: space-between;\n}\n\n.topRow {\n  display: flex;\n  flex-flow: wrap;\n  justify-content: space-around;\n}\n\n.bottomRow {\n  display: flex;\n  flex-flow: wrap;\n  justify-content: space-around;\n}\n\nbutton {\n\tbox-shadow: 0px 10px 14px -7px #276873;\n\tbackground:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);\n\tbackground-color:#599bb3;\n\tborder-radius:8px;\n\tdisplay:inline-block;\n\tcursor:pointer;\n\tcolor:#ffffff;\n\tfont-family:Arial;\n\tfont-size:20px;\n\tfont-weight:bold;\n\tpadding:13px 32px;\n\ttext-decoration:none;\n\ttext-shadow:0px 1px 0px #3d768a;\n}\nbutton:hover {\n\tbackground:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);\n\tbackground-color:#408c99;\n}\nbutton:active {\n\tposition:relative;\n\ttop:1px;\n}\n\nlabel > * {\n  padding: 10px;\n  margin: 10px;\n\tbackground: #1abc9c;\n\tcolor: #fff;\n\tfont-size: 1em;\n\tline-height: 30px;\n\ttext-align: center;\n\ttext-shadow: 0 1px 0 rgba(255,255,255,0.2);\n\tborder-radius: 15px;\n}\n\n.board {\n  display: flex;\n  flex-flow: wrap;\n  width: 800px;\n  background: #ecf0f1;\n}\n\n.cell {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #8e44ad;\n  cursor: pointer;\n}\n\n.alive {\n  background: #8e44ad;\n}\n\n.dead {\n  background: #ecf0f1;\n}";
exports.GOL_CSS = GOL_CSS;
});

;require.register("components/snippets/GOL/GOL_HTML.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GOL_HTML = void 0;
var GOL_HTML = '<div id="GameOfLife"></div>';
exports.GOL_HTML = GOL_HTML;
});

;require.register("components/snippets/GOL/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GOL = require("./GOL.js");

Object.keys(_GOL).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GOL[key];
    }
  });
});

var _GOL_CSS = require("./GOL_CSS.js");

Object.keys(_GOL_CSS).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GOL_CSS[key];
    }
  });
});

var _GOL_HTML = require("./GOL_HTML.js");

Object.keys(_GOL_HTML).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GOL_HTML[key];
    }
  });
});
});

;require.register("components/snippets/SHAPE/SHAPE.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHAPE = void 0;
var SHAPE = "const valueToPoint = (value, index, total) => {\n  var x = 0;\n  var y = -value * 0.8;\n  var angle = ((Math.PI * 2) / total) * index;\n  var cos = Math.cos(angle);\n  var sin = Math.sin(angle);\n  var tx = x * cos - y * sin + 100;\n  var ty = x * sin + y * cos + 100;\n  return {\n    x: tx,\n    y: ty\n  };\n}\n    \nconst statsToPoints = (stats) => {\n  var total = stats.length;\n  return stats.map((stat, i) => {\n      var point = valueToPoint(stat.value, i, total);\n      return point.x + \",\" + point.y;\n    })\n    .join(\" \");\n}\nconst update = stat => e => stat.value  = e.target.value\nconst remove = stat => stats => stats = stats.length > 3\n      ? stats.splice(stats.indexOf(stat), 1)\n      : 'Cant Delete Anymore'\nconst add = stat => e => {\n    e.preventDefault()\n    if(stat == '') return\n   stats.push({label:stat.toUpperCase(), value:100})\n   newlabel = ''\n } \n \nconst stats = [\n    { label: \"A\", value: 100 },\n    { label: \"B\", value: 100 },\n    { label: \"C\", value: 100 },\n    { label: \"D\", value: 100 },\n    { label: \"E\", value: 100 },\n    { label: \"F\", value: 100 }\n  ]\n  \nlet newlabel = ''\n\nconst AxisLabel = { view: ({attrs:{point, stat}}) =>\n  m('text', {x:point.x, y:point.y}, stat.label)}\n\nconst Polygraph = {\n  view: ({attrs:{stats, points}}) => m('g',[\n    m('polygon', {points}),\n    m('circle',{cx:100, cy:100, r:80}),\n    stats.map((stat, idx) => \n      m(AxisLabel, {\n        point:valueToPoint(+stat.value+10, idx, stats.length),\n        stat\n        })\n    )\n  ])\n}\n\nconst Controls = {\n  view:({attrs:{stats}}) => m('', [\n    stats.map(stat => m('.',[\n      m('label', stat.label),\n      m('input',{type:'range', oninput:update(stat), value:stat.value, min:0, max:100}),\n      m('span', stat.value),\n      m('button.remove',{onclick:e=>remove(stat)(stats)}, 'X')\n      ])),\n      m('form#add',[\n        m('input', {\n          oninput:e => newlabel = e.target.value,\n          name:'newlabel',\n          value:newlabel}),\n        m('button',{onclick: add(newlabel)},'Add')])\n      ]        \n  )\n}\n\nm.mount(document.getElementById('ShapeShifter'), {\n  view:() =>\n    m('.#demo', [\n      m('svg',{width:200, height:200}, m(Polygraph,{stats, points:statsToPoints(stats)})),\n      m(Controls, {stats}),\n      m('pre.#raw', JSON.stringify(stats, null, 4))\n    ])})";
exports.SHAPE = SHAPE;
});

;require.register("components/snippets/SHAPE/SHAPE_CSS.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHAPE_CSS = void 0;
var SHAPE_CSS = "body {\n  font-family: Helvetica Neue, Arial, sans-serif;\n}\n\npolygon {\n  fill: #42b983;\n  opacity: 0.75;\n}\n\ncircle {\n  fill: transparent;\n  stroke: #999;\n}\n\ntext {\n  font-family: Helvetica Neue, Arial, sans-serif;\n  font-size: 10px;\n  fill: #666;\n}\n\nlabel {\n  display: inline-block;\n  margin-left: 10px;\n  width: 20px;\n}\n\n#raw {\n  position: absolute;\n  top: 0;\n  left: 300px;\n}\n";
exports.SHAPE_CSS = SHAPE_CSS;
});

;require.register("components/snippets/SHAPE/SHAPE_HTML.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHAPE_HTML = void 0;
var SHAPE_HTML = '<div id="ShapeShifter"></div>';
exports.SHAPE_HTML = SHAPE_HTML;
});

;require.register("components/snippets/SHAPE/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SHAPE = require("./SHAPE.js");

Object.keys(_SHAPE).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SHAPE[key];
    }
  });
});

var _SHAPE_CSS = require("./SHAPE_CSS.js");

Object.keys(_SHAPE_CSS).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SHAPE_CSS[key];
    }
  });
});

var _SHAPE_HTML = require("./SHAPE_HTML.js");

Object.keys(_SHAPE_HTML).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SHAPE_HTML[key];
    }
  });
});
});

;require.register("components/snippets/TTT/TTT.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TTT = void 0;
var TTT = 'const getRandomInt = (min, max) =>\n  Math.floor(Math.random() * (1 + max - min) + min)\n\nconst players = {\n  true: { score: 0, mark: "X" },\n  false: { score: 0, mark: "O" },\n}\nconst boardSizes = R.filter((n) => n % 3 == 0, R.range(0, 60))\n\nconst getDiagAcross = (acc, set, idx) => {\n  let r = acc.concat(set[idx])\n  return r\n}\n\nconst getDiagDown = (acc, set, idx) => {\n  let r = acc.concat(set[set.length - (idx + 1)])\n  return r\n}\n\nconst winningSetBy = (mdl) => {\n  if (mdl.size) {\n    let spaces = R.range(1, mdl.size * mdl.size + 1)\n    let setsAcross = R.splitEvery(mdl.size, spaces)\n    let setsDown = R.transpose(setsAcross)\n    let setsDiagAcross = setsAcross.reduce(getDiagAcross, [])\n    let setsDiagDown = setsDown.reduce(getDiagDown, [])\n    let winnings = setsAcross\n      .concat(setsDown)\n      .concat([setsDiagAcross].concat([setsDiagDown]))\n    return winnings\n  } else {\n    restart(mdl)\n  }\n}\n\nconst mdl = {\n  winnerSets: [],\n  winner: null,\n  turn: true,\n  players,\n  board: null,\n  size: 0,\n  width: 800,\n}\n\nconst markSelectedSpace = (mdl, key, mark) => {\n  const space = R.filter(R.propEq("key", key), mdl.board)\n  let updatedSpace = R.set(R.lensProp("value"), mark, R.head(space), mdl.board)\n  let index = R.findIndex(R.propEq("key", key))(mdl.board)\n  mdl.board = R.insert(index, updatedSpace, R.without(space, mdl.board))\n  return mdl\n}\n\nconst markRandomSpace = (mdl) => {\n  let emptySpaces = mdl.board.filter(R.propEq("value", ""))\n  let AISpace = emptySpaces[getRandomInt(0, emptySpaces.length - 1)]\n  !mdl.winner && AISpace && markSpace(mdl)(AISpace)\n  return mdl\n}\n\nconst updateTurn = (mdl) => {\n  mdl.turn = !mdl.turn\n  return mdl\n}\n\nconst isWinningSpace = (mdl, key) => {\n  let value = R.prop("value", R.head(R.filter(R.propEq("key", key), mdl.board)))\n  let sets = R.groupBy((c) => c[1])(mdl.board.map(R.props(["key", "value"])))\n  let keys = R.keys(R.fromPairs(sets[value])).map(Number)\n  let isWinner = mdl.winnerSets\n    .map((set) => set.every((key) => keys.includes(key)))\n    .includes(true)\n  return isWinner\n}\n\nconst checkIfDraw = (mdl) => {\n  if (!R.pluck("value", mdl.board).includes("")) {\n    mdl.winner = "No One"\n    return mdl\n  }\n  return mdl\n}\n\nconst markSpace = (mdl) => (space) => {\n  let player = mdl.players[mdl.turn].mark\n  if (isWinningSpace(markSelectedSpace(mdl, space.key, player), space.key)) {\n    mdl.players[mdl.turn].score++\n    mdl.winner = player\n    return mdl\n  }\n  checkIfDraw(mdl)\n  return mdl\n}\n\nconst nextTurn = (mdl, space) => {\n  return R.compose(\n    updateTurn,\n    markRandomSpace,\n    updateTurn,\n    markSpace(mdl)\n  )(space)\n  return mdl\n}\n\nconst restart = (mdl) => {\n  mdl.winner = null\n  mdl.size = 0\n  mdl.board = null\n  mdl.width = 800\n}\n\nconst makeBoardWithSize = (mdl, size) => {\n  mdl.size = size\n  mdl.board = R.range(0, size * size).map((n) => ({ key: n + 1, value: "" }))\n  mdl.winnerSets = winningSetBy(mdl)\n}\n\nconst Space = {\n  view: ({ attrs: { mdl, key, space } }) =>\n    m(\n      ".space",\n      {\n        style: {\n          fontSize: `${mdl.width / mdl.size / 2}px`,\n          height: `${mdl.width / mdl.size / 2}px`,\n          flex: `1 1 ${mdl.width / mdl.size}px`,\n        },\n        onclick: (e) => !mdl.winner && !space.value && nextTurn(mdl, space),\n      },\n      space.value && m(".value", space.value)\n    ),\n}\n\nconst PlayerScore = {\n  view: ({ attrs: { player, mdl } }) =>\n    m(".score-card", [player.mark, ":", player.score]),\n}\n\nconst Toolbar = {\n  view: ({ attrs: { mdl } }) =>\n    m(".toolbar", [\n      m("button.btn", { onclick: (e) => restart(mdl) }, "New Game"),\n      Object.keys(mdl.players).map((player, idx) =>\n        m(PlayerScore, { key: idx, player: players[player], mdl })\n      ),\n    ]),\n}\n\nconst Game = {\n  view: () =>\n    mdl.board\n      ? m(\n          ".game",\n          { style: { width: `${mdl.width}px` } },\n          mdl.board.map((space) => m(Space, { key: space.key, space, mdl }))\n        )\n      : [\n          m("h1", "select a board size"),\n          m(\n            "select",\n            {\n              value: mdl.size,\n              onchange: (e) => makeBoardWithSize(mdl, Number(e.target.value)),\n            },\n            boardSizes.map((n) => m("option", n)),\n            mdl.size\n          ),\n        ],\n}\n\nconst GameOver = {\n  oncreate: () => window.scrollTo(0, 0),\n  view: ({ attrs: { mdl } }) =>\n    m(\n      ".game-over",\n      { onclick: (e) => restart(mdl) },\n      `Game Over ${mdl.winner} is the winner!`\n    ),\n}\n\nconst TicTacToe = {\n  view: () =>\n    m(".", [\n      m(Toolbar, { mdl }),\n      mdl.winner && m(GameOver, { mdl }),\n      m(Game, { mdl }),\n    ]),\n}\n\nm.mount(document.getElementById("TicTacToe"), TicTacToe)';
exports.TTT = TTT;
});

;require.register("components/snippets/TTT/TTT_CSS.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TTT_CSS = void 0;
var TTT_CSS = "\n* {\n  box-sizing: border-box;\n  font-family: 'Mansalva';\n}\n\nselect {\n  width: 80px;\n  height: 36px;\n  font-size: 30px;\n}\n\n.toolbar {\n  border: 1px solid green;\n  display: flex;\n  flex-flow: wrap;\n  justify-content: space-between;\n}\n\n.score-card {\n  padding: 10px;\n  font-size: 30px\n}\n\n.game {\n  display: flex;\n  flex-flow: wrap;\n}\n\n\n.space {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid green;\n  cursor:pointer;\n}\n\n.game-over {\n  position: absolute;\n  top: 15%;\n  left: 15%;\n  width: 500px;\n  font-size: 90px;\n  background: #bdc3c7;\n  padding: 4px;\n  cursor: pointer;\n}\n\n.value {\n  font-size: inherit;\n}";
exports.TTT_CSS = TTT_CSS;
});

;require.register("components/snippets/TTT/TTT_HTML.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TTT_HTML = void 0;
var TTT_HTML = '<link href="https://fonts.googleapis.com/css?family=Mansalva&display=swap" rel="stylesheet">\n<div id="TicTacToe"></div>';
exports.TTT_HTML = TTT_HTML;
});

;require.register("components/snippets/TTT/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TTT = require("./TTT.js");

Object.keys(_TTT).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TTT[key];
    }
  });
});

var _TTT_CSS = require("./TTT_CSS.js");

Object.keys(_TTT_CSS).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TTT_CSS[key];
    }
  });
});

var _TTT_HTML = require("./TTT_HTML.js");

Object.keys(_TTT_HTML).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TTT_HTML[key];
    }
  });
});
});

;require.register("components/snippets/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapeShifter = exports.GameOfLife = exports.TicTacToe = void 0;

var _index = require("./TTT/index");

var _index2 = require("./GOL/index");

var _index3 = require("./SHAPE/index");

var MITHRIL = {
  name: "mithril",
  type: "js",
  url: "https://unpkg.com/mithril"
};
var TicTacToe = {
  id: "TicTacToe",
  title: "Tic Tac Toe",
  code: {
    files: [{
      name: "app.js",
      content: _index.TTT
    }, {
      name: "style.css",
      content: _index.TTT_CSS
    }, {
      name: "index.html",
      content: _index.TTT_HTML
    }],
    links: [MITHRIL, {
      name: "ramda",
      type: "js",
      url: "https://unpkg.com/ramda@0.26.1/dist/ramda.min.js"
    }, {
      name: "mithril-stream",
      type: "js",
      url: "https://unpkg.com/mithril-stream@2.0.0/stream.js"
    }]
  }
};
exports.TicTacToe = TicTacToe;
var GameOfLife = {
  id: "GameOfLife",
  title: "Game Of Life",
  code: {
    files: [{
      name: "app.js",
      content: _index2.GOL
    }, {
      name: "style.css",
      content: _index2.GOL_CSS
    }, {
      name: "index.html",
      content: _index2.GOL_HTML
    }],
    links: [MITHRIL, {
      name: "ramda",
      type: "js",
      url: "https://unpkg.com/ramda@0.26.1/dist/ramda.min.js"
    }, {
      name: "mithril-stream",
      type: "js",
      url: "https://unpkg.com/mithril-stream@2.0.0/stream.js"
    }]
  }
};
exports.GameOfLife = GameOfLife;
var ShapeShifter = {
  id: "DynamicSVGManipulation",
  title: "Dynamic SVG Manipulation",
  code: {
    files: [{
      name: "app.js",
      content: _index3.SHAPE
    }, {
      name: "style.css",
      content: _index3.SHAPE_CSS
    }, {
      name: "index.html",
      content: _index3.SHAPE_HTML
    }],
    links: [MITHRIL]
  }
};
exports.ShapeShifter = ShapeShifter;
});

;require.register("http.js", function(exports, require, module) {
"use strict";
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _routes = _interopRequireDefault(require("./routes.js"));

var _model = _interopRequireDefault(require("./model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      }).catch(function (registrationError) {
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
    var lastProfile = _model.default.settings.profile;
    _model.default.settings.profile = getProfile(w);
    if (lastProfile != _model.default.settings.profile) m.redraw();
  }

  return requestAnimationFrame(checkWidth);
};

_model.default.settings.profile = getProfile(winW);
checkWidth(winW);

if (sessionStorage.getItem("user")) {
  _model.default.user = JSON.parse(sessionStorage.getItem("user"));
}

m.route(root, "/home", (0, _routes.default)(_model.default));
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
exports.default = void 0;
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
  routes: ["/home", "/portfolio", "/snippets", // "/about",
  "/resume"],
  status: {
    sidebar: false
  },
  settings: {
    profile: ""
  },
  snippets: [],
  slug: ""
};
var _default = model;
exports.default = _default;
});

;require.register("pages/about.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = void 0;
var About = {
  view: function view() {
    return m("section", [m("code.intro-text", "After serving as a paratrooper in the IDF I spent the next decade in Academia studying the effects of changes in environment on Human Performance, from pregancy to sports-injuries to space-flight."), m("br"), m("code.intro-text", ["My background in programming started at a 3 month boot-camp at the Iron Yard in Houston (since closed) supplemented with various online courses ", m("a.intro-text", {
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
    }, " and lots of time spent on personal projects,"), "and on-the-job training (Agile, SCRUM). "]), m("br"), m("code.intro-text", "My current personal interests lie in the nexus of true object oriented programming - as per Alan Kay, and functional programming in JavaScript. I am also a fan of Douglas Crockford and Kyle Simpson’s philosophy of JavaScripts behavior delegation / Objects linked to other Objects and I favour composition over hierarchy.")]);
  }
};
exports.About = About;
});

;require.register("pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _animations = require("styles/animations");

var _Utils = require("Utils");

var Home = {
  view: function view() {
    return m(".page", {// oncreate: animateChildrenIn(["fadeInUp", Pause(1), Pause(1)])
    }, [m("img#boazface", {
      src: "images/boazface.jpg"
    }), m("code.", {
      style: {
        fontSize: "2rem"
      }
    }, "Front-End developer with 4 +  years industry experience building a variety of different applications using a multitude of different frameworks and languages.")]);
  }
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

var _about = require("./about");

Object.keys(_about).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _about[key];
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

var _Utils = require("Utils");

var _animations = require("styles/animations");

var RepoLink = {
  view: function view(_ref) {
    var url = _ref.attrs.url;
    return m("a.github-app-link", {
      href: "https://boazblake.github.io/".concat(url),
      target: "_blank",
      title: url
    }, url);
  }
};

var getRepos = function getRepos() {
  return m.request({
    url: "https://api.github.com/users/boazblake/repos?sort=asc&per_page=100",
    headers: {
      Accept: "application/vnd.github.v3+json"
    }
  });
};

var getRepo = function getRepo(state) {
  return m.request({
    url: "https://api.github.com/repos/boazblake/".concat(state.name)
  });
};

var Repo = function Repo() {
  var state = {
    name: "",
    status: "loading"
  };
  return {
    oninit: function oninit(_ref2) {
      var url = _ref2.attrs.url;
      state.name = url.split("/")[3];
      getRepo(state).then(function (_ref3) {
        var description = _ref3.description;
        state.errors = null;
        state.info = description && description.split("~")[0];
        state.src = description && description.split("~")[1];
        state.status = "loaded";
      }, function (errors) {
        state.status = "failed";
        state.errors = errors;
      });
    },
    view: function view() {
      return state.status == "loading" && "Repo Loading...", state.status == "failed" && "Error", state.status == "loaded" && m(".frow", m(".col-lg-1-3", {// oncreate: animateChildrenIn(["fadeIn", randomPause, randomPause]),
      }, [m(".repo-title", [m(RepoLink, {
        url: state.name
      })]), m("img", {
        width: "200px",
        src: state.src
      }), m(".info", state.info)]));
    }
  };
};

var Portfolio = function Portfolio() {
  var state = {
    status: "loading",
    repos: [],
    errors: {}
  };
  return {
    oninit: getRepos().then(function (repos) {
      state.status = "loaded";
      state.repos = repos.filter(function (repo) {
        return repo.homepage && repo.homepage.includes("boazblake") && repo.description && repo.description.split("~")[1];
      }).map(function (repo) {
        return repo.homepage;
      });
    }, function (errors) {
      state.status = "failed";
      state.errors = errors;
    }),
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return m(".frow-container", state.status == "failed" && "Error fetching Repos ...", state.status == "loading" && "Loading Repos ...", state.status == "loaded" && state.repos.map(function (url) {
        return m(Repo, {
          url: url,
          mdl: mdl
        });
      }));
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
      return m(".page", m("section.resume", m("embed#resume-pdf", {
        type: "application/pdf",
        width: "100%",
        height: "100%",
        src: "files/resume.pdf"
      })));
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

var _components = require("components");

var snippets = [_components.TicTacToe,, _components.GameOfLife, _components.ShapeShifter];
var Snippet = {
  view: function view(_ref) {
    var _ref$attrs = _ref.attrs,
        snip = _ref$attrs.snip,
        Flems = _ref$attrs.Flems;
    return m(".snippet", [m("h3.snippet-title", snip.title), m(".snippet-code", {
      id: snip.id,
      style: {
        height: "500px"
      },
      oncreate: function oncreate(_ref2) {
        var dom = _ref2.dom;
        return Flems(dom, snip.code);
      }
    })]);
  }
};

var Snippets = function Snippets(_ref3) {
  var mdl = _ref3.attrs.mdl;
  return {
    view: function view() {
      return m(".page", ["COMING SOON..." // snippets.map((snip, idx) => m(Snippet, { snip, Flems: window.Flems })),
      ]);
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
exports.default = void 0;

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
          // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
          onscroll: function onscroll(e) {
            return console.log(e);
          },
          // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
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
          // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
          onscroll: function onscroll(e) {
            return console.log(e);
          },
          // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
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
          // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
          onscroll: function onscroll(e) {
            return console.log(e);
          },
          // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
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
          // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
          onscroll: function onscroll(e) {
            return console.log(e);
          },
          // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
          mdl: mdl
        }));
      }
    },
    "/about": {
      onmatch: function onmatch(_, b) {
        mdl.slug = b;
        mdl.status.sidebar = false;
      },
      render: function render() {
        return m(_components.Layout, {
          mdl: mdl
        }, m(_pages.About, {
          // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
          onscroll: function onscroll(e) {
            return console.log(e);
          },
          // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
          mdl: mdl
        }));
      }
    }
  };
};

var _default = routes;
exports.default = _default;
});

;require.register("styles/animations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimateNavBar = exports.AnimateSideBarOut = exports.AnimateSideBarIn = exports.animateChildrenOut = exports.animateChildrenIn = exports.animateCSS = exports.animatePageCSS = void 0;

var _Utils = require("Utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function transitionEndPromise(element) {
  return new Promise(function (resolve) {
    element.addEventListener("transitionend", function f() {
      console.log("el", element); // if (event.target !== element) return

      element.removeEventListener("transitionend", f);
      resolve();
    });
  });
} // function requestAnimationFramePromise() {
//   return new Promise((resolve) => requestAnimationFrame(resolve))
// }
// export function animate(element, stylz) {
//   Object.assign(element.style, stylz)
//   return transitionEndPromise(element).then((_) =>
//     requestAnimationFramePromise()
//   )
// }


var animatePageCSS = function animatePageCSS(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      animation = _ref2[0],
      pause = _ref2[1];

  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "animate__";
  return function (_ref3) {
    var dom = _ref3.dom;
    return new Promise(function (resolve) {
      var cs = _toConsumableArray(dom.classList).filter(function (c) {
        return !c.includes("animate__");
      });

      dom.classList = cs;
      dom.classList.add("".concat(prefix, "animated"), "".concat(prefix).concat(animation));
      var origStyles = (0, _Utils.jsonCopy)(dom.style);
      dom.style.position = "absolute";
      dom.style.top = -19;
      dom.style.width = "100%"; // setTimeout(() => {

      return transitionEndPromise(dom).then(function (_) {
        dom.style = origStyles;
        resolve();
      }); // }, pause())
    });
  };
};

exports.animatePageCSS = animatePageCSS;

var animateCSS = function animateCSS(_ref4) {
  var _ref5 = _slicedToArray(_ref4, 2),
      animation = _ref5[0],
      pause = _ref5[1];

  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "animate__";
  return function (_ref6) {
    var dom = _ref6.dom;
    return new Promise(function (resolve) {
      var cs = _toConsumableArray(dom.classList).filter(function (c) {
        return !c.includes("animate__");
      });

      dom.classList = cs;
      dom.classList.add("".concat(prefix, "animated"), "".concat(prefix).concat(animation));
      setTimeout(function () {
        transitionEndPromise(dom).then(function () {
          return resolve();
        }); // .then((_) =>
        //   requestAnimationFramePromise()
        // )
      }, pause());
    });
  };
};

exports.animateCSS = animateCSS;

var animateChildrenIn = function animateChildrenIn(_ref7) {
  var _ref8 = _slicedToArray(_ref7, 3),
      animation = _ref8[0],
      parentPause = _ref8[1],
      childPause = _ref8[2];

  return function (_ref9) {
    var dom = _ref9.dom;

    var children = _toConsumableArray(dom.children);

    return children.map(function (child, idx) {
      child.style.opacity = 0;
      setTimeout(function () {
        child.style.opacity = 1;
        return animateCSS([animation, parentPause])({
          dom: child
        });
      }, childPause());
    });
  };
};

exports.animateChildrenIn = animateChildrenIn;

var animateChildrenOut = function animateChildrenOut(_ref10) {
  var _ref11 = _slicedToArray(_ref10, 3),
      animation = _ref11[0],
      parentPause = _ref11[1],
      childPause = _ref11[2];

  return function (_ref12) {
    var dom = _ref12.dom;

    var children = _toConsumableArray(dom.children);

    console.log(children);
    return children.map(function (child, idx) {
      child.style.opacity = 0;
      console.log("huh??", animateCSS([animation, parentPause])({
        dom: child
      }));
      setTimeout(function () {
        child.style.opacity = 1;
        return animateCSS([animation, parentPause])({
          dom: child
        }).then(function (x) {
          return animateCSS([animation, parentPause])({
            dom: dom
          });
        });
      }, childPause());
    });
  };
};

exports.animateChildrenOut = animateChildrenOut;

var AnimateSideBarIn = function AnimateSideBarIn(_ref13) {
  var _ref14 = _slicedToArray(_ref13, 3),
      animation = _ref14[0],
      parentPause = _ref14[1],
      childPause = _ref14[2];

  return function (_ref15) {
    var dom = _ref15.dom;
    return animateChildrenIn([animation, parentPause, childPause])({
      dom: dom
    });
  };
};

exports.AnimateSideBarIn = AnimateSideBarIn;

var AnimateSideBarOut = function AnimateSideBarOut(_ref16) {
  var _ref17 = _slicedToArray(_ref16, 3),
      animation = _ref17[0],
      parentPause = _ref17[1],
      childPause = _ref17[2];

  return function (_ref18) {
    var dom = _ref18.dom;
    return animateChildrenOut([animation, parentPause, childPause])({
      dom: dom
    });
  };
};

exports.AnimateSideBarOut = AnimateSideBarOut;

var AnimateNavBar = function AnimateNavBar(_ref19) {
  var _ref20 = _slicedToArray(_ref19, 3),
      animation = _ref20[0],
      parentPause = _ref20[1],
      childPause = _ref20[2];

  return function (_ref21) {
    var dom = _ref21.dom;
    return animateChildrenIn([animation, parentPause, childPause])({
      dom: dom
    });
  };
};

exports.AnimateNavBar = AnimateNavBar;
});

;require.register("styles/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animations = require("./animations.js");

Object.keys(_animations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animations[key];
    }
  });
});
});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map