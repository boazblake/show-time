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
exports.Back4App = exports.OpenCage = exports.BackEnd = void 0;

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
var Back4App = {
  baseUrl: "https://shindigitdb.back4app.io",
  appId: "1blVmKMuIVf6T7jvjiFGAXta1iL8kdwehGKg83LM",
  apiKey: "CkrPBEbEOd3pxHblGCQv97kerTQENyVFVSek5yHc",
  headers: function headers(_ref) {
    var appId = _ref.appId,
        apiKey = _ref.apiKey;
    return {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": apiKey,
      "Content-Type": "application/json",
      "X-Parse-Revocable-Session": 1
    };
  }
};
exports.Back4App = Back4App;
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

;require.register("Components/OLD_invites-toast.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvitesToast = void 0;

var _cjs = require("@mithril-icons/clarity/cjs");

var _Components = require("Components");

var InvitesToast = function InvitesToast() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          style = _ref$attrs.style,
          invites = _ref$attrs.invites;
      return m(".invite-alerts-container frow reverse", invites.map(function (invite, idx) {
        return m(".invite-alert mb-10", style(idx), m(".frow mb-10", [m(".col-xs-1-2 text-ellipsis", "".concat(invite.title)), m(".col-xs-1-2", "On: ".concat(invite.start.format("MM-DD-YYYY"))), m(".col-xs-1-2", "From: ".concat(invite.start.format("HH:mm"))), m(".col-xs-1-2", "To: ".concat(invite.end.format("HH:mm")))]), m(_Components.InviteRSVP, {
          mdl: mdl,
          guest: invite,
          updateFn: function updateFn(x) {
            return console.log("update this item", invite);
          }
        }), m(_cjs.TimesCircleLine, {
          onclick: function onclick(e) {
            mdl.State.invitesToast().removeAt(idx);
            mdl.State.notifications.map(function (state) {
              return state.invites.push(invite);
            });
            mdl.Home.fetch(true);
          },
          class: "invite-alert-remove"
        }));
      }));
    }
  };
};

exports.InvitesToast = InvitesToast;
});

;require.register("Components/accordian-item.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordianItem = void 0;

var _cjs = require("@mithril-icons/clarity/cjs");

var _Styles = require("Styles");

var _Utils = require("Utils");

var AccordianItem = function AccordianItem() {
  return {
    view: function view(_ref) {
      var children = _ref.children,
          _ref$attrs = _ref.attrs,
          state = _ref$attrs.state,
          part = _ref$attrs.part,
          title = _ref$attrs.title,
          _ref$attrs$pills = _ref$attrs.pills,
          pills = _ref$attrs$pills === void 0 ? [] : _ref$attrs$pills;
      return m(".accordian-item.full-width", {
        id: part,
        oncreate: (0, _Styles.Animate)(_Styles.shutterInTop),
        onbeforeremove: (0, _Styles.Animate)(_Styles.shutterOutTop)
      }, [m(".accordian-item-title".concat(state[part].show() ? "-open" : "-closed"), m(".frow", {
        onclick: function onclick(e) {
          if (state[part].show()) {
            state.selected(null);
          } else {
            state.selected(part);
          }

          state[part].show(!state[part].show());
        }
      }, m(".col-xs-1-3", m("h4", title)), m(".col-xs-1-3", pills), m(".frow row-end col-xs-1-3", m(".accordian-item-btn", state[part].show() ? m(_cjs.TimesLine, {
        class: "clickable"
      }) : m(_cjs.AddLine, {
        class: "clickable"
      }))))), state[part].show() && m(".accordian-item-body", {
        oncreate: (0, _Styles.Animate)(_Styles.shutterInTop),
        onbeforeremove: (0, _Styles.Animate)(_Styles.shutterOutTop)
      }, [children])]);
    }
  };
};

exports.AccordianItem = AccordianItem;
});

;require.register("Components/auth-layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLayout = void 0;
var Logo = m("img.logo", {
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

var _moment = require("moment");

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
  return isSameMonth ? isCalenderDay(filterBy(day)(invites), M(day)) : isNotCalenderDay(filterBy(day)(invites), M(day), date);
};

exports.createCalendarDayViewModel = createCalendarDayViewModel;

var createCalendar = function createCalendar(mdl, invites, date) {
  var start = (0, _dateFns.parseISO)(date.clone().startOf("month").toISOString());
  var end = (0, _dateFns.parseISO)(date.clone().endOf("month").toISOString());
  var matrix = (0, _dateFns.eachWeekOfInterval)({
    start: start,
    end: end
  }, {
    weekStartsOn: 1
  });
  return matrix.map(function (weekDay) {
    // console.log(
    //   "each day of int start",
    //   weekDay
    //   // eachDayOfInterval({
    //   //   start: startOfISOWeek(weekDay),
    //   //   end: endOfISOWeek(weekDay),
    //   // })
    // )
    return (0, _dateFns.eachDayOfInterval)({
      start: (0, _dateFns.startOfWeek)(weekDay, {
        weekStartsOn: mdl.Calendar.state.start()
      }),
      end: (0, _dateFns.endOfWeek)(weekDay, {
        weekStartsOn: mdl.Calendar.state.start()
      })
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
  var today = M();

  var _date = M(date);

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
  var today = M();

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

var _cjs = require("@mithril-icons/clarity/cjs");

var Navbar = function Navbar() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          date = _ref$attrs.date;
      return m(".width-100 cal-navbar-".concat((0, _Utils.getTheme)(mdl)), m(".frow ", [m(".frow width-100 row-between", [m(m.route.Link, {
        selector: "button.btn-".concat((0, _Utils.getTheme)(mdl)),
        href: "/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(date.clone().subtract(1, "month").format("YYYY-MM-DD"))
      }, m("h4", date.clone().subtract(1, "month").format("MMM"))), m(".centerMonthGroup", [m("h2.currentMonth", date.format("MMMM")), m("h3.currentYear.text-center", date.format("YYYY"))]), m(m.route.Link, {
        selector: "button.btn-".concat((0, _Utils.getTheme)(mdl)),
        href: "/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(date.clone().add(1, "month").format("YYYY-MM-DD"))
      }, m("h4", date.clone().add(1, "month").format("MMM")))]), m(".frow width-100 row-between m-10", [m(m.route.Link, {
        selector: "button.btn-".concat((0, _Utils.getTheme)(mdl)),
        href: "/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(date.clone().subtract(1, "year").format("YYYY-MM-DD"))
      }, date.clone().subtract(1, "year").format("YYYY")), m(m.route.Link, {
        selector: "button.btn-".concat((0, _Utils.getTheme)(mdl)),
        href: "/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(date.clone().add(1, "year").format("YYYY-MM-DD"))
      }, date.clone().add(1, "year").format("YYYY"))])]));
    }
  };
};

var DaysOfWeek = function DaysOfWeek() {
  var updateStartOfWeek = function updateStartOfWeek(mdl) {
    return function (dir) {
      var prev = mdl.Calendar.state.start();
      var next = prev + dir > 6 ? 0 : prev + dir < 0 ? 6 : prev + dir;
      mdl.Calendar.state.start(next);
    };
  };

  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return m(".frow width-100 row-between mt-10", [m(_cjs.AngleLine, {
        onclick: function onclick(e) {
          return updateStartOfWeek(mdl)(1);
        },
        class: "cal-day-prev"
      }), (0, _Utils.daysOfTheWeekFrom)(mdl.Calendar.state.start()).map(function (day) {
        return m(".col-xs-1-7 text-center", m("span.width-auto.text-strong", day[0].toUpperCase()));
      }), m(_cjs.AngleLine, {
        onclick: function onclick(e) {
          return updateStartOfWeek(mdl)(-1);
        },
        class: "cal-day-next"
      })]);
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
        href: "/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(day.format("YYYY-MM-DD")),
        class: "cal-day-link",
        onclick: function onclick(e) {
          return mdl.State.toAnchor((0, _Utils.firstInviteHour)(invites) || M().format("HH"));
        }
      }, m(".".concat((0, _calendarModel.calendarDayStyle)(mdl.selectedDate(), day, dir)), [m("span.cal-date", day.format("D")), invites.any() && m(".cal-invites-item", invites.length)])));
    }
  };
}; // const CalendarBody = () => {
//   return {
//     view: ({ attrs: { mdl, date, invites } }) => {},
//   }
// }


var Calendar = function Calendar() {
  return {
    view: function view(_ref4) {
      var _ref4$attrs = _ref4.attrs,
          mdl = _ref4$attrs.mdl,
          date = _ref4$attrs.date,
          invites = _ref4$attrs.invites;
      var matrix = (0, _calendarModel.createCalendar)(mdl, invites, date);
      return m(".calendar", m(".frow", [m(Navbar, {
        mdl: mdl,
        date: date
      }), m(DaysOfWeek, {
        mdl: mdl
      }), m(".frow centered-column width-100 row-between mt-10 ", matrix.map(function (week) {
        return m(".frow width-100", week.map(function (_ref5) {
          var invites = _ref5.invites,
              day = _ref5.day,
              dir = _ref5.dir;
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;

var Component = function Component() {
  return {
    view: function view() {
      return m(".");
    }
  };
};

exports.Component = Component;
});

;require.register("Components/day.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Day = exports.HourView = void 0;

var _Components = require("Components");

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
    m.route.set("/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(createEventUrl(invite)));
  };
};

var HourInvite = function HourInvite() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          invite = _ref$attrs.invite,
          col = _ref$attrs.col;
      return m(".col-xs-1-".concat(col + 2), m(".invite-list-item-".concat((0, _Utils.getTheme)(mdl)), {
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
      }, hour), m(".invite-list frow", events.map(function (invite, idx) {
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
      return invites.map(function (invite) {
        return m(".invite-list-item-container", m(".frow-container", m(".invite-list-".concat(_Utils.inviteOptions[invite.status], "-").concat((0, _Utils.getTheme)(mdl)), {
          onclick: function onclick(e) {
            return navToInvite(mdl)(invite);
          }
        }, [m("h3", invite.title), m(".frow row-start", [m("label.col-xs-1-1", "".concat(invite.start.format((0, _Utils.getTimeFormat)(mdl)), " - ").concat(invite.end.format((0, _Utils.getTimeFormat)(mdl))))])])));
      });
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
      return m(".day", [m(".day-container-".concat((0, _Utils.getTheme)(mdl)), [invites.any() ? mdl.Day.listView() ? m(ListView, {
        mdl: mdl,
        invites: invites
      }) : (0, _Utils.getHoursInDay)().map(function (hour, idx) {
        return m(HourView, {
          mdl: mdl,
          invites: day[hour],
          hour: hour,
          events: day[hour]
        });
      }) : m(_Components.EmptyState, {
        text: "You have no events scheduled for today - why not create one!"
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

var _Styles = require("Styles");

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
      mdl.Events.createNewEvent(false);
    };

    state.isSubmitted = true;
    (0, _validations.validateTask)(data).chain((0, _Http.createEventTask)(_Http.HTTP)(mdl)).fork(onError, onSuccess);
  };

  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return m(_eventForm.EventForm, {
        oncreate: (0, _Styles.Animate)(_Styles.slideInDown, {
          delay: 2
        }),
        onbeforeremove: (0, _Styles.Animate)(_Styles.slideOutUp, {
          delay: 2
        }),
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

var _Utils = require("Utils");

var _Styles = require("Styles");

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
    onbeforeremove: (0, _Styles.Animate)(_Styles.shutterOutTop),
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
          return m.route.set("/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(e.target.value.trim()));
        },
        type: "date",
        value: mdl.selectedDate().format("YYYY-MM-DD")
      }), m("label.pl-30.col-xs-1-3", "All Day", m("input", {
        type: "checkbox",
        checked: data.allDay,
        oninput: function oninput(e) {
          return state.isSubmitted && validate(state, data);
        },
        onclick: function onclick(e) {
          return setAllDay(data);
        }
      }))])), m(".full-width", [m(".frow row row-evenly gutters", [m("label.col-xs-1-2", [m("input.", {
        oninput: function oninput(e) {
          return data.startTime = e.target.value.trim();
        },
        value: data.startTime,
        type: "time",
        disabled: data.allDay,
        onblur: function onblur(e) {
          return state.isSubmitted && validate(state, data);
        }
      }), m(".frow row-start", ["Start Time", m("span.required-field", "*")]), state.errors && m("code.error-field", state.errors.startTime)]), m("label.col-xs-1-2", [m("input", {
        oninput: function oninput(e) {
          return data.endTime = e.target.value.trim();
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
          return locateQuery(mdl)(state)(e.target.value.trim());
        },
        onkeyup: function onkeyup(e) {
          return state.isSubmitted && validate(state, data);
        },
        onblur: function onblur(e) {
          return data.location = data.location.trim();
        }
      }), m(".frow row-start", ["Address", m("span.required-field", "*")])) : m("label.col-xs-4-5", m("input", {
        type: "url",
        value: data.url,
        oninput: function oninput(e) {
          return data.location = e.target.value.trim();
        },
        onblur: function onblur(e) {
          return data.location = data.location.trim();
        },
        onkeyup: function onkeyup(e) {
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
        onkeyup: function onkeyup(e) {
          return state.isSubmitted && validate(state, data);
        },
        onblur: function onblur(e) {
          return data.title = data.title.trim();
        }
      }), m(".frow row-start", ["Title", m("span.required-field", "*")]), state.errors && m("code.error-field", state.errors.title)), m("label", m("textarea", {
        value: data.notes,
        oninput: function oninput(e) {
          return data.notes = e.target.value;
        },
        onkeyup: function onkeyup(e) {
          return state.isSubmitted && validate(state, data);
        },
        onblur: function onblur(e) {
          return data.notes = data.notes.trim();
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

;require.register("Components/empty-state.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyState = void 0;

var _Components = require("Components");

var EmptyState = function EmptyState() {
  return {
    view: function view(_ref) {
      var text = _ref.attrs.text;
      return m(".empty-state frow centered-column justify-between", m(".logo-placeholder", [m("h3.text-center.mt-50", text), m(".logo", _Components.Logo)]));
    }
  };
};

exports.EmptyState = EmptyState;
});

;require.register("Components/event-toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventToolbar = void 0;

var _Utils = require("Utils");

var EventToolbar = function EventToolbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return [m("button.col-xs-1-1.btn-".concat((0, _Utils.getTheme)(mdl)), {
        disabled: mdl.Sidebar.isShowing(),
        onclick: function onclick(e) {
          localStorage.removeItem("shindigit-eventId");
          localStorage.removeItem("shindigit-eventStart");
          mdl.Invites.fetch(true);
          mdl.State.toAnchor(M(mdl.Events.currentEventStart()).format("HH"));
          m.route.set("/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(M(mdl.Events.currentEventStart()).format("YYYY-MM-DD")));
        }
      }, "Back")];
    }
  };
};

exports.EventToolbar = EventToolbar;
});

;require.register("Components/hamburger.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hamburger = void 0;

var _cjs = require("@mithril-icons/clarity/cjs");

var _Http = require("Http");

var _Styles = require("Styles");

var Hamburger = function Hamburger() {
  var load = function load(_ref) {
    var mdl = _ref.attrs.mdl;

    var onError = function onError(err) {
      mdl.Invites.state.error = err;
      mdl.Invites.state.status = "failed";
    };

    var onSuccess = function onSuccess(invites) {
      mdl.Invites.fetch(false);
      mdl.Invites.state.error = null;

      var forNewInvite = function forNewInvite(i) {
        return !i.updated && i.status == 2;
      };

      var forRsvpInvites = function forRsvpInvites(i) {
        return i.updated || i.status !== 2;
      };

      mdl.Invites.needRSVP(invites.filter(forNewInvite));
      mdl.Invites.withRSVP(invites.filter(forRsvpInvites));
      mdl.Invites.state.status = "success";
    };

    (0, _Http.getInvitesByGuestIdTask)(_Http.HTTP)(mdl)(mdl.User.objectId).fork(onError, onSuccess);
  };

  return {
    oninit: load,
    onupdate: function onupdate(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return mdl.Invites.fetch() && load({
        attrs: {
          mdl: mdl
        }
      });
    },
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return [m("button.col-xs-1-5.button-none.frow", {
        onclick: function onclick(e) {
          mdl.Invites.fetch(true);
          mdl.Sidebar.isShowing(!mdl.Sidebar.isShowing());
        }
      }, mdl.Sidebar.isShowing() ? m(_cjs.CloseLine, {
        oncreate: (0, _Styles.Animate)(_Styles.focusInContract)
      }) : [mdl.Invites.needRSVP().length > 0 && m(".notifier", [m(_cjs.BellLine, {
        oncreate: (0, _Styles.Animate)(_Styles.shake, {
          delay: 100,
          iterations: 1,
          fill: "backwards"
        })
      }), m(".notif-count", {
        oncreate: (0, _Styles.Animate)(_Styles.puffOutCenter, {
          iterations: 1.2,
          fill: "backwards"
        })
      }, mdl.Invites.needRSVP().length)]), m(_cjs.BarsLine, {
        oncreate: (0, _Styles.Animate)(_Styles.focusInContract, {
          delay: 200
        })
      })])];
    }
  };
};

exports.Hamburger = Hamburger;
});

;require.register("Components/home-toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeToolbar = void 0;

var _Utils = require("Utils");

var HomeToolbar = function HomeToolbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return [m("input.col-xs-1-2", {
        onchange: function onchange(e) {
          return m.route.set("/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(mdl.selectedDate().format("YYYY-MM-DD")));
        },
        type: "date",
        value: mdl.selectedDate().format("YYYY-MM-DD")
      }), m(m.route.Link, {
        disabled: mdl.Sidebar.isShowing(),
        class: "col-xs-1-2",
        selector: "button.btn-".concat((0, _Utils.getTheme)(mdl)),
        href: "/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(M().format("YYYY-MM-DD"))
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

var _inviteRsvp = require("./invite-rsvp.js");

Object.keys(_inviteRsvp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inviteRsvp[key];
    }
  });
});

var _sidebarRsvp = require("./sidebar-rsvp.js");

Object.keys(_sidebarRsvp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sidebarRsvp[key];
    }
  });
});

var _invitesToast = require("./invites-toast.js");

Object.keys(_invitesToast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _invitesToast[key];
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

var _logo = require("./logo");

Object.keys(_logo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logo[key];
    }
  });
});

var _hamburger = require("./hamburger");

Object.keys(_hamburger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hamburger[key];
    }
  });
});

var _emptyState = require("./empty-state");

Object.keys(_emptyState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _emptyState[key];
    }
  });
});

var _progressBar = require("./progress-bar");

Object.keys(_progressBar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _progressBar[key];
    }
  });
});

var _indiPb = require("./indi-pb");

Object.keys(_indiPb).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _indiPb[key];
    }
  });
});
});

