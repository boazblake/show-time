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
        if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
          mdl.route.set(m.route.get());
        }

        mdl.state.route = route;
        mdl.state.anchor = path.split("#")[1];
        var isAnchor = Boolean(mdl.state.anchor);
        route.onmatch(mdl, args, path, fullroute, isAnchor);
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

;require.register("Components/calendar/calendar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _model = require("./model");

var _Utils = require("Utils");

var Toolbar = function Toolbar(_ref) {
  var _ref$attrs = _ref.attrs,
      mdl = _ref$attrs.mdl,
      calendar = _ref$attrs.calendar;
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          calendar = _ref2$attrs.calendar;
      return m(".toolbar", [m("input", {
        onchange: function onchange(e) {
          return m.route.set("/".concat(mdl.user.name, "/").concat(mdl.currentShortDate()));
        },
        type: "date",
        value: calendar.startDate
      }), m("button.width-100", {
        onclick: function onclick(_) {
          return m.route.set("/".concat(mdl.user.name, "/").concat((0, _Utils.shortDate)(new Date())));
        }
      }, "Today")]);
    }
  };
};

var MonthsToolbar = function MonthsToolbar() {
  return {
    view: function view(_ref3) {
      var _ref3$attrs = _ref3.attrs,
          mdl = _ref3$attrs.mdl,
          calendar = _ref3$attrs.calendar;
      return m(".frow width-100  mt-10", [m(".frow width-100 row-between mt-10", [m("button.prevMonth", m("h3", {
        onclick: function onclick(_) {
          m.route.set("/".concat(mdl.user.name, "/").concat((0, _Utils.shortDateString)({
            year: parseInt(calendar.selected.year) - 1,
            month: calendar.selected.month,
            day: calendar.selected.day
          })));
        }
      }, parseInt(calendar.selected.year) - 1)), m(".centerMonthGroup", [m("h2.currentMonth", (0, _model.getMonthByIdx)(parseInt(calendar.selected.month) - 1)), m("h3.text-center", parseInt(calendar.selected.year))]), m("button.nextMonth", m("h3", {
        onclick: function onclick(_) {
          m.route.set("/".concat(mdl.user.name, "/").concat((0, _Utils.shortDateString)({
            year: parseInt(calendar.selected.year) + 1,
            month: calendar.selected.month,
            day: calendar.selected.day
          })));
        }
      }, parseInt(calendar.selected.year) + 1))]), m(".frow width-100 row-between mt-10", [m("button", {
        onclick: function onclick(_) {
          return (0, _model.goToDate)(mdl, {
            year: calendar.selected.year,
            month: calendar.selected.month,
            day: calendar.selected.day,
            dir: -1
          });
        }
      }, m("h4", (0, _model.getMonthByIdx)(parseInt(calendar.selected.month - 2)))), m("button", {
        onclick: function onclick(_) {
          return (0, _model.goToDate)(mdl, {
            year: calendar.selected.year,
            month: calendar.selected.month,
            day: calendar.selected.day,
            dir: 1
          });
        }
      }, m("h4", (0, _model.getMonthByIdx)(parseInt(calendar.selected.month))))])]);
    }
  };
};

