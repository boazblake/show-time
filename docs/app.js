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
require.register(".secrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenCage = exports.BackEnd = void 0;

//NEED TO MOVE THESE TO ENVIRONMENT/GITLAB IN PRODUCTION for manifest
var getUserToken = function getUserToken() {
  return sessionStorage.getItem("shindigit-user-token") ? sessionStorage.getItem("shindigit-user-token") : "";
};

var OpenCage = {
  key: "c36ea23c619f436cba0eab3f939e6ed6",
  baseUrl: "https://api.opencagedata.com/geocode/v1/json",
  headers: function headers() {
    return {// "access-control-allow-origin": "*"
    };
  }
};
exports.OpenCage = OpenCage;
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

;require.register("App.js", function(exports, require, module) {
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
        mdl.State.anchor = path.split("#")[1];
        mdl.Sidebar.isShowing(false);
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

;require.register("Components/accordian-item.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordianItem = void 0;

var _cjs = require("@mithril-icons/clarity/cjs");

var AccordianItem = function AccordianItem() {
  return {
    view: function view(_ref) {
      var children = _ref.children,
          _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          state = _ref$attrs.state,
          data = _ref$attrs.data,
          part = _ref$attrs.part,
          title = _ref$attrs.title;
      return m(".accordian-item.full-width", [m(".accordian-item-title", [m(".frow", m(".col-xs-1-2", m("h4", title)), m(".frow row-end col-xs-1-3", m(".accordian-item-btn-".concat(state[part].show() ? "open" : "close"), {
        onclick: function onclick(e) {
          return state[part].show(!state[part].show());
        }
      }, m(_cjs.AngleLine))))]), state[part].show() && m(".accordian-item-body.column", [children])]);
    }
  };
};

exports.AccordianItem = AccordianItem;
});

;require.register("Components/attendance-response.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttendanceResponse = void 0;

var _Utils = require("Utils");

var _cjs = require("@mithril-icons/clarity/cjs");

var responses = function responses() {
  return [_cjs.SadFaceLine, _cjs.HappyFaceLine, _cjs.NeutralFaceLine];
};

var selectedResponses = [_cjs.SadFaceSolid, _cjs.HappyFaceSolid, _cjs.NeutralFaceSolid];

var getResponse = function getResponse(_ref) {
  var status = _ref.status;
  var rs = responses();
  rs.removeAt(status);
  rs.insertAt(status, selectedResponses[status]);
  return rs;
};

var AttendanceResponse = function AttendanceResponse() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          guest = _ref2$attrs.guest,
          updateInvite = _ref2$attrs.updateInvite;
      console.log("AttendanceResponse", guest);
      return m(".frow", getResponse(guest).map(function (response, idx) {
        return m(response, {
          onclick: function onclick(e) {
            if (guest.userId == mdl.User.objectId) {
              guest.status = idx;
              updateInvite(mdl)(guest);
            }
          }
        });
      }));
    }
  };
};

exports.AttendanceResponse = AttendanceResponse;
});

;require.register("Components/auth-layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLayout = void 0;
var Logo = m("img.frow", {
  src: "images/logo.svg",
  style: {
    paddingTop: "100px",
    height: "300px",
    width: "300px",
    margin: "0 auto"
  }
});
var AuthLayout = {
  view: function view(_ref) {
    var children = _ref.children;
    return m(".frow", [Logo, children]);
  }
};
exports.AuthLayout = AuthLayout;
});

;require.register("Components/calendar/calendar-model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendarDayStyle = exports.calendarModel = exports.createCalendar = exports.createCalendarDayViewModel = exports.isNotCalenderDay = exports.isCalenderDay = void 0;

var _dateFns = require("date-fns");

var _Utils = require("Utils");

var isCalenderDay = function isCalenderDay(invites, day) {
  return {
    day: day,
    dir: 0,
    invites: invites
  };
};

exports.isCalenderDay = isCalenderDay;

var isNotCalenderDay = function isNotCalenderDay(invites, day, date) {
  return {
    day: day,
    dir: day.isBefore(date) ? -1 : day.isAfter(date) ? 1 : 0,
    invites: invites
  };
};

exports.isNotCalenderDay = isNotCalenderDay;

var filterBy = function filterBy(day) {
  return function (invites) {
    return invites.filter(function (i) {
      return (0, _Utils.datesAreSame)(i.start)(day)("YYYY-MM-DD");
    });
  };
};

var createCalendarDayViewModel = function createCalendarDayViewModel(invites, day, date, _ref) {
  var isSameMonth = _ref.isSameMonth;
  return isSameMonth ? isCalenderDay(filterBy(day)(invites), M.utc(day)) : isNotCalenderDay(filterBy(day)(invites), M.utc(day), date);
};

exports.createCalendarDayViewModel = createCalendarDayViewModel;

var createCalendar = function createCalendar(invites, date) {
  var start = (0, _dateFns.parseISO)(date.clone().startOf("month").toISOString());
  var end = (0, _dateFns.parseISO)(date.clone().endOf("month").toISOString());
  var matrix = (0, _dateFns.eachWeekOfInterval)({
    start: start,
    end: end
  }, {
    weekStartsOn: 1
  });
  return matrix.map(function (weekDay) {
    return (0, _dateFns.eachDayOfInterval)({
      start: (0, _dateFns.startOfISOWeek)(weekDay),
      end: (0, _dateFns.endOfISOWeek)(weekDay)
    }).map(function (day) {
      return createCalendarDayViewModel(invites, day, date, {
        isSameMonth: date.isSame(day, "month")
      });
    });
  });
};

exports.createCalendar = createCalendar;

var calendarModel = function calendarModel(_ref2) {
  var mdl = _ref2.mdl,
      invites = _ref2.invites,
      date = _ref2.date;
  var today = M.utc();

  var _date = M.utc(date);

  var dto = {
    invites: invites,
    startDate: _date,
    selected: {
      year: _date.year(),
      month: _date.month() + 1,
      day: _date.day()
    },
    today: {
      year: today.year(),
      month: today.month(),
      day: today.day()
    },
    daysInMonth: _date.daysInMonth()
  };
  return dto;
};

exports.calendarModel = calendarModel;

var calendarDayStyle = function calendarDayStyle(selectedDate, current, dir) {
  var today = M.utc();

  if (dir !== 0) {
    return "cal-day notThisMonth";
  }

  if (today.isSame(current, "day") && today.isSame(current, "month") && today.isSame(current, "year") && selectedDate.isSame(current, "date")) {
    return "selectedDay isToday";
  }

  if (today.isSame(current, "day") && today.isSame(current, "month") && today.isSame(current, "year")) {
    return "cal-day isToday";
  }

  if (selectedDate.isSame(current, "date")) {
    return "cal-day selectedDay";
  } else return "cal-day";
};

exports.calendarDayStyle = calendarDayStyle;
});

;require.register("Components/calendar/calendar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _calendarModel = require("./calendar-model");

var _Utils = require("Utils");

var Navbar = function Navbar() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          date = _ref$attrs.date;
      return m(".frow width-100 ", [m(".frow width-100 row-between", [m(m.route.Link, {
        selector: "button",
        href: "/".concat(mdl.User.name, "/").concat(date.clone().subtract(1, "year").format("YYYY-MM-DD"))
      }, date.clone().subtract(1, "year").format("YYYY")), m(".centerMonthGroup", [m("h2.currentMonth", date.format("MMMM")), m("h3.text-center", date.format("YYYY"))]), m(m.route.Link, {
        selector: "button",
        href: "/".concat(mdl.User.name, "/").concat(date.clone().add(1, "year").format("YYYY-MM-DD"))
      }, date.clone().add(1, "year").format("YYYY"))]), m(".frow width-100 row-between mt-10", [m(m.route.Link, {
        selector: "button",
        href: "/".concat(mdl.User.name, "/").concat(date.clone().subtract(1, "month").format("YYYY-MM-DD"))
      }, m("h4", date.clone().subtract(1, "month").format("MMMM"))), m(m.route.Link, {
        selector: "button",
        href: "/".concat(mdl.User.name, "/").concat(date.clone().add(1, "month").format("YYYY-MM-DD"))
      }, m("h4", date.clone().add(1, "month").format("MMMM")))])]);
    }
  };
};

var DaysOfWeek = function DaysOfWeek() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m(".frow width-100 row-between mt-10", _Utils.daysOfTheWeek.map(function (day) {
        return m(".col-xs-1-7 text-center", m("span.width-auto.text-strong", day[0].toUpperCase()));
      }));
    }
  };
};

var CalendarDay = function CalendarDay() {
  return {
    view: function view(_ref3) {
      var _ref3$attrs = _ref3.attrs,
          mdl = _ref3$attrs.mdl,
          invites = _ref3$attrs.invites,
          day = _ref3$attrs.day,
          dir = _ref3$attrs.dir;
      return m(".col-xs-1-7 text-center", m(m.route.Link, {
        href: "/".concat(mdl.User.name, "/").concat(day.format("YYYY-MM-DD")),
        class: "cal-day-link",
        onclick: function onclick(e) {
          return mdl.State.toAnchor((0, _Utils.firstInviteHour)(invites) || M.utc().format("HH"));
        }
      }, m(".".concat((0, _calendarModel.calendarDayStyle)(mdl.selectedDate(), day, dir)), [m("span.cal-date", day.format("D")), invites.any() && m(".cal-invites-item", invites.length)])));
    }
  };
};

var CalendarBody = function CalendarBody() {
  return {
    view: function view(_ref4) {
      var _ref4$attrs = _ref4.attrs,
          mdl = _ref4$attrs.mdl,
          date = _ref4$attrs.date,
          invites = _ref4$attrs.invites;
    }
  };
};

var Calendar = function Calendar() {
  return {
    view: function view(_ref5) {
      var _ref5$attrs = _ref5.attrs,
          mdl = _ref5$attrs.mdl,
          date = _ref5$attrs.date,
          invites = _ref5$attrs.invites;
      var matrix = (0, _calendarModel.createCalendar)(invites, date);
      return m(".calendar", m(".frow frow-container", [m(Navbar, {
        mdl: mdl,
        date: date
      }), m(DaysOfWeek, {
        mdl: mdl
      }), m(".frow centered-column width-100 row-between mt-10 ", matrix.map(function (week) {
        return m(".frow width-100", week.map(function (_ref6) {
          var invites = _ref6.invites,
              day = _ref6.day,
              dir = _ref6.dir;
          return m(CalendarDay, {
            mdl: mdl,
            invites: invites,
            day: day,
            dir: dir
          });
        }));
      }))]));
    }
  };
};

exports.Calendar = Calendar;
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
exports.Day = exports.HourView = void 0;

var _Utils = require("Utils");

var createEventUrl = function createEventUrl(invite) {
  return "".concat(invite.start.format("YYYY-MM-DD"), "/").concat(invite.start.format("h"), "/").concat(invite.start.format("mm"));
};

var navToInvite = function navToInvite(mdl) {
  return function (invite) {
    mdl.Events.currentEventId(invite.eventId);
    mdl.Events.currentEventStart(invite.start);
    localStorage.setItem("shindigit-eventId", invite.eventId);
    localStorage.setItem("shindigit-eventStart", invite.start);
    m.route.set("/".concat(mdl.User.name, "/").concat(createEventUrl(invite)));
  };
};

var HourInvite = function HourInvite() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          invite = _ref$attrs.invite,
          col = _ref$attrs.col;
      return m(".col-xs-1-".concat(col + 2), m(".invite-list-item ", {
        onclick: function onclick(e) {
          return navToInvite(mdl)(invite);
        },
        style: {
          "background-color": (0, _Utils.getInviteStatusColor)(invite.status),
          top: "".concat(invite.start.format("mm"), "px"),
          height: "".concat(invite.end.diff(invite.start, "minutes") * 2, "px")
        }
      }, invite.title));
    }
  };
};