;require.register("Components/indi-pb.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndiPb = void 0;

var IndiPb = function IndiPb() {
  return {
    view: function view() {
      return m(".progress-line");
    }
  };
};

exports.IndiPb = IndiPb;
});

;require.register("Components/invite-rsvp.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteRSVP = void 0;

var _Utils = require("Utils");

var _cjs = require("@mithril-icons/clarity/cjs");

var _Http = require("Http");

var updateInvite = function updateInvite(mdl) {
  return function (update) {
    return function (reload) {
      var onError = function onError(error) {
        state.error = jsonCopy(error);
        state.status = "failed";
        console.log("invite update failed", state, update);
      };

      var onSuccess = function onSuccess(dto) {
        if (reload) {
          reload();
        }
      };

      (0, _Http.updateInviteTask)(_Http.HTTP)(mdl)(update.objectId)(update).fork(onError, onSuccess);
    };
  };
};

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

var InviteRSVP = function InviteRSVP() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          guest = _ref2$attrs.guest,
          reload = _ref2$attrs.reload;
      // console.log("guest", guest)
      return m(".frow justify-evenly", getResponse(guest).map(function (response, idx) {
        return m(response, {
          class: guest.guestId == mdl.User.objectId ? "clickable" : "",
          fill: "var(--".concat(_Utils.inviteOptions[idx], "-invite)"),
          onclick: function onclick(e) {
            if (guest.guestId == mdl.User.objectId) {
              guest.status = idx;
              updateInvite(mdl)(guest)(reload);
            }
          }
        });
      }));
    }
  };
};

exports.InviteRSVP = InviteRSVP;
});

;require.register("Components/invites-toast.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvitesToast = void 0;

var _cjs = require("@mithril-icons/clarity/cjs");

var InvitesToast = function InvitesToast() {
  var inviteMsg = function inviteMsg(count) {
    return count == 1 ? "is 1 invite" : "are ".concat(count, " invites");
  };

  var notificationStatus = function notificationStatus() {
    return localStorage.getItem("shindigit-showNotifications") == "true";
  };

  var setNotificationStatus = function setNotificationStatus(val) {
    return localStorage.setItem("shindigit-showNotifications", val);
  };

  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          invites = _ref$attrs.invites,
          locale = _ref$attrs.locale;
      return m(".invite-alerts-container frow", m(".invite-alert mb-10 justify-between", [m("p", "There ".concat(inviteMsg(invites), " waiting your attention.")), m("label.text-right", m("input", {
        type: "checkbox",
        checked: notificationStatus(),
        onclick: function onclick(e) {
          return setNotificationStatus(notificationStatus());
        }
      }), "Close and do not show again")]), m(_cjs.TimesCircleLine, {
        onclick: function onclick(e) {
          return setNotificationStatus(false);
        },
        class: "invite-alert-remove"
      }));
    }
  };
};

exports.InvitesToast = InvitesToast;
});

;require.register("Components/layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _Components = require("Components");

var _Styles = require("Styles");

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

var Layout = function Layout() {
  return {
    view: function view(_ref2) {
      var children = _ref2.children,
          mdl = _ref2.attrs.mdl;
      return m(".lt-grid-container", [m(".lt-header.navbar", m(".frow row", [mdl.State.isLoading() && m(_Components.IndiPb), // m(ProgressBar, { mdl }),
      m(Header, {
        mdl: mdl
      }), m(_Components.Hamburger, {
        mdl: mdl
      })])), mdl.Sidebar.isShowing() ? m(_Components.Sidebar, {
        oncreate: function oncreate(_ref3) {
          var dom = _ref3.dom;
          return (0, _Styles.Animate)((0, _Styles.createKeyframeAnimation)(true)({
            dom: dom
          }))({
            dom: dom
          });
        },
        onbeforeremove: function onbeforeremove(_ref4) {
          var dom = _ref4.dom;
          return (0, _Styles.Animate)((0, _Styles.createKeyframeAnimation)(false)({
            dom: dom
          }))({
            dom: dom
          });
        },
        mdl: mdl
      }) : [m(".lt-body", children)], m(".lt-footer", "FOOTER")]);
    }
  };
};

exports.Layout = Layout;
});

;require.register("Components/logo.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logo = void 0;
var Logo = m("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "xml:space": "preserve",
  version: "1.1",
  viewBox: "0 0 2.049 2.355",
  x: "0px",
  y: "0px",
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  style: {
    "shape-rendering": "geometricPrecision",
    "text-rendering": "geometricPrecision",
    "image-rendering": "optimizeQuality"
  }
}, [m("defs", m("style", {
  type: "text/css"
}, " .logo-placeholder")), m("g", m("path", {
  class: "logo-placeholder",
  d: "M0.033 0l1.983 0c0.018,0 0.033,0.015 0.033,0.033l0 1.818c0,0.018 -0.015,0.033 -0.033,0.033l-1.983 0c-0.018,0 -0.033,-0.015 -0.033,-0.033l0 -1.818c0,-0.018 0.015,-0.033 0.033,-0.033zm1.686 1.19l0 0.33c0,0.019 -0.015,0.033 -0.033,0.033l-0.331 0 -0.33 0 0 0 -0.331 0 -0.33 0c-0.019,0 -0.033,-0.014 -0.033,-0.033l0 -0.33 0 -0.331c0,-0.018 0.014,-0.033 0.033,-0.033l0.33 0 0.331 0 0 0 0.33 0 0.331 0c0.018,0 0.033,0.015 0.033,0.033l0 0.331zm-0.331 0.297l0.265 0 0 -0.264 -0.265 0 0 0.264zm-0.33 -0.264l0 0.264 0.264 0 0 -0.264 -0.264 0zm-0.331 0.264l0.265 0 0 -0.264 -0.265 0 0 0.264zm-0.33 -0.264l0 0.264 0.264 0 0 -0.264 -0.264 0zm1.256 -0.331l-0.265 0 0 0.265 0.265 0 0 -0.265zm-0.331 0l-0.264 0 0 0.265 0.264 0 0 -0.265zm-0.33 0l-0.265 0 0 0.265 0.265 0 0 -0.265zm-0.331 0l-0.264 0 0 0.265 0.264 0 0 -0.265zm0.71 -0.727c0.032,0 0.061,0.013 0.082,0.034 0.02,0.021 0.033,0.05 0.033,0.082 0,0.032 -0.013,0.061 -0.034,0.082 -0.02,0.021 -0.049,0.034 -0.081,0.034 -0.032,0 -0.061,-0.013 -0.082,-0.034 -0.021,-0.021 -0.034,-0.05 -0.034,-0.082 0,-0.032 0.013,-0.061 0.034,-0.082 0.021,-0.021 0.05,-0.034 0.082,-0.034zm0 0.066c-0.014,0 -0.026,0.006 -0.035,0.015 -0.009,0.009 -0.015,0.021 -0.015,0.035 0,0.014 0.006,0.026 0.015,0.035 0.009,0.009 0.021,0.014 0.035,0.014 0.013,0 0.026,-0.005 0.035,-0.014 0.009,-0.009 0.014,-0.021 0.014,-0.035 0,-0.014 -0.005,-0.026 -0.014,-0.035 -0.009,-0.009 -0.022,-0.015 -0.035,-0.015zm-0.693 -0.066c0.032,0 0.061,0.013 0.082,0.034 0.021,0.021 0.034,0.05 0.034,0.082 0,0.032 -0.013,0.061 -0.034,0.082 -0.021,0.021 -0.05,0.034 -0.082,0.034 -0.031,0 -0.06,-0.013 -0.081,-0.034 -0.021,-0.021 -0.034,-0.05 -0.034,-0.082 0,-0.032 0.013,-0.061 0.034,-0.082 0.021,-0.021 0.05,-0.034 0.081,-0.034zm0 0.066c-0.013,0 -0.026,0.006 -0.035,0.015 -0.009,0.009 -0.014,0.021 -0.014,0.035 0,0.014 0.005,0.026 0.014,0.035 0.009,0.009 0.022,0.014 0.035,0.014 0.014,0 0.026,-0.005 0.035,-0.014 0.009,-0.009 0.015,-0.021 0.015,-0.035 0,-0.014 -0.006,-0.026 -0.015,-0.035 -0.009,-0.009 -0.021,-0.015 -0.035,-0.015zm1.305 0.331l-1.917 0 0 1.256 1.917 0 0 -1.256zm-1.917 -0.066l1.917 0 0 -0.43 -1.917 0 0 0.43z"
}))]);
exports.Logo = Logo;
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
      return m(".modal", children.map(function (_ref2) {
        var header = _ref2.header,
            body = _ref2.body,
            footer = _ref2.footer;
        return m(".modal-container", m(".modal.full-width", [m(".modal-header", header), m(".modal-body", body), m(".modal-footer", footer)]));
      }));
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

