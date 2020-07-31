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
require.register("Components/calendar/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _model = require("./model");

var _Utils = require("Utils");

var Toolbar = function Toolbar(_ref) {
  var mdl = _ref.attrs.mdl;
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m(".toolbar", [m("input", {
        onchange: function onchange(e) {
          return mdl.data = (0, _model.calendarModel)(e.target.value);
        },
        type: "date",
        value: mdl.data.startDate
      }), m("button.width-100", {
        onclick: function onclick(_) {
          return mdl.data = (0, _model.calendarModel)();
        }
      }, "Today")]);
    }
  };
};

var MonthsToolbar = function MonthsToolbar() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      // console.log(mdl)
      return m(".frow width-100  mt-10", [m(".frow width-100 row-between mt-10", [m("button.prevMonth", m("h3", {
        onclick: function onclick(_) {
          mdl.data = (0, _model.calendarModel)((0, _model.formatDateString)(parseInt(mdl.data.selected.year) - 1, mdl.data.selected.month, mdl.data.selected.day));
        }
      }, parseInt(mdl.data.selected.year) - 1)), m(".centerMonthGroup", [m("h2.currentMonth", (0, _model.getMonthByIdx)(parseInt(mdl.data.selected.month) - 1)), m("h3.text-center", parseInt(mdl.data.selected.year))]), m("button.nextMonth", m("h3", {
        onclick: function onclick(_) {
          mdl.data = (0, _model.calendarModel)((0, _model.formatDateString)(parseInt(mdl.data.selected.year) + 1, mdl.data.selected.month, mdl.data.selected.day));
        }
      }, parseInt(mdl.data.selected.year) + 1))]), m(".frow width-100 row-between mt-10", [m("button", {
        onclick: function onclick(_) {
          mdl.data = (0, _model.updateMonthDto)(mdl.data.selected.year, mdl.data.selected.month, null, -1);
        }
      }, m("h4", (0, _model.getMonthByIdx)(parseInt(mdl.data.selected.month - 2)))), m("button", {
        onclick: function onclick(_) {
          mdl.data = (0, _model.updateMonthDto)(mdl.data.selected.year, mdl.data.selected.month, null, 1);
        }
      }, m("h4", (0, _model.getMonthByIdx)(parseInt(mdl.data.selected.month))))])]);
    }
  };
};

var CalendarBody = function CalendarBody() {
  return {
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      var dto = (0, _model.getMountMatrix)(mdl.data);
      return m(".frow frow-container", [m(MonthsToolbar, {
        mdl: mdl
      }), m(".frow width-100 row-between mt-10", _Utils.daysOfTheWeek.map(function (day) {
        return m(".col-xs-1-7 text-center", m("span.width-auto", day[0].toUpperCase()));
      })), m(".frow centered-column width-100 row-between mt-10 ", dto.map(function (week) {
        return m(".frow width-100", {
          class: ""
        }, week.map(function (_ref5) {
          var day = _ref5.day,
              dir = _ref5.dir;
          return m(".col-xs-1-7 text-center", {
            onclick: function onclick(_) {
              return mdl.data = (0, _model.updateMonthDto)(mdl.data.selected.year, mdl.data.selected.month, day, dir);
            },
            class: (0, _model.calendarDay)(mdl.data)(day, dir)
          }, m("span.day", day));
        }));
      }))]);
    }
  };
};

var Calendar = function Calendar() {
  return {
    view: function view(_ref6) {
      var mdl = _ref6.attrs.mdl;
      return m(".calendar", [m(Toolbar, {
        mdl: mdl.CalendarDto
      }), m(CalendarBody, {
        mdl: mdl.CalendarDto
      })]);
    }
  };
};

exports.Calendar = Calendar;
});

;require.register("Components/calendar/model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendarDay = exports.calendarModel = exports.getMountMatrix = exports.createCalendarDayViewModel = exports.isNotCalenderDay = exports.isCalenderDay = exports.getMonthByIdx = exports.updateMonthDto = void 0;

var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));

var _endOfISOWeek = _interopRequireDefault(require("date-fns/endOfISOWeek"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));