var scrollToCurrentTimeOrInvite = function scrollToCurrentTimeOrInvite(mdl, invites) {
  var first = (0, _Utils.firstInviteHour)(invites);
  var hour = mdl.State.toAnchor() ? mdl.State.toAnchor() : first ? first : M().format("h");
  var el = document.getElementById("".concat(hour, ":00"));
  el && el.scrollIntoView({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};

var HourView = function HourView() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          hour = _ref2$attrs.hour,
          events = _ref2$attrs.events;
      return m(".frow ", m(".hour ", [m("p.hour-time", {
        id: hour
      }, hour), m(".invite-list frow ", events.map(function (invite, idx) {
        return m(HourInvite, {
          mdl: mdl,
          invite: invite,
          col: events.length,
          key: idx
        });
      }))]));
    }
  };
};

exports.HourView = HourView;

var ListView = function ListView() {
  return {
    view: function view(_ref3) {
      var _ref3$attrs = _ref3.attrs,
          mdl = _ref3$attrs.mdl,
          invites = _ref3$attrs.invites;
      return m("ul", invites.map(function (invite) {
        // console.log(invite)
        return m("li.frow-container", m(".invite-list-".concat(_Utils.inviteOptions[invite.status]), {
          onclick: function onclick(e) {
            return navToInvite(mdl)(invite);
          }
        }, [m("h3", invite.title), m(".frow row-start", [m("label.col-xs-1-1", "".concat(invite.start.format((0, _Utils.displayTimeFormat)(mdl)), " - ").concat(invite.end.format((0, _Utils.displayTimeFormat)(mdl))))])]));
      }));
    }
  };
};

var Day = function Day(_ref4) {
  var mdl = _ref4.attrs.mdl;
  return {
    oncreate: function oncreate(_ref5) {
      var _ref5$attrs = _ref5.attrs,
          mdl = _ref5$attrs.mdl,
          invites = _ref5$attrs.invites;
      return scrollToCurrentTimeOrInvite(mdl, invites);
    },
    onupdate: function onupdate(_ref6) {
      var _ref6$attrs = _ref6.attrs,
          mdl = _ref6$attrs.mdl,
          invites = _ref6$attrs.invites;
      return mdl.State.toAnchor() && scrollToCurrentTimeOrInvite(mdl, invites);
    },
    view: function view(_ref7) {
      var _ref7$attrs = _ref7.attrs,
          mdl = _ref7$attrs.mdl,
          day = _ref7$attrs.day,
          invites = _ref7$attrs.invites;
      return m(".day", [m(".day-container", [mdl.Day.listView() ? m(ListView, {
        mdl: mdl,
        invites: invites
      }) : (0, _Utils.getHoursInDay)().map(function (hour, idx) {
        return m(HourView, {
          mdl: mdl,
          invites: day[hour],
          hour: hour,
          // hour: M()       NEedd to fix this...
          //   .hour(hour)
          //   .minutes("00")
          //   .format(displayTimeFormat(mdl)),
          events: day[hour]
        });
      })])]);
    }
  };
};

exports.Day = Day;
});

;require.register("Components/editor/editor.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;

var _eventForm = require("./event-form");

var _Http = require("Http");

var _validations = require("./validations");

var Editor = function Editor(_ref) {
  var mdl = _ref.attrs.mdl;
  var EventFormData = {
    shortDate: mdl.selectedDate().format("YYYY-MM-DD"),
    allDay: false,
    inPerson: true,
    location: "",
    latlong: "",
    startTime: "",
    endTime: "",
    title: "",
    notes: ""
  };
  var EventFormState = {
    status: "loading",
    errors: null,
    isSubmitted: false,
    isValid: false,
    queryResults: [],
    querySelected: "",
    locationWarning: Stream(null)
  };

  var resetState = function resetState(state) {
    EventFormState = {
      status: "loading",
      errors: null,
      isSubmitted: false,
      isValid: false,
      queryResults: [],
      querySelected: "",
      locationWarning: Stream(null)
    };
    console.log(EventFormState);
  };

  var validate = function validate(state, data) {
    var onError = function onError(errors) {
      state.errors = errors;
      state.isValid = false; // console.log("v err", state, errors)
    };

    var onSuccess = function onSuccess(data) {
      // console.log("v succ", data)
      state.errors = null;
      state.isValid = true;
    };

    (0, _validations.validateTask)(data).fork(onError, onSuccess);
  };

  var addNewEvent = function addNewEvent(_ref2) {
    var mdl = _ref2.mdl,
        data = _ref2.data,
        state = _ref2.state;

    var onError = function onError(errors) {
      state.errors = errors;
      state.status = "failed";
    };

    var onSuccess = function onSuccess() {
      mdl.Invites.fetch(true);
      mdl.State.modal(false);
    };

    state.isSubmitted = true;
    (0, _validations.validateTask)(data).chain((0, _Http.submitEventTask)(_Http.HTTP)(mdl)).fork(onError, onSuccess);
  };

  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return m(_eventForm.EventForm, {
        mdl: mdl,
        data: EventFormData,
        state: EventFormState,
        validate: validate,
        resetState: resetState,
        submit: addNewEvent
      });
    }
  };
};

exports.Editor = Editor;
});

;require.register("Components/editor/event-form.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventForm = void 0;

var _Http = require("Http");

var locateQuery = function locateQuery(mdl) {
  return function (state) {
    return function (query) {
      var onError = function onError(err) {
        console.log("err q", err);
        state.locationWarning("Exact address not found. You may continue with this address or try again");
        state.status = "failure";
      };

      var onSuccess = function onSuccess(data) {
        state.queryResults = data;
        state.status = "success";
        state.locationWarning(null);
        console.log("succ d", state);
      };

      (0, _Http.locateQueryTask)(_Http.HTTP)(mdl)(query).fork(onError, onSuccess);
    };
  };
};

var EventForm = function EventForm() {
  var setAllDay = function setAllDay(data) {
    data.allDay = !data.allDay;

    if (data.allDay) {
      data.startTime = "00:00";
      data.endTime = "23:59";
    } else {
      data.startTime = "";
      data.endTime = "";
    }
  };

  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          data = _ref$attrs.data,
          state = _ref$attrs.state,
          resetState = _ref$attrs.resetState,
          mdl = _ref$attrs.mdl,
          validate = _ref$attrs.validate,
          submit = _ref$attrs.submit;
      return m("form.event-form", m(".frow column-centered", [m(".full-width", m("label.frow row row-evenly ", [m("input.col-xs-2-3 ", {
        onchange: function onchange(e) {
          return m.route.set("/".concat(mdl.User.name, "/").concat(e.target.value));
        },
        type: "date",
        value: mdl.selectedDate().format("YYYY-MM-DD")
      }), m("label.pl-30.col-xs-1-3", "All Day", m("input", {
        type: "checkbox",
        checked: data.allDay,
        onclick: function onclick(e) {
          return setAllDay(data);
        }
      }))])), m(".full-width", [m(".frow row row-evenly gutters", [m("label.col-xs-1-2", [m("input.", {
        oninput: function oninput(e) {
          return data.startTime = e.target.value;
        },
        value: data.startTime,
        type: "time",
        disabled: data.allDay,
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), m(".frow row-start", ["Start Time", m("span.required-field", "*")]), state.errors && m("code.error-field", state.errors.startTime)]), m("label.col-xs-1-2", [m("input", {
        oninput: function oninput(e) {
          return data.endTime = e.target.value;
        },
        value: data.endTime,
        type: "time",
        disabled: data.allDay,
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), m(".frow row-start", ["End Time", m("span.required-field", "*")]), state.errors && m("code.error-field", state.errors.endTime)])])]), m(".full-width", m(".frow row row-evenly gutters", [m("label.col-xs-1-5", "In Person", m("input", {
        type: "checkbox",
        checked: data.inPerson,
        onclick: function onclick(e) {
          return data.inPerson = !data.inPerson;
        }
      })), data.inPerson ? m("label.col-xs-4-5", m("input", {
        type: "address",
        value: data.location,
        oninput: function oninput(e) {
          return data.location = e.target.value;
        },
        onchange: function onchange(e) {
          return locateQuery(mdl)(state)(e.target.value);
        },
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), m(".frow row-start", ["Address", m("span.required-field", "*")])) : m("label.col-xs-4-5", m("input", {
        type: "url",
        value: data.url,
        oninput: function oninput(e) {
          return data.location = e.target.value;
        },
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), m(".frow row-start", ["URL link", m("span.required-field", "*")])), state.locationWarning() && m("p.location-info-text", state.locationWarning()), state.queryResults.any() && m("ul.event-form-query-container", state.queryResults.map(function (_ref2) {
        var address = _ref2.address,
            latlong = _ref2.latlong;
        return m("li", m("code.form-event-query-result", {
          onclick: function onclick(e) {
            data.location = address;
            data.latlong = latlong;
            resetState(state);
          }
        }, address));
      })), state.errors && m("code.error-field", state.errors.location)])), m("label", m("input", {
        type: "text",
        value: data.text,
        oninput: function oninput(e) {
          return data.title = e.target.value;
        },
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), m(".frow row-start", ["Title", m("span.required-field", "*")]), state.errors && m("code.error-field", state.errors.title)), m("label", m("input", {
        type: "text",
        value: data.notes,
        oninput: function oninput(e) {
          return data.notes = e.target.value;
        },
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), "Notes"), m("button.full-width", {
        onclick: function onclick(e) {
          e.preventDefault();
          submit({
            mdl: mdl,
            data: data,
            state: state
          });
        }
      }, "Submit")]));
    }
  };
};

exports.EventForm = EventForm;
});

;require.register("Components/editor/validations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTask = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

var _Utils = require("Utils");

var Validate = (0, _data.Success)((0, _ramda.curryN)(5, _ramda.identity));
var dateLense = (0, _ramda.lensProp)("shortDate");
var startTimeLense = (0, _ramda.lensProp)("startTime");
var endTimeLense = (0, _ramda.lensProp)("endTime");
var locationLense = (0, _ramda.lensProp)("location");
var latLongLense = (0, _ramda.lensProp)("latlong");
var titleLense = (0, _ramda.lensProp)("title");

var FIELD_REQUIRED_MSG = function FIELD_REQUIRED_MSG(field) {
  return "".concat(field, " is required");
};

var INVALID_END_DATE_MSG = "End time must be after Start time";

var isChronological = function isChronological(startTime) {
  return function (endTime) {
    return startTime && endTime && M().hours((0, _Utils.getHour)(startTime)).minutes((0, _Utils.getMin)(startTime)).isBefore(M().hours((0, _Utils.getHour)(endTime)).minutes((0, _Utils.getMin)(endTime)));
  };
};

var validateDate = function validateDate(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, dateLense, FIELD_REQUIRED_MSG("Date"), data));
};

var validateStartTime = function validateStartTime(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, startTimeLense, FIELD_REQUIRED_MSG("Start Time"), data));
};

var validateEndTime = function validateEndTime(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, endTimeLense, FIELD_REQUIRED_MSG("End Time"), data)).apLeft((0, _Utils.validate)(isChronological(data.startTime), endTimeLense, INVALID_END_DATE_MSG, data));
};

var validateAddress = function validateAddress(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, locationLense, FIELD_REQUIRED_MSG("Location"), data));
};

var validateTitle = function validateTitle(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, titleLense, FIELD_REQUIRED_MSG("Title"), data));
};

var validateTask = function validateTask(data) {
  return Validate.ap(validateDate(data)).ap(validateStartTime(data)).ap(validateEndTime(data)).ap(validateAddress(data)).ap(validateTitle(data)).failureMap(_ramda.mergeAll).toTask();
};