var CalendarBody = function CalendarBody() {
  return {
    view: function view(_ref4) {
      var _ref4$attrs = _ref4.attrs,
          mdl = _ref4$attrs.mdl,
          calendar = _ref4$attrs.calendar;
      var dto = (0, _model.getMonthMatrix)(calendar);
      return m(".frow frow-container", [m(MonthsToolbar, {
        mdl: mdl,
        calendar: calendar
      }), m(".frow width-100 row-between mt-10", _Utils.daysOfTheWeek.map(function (day) {
        return m(".col-xs-1-7 text-center", m("span.width-auto", day[0].toUpperCase()));
      })), m(".frow centered-column width-100 row-between mt-10 ", dto.map(function (week) {
        return m(".frow width-100", week.map(function (_ref5) {
          var day = _ref5.day,
              dir = _ref5.dir;
          return m(".col-xs-1-7 text-center", {
            onclick: function onclick(_) {
              return (0, _model.goToDate)(mdl, {
                year: calendar.selected.year,
                month: calendar.selected.month,
                day: day,
                dir: dir
              });
            },
            class: (0, _model.calendarDay)(calendar)(day, dir)
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
        mdl: mdl,
        calendar: mdl.Calendar.data
      }), m(CalendarBody, {
        mdl: mdl,
        calendar: mdl.Calendar.data
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
exports.calendarDay = exports.calendarModel = exports.getMonthMatrix = exports.createCalendarDayViewModel = exports.isNotCalenderDay = exports.isCalenderDay = exports.getMonthByIdx = exports.goToDate = void 0;

var _dateFns = require("date-fns");

var _Utils = require("Utils");

var updateYear = function updateYear(year, dir) {
  return (parseInt(year) + dir).toString();
};

var daysInMonth = function daysInMonth(month, year) {
  return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
};

var updateMonth = function updateMonth(month, dir) {
  return (parseInt(month) + dir).toString().length == 1 ? (0, _Utils.pad0Left)((parseInt(month) + dir).toString()) : (parseInt(month) + dir).toString();
};

var goToDate = function goToDate(mdl, _ref) {
  var year = _ref.year,
      month = _ref.month,
      day = _ref.day,
      dir = _ref.dir;
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

  m.route.set("/".concat(mdl.user.name, "/").concat((0, _Utils.shortDateString)({
    year: _year,
    month: _month,
    day: _day
  })));
};

exports.goToDate = goToDate;

var getMonthByIdx = function getMonthByIdx(idx) {
  return idx >= 12 ? _Utils.monthsOfTheYear[0] : idx < 0 ? _Utils.monthsOfTheYear[11] : _Utils.monthsOfTheYear[idx];
};

exports.getMonthByIdx = getMonthByIdx;

var isCalenderDay = function isCalenderDay(date) {
  return {
    day: (0, _dateFns.format)(date, "dd"),
    dir: 0
  };
};

exports.isCalenderDay = isCalenderDay;

var isNotCalenderDay = function isNotCalenderDay(day, date) {
  return {
    day: (0, _dateFns.format)(day, "dd"),
    dir: (0, _dateFns.differenceInMonths)((0, _dateFns.parseISO)((0, _Utils.shortDate)(date)), day) == 0 ? -1 : +1
  };
};

exports.isNotCalenderDay = isNotCalenderDay;

var createCalendarDayViewModel = function createCalendarDayViewModel(day, date, _ref2) {
  var isSameMonth = _ref2.isSameMonth;
  return isSameMonth ? isCalenderDay(day) : isNotCalenderDay(day, date);
};

exports.createCalendarDayViewModel = createCalendarDayViewModel;

var getMonthMatrix = function getMonthMatrix(_ref3) {
  var year = _ref3.year,
      month = _ref3.month;
  var date = new Date(parseInt(year), parseInt(month - 1));
  var matrix = (0, _dateFns.eachWeekOfInterval)({
    start: (0, _dateFns.startOfMonth)(date),
    end: (0, _dateFns.endOfMonth)(date)
  }, {
    weekStartsOn: 1
  });
  return matrix.map(function (weekDay) {
    return (0, _dateFns.eachDayOfInterval)({
      start: (0, _dateFns.startOfISOWeek)(weekDay),
      end: (0, _dateFns.endOfISOWeek)(weekDay)
    }).map(function (day) {
      return createCalendarDayViewModel(day, date, {
        isSameMonth: (0, _dateFns.isSameMonth)(date, day)
      });
    });
  });
};

exports.getMonthMatrix = getMonthMatrix;

var calendarModel = function calendarModel(_ref4) {
  var _ref4$invites = _ref4.invites,
      invites = _ref4$invites === void 0 ? [] : _ref4$invites,
      _ref4$date = _ref4.date,
      date = _ref4$date === void 0 ? (0, _Utils.shortDate)() : _ref4$date;

  var _date = (0, _Utils.shortDate)(date).split("-");

  var today = (0, _Utils.shortDate)(new Date()).split("-");
  var year = _date[0];
  var month = _date[1];
  var day = _date[2];
  var dto = {
    invites: invites,
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

var calendarDay = function calendarDay(_ref5) {
  var today = _ref5.today,
      selected = _ref5.selected;
  return function (currentDay, dir) {
    if (dir !== 0) {
      return "notThisMonth";
    }

    if ((0, _Utils.isEqual)(today.day, currentDay) && (0, _Utils.isEqual)(today.month, selected.month) && (0, _Utils.isEqual)(today.year, selected.year)) {
      return "isToday";
    }

    if ((0, _Utils.isEqual)(currentDay, selected.day)) {
      return "selectedDay";
    }
  };
};

exports.calendarDay = calendarDay;
});

;require.register("Components/component.js", function(exports, require, module) {
"use strict";

var Component = function Component() {
  return {
    view: function view() {
      return m(".");
    }
  };
};
});

;require.register("Components/day.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Day = exports.Hour = void 0;

var _Components = require("Components");

var _Utils = require("Utils");

var Hour = function Hour() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          hour = _ref$attrs.hour,
          time = _ref$attrs.time,
          events = _ref$attrs.events;
      return m(".frow ", m(".hour ", [m("p.hour-time", {
        id: time
      }, time), [m(_Components.InvitesList, {
        mdl: mdl,
        events: events
      }), m(".half-hour", m(".top")), m(".half-hour", m(".bottom"))]]));
    }
  };
};

exports.Hour = Hour;

var Day = function Day(_ref2) {
  var mdl = _ref2.attrs.mdl;
  var state = {
    error: null,
    data: null,
    status: "loading"
  };

  var _dom;

  var planDay = function planDay(mdl) {
    return function (_ref3) {
      var dom = _ref3.dom;

      // _dom = dom
      if (mdl.toAnchor()) {
        console.log("anchor", mdl.toAnchor(), dom, dom.querySelector("".concat(mdl.toAnchor().toString())));
        var el = document.getElementById(mdl.toAnchor());
        console.log("el", el);
      }

      mdl.updateDay(false);
    };
  };

  return {
    // oninit: load,
    // oncreate: ({ attrs: { mdl } }) => planDay(mdl),
    // onupdate: ({ attrs: { mdl } }) =>
    //   mdl.updateDay() && planDay(mdl)({ dom: _dom }),
    view: function view(_ref4) {
      var _ref4$attrs = _ref4.attrs,
          mdl = _ref4$attrs.mdl,
          invites = _ref4$attrs.invites;
      return m(".day", m(".frow-container", [m(".".concat(mdl.state.modal() ? "bg-warn" : "bg-info"), m("button.frow.width-100", {
        onclick: function onclick(e) {
          return mdl.state.modal(!mdl.state.modal());
        }
      }, mdl.state.modal() ? "Cancel" : "Add Event")), m(".day-container", [mdl.state.modal() && m(_Components.Editor, {
        mdl: mdl
      }), (0, _Utils.getHoursInDay)(mdl.timeFormats[mdl.format()]).map(function (hour, idx) {
        // console.log("day", invites[hour])
        return m(Hour, {
          mdl: mdl,
          hour: invites[hour],
          time: hour,
          events: invites[hour]
        });
      })])]));
    }
  };
};

exports.Day = Day;
});

;require.register("Components/editor.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;

var _Components = require("Components");

var _Utils = require("Utils");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var submitEventTask = function submitEventTask(http) {
  return function (mdl) {
    return function (_ref) {
      var allday = _ref.allday,
          startTime = _ref.startTime,
          endTime = _ref.endTime,
          title = _ref.title,
          notes = _ref.notes;

      var getHour = function getHour(time) {
        return time.split(":")[0];
      };

      var getMin = function getMin(time) {
        return time.split(":")[1];
      };

      var _mdl$selectedDate = mdl.selectedDate,
          year = _mdl$selectedDate.year,
          month = _mdl$selectedDate.month,
          day = _mdl$selectedDate.day;
      var url = "data/Events";
      var dto = {
        endTime: new Date(year, month - 1, day, getHour(endTime), getMin(endTime)),
        startTime: new Date(year, month - 1, day, getHour(startTime), getMin(startTime)),
        // shortDate,
        notes: notes,
        title: title,
        allday: allday,
        createdBy: mdl.user.objectId
      };
      return http.backEnd.postTask(mdl)(url)(dto).chain(function (_ref2) {
        var objectId = _ref2.objectId,
            ownerId = _ref2.ownerId,
            endTime = _ref2.endTime,
            startTime = _ref2.startTime,
            allDay = _ref2.allDay,
            title = _ref2.title;
        var eventId = objectId;
        return http.backEnd.postTask(mdl)("data/Invites")({
          eventId: eventId,
          userId: ownerId,
          status: "accept",
          endTime: endTime,
          startTime: startTime,
          allDay: allDay,
          title: title
        }).chain(function (_ref3) {
          var objectId = _ref3.objectId;
          var inviteId = objectId;
          return _data.default.of(function (user) {
            return function (event) {
              return {
                user: user,
                event: event
              };
            };
          }).ap(http.backEnd.postTask(mdl)("data/Users/".concat(mdl.user.objectId, "/invites%3AInvites%3An"))([inviteId])).ap(http.backEnd.postTask(mdl)("data/Events/".concat(eventId, "/invites%3AInvites%3An"))([inviteId]));
        });
      });
    };
  };
};

var EventForm = function EventForm(_ref4) {
  var _ref4$attrs = _ref4.attrs,
      state = _ref4$attrs.state,
      mdl = _ref4$attrs.mdl;
  return {
    view: function view() {
      return m("form.event-form", [m("label", m("input", {
        onchange: function onchange(e) {
          return m.route.set("/".concat(mdl.user.name, "/").concat(shortDate(state.shortDate)));
        },
        type: "date",
        value: state.shortDate,
        disabled: state.allday
      })), m(".frow row", [[m("label.col-xs-1-3", m("input", {
        oninput: function oninput(e) {
          return state.startTime = e.target.value;
        },
        value: state.startTime,
        type: "time",
        disabled: state.allday
      }), "Start Time"), m("label.col-xs-1-3", m("input", {
        oninput: function oninput(e) {
          return state.endTime = e.target.value;
        },
        value: state.endTime,
        type: "time",
        disabled: state.allday
      }), "End Time")], m("label.col-xs-1-3.pt-15 pl-60", m("input", {
        type: "checkbox",
        checked: state.allday,
        onclick: function onclick(e) {
          return state.allday = !state.allday;
        }
      }), "All Day")]), m("label", m("input", {
        type: "text",
        value: state.text,
        oninput: function oninput(e) {
          return state.title = e.target.value;
        }
      }), "Title"), m("label", m("input", {
        type: "text",
        value: state.notes,
        oninput: function oninput(e) {
          return state.notes = e.target.value;
        }
      }), "Notes")]);
    }
  };
};

var Editor = function Editor(_ref5) {
  var mdl = _ref5.attrs.mdl;
  var state = {
    shortDate: mdl.currentShortDate(),
    allday: false,
    startTime: "",
    endTime: "",
    title: "",
    notes: ""
  };

  var addNewEvent = function addNewEvent(state, mdl) {
    var onError = function onError(state) {
      return function (err) {
        state.error = err;
        state.status = "failed";
      };
    };

    var onSuccess = function onSuccess(mdl, state) {
      return function (data) {
        state.error = null;
        state.status = "success";
        mdl.updateDay(true);
        mdl.state.modal(false);
      };
    };

    submitEventTask(_Utils.HTTP)(mdl)(state).chain(function () {
      return mdl.reloadInvites();
    }).fork(onError(state), onSuccess(mdl, state));
  };

  return {
    view: function view(_ref6) {
      var mdl = _ref6.attrs.mdl;
      return m(_Components.Modal, {
        mdl: mdl
      }, {
        header: m("h3", "Add Event"),
        body: m(EventForm, {
          mdl: mdl,
          state: state
        }),
        footer: m("button", {
          onclick: function onclick(e) {
            return addNewEvent(state, mdl);
          }
        }, "Submit")
      });
    }
  };
};

exports.Editor = Editor;
});

;require.register("Components/hour.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hour = void 0;

var _Components = require("Components");

var Hour = function Hour() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          hour = _ref$attrs.hour,
          time = _ref$attrs.time,
          events = _ref$attrs.events;
      return m(".frow ", m(".hour ", [m("p.hour-time", {
        id: time
      }, time), [m(_Components.EventsList, {
        mdl: mdl,
        events: events
      }), m(".half-hour", m(".top")), m(".half-hour", m(".bottom"))]]));
    }
  };
};

exports.Hour = Hour;
});

;require.register("Components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calendar = require("./calendar/calendar.js");

Object.keys(_calendar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _calendar[key];
    }
  });
});

var _day = require("./day.js");

Object.keys(_day).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _day[key];
    }
  });
});