;require.register("Components/profile.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

var _Http = require("Http");

var _Utils = require("Utils");

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
      return m(".profile-section", [m("label", "Dark Theme", m("input", {
        type: "checkbox",
        checked: mdl.User.profile.isDarkTheme,
        onclick: function onclick(e) {
          mdl.User.profile.isDarkTheme = !mdl.User.profile.isDarkTheme;
          updatePrefs(mdl);
        }
      })), m("hr"), m("label", "Use 24 Hrs", m("input", {
        type: "checkbox",
        checked: mdl.User.profile.is24Hrs,
        onclick: function onclick(e) {
          mdl.User.profile.is24Hrs = !mdl.User.profile.is24Hrs;
          updatePrefs(mdl);
        }
      })), m("hr"), m("label", "Start Week on Day:", m(".frow row-between", _Utils.daysOfTheWeek.map(function (day, idx) {
        return m("label.col-xs-1-7", m("span", {
          key: idx
        }, day.slice(0, 3)), m("input", {
          key: idx,
          id: idx,
          name: "startDay-".concat(idx),
          type: "radio",
          value: mdl.User.profile.startWeekOnDay,
          checked: mdl.User.profile.startWeekOnDay == idx,
          onchange: function onchange(e) {
            console.log(mdl.User);
            mdl.User.profile.startWeekOnDay = idx;
            mdl.Calendar.state.start(idx);
            updatePrefs(mdl);
          }
        }));
      }))), m("hr"), m("label", "Search Range Radius: ".concat(mdl.User.profile.searchRadius), m("input", {
        type: "range",
        value: mdl.User.profile.searchRadius,
        min: 0,
        max: 100,
        onchange: function onchange(e) {
          mdl.User.profile.searchRadius = parseInt(e.target.value);
          mdl.Map.bounds((0, _Utils.getBoundsFromLatLong)(mdl)(mdl.Map.locale()));
          console.log(JSON.stringify(mdl.Map));
          updatePrefs(mdl);
        }
      }))]);
    }
  };
};

exports.Profile = Profile;
});

;require.register("Components/progress-bar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = void 0;

var ProgressBar = function ProgressBar(_ref) {
  var mdl = _ref.attrs.mdl;
  return {
    view: function view(_ref2) {
      var _ref2$attrs$mdl$State = _ref2.attrs.mdl.State.loadingProgress,
          value = _ref2$attrs$mdl$State.value,
          max = _ref2$attrs$mdl$State.max;
      return mdl.State.isLoading() && m(".progressBar", m("progress.progress", {
        max: max,
        value: value
      }));
    }
  };
};

exports.ProgressBar = ProgressBar;
});

;require.register("Components/sidebar-rsvp.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarRSVP = void 0;

var _Components = require("Components");

var _Utils = require("Utils");

var SidebarRSVP = function SidebarRSVP() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".sidebar-rsvp mb-50", [mdl.Invites.needRSVP().length ? mdl.Invites.needRSVP().map(function (invite) {
        return m("..sidebar-invites-".concat((0, _Utils.getTheme)(mdl)), m(".frow mb-10", [m(".col-xs-1-2 text-ellipsis", "".concat(invite.title)), m(".col-xs-1-2", "On: ".concat(invite.start.format("MM-DD-YYYY"))), m(".col-xs-1-2", "From: ".concat(invite.start.format((0, _Utils.getTimeFormat)(mdl)))), m(".col-xs-1-2", "To: ".concat(invite.end.format((0, _Utils.getTimeFormat)(mdl))))]), m(_Components.InviteRSVP, {
          mdl: mdl,
          guest: invite
        }));
      }) : m(_Components.EmptyState, {
        text: "You have no outstanding invites"
      })]);
    }
  };
};

exports.SidebarRSVP = SidebarRSVP;
});

;require.register("Components/sidebar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _Components = require("Components");

var _Utils = require("Utils");

var Sidebar = function Sidebar() {
  var state = {
    load: {
      error: Stream(null),
      isShowing: Stream(false),
      status: Stream("loading")
    },
    Invites: {
      isShowing: Stream(true),
      status: Stream("loading"),
      data: Stream([])
    },
    Profile: {
      isShowing: Stream(false),
      is24Hrs: Stream(false)
    }
  };

  var showState = function showState(field) {
    var keys = Object.keys(state);
    return keys.map(function (k) {
      return k == field ? state[k].isShowing(true) : state[k].isShowing(false);
    });
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".sidebar-page", [m(".navbar-tab-section-".concat((0, _Utils.getTheme)(mdl)), m(".frow row ", [m("button.navbar-tab-".concat((0, _Utils.getTheme)(mdl), ".col-xs-1-3"), {
        class: state.Invites.isShowing() ? "navbar-tab-selected" : "",
        onclick: function onclick(e) {
          return showState("Invites");
        }
      }, "New Invites"), m("button.navbar-tab-".concat((0, _Utils.getTheme)(mdl), ".col-xs-1-3"), {
        class: state.Profile.isShowing() ? "navbar-tab-selected" : "",
        onclick: function onclick(e) {
          return showState("Profile");
        }
      }, "Profile"), m("button.navbar-tab-".concat((0, _Utils.getTheme)(mdl), ".col-xs-1-3"), m(m.route.Link, {
        id: "scale-me",
        href: "/logout",
        class: "required-field"
      }, "Logout"))])), state.Invites.isShowing() && m(".sidebar-section", [m(".frow column-center height-100", [m(".sidebar-article frow height-100", m(_Components.SidebarRSVP, {
        mdl: mdl
      }))])]), state.Profile.isShowing() && m(".sidebar-section", m(".frow column-center", [m(".sidebar-article", m(_Components.Profile, {
        mdl: mdl
      }))]))]);
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

;require.register("Http/comments-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCommentTask = exports.deleteCommentTask = exports.deleteBulkCommentsTask = exports.getCommentsByguestIdTask = exports.getCommentsByEventIdTask = exports.addCommentTask = void 0;

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addCommentTask = function addCommentTask(http) {
  return function (mdl) {
    return function (comment) {
      return http.backEnd.postTask(mdl)("data/Comments")(comment).chain(function (_ref) {
        var objectId = _ref.objectId;
        var commentId = objectId;
        return _data.default.of(function (user) {
          return function (event) {
            return {
              user: user,
              event: event
            };
          };
        }).ap(http.backEnd.postTask(mdl)("data/Users/".concat(mdl.User.objectId, "/comments%3AComments%3An"))([commentId])).ap(http.backEnd.postTask(mdl)("data/Events/".concat(mdl.Events.currentEventId(), "/comments%3AComments%3An"))([commentId]));
      });
    };
  };
};

exports.addCommentTask = addCommentTask;

var getCommentsByEventIdTask = function getCommentsByEventIdTask(http) {
  return function (mdl) {
    return function (eventId) {
      return http.backEnd.getTask(mdl)("data/Comments?pageSize=100&where=eventId%3D'".concat(eventId, "'&sortBy=created%20asc"));
    };
  };
};

exports.getCommentsByEventIdTask = getCommentsByEventIdTask;

var getCommentsByguestIdTask = function getCommentsByguestIdTask(http) {
  return function (mdl) {
    return function (guestId) {
      return http.backEnd.getTask(mdl)("data/Comments?pageSize=100&where=guestId%3D'".concat(guestId, "'&sortBy=created%20asc"));
    };
  };
};

exports.getCommentsByguestIdTask = getCommentsByguestIdTask;

var deleteBulkCommentsTask = function deleteBulkCommentsTask(http) {
  return function (mdl) {
    return function (guestId) {
      return http.backEnd.deleteTask(mdl)("data/Comments?where=guestId%3D'".concat(guestId, "'"));
    };
  };
};

exports.deleteBulkCommentsTask = deleteBulkCommentsTask;

var deleteCommentTask = function deleteCommentTask(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.deleteTask(mdl)("data/Comments/".concat(id));
    };
  };
};

exports.deleteCommentTask = deleteCommentTask;

var updateCommentTask = function updateCommentTask(http) {
  return function (mdl) {
    return function (comment) {
      return http.backEnd.putTask(mdl)("data/Comments/".concat(comment.objectId))(comment);
    };
  };
};

exports.updateCommentTask = updateCommentTask;
});

;require.register("Http/events-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEventTask = exports.relateInvitesToEventTask = exports.relateCommentsToEventTask = exports.relateItemsToEventTask = exports.updateItemToGuestTask = exports.addItemToEventTask = exports.createEventTask = exports.deleteEventTask = exports.loadEventTask = exports.getEventByIdTask = void 0;

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
    var hostId = _ref.hostId,
        objectId = _ref.objectId,
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
      date: M(start).format("MM-DD-YYYY"),
      title: title.toUpperCase(),
      start: start,
      end: end,
      startTime: M(start).format((0, _Utils.getTimeFormat)(mdl)),
      endTime: M(end).format((0, _Utils.getTimeFormat)(mdl)),
      notes: notes,
      allDay: allDay,
      location: location,
      inPerson: inPerson,
      latlong: latlong,
      hostId: hostId
    };
  };
};

var toCommentViewModel = function toCommentViewModel(_ref2) {
  var message = _ref2.message,
      name = _ref2.name,
      guestId = _ref2.guestId,
      eventId = _ref2.eventId,
      created = _ref2.created,
      objectId = _ref2.objectId;
  return {
    message: message,
    name: name,
    guestId: guestId,
    eventId: eventId,
    created: created,
    objectId: objectId
  };
};

var toGuestModel = function toGuestModel(invite) {
  return function (_ref3) {
    var name = _ref3.name,
        email = _ref3.email;
    return _objectSpread(_objectSpread({}, invite), {}, {
      name: name,
      email: email
    });
  };
};

var getGuestsTask = function getGuestsTask(http) {
  return function (mdl) {
    return function (invite) {
      return (0, _Http.getUserProfileTask)(http)(mdl)(invite.guestId).map(_ramda.head).map(toGuestModel(invite));
    };
  };
};

var getEventGuestsByEventIdTask = function getEventGuestsByEventIdTask(http) {
  return function (mdl) {
    return function (eventId) {
      return (0, _Http.getInvitesTaskByEventId)(http)(mdl)(eventId).chain((0, _ramda.traverse)(_data.default.of, getGuestsTask(http)(mdl)));
    };
  };
};

var getEventByIdTask = function getEventByIdTask(http) {
  return function (mdl) {
    return function (eventId) {
      return http.backEnd.getTask(mdl)("data/Events/".concat(eventId)).map(toEventviewModel(mdl));
    };
  };
};

exports.getEventByIdTask = getEventByIdTask;

var addHostDataToEvent = function addHostDataToEvent(event) {
  return function (guests) {
    var host = guests.filter((0, _ramda.propEq)("guestId", event.hostId))[0];
    event.hostId = host;
    return event;
  };
};

var loadEventTask = function loadEventTask(http) {
  return function (mdl) {
    return function (eventId) {
      return _data.default.of(function (event) {
        return function (items) {
          return function (comments) {
            return function (guests) {
              return {
                event: addHostDataToEvent(event)(guests),
                guests: guests,
                comments: comments,
                items: items
              };
            };
          };
        };
      }).ap(getEventByIdTask(http)(mdl)(eventId)).ap((0, _Http.getItemsByEventIdTask)(http)(mdl)(eventId)).ap((0, _Http.getCommentsByEventIdTask)(http)(mdl)(eventId).map((0, _ramda.map)(toCommentViewModel))).ap(getEventGuestsByEventIdTask(http)(mdl)(eventId));
    };
  };
};

exports.loadEventTask = loadEventTask;

var deleteEventTask = function deleteEventTask(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.deleteTask(mdl)("data/Events/".concat(id)).chain(function () {
        return http.backEnd.deleteTask(mdl)("data/bulk/Invites?where=eventId%3D'".concat(id, "'"));
      }).chain(function () {
        return http.backEnd.deleteTask(mdl)("data/bulk/Items?where=eventId%3D'".concat(id, "'"));
      }).chain(function () {
        return http.backEnd.deleteTask(mdl)("data/bulk/Comments?where=eventId%3D'".concat(id, "'"));
      });
    };
  };
};

exports.deleteEventTask = deleteEventTask;

var createEventTask = function createEventTask(http) {
  return function (mdl) {
    return function (_ref4) {
      var allDay = _ref4.allDay,
          startTime = _ref4.startTime,
          endTime = _ref4.endTime,
          title = _ref4.title,
          notes = _ref4.notes,
          inPerson = _ref4.inPerson,
          location = _ref4.location,
          latlong = _ref4.latlong;
      var end = M(mdl.selectedDate()).hour((0, _Utils.getHour)(endTime)).minute((0, _Utils.getMin)(endTime));
      var start = M(mdl.selectedDate()).hour((0, _Utils.getHour)(startTime)).minute((0, _Utils.getMin)(startTime));
      return http.backEnd.postTask(mdl)("data/Events")({
        end: end,
        start: start,
        notes: notes,
        title: title,
        allDay: allDay,
        inPerson: inPerson,
        location: location,
        latlong: latlong,
        hostId: mdl.User.objectId
      }).chain(function (_ref5) {
        var objectId = _ref5.objectId,
            hostId = _ref5.hostId,
            end = _ref5.end,
            start = _ref5.start,
            title = _ref5.title;
        var eventId = objectId;
        var status = 1;
        return (0, _Http.createInviteTask)(http)(mdl)({
          eventId: eventId,
          hostId: hostId,
          guestId: hostId,
          status: status,
          end: end,
          start: start,
          title: title,
          allDay: allDay,
          inPerson: inPerson,
          location: location,
          latlong: latlong
        }).chain(function (_ref6) {
          var objectId = _ref6.objectId;
          var inviteId = objectId;
          return _data.default.of(function (user) {
            return function (event) {
              return {
                user: user,
                event: event
              };
            };
          }).ap(http.backEnd.postTask(mdl)("data/Users/".concat(mdl.User.objectId, "/invites"))([inviteId])).ap(relateInvitesToEventTask(http)(mdl)(eventId)([inviteId]));
        });
      });
    };
  };
};

exports.createEventTask = createEventTask;

var addItemToEventTask = function addItemToEventTask(http) {
  return function (mdl) {
    return function (eventId) {
      return function (item) {
        return (0, _Http.addItemTask)(http)(mdl)(item).chain(function (_ref7) {
          var objectId = _ref7.objectId;
          return relateItemsToEventTask(http)(mdl)(eventId)([objectId]);
        });
      };
    };
  };
};

exports.addItemToEventTask = addItemToEventTask;

var updateItemToGuestTask = function updateItemToGuestTask(http) {
  return function (mdl) {
    return function (item) {
      return item.guestId ? (0, _Http.relateItemsToUserTask)(http)(mdl)(item.guestId)([item.objectId]) : (0, _Http.unRelateItemToUserTask)(http)(mdl)(mdl.User.objectId)(item.objectId);
    };
  };
};