exports.validateTask = validateTask;
});

;require.register("Components/event-toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventToolbar = void 0;

var EventToolbar = function EventToolbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return [m("button.col-xs-1-1", {
        onclick: function onclick(e) {
          localStorage.removeItem("shindigit-eventId");
          mdl.State.toAnchor(M(mdl.Events.currentEventStart()).format("HH"));
          m.route.set("/".concat(mdl.User.name, "/").concat(M(mdl.Events.currentEventStart()).format("YYYY-MM-DD")));
        }
      }, "Back")];
    }
  };
};

exports.EventToolbar = EventToolbar;
});

;require.register("Components/home-toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeToolbar = void 0;

var HomeToolbar = function HomeToolbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return [m("input.col-xs-1-2", {
        onchange: function onchange(e) {
          return m.route.set("/".concat(mdl.User.name, "/").concat(mdl.selectedDate().format("YYYY-MM-DD")));
        },
        type: "date",
        value: mdl.selectedDate().format("YYYY-MM-DD")
      }), m(m.route.Link, {
        class: "col-xs-1-2",
        selector: "button",
        href: "/".concat(mdl.User.name, "/").concat(M.utc().format("YYYY-MM-DD"))
      }, "Today")];
    }
  };
};

exports.HomeToolbar = HomeToolbar;
});

;require.register("Components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _homeToolbar = require("./home-toolbar.js");

Object.keys(_homeToolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _homeToolbar[key];
    }
  });
});

var _eventToolbar = require("./event-toolbar.js");

Object.keys(_eventToolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventToolbar[key];
    }
  });
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

var _editor = require("./editor/editor.js");

Object.keys(_editor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editor[key];
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

var _eventForm = require("./editor/event-form.js");

Object.keys(_eventForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventForm[key];
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

var _authLayout = require("./auth-layout.js");

Object.keys(_authLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authLayout[key];
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

var _accordianItem = require("./accordian-item.js");

Object.keys(_accordianItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _accordianItem[key];
    }
  });
});

var _attendanceResponse = require("./attendance-response.js");

Object.keys(_attendanceResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attendanceResponse[key];
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

var _Components = require("Components");

var Header = function Header() {
  var getRoute = function getRoute(mdl) {
    return mdl.State.route.id;
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".col-xs-4-5.frow row row-start", [getRoute(mdl) == "day-planner" && m(_Components.HomeToolbar, {
        mdl: mdl
      }), getRoute(mdl) == "event" && m(_Components.EventToolbar, {
        mdl: mdl
      })]);
    }
  };
};

var Hamburger = function Hamburger() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m("button.col-xs-1-5", {
        onclick: function onclick(e) {
          return mdl.Sidebar.isShowing(!mdl.Sidebar.isShowing());
        }
      }, mdl.Sidebar.isShowing() ? "Close" : "Menu");
    }
  };
};

var Layout = function Layout() {
  return {
    view: function view(_ref3) {
      var children = _ref3.children,
          mdl = _ref3.attrs.mdl;
      return m(".lt-grid-container", [m(".lt-header.frow row", [m(Header, {
        mdl: mdl
      }), m(Hamburger, {
        mdl: mdl
      })]), mdl.Sidebar.isShowing() ? m(_Components.Sidebar, {
        mdl: mdl
      }) : m(".lt-body", children), m(".lt-footer", "FOOTER")]);
    }
  };
};

exports.Layout = Layout;
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
      return m(".modal", m(".modal-container", children.map(function (child) {
        return m(".modal.full-width", [m(".modal-header", child.header), m(".modal-body", child.body), m(".modal-footer", child.footer)]);
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

;require.register("Components/sidebar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var Sidebar = function Sidebar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".sidebar-page", [m("ul.sidebar", [m("li.sidebar-link", m(m.route.Link, {
        // onclick: (e) => logout,
        href: "/".concat(mdl.User.name, "/").concat(M(mdl.selectedDate()).format("YYYY-MM-DD"))
      }, "Home")), m("li.sidebar-link", m(m.route.Link, {
        // onclick: (e) => logout,
        href: "/profile/".concat(mdl.User.name)
      }, "Profile")), m("li.sidebar-link", m(m.route.Link, {
        // onclick: (e) => logout,
        href: "/logout"
      }, "Logout"))])]);
    }
  };
};

exports.Sidebar = Sidebar;
});

;require.register("Fp/all.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.All = void 0;

var All = function All(x) {
  return {
    val: x,
    concat: function concat(_ref) {
      var val = _ref.val;
      return All(x && val);
    }
  };
};

exports.All = All;
All.empty = All(true);
});

;require.register("Fp/any.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Any = void 0;

var Any = function Any(x) {
  return {
    val: x,
    concat: function concat(_ref) {
      var val = _ref.val;
      return Any(x || val);
    }
  };
};

exports.Any = Any;
Any.empty = Any(false);
});

;require.register("Fp/array.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayFP = void 0;

var _util = require("./util");

var _flatten = function _flatten(xs) {
  return xs.reduce(function (a, b) {
    return a.concat(b);
  }, []);
};

var configure = function configure(_) {
  var _fmap = function _fmap(f) {
    var xs = this;
    return xs.map(function (x) {
      return f(x);
    }); //avoid index
  };

  Object.defineProperty(Array.prototype, "fmap", (0, _util.value)(_fmap));

  var _empty = function _empty(_) {
    return [];
  };

  Object.defineProperty(Array.prototype, "empty", (0, _util.value)(_empty));

  var _chain = function _chain(f) {
    return _flatten(this.fmap(f));
  };

  Object.defineProperty(Array.prototype, "chain", (0, _util.value)(_chain));

  var _of = function _of(x) {
    return [x];
  };

  Object.defineProperty(Array.prototype, "of", (0, _util.value)(_of));

  var _ap = function _ap(a2) {
    return _flatten(this.map(function (f) {
      return a2.map(function (a) {
        return f(a);
      });
    }));
  };

  Object.defineProperty(Array.prototype, "ap", (0, _util.value)(_ap));

  var _traverse = function _traverse(f, point) {
    var cons_f = function cons_f(ys, x) {
      return f(x).map(function (x) {
        return function (y) {
          return y.concat(x);
        };
      }).ap(ys);
    };

    return this.reduce(cons_f, point([]));
  };

  Object.defineProperty(Array.prototype, "traverse", (0, _util.value)(_traverse));

  var _any = function _any() {
    return this.length > 0;
  };

  Object.defineProperty(Array.prototype, "any", (0, _util.value)(_any));

  var _insertAt = function _insertAt(idx, x) {
    return this.splice(idx, 0, x);
  };

  Object.defineProperty(Array.prototype, "insertAt", (0, _util.value)(_insertAt));

  var _removeAt = function _removeAt(idx) {
    return this.splice(idx, 1);
  };

  Object.defineProperty(Array.prototype, "removeAt", (0, _util.value)(_removeAt));

  var _last = function _last() {
    return this[this.length - 1];
  };

  Object.defineProperty(Array.prototype, "last", (0, _util.value)(_last));

  var _in = function _in(comparer) {
    for (var i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true;
    }

    return false;
  };

  Object.defineProperty(Array.prototype, "in", (0, _util.value)(_in));

  var _pushIfNotExist = function _pushIfNotExist(element, comparer) {
    if (!this.in(comparer)) {
      this.push(element);
    }
  };

  Object.defineProperty(Array.prototype, "pushIfNotExist", (0, _util.value)(_pushIfNotExist));

  var _foldM = function _foldM(point, f) {
    var _this = this;

    var go = function go(a) {
      return !_this.any() ? point(a) : f(a, _this.shift()).chain(go);
    };

    return go;
  };

  Object.defineProperty(Array.prototype, "foldM", (0, _util.value)(_foldM));
};

var ArrayFP = {
  configure: configure
};
exports.ArrayFP = ArrayFP;
});

;require.register("Fp/coyoneda.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coyoneda = void 0;

var _daggy = require("daggy");

var _ramda = require("ramda");

var Coyoneda = (0, _daggy.tagged)('x', 'f');
exports.Coyoneda = Coyoneda;

Coyoneda.prototype.map = function (f) {
  return Coyoneda(this.x, (0, _ramda.compose)(f, this.f));
};

Coyoneda.prototype.lower = function () {
  return this.x.map(this.f);
};

Coyoneda.lift = function (x) {
  return Coyoneda(x, _ramda.identity);
};
});

;require.register("Fp/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Fp: true,
  Coyoneda: true
};
Object.defineProperty(exports, "Coyoneda", {
  enumerable: true,
  get: function get() {
    return _coyoneda.Coyoneda;
  }
});
exports.Fp = void 0;

var _all = require("./all");

Object.keys(_all).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _all[key];
    }
  });
});

var _any = require("./any");

Object.keys(_any).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _any[key];
    }
  });
});

var _tuple = require("./tuple");

Object.keys(_tuple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tuple[key];
    }
  });
});

var _coyoneda = require("./coyoneda");

var _pointfree = require("./pointfree");

Object.keys(_pointfree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pointfree[key];
    }
  });
});

var _sum = require("./sum");

Object.keys(_sum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sum[key];
    }
  });
});

var _list = require("./list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

var _intersection = require("./intersection");

Object.keys(_intersection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _intersection[key];
    }
  });
});

var _array = require("./array");

var _task = require("./task");

var _maybe = require("./maybe");

var _validation = require("./validation");

var configure = function configure() {
  _array.ArrayFP.configure();

  _task.Task.configure();

  _maybe.Maybe.configure();

  _validation.Validation.configure();
};

var Fp = {
  configure: configure
};
exports.Fp = Fp;
});

;require.register("Fp/intersection.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intersection = void 0;

// Intersection Semigroup.
//
// The intersection (based on value equality) of two lists
// Intersection :: (Eq m) <= m -> Intersection m
var Intersection = function Intersection(xs) {
  return {
    xs: xs,
    concat: function concat(_ref) {
      var ys = _ref.xs;
      return Intersection(xs.filter(function (x) {
        return ys.some(function (y) {
          return y.equals(x);
        });
      }));
    },
    inspect: "Intersection(".concat(xs, ")")
  };
};

exports.Intersection = Intersection;
});