var _modal = require("./modal.js");

Object.keys(_modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modal[key];
    }
  });
});

var _editor = require("./editor.js");

Object.keys(_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editor[key];
    }
  });
});

var _invitesList = require("./invites-list.js");

Object.keys(_invitesList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _invitesList[key];
    }
  });
});

var _navLink = require("./nav-link.js");

Object.keys(_navLink).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _navLink[key];
    }
  });
});
});

;require.register("Components/invites-list.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvitesList = void 0;

var _dateFns = require("date-fns");

var _Utils = require("Utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Invite = function Invite(_ref) {
  var mdl = _ref.attrs.mdl;

  var getHeight = function getHeight(_ref2, _ref3) {
    var _ref4 = _slicedToArray(_ref2, 2),
        startHour = _ref4[0],
        startMin = _ref4[1];

    var _ref5 = _slicedToArray(_ref3, 2),
        endHour = _ref5[0],
        endMin = _ref5[1];

    var startDate = (0, _Utils.getFullDate)(mdl.selectedDate, startHour, startMin);
    var endDate = (0, _Utils.getFullDate)(mdl.selectedDate, endHour, endMin);
    return (0, _dateFns.differenceInMinutes)(startDate, endDate);
  };

  return {
    view: function view(_ref6) {
      var _ref6$attrs = _ref6.attrs,
          mdl = _ref6$attrs.mdl,
          invite = _ref6$attrs.invite,
          col = _ref6$attrs.col;
      // console.log(
      //   invite,
      //   differenceInMinutes(
      //     new Date(invite.endTime),
      //     new Date(invite.startTime)
      //   ) * 2
      // )
      return m(".col-xs-1-".concat(col + 2), m(".invite-list-item ", {
        onclick: function onclick(e) {
          mdl.currentEventId(invite.eventId);
          m.route.set("/".concat(mdl.user.name, "/").concat(mdl.currentShortDate(), "/").concat(invite.start.hour, "/").concat(invite.start.min));
        },
        style: {
          top: "".concat(invite.start.min, "px"),
          height: "".concat((0, _dateFns.differenceInMinutes)(new Date(invite.endTime), new Date(invite.startTime)) * 2, "px")
        }
      }, invite.title));
    }
  };
};

var InvitesList = function InvitesList(_ref7) {
  var mdl = _ref7.attrs.mdl;
  return {
    view: function view(_ref8) {
      var events = _ref8.attrs.events;
      return m(".invite-list frow ", events.map(function (invite, idx) {
        return m(Invite, {
          mdl: mdl,
          invite: invite,
          col: events.length,
          key: idx
        });
      }));
    }
  };
};

exports.InvitesList = InvitesList;
});

;require.register("Components/modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var Modal = function Modal() {
  return {
    view: function view(_ref) {
      var children = _ref.children;
      return m(".modal-container", m(".frow-container", children.map(function (child) {
        return m(".modal.frow column-center", [m(".modal-header", child.header), m(".modal-body", child.body), m(".modal-footer", child.footer)]);
      })));
    }
  };
};

exports.Modal = Modal;
});

;require.register("Components/nav-link.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLink = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlers = function handlers(types, fn) {
  return types.reduce(function (acc, type) {
    return Object.assign(acc, _defineProperty({}, type, fn));
  }, {});
};

var NavLink = function NavLink() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          href = _ref$attrs.href,
          link = _ref$attrs.link,
          classList = _ref$attrs.classList,
          rest = _objectWithoutProperties(_ref$attrs, ["mdl", "href", "link", "classList"]);

      return m(m.route.Link, _objectSpread(_objectSpread({}, handlers(["onclick", "onmouseover", "onmouseout"], function (e) {
        return console.log(e.type);
      })), {}, {
        href: href,
        class: "nav-link ".concat(classList, " ").concat(mdl.state.navSelected() == link && "shadow")
      }, rest), link);
    }
  };
};

exports.NavLink = NavLink;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.eventModel = exports.inviteModel = exports.dayModel = void 0;

var _model = require("Components/calendar/model");

var _Utils = require("Utils");

var dayModel = function dayModel(mdl) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  return (0, _Utils.getHoursInDay)(mdl.timeFormats[mdl.format()]).reduce(function (day, hour) {
    day[hour] = [];
    return day;
  }, {});
};

exports.dayModel = dayModel;

var inviteModel = function inviteModel() {
  return {
    eventId: "",
    status: "",
    userId: ""
  };
};