exports.updateItemToGuestTask = updateItemToGuestTask;

var relateItemsToEventTask = function relateItemsToEventTask(http) {
  return function (mdl) {
    return function (eventId) {
      return function (itemIds) {
        return http.backEnd.putTask(mdl)("data/Events/".concat(eventId, "/items"))(itemIds);
      };
    };
  };
}; // export const unRelateItemsToEventTask = (http) => (mdl) => (eventId) => (
//   itemIds
// ) => http.backEnd.deleteTask(mdl)(`data/Events/${eventId}/items`)(itemIds)


exports.relateItemsToEventTask = relateItemsToEventTask;

var relateCommentsToEventTask = function relateCommentsToEventTask(http) {
  return function (mdl) {
    return function (eventId) {
      return function (commentIds) {
        return http.backEnd.putTask(mdl)("data/Events/".concat(eventId, "/comments"))(commentIds);
      };
    };
  };
}; // export const unRelateCommentsToEventTask = (http) => (mdl) => (eventId) => (
//   commentIds
// ) => http.backEnd.deleteTask(mdl)(`data/Events/${eventId}/comments`)(commentIds)


exports.relateCommentsToEventTask = relateCommentsToEventTask;

var relateInvitesToEventTask = function relateInvitesToEventTask(http) {
  return function (mdl) {
    return function (eventId) {
      return function (inviteIds) {
        return http.backEnd.putTask(mdl)("data/Events/".concat(eventId, "/invites"))(inviteIds);
      };
    };
  };
}; // export const unRelateInvitesToEventTask = (http) => (mdl) => (eventId) => (
//   inviteIds
// ) => http.backEnd.deleteTask(mdl)(`data/Events/${eventId}/invites`)(inviteIds)


exports.relateInvitesToEventTask = relateInvitesToEventTask;

var updateEventTask = function updateEventTask(http) {
  return function (mdl) {
    return function (eventId) {
      return function (event) {
        return http.backEnd.putTask(mdl)("data/Events/".concat(eventId))(event);
      };
    };
  };
};

exports.updateEventTask = updateEventTask;
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
          // mdl.State.isLoading(true)
          return new _data.default(function (rej, res) {
            return m.request(_objectSpread({
              method: method,
              url: url,
              headers: _objectSpread({}, _headers),
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
      return HttpTask(_secrets.OpenCage.headers())("GET")(mdl)(OpenCageUrl + query + "&pretty=1&json&language=".concat(mdl.User.profile.language, "&bounds=").concat(mdl.Map.bounds()))(null);
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

var _commentsTasks = require("./comments-tasks.js");

Object.keys(_commentsTasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _commentsTasks[key];
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
exports.deleteInviteTask = exports.createInviteTask = exports.sendInviteTask = exports.getInvitesTaskByEventId = exports.getInvitesByGuestIdTask = exports.updateInviteTask = exports.toInviteViewModel = void 0;

var _ramda = require("ramda");

var _Http = require("Http");

var _data = _interopRequireDefault(require("data.task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toInviteViewModel = function toInviteViewModel(_ref) {
  var start = _ref.start,
      end = _ref.end,
      title = _ref.title,
      objectId = _ref.objectId,
      eventId = _ref.eventId,
      status = _ref.status,
      hostId = _ref.hostId,
      guestId = _ref.guestId,
      updated = _ref.updated;
  return {
    start: M(start),
    end: M(end),
    objectId: objectId,
    eventId: eventId,
    title: title,
    status: status,
    hostId: hostId,
    guestId: guestId,
    updated: updated
  };
};

exports.toInviteViewModel = toInviteViewModel;

var toInviteDto = function toInviteDto(_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      title = _ref2.title,
      eventId = _ref2.eventId,
      status = _ref2.status,
      guestId = _ref2.guestId,
      hostId = _ref2.hostId;
  return {
    start: start,
    end: end,
    eventId: eventId,
    title: title,
    status: status,
    guestId: guestId,
    hostId: hostId
  };
};

var updateInviteTask = function updateInviteTask(http) {
  return function (mdl) {
    return function (inviteId) {
      return function (invite) {
        return http.backEnd.putTask(mdl)("data/Invites/".concat(inviteId))(toInviteDto(invite)).map(toInviteViewModel);
      };
    };
  };
};

exports.updateInviteTask = updateInviteTask;

var getInvitesByGuestIdTask = function getInvitesByGuestIdTask(http) {
  return function (mdl) {
    return function (guestId) {
      return http.backEnd.getTask(mdl)("data/Invites?pageSize=100&where=guestId%3D'".concat(guestId, "'&sortBy=start%20asc")).map((0, _ramda.map)(toInviteViewModel));
    };
  };
};

exports.getInvitesByGuestIdTask = getInvitesByGuestIdTask;

var getInvitesTaskByEventId = function getInvitesTaskByEventId(http) {
  return function (mdl) {
    return function (eventId) {
      return http.backEnd.getTask(mdl)("data/Invites?pageSize=100&where=eventId%3D'".concat(eventId, "'&sortBy=start%20asc")).map((0, _ramda.map)(toInviteViewModel));
    };
  };
};

exports.getInvitesTaskByEventId = getInvitesTaskByEventId;

var sendInviteTask = function sendInviteTask(http) {
  return function (mdl) {
    return function (guestEmail, _ref3) {
      var hostId = _ref3.hostId,
          eventId = _ref3.eventId,
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
          guestId: users[0].objectId,
          hostId: hostId,
          status: 2,
          end: end,
          start: start,
          title: title,
          allDay: allDay,
          inPerson: inPerson,
          location: location,
          latlong: latlong
        }).chain(function (_ref4) {
          var objectId = _ref4.objectId;
          return _data.default.of(function (event) {
            return function (user) {
              event, user;
            };
          }).ap((0, _Http.relateInvitesToUserTask)(http)(mdl)(users[0].objectId)([objectId])).ap((0, _Http.relateInvitesToEventTask)(http)(mdl)(eventId)([objectId]));
        }) : _data.default.rejected("No User with that email");
      });
    };
  };
};

exports.sendInviteTask = sendInviteTask;

var createInviteTask = function createInviteTask(http) {
  return function (mdl) {
    return function (_ref5) {
      var eventId = _ref5.eventId,
          guestId = _ref5.guestId,
          hostId = _ref5.hostId,
          status = _ref5.status,
          end = _ref5.end,
          start = _ref5.start,
          title = _ref5.title,
          allDay = _ref5.allDay,
          inPerson = _ref5.inPerson,
          location = _ref5.location,
          latlong = _ref5.latlong;
      return http.backEnd.postTask(mdl)("data/Invites")({
        eventId: eventId,
        guestId: guestId,
        hostId: hostId,
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

var deleteInviteTask = function deleteInviteTask(http) {
  return function (mdl) {
    return function (id) {
      return http.backEnd.deleteTask(mdl)("data/Invites/".concat(id));
    };
  };
};

exports.deleteInviteTask = deleteInviteTask;
});

;require.register("Http/items-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemTask = exports.deleteItemTask = exports.deleteBulkItemsTask = exports.getItemsByGuestIdTask = exports.getItemsByEventIdTask = exports.addItemTask = void 0;

var addItemTask = function addItemTask(http) {
  return function (mdl) {
    return function (item) {
      return http.backEnd.postTask(mdl)("data/Items")(item);
    };
  };
};

exports.addItemTask = addItemTask;

var getItemsByEventIdTask = function getItemsByEventIdTask(http) {
  return function (mdl) {
    return function (eventId) {
      return http.backEnd.getTask(mdl)("data/Items?pageSize=100&where=eventId%3D'".concat(eventId, "'&sortBy=name%20asc"));
    };
  };
};

exports.getItemsByEventIdTask = getItemsByEventIdTask;

var getItemsByGuestIdTask = function getItemsByGuestIdTask(http) {
  return function (mdl) {
    return function (guestId) {
      return http.backEnd.getTask(mdl)("data/Items?pageSize=100&where=guestId%3D'".concat(guestId, "'&sortBy=name%20asc"));
    };
  };
};

exports.getItemsByGuestIdTask = getItemsByGuestIdTask;

var deleteBulkItemsTask = function deleteBulkItemsTask(http) {
  return function (mdl) {
    return function (guestId) {
      return http.backEnd.deleteTask(mdl)("data/Items?where=guestId%3D'".concat(guestId, "'"));
    };
  };
};

exports.deleteBulkItemsTask = deleteBulkItemsTask;

var deleteItemTask = function deleteItemTask(http) {
  return function (mdl) {
    return function (itemId) {
      return http.backEnd.deleteTask(mdl)("data/Items/".concat(itemId));
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
exports.getBoundsTask = exports.locateQueryTask = void 0;

var _ramda = require("ramda");

var _Utils = require("Utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toOpenCageFormat = function toOpenCageFormat(q) {
  return typeof q == "string" ? encodeURIComponent(q) : encodeURIComponent("".concat(q[0], ",").concat(q[1]));
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

var getBoundsTask = function getBoundsTask(http) {
  return function (mdl) {
    return function (coords) {
      return http.openCage.getLocationTask(mdl)(toOpenCageFormat(coords)).map((0, _ramda.path)(["results", 0, "bounds"])).map(function (_ref3) {
        var southwest = _ref3.southwest,
            northeast = _ref3.northeast;
        return encodeURIComponent("".concat(southwest.lng, ",").concat(southwest.lat, ",").concat(northeast.lng, ",").concat(northeast.lat));
      });
    };
  };
};

exports.getBoundsTask = getBoundsTask;
});

;require.register("Http/user-tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relateProfileToUserTask = exports.relateInvitesToUserTask = exports.unRelateItemToUserTask = exports.relateItemsToUserTask = exports.findUserByEmailTask = exports.updateUserProfile = exports.getUserProfileTask = exports.createProfileTask = exports.registerTask = exports.loginTask = exports.setUserToken = void 0;

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
      email: mdl.User.email,
      startWeekOnDay: 1,
      use24Hrs: true,
      isDarkTheme: true,
      language: "en",
      searchRadius: 20
    });
  };
};

exports.createProfileTask = createProfileTask;

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

var relateItemsToUserTask = function relateItemsToUserTask(http) {
  return function (mdl) {
    return function (userId) {
      return function (itemIds) {
        return http.backEnd.putTask(mdl)("data/Users/".concat(userId, "/items"))(itemIds);
      };
    };
  };
};

exports.relateItemsToUserTask = relateItemsToUserTask;

var unRelateItemToUserTask = function unRelateItemToUserTask(http) {
  return function (mdl) {
    return function (userId) {
      return function (itemId) {
        return http.backEnd.deleteTask(mdl)("data/Users/".concat(userId, "/items?whereClause=objectId%3D'").concat(encodeURI(itemId), "'"));
      };
    };
  };
};

exports.unRelateItemToUserTask = unRelateItemToUserTask;

var relateInvitesToUserTask = function relateInvitesToUserTask(http) {
  return function (mdl) {
    return function (userId) {
      return function (inviteIds) {
        return http.backEnd.putTask(mdl)("data/Users/".concat(userId, "/invites"))(inviteIds);
      };
    };
  };
}; // export const unRelateInvitesToUserTask = (http) => (mdl) => (userId) => (
//   inviteIds
// ) => http.backEnd.deleteTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)


exports.relateInvitesToUserTask = relateInvitesToUserTask;

var relateProfileToUserTask = function relateProfileToUserTask(http) {
  return function (mdl) {
    return function (userId) {
      return function (profileId) {
        return http.backEnd.putTask(mdl)("data/Users/".concat(userId, "/profile"))([profileId]);
      };
    };
  };
}; // export const unRelateProfileToUserTask = (http) => (mdl) => (userId) => (
//   profileId
// ) => http.backEnd.deleteTask(mdl)(`data/Users/${userId}/profile`)([profileId])


exports.relateProfileToUserTask = relateProfileToUserTask;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.dayModel = void 0;

var _Utils = require("Utils");

var _calendarModel = require("Components/calendar/calendar-model");

// const Notifications = () => {
//   let state = {
//     invites: Stream([]),
//     items: Stream([]),
//     guests: Stream([]),
//   }
//   return {
//     invites: state.invites,
//     items: state.items,
//     guests: state.guests,
//     count: Stream.combine(
//       (invites, items, guests) =>
//         invites().length + items().length + guests().length,z,xnbkzjb/sNV/LZFNG
//       [state.invites, state.items, state.guests]
//     ),
//   }
// }
var Map = {
  locale: Stream(null),
  bounds: Stream(encodeURIComponent("-125.5957, 24.36711, -65.39063, 48.944")),
  defaultBounds: encodeURIComponent("-125.5957, 24.36711, -65.39063, 48.944")
};
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
var Events = {
  currentEventId: Stream(null),
  currentEventStart: Stream(null),
  createNewEvent: Stream(false)
};
var Invites = {
  state: {
    error: null,
    status: Stream("loading")
  },
  withRSVP: Stream([]),
  needRSVP: Stream([]),
  fetch: Stream(false)
};
var Items = {
  updateItemAndGuest: Stream(false)
};
var Day = {
  data: dayModel({
    State: State
  }),
  update: Stream(false),
  listView: Stream(true)
};
var Home = {};
var Settings = {
  profile: "",
  inspector: ""
};
var Calendar = {
  data: (0, _calendarModel.calendarModel)({
    mdl: Model,
    invites: [],
    date: M()
  }),
  state: {
    start: Stream(0)
  }
};
var User = {};
var Sidebar = {
  isShowing: Stream(false)
};
var Model = {
  selectedDate: Stream(""),
  todayDate: Stream(M()),
  Calendar: Calendar,
  Day: Day,
  Events: Events,
  Invites: Invites,
  State: State,
  Settings: Settings,
  User: User,
  Home: Home,
  Sidebar: Sidebar,
  Map: Map,
  Items: Items
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

var validateName = function validateName(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, nameLense, NAME_REQUIRED_MSG, data));
};

var validateEmails = function validateEmails(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, emailLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.isRequired, emailConfirmLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)((0, _ramda.equals)((0, _ramda.prop)("email", data)), emailConfirmLense, EMAILS_MUST_MATCH, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailConfirmLense, INVALID_EMAIL_FORMAT, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailLense, INVALID_EMAIL_FORMAT, data)).apLeft((0, _Utils.validate)((0, _ramda.equals)((0, _ramda.prop)("confirmEmail", data)), emailLense, EMAILS_MUST_MATCH, data));
};

var validateEmail = function validateEmail(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, emailLense, EMAIL_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.emailFormat, emailLense, INVALID_EMAIL_FORMAT, data));
};

var validatePasswords = function validatePasswords(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)(_Utils.isRequired, passwordConfirmLense, PASSWORD_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)((0, _ramda.equals)(data.password), passwordConfirmLense, PASSWORDS_MUST_MATCH, data)).apLeft((0, _Utils.validate)((0, _ramda.equals)(data.confirmPassword), passwordLense, PASSWORDS_MUST_MATCH, data));
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