var _startOfISOWeek = _interopRequireDefault(require("date-fns/startOfISOWeek"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _eachWeekOfInterval = _interopRequireDefault(require("date-fns/eachWeekOfInterval"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _differenceInMonths = _interopRequireDefault(require("date-fns/differenceInMonths"));

var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));

var _Utils = require("Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateYear = function updateYear(year, dir) {
  return (parseInt(year) + dir).toString();
};

var daysInMonth = function daysInMonth(month, year) {
  return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
};

var updateMonth = function updateMonth(month, dir) {
  return (parseInt(month) + dir).toString().length == 1 ? (0, _Utils.pad0Left)((parseInt(month) + dir).toString()) : (parseInt(month) + dir).toString();
};

var updateMonthDto = function updateMonthDto(year, month, day, dir) {
  var _year = year;

  var _month = updateMonth(month, dir);

  var _day = day || "01";

  if (_month >= 13) {
    _year = updateYear(_year, dir);
    _month = "01";
  }

  if (_month <= 0) {
    _year = updateYear(_year, dir);
    _month = "12";
  }

  return calendarModel((0, _Utils.formatDateString)(_year, _month, _day));
};

exports.updateMonthDto = updateMonthDto;

var getMonthByIdx = function getMonthByIdx(idx) {
  return idx >= 12 ? _Utils.monthsOfTheYear[0] : idx < 0 ? _Utils.monthsOfTheYear[11] : _Utils.monthsOfTheYear[idx];
};

exports.getMonthByIdx = getMonthByIdx;

var isCalenderDay = function isCalenderDay(date) {
  return {
    day: (0, _format.default)(date, "dd"),
    dir: 0
  };
};

exports.isCalenderDay = isCalenderDay;

var isNotCalenderDay = function isNotCalenderDay(day, date) {
  return {
    day: (0, _format.default)(day, "dd"),
    dir: (0, _differenceInMonths.default)((0, _parseISO.default)((0, _Utils.shortDate)(date)), day) == 0 ? -1 : +1
  };
};

exports.isNotCalenderDay = isNotCalenderDay;

var createCalendarDayViewModel = function createCalendarDayViewModel(day, date, _ref) {
  var isSameMonth = _ref.isSameMonth;
  return isSameMonth ? isCalenderDay(day) : isNotCalenderDay(day, date);
};

exports.createCalendarDayViewModel = createCalendarDayViewModel;

var getMountMatrix = function getMountMatrix(_ref2) {
  var year = _ref2.year,
      month = _ref2.month;
  var date = new Date(parseInt(year), parseInt(month - 1));
  var matrix = (0, _eachWeekOfInterval.default)({
    start: (0, _startOfMonth.default)(date),
    end: (0, _endOfMonth.default)(date)
  }, {
    weekStartsOn: 1
  });
  return matrix.map(function (weekDay) {
    return (0, _eachDayOfInterval.default)({
      start: (0, _startOfISOWeek.default)(weekDay),
      end: (0, _endOfISOWeek.default)(weekDay)
    }).map(function (day) {
      return createCalendarDayViewModel(day, date, {
        isSameMonth: (0, _isSameMonth.default)(date, day)
      });
    });
  });
};

exports.getMountMatrix = getMountMatrix;

var calendarModel = function calendarModel() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _Utils.shortDate)();

  var _date = (0, _Utils.shortDate)(date).split("-");

  var today = (0, _Utils.shortDate)().split("-");
  var year = _date[0];
  var month = _date[1];
  var day = _date[2];
  var dto = {
    isLeapYear: (0, _Utils.isLeapYear)(year),
    startDate: date,
    selected: {
      year: year,
      month: month,
      day: day
    },
    today: {
      year: today[0],
      month: today[1],
      day: today[2]
    },
    year: year,
    month: month,
    day: day,
    daysInMonth: daysInMonth(month, year)
  };
  return dto;
};

exports.calendarModel = calendarModel;

var calendarDay = function calendarDay(_ref3) {
  var today = _ref3.today,
      selected = _ref3.selected;
  return function (currentDate, dir) {
    if (dir !== 0) {
      return "notThisMonth";
    }

    if ((0, _Utils.isEqual)(currentDate, today.day) && (0, _Utils.isEqual)(currentDate, selected.day) && (0, _Utils.isEqual)(selected.year, today.year)) {
      return "selectedDay isToday";
    } else if ((0, _Utils.isEqual)(currentDate, selected.day)) {
      return "selectedDay";
    } else if ((0, _Utils.isEqual)(currentDate, today) && (0, _Utils.isEqual)(today.month, selected.month) && (0, _Utils.isEqual)(today.year, selected.year)) {
      return "isToday";
    }
  };
};

exports.calendarDay = calendarDay;
});