exports.inviteModel = inviteModel;

var eventModel = function eventModel() {
  return {};
};

exports.eventModel = eventModel;
var model = {
  currentEventId: Stream(null),
  updateDay: Stream(false),
  toAnchor: Stream(false),
  timeFormats: ["12hrs", "24hrs"],
  format: Stream(1),
  currentShortDate: Stream(""),
  currentLongDate: Stream(""),
  selectedDate: {
    year: "",
    month: "",
    day: ""
  },
  Calendar: {
    data: {} //calendarModel(),

  },
  Day: {
    timeFormat: Stream("kk:mm"),
    data: dayModel({
      timeFormats: ["24hrs"],
      format: Stream(0)
    }, new Date())
  },
  state: {
    isAuth: Stream(false),
    modal: Stream(false),
    isLoading: Stream(false),
    loadingProgress: {
      max: 0,
      value: 0
    },
    isLoggedIn: function isLoggedIn() {
      return sessionStorage.getItem("token");
    }
  },
  settings: {
    profile: "",
    inspector: ""
  },
  slug: ""
};
var _default = model;
exports.default = _default;
});

;require.register("Pages/Auth/Validations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginTask = exports.validateUserRegistrationTask = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

var _Utils = require("Utils");

var ValidateRegistration = (0, _data.Success)((0, _ramda.curryN)(3, _ramda.identity));
var ValidateLogin = (0, _data.Success)((0, _ramda.curryN)(2, _ramda.identity));
var nameLense = (0, _ramda.lensProp)("name");
var passwordLense = (0, _ramda.lensProp)("password");
var passwordConfirmLense = (0, _ramda.lensProp)("confirmPassword");
var emailLense = (0, _ramda.lensProp)("email");
var emailConfirmLense = (0, _ramda.lensProp)("confirmEmail");
var NAME_REQUIRED_MSG = "A Name is required";
var PASSWORD_REQUIRED_MSG = "A Password is required";
var EMAIL_REQUIRED_MSG = "An Email is required";
var EMAILS_MUST_MATCH = "Emails do not match";
var INVALID_EMAIL_FORMAT = "Email must be a valid format";
var PASSWORDS_MUST_MATCH = "Passwords do not match";

var inputsMatch = function inputsMatch(input1) {
  return function (input2) {
    return input2 === input1;
  };
};

var validateName = function validateName(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, nameLense, NAME_REQUIRED_MSG, data));
};

var validateEmails = function validateEmails(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, emailLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.isRequired, emailConfirmLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(inputsMatch(data.confirmEmail), emailLense, EMAILS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(inputsMatch(data.email), emailConfirmLense, EMAILS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailConfirmLense, INVALID_EMAIL_FORMAT, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailLense, INVALID_EMAIL_FORMAT, data));
};

var validateEmail = function validateEmail(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, emailLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailLense, INVALID_EMAIL_FORMAT, data));
};

var validatePasswords = function validatePasswords(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordConfirmLense, PASSWORD_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(inputsMatch(data.password), passwordConfirmLense, PASSWORDS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(inputsMatch(data.confirmPassword), passwordLense, PASSWORDS_MUST_MATCH, data));
};

var validatePassword = function validatePassword(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data));
};

var validateUserRegistrationTask = function validateUserRegistrationTask(data) {
  return ValidateRegistration.ap(validateName(data)).ap(validateEmails(data)).ap(validatePasswords(data)).failureMap(_ramda.mergeAll).toTask();
};

exports.validateUserRegistrationTask = validateUserRegistrationTask;

var validateLoginTask = function validateLoginTask(data) {
  return ValidateLogin.ap(validateEmail(data)).ap(validatePassword(data)).failureMap(_ramda.mergeAll).toTask();
};

exports.validateLoginTask = validateLoginTask;
});

;require.register("Pages/Auth/fns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkAccountTask = exports.createAccountTask = exports.registerUserTask = exports.loginTask = exports.loginUserTask = void 0;

var _Utils = require("Utils");

var _ramda = require("ramda");

var mergeCarts = function mergeCarts(accnt) {
  return function (cart) {
    return (0, _ramda.mergeDeepWith)(_ramda.add, cart, accnt);
  };
};

var toAccountVM = function toAccountVM(mdl) {
  return function (accnts) {
    var cart = mergeCarts(JSON.parse(accnts[0].cart))(mdl.cart);
    mdl.user.account = {
      objectId: accnts[0].objectId,
      cart: cart
    };
    mdl.user.address = JSON.parse(accnts[0].address);
    mdl.cart = cart;
    return cart;
  };
};

var setUserToken = function setUserToken(mdl) {
  return function (user) {
    sessionStorage.setItem("shindigit-user", JSON.stringify(user));
    sessionStorage.setItem("shindigit-user-token", user["user-token"]);
    mdl.state.isAuth(true);
    mdl.user = user;
    return user;
  };
};

var loginUserTask = function loginUserTask(mdl) {
  return function (_ref) {
    var email = _ref.email,
        password = _ref.password;
    return _Utils.HTTP.backEnd.postTask(mdl)("users/login")({
      login: email,
      password: password
    }).map(setUserToken(mdl));
  };
};

exports.loginUserTask = loginUserTask;

var getUserAccountTask = function getUserAccountTask(mdl) {
  return function (_) {
    return _Utils.HTTP.backEnd.getTask(mdl)("data/Accounts?where=userId%3D'".concat(mdl.user.objectId, "'")).map(toAccountVM(mdl));
  };
};

var loginTask = function loginTask(mdl) {
  return function (_ref2) {
    var email = _ref2.email,
        password = _ref2.password;
    return loginUserTask(mdl)({
      email: email,
      password: password
    });
  };
};

exports.loginTask = loginTask;

var registerUserTask = function registerUserTask(mdl) {
  return function (_ref3) {
    var name = _ref3.name,
        email = _ref3.email,
        password = _ref3.password,
        isAdmin = _ref3.isAdmin;
    return _Utils.HTTP.backEnd.postTask(mdl)("users/register")({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin
    });
  };
};

exports.registerUserTask = registerUserTask;

var createAccountTask = function createAccountTask(mdl) {
  return _Utils.HTTP.backEnd.postTask(mdl)("data/Accounts")({
    cart: JSON.stringify(mdl.cart),
    userId: mdl.user.objectId
  });
};

exports.createAccountTask = createAccountTask;

var linkAccountTask = function linkAccountTask(mdl) {
  return _Utils.HTTP.backEnd.postTask(mdl)("data/Users/".concat(mdl.user.objectId, "/account%3AAccounts%3A1"))([mdl.user.account.objectId]);
};

exports.linkAccountTask = linkAccountTask;
});