var loginUser = function loginUser(mdl) {
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
      return function (s) {
        state.errors = {};
        m.route.set("/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(M().format("YYYY-MM-DD")));
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateLoginTask)(data).chain((0, _Http.loginTask)(_Http.HTTP)(mdl)).chain(function (user) {
      mdl.User = user;
      return (0, _Http.getUserProfileTask)(_Http.HTTP)(mdl)(mdl.User.objectId);
    }).map((0, _ramda.map)(function (profile) {
      mdl.User.profile = profile;
      mdl.Calendar.state.start(profile.startWeekOnDay);
      (0, _Http.setUserToken)(mdl)(mdl.User);
    })).chain(function (account) {
      mdl.User.account = account;
      return (0, _Utils.getMyLocationTask)(mdl);
    }).fork(onError, onSuccess(mdl));
  };
};

var data = {
  name: "",
  email: "",
  password: ""
};
var state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  showErrorMsg: Stream(false),
  errorMsg: Stream("")
};

var reset = function reset() {
  state = {
    isSubmitted: false,
    errors: {},
    httpError: undefined,
    showErrorMsg: Stream(false),
    errorMsg: Stream("")
  };
  data = {
    name: "",
    email: "",
    password: ""
  };
};

var validate = function validate() {
  var onSuccess = function onSuccess(_) {
    state.errors = null;
  };

  var onError = function onError(error) {
    state.errors = error;
  };

  state.isSubmitted && (0, _Validations.validateLoginTask)(data).fork(onError, onSuccess);
};