;require.register("Fp/list.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _data = require("data.maybe");

var _ramda = require("ramda");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nil = function Nil() {
  _classCallCheck(this, Nil);

  this.head = undefined;
  this.tail = undefined;
  this.isNil = true;
  this.isCons = false;
};

var Cons = function Cons(x, xs) {
  _classCallCheck(this, Cons);

  this.head = x;
  this.tail = xs;
  this.isNil = false;
  this.isCons = true;
}; //curry :: (a -> b -> c) -> a -> b -> c


var curry = function curry(f) {
  return function (x) {
    return function (y) {
      return f(x, y);
    };
  };
}; //uncurry :: (a -> b -> c) -> (a, b) -> c


var uncurry = function uncurry(f) {
  return function (x, y) {
    return f(x)(y);
  };
}; //o :: ((b -> c), (a -> b)) -> a -> c


var o = function o(f, g) {
  return function (x) {
    return f(g(x));
  };
}; //id :: a -> a


var id = function id(x) {
  return x;
}; //flip :: (a -> b -> c) -> (b, a) -> c


var flip = function flip(f) {
  return function (x, y) {
    return f(y, x);
  };
}; //cons :: (a, List a) -> List a


var cons = function cons(x, xs) {
  return new Cons(x, xs);
}; //snoc :: (List a, a) -> List a


var snoc = function snoc(xs, x) {
  return new Cons(x, xs);
}; //ccons :: a -> List a -> List a


var ccons = curry(cons); //csnoc :: List a -> a -> List a
//const csnoc = curry(snoc)
//nil :: () => List a

var nil = function nil() {
  return new Nil();
}; //head :: List a -> a | undefined


var head = function head(_ref) {
  var head = _ref.head;
  return head;
}; //tail :: List a -> List a | undefined


var tail = function tail(_ref2) {
  var tail = _ref2.tail;
  return tail;
}; //concat :: List a -> List a -> List a


var concat = function concat(xs) {
  return function (ys) {
    return foldr(cons)(ys)(xs);
  };
}; //foldl :: ((a, b) -> a) -> a -> List b -> a


var foldl = function foldl(f) {
  var go = function go(b) {
    return function (_ref3) {
      var isNil = _ref3.isNil,
          head = _ref3.head,
          tail = _ref3.tail;
      return isNil ? b : go(f(b, head))(tail);
    };
  };

  return go;
}; //foldr :: ((a, b) -> a) -> a -> List b -> a


var foldr = function foldr(f) {
  return function (b) {
    var rev = function rev(acc) {
      return function (_ref4) {
        var isNil = _ref4.isNil,
            head = _ref4.head,
            tail = _ref4.tail;
        return isNil ? acc : rev(cons(head, acc))(tail);
      };
    };

    return o(foldl(flip(f))(b), rev(nil()));
  };
}; //foldMap :: Monoid m => (a -> m) -> List a -> m


var foldMap = function foldMap(f) {
  return foldl(function (acc, x) {
    return (acc || f(x).empty()).concat(f(x));
  })(null);
}; //foldM :: Monad m => (a -> m a) -> (a -> b -> m a) -> a -> List b -> m a


var foldM = function foldM(point) {
  return function (f) {
    var go = function go(a) {
      return function (_ref5) {
        var isNil = _ref5.isNil,
            head = _ref5.head,
            tail = _ref5.tail;
        return isNil ? point(a) : f(a, head).chain(function (x) {
          return go(x)(tail);
        });
      };
    };

    return go;
  };
}; //map :: (a -> b) -> List a -> List b


var map = function map(f) {
  return function (_ref6) {
    var isNil = _ref6.isNil,
        head = _ref6.head,
        tail = _ref6.tail;
    return isNil ? nil() : cons(f(head), map(f)(tail));
  };
}; //ap :: List (a -> b) -> List a -> List b


var ap = function ap(_ref7) {
  var isNil = _ref7.isNil,
      f = _ref7.head,
      fs = _ref7.tail;
  return function (xs) {
    return isNil ? nil() : concat(map(f)(xs))(ap(fs)(xs));
  };
}; //pure :: a -> List a


var pure = function pure(a) {
  return cons(a, nil());
}; //chain :: (a -> List b) -> List a -> List b


var chain = function chain(_ref8) {
  var isNil = _ref8.isNil,
      head = _ref8.head,
      tail = _ref8.tail;
  return function (f) {
    return isNil ? nil() : concat(f(head))(chain(tail)(f));
  };
}; //join :: List (List a -> List a)


var join = foldr(uncurry(concat))(nil()); //traverse :: Applicative f => (a -> f a) -> (a -> f b) -> List a -> f (List b)

var traverse = function traverse(point, f) {
  var con_f = function con_f(x, ys) {
    return f(x).map(ccons).ap(ys);
  };

  return foldr(con_f)(point(nil()));
}; //sequenceA :: Applicative f => (a -> f a) -> List (f a) -> f (List a)


var sequenceA = function sequenceA(point) {
  return traverse(point, id);
}; //length :: List a -> Int


var length = function length(xs) {
  var go = function go(b) {
    return function (_ref9) {
      var isCons = _ref9.isCons,
          tail = _ref9.tail;
      return isCons ? go(b + 1)(tail) : b;
    };
  };

  return go(0)(xs);
}; //findIndex :: (a -> Boolean) -> List a -> Maybe Int


var findIndex = function findIndex(f) {
  return function (xs) {
    var go = function go(n) {
      return function (_ref10) {
        var isNil = _ref10.isNil,
            head = _ref10.head,
            tail = _ref10.tail;
        return isNil ? (0, _data.Nothing)() : f(head) ? (0, _data.Just)(n) : go(n + 1)(tail);
      };
    };

    return go(0)(xs);
  };
}; //index :: Int -> List a -> Maybe a


var index = function index(i) {
  return function (xs) {
    var go = function go(n) {
      return function (_ref11) {
        var isNil = _ref11.isNil,
            head = _ref11.head,
            tail = _ref11.tail;
        return isNil ? (0, _data.Nothing)() : n === i ? (0, _data.Just)(head) : go(n + 1)(tail);
      };
    };

    return go(0)(xs);
  };
}; //reverse :: List a -> List a


var reverse = function reverse(xs) {
  var go = function go(acc) {
    return function (_ref12) {
      var isNil = _ref12.isNil,
          head = _ref12.head,
          tail = _ref12.tail;
      return isNil ? acc : go(cons(head, acc))(tail);
    };
  };

  return go(nil())(xs);
}; //contains :: Eq a => List a -> a -> Boolean


var contains = function contains(xs) {
  return function (x) {
    return findIndex((0, _ramda.equals)(x))(xs).isJust;
  };
}; //unique :: Eq a => List a -> List a


var unique = o(reverse, foldl(function (acc, x) {
  return contains(acc)(x) ? acc : cons(x, acc);
})(nil())); //toArray :: List a -> [a]

var toArray = foldl(function (acc, x) {
  return acc.concat([x]);
})([]); //toList :: [a] -> List a

var toList = function toList(xs) {
  return xs.reduceRight(function (acc, x) {
    return cons(x, acc);
  }, nil());
}; //List :: a -> ... -> List a


var list = function list() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return toList(args);
};

var List = {
  list: list,
  cons: cons,
  snoc: snoc,
  nil: nil,
  head: head,
  tail: tail,
  foldl: foldl,
  foldr: foldr,
  foldMap: foldMap,
  foldM: foldM,
  concat: concat,
  map: map,
  ap: ap,
  pure: pure,
  join: join,
  chain: chain,
  traverse: traverse,
  sequenceA: sequenceA,
  findIndex: findIndex,
  index: index,
  length: length,
  reverse: reverse,
  contains: contains,
  unique: unique,
  toArray: toArray,
  toList: toList
};
exports.List = List;
});

;require.register("Fp/maybe.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maybe = void 0;

var _data = _interopRequireDefault(require("data.maybe"));

var _data2 = _interopRequireDefault(require("data.task"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configure = function configure(_) {
  var _toTask = function _toTask(nothing) {
    var cata = {
      Nothing: function Nothing(_) {
        return _data2.default.of(nothing);
      },
      Just: function Just(x) {
        return _data2.default.of(x);
      }
    };
    return this.cata(cata);
  };

  Object.defineProperty(_data.default.prototype, 'toTask', (0, _util.value)(_toTask));
};

var Maybe = {
  configure: configure
};
exports.Maybe = Maybe;
});

;require.register("Fp/pointfree.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = exports.taskToPromise = exports.promiseToTask = exports.eitherToTask = exports.toList = exports.fold = exports.foldMap = exports.traverse = exports.of = exports.sequenceA = exports.mconcat = exports.mjoin = exports.ParseError = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.either"));

var _data2 = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ParseError = /*#__PURE__*/function (_Error) {
  _inherits(ParseError, _Error);

  var _super = _createSuper(ParseError);

  function ParseError() {
    _classCallCheck(this, ParseError);

    return _super.apply(this, arguments);
  }

  return ParseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.ParseError = ParseError;

var id = function id(x) {
  return x;
};

var _groupsOf = (0, _ramda.curry)(function (n, xs) {
  return !xs.length ? [] : [xs.slice(0, n)].concat(_groupsOf(n, xs.slice(n, length)));
});

var mjoin = function mjoin(mmv) {
  if (mmv.mjoin) return mmv.mjoin();
  return (0, _ramda.chain)(id, mmv);
};

exports.mjoin = mjoin;
var mconcat = (0, _ramda.curry)(function (xs, empty) {
  return xs.length ? xs.reduce(_ramda.concat) : empty();
});
exports.mconcat = mconcat;
var sequenceA = (0, _ramda.curry)(function (point, fctr) {
  return fctr.traverse(id, point);
});
exports.sequenceA = sequenceA;

var of = function of(x) {
  return x.of;
};

exports.of = of;
var traverse = (0, _ramda.curry)(function (f, point, fctr) {
  return (0, _ramda.compose)(sequenceA(point), (0, _ramda.map)(f))(fctr);
});
exports.traverse = traverse;
var foldMap = (0, _ramda.curry)(function (f, fldable) {
  return fldable.reduce(function (acc, x) {
    var r = f(x);
    acc = acc || r.empty();
    return acc.concat(r);
  }, null);
});
exports.foldMap = foldMap;
var fold = (0, _ramda.curry)(function (f, g, x) {
  return x.fold(f, g);
});
exports.fold = fold;

var toList = function toList(x) {
  return x.reduce(function (acc, y) {
    return [y].concat(acc);
  }, []);
};

exports.toList = toList;

var eitherToTask = function eitherToTask(x) {
  return x.cata({
    Left: function Left(e) {
      return _data2.default.rejected(new ParseError(e));
    },
    Right: function Right(x) {
      return _data2.default.of(x);
    }
  });
};

exports.eitherToTask = eitherToTask;

var promiseToTask = function promiseToTask(p) {
  return new _data2.default(function (rej, res) {
    return p.then(res, rej);
  });
};

exports.promiseToTask = promiseToTask;

var taskToPromise = function taskToPromise(t) {
  return new Promise(function (res, rej) {
    return t.fork(rej, res);
  });
};

exports.taskToPromise = taskToPromise;

var parse = _data.default.try((0, _ramda.compose)(JSON.parse, (0, _ramda.prop)('response')));

exports.parse = parse;
});

;require.register("Fp/sum.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sum = void 0;

var Sum = function Sum(x) {
  return {
    x: x,
    concat: function concat(_ref) {
      var y = _ref.x;
      return x + y;
    },
    inspect: "Sum(".concat(x, ")")
  };
};

exports.Sum = Sum;
});

;require.register("Fp/task.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configure = function configure() {
  var _mjoin = function _mjoin() {
    var _this = this;

    return new _data.default(function (rej, res) {
      return _this.fork(rej, function (s) {
        return s.fork(rej, res);
      });
    });
  };

  Object.defineProperty(_data.default.prototype, 'mjoin', (0, _util.value)(_mjoin));
};

var Task = {
  configure: configure
};
exports.Task = Task;
});

;require.register("Fp/tuple.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uncurry5 = exports.uncurry4 = exports.uncurry3 = exports.uncurry2 = exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.tuple5 = exports.tuple4 = exports.tuple3 = exports.tuple2 = exports.Tuple5 = exports.Tuple4 = exports.Tuple3 = exports.Tuple2 = exports.Tuple = void 0;

var _daggy = require("daggy");

var Tuple = (0, _daggy.tagged)('_1', '_2');
exports.Tuple = Tuple;
var Tuple2 = Tuple;
exports.Tuple2 = Tuple2;
var Tuple3 = (0, _daggy.tagged)('_1', '_2', '_3');
exports.Tuple3 = Tuple3;
var Tuple4 = (0, _daggy.tagged)('_1', '_2', '_3', '_4');
exports.Tuple4 = Tuple4;
var Tuple5 = (0, _daggy.tagged)('_1', '_2', '_3', '_4', '_5'); // Methods

exports.Tuple5 = Tuple5;

Tuple2.prototype.concat = function (b) {
  return Tuple2(this._1.concat(b._1), this._2.concat(b._2));
};

Tuple3.prototype.concat = function (b) {
  return Tuple3(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3));
};