;require.register("Pages/Auth/login-user.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;

var _Components = require("Components");

var _Utils = require("Utils");

var _Validations = require("./Validations.js");

var _fns = require("./fns.js");

var validateForm = function validateForm(mdl) {
  return function (data) {
    var onError = function onError(errs) {
      if (errs) {
        state.errors = errs;
        state.errorMsg(errs.message);
        state.showErrorMsg(true);
        console.log("failed - state", state);
      } else {
        state.errorMsg("Issue with logging in. Have you registered?");
        state.showErrorMsg(true);
        console.log("failed - other?", state);
      }
    };

    var onSuccess = function onSuccess(mdl) {
      return function (account) {
        state.errors = {};
        mdl.user.account = account;
        m.route.set("/".concat(mdl.user.name, "/").concat((0, _Utils.shortDate)()));
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateLoginTask)(data.userModel).chain((0, _fns.loginTask)(mdl)).fork(onError, onSuccess(mdl));
  };
};

var userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false
};
var dataModel = {
  userModel: userModel
};
var state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: (0, _Utils.jsonCopy)(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream("")
};

var resetState = function resetState() {
  state.data = (0, _Utils.jsonCopy)(dataModel);
  state.errors = {};
  state.httpError = undefined;
  state.isSubmitted = false;
  state.showErrorMsg(false);
  state.errorMsg("");
};

var Login = function Login() {
  console.log("login");
  return {
    onremove: function onremove() {
      return resetState();
    },
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".frow centered pt-30", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container frow-center", {
        role: "form",
        id: "Login-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m("input.auth-input", {
        class: state.isSubmitted ? state.errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.email = e.target.value;
        },
        value: state.data.userModel.email
      }), state.errors.email && m("p.auth-input-hint", state.errors.email), m("input.auth-input", {
        class: state.isSubmitted ? state.errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.password = e.target.value;
        },
        value: state.data.userModel.password
      }), state.errors.password && m("p.auth-input-hint", state.errors.password)]), state.httpError && m(".toast toast-error", state.httpError)], m("a.button.auth-btn", {
        // type: "submit",
        form: "login-form",
        onclick: function onclick() {
          return validateForm(mdl)(state.data);
        },
        class: mdl.state.isLoading() && "loading"
      }, "Login"), m(m.route.Link, {
        href: "/register",
        class: "bold"
      }, "Need to  register ?"));
    }
  };
};

exports.Login = Login;
var _default = Login;
exports.default = _default;
});

;require.register("Pages/Auth/register-user.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Register = exports.validateForm = void 0;

var _Utils = require("Utils");

var _Validations = require("./Validations");

var _fns = require("./fns.js");

var userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: ""
};
var dataModel = {
  userModel: userModel
};
var state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: (0, _Utils.jsonCopy)(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream("")
};

var resetState = function resetState() {
  state.data = (0, _Utils.jsonCopy)(dataModel);
  state.errors = {};
  state.httpError = undefined;
  state.isSubmitted = false;
  state.showErrorMsg(false);
  state.errorMsg("");
};

var validateForm = function validateForm(mdl) {
  return function (data) {
    var onError = function onError(errs) {
      if (errs) {
        state.errors = errs;
        state.errorMsg(errs.message);
        state.showErrorMsg(true);
        console.log("failed - state", state);
      } else {
        state.errorMsg("There seems to be a problem please contact web support");
        state.showErrorMsg(true);
        console.log("failed - state", state);
      }
    };

    var onSuccess = function onSuccess(mdl) {
      return function (data) {
        console.log(mdl, data);
        state.errors = {};
        sessionStorage.setItem("shindigit-user-token", mdl.user["user-token"]);
        sessionStorage.setItem("shindigit-user", JSON.stringify(mdl.user));
        m.route.set("/".concat(mdl.user.name, "/").concat((0, _Utils.shortDate)()));
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateUserRegistrationTask)(data.userModel).chain((0, _fns.registerUserTask)(mdl)).chain(function (_) {
      return (0, _fns.loginUserTask)(mdl)({
        email: data.userModel.email,
        password: data.userModel.password
      });
    }).fork(onError, onSuccess(mdl));
  };
};

exports.validateForm = validateForm;

var RegisterUser = function RegisterUser() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          data = _ref$attrs.data,
          errors = _ref$attrs.errors,
          isSubmitted = _ref$attrs.isSubmitted;
      return [m("input.auth-input", {
        class: isSubmitted ? errors.name ? "has-error" : "has-success" : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: function onkeyup(e) {
          return data.name = e.target.value;
        },
        value: data.name
      }), errors.name && m("p.auth-input-hint", errors.name), m("input.auth-input", {
        class: isSubmitted ? errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          return data.email = e.target.value;
        },
        value: data.email
      }), errors.email && m("p.auth-input-hint", errors.email), m("input.auth-input", {
        id: "confirmEmail",
        class: isSubmitted ? errors.confirmEmail ? "has-error" : "has-success" : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: function onkeyup(e) {
          return data.confirmEmail = e.target.value;
        },
        value: data.confirmEmail
      }), errors.confirmEmail && m("p.auth-input-hint", errors.confirmEmail), m("input.auth-input", {
        class: isSubmitted ? errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          return data.password = e.target.value;
        },
        value: data.password
      }), errors.password && m("p.auth-input-hint", errors.password), m("input.auth-input", {
        class: isSubmitted ? errors.confirmPassword ? "has-error" : "has-success" : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: function onkeyup(e) {
          return data.confirmPassword = e.target.value;
        },
        value: data.confirmPassword
      }), errors.confirmPassword && m("p.auth-input-hint", errors.confirmPassword)];
    }
  };
};

var Register = function Register() {
  return {
    onremove: function onremove() {
      return resetState();
    },
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return [m(".frow centered pt-30", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container column-center", {
        role: "form",
        id: "Register-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m(RegisterUser, {
        data: state.data.userModel,
        errors: state.errors,
        isSubmitted: state.isSubmitted
      }), m("a.button.auth-btn", {
        form: "register-form",
        onclick: function onclick() {
          return validateForm(mdl)(state.data);
        },
        class: mdl.state.isLoading() && "loading"
      }, "Register"), m(m.route.Link, {
        href: "/login",
        class: "bold"
      }, "Need to  login ?")])]), state.httpError && m(".toast toast-error", state.httpError)];
    }
  };
};

exports.Register = Register;
var _default = Register;
exports.default = _default;
});

;require.register("Pages/event.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;

var _Utils = require("Utils");

var _Utils2 = require("../Utils");

var deleteEvent = function deleteEvent(mdl) {
  var _m$route$param = m.route.param(),
      date = _m$route$param.date,
      hour = _m$route$param.hour,
      min = _m$route$param.min;

  delete mdl.Day.data["".concat(hour, ":00")][min];
  localStorage.setItem(date, JSON.stringify(mdl.Day.data));
};

var toEventviewModel = function toEventviewModel(event) {
  console.log("event", event);
  console.log("start date", event.startTime, (0, _Utils2.fromFullDate)(event.startTime));
  return event;
};

var Event = function Event(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    error: {},
    eventId: mdl.currentEventId(),
    status: "loading"
  };

  var loadTask = function loadTask(http) {
    return function (mdl) {
      return http.backEnd.getTask(mdl)("data/Events/".concat(state.eventId)).map(toEventviewModel).map((0, _Utils.log)("wtf"));
    };
  };

  var onError = function onError(err) {
    state.error = (0, _Utils.jsonCopy)(err);
    console.log("state.e", state.error);
    state.status = "failed";
  };

  var onSuccess = function onSuccess(event) {
    state.event = event;
    state.error = {};
    state.status = "success";
  };

  var load = function load(_ref2) {
    var mdl = _ref2.attrs.mdl;
    loadTask(_Utils.HTTP)(mdl).fork(onError, onSuccess);
  };

  return {
    oninit: load,
    view: function view() {
      return m(".event", [state.status == "loading" && m(".", "Fetching Event..."), state.status == "failed" && m(".code", state.error.message), state.status == "success" && m(".event-container", [m("button", {
        onclick: function onclick(e) {
          mdl.toAnchor(state.event.startTime);
          gotoroute(mdl);
        }
      }, "Back"), m("h1", state.event.title), m("label", "date: ", state.event.date), m("label", "begins: ", state.event.startTime), m("label", "ends: ", state.event.endTime), m("label", "notes: ", state.event.notes), m("button", {
        onclick: function onclick(e) {
          return deleteEvent(mdl);
        }
      }, "delete")])]);
    }
  };
};