var Login = function Login() {
  return {
    onremove: function onremove() {
      return reset();
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
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.email = e.target.value.trim();
        },
        value: data.email
      }), state.errors.email && m("span.error-field", state.errors.email), m("input", {
        class: state.isSubmitted ? state.errors.password ? "has-error" : "has-success" : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.password = e.target.value.trim();
        },
        value: data.password
      }), state.errors.password && m("span.error-field", state.errors.password)]), state.httpError && m(".error-field", state.httpError)], m(m.route.Link, {
        // type: "submit",
        selector: "button",
        form: "login-form",
        onclick: function onclick(e) {
          e.preventDefault();
          loginUser(mdl)(data);
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
exports.default = exports.Register = exports.registerUser = void 0;

var _Utils = require("Utils");

var _Validations = require("./Validations");

var _Http = require("Http");

var data = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: ""
};
var state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  showErrorMsg: Stream(false),
  errorMsg: Stream("")
};

var resetState = function resetState() {
  state.errors = {};
  state.httpError = undefined;
  state.isSubmitted = false;
  state.showErrorMsg(false);
  state.errorMsg("");
};

var validate = function validate() {
  var onSuccess = function onSuccess(_) {
    state.errors = null;
  };

  var onError = function onError(error) {
    state.errors = error;
  };

  state.isSubmitted && (0, _Validations.validateUserRegistrationTask)(data).fork(onError, onSuccess);
};

var registerUser = function registerUser(mdl) {
  return function (data) {
    var onError = function onError(errors) {
      if (errors) {
        state.errors = errors;
        state.errorMsg(errors.message);
        state.showErrorMsg(true);
        console.log("failed - state", state, errors);
      } else {
        state.errorMsg("There seems to be a problem please contact web support");
        state.showErrorMsg(true);
        console.log("failed - state", state);
      }
    };

    var onSuccess = function onSuccess(mdl) {
      return function (data) {
        state.errors = null;
        sessionStorage.setItem("shindigit-user-token", mdl.User["user-token"]);
        sessionStorage.setItem("shindigit-user", JSON.stringify(mdl.User));
        m.route.set("/".concat((0, _Utils.hyphenize)(mdl.User.name), "/").concat(M().format("YYYY-MM-DD")));
      };
    };

    state.isSubmitted = true;
    (0, _Validations.validateUserRegistrationTask)(data).chain((0, _Http.registerTask)(_Http.HTTP)(mdl)).chain(function (_) {
      return (0, _Http.loginTask)(_Http.HTTP)(mdl)({
        email: data.email,
        password: data.password
      }).chain(function (_) {
        return (0, _Http.createProfileTask)(_Http.HTTP)(mdl);
      }).chain(function (profile) {
        mdl.User.profile = profile;
        return (0, _Http.relateProfileToUserTask)(_Http.HTTP)(mdl)(mdl.User.objectId)(profile.objectId);
      }).chain(function (_) {
        return (0, _Utils.getMyLocationTask)(mdl);
      });
    }).fork(onError, onSuccess(mdl));
  };
};

exports.registerUser = registerUser;

var RegisterUser = function RegisterUser() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          data = _ref$attrs.data,
          errors = _ref$attrs.errors,
          isSubmitted = _ref$attrs.isSubmitted;
      return [m("input", {
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.name = e.target.value.trim();
        },
        value: data.name
      }), state.errors && errors.name && m("span.error-field", errors.name), m("input", {
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.email = e.target.value.trim();
        },
        value: data.email
      }), state.errors && errors.email && m("span.error-field", errors.email), m("input", {
        id: "confirmEmail",
        type: "email",
        placeholder: "Confirm Email",
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.confirmEmail = e.target.value.trim();
        },
        value: data.confirmEmail
      }), state.errors && errors.confirmEmail && m("span.error-field", errors.confirmEmail), m("input", {
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.password = e.target.value.trim();
        },
        value: data.password
      }), state.errors && errors.password && m("span.error-field", errors.password), m("input", {
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onblur: function onblur(e) {
          return validate();
        },
        oninput: function oninput(e) {
          return data.confirmPassword = e.target.value.trim();
        },
        value: data.confirmPassword
      }), state.errors && errors.confirmPassword && m("span.error-field", errors.confirmPassword)];
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
        data: data,
        errors: state.errors,
        isSubmitted: state.isSubmitted
      })]), m(m.route.Link, {
        selector: "button",
        form: "register-form",
        onclick: function onclick(e) {
          e.preventDefault();
          registerUser(mdl)(data);
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

;require.register("Pages/Event/event-page.js", function(exports, require, module) {
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

var _data = _interopRequireDefault(require("data.task"));

var _validations = require("./validations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isUserItem = function isUserItem(mdl) {
  return function (item) {
    return mdl.User.objectId == item.guestId;
  };
};

var Event = function Event(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    error: {},
    status: "loading",
    selected: Stream(null),
    settings: {
      show: Stream(false)
    },
    modal: {
      isShowing: Stream(false),
      newHost: Stream(null)
    },
    info: {
      show: Stream(false),
      isShowing: Stream(true),
      map: {
        status: Stream(false)
      }
    },
    guests: {
      name: "",
      show: Stream(false),
      isShowing: Stream(false),
      status: Stream("success"),
      isSubmitted: Stream(false),
      error: Stream(null)
    },
    items: {
      name: "",
      quantity: "",
      show: Stream(false),
      isShowing: Stream(false),
      error: Stream(null),
      status: Stream("success"),
      isSubmitted: Stream(false),
      updateGuest: Stream(false)
    },
    comments: {
      message: "",
      show: Stream(false),
      isShowing: Stream(false),
      error: Stream(null),
      status: Stream("success"),
      isSubmitted: Stream(false)
    }
  };
  var data = {
    event: {},
    guests: [],
    items: [],
    comments: []
  };

  var showTab = function showTab(tab) {
    state.info.isShowing(false);
    state.guests.isShowing(false);
    state.comments.isShowing(false);
    state.items.isShowing(false);
    state[tab].isShowing(true);
  };

  var validate = function validate(field) {
    return function (input) {
      var onSuccess = function onSuccess(input) {
        state[field].status("success");
        state[field].error(null);
      };

      var onError = function onError(error) {
        state[field].status("failed");
        state[field].error(error);
      };

      var validateTask = {
        items: _validations.validateItemTask
      };
      state[field].isSubmitted() && validateTask[field](input)(data).fork(onError, onSuccess);
    };
  };

  var getUserFromId = function getUserFromId(id) {
    return (0, _ramda.pluck)("name", data.guests.filter((0, _ramda.propEq)("guestId", id)));
  };

  var updateEventView = function updateEventView(_ref2) {
    var event = _ref2.event,
        guests = _ref2.guests,
        items = _ref2.items,
        comments = _ref2.comments;
    data.event = event;
    data.guests = guests;
    data.comments = comments;
    data.items = items;
    state.error = {};
    state.status = "success";
    state.modal.isShowing(null);
  };

  var load = function load(_ref3) {
    var mdl = _ref3.attrs.mdl;

    var onError = function onError(error) {
      state.error = (0, _Utils.jsonCopy)(error);
      state.status = "failed";
      console.log("load error", state, data, error);
    };

    (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId()).fork(onError, updateEventView);
  };

  var deleteEvent = function deleteEvent(invite) {
    var onError = function onError(error) {
      state.error = (0, _Utils.jsonCopy)(error);
      state.status = "failed";
      console.log("delete event failed", error);
    };

    var onSuccess = function onSuccess() {
      state.error = {};
      state.status = "success";
      var name = (0, _Utils.hyphenize)(mdl.User.name);
      mdl.Invites.fetch(true);
      var date = M(data.event.start).format("YYYY-MM-DD");
      m.route.set("/".concat(name, "/").concat(date));
    };

    console.log(invite);
    (0, _Http.deleteEventTask)(_Http.HTTP)(mdl)(invite.eventId).fork(onError, onSuccess);
  };

  var leaveEvent = function leaveEvent(invite) {
    var onError = function onError(error) {
      state.error = (0, _Utils.jsonCopy)(error);
      state.status = "failed";
      console.log("delete event failed", error);
    };

    var onSuccess = function onSuccess() {
      state.error = {};
      state.status = "success";
      var name = (0, _Utils.hyphenize)(mdl.User.name);
      mdl.Invites.fetch(true);
      var date = M(data.event.start).format("YYYY-MM-DD");
      m.route.set("/".concat(name, "/").concat(date));
    };

    data.items.filter((0, _ramda.propEq)("guestId", mdl.User.objectId)).map((0, _ramda.set)((0, _ramda.lensProp)("guestId"), null)).traverse((0, _Http.updateItemTask)(_Http.HTTP)(mdl), _data.default.of).chain((0, _ramda.traverse)(_data.default.of, (0, _Http.updateItemToGuestTask)(_Http.HTTP)(mdl))).chain(function () {
      return (0, _Http.deleteInviteTask)(_Http.HTTP)(mdl)(invite.objectId);
    }).fork(onError, onSuccess);
  };

  var assignNewHost = function assignNewHost() {
    var onError = function onError(error) {
      state.error = (0, _Utils.jsonCopy)(error);
      state.status = "failed";
      console.log("assign new host failed", error);
    };

    var hostId = state.modal.newHost();
    console.log(data);
    (0, _Http.updateEventTask)(_Http.HTTP)(mdl)(data.event.eventId)({
      hostId: hostId
    }).chain(function () {
      return data.guests.traverse(function (guest) {
        return (0, _Http.updateInviteTask)(_Http.HTTP)(mdl)(guest.objectId)({
          hostId: hostId
        });
      }, _data.default.of);
    }).chain(function (_) {
      return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
    }).fork(onError, updateEventView);
  };

  var assignNewHostAndLeaveEvent = function assignNewHostAndLeaveEvent() {
    var onError = function onError(error) {
      state.error = (0, _Utils.jsonCopy)(error);
      state.status = "failed";
      console.log("delete event failed", error);
    };

    var onSuccess = function onSuccess() {
      leaveEvent((0, _ramda.find)((0, _ramda.propEq)("guestId", mdl.User.objectId), data.guests));
    };

    var hostId = state.modal.newHost();
    console.log(data); //updateEvent, invites,

    (0, _Http.updateEventTask)(_Http.HTTP)(mdl)(data.event.eventId)({
      hostId: hostId
    }).chain(function () {
      return data.guests.traverse(function (guest) {
        return (0, _Http.updateInviteTask)(_Http.HTTP)(mdl)(guest.objectId)({
          hostId: hostId
        });
      }, _data.default.of);
    }).fork(onError, onSuccess);
  };

  var otherGuests = function otherGuests(guests) {
    return (0, _ramda.without)(guests.filter((0, _ramda.propEq)("guestId", mdl.User.objectId)), guests);
  };

  var isHost = function isHost(guests) {
    return guests.filter((0, _ramda.propEq)("hostId", mdl.User.objectId)).any();
  };

  var isLast = function isLast(guests) {
    return !otherGuests(guests).filter((0, _ramda.propEq)("status", 1)).any();
  };

  var invite = function invite(guests) {
    return (0, _ramda.find)((0, _ramda.propEq)("guestId", mdl.User.objectId), guests);
  };

  var deleteInvite = function deleteInvite(mdl) {
    isLast(data.guests) ? state.modal.isShowing("isLast") : isHost(data.guests) ? state.modal.isShowing("isHost") : leaveEvent(invite(data.guests));
  }; // const updateInvite = (mdl) => (update) => {
  //   const onError = (error) => {
  //     state.error = jsonCopy(error)
  //     state.status = "failed"
  //     console.log("invite update failed", state, update)
  //   }
  //   const onSuccess = (eventData) => {
  //     updateEventView(eventData)
  //   }
  //   updateInviteTask(HTTP)(mdl)(invite.objectId)(update)
  //     .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
  //     .fork(onError, onSuccess)
  // }


  var updateItem = function updateItem(mdl) {
    return function (item) {
      var onError = function onError(error) {
        state.items.error((0, _Utils.jsonCopy)(error));
        state.items.status("failed");
        console.log("update item failed", error);
      };

      var onSuccess = function onSuccess(eventData) {
        state.items.name = "";
        state.items.quantity = "";
        state.items.updateGuest(false);
        updateEventView(eventData);
        state.items.isSubmitted(false);
      };

      state.items.isSubmitted(true);
      (0, _Http.updateItemTask)(_Http.HTTP)(mdl)(item).chain(function (item) {
        return state.items.updateGuest() ? (0, _Http.updateItemToGuestTask)(_Http.HTTP)(mdl)(item) : _data.default.of(item);
      }).chain(function (_) {
        return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
      }).fork(onError, onSuccess);
    };
  };

  var deleteItem = function deleteItem(mdl) {
    return function (itemId) {
      var onError = function onError(error) {
        state.error = (0, _Utils.jsonCopy)(error);
        state.status = "failed";
        console.log("delete item failed", error);
      };

      (0, _Http.deleteItemTask)(_Http.HTTP)(mdl)(itemId).chain(function (_) {
        return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
      }).fork(onError, updateEventView);
    };
  };

  var deleteComment = function deleteComment(mdl) {
    return function (commentId) {
      var onError = function onError(error) {
        state.error = (0, _Utils.jsonCopy)(error);
        state.status = "failed";
        console.log("delete comment failed", error);
      };

      (0, _Http.deleteCommentTask)(_Http.HTTP)(mdl)(commentId).chain(function (_) {
        return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
      }).fork(onError, updateEventView);
    };
  };

  var addItem = function addItem(mdl) {
    var onError = function onError(error) {
      state.items.error((0, _Utils.jsonCopy)(error));
      console.log("add item failed", error);
      state.items.status("failed");
    };

    var onSuccess = function onSuccess(eventData) {
      state.items.name = "";
      state.items.quantity = "";
      state.items.error(null);
      state.items.isSubmitted(false);
      updateEventView(eventData);
    };

    var item = {
      eventId: mdl.Events.currentEventId(),
      name: state.items.name,
      quantity: parseInt(state.items.quantity)
    };
    state.items.isSubmitted(true);
    (0, _validations.validateItemTask)(item)(data).chain((0, _Http.addItemToEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId())).chain(function (_) {
      return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
    }).fork(onError, onSuccess);
  };

  var sendMessage = function sendMessage(mdl) {
    var onError = function onError(error) {
      state.comments.error((0, _Utils.jsonCopy)(error));
      console.log("add item failed", error);
      state.comments.status("failed");
    };

    var onSuccess = function onSuccess(eventData) {
      state.comments.message = "";
      state.comments.error(null);
      state.comments.isSubmitted(false);
      updateEventView(eventData);
    };

    var comment = {
      message: state.comments.message,
      name: mdl.User.name,
      guestId: mdl.User.objectId,
      eventId: mdl.Events.currentEventId()
    };
    state.comments.isSubmitted(true);
    (0, _validations.validateCommentTask)(comment).chain((0, _Http.addCommentTask)(_Http.HTTP)(mdl)).chain(function (_) {
      return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
    }).fork(onError, onSuccess);
  };

  var sendInvite = function sendInvite(mdl) {
    var onError = function onError(error) {
      // console.log("error", state, error)
      state.guests.error(error);
      state.guests.status("failed");
    };

    var onSuccess = function onSuccess(eventData) {
      state.guests.email = "";
      state.guests.error(null);
      updateEventView(eventData);
    }; //move to Validations


    var hasBeenInvited = data.guests.filter((0, _ramda.propEq)("email", state.guests.email));

    if (hasBeenInvited.any()) {
      state.guests.error("Guest Has Already Been Invited");
      return state.guests.status("failed");
    }

    state.guests.error(null);
    (0, _Http.sendInviteTask)(_Http.HTTP)(mdl)(state.guests.email, data.event).chain(function (_) {
      return (0, _Http.loadEventTask)(_Http.HTTP)(mdl)(mdl.Events.currentEventId());
    }).fork(onError, onSuccess);
  };

  var setupMap = function setupMap(_ref4) {
    var dom = _ref4.dom;
    _mapboxGl.default.accessToken = "pk.eyJ1IjoiYm9hemJsYWtlIiwiYSI6ImNqdWJ4OGk4YzBpYXU0ZG5wNDI1OGM0eTIifQ.5UV0HkEGPiKUzFdbgdr5ww";

    try {
      var coords = JSON.parse(data.event.latlong);

      var createMarker = function createMarker() {
        return new _mapboxGl.default.Marker().setLngLat(coords).addTo(map);
      };

      var map = new _mapboxGl.default.Map({
        container: dom,
        center: coords,
        zoom: 15,
        style: "mapbox://styles/mapbox/streets-v11?optimize=true"
      });
      state.info.map.status(true);
      createMarker();
    } catch (error) {
      state.info.map.status(false);
      return;
    }
  };

  return {
    oninit: load,
    view: function view() {
      // console.log(data.event)
      return m(".event-page", [state.status == "loading" && m(".", "Fetching Event..."), state.status == "failed" && m(".code", state.error.message), state.status == "success" && m(".width-100", [m(".event-page-heading width-100", [state.modal.isShowing() == "isLast" && m(_Components.Modal, {
        mdl: mdl
      }, [{
        header: "Your the last to leave! click ok to delete this event",
        body: m(_cjs.WarningStandardLine),
        footer: m("button", {
          onclick: function onclick(e) {
            return deleteEvent(data.guests[0]);
          }
        }, "Delete")
      }]), state.modal.isShowing() == "isHost" && m(_Components.Modal, {
        mdl: mdl
      }, [{
        header: "Your the Host! to leave this event you need to assign a new host",
        body: m("ul", otherGuests(data.guests).filter((0, _ramda.propEq)("status", 1)).map(function (_ref5) {
          var name = _ref5.name,
              guestId = _ref5.guestId;
          return m("span", m("input", {
            id: guestId,
            type: "radio",
            name: "find-host",
            oninput: function oninput(e) {
              return state.modal.newHost(e.target.id);
            }
          }), name);
        })),
        footer: m(".frow ", [m("button.col-xs-1-2", {
          onclick: function onclick(e) {
            return assignNewHostAndLeaveEvent();
          }
        }, "Assign new Host and leave Event"), m("button.col-xs-1-2", {
          onclick: function onclick(e) {
            return state.modal.isShowing(null);
          }
        }, "Cancel and return to event")])
      }]), state.modal.isShowing() == "newHost" && m(_Components.Modal, {
        mdl: mdl
      }, [{
        header: "Select the new host",
        body: m("ul", otherGuests(data.guests).filter((0, _ramda.propEq)("status", 1)).map(function (_ref6) {
          var name = _ref6.name,
              guestId = _ref6.guestId;
          return m("span", m("input", {
            id: guestId,
            type: "radio",
            name: "find-host",
            oninput: function oninput(e) {
              return state.modal.newHost(e.target.id);
            }
          }), name);
        })),
        footer: m(".frow ", [m("button.col-xs-1-2", {
          onclick: function onclick(e) {
            return assignNewHost();
          }
        }, "Assign new Host"), m("button.col-xs-1-2", {
          onclick: function onclick(e) {
            return state.modal.isShowing(null);
          }
        }, "Cancel and return to event")])
      }]), m("h1.event-page-title.text-center", data.event.title), m(".frow row width-100", m("h3.event-page-subheading.col-xs-1-2", "".concat(M(data.event.start).format("ddd MM-DD-YYYY"))), m("h3.event-page-subheading.col-xs-1-2", "".concat(data.event.startTime, " - ").concat(data.event.endTime))), m(".navbar-tab-section-".concat((0, _Utils.getTheme)(mdl)), m(".frow row width-100", ["info", "guests", "comments", "items"].map(function (tab) {
        return m("button.navbar-tab-".concat((0, _Utils.getTheme)(mdl), ".col-xs-1-4"), {
          class: state[tab].isShowing() ? "navbar-tab-selected" : "",
          onclick: function onclick(e) {
            return showTab(tab);
          }
        }, tab);
      })))]), m(".accordian", [m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "info",
        title: "Info"
      }, [m("label", data.event.notes), m("label", data.event.hostId.name), m("label", data.event.hostId.email), m(".events-map-container", {
        style: {
          width: "100%",
          height: "250px"
        },
        oncreate: setupMap
      })]), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "guests",
        title: "Guests",
        pills: [m(".pill", data.guests.length)]
      }, m(".guests-container", [m(".event-forms", m(".frow row event-input-group", [m("input.col-xs-4-5", {
        placeholder: "email",
        type: "email",
        value: state.guests.email,
        oninput: function oninput(e) {
          return state.guests.email = e.target.value.trim();
        }
      }), m("button.btn-".concat((0, _Utils.getTheme)(mdl), ".col-xs-1-5.button-none"), {
        onclick: function onclick(e) {
          return sendInvite(mdl);
        }
      }, "Invite"), state.guests.error() && m("code.error-field", state.guests.error())])), m(".frow row-start", [m(".col-xs-1-2", mdl.User.name), m(".col-xs-1-2", m(_Components.InviteRSVP, {
        mdl: mdl,
        reload: function reload() {
          return mdl.Invites.fetch(true);
        },
        guest: (0, _ramda.head)(data.guests.filter((0, _ramda.propEq)("guestId", mdl.User.objectId)))
      }))]), data.guests.filter((0, _ramda.compose)(_ramda.not, (0, _ramda.propEq)("guestId", mdl.User.objectId))).map(function (guest) {
        return m(".frow row-start", [m(".col-xs-1-2", guest.name), m(".col-xs-1-2", m(_Components.InviteRSVP, {
          mdl: mdl,
          guest: guest
        }))]);
      })])), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "items",
        title: "Items",
        pills: [m(".pill", data.items.length)]
      }, [m(".frow row event-input-group", [m("input.col-xs-1-2", {
        placeholder: "name",
        value: state.items.name,
        oninput: function oninput(e) {
          return state.items.name = e.target.value;
        },
        onchange: function onchange(e) {
          return state.items.name = state.items.name.trim();
        },
        onblur: function onblur(e) {
          return validate("items")(state.items);
        },
        type: "text"
      }), m("input.col-xs-1-4", {
        placeholder: "quantity",
        value: state.items.quantity,
        oninput: function oninput(e) {
          return state.items.quantity = e.target.value.trim();
        },
        onblur: function onblur(e) {
          return validate("items")(state.items);
        },
        type: "number",
        inputMode: "number",
        pattern: "[0-9]*"
      }), m("button.btn-".concat((0, _Utils.getTheme)(mdl), ".col-xs-1-5.button-none"), {
        onclick: function onclick(e) {
          return addItem(mdl);
        }
      }, "Add"), state.items.error() && m("code.error-field", state.items.error().name), state.items.error() && m("code.error-field", state.items.error().quantity)]), m(".event-items", data.items.map(function (item) {
        return m(".event-items-item frow ", [m(".col-xs-2-3 ", m("h4", item.name), m("label", item.guestId ? [m("span.clickable.frow row-start", isUserItem(mdl)(item) && m(_cjs.MinusCircleLine, {
          onclick: function onclick(e) {
            item.guestId = null;
            state.items.updateGuest(true);
            updateItem(mdl)(item);
          },
          class: "smaller"
        }), getUserFromId(item.guestId))] : m("i.clickable", {
          onclick: function onclick(e) {
            item.guestId = mdl.User.objectId;
            state.items.updateGuest(true);
            updateItem(mdl)(item);
          }
        }, "click to select item"))), m(".col-xs-1-3 frow items-center", [isUserItem(mdl)(item) && m(".events-remove-item", m("span.clickable", m(_cjs.RemoveLine, {
          class: "smaller",
          onclick: function onclick(e) {
            return deleteItem(mdl)(item.objectId);
          }
        }))), m(".col-xs-2-3 frow column-center", [isUserItem(mdl)(item) && m(".col-xs-1-3", m("span.clickable", m(_cjs.AngleLine, {
          class: "smaller",
          onclick: function onclick(e) {
            item.quantity++;
            updateItem(mdl)(item);
          }
        }))), m(".col-xs-1-3 text-center pb-2", item.quantity), isUserItem(mdl)(item) && m(".col-xs-1-3", m("span.clickable.smaller", m(_cjs.AngleLine, {
          class: "decrement",
          onclick: function onclick(e) {
            item.quantity > 0 && item.quantity--;
            updateItem(mdl)(item);
          }
        })))])])]);
      }))]), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "comments",
        title: "Comments"
      }, m(".frow row-start", [m(".frow width-100", [m(".events-messages-container width-100 text-center", {
        oncreate: function oncreate(_ref7) {
          var dom = _ref7.dom;
          return dom.scrollTo(0, dom.scrollHeight, "smooth");
        }
      }, data.comments.any() ? data.comments.map(function (comment) {
        return m(".frow column-center width-100 mb-40", m(".event-comments-message-container ".concat(mdl.User.objectId == comment.guestId ? "me" : "other"), m(".event-comments-message frow items-end", [m(".speech-bubble", [m("span.text-left", comment.message), mdl.User.objectId == comment.guestId && m(_cjs.TimesCircleLine, {
          onclick: function onclick(e) {
            return deleteComment(mdl)(comment.objectId);
          },
          class: "event-comments-message-remove smaller"
        })]), m("label.event-comment-name", m(".frow row-between", [m("span", comment.name), m("span", M(comment.created).format((0, _Utils.getTimeFormat)(mdl)))]))])));
      }) : m(".events-messages-container-empty", "Start a conversation")), m(".event-comment-textbox-container", m(".frow items-end", [m(".col-xs-4-5", m("textarea.comments-message-container", {
        row: 20,
        cols: 50,
        placeholder: "Say hi...",
        value: state.comments.message,
        oncreate: _Utils.autoFocus,
        oninput: function oninput(e) {
          return state.comments.message = e.target.value;
        },
        onchange: function onchange(e) {
          return state.comments.message = state.comments.message.trim();
        },
        onblur: function onblur(e) {
          return validate("comments")(state.comments);
        }
      })), m(".col-xs-1-5", m("button.button-none.comments-message-btn-".concat((0, _Utils.getTheme)(mdl)), {
        onclick: function onclick(e) {
          return sendMessage(mdl);
        }
      }, "Send"))])), state.comments.error() && m("code.error-field", state.comments.error().name)])])), m(_Components.AccordianItem, {
        mdl: mdl,
        state: state,
        data: data,
        part: "settings",
        title: "Settings"
      }, m(".frow row-start", [m("button.btn-".concat((0, _Utils.getTheme)(mdl)), {
        onclick: function onclick(e) {
          return deleteInvite(mdl);
        }
      }, data.guests.length == 1 ? "Delete Event" : "Leave Event"), isHost(data.guests) && m("button.btn-".concat((0, _Utils.getTheme)(mdl)), {
        disabled: isLast(data.guests),
        onclick: function onclick(e) {
          return state.modal.isShowing("newHost");
        }
      }, "Change Host"), m("button.btn-".concat((0, _Utils.getTheme)(mdl)), {
        onclick: function onclick(e) {
          return console.log("edit event ...");
        }
      }, "Edit")]))])])]);
    }
  };
};