Tuple4.prototype.concat = function (b) {
  return Tuple4(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3), this._4.concat(b._4));
};

Tuple5.prototype.concat = function (b) {
  return Tuple5(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3), this._4.concat(b._4), this._5.concat(b._5));
}; // Methods


Tuple.prototype.dimap = function (f, g) {
  return Tuple(f(this._1), g(this._2));
};

Tuple.prototype.map = function (f) {
  return Tuple(this._1, f(this._2));
};

Tuple.prototype.curry = function (f) {
  return f(this);
};

Tuple.prototype.uncurry = function (f) {
  return f(this._1, this._2);
};

Tuple.prototype.extend = function (f) {
  return Tuple(this._1, f(this));
};

Tuple.prototype.extract = function () {
  return this._2;
};

Tuple.prototype.foldl = function (f, z) {
  return f(this._2, z);
};

Tuple.prototype.foldr = function (f, z) {
  return f(z, this._2);
};

Tuple.prototype.foldMap = function (f, _) {
  return f(this._2);
};

var tuple2 = Tuple;
exports.tuple2 = tuple2;

var tuple3 = function tuple3(a, b, c) {
  return Tuple(tuple2(a, b), c);
};

exports.tuple3 = tuple3;

var tuple4 = function tuple4(a, b, c, d) {
  return Tuple(tuple3(a, b, c), d);
};

exports.tuple4 = tuple4;

var tuple5 = function tuple5(a, b, c, d, e) {
  return Tuple(tuple4(a, b, c, d), e);
};

exports.tuple5 = tuple5;

var curry2 = function curry2(f, a, b) {
  return f(tuple2(a, b));
};

exports.curry2 = curry2;

var curry3 = function curry3(f, a, b, c) {
  return f(tuple3(a, b, c));
};

exports.curry3 = curry3;

var curry4 = function curry4(f, a, b, c, d) {
  return f(tuple4(a, b, c, d));
};

exports.curry4 = curry4;

var curry5 = function curry5(f, a, b, c, d, e) {
  return f(tuple5(a, b, c, d, e));
};

exports.curry5 = curry5;

var uncurry2 = function uncurry2(f, t) {
  return f(t._1, t._2);
};

exports.uncurry2 = uncurry2;

var uncurry3 = function uncurry3(f, t) {
  return f(t._1._1, t._1._2, t._2);
};

exports.uncurry3 = uncurry3;

var uncurry4 = function uncurry4(f, t) {
  return f(t._1._1._1, t._1._1._2, t._1._2, t._2);
};

exports.uncurry4 = uncurry4;

var uncurry5 = function uncurry5(f, t) {
  return f(t._1._1._1._1, t._1._1._1._2, t._1._1._2, t._1._2, t._2);
};

exports.uncurry5 = uncurry5;
});

;require.register("Fp/util.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = void 0;

var value = function value(f) {
  var x = {
    value: f,
    writable: true,
    configurable: true,
    enumerable: false
  };
  return x;
};

exports.value = value;
});

;require.register("Fp/validation.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = void 0;

var _data = _interopRequireDefault(require("data.validation"));

var _data2 = _interopRequireDefault(require("data.task"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constant = function constant(x) {
  return function () {
    return x;
  };
};

var id = function id(x) {
  return x;
};

var configure = function configure() {
  var apLeft = function apLeft(b) {
    return this.map(constant).ap(b);
  };

  Object.defineProperty(_data.default.prototype, 'apLeft', (0, _util.value)(apLeft));

  var apRight = function apRight(b) {
    return this.map(constant(id)).ap(b);
  };

  Object.defineProperty(_data.default.prototype, 'apRight', (0, _util.value)(apRight));

  var _toTask = function _toTask() {
    var f = {
      Failure: function Failure(x) {
        return _data2.default.rejected(x);
      },
      Success: function Success(x) {
        return _data2.default.of(x);
      }
    };
    return this.cata(f);
  };

  Object.defineProperty(_data.default.prototype, 'toTask', (0, _util.value)(_toTask));
};

var Validation = {
  configure: configure
};
exports.Validation = Validation;
});

;require.register("Http/events-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitEventTask = exports.deleteEventTask = exports.loadEventTask = exports.getEventTask = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _Http = require("Http");

var _ramda = require("ramda");

var _Utils = require("Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toEventviewModel = function toEventviewModel(mdl) {
  return function (_ref) {
    var objectId = _ref.objectId,
        start = _ref.start,
        end = _ref.end,
        title = _ref.title,
        notes = _ref.notes,
        allDay = _ref.allDay,
        location = _ref.location,
        inPerson = _ref.inPerson,
        latlong = _ref.latlong;
    return {
      eventId: objectId,
      date: M.utc(start).format("DD-MM-YYYY"),
      title: title.toUpperCase(),
      start: start,
      end: end,
      startTime: M.utc(start).format((0, _Utils.displayTimeFormat)(mdl)),
      endTime: M.utc(end).format((0, _Utils.displayTimeFormat)(mdl)),
      notes: notes,
      allDay: allDay,
      location: location,
      inPerson: inPerson,
      latlong: latlong
    };
  };
};

var toGuestModel = function toGuestModel(invite) {
  return function (_ref2) {
    var name = _ref2.name,
        email = _ref2.email;
    return _objectSpread(_objectSpread({}, invite), {}, {
      name: name,
      email: email
    });
  };
};

var getProfilesTask = function getProfilesTask(http) {
  return function (mdl) {
    return function (invite) {
      return (0, _Http.getUserProfileTask)(http)(mdl)(invite.userId).map(_ramda.head).map(toGuestModel(invite));
    };
  };
};

var getEventGuestsTask = function getEventGuestsTask(http) {
  return function (mdl) {
    return (0, _Http.getInvitesTaskByEventId)(http)(mdl)(mdl.Events.currentEventId()).chain((0, _ramda.traverse)(_data.default.of, getProfilesTask(http)(mdl)));
  };
};

var getEventTask = function getEventTask(http) {
  return function (mdl) {
    return http.backEnd.getTask(mdl)("data/Events/".concat(mdl.Events.currentEventId())).map(toEventviewModel(mdl));
  };
};

exports.getEventTask = getEventTask;

var loadEventTask = function loadEventTask(http) {
  return function (mdl) {
    return _data.default.of(function (event) {
      return function (items) {
        return function (guests) {
          return {
            event: event,
            guests: guests,
            items: items
          };
        };
      };
    }).ap(getEventTask(http)(mdl)).ap((0, _Http.getItemsTask)(http)(mdl)).ap(getEventGuestsTask(http)(mdl));
  };
};

exports.loadEventTask = loadEventTask;

var deleteEventTask = function deleteEventTask(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.deleteTask(mdl)("data/Events/".concat(id)).chain(function () {
        return http.backEnd.deleteTask(mdl)("data/bulk/Invites?where=eventId%3D'".concat(id, "'"));
      });
    };
  };
};

exports.deleteEventTask = deleteEventTask;

var submitEventTask = function submitEventTask(http) {
  return function (mdl) {
    return function (_ref3) {
      var allDay = _ref3.allDay,
          startTime = _ref3.startTime,
          endTime = _ref3.endTime,
          title = _ref3.title,
          notes = _ref3.notes,
          inPerson = _ref3.inPerson,
          location = _ref3.location,
          latlong = _ref3.latlong;
      var end = M.utc(mdl.selectedDate()).hour((0, _Utils.getHour)(endTime)).minute((0, _Utils.getMin)(endTime));
      var start = M.utc(mdl.selectedDate()).hour((0, _Utils.getHour)(startTime)).minute((0, _Utils.getMin)(startTime));
      return http.backEnd.postTask(mdl)("data/Events")({
        end: end,
        start: start,
        notes: notes,
        title: title,
        allDay: allDay,
        inPerson: inPerson,
        location: location,
        latlong: latlong,
        createdBy: mdl.User.objectId
      }).chain(function (_ref4) {
        var objectId = _ref4.objectId,
            ownerId = _ref4.ownerId,
            end = _ref4.end,
            start = _ref4.start,
            title = _ref4.title;
        var eventId = objectId;
        var userId = ownerId;
        var status = 1;
        return (0, _Http.createInviteTask)(http)(mdl)({
          eventId: eventId,
          userId: userId,
          status: status,
          end: end,
          start: start,
          title: title,
          allDay: allDay,
          inPerson: inPerson,
          location: location,
          latlong: latlong
        }).chain(function (_ref5) {
          var objectId = _ref5.objectId;
          var inviteId = objectId;
          return _data.default.of(function (user) {
            return function (event) {
              return {
                user: user,
                event: event
              };
            };
          }).ap(http.backEnd.postTask(mdl)("data/Users/".concat(mdl.User.objectId, "/invites%3AInvites%3An"))([inviteId])).ap(http.backEnd.postTask(mdl)("data/Events/".concat(eventId, "/invites%3AInvites%3An"))([inviteId]));
        });
      });
    };
  };
};

exports.submitEventTask = submitEventTask;
});

;require.register("Http/http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTP = exports.parseHttpSuccess = exports.parseHttpError = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _secrets = require("../.secrets.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var onProgress = function onProgress(mdl) {
  return function (e) {
    if (e.lengthComputable) {
      mdl.State.loadingProgress.max = e.total;
      mdl.State.loadingProgress.value = e.loaded;
      m.redraw();
    }
  };
};

function onLoad() {
  return false;
}

var onLoadStart = function onLoadStart(mdl) {
  return function (e) {
    mdl.State.isLoading(true);
    return false;
  };
};

var onLoadEnd = function onLoadEnd(mdl) {
  return function (e) {
    mdl.State.isLoading(false);
    mdl.State.loadingProgress.max = 0;
    mdl.State.loadingProgress.value = 0;
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
      mdl.State.isLoading(false);
      console.error(e);
      e.response && e.response.code == 3064 && m.route.set("/logout");
      return rej(e.response);
    };
  };
};

exports.parseHttpError = parseHttpError;

var parseHttpSuccess = function parseHttpSuccess(mdl) {
  return function (res) {
    return function (data) {
      mdl.State.isLoading(false);
      return res(data);
    };
  };
};

exports.parseHttpSuccess = parseHttpSuccess;

var HttpTask = function HttpTask(_headers) {
  return function (method) {
    return function (mdl) {
      return function (url) {
        return function (body) {
          mdl.State.isLoading(true);
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
var OpenCageUrl = "".concat(_secrets.OpenCage.baseUrl, "?key=").concat(_secrets.OpenCage.key, "&q=");
var openCage = {
  getLocationTask: function getLocationTask(mdl) {
    return function (query) {
      return HttpTask(_secrets.OpenCage.headers())("GET")(mdl)(OpenCageUrl + query + "&pretty=1")(null);
    };
  }
};
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
  },
  deleteTask: function deleteTask(mdl) {
    return function (url) {
      return HttpTask(_secrets.BackEnd.headers())("DELETE")(mdl)(backEndUrl + url)(null);
    };
  }
};
var HTTP = {
  openCage: openCage,
  backEnd: backEnd,
  HttpTask: HttpTask
};
exports.HTTP = HTTP;
});

;require.register("Http/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("./http.js");

Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _http[key];
    }
  });
});

var _invitesTasks = require("./invites-tasks.js");

Object.keys(_invitesTasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _invitesTasks[key];
    }
  });
});

var _eventsTasks = require("./events-tasks.js");

Object.keys(_eventsTasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventsTasks[key];
    }
  });
});

var _itemsTasks = require("./items-tasks.js");

Object.keys(_itemsTasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _itemsTasks[key];
    }
  });
});

var _userTasks = require("./user-tasks.js");