exports.Event = Event;
});

;require.register("Pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _Components = require("Components");

var _Utils = require("Utils");

var _Models = require("Models");

var _ramda = require("ramda");

var _model = require("Components/calendar/model");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toDayViewModel = function toDayViewModel(dayViewModel, invite) {
  dayViewModel["".concat(invite.start.hour, ":00")].push(invite);
  return dayViewModel;
};

var toInviteViewModel = function toInviteViewModel(_ref) {
  var startTime = _ref.startTime,
      endTime = _ref.endTime,
      title = _ref.title,
      objectId = _ref.objectId,
      eventId = _ref.eventId,
      status = _ref.status;
  return {
    startTime: startTime,
    endTime: endTime,
    start: (0, _Utils.fromFullDate)(startTime),
    end: (0, _Utils.fromFullDate)(endTime),
    inviteId: objectId,
    eventId: eventId,
    title: title,
    status: status
  };
};

var Home = function Home(_ref2) {
  var mdl = _ref2.attrs.mdl;
  var state = {
    error: null,
    status: "loading",
    invites: null,
    events: null
  };

  var loadTask = function loadTask(http) {
    return function (mdl) {
      return http.backEnd.getTask(mdl)("data/Invites?where=userId%3D'".concat(mdl.user.objectId, "'")).map((0, _ramda.map)(toInviteViewModel));
    };
  };

  var onError = function onError(err) {
    state.error = err;
    state.status = "failed";
  };

  var onSuccess = function onSuccess(invites) {
    state.invites = invites;
    state.todaysInvites = invites.filter(function (i) {
      return (0, _Utils.datesAreSame)(i.startTime)((0, _Utils.shortDateString)(mdl.selectedDate));
    }).reduce(toDayViewModel, (0, _Models.dayModel)(mdl, mdl.currentShortDate()));
    state.error = null;
    state.status = "success";
  };

  var load = function load(_ref3) {
    var mdl = _ref3.attrs.mdl;
    loadTask(_Utils.HTTP)(mdl).fork(onError, onSuccess);
  };

  return {
    oninit: load,
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return m(".frow", [m(_Components.Calendar, {
        mdl: mdl,
        calendar: (0, _model.calendarModel)({
          invites: state.invites,
          date: mdl.currentShortDate()
        }),
        invites: state.invites
      }), state.status == "loading" && m("p", "FETCHING EVENTS..."), state.status == "failed" && m("p", "FAILED TO FETCH EVENTS"), state.status == "success" && m(_Components.Day, {
        mdl: mdl,
        invites: state.todaysInvites
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

var _event = require("./event.js");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _event[key];
    }
  });
});

var _loginUser = require("./Auth/login-user");

Object.keys(_loginUser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loginUser[key];
    }
  });
});

var _registerUser = require("./Auth/register-user");

Object.keys(_registerUser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _registerUser[key];
    }
  });
});
});

;require.register("Routes/authenticated-routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pages = require("Pages");

var _Utils = require("Utils");

var _model = require("Components/calendar/model");

var AuthenticatedRoutes = [{
  id: "profile",
  name: "Profile",
  // icon: Icons.logo,
  route: "/profile/:name",
  position: ["toolbar"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _Utils.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_Pages.Home, {
      mdl: mdl
    });
  }
}, {
  id: "day-planner",
  name: "Day Planner",
  // icon: Icons.logo,
  route: "/:username/:date",
  position: ["toolbar"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _Utils.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    var date = args.date;

    var _d = date.split("-");

    mdl.currentShortDate(date);
    mdl.currentLongDate(new Date(date));
    mdl.selectedDate = {
      year: _d[0],
      month: _d[1],
      day: _d[2]
    };
    mdl.Calendar.data = (0, _model.calendarModel)({
      invites: [],
      date: date
    });
  },
  component: function component(mdl) {
    return [m(_Pages.Home, {
      mdl: mdl,
      key: new Date()
    })];
  }
}, {
  id: "event",
  name: "Event",
  // icon: Icons.logo,
  route: "/:username/:date/:hour/:min",
  position: ["toolbar"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _Utils.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_Pages.Event, {
      mdl: mdl,
      key: mdl.currentLongDate()
    });
  }
}, {
  id: "logout",
  name: "",
  // icon: Icons.users,
  route: "/logout",
  position: [],
  group: ["authenticated", "admin"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    localStorage.clear();
    sessionStorage.clear();
    mdl.state.isAuth(false);
    mdl.user = {};
    m.route.set(m.route.get());
    console.log("loggout", mdl);
  },
  component: function component(mdl) {
    return m(_Pages.Home, {
      mdl: mdl
    });
  }
}];
var _default = AuthenticatedRoutes;
exports.default = _default;
});

;require.register("Routes/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticatedRoutes = _interopRequireDefault(require("./authenticated-routes.js"));

var _mainRoutes = _interopRequireDefault(require("./main-routes.js"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = (0, _ramda.flatten)([_mainRoutes.default, _authenticatedRoutes.default]);
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

var _index = require("Utils/index.js");

var Routes = [{
  id: "shindig-it",
  name: m(".Logo"),
  // icon: Icons.home,
  route: "/splash",
  isNav: true,
  group: ["toolbar"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_Pages.Home, {
      mdl: mdl
    });
  }
}, {
  id: "login",
  name: "Account Login",
  // icon: Icons.search,
  route: "/login",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_Pages.Login, {
      mdl: mdl
    });
  }
}, {
  id: "register",
  name: "Register Account",
  // icon: Icons.search,
  route: "/register",
  isNav: false,
  group: [],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor ? (0, _index.scrollToAnchor)(mdl.state.anchor) : window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  component: function component(mdl) {
    return m(_Pages.Register, {
      mdl: mdl
    });
  }
}];
var _default = Routes;
exports.default = _default;
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

;require.register("Utils/.secrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackEnd = void 0;

//NEED TO MOVE THESE TO ENVIRONMENT/GITLAB IN PRODUCTION for manifest
var getUserToken = function getUserToken() {
  return sessionStorage.getItem("shindigit-user-token") ? sessionStorage.getItem("shindigit-user-token") : "";
};

var BackEnd = {
  API_KEY: "3E894DDB-58BB-4F18-9E1D-809BBF807C1C",
  APP_ID: "854DB087-FA48-0CF1-FFEE-7660CF37E100",
  baseUrl: "https://api.backendless.com",
  headers: function headers() {
    return {
      "user-token": getUserToken()
    };
  }
};
exports.BackEnd = BackEnd;
});