exports.Event = Event;
});

;require.register("Pages/Event/validations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCommentTask = exports.validateItemTask = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

var _Utils = require("Utils");

var ValidateItems = (0, _data.Success)((0, _ramda.curryN)(2, _ramda.identity));
var ValidateGuests = (0, _data.Success)((0, _ramda.curryN)(2, _ramda.identity));
var ValidateComments = (0, _data.Success)((0, _ramda.curryN)(1, _ramda.identity));
var quantityLens = (0, _ramda.lensProp)("quantity");
var nameLense = (0, _ramda.lensProp)("name");
var emailLense = (0, _ramda.lensProp)("email");
var messageLense = (0, _ramda.lensProp)("message");
var NAME_REQUIRED_MSG = "A Name is required";
var NAME_UNIQ_MSG = "This item has been added already";
var QUANTITY_REQUIRED_MSG = "A Quantity is required";
var QUANTITY_MIN_MSG = "Quantity must be greater than 0";
var EMAIL_REQUIRED_MSG = "An Email is required";
var MAX_TEXTAREA_LENGTH = "Message Limit is 250 characters";

var validateComment = function validateComment(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)((0, _Utils.maxLength)(250), messageLense, EMAIL_REQUIRED_MSG, data));
};

var validateItemName = function validateItemName(data) {
  return function (items) {
    return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, nameLense, NAME_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)((0, _Utils.isUniq)((0, _ramda.pluck)("name", items)), nameLense, NAME_UNIQ_MSG, data));
  };
};

var validateItemQuantity = function validateItemQuantity(data) {
  return (0, _data.Success)(data).apLeft((0, _Utils.validate)(_Utils.isRequired, quantityLens, QUANTITY_REQUIRED_MSG, data)).apLeft((0, _Utils.validate)((0, _ramda.max)(0), quantityLens, QUANTITY_MIN_MSG, data));
};

var validateItemTask = function validateItemTask(item) {
  return function (data) {
    return ValidateItems.ap(validateItemName(item)(data.items)).ap(validateItemQuantity(item)).failureMap(_ramda.mergeAll).toTask();
  };
};

exports.validateItemTask = validateItemTask;

var validateCommentTask = function validateCommentTask(data) {
  return ValidateComments.ap(validateComment(data)).failureMap(_ramda.mergeAll).toTask();
};

exports.validateCommentTask = validateCommentTask;
});

;require.register("Pages/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _Components = require("Components");

var _Models = require("Models");

var _Utils = require("Utils");

var _Styles = require("Styles");

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

var Home = function Home() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return m(".home-page", (".frow", mdl.Invites.state.status == "loading" && m("p.full-width", "FETCHING EVENTS..."), mdl.Invites.state.status == "failed" && m("p.full-width", "FAILED TO FETCH EVENTS"), mdl.Invites.state.status == "success" && [m(_Components.Calendar, {
        mdl: mdl,
        date: mdl.selectedDate(),
        invites: mdl.Invites.withRSVP()
      }), m(".frow.max-width", [m("".concat(mdl.Events.createNewEvent() ? ".col-xs-1-1" : ".col-xs-2-3"), m("button.btn-".concat((0, _Utils.getTheme)(mdl), ".max-width.height-100"), {
        // key: new Date(),
        onclick: function onclick(e) {
          return mdl.Events.createNewEvent(!mdl.Events.createNewEvent());
        }
      }, mdl.Events.createNewEvent() ? m("", {
        oncreate: (0, _Styles.Animate)(_Styles.shutterInLeft),
        onbeforeremove: (0, _Styles.Animate)(_Styles.shutterOutLeft)
      }, "Cancel") : m("", {
        oncreate: (0, _Styles.Animate)(_Styles.shutterInLeft),
        onbeforeremove: (0, _Styles.Animate)(_Styles.shutterOutLeft)
      }, "Create New Event"))), !mdl.Events.createNewEvent() && m("col-xs-1-3", m("button.btn-".concat((0, _Utils.getTheme)(mdl), ".max-width.height-100"), {
        oncreate: (0, _Styles.Animate)(_Styles.shutterInRight),
        onbeforeremove: (0, _Styles.Animate)(_Styles.shutterOutRight),
        onclick: function onclick(e) {
          return mdl.Day.listView(!mdl.Day.listView());
        }
      }, mdl.Day.listView() ? "Hour View" : "List View"))]), mdl.Events.createNewEvent() ? m(_Components.Editor, {
        oncreate: (0, _Styles.AnimatePage)(_Styles.shutterInTop, {
          delay: 1
        }),
        onbeforeremove: (0, _Styles.AnimatePage)(_Styles.shutterOutTop, {
          delay: 2
        }),
        mdl: mdl
      }) : [m(_Components.Day, {
        oncreate: (0, _Styles.AnimatePage)(_Styles.fadeInUp),
        onbeforeremove: (0, _Styles.AnimatePage)(_Styles.shutterOutDown, {
          delay: 2
        }),
        mdl: mdl,
        day: createDayVM(mdl)(getSelectedDayInvites(mdl)(mdl.Invites.withRSVP())),
        invites: getSelectedDayInvites(mdl)(mdl.Invites.withRSVP())
      })]]));
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

var _eventPage = require("./Event/event-page");

Object.keys(_eventPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventPage[key];
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

var _Components = require("Components");

var _Pages = require("Pages");

var AuthenticatedRoutes = [// {
//   id: "profile",
//   name: "Profile",
//   // icon: Icons.logo,
//   route: "/profile/:name",
//   position: ["toolbar"],
//   group: ["authenticated"],
//   children: [],
//   options: [],
//   onmatch: (mdl, args, path, fullroute, isAnchor) => {},
//   component: (mdl) => m(Layout, { mdl }, m(Profile, { mdl })),
// },
{
  id: "day-planner",
  name: "Day Planner",
  // icon: Icons.logo,
  route: "/:username/:date",
  position: ["toolbar"],
  group: ["authenticated"],
  children: [],
  options: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    var date = M(args.date).clone();
    console.log(args.date);
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
exports.focusInContract = exports.shutterOutRight = exports.shutterInRight = exports.shutterOutLeft = exports.shutterInLeft = exports.shutterInBottom = exports.shutterOutBottom = exports.shutterOutTop = exports.shutterInTop = exports.puffOutCenter = exports.shake = exports.slideInDown = exports.slideOutUp = exports.slideOutRight = exports.slideInLeft = exports.slideInRight = exports.fadeOutDown = exports.fadeOutUp = exports.fadeInDown = exports.fadeInUp = exports.fadeOut = exports.fadeIn = exports.popIn = void 0;
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
var fadeOut = [{
  opacity: 1
}, {
  opacity: 0
}];
exports.fadeOut = fadeOut;
var fadeInUp = [{
  opacity: 0,
  transform: "translate3d(0, 40%, 0)"
}, {
  opacity: 1,
  transform: "translate3d(0, 0, 0)"
}];
exports.fadeInUp = fadeInUp;
var fadeInDown = [{
  opacity: 0,
  transform: "translate3d(0, 0, 0)"
}, {
  opacity: 1,
  transform: "translate3d(0, 10px, 0)"
}];
exports.fadeInDown = fadeInDown;
var fadeOutUp = [{
  opacity: 1,
  transform: "translate3d(0, 0, 0)"
}, {
  opacity: 0,
  transform: "translate3d(0, -40%, 0)"
}];
exports.fadeOutUp = fadeOutUp;
var fadeOutDown = [{
  opacity: 1,
  transform: "translate3d(0, -10px, 0)"
}, {
  opacity: 0,
  transform: "translate3d(0, 0, 0)"
}];
exports.fadeOutDown = fadeOutDown;
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
var slideOutUp = [{
  transform: "translate3d(0, 0, 0)"
}, {
  visibility: "hidden",
  transform: "translate3d(0, 10%, 0)"
}];
exports.slideOutUp = slideOutUp;
var slideInDown = [{
  transform: "translate3d(0, -10%, 0)"
}, {
  transform: "translate3d(0, 0, 0)",
  visibility: "visible"
}];
exports.slideInDown = slideInDown;
var shake = [{
  "-webkit-transform": "rotate(-15deg)",
  offset: 0.0,
  transform: "rotate(-15deg)"
}, {
  "-webkit-transform": "rotate(15deg)",
  offset: 0.2,
  transform: "rotate(15deg)"
}, {
  "-webkit-transform": "rotate(-18deg)",
  offset: 0.4,
  transform: "rotate(-18deg)"
}, {
  "-webkit-transform": "rotate(18deg)",
  offset: 0.6,
  transform: "rotate(18deg)"
}, {
  "-webkit-transform": "rotate(-22deg)",
  offset: 0.8,
  transform: "rotate(-22deg)"
}];
exports.shake = shake;
var puffOutCenter = [{
  "-webkit-transform": "scale(1)",
  transform: "scale(1)",
  filter: "blur(0)",
  opacity: 1
}, {
  "-webkit-transform": "scale(2)",
  transform: "scale(2)",
  filter: "blur(4px)",
  opacity: 0
}];
exports.puffOutCenter = puffOutCenter;
var shutterInTop = [{
  "-webkit-transform": "rotateX(-100deg)",
  transform: " rotateX(-100deg)",
  "-webkit-transform-origin": "top",
  "transform-origin": "top",
  opacity: 0
}, {
  "-webkit-transform": " rotateX(0deg)",
  transform: " rotateX(0deg)",
  "-webkit-transform-origin": "top",
  "transform-origin": "top",
  opacity: 1
}];
exports.shutterInTop = shutterInTop;
var shutterOutTop = [{
  "-webkit-transform": "rotateX(0deg)",
  transform: " rotateX(0deg)",
  "-webkit-transform-origin": "top",
  "transform-origin": "top",
  opacity: 1
}, {
  "-webkit-transform": " rotateX(70deg)",
  transform: " rotateX(70deg)",
  "-webkit-transform-origin": "top",
  "transform-origin": "top",
  opacity: 0
}];
exports.shutterOutTop = shutterOutTop;
var shutterOutBottom = [{
  "-webkit-transform": "rotateX(0deg)",
  transform: " rotateX(0deg)",
  "-webkit-transform-origin": "bottom",
  "transform-origin": "bottom",
  opacity: 1
}, {
  "-webkit-transform": " rotateX(-70deg)",
  transform: " rotateX(-70deg)",
  "-webkit-transform-origin": "bottom",
  "transform-origin": "bottom",
  opacity: 0
}];
exports.shutterOutBottom = shutterOutBottom;
var shutterInBottom = [{
  "-webkit-transform": "rotateX(100deg)",
  transform: " rotateX(100deg)",
  "-webkit-transform-origin": "bottom",
  "transform-origin": "bottom",
  opacity: 0
}, {
  "-webkit-transform": " rotateX(0deg)",
  transform: " rotateX(0deg)",
  "-webkit-transform-origin": "bottom",
  "transform-origin": "bottom",
  opacity: 1
}];
exports.shutterInBottom = shutterInBottom;
var shutterInLeft = [{
  "-webkit-transform": "rotateY(100deg)",
  transform: " rotateY(100deg)",
  "-webkit-transform-origin": "left",
  "transform-origin": "left",
  opacity: 0
}, {
  "-webkit-transform": " rotateY(0deg)",
  transform: " rotateY(0deg)",
  "-webkit-transform-origin": "left",
  "transform-origin": "left",
  opacity: 1
}];
exports.shutterInLeft = shutterInLeft;
var shutterOutLeft = [{
  "-webkit-transform": "rotateY(0deg)",
  transform: " rotateY(0deg)",
  "-webkit-transform-origin": "left",
  "transform-origin": "left",
  opacity: 1
}, {
  "-webkit-transform": " rotateY(-70deg)",
  transform: " rotateY(-70deg)",
  "-webkit-transform-origin": "left",
  "transform-origin": "left",
  opacity: 0
}];
exports.shutterOutLeft = shutterOutLeft;
var shutterInRight = [{
  "-webkit-transform": "rotateY(-100deg)",
  transform: " rotateY(-100deg)",
  "-webkit-transform-origin": "right",
  "transform-origin": "right",
  opacity: 0
}, {
  "-webkit-transform": " rotateY(0deg)",
  transform: " rotateY(0deg)",
  "-webkit-transform-origin": "right",
  "transform-origin": "right",
  opacity: 1
}];
exports.shutterInRight = shutterInRight;
var shutterOutRight = [{
  "-webkit-transform": "rotateY(0deg)",
  transform: " rotateY(0deg)",
  "-webkit-transform-origin": "right",
  "transform-origin": "right",
  opacity: 1
}, {
  "-webkit-transform": " rotateY(70deg)",
  transform: " rotateY(70deg)",
  "-webkit-transform-origin": "right",
  "transform-origin": "right",
  opacity: 0
}];
exports.shutterOutRight = shutterOutRight;
var focusInContract = [{
  filter: "blur(12px)",
  opacity: 0
}, {
  filter: "blur(0)",
  opacity: 1
}];
exports.focusInContract = focusInContract;
});

;require.register("Styles/animo.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.animate = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VENDOR_TRANSFORMS = ["mozTransform", "msTransform", "oTransform", "transform", "webkitTransform"];
var VENDOR_TRANSITIONS = ["mozTransition", "msTransition", "oTransition", "transition", "webkitTransition"];
var VENDOR_PREFIXED_LISTENERS = {
  animation: {
    animationEnd: "animationend",
    transitionEnd: "transitionend"
  },
  OAnimation: {
    animationEnd: "oAnimationEnd",
    transitionEnd: "oTransitionEnd"
  },
  MozAnimation: {
    animationEnd: "animationend",
    transitionEnd: "transitionend"
  },
  WebkitAnimation: {
    animationEnd: "webkitAnimationEnd",
    transitionEnd: "webkitTransitionEnd"
  }
};

var whichVendor = function whichVendor() {
  var el = document.createElement("fakeelement");

  for (var a in VENDOR_PREFIXED_LISTENERS) {
    if (el.style[a] !== undefined) {
      return VENDOR_PREFIXED_LISTENERS[a];
    }

    return VENDOR_PREFIXED_LISTENERS.animation;
  }
};

var animo = function animo(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var state = {
    iteration: 0
  };
  var defaultProps = {
    iterate: 1,
    isAnimation: false,
    onComplete: function onComplete() {},
    onIteration: function onIteration() {},
    onMount: function onMount() {}
  };
  return new Promise(function (resolve, reject) {
    if (!element) {
      return reject("could not find element");
    }

    var originalStyles = _objectSpread({}, element.style);

    var props = Object.freeze(_objectSpread(_objectSpread({}, defaultProps), options));
    var vendor = whichVendor();
    var animoEl = {
      css: function css(styles) {
        element.setAttribute("style", JSON.stringify(styles));
      },
      reset: function reset() {
        element.setAttribute("style", JSON.stringify(originalStyles));
      },
      transform: function transform(styleString) {
        VENDOR_TRANSFORMS.forEach(function (transform) {
          element.style[transform] = styleString;
        });
      },
      transition: function transition(styleString) {
        VENDOR_TRANSITIONS.forEach(function (transition) {
          element.style[transition] = styleString;
        });
      }
    };

    var performOnMount = function performOnMount() {
      return new Promise(function (resolve, reject) {
        props.onMount(_objectSpread(_objectSpread({}, animoEl), {}, {
          raw: element
        })); // TODO: actually confirm updates rather than
        // delaying and blindly resolving

        setTimeout(function () {
          resolve();
        }, 1);
      });
    };

    var animationStep = function animationStep(event) {
      element.removeEventListener(vendor.transitionEnd, animationStep);

      if (state.iteration === props.iterate) {
        props.onComplete(_objectSpread(_objectSpread({}, animoEl), {}, {
          raw: element
        }));
        setTimeout(function () {
          resolve(element);
        }, 1);
        return;
      }

      props.onIteration(_objectSpread(_objectSpread({}, animoEl), {}, {
        raw: element
      }));
      element.addEventListener(vendor.transitionEnd, animationStep);
      state.iteration++;
    };

    if (!props.isAnimation) {
      element.addEventListener(vendor.transitionEnd, animationStep);
    } else {
      element.addEventListener(vendor.animationEnd, function () {
        props.onComplete(_objectSpread(_objectSpread({}, animoEl), {}, {
          raw: element
        }));
        setTimeout(function () {
          resolve(element);
        }, 1);
        return;
      });
    }

    performOnMount().then(animationStep);
  });
};

var animate = function animate(el, options) {
  var defaultProps = {
    classNames: ["animated"],
    keep: false
  };

  var props = _objectSpread(_objectSpread({}, defaultProps), options);

  if (!Array.isArray(props.classNames)) {
    props.classNames = [props.classNames];
  }

  return new animo(el, {
    isAnimation: true,
    onComplete: function onComplete(element) {
      if (!props.keep) {
        props.classNames.forEach(function (classname) {
          el.classList.remove(classname);
        });
      }
    },
    onIteration: function onIteration(element) {
      props.classNames.forEach(function (classname) {
        el.classList.add(classname);
      });
    }
  });
};

exports.animate = animate;
var _default = Animo;
exports.default = _default;
});

;require.register("Styles/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AnimatePage: true,
  Animate: true,
  AnimateChildren: true,
  createKeyframeAnimation: true
};
exports.createKeyframeAnimation = exports.AnimateChildren = exports.Animate = exports.AnimatePage = void 0;

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaults = {
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

var AnimatePage = function AnimatePage(animation, opts) {
  return function (_ref) {
    var dom = _ref.dom;
    // let origStyles = jsonCopy(dom.style)
    // dom.style.position = "absolute"
    // dom.style.top = -19
    // dom.style.width = "100%"
    Animate(animation, opts)({
      dom: dom
    }); // Animate(animation)({ dom })
  };
};

exports.AnimatePage = AnimatePage;

var Animate = function Animate(animation, opts) {
  return function (_ref2) {
    var dom = _ref2.dom;
    return dom.animate(animation, _objectSpread(_objectSpread({}, defaults), opts)).finished.then(transitionEndPromise(dom));
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

function ease(v) {
  var pow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  return 1 - Math.pow(1 - v, pow);
}

function calculateCollapsedScale(el) {
  // The menu title can act as the marker for the collapsed state.
  var collapsed = document.getElementById("scale-me").getBoundingClientRect(); // Whereas the menu as a whole (title plus items) can act as
  // a proxy for the expanded state.

  var expanded = el.getBoundingClientRect();
  return {
    x: collapsed.width / expanded.width,
    y: collapsed.height / expanded.height
  };
}

var createKeyframeAnimation = function createKeyframeAnimation(isEntrance) {
  return function (_ref4) {
    var dom = _ref4.dom;
    var animation = [];
    var inverseAnimation = []; // Figure out the size of the element when collapsed.

    var _calculateCollapsedSc = calculateCollapsedScale(dom),
        x = _calculateCollapsedSc.x,
        y = _calculateCollapsedSc.y;

    for (var step = 0; step <= 100; step++) {
      // Remap the step value to an eased one.
      var easedStep = ease(step / 100); // Calculate the scale of the element.

      var xScale = x + (1 - x) * easedStep;
      var yScale = y + (1 - y) * easedStep;
      animation.push({
        transform: "scale(".concat(xScale, ", ").concat(yScale, ")")
      }); // And now the inverse for the contents.

      var invXScale = 1 / xScale;
      var invYScale = 1 / yScale;
      inverseAnimation.push({
        transform: "scale(".concat(invXScale, ", ").concat(invYScale, ")")
      });
    }

    return isEntrance ? animation : inverseAnimation;
  };
};

exports.createKeyframeAnimation = createKeyframeAnimation;
});

;require.register("Utils/geolocation.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyLocationTask = exports.getBoundsFromLatLong = void 0;

var _ramda = require("ramda");

var _data = _interopRequireDefault(require("data.task"));

var _Utils = require("Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toBoundsUrlString = function toBoundsUrlString(_ref) {
  var lat_min = _ref.lat_min,
      lon_min = _ref.lon_min,
      lat_max = _ref.lat_max,
      lon_max = _ref.lon_max;
  return encodeURIComponent("".concat(lon_min, ",").concat(lat_min, ",").concat(lon_max, ",").concat(lat_max));
};

var getBoundsFromLatLong = function getBoundsFromLatLong(mdl) {
  return function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        latitude = _ref3[0],
        longitude = _ref3[1];

    var lat_change = mdl.User.profile.searchRadius / 111 || 20 / 111;
    var lon_change = Math.abs(Math.cos(latitude * (Math.PI / 180)));
    return toBoundsUrlString({
      lat_min: latitude - lat_change,
      lon_min: longitude - lon_change,
      lat_max: latitude + lat_change,
      lon_max: longitude + lon_change
    });
  };
};

exports.getBoundsFromLatLong = getBoundsFromLatLong;

var getMyLocationTask = function getMyLocationTask(mdl) {
  return new _data.default(function (rej, res) {
    return navigator.permissions ? // Permission API is implemented
    navigator.permissions.query({
      name: "geolocation"
    }).then(function (permission) {
      return (// is geolocation granted?
        permission.state === "granted" ? navigator.geolocation.getCurrentPosition(function (pos) {
          return res(pos.coords);
        }) : res(null)
      );
    }) : // Permission API was not implemented
    res(mdl.Map.defaultBounds);
  }) // .map(prop("coords"))
  .map((0, _ramda.props)(["latitude", "longitude"])).map(function (coords) {
    mdl.Map.locale(coords);
    return getBoundsFromLatLong(mdl)(coords);
  }).map(mdl.Map.bounds);
};

exports.getMyLocationTask = getMyLocationTask;
});