Object.keys(_userTasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userTasks[key];
    }
  });
});

var _openCage = require("./open-cage.js");

Object.keys(_openCage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _openCage[key];
    }
  });
});
});

;require.register("Http/invites-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInviteTask = exports.sendInviteTask = exports.getInvitesTaskByEventId = exports.getInvitesTask = exports.updateInviteTask = exports.toInviteViewModel = void 0;

var _ramda = require("ramda");

var _Http = require("Http");

var _data = _interopRequireDefault(require("data.task"));

var _Utils = require("Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toInviteViewModel = function toInviteViewModel(_ref) {
  var start = _ref.start,
      end = _ref.end,
      title = _ref.title,
      objectId = _ref.objectId,
      eventId = _ref.eventId,
      status = _ref.status,
      userId = _ref.userId;
  return {
    start: M.utc(start),
    end: M.utc(end),
    objectId: objectId,
    eventId: eventId,
    title: title,
    status: status,
    userId: userId
  };
};

exports.toInviteViewModel = toInviteViewModel;

var toInviteDto = function toInviteDto(_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      title = _ref2.title,
      eventId = _ref2.eventId,
      status = _ref2.status,
      userId = _ref2.userId;
  return {
    start: start,
    end: end,
    eventId: eventId,
    title: title,
    status: status,
    userId: userId
  };
};

var updateInviteTask = function updateInviteTask(http) {
  return function (mdl) {
    return function (invite) {
      return http.backEnd.putTask(mdl)("data/Invites/".concat(invite.objectId))(toInviteDto(invite)).map(toInviteViewModel);
    };
  };
};

exports.updateInviteTask = updateInviteTask;

var getInvitesTask = function getInvitesTask(http) {
  return function (mdl) {
    return http.backEnd.getTask(mdl)("data/Invites?pageSize=100&where=userId%3D'".concat(mdl.User.objectId, "'&sortBy=start%20asc")).map((0, _ramda.map)(toInviteViewModel));
  };
};

exports.getInvitesTask = getInvitesTask;

var getInvitesTaskByEventId = function getInvitesTaskByEventId(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.getTask(mdl)("data/Invites?pageSize=100&where=eventId%3D'".concat(id, "'&sortBy=start%20asc")).map((0, _ramda.map)(toInviteViewModel));
    };
  };
};

exports.getInvitesTaskByEventId = getInvitesTaskByEventId;

var sendInviteTask = function sendInviteTask(http) {
  return function (mdl) {
    return function (guestEmail, _ref3) {
      var eventId = _ref3.eventId,
          start = _ref3.start,
          end = _ref3.end,
          title = _ref3.title,
          allDay = _ref3.allDay,
          inPerson = _ref3.inPerson,
          location = _ref3.location,
          latlong = _ref3.latlong;
      return (0, _Http.findUserByEmailTask)(http)(mdl)(guestEmail).chain(function (users) {
        return users.any() ? createInviteTask(http)(mdl)({
          eventId: eventId,
          userId: users[0].objectId,
          status: 2,
          end: end,
          start: start,
          title: title,
          allDay: allDay,
          inPerson: inPerson,
          location: location,
          latlong: latlong
        }) : _data.default.rejected("No User with that email");
      });
    };
  };
};

exports.sendInviteTask = sendInviteTask;

var createInviteTask = function createInviteTask(http) {
  return function (mdl) {
    return function (_ref4) {
      var eventId = _ref4.eventId,
          userId = _ref4.userId,
          status = _ref4.status,
          end = _ref4.end,
          start = _ref4.start,
          title = _ref4.title,
          allDay = _ref4.allDay,
          inPerson = _ref4.inPerson,
          location = _ref4.location,
          latlong = _ref4.latlong;
      return http.backEnd.postTask(mdl)("data/Invites")({
        eventId: eventId,
        userId: userId,
        status: status,
        end: end,
        start: start,
        title: title,
        allDay: allDay,
        inPerson: inPerson,
        location: location,
        latlong: latlong
      });
    };
  };
};

exports.createInviteTask = createInviteTask;
});

;require.register("Http/items-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemTask = exports.deleteItemTask = exports.getItemsTask = exports.addItemTask = void 0;

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addItemTask = function addItemTask(http) {
  return function (mdl) {
    return function (_ref) {
      var name = _ref.name,
          quantity = _ref.quantity;
      return http.backEnd.postTask(mdl)("data/Items")({
        eventId: mdl.Events.currentEventId(),
        name: name,
        quantity: parseInt(quantity)
      }).chain(function (_ref2) {
        var objectId = _ref2.objectId;
        var itemId = objectId;
        return _data.default.of(function (user) {
          return function (event) {
            return {
              user: user,
              event: event
            };
          };
        }).ap(http.backEnd.postTask(mdl)("data/Users/".concat(mdl.User.objectId, "/items%3AItems%3An"))([itemId])).ap(http.backEnd.postTask(mdl)("data/Events/".concat(mdl.Events.currentEventId(), "/items%3AItems%3An"))([itemId]));
      });
    };
  };
};

exports.addItemTask = addItemTask;

var getItemsTask = function getItemsTask(http) {
  return function (mdl) {
    return http.backEnd.getTask(mdl)("data/Items?pageSize=100&where=eventId%3D'".concat(mdl.Events.currentEventId(), "'&sortBy=name%20asc"));
  };
};

exports.getItemsTask = getItemsTask;

var deleteItemTask = function deleteItemTask(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.deleteTask(mdl)("data/Items/".concat(id));
    };
  };
};

exports.deleteItemTask = deleteItemTask;

var updateItemTask = function updateItemTask(http) {
  return function (mdl) {
    return function (item) {
      return http.backEnd.putTask(mdl)("data/Items/".concat(item.objectId))(item);
    };
  };
};

exports.updateItemTask = updateItemTask;
});

;require.register("Http/open-cage.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locateQueryTask = void 0;

var _ramda = require("ramda");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toOpenCageFormat = function toOpenCageFormat(q) {
  return q.replace(/\s/g, "+").replace(/,/g, "%2C");
};

var toLocationViewModel = function toLocationViewModel(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      address = _ref2[0],
      ll = _ref2[1];

  return {
    address: address,
    latlong: JSON.stringify(ll)
  };
};

var locateQueryTask = function locateQueryTask(http) {
  return function (mdl) {
    return function (query) {
      return http.openCage.getLocationTask(mdl)(toOpenCageFormat(query)).map((0, _ramda.prop)("results")).map((0, _ramda.map)((0, _ramda.paths)([["formatted"], ["geometry"]]))).map((0, _ramda.map)(toLocationViewModel));
    };
  };
};

exports.locateQueryTask = locateQueryTask;
});

;require.register("Http/user-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserByEmailTask = exports.updateUserProfile = exports.getUserProfileTask = exports.linkProfileTask = exports.createProfileTask = exports.registerTask = exports.loginTask = exports.setUserToken = void 0;

var setUserToken = function setUserToken(mdl) {
  return function (user) {
    sessionStorage.setItem("shindigit-user", JSON.stringify(user));
    sessionStorage.setItem("shindigit-user-token", user["user-token"]);
    mdl.State.isAuth(true);
    mdl.User = user;
    return user;
  };
};

exports.setUserToken = setUserToken;

var loginTask = function loginTask(http) {
  return function (mdl) {
    return function (_ref) {
      var email = _ref.email,
          password = _ref.password;
      return http.backEnd.postTask(mdl)("users/login")({
        login: email,
        password: password
      }).map(setUserToken(mdl));
    };
  };
};

exports.loginTask = loginTask;

var registerTask = function registerTask(http) {
  return function (mdl) {
    return function (_ref2) {
      var name = _ref2.name,
          email = _ref2.email,
          password = _ref2.password,
          isAdmin = _ref2.isAdmin;
      return http.backEnd.postTask(mdl)("users/register")({
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin
      });
    };
  };
};

exports.registerTask = registerTask;

var createProfileTask = function createProfileTask(http) {
  return function (mdl) {
    return http.backEnd.postTask(mdl)("data/Profiles")({
      userId: mdl.User.objectId,
      name: mdl.User.name,
      email: mdl.User.email
    });
  };
};

exports.createProfileTask = createProfileTask;

var linkProfileTask = function linkProfileTask(http) {
  return function (mdl) {
    return http.backEnd.postTask(mdl)("data/Users/".concat(mdl.User.objectId, "/profile%3AProfiles%3A1"))([mdl.User.profile.objectId]);
  };
};

exports.linkProfileTask = linkProfileTask;

var getUserProfileTask = function getUserProfileTask(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.getTask(mdl)("data/Profiles?where=userId%3D'".concat(id, "'"));
    };
  };
};

exports.getUserProfileTask = getUserProfileTask;

var updateUserProfile = function updateUserProfile(http) {
  return function (mdl) {
    return function (profile) {
      return http.backEnd.putTask(mdl)("data/Profiles/".concat(mdl.User.profile.objectId))(profile);
    };
  };
};

exports.updateUserProfile = updateUserProfile;

var findUserByEmailTask = function findUserByEmailTask(http) {
  return function (mdl) {
    return function (email) {
      return http.backEnd.getTask(mdl)("data/Users?where=email%3D'".concat(email, "'"));
    };
  };
};

exports.findUserByEmailTask = findUserByEmailTask;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.inviteModel = exports.dayModel = void 0;

var _Utils = require("Utils");

var _calendarModel = require("Components/calendar/calendar-model");

var State = {
  isAuth: Stream(false),
  modal: Stream(false),
  isLoading: Stream(false),
  loadingProgress: {
    max: 0,
    value: 0
  },
  isLoggedIn: function isLoggedIn() {
    return sessionStorage.getItem("token");
  },
  is24Hrs: Stream(true),
  toAnchor: Stream(false),
  slug: ""
};