;require.register("Components/clock/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;

var _eachHourOfInterval = _interopRequireDefault(require("date-fns/fp/eachHourOfInterval"));

var _add = _interopRequireDefault(require("date-fns/fp/add"));

var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _Utils = require("Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHours = function getHours(dateFormat, _ref) {
  var year = _ref.year,
      month = _ref.month,
      day = _ref.day;
  var date = (0, _parseISO.default)((0, _Utils.formatDateString)(year, month, day));
  var interval = {
    start: date,
    end: (0, _add.default)({
      days: 1
    })(date)
  };
  return (0, _eachHourOfInterval.default)(interval).map(function (hour) {
    return (0, _format.default)(hour, dateFormat);
  });
};

var toHourViewModel = function toHourViewModel(mdl) {
  return function (today, hour) {
    //assign events to hour
    console.log(mdl);
    today[hour] = {};
    return today;
  };
};

var DailyPlanner = function DailyPlanner(mdl, _ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day;
  var hours = getHours(mdl.format, {
    year: year,
    month: month,
    day: day
  });
  var today = mdl.data[(0, _Utils.formatDateString)(year, month, day)] = {};
  var plannerViewModel = hours.reduce(toHourViewModel(mdl), today);
  return {
    hours: hours,
    plannerViewModel: plannerViewModel
  };
};

var Hour = function Hour() {
  return {
    view: function view(_ref3) {
      var hour = _ref3.attrs.hour;
      return m(".frow ", m(".hour ", [m(".half-hour", [m(".top", hour)]), m(".half-hour", m(".bottom"))]));
    }
  };
};

var Clock = function Clock() {
  return {
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      var date = mdl.CalendarDto.data.selected;
      var now = "";
      return m(".clock", m(".frow-container", [m("button.width-100", "Add Event"), m(".clock-face", DailyPlanner(mdl.ClockDto, date).hours.map(function (hour) {
        return m(Hour, {
          hour: hour
        });
      }))]));
    }
  };
};

exports.Clock = Clock;
});

;require.register("Components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./calendar/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = require("./clock/index.js");

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});
});

;require.register("Pages/home/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _Components = require("Components");

var Home = function Home() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow", [m(_Components.Calendar, {
        mdl: mdl
      }), m(_Components.Clock, {
        mdl: mdl
      })]);
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

var _index = require("./home/index.js");

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

;require.register("Styles/animations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideInDown = exports.slideOutRight = exports.slideInLeft = exports.slideInRight = exports.fadeInUp = exports.fadeIn = exports.popIn = void 0;
var popIn = [{
  transform: "scale(0)",
  opacity: 1
}, {
  transform: "scale(1)",
  opacity: 1
}, {
  transform: "scale(0.8)",
  opacity: 1
}, {
  transform: "scale(1)",
  opacity: 1
}];
exports.popIn = popIn;
var fadeIn = [{
  opacity: 0
}, {
  opacity: 1
}];
exports.fadeIn = fadeIn;
var fadeInUp = [{
  opacity: 0,
  transform: "translate3d(0, 40%, 0)"
}, {
  opacity: 1,
  transform: "translate3d(0, 0, 0)"
}];
exports.fadeInUp = fadeInUp;
var slideInRight = [{
  transform: "translate3d(-50%, 0, 0)"
}, {
  transform: "translate3d(0, 0, 0)",
  visibility: "visible"
}];
exports.slideInRight = slideInRight;
var slideInLeft = [{
  transform: "translate3d(80%, 0, 0)",
  visibility: "visible"
}, {
  transform: "translate3d(0, 0, 0)"
}];
exports.slideInLeft = slideInLeft;
var slideOutRight = [{
  transform: "translate3d(0, 0, 0)"
}, {
  visibility: "hidden",
  transform: "translate3d(100%, 0, 0)"
}];
exports.slideOutRight = slideOutRight;
var slideInDown = [{
  transform: "translate3d(0, -50%, 0)"
}, {
  transform: "translate3d(0, 0, 0)",
  visibility: "visible"
}];
exports.slideInDown = slideInDown;
});

;require.register("Styles/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AnimatePage: true,
  Animate: true,
  AnimateChildren: true
};
exports.AnimateChildren = exports.Animate = exports.AnimatePage = void 0;

var _Utils = require("Utils");

var _animations = require("./animations.js");

Object.keys(_animations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animations[key];
    }
  });
});

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var duration = {
  duration: 700,
  easing: "ease-in-out",
  fill: "forwards"
};