;require.register("Utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  log: true,
  autoFocus: true,
  getTheme: true,
  stackInvites: true,
  debounce: true,
  inviteOptions: true,
  getInviteStatusColor: true,
  hyphenize: true,
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
exports.isEqual = exports.range = exports.isSideBarActive = exports.jsonCopy = exports.nameFromRoute = exports.NoOp = exports.Pause = exports.randomPause = exports.rand = exports.hyphenize = exports.getInviteStatusColor = exports.inviteOptions = exports.debounce = exports.stackInvites = exports.getTheme = exports.autoFocus = exports.log = void 0;

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

var _geolocation = require("./geolocation.js");

Object.keys(_geolocation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _geolocation[key];
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

var autoFocus = function autoFocus(_ref) {
  var dom = _ref.dom;
  return dom.focus();
};

exports.autoFocus = autoFocus;

var getTheme = function getTheme(mdl) {
  return mdl.User.profile.isDarkTheme ? "dark" : "light";
};

exports.getTheme = getTheme;

var stackInvites = function stackInvites(idx) {
  var bIdx = 140;
  var lIdx = -5;
  var bottom = idx * 140 + bIdx;
  var left = idx * 3 + lIdx;
  return {
    style: {
      left: "".concat(left, "px"),
      bottom: "".concat(bottom, "px")
    }
  };
};

exports.stackInvites = stackInvites;

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

var hyphenize = function hyphenize(strWithSpaces) {
  return strWithSpaces.replace(/\s/g, "-");
};

exports.hyphenize = hyphenize;

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
  return function () {
    return n * 1000;
  };
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
exports.firstInviteHour = exports.shortDateString = exports.toHourViewModel = exports.getFullDate = exports.fromFullDate = exports.monthsOfTheYear = exports.daysOfTheWeekFrom = exports.daysOfTheWeek = exports.isToday = exports.datesAreSame = exports.getHoursInDay = exports.getTimeFormat = exports.getMin = exports.getHour = exports.pad0Left = exports.pad00Min = exports.padding = void 0;

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

var getTimeFormat = function getTimeFormat(mdl) {
  return mdl.User.profile.is24Hrs ? "HH:mm" : "h:mm a";
}; //need to fix to work for 12 hrs


exports.getTimeFormat = getTimeFormat;

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
      var f = M(first).format(format);
      var s = M(second).format(format);
      return M(f).isSame(M(s));
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
var daysOfTheWeek = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"];
exports.daysOfTheWeek = daysOfTheWeek;

var getFirstDay = function getFirstDay(idx, weeks) {
  return weeks[idx];
};

var getNextDay = function getNextDay(week, weeks) {
  var lastDay = week[week.length - 1];
  var nextDayIdx = weeks.indexOf(lastDay) + 1 > 6 ? 0 : weeks.indexOf(lastDay) + 1 < 0 ? 6 : weeks.indexOf(lastDay) + 1;
  return weeks[nextDayIdx];
};

var toStartOf = function toStartOf(idx, weeks) {
  return function (week, day) {
    if (week.length == 7) return week;
    week.length > 0 ? week.push(getNextDay(week, weeks)) : week.push(getFirstDay(idx, weeks));
    return week;
  };
};

var daysOfTheWeekFrom = function daysOfTheWeekFrom(idx) {
  return daysOfTheWeek.reduce(toStartOf(idx, daysOfTheWeek), []);
};

exports.daysOfTheWeekFrom = daysOfTheWeekFrom;
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
exports.isUniq = exports.isEqual = exports.isNilOrEmptyOrAtom = exports.allCaps = exports.onlyNumeric = exports.urlFormat = exports.phoneFormat = exports.onlyAlphaNumericSpaceSpecial = exports.onlyAlphaNumericSpaceUnderscore = exports.onlyAlphaNumericSpace = exports.onlyAlphaNumericUnderscore = exports.onlyAlphaNumeric = exports.onlyAlpha = exports.emailFormat = exports.maxSize = exports.maxLength = exports.isNullOrEmpty = exports.isNotNullOrEmpty = exports.IsNotNilOrZero = exports.IsNotNil = exports.isRequired = exports.validate = exports.getOrElse = void 0;

var _ramda = require("ramda");

var _data = require("data.validation");

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

var IsNotNilOrZero = function IsNotNilOrZero(data) {
  return IsNotNil(data) || data == 0;
};

exports.IsNotNilOrZero = IsNotNilOrZero;

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

var allCaps = function allCaps(str) {
  return str.toUpperCase() === str;
};

exports.allCaps = allCaps;

var isNilOrEmptyOrAtom = function isNilOrEmptyOrAtom(item) {
  return (0, _ramda.isNil)(item) || (0, _ramda.isEmpty)(item) || item === "{$type:atom}";
};

exports.isNilOrEmptyOrAtom = isNilOrEmptyOrAtom;

var isEqual = function isEqual(input1) {
  return function (input2) {
    return input2 === input1;
  };
};

exports.isEqual = isEqual;

var isUniq = function isUniq(xs) {
  return function (x) {
    return (0, _ramda.not)(xs.includes(x));
  };
};

exports.isUniq = isUniq;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _Utils = require("Utils");

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
  (0, _Utils.getMyLocationTask)(_Models.default).fork((0, _Utils.log)("location err"), (0, _Utils.log)("location: "));

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
  return require("./index.js");
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