var dayModel = function dayModel(mdl) {
  return (0, _Utils.getHoursInDay)().reduce(function (day, hour) {
    day[hour] = []; // console.log(day, hour)

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
var Events = {
  currentEventId: Stream(null),
  currentEventStart: Stream(null)
};
var Invites = {
  fetch: Stream(false)
};
var Day = {
  data: dayModel({
    State: State
  }),
  update: Stream(false),
  listView: Stream(true)
};
var Home = {
  modal: Stream(false)
};
var Settings = {
  profile: "",
  inspector: ""
};
var Calendar = {
  data: (0, _calendarModel.calendarModel)({
    mdl: Model,
    invites: [],
    date: M.utc()
  })
};
var User = {};
var Sidebar = {
  isShowing: Stream(false)
};
var Model = {
  selectedDate: Stream(""),
  todayDate: Stream(M.utc()),
  Calendar: Calendar,
  Day: Day,
  Events: Events,
  Invites: Invites,
  State: State,
  Settings: Settings,
  User: User,
  Home: Home,
  Sidebar: Sidebar
};
var _default = Model;
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

;require.register("Pages/Auth/login-user.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;

var _Utils = require("Utils");

var _Validations = require("./Validations.js");

var _Http = require("Http");

var _ramda = require("ramda");

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
        mdl.User.account = account;
        m.route.set("/".concat(mdl.User.name, "/").concat(mdl.todayDate().format("YYYY-MM-DD")));
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateLoginTask)(data.userModel).chain((0, _Http.loginTask)(_Http.HTTP)(mdl)).chain(function (user) {
      mdl.User = user;
      return (0, _Http.getUserProfileTask)(_Http.HTTP)(mdl)(mdl.User.objectId);
    }).map((0, _ramda.map)(function (profile) {
      mdl.User.profile = profile;
      (0, _Http.setUserToken)(mdl)(mdl.User);
    })).fork(onError, onSuccess(mdl));
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
  return {
    onremove: function onremove() {
      return resetState();
    },
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".login-pag.full-width", [state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container", {
        role: "form",
        id: "Login-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m("input", {
        class: state.isSubmitted ? state.errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.email = e.target.value;
        },
        value: state.data.userModel.email
      }), state.errors.email && m("span.error-field", state.errors.email), m("input", {
        class: state.isSubmitted ? state.errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          // state.isSubmitted && validateForm(mdl)(state.data)
          state.data.userModel.password = e.target.value;
        },
        value: state.data.userModel.password
      }), state.errors.password && m("span.error-field", state.errors.password)]), state.httpError && m(".error-field", state.httpError)], m(m.route.Link, {
        // type: "submit",
        selector: "button",
        form: "login-form",
        onclick: function onclick(e) {
          e.preventDefault();
          validateForm(mdl)(state.data);
        },
        class: "max-width mt-20"
      }, m("p.text-centered", "Login")), m(m.route.Link, {
        href: "/register",
        class: "max-width"
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

var _Http = require("Http");

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
        state.errors = {};
        sessionStorage.setItem("shindigit-user-token", mdl.User["user-token"]);
        sessionStorage.setItem("shindigit-user", JSON.stringify(mdl.User));
        m.route.set("/".concat(mdl.User.name, "/").concat(M.utc().format("YYYY-MM-DD")));
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateUserRegistrationTask)(data.userModel).chain((0, _Http.registerTask)(_Http.HTTP)(mdl)).chain(function (_) {
      return (0, _Http.loginTask)(_Http.HTTP)(mdl)({
        email: data.userModel.email,
        password: data.userModel.password
      }).chain(function (_) {
        return (0, _Http.createProfileTask)(_Http.HTTP)(mdl);
      }).chain(function (profile) {
        mdl.User.profile = profile;
        return (0, _Http.linkProfileTask)(_Http.HTTP)(mdl);
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
      return [m("input", {
        class: isSubmitted ? errors.name ? "has-error" : "has-success" : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: function onkeyup(e) {
          return data.name = e.target.value;
        },
        value: data.name
      }), errors.name && m("span.error-field", errors.name), m("input", {
        class: isSubmitted ? errors.email ? "has-error" : "has-success" : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: function onkeyup(e) {
          return data.email = e.target.value;
        },
        value: data.email
      }), errors.email && m("span.error-field", errors.email), m("input", {
        id: "confirmEmail",
        class: isSubmitted ? errors.confirmEmail ? "has-error" : "has-success" : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: function onkeyup(e) {
          return data.confirmEmail = e.target.value;
        },
        value: data.confirmEmail
      }), errors.confirmEmail && m("span.error-field", errors.confirmEmail), m("input", {
        class: isSubmitted ? errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: function onkeyup(e) {
          return data.password = e.target.value;
        },
        value: data.password
      }), errors.password && m("span.error-field", errors.password), m("input", {
        class: isSubmitted ? errors.confirmPassword ? "has-error" : "has-success" : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: function onkeyup(e) {
          return data.confirmPassword = e.target.value;
        },
        value: data.confirmPassword
      }), errors.confirmPassword && m("span.error-field", errors.confirmPassword)];
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
      return [m(".register-page.full-width", state.showErrorMsg() && m("code.warning", state.errorMsg()), m("form.frow-container", {
        role: "form",
        id: "Register-form",
        onsubmit: function onsubmit(e) {
          return e.preventDefault();
        }
      }, [m(RegisterUser, {
        data: state.data.userModel,
        errors: state.errors,
        isSubmitted: state.isSubmitted
      })]), m(m.route.Link, {
        selector: "button",
        form: "register-form",
        onclick: function onclick(e) {
          e.preventDefault();
          validateForm(mdl)(state.data);
        },
        class: "max-width mt-20"
      }, m("p", "Register")), m(m.route.Link, {
        href: "/login",
        class: "max-width"
      }, "Need to  login ?")), state.httpError && m(".toast toast-error", state.httpError)];
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

var _ramda = require("ramda");

var _mapboxGl = _interopRequireDefault(require("mapbox-gl/dist/mapbox-gl.js"));

var _Http = require("Http");

var _Components = require("Components");

var _cjs = require("@mithril-icons/clarity/cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Event = function Event(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    error: {},
    status: "loading",
    info: {
      show: Stream(false)
    },
    rsvp: {
      name: "",
      show: Stream(false),
      status: Stream("success"),
      error: Stream(null)
    },
    edit: {
      show: Stream(false)
    },
    items: {
      name: "",
      quantity: "",
      show: Stream(false)
    }
  };
  var data = {
    event: {},
    guests: [],
    items: []
  };

  var load = function load(_ref2) {
    var mdl = _ref2.attrs.mdl;

    var onError = function onError(err) {
      state.error = (0, _Utils.jsonCopy)(err);
      console.log("state.e", state.error);
      state.status = "failed";
    };

    var onSuccess = function onSuccess(_ref3) {
      var event = _ref3.event,
          guests = _ref3.guests,
          _ref3$items = _ref3.items,
          items = _ref3$items === void 0 ? [] : _ref3$items;
      data.event = event;
      data.guests = guests;
      data.items = items;
      state.error = {};
      state.status = "success";
      console.log(mdl.User.objectId, data.guests);
    };

    (0, _Http.loadEventTask)(_Http.HTTP)(mdl).fork(onError, onSuccess);
  };

  var deleteEvent = function deleteEvent(mdl) {
    var onError = function onError(err) {
      state.error = (0, _Utils.jsonCopy)(err);
      console.log("state.e", state.error);
      state.status = "failed";
    };

    var onSuccess = function onSuccess() {
      state.error = {};
      state.status = "success";
      m.route.set("/".concat(mdl.User.name, "/").concat(mdl.selectedDate().format("YYYY-MM-DD")));
    };

    (0, _Http.deleteEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId()).fork(onError, onSuccess);
  };

  var updateInvite = function updateInvite(mdl) {
    return function (invite) {
      var onError = function onError(err) {
        state.error = (0, _Utils.jsonCopy)(err);
        console.log("state.e", state.error);
        state.status = "failed";
      };

      var onSuccess = function onSuccess(invite) {
        // data.invite = invite
        console.log("success", invite);
        state.error = {};
        state.status = "success";
      };

      console.log("need to fix", invite);
      (0, _Http.updateInviteTask)(_Http.HTTP)(mdl)(invite).fork(onError, onSuccess);
    };
  };

  var updateItem = function updateItem(mdl) {
    return function (item, idx) {
      var onError = function onError(err) {
        state.error = (0, _Utils.jsonCopy)(err);
        console.log("state.e", state.error);
        state.status = "failed";
      };

      var onSuccess = function onSuccess(item) {
        data.items.removeAt(idx);
        data.items.insertAt(idx, item);
        state.error = {};
        state.items.name = "";
        state.items.quantity = "";
        state.status = "success";
      };

      (0, _Http.updateItemTask)(_Http.HTTP)(mdl)(item).fork(onError, onSuccess);
    };
  };

  var deleteItem = function deleteItem(mdl) {
    return function (itemId) {
      var onError = function onError(err) {
        state.error = (0, _Utils.jsonCopy)(err);
        console.log("state.e", state.error);
        state.status = "failed";
      };

      var onSuccess = function onSuccess(_ref4) {
        var event = _ref4.event,
            guests = _ref4.guests,
            items = _ref4.items;
        data.items = items;
        data.event = event;
        data.guests = guests;
        state.error = {};
        console.log("deleted s", state);
        state.status = "success";
      };

      (0, _Http.deleteItemTask)(_Http.HTTP)(mdl)(itemId).chain(function (_) {
        return (0, _Http.loadEventTask)(_Http.HTTP)(mdl);
      }).fork(onError, onSuccess);
    };
  };

  var addItem = function addItem(mdl) {
    var onError = function onError(err) {
      state.error = (0, _Utils.jsonCopy)(err);
      console.log("state.e", state.error);
      state.status = "failed";
    };

    var onSuccess = function onSuccess(_ref5) {
      var event = _ref5.event,
          guests = _ref5.guests,
          items = _ref5.items;
      data.items = items;
      data.event = event;
      data.guests = guests;
      state.error = {};
      state.items.name = "";
      state.items.quantity = "";
      console.log("add success", state);
      state.status = "success";
    };

    (0, _Http.addItemTask)(_Http.HTTP)(mdl)({
      name: state.items.name,
      quantity: state.items.quantity
    }).chain(function (_) {
      return (0, _Http.loadEventTask)(_Http.HTTP)(mdl);
    }).fork(onError, onSuccess);
  };

  var sendInvite = function sendInvite(mdl) {
    var onError = function onError(err) {
      // console.log("error", state, err)
      state.rsvp.error(err);
      state.rsvp.status("failed");
    };

    var onSuccess = function onSuccess(_ref6) {
      var event = _ref6.event,
          guests = _ref6.guests,
          items = _ref6.items;
      data.items = items;
      data.event = event;
      data.guests = guests;
      state.error = {};
      state.rsvp.email = "";
      console.log("invite add success", data);
      state.status = "success";
    };

    state.rsvp.error(null);
    (0, _Http.sendInviteTask)(_Http.HTTP)(mdl)(state.rsvp.email, data.event).chain(function (_) {
      return (0, _Http.loadEventTask)(_Http.HTTP)(mdl);
    }).fork(onError, onSuccess);
  };

  var setupMap = function setupMap(_ref7) {
    var dom = _ref7.dom;
    _mapboxGl.default.accessToken = "pk.eyJ1IjoiYm9hemJsYWtlIiwiYSI6ImNqdWJ4OGk4YzBpYXU0ZG5wNDI1OGM0eTIifQ.5UV0HkEGPiKUzFdbgdr5ww";
    var coords = JSON.parse(data.event.latlong);

    var createMarker = function createMarker() {
      return new _mapboxGl.default.Marker().setLngLat(coords).addTo(map);
    };

    var map = new _mapboxGl.default.Map({
      container: dom,
      center: coords,
      zoom: 15,
      style: "mapbox://styles/mapbox/streets-v11"
    });
    createMarker();
  };

  return {
    oninit: load,
    view: function view() {
      return m(".event-page", [state.status == "loading" && m(".", "Fetching Event..."), state.status == "failed" && m(".code", state.error.message), state.status == "success" && m(".centered-column", [m("h1.", data.event.title), m("h3", "".concat(data.event.date, " | ").concat(data.event.startTime, " - ").concat(data.event.endTime)), m(".accordian", [m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "info",
        title: "Info"
      }, [m("label", data.event.notes), m(".map", {
        style: {
          width: "250px",
          height: "250px"
        },
        oncreate: setupMap
      })]), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "rsvp",
        title: "RSVP"
      }, m(".rsvp-container", [m(".frow row", [m("input.col-xs-4-5", {
        placeholder: "email",
        value: state.rsvp.email,
        oninput: function oninput(e) {
          return state.rsvp.email = e.target.value;
        },
        type: "email"
      }), m("button.col-xs-1-5", {
        onclick: function onclick(e) {
          return sendInvite(mdl);
        }
      }, m(_cjs.AddLine)), state.rsvp.error() && m("code.error-field", state.rsvp.error())]), m(".frow row-start", [m(".col-xs-1-2", mdl.User.name), m(".col-xs-1-2", m(_Components.AttendanceResponse, {
        mdl: mdl,
        guest: (0, _ramda.head)(data.guests.filter((0, _ramda.propEq)("userId", mdl.User.objectId))),
        updateInvite: updateInvite
      }))]), data.guests.filter((0, _ramda.compose)(_ramda.not, (0, _ramda.propEq)("userId", mdl.User.objectId))).map(function (guest) {
        return m(".frow row-start", [m(".col-xs-1-2", guest.name), m(".col-xs-1-2", m(_Components.AttendanceResponse, {
          mdl: mdl,
          guest: guest,
          updateInvite: updateInvite
        }))]);
      })])), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "items",
        title: "Items"
      }, [m(".frow row", [m("input.col-xs-1-2", {
        placeholder: "name",
        value: state.items.name,
        oninput: function oninput(e) {
          return state.items.name = e.target.value;
        },
        type: "text"
      }), m("input.col-xs-1-4", {
        placeholder: "quantity",
        value: state.items.quantity,
        oninput: function oninput(e) {
          return state.items.quantity = e.target.value;
        },
        type: "number",
        pattern: "mobile"
      }), m("button.col-xs-1-5", {
        onclick: function onclick(e) {
          return addItem(mdl);
        }
      }, m(_cjs.AddLine))]), m(".event-items", data.items.map(function (i, idx) {
        return m(".event-items-item frow ", [m(".col-xs-1-2 ", m("label", m("h4", i.name), i.userId || m("i", "click to select"))), m(".col-xs-1-2 frow items-center", [m(".col-xs-1-3", i.quantity), m(".col-xs-1-3 ", [m(_cjs.AngleLine, {
          onclick: function onclick(e) {
            i.quantity++;
            updateItem(mdl)(i, idx);
          }
        }), m(_cjs.AngleLine, {
          onclick: function onclick(e) {
            i.quantity--;
            updateItem(mdl)(i, idx);
          },
          class: "decrement"
        })]), m(".col-xs-1-3", m(_cjs.RemoveLine, {
          onclick: function onclick(e) {
            return deleteItem(mdl)(i.objectId);
          }
        }))])]);
      }))]), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "edit",
        title: "Edit"
      }, [m("button", {
        onclick: function onclick(e) {
          return deleteEvent(mdl);
        }
      }, "delete")])])])]);
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