function transitionEndPromise(element) {
  var transitionEnded = function transitionEnded(e) {
    // console.log("transitionEnded", element, e)
    if (e.target !== element) return;
    element.removeEventListener("transitionend", transitionEnded);
  };

  return new Promise(function () {
    return element.addEventListener("transitionend", transitionEnded);
  });
}

var AnimatePage = function AnimatePage(animation) {
  return function (_ref) {
    var dom = _ref.dom;
    // let origStyles = jsonCopy(dom.style)
    // dom.style.position = "absolute"
    // dom.style.top = -19
    // dom.style.width = "100%"
    Animate(animation)({
      dom: dom
    }); // Animate(animation)({ dom })
  };
};

exports.AnimatePage = AnimatePage;

var Animate = function Animate(animation) {
  var pause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Utils.NoOp;
  return function (_ref2) {
    var dom = _ref2.dom;
    return setTimeout(function () {
      return dom.animate(animation, duration).finished.then(transitionEndPromise(dom));
    }, pause());
  };
};

exports.Animate = Animate;

var AnimateChildren = function AnimateChildren(animation, pause) {
  return function (_ref3) {
    var dom = _ref3.dom;

    var children = _toConsumableArray(dom.children);

    children.map(function (child, idx) {
      child.style.opacity = 0;
      setTimeout(function () {
        child.style.opacity = 1;
        Animate(animation)({
          dom: child
        });
      }, pause());
    });
  };
};

exports.AnimateChildren = AnimateChildren;
});

;require.register("Utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = exports.formatDateString = exports.pad0Left = exports.monthsOfTheYear = exports.daysOfTheWeek = exports.isLeapYear = exports.shortDate = exports.range = exports.isSideBarActive = exports.jsonCopy = exports.nameFromRoute = exports.NoOp = exports.Pause = exports.randomPause = exports.log = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  return n * 1000;
};

exports.Pause = Pause;

var NoOp = function NoOp() {};

exports.NoOp = NoOp;

var nameFromRoute = function nameFromRoute(route) {
  return route.split("/")[1].toUpperCase();
};

exports.nameFromRoute = nameFromRoute;

var jsonCopy = function jsonCopy(data) {
  return JSON.parse(JSON.stringify(data));
};

exports.jsonCopy = jsonCopy;

var isSideBarActive = function isSideBarActive(mdl) {
  return mdl.settings.profile !== "desktop" && mdl.status.sidebar;
};

exports.isSideBarActive = isSideBarActive;

var range = function range(size) {
  return _toConsumableArray(Array(size).keys());
};

exports.range = range;

var shortDate = function shortDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return new Date(date).toISOString().split("T")[0];
};

exports.shortDate = shortDate;

var isLeapYear = function isLeapYear(year) {
  return year % 4 == 0 ? false : year % 100 == 0 ? year % 400 == 0 ? true : false : false;
};

exports.isLeapYear = isLeapYear;
var daysOfTheWeek = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"];
exports.daysOfTheWeek = daysOfTheWeek;
var monthsOfTheYear = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthsOfTheYear = monthsOfTheYear;

var pad0Left = function pad0Left(num) {
  return "0".concat(num);
};

exports.pad0Left = pad0Left;

var formatDateString = function formatDateString(year, month, day) {
  return "".concat(year, "-").concat(month, "-").concat(day);
};

exports.formatDateString = formatDateString;

var isEqual = function isEqual(a, b) {
  return JSON.stringify(a) == JSON.stringify(b);
};

exports.isEqual = isEqual;
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
m.route(root, "/", (0, _routes.default)(_model.default));
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

var _model = require("Components/calendar/model");

var model = {
  CalendarDto: {
    data: (0, _model.calendarModel)()
  },
  ClockDto: {
    format: "KK:mm",
    data: {}
  },
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
  routes: ["/"],
  status: {
    sidebar: false
  },
  settings: {
    profile: "",
    inspector: ""
  },
  snippets: [],
  slug: ""
};
var _default = model;
exports.default = _default;
});

;require.register("routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _home = require("Pages/home");

var routes = function routes(mdl) {
  return {
    "/": {
      onmatch: function onmatch(_, b) {
        return mdl.slug = b;
      },
      render: function render() {
        return m(_home.Home, {
          mdl: mdl
        });
      }
    }
  };
};

var _default = routes;
exports.default = _default;
});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map