;require.register("Utils/http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTP = exports.parseHttpSuccess = exports.parseHttpError = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _secrets = require("./.secrets.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var onProgress = function onProgress(mdl) {
  return function (e) {
    if (e.lengthComputable) {
      mdl.state.loadingProgress.max = e.total;
      mdl.state.loadingProgress.value = e.loaded;
      m.redraw();
    }
  };
};

function onLoad() {
  return false;
}

var onLoadStart = function onLoadStart(mdl) {
  return function (e) {
    mdl.state.isLoading(true);
    return false;
  };
};

var onLoadEnd = function onLoadEnd(mdl) {
  return function (e) {
    mdl.state.isLoading(false);
    mdl.state.loadingProgress.max = 0;
    mdl.state.loadingProgress.value = 0;
    return false;
  };
};

var xhrProgress = function xhrProgress(mdl) {
  return {
    config: function config(xhr) {
      xhr.onprogress = onProgress(mdl);
      xhr.onload = onLoad;
      xhr.onloadstart = onLoadStart(mdl);
      xhr.onloadend = onLoadEnd(mdl);
    }
  };
};

var parseHttpError = function parseHttpError(mdl) {
  return function (rej) {
    return function (e) {
      mdl.state.isLoading(false);
      return rej(e.response);
    };
  };
};

exports.parseHttpError = parseHttpError;

var parseHttpSuccess = function parseHttpSuccess(mdl) {
  return function (res) {
    return function (data) {
      mdl.state.isLoading(false);
      return res(data);
    };
  };
};

exports.parseHttpSuccess = parseHttpSuccess;

var getUserToken = function getUserToken() {
  return window.sessionStorage.getItem("user-token") ? window.sessionStorage.getItem("user-token") : "";
};

var HttpTask = function HttpTask(_headers) {
  return function (method) {
    return function (mdl) {
      return function (url) {
        return function (body) {
          mdl.state.isLoading(true);
          return new _data.default(function (rej, res) {
            return m.request(_objectSpread({
              method: method,
              url: url,
              headers: _objectSpread({
                "content-type": "application/json"
              }, _headers),
              body: body,
              withCredentials: false
            }, xhrProgress(mdl))).then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej));
          });
        };
      };
    };
  };
};

var backEndUrl = "".concat(_secrets.BackEnd.baseUrl, "/").concat(_secrets.BackEnd.APP_ID, "/").concat(_secrets.BackEnd.API_KEY, "/");
var backEnd = {
  getTask: function getTask(mdl) {
    return function (url) {
      return HttpTask(_secrets.BackEnd.headers())("GET")(mdl)(backEndUrl + url)(null);
    };
  },
  postTask: function postTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.BackEnd.headers())("POST")(mdl)(backEndUrl + url)(dto);
      };
    };
  },
  putTask: function putTask(mdl) {
    return function (url) {
      return function (dto) {
        return HttpTask(_secrets.BackEnd.headers())("PUT")(mdl)(backEndUrl + url)(dto);
      };
    };
  }
};
var HTTP = {
  backEnd: backEnd,
  HttpTask: HttpTask
};
exports.HTTP = HTTP;
});

;require.register("Utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  log: true,
  randomPause: true,
  Pause: true,
  NoOp: true,
  nameFromRoute: true,
  jsonCopy: true,
  isSideBarActive: true,
  range: true,
  isEqual: true
};
exports.isEqual = exports.range = exports.isSideBarActive = exports.jsonCopy = exports.nameFromRoute = exports.NoOp = exports.Pause = exports.randomPause = exports.log = void 0;

var _http = require("./http.js");

Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _http[key];
    }
  });
});

var _localStorage = require("./local-storage.js");

Object.keys(_localStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _localStorage[key];
    }
  });
});

var _validations = require("./validations");

Object.keys(_validations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validations[key];
    }
  });
});

var _timeFns = require("./time-fns.js");

Object.keys(_timeFns).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timeFns[key];
    }
  });
});

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

var isEqual = function isEqual(a, b) {
  return JSON.stringify(a) == JSON.stringify(b);
};

exports.isEqual = isEqual;
});

;require.register("Utils/local-storage.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locals = void 0;

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newTaskFromPromise = function newTaskFromPromise(p) {
  return new _data.default(function (res, rej) {
    return p.then(res, rej);
  });
};

var locals = {
  getTask: function getTask(key) {
    return newTaskFromPromise(new Promise(function (_, res) {
      return localStorage.getItem(key) ? res(JSON.parse(localStorage.getItem(key))) : res(null);
    } // hack just for now
    ));
  },
  setTask: function setTask(key) {
    return function (value) {
      return newTaskFromPromise(new Promise(function (res) {
        return res(localStorage.setItem(key, value));
      }));
    };
  }
};
exports.locals = locals;
});

;require.register("Utils/time-fns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortDateString = exports.toHourViewModel = exports.getFullDate = exports.fromFullDate = exports.monthsOfTheYear = exports.daysOfTheWeek = exports.isToday = exports.datesAreSame = exports.isLeapYear = exports.shortDate = exports.getHoursInDay = exports.pad0Left = exports.pad00Min = exports.padding = void 0;

var _index = require("./index");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var padding = function padding(d) {
  return d.toString().length == 1 ? pad0Left(d) : d;
};

exports.padding = padding;

var pad00Min = function pad00Min(num) {
  return "".concat(num, ":00");
};

exports.pad00Min = pad00Min;

var pad0Left = function pad0Left(num) {
  return "0".concat(num);
};

exports.pad0Left = pad0Left;

var getHoursInDay = function getHoursInDay(format) {
  return (0, _index.range)(format == "24hrs" ? 24 : 12).map(function (n) {
    return n.toString().length == 1 ? pad0Left(n) : n;
  }).map(pad00Min);
};

exports.getHoursInDay = getHoursInDay;

var shortDate = function shortDate(date) {
  "double chec", date, new Date(date).toISOString().split("T")[0];
  return new Date(date).toISOString().split("T")[0];
};

exports.shortDate = shortDate;

var isLeapYear = function isLeapYear(year) {
  return year % 4 == 0 ? false : year % 100 == 0 ? year % 400 == 0 ? true : false : false;
};

exports.isLeapYear = isLeapYear;

var datesAreSame = function datesAreSame(first) {
  return function (second) {
    var f = (0, _moment.default)(first).utc().format("YYYY-MM-DD");
    var s = (0, _moment.default)(second).utc().format("YYYY-MM-DD");
    console.log("dd", f, s);
    return (0, _moment.default)(f).isSame((0, _moment.default)(s));
  };
};

exports.datesAreSame = datesAreSame;

var isToday = function isToday(someDate) {
  var today = new Date();
  var date = new Date(someDate);
  return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
};

exports.isToday = isToday;
var daysOfTheWeek = ["Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
exports.daysOfTheWeek = daysOfTheWeek;
var monthsOfTheYear = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthsOfTheYear = monthsOfTheYear;

var fromFullDate = function fromFullDate(date) {
  var d = new Date(date);
  return {
    day: padding(d.getDate()),
    month: padding(d.getMonth() + 1),
    year: d.getFullYear(),
    hour: padding(d.getHours()),
    min: padding(d.getMinutes())
  };
};

exports.fromFullDate = fromFullDate;

var getFullDate = function getFullDate(_ref, startHour, startMin) {
  var year = _ref.year,
      month = _ref.month,
      day = _ref.day;
  console.log("getFullDate", new Date(year, month - 1, day, startHour, startMin));
  return new Date(year, month - 1, day, startHour, startMin);
};

exports.getFullDate = getFullDate;

var toHourViewModel = function toHourViewModel(date) {
  return function (mdl, hour) {
    if (!mdl[date][hour]) {
      mdl[date][hour] = {};
    }

    return mdl;
  };
};

exports.toHourViewModel = toHourViewModel;

var shortDateString = function shortDateString(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day;
  return "".concat(year, "-").concat(padding(month), "-").concat(padding(day));
};

exports.shortDateString = shortDateString;
});