var _Http = require("Http");

var _Models = require("Models");

var _Utils = require("Utils");

var toDayViewModel = function toDayViewModel(dayViewModel, invite) {
  dayViewModel["".concat(invite.start.format("HH"), ":00")].push(invite);
  return dayViewModel;
};

var createDayVM = function createDayVM(mdl) {
  return function (invites) {
    return invites.reduce(toDayViewModel, (0, _Models.dayModel)(mdl, mdl.selectedDate()));
  };
};

var getSelectedDayInvites = function getSelectedDayInvites(mdl) {
  return function (invites) {
    return invites.filter(function (i) {
      return (0, _Utils.datesAreSame)(i.start)(mdl.selectedDate())("YYYY-MM-DD");
    });
  };
};

var Home = function Home(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    error: null,
    status: "loading",
    invites: null,
    events: null
  };

  var load = function load(_ref2) {
    var mdl = _ref2.attrs.mdl;
    mdl.Home.modal(false);

    var onError = function onError(err) {
      state.error = err;
      state.status = "failed";
    };

    var onSuccess = function onSuccess(invites) {
      mdl.Invites.fetch(false);
      state.invites = invites;
      state.error = null;
      state.status = "success";
    };

    (0, _Http.getInvitesTask)(_Http.HTTP)(mdl).fork(onError, onSuccess);
  };

  return {
    oninit: load,
    onupdate: function onupdate(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return mdl.Invites.fetch() && load({
        attrs: {
          mdl: mdl
        }
      });
    },
    view: function view(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return m(".frow  ", state.status == "loading" && m("p.full-width", "FETCHING EVENTS..."), state.status == "failed" && m("p.full-width", "FAILED TO FETCH EVENTS"), state.status == "success" && [m(_Components.Calendar, {
        mdl: mdl,
        date: mdl.selectedDate(),
        invites: state.invites
      }), m(".frow.max-width", [m(".".concat(mdl.Home.modal() ? "bg-warn.col-xs-1-1." : "bg-info.col-xs-2-3"), m("button.max-width", {
        onclick: function onclick(e) {
          return mdl.Home.modal(!mdl.Home.modal());
        }
      }, mdl.Home.modal() ? "Cancel" : "Add Event")), !mdl.Home.modal() && m(".col-xs-1-3.".concat(mdl.Day.listView() ? "bg-warn" : "bg-info"), m("button.max-width", {
        onclick: function onclick(e) {
          return mdl.Day.listView(!mdl.Day.listView());
        }
      }, mdl.Day.listView() ? "Hour View" : "List View"))]), mdl.Home.modal() ? m(_Components.Editor, {
        mdl: mdl
      }) : m(_Components.Day, {
        mdl: mdl,
        day: createDayVM(mdl)(getSelectedDayInvites(mdl)(state.invites)),
        invites: getSelectedDayInvites(mdl)(state.invites)
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

var _event = require("./event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _event[key];
    }
  });
});

var _profile = require("./profile");

Object.keys(_profile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _profile[key];
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

;require.register("Pages/profile.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

var _Http = require("Http");

var Profile = function Profile() {
  var state = {
    errors: null,
    status: "loading"
  };

  var updatePrefs = function updatePrefs(mdl) {
    var onError = function onError(err) {
      state.error = err;
      state.status = "failed";
    };

    var onSuccess = function onSuccess(profile) {
      mdl.User.profile = profile;
      state.error = null;
      state.status = "success";
      (0, _Http.setUserToken)(mdl)(mdl.User);
    };

    (0, _Http.updateUserProfile)(_Http.HTTP)(mdl)(mdl.User.profile).fork(onError, onSuccess);
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      // console.log(mdl)
      return m(".profile-page", [m("h1", "Profile Page"), m("label", "Use 24 Hrs", m("input", {
        type: "checkbox",
        checked: mdl.User.profile.is24Hrs,
        onclick: function onclick(e) {
          mdl.User.profile.is24Hrs = !mdl.User.profile.is24Hrs;
          updatePrefs(mdl);
        }
      }))]);
    }
  };
};

exports.Profile = Profile;
});

;require.register("Routes/authenticated-routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Components = require("Components");

var _Pages = require("Pages");

var _Utils = require("Utils");

var AuthenticatedRoutes = [{
  id: "profile",
  name: "Profile",
  // icon: Icons.logo,
  route: "/profile/:name",
  position: ["toolbar"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {},
  component: function component(mdl) {
    return m(_Components.Layout, {
      mdl: mdl
    }, m(_Pages.Profile, {
      mdl: mdl
    }));
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
    var date = M.utc(args.date).clone();
    mdl.selectedDate(date);
  },
  component: function component(mdl) {
    return m(_Components.Layout, {
      mdl: mdl
    }, m(_Pages.Home, {
      mdl: mdl
    }));
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
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {// if (
    //   m.route.param().username == mdl.User.name &&
    //   !mdl.Events.currentEventId()
    // ) {
    //   mdl.Events.currentEventId(localStorage.getItem("eventId"))
    // }
  },
  component: function component(mdl) {
    return m(_Components.Layout, {
      mdl: mdl
    }, m(_Pages.Event, {
      mdl: mdl
    }));
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

var _Components = require("Components");

var Routes = [{
  id: "shindig-it",
  name: m(".Logo"),
  // icon: Icons.home,
  route: "/splash",
  isNav: true,
  group: ["toolbar"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute) {},
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
  onmatch: function onmatch(mdl, args, path, fullroute) {},
  component: function component(mdl) {
    return m(_Components.AuthLayout, m(_Pages.Login, {
      mdl: mdl
    }));
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
  onmatch: function onmatch(mdl, args, path, fullroute) {},
  component: function component(mdl) {
    return m(_Components.AuthLayout, m(_Pages.Register, {
      mdl: mdl
    }));
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

;require.register("Utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  log: true,
  debounce: true,
  inviteOptions: true,
  getInviteStatusColor: true,
  rand: true,
  randomPause: true,
  Pause: true,
  NoOp: true,
  nameFromRoute: true,
  jsonCopy: true,
  isSideBarActive: true,
  range: true,
  isEqual: true
};
exports.isEqual = exports.range = exports.isSideBarActive = exports.jsonCopy = exports.nameFromRoute = exports.NoOp = exports.Pause = exports.randomPause = exports.rand = exports.getInviteStatusColor = exports.inviteOptions = exports.debounce = exports.log = void 0;

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

var debounce = function debounce(wait) {
  return function (func, immediate) {
    console.log(wait);
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
};

exports.debounce = debounce;
var inviteOptions = ["decline", "accept", "maybe"];
exports.inviteOptions = inviteOptions;

var getInviteStatusColor = function getInviteStatusColor(status) {
  return getComputedStyle(document.body).getPropertyValue("--".concat(inviteOptions[status], "-invite"));
};

exports.getInviteStatusColor = getInviteStatusColor;

var secureImg = function secureImg(url) {
  return url.match(/(https)./) ? url : url.replace("http", "https");
};

var rand = function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.rand = rand;

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
exports.firstInviteHour = exports.shortDateString = exports.toHourViewModel = exports.getFullDate = exports.fromFullDate = exports.monthsOfTheYear = exports.daysOfTheWeek = exports.isToday = exports.datesAreSame = exports.getHoursInDay = exports.displayTimeFormat = exports.getMin = exports.getHour = exports.pad0Left = exports.pad00Min = exports.padding = void 0;

var _index = require("./index");

var _ramda = require("ramda");

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

var getHour = function getHour(time) {
  return time.split(":")[0];
};

exports.getHour = getHour;

var getMin = function getMin(time) {
  return time.split(":")[1];
};

exports.getMin = getMin;

var displayTimeFormat = function displayTimeFormat(mdl) {
  return mdl.User.profile.is24Hrs ? "HH:mm" : "h:mm a";
}; //need to fix to work for 12 hrs


exports.displayTimeFormat = displayTimeFormat;

var getHoursInDay = function getHoursInDay(format) {
  return (0, _index.range)(24).map(function (n) {
    // console.log("n", n, M().hour(n).format('HH'))
    return M().hour(n).format("HH");
  }).map(pad00Min);
};

exports.getHoursInDay = getHoursInDay;

var datesAreSame = function datesAreSame(first) {
  return function (second) {
    return function (format) {
      var f = M.utc(first).format(format);
      var s = M.utc(second).format(format);
      return M.utc(f).isSame(M.utc(s));
    };
  };
};

exports.datesAreSame = datesAreSame;

var isToday = function isToday(someDate) {
  var today = new Date();
  var date = new Date(someDate.toString());
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
var firstInviteHour = (0, _ramda.compose)(_ramda.head, (0, _ramda.sort)(function (a, b) {
  return a - b;
}), (0, _ramda.map)(function (mStart) {
  return mStart && parseInt(mStart.format("HH"));
}), (0, _ramda.pluck)("start"));
exports.firstInviteHour = firstInviteHour;
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

var _Fp = require("Fp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Fp.Fp.configure();

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
    var lastProfile = _Models.default.Settings.profile;
    _Models.default.Settings.profile = getProfile(w);
    if (lastProfile != _Models.default.Settings.profile) m.redraw();
  }

  return requestAnimationFrame(checkWidth);
};

_Models.default.Settings.profile = getProfile(winW);
checkWidth(winW);

if (sessionStorage.getItem("shindigit-user")) {
  _Models.default.User = JSON.parse(sessionStorage.getItem("shindigit-user"));

  _Models.default.State.isAuth(true);

  _Models.default.User.profile && _Models.default.State.is24Hrs(_Models.default.User.profile.is24Hrs);

  if (localStorage.getItem("shindigit-eventId")) {
    _Models.default.Events.currentEventId(localStorage.getItem("shindigit-eventId"));

    _Models.default.Events.currentEventStart(localStorage.getItem("shindigit-eventStart"));
  }
} else {
  m.route.set("/logout");
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
window.M = require("moment");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map