;require.register("Utils/validations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNilOrEmptyOrAtom = exports.allCaps = exports.inDateRange = exports.unique = exports.maxLengthNullable = exports.onlyNumeric = exports.urlFormat = exports.phoneFormat = exports.onlyAlphaNumericSpaceSpecial = exports.onlyAlphaNumericSpaceUnderscore = exports.onlyAlphaNumericSpace = exports.onlyAlphaNumericUnderscore = exports.onlyAlphaNumeric = exports.onlyAlpha = exports.emailFormat = exports.maxSize = exports.maxLength = exports.isNullOrEmpty = exports.isNotNullOrEmpty = exports.IsNotNil = exports.isRequired = exports.validate = exports.getOrElse = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

var _data2 = _interopRequireDefault(require("data.maybe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOrElse = function getOrElse(val) {
  return function (x) {
    return x.getOrElse(val);
  };
};

exports.getOrElse = getOrElse;
var validate = (0, _ramda.curry)(function (rule, lens, msg, data) {
  return rule((0, _ramda.view)(lens, data)) ? (0, _data.Success)(data) : (0, _data.Failure)([(0, _ramda.set)(lens, msg, {})]);
});
exports.validate = validate;
var isRequired = (0, _ramda.compose)(_ramda.not, _ramda.isEmpty);
exports.isRequired = isRequired;
var IsNotNil = (0, _ramda.compose)(_ramda.not, _ramda.isNil);
exports.IsNotNil = IsNotNil;

var isNotNullOrEmpty = function isNotNullOrEmpty(data) {
  return !isNullOrEmpty(data);
};

exports.isNotNullOrEmpty = isNotNullOrEmpty;

var isNullOrEmpty = function isNullOrEmpty(data) {
  return (0, _ramda.isNil)(data) || (0, _ramda.isEmpty)(data);
};

exports.isNullOrEmpty = isNullOrEmpty;

var maxLength = function maxLength(max) {
  return (0, _ramda.compose)((0, _ramda.gte)(max), _ramda.length);
};

exports.maxLength = maxLength;
var maxSize = (0, _ramda.curry)(function (max, value) {
  return (0, _ramda.gte)(max, value);
});
exports.maxSize = maxSize;
var emailFormat = (0, _ramda.test)(/@/);
exports.emailFormat = emailFormat;
var onlyAlpha = (0, _ramda.test)(/^[a-zA-Z]*$/);
exports.onlyAlpha = onlyAlpha;
var onlyAlphaNumeric = (0, _ramda.test)(/^[a-zA-Z0-9]*$/);
exports.onlyAlphaNumeric = onlyAlphaNumeric;
var onlyAlphaNumericUnderscore = (0, _ramda.test)(/^[a-zA-Z0-9_]*$/);
exports.onlyAlphaNumericUnderscore = onlyAlphaNumericUnderscore;
var onlyAlphaNumericSpace = (0, _ramda.test)(/^[a-zA-Z0-9\s]*$/);
exports.onlyAlphaNumericSpace = onlyAlphaNumericSpace;
var onlyAlphaNumericSpaceUnderscore = (0, _ramda.test)(/^[a-zA-Z0-9_\s]*$/);
exports.onlyAlphaNumericSpaceUnderscore = onlyAlphaNumericSpaceUnderscore;
var onlyAlphaNumericSpaceSpecial = (0, _ramda.test)(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+\s]*$/);
exports.onlyAlphaNumericSpaceSpecial = onlyAlphaNumericSpaceSpecial;
var phoneFormat = (0, _ramda.test)(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
exports.phoneFormat = phoneFormat;
var urlFormat = (0, _ramda.test)(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+]*$/);
exports.urlFormat = urlFormat;
var onlyNumeric = (0, _ramda.test)(/^[0-9]*$/);
exports.onlyNumeric = onlyNumeric;

var maxLengthNullable = function maxLengthNullable(max) {
  return (0, _ramda.compose)(getOrElse(false), (0, _ramda.map)((0, _ramda.gte)(max)), (0, _ramda.map)(_ramda.length), _data2.default.fromNullable);
};

exports.maxLengthNullable = maxLengthNullable;
var unique = (0, _ramda.curry)(function (keys, value) {
  var lookup = _data2.default.fromNullable(keys);

  return !(0, _ramda.contains)((0, _ramda.toUpper)(value.toString()), (0, _ramda.map)(function (y) {
    return (0, _ramda.toUpper)(y.toString());
  }, lookup.getOrElse([])));
});
exports.unique = unique;
var inDateRange = (0, _ramda.curry)(function (start, end, value) {
  if (value == null || value === "") {
    return true;
  }

  return new Date(start) <= new Date(value) && new Date(value) < new Date(end);
});
exports.inDateRange = inDateRange;

var allCaps = function allCaps(str) {
  return str.toUpperCase() === str;
};

exports.allCaps = allCaps;

var isNilOrEmptyOrAtom = function isNilOrEmptyOrAtom(item) {
  return (0, _ramda.isNil)(item) || (0, _ramda.isEmpty)(item) || item === "{$type:atom}";
};

exports.isNilOrEmptyOrAtom = isNilOrEmptyOrAtom;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _App = _interopRequireDefault(require("./App.js"));

var _Models = _interopRequireDefault(require("Models"));

var _funConfig = require("@boazblake/fun-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_funConfig.FunConfig.configure();

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
    var lastProfile = _Models.default.settings.profile;
    _Models.default.settings.profile = getProfile(w);
    if (lastProfile != _Models.default.settings.profile) m.redraw();
  }

  return requestAnimationFrame(checkWidth);
};

_Models.default.settings.profile = getProfile(winW);
checkWidth(winW);

if (sessionStorage.getItem("shindigit-user")) {
  _Models.default.user = JSON.parse(sessionStorage.getItem("shindigit-user"));

  _Models.default.state.isAuth(true);
}

m.route(root, "/login", (0, _App.default)(_Models.default));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  require("./index.js");
});
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map