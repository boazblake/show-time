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
require.register("App.js", function(exports, require, module) {
import Routes from "./Routes/index"

const toRoutes = (mdl) => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.State.isAuth()) {
        m.route.set(m.route.get())
      }
      mdl.State.route = route
      mdl.State.anchor = path.split("#")[1]
      route.onmatch(mdl, args, path, fullroute)
    },
    render: () => route.component(mdl),
  }
  return acc
}

const App = (mdl) => Routes.reduce(toRoutes(mdl), {})

export default App

});

;require.register("Components/calendar/calendar-model.js", function(exports, require, module) {
import {
  eachDayOfInterval,
  endOfISOWeek,
  startOfISOWeek,
  eachWeekOfInterval,
  parseISO,
} from "date-fns"
import { datesAreSame } from "Utils"

export const isCalenderDay = (invites, day) => ({
  day: day,
  dir: 0,
  invites,
})

export const isNotCalenderDay = (invites, day, date) => ({
  day: day,
  dir: day.isBefore(date) ? -1 : day.isAfter(date) ? 1 : 0,
  invites,
})

const filterBy = (day) => (invites) =>
  invites.filter((i) => datesAreSame(i.start)(day)("YYYY-MM-DD"))

export const createCalendarDayViewModel = (
  invites,
  day,
  date,
  { isSameMonth }
) => {
  return isSameMonth
    ? isCalenderDay(filterBy(day)(invites), M.utc(day))
    : isNotCalenderDay(filterBy(day)(invites), M.utc(day), date)
}

export const createCalendar = (invites, date) => {
  let start = parseISO(date.clone().startOf("month").toISOString())
  let end = parseISO(date.clone().endOf("month").toISOString())

  const matrix = eachWeekOfInterval(
    {
      start,
      end,
    },
    { weekStartsOn: 1 }
  )

  return matrix.map((weekDay) =>
    eachDayOfInterval({
      start: startOfISOWeek(weekDay),
      end: endOfISOWeek(weekDay),
    }).map((day) =>
      createCalendarDayViewModel(invites, day, date, {
        isSameMonth: date.isSame(day, "month"),
      })
    )
  )
}

export const calendarModel = ({ mdl, invites, date }) => {
  let today = M.utc()
  let _date = M.utc(date)
  let dto = {
    invites,
    startDate: _date,
    selected: {
      year: _date.year(),
      month: _date.month() + 1,
      day: _date.day(),
    },
    today: {
      year: today.year(),
      month: today.month(),
      day: today.day(),
    },
    daysInMonth: _date.daysInMonth(),
  }
  return dto
}

export const calendarDayStyle = (selectedDate, current, dir) => {
  let today = M.utc()
  if (dir !== 0) {
    return "cal-day notThisMonth"
  }

  if (
    today.isSame(current, "day") &&
    today.isSame(current, "month") &&
    today.isSame(current, "year") &&
    selectedDate.isSame(current, "date")
  ) {
    return "selectedDay isToday"
  }

  if (
    today.isSame(current, "day") &&
    today.isSame(current, "month") &&
    today.isSame(current, "year")
  ) {
    return "cal-day isToday"
  }
  if (selectedDate.isSame(current, "date")) {
    return "cal-day selectedDay"
  } else return "cal-day"
}

});

;require.register("Components/calendar/calendar.js", function(exports, require, module) {
import { createCalendar, calendarDayStyle } from "./calendar-model"
import { Toolbar } from "Components"
import { daysOfTheWeek, firstInviteHour } from "Utils"
const Navbar = () => {
  return {
    view: ({ attrs: { mdl, date } }) => {
      return m(".frow width-100 ", [
        m(".frow width-100 row-between", [
          m(
            m.route.Link,
            {
              selector: "button",
              href: `/${mdl.User.name}/${date
                .clone()
                .subtract(1, "year")
                .format("YYYY-MM-DD")}`,
            },
            date.clone().subtract(1, "year").format("YYYY")
          ),

          m(".centerMonthGroup", [
            m("h2.currentMonth", date.format("MMMM")),
            m("h3.text-center", date.format("YYYY")),
          ]),

          m(
            m.route.Link,
            {
              selector: "button",
              href: `/${mdl.User.name}/${date
                .clone()
                .add(1, "year")
                .format("YYYY-MM-DD")}`,
            },
            date.clone().add(1, "year").format("YYYY")
          ),
        ]),
        m(".frow width-100 row-between mt-10", [
          m(
            m.route.Link,
            {
              selector: "button",
              href: `/${mdl.User.name}/${date
                .clone()
                .subtract(1, "month")
                .format("YYYY-MM-DD")}`,
            },
            m("h4", date.clone().subtract(1, "month").format("MMMM"))
          ),
          m(
            m.route.Link,
            {
              selector: "button",
              href: `/${mdl.User.name}/${date
                .clone()
                .add(1, "month")
                .format("YYYY-MM-DD")}`,
            },
            m("h4", date.clone().add(1, "month").format("MMMM"))
          ),
        ]),
      ])
    },
  }
}

const DaysOfWeek = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow width-100 row-between mt-10",
        daysOfTheWeek.map((day) =>
          m(
            ".col-xs-1-7 text-center",
            m(
              "span.width-auto.text-strong",

              day[0].toUpperCase()
            )
          )
        )
      ),
  }
}

const CalendarDay = () => {
  return {
    view: ({ attrs: { mdl, invites, day, dir } }) =>
      m(
        ".col-xs-1-7 text-center",
        m(
          m.route.Link,
          {
            href: `/${mdl.User.name}/${day.format("YYYY-MM-DD")}`,
            class: "cal-day-link",
            onclick: (e) =>
              mdl.State.toAnchor(
                firstInviteHour(invites) || M.utc().format("HH")
              ),
          },
          m(`.${calendarDayStyle(mdl.selectedDate(), day, dir)}`, [
            m("span.cal-date", day.format("D")),
            invites.any() && m(".cal-invites-item", invites.length),
          ])
        )
      ),
  }
}

const CalendarBody = () => {
  return {
    view: ({ attrs: { mdl, date, invites } }) => {},
  }
}

export const Calendar = () => {
  return {
    view: ({ attrs: { mdl, date, invites } }) => {
      let matrix = createCalendar(invites, date)
      return m(
        ".calendar",
        m(".frow frow-container", [
          m(Navbar, { mdl, date }),
          m(DaysOfWeek, { mdl }),
          m(
            ".frow centered-column width-100 row-between mt-10 ",
            matrix.map((week) =>
              m(
                ".frow width-100",
                week.map(({ invites, day, dir }) => {
                  return m(CalendarDay, { mdl, invites, day, dir })
                })
              )
            )
          ),
        ])
      )
    },
  }
}

});

;require.register("Components/component.js", function(exports, require, module) {
const Component = () => {
  return {
    view: () => m("."),
  }
}

});

;require.register("Components/day.js", function(exports, require, module) {
import {
  getHoursInDay,
  firstInviteHour,
  inviteOptions,
  getInviteStatusColor,
} from "Utils"

const createEventUrl = (invite) =>
  `${invite.start.format("YYYY-MM-DD")}/${invite.start.format(
    "HH"
  )}/${invite.start.format("mm")}`

const HourInvite = () => {
  return {
    view: ({ attrs: { mdl, invite, col } }) => {
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          ".invite-list-item ",
          {
            onclick: (e) => {
              mdl.Events.currentEventId(invite.eventId)
              mdl.Events.currentEventStartTime(invite.start)
              localStorage.setItem("eventId", invite.eventId)
              m.route.set(`/${mdl.User.name}/${createEventUrl(invite)}`)
            },
            style: {
              "background-color": getInviteStatusColor(invite.status),
              top: `${invite.start.format("mm")}px`,
              height: `${invite.end.diff(invite.start, "minutes") * 2}px`,
            },
          },
          invite.title
        )
      )
    },
  }
}

const scrollToCurrentTimeOrInvite = (mdl, invites) => {
  let first = firstInviteHour(invites)
  let hour = mdl.State.toAnchor()
    ? mdl.State.toAnchor()
    : first
    ? first
    : M().format("HH")
  let el = document.getElementById(`${hour}:00`)
  el &&
    el.scrollIntoView({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
}

export const HourView = () => {
  return {
    view: ({ attrs: { mdl, hour, events } }) => {
      return m(
        ".frow ",
        m(".hour ", [
          m("p.hour-time", { id: hour }, hour),
          m(
            ".invite-list frow ",
            events.map((invite, idx) =>
              m(HourInvite, { mdl, invite, col: events.length, key: idx })
            )
          ),
        ])
      )
    },
  }
}

const ListView = () => {
  return {
    view: ({ attrs: { mdl, invites } }) =>
      m(
        "ul",
        invites.map((invite) => {
          console.log(invite)
          return m(
            "li.frow-container",
            {
              class: inviteOptions[invite.status],
              onclick: (e) => {
                mdl.Events.currentEventId(invite.eventId)
                mdl.Events.currentEventStartTime(invite.start)
                localStorage.setItem("eventId", invite.eventId)
                m.route.set(`/${mdl.User.name}/${createEventUrl(invite)}`)
              },
            },
            [
              m("h3", invite.title),
              m(".frow row-start", [
                m(
                  "label.col-xs-1-3",
                  `${invite.start.format("HH:mm")} - ${invite.end.format(
                    "HH:mm"
                  )}`
                ),
                m("label.col-xs-1-4"),
              ]),
            ]
          )
        })
      ),
  }
}

export const Day = ({ attrs: { mdl } }) => {
  return {
    oncreate: ({ attrs: { mdl, invites } }) =>
      scrollToCurrentTimeOrInvite(mdl, invites),
    onupdate: ({ attrs: { mdl, invites } }) =>
      mdl.State.toAnchor() && scrollToCurrentTimeOrInvite(mdl, invites),
    view: ({ attrs: { mdl, day, invites } }) => {
      return m(".day", [
        m(".day-container", [
          mdl.Day.listView()
            ? m(ListView, { mdl, invites })
            : getHoursInDay(mdl.State.timeFormats[mdl.State.format()]).map(
                (hour, idx) => {
                  return m(HourView, {
                    mdl,
                    invites: day[hour],
                    hour,
                    events: day[hour],
                  })
                }
              ),
        ]),
      ])
    },
  }
}

});

;require.register("Components/editor/editor.js", function(exports, require, module) {
import { EventForm } from "./event-form"
import { HTTP, submitEventTask } from "Http"
import { validateTask } from "./validations"

export const Editor = ({ attrs: { mdl } }) => {
  const EventFormData = {
    shortDate: mdl.selectedDate().format("YYYY-MM-DD"),
    allDay: false,
    inPerson: true,
    location: "",
    latlong: "",
    startTime: "",
    endTime: "",
    title: "",
    notes: "",
  }

  let EventFormState = {
    status: "loading",
    errors: null,
    isSubmitted: false,
    isValid: false,
    queryResults: [],
    querySelected: "",
    locationWarning: Stream(null),
  }

  const resetState = (state) => {
    EventFormState = {
      status: "loading",
      errors: null,
      isSubmitted: false,
      isValid: false,
      queryResults: [],
      querySelected: "",
      locationWarning: Stream(null),
    }
    console.log(EventFormState)
  }

  const validate = (state, data) => {
    const onError = (errors) => {
      state.errors = errors
      state.isValid = false
      // console.log("v err", state, errors)
    }

    const onSuccess = (data) => {
      // console.log("v succ", data)
      state.errors = null
      state.isValid = true
    }

    validateTask(data).fork(onError, onSuccess)
  }

  const addNewEvent = ({ mdl, data, state }) => {
    const onError = (errors) => {
      state.errors = errors
      state.status = "failed"
    }

    const onSuccess = () => {
      mdl.Invites.fetch(true)
      mdl.State.modal(false)
    }

    state.isSubmitted = true
    validateTask(data)
      .chain(submitEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(EventForm, {
        mdl,
        data: EventFormData,
        state: EventFormState,
        validate,
        resetState,
        submit: addNewEvent,
      }),
  }
}

});

;require.register("Components/editor/event-form.js", function(exports, require, module) {
import { HTTP, locateQueryTask } from "Http"

const locateQuery = (mdl) => (state) => (query) => {
  const onError = (err) => {
    console.log("err q", err)
    state.locationWarning(
      "Exact address not found. You may continue with this address or try again"
    )
    state.status = "failure"
  }

  const onSuccess = (data) => {
    state.queryResults = data
    state.status = "success"
    state.locationWarning(null)

    console.log("succ d", state)
  }

  locateQueryTask(HTTP)(mdl)(query).fork(onError, onSuccess)
}

export const EventForm = () => {
  const setAllDay = (data) => {
    data.allDay = !data.allDay
    if (data.allDay) {
      data.startTime = "00:00"
      data.endTime = "23:59"
    } else {
      data.startTime = ""
      data.endTime = ""
    }
  }

  return {
    view: ({ attrs: { data, state, resetState, mdl, validate, submit } }) => {
      return m(
        "form.event-form",
        m(".frow column-centered", [
          m(
            ".full-width",
            m("label.frow row row-evenly gutters", [
              m("input.col-xs-2-3", {
                onchange: (e) =>
                  m.route.set(`/${mdl.User.name}/${e.target.value}`),
                type: "date",
                value: mdl.selectedDate().format("YYYY-MM-DD"),
              }),
              m(
                "label.col-xs-1-3",
                "All Day",
                m("input", {
                  type: "checkbox",
                  checked: data.allDay,
                  onclick: (e) => setAllDay(data),
                })
              ),
            ])
          ),
          m(".full-width", [
            m(".frow row row-evenly gutters", [
              m("label.col-xs-1-2", [
                m("input.", {
                  oninput: (e) => (data.startTime = e.target.value),
                  value: data.startTime,
                  type: "time",
                  disabled: data.allDay,
                  onblur: (e) => state.isSubmitted && validate(state, data),
                }),
                m(".frow row-start", [
                  "Start Time",
                  m("span.required-field", "*"),
                ]),

                state.errors && m("code.error-field", state.errors.startTime),
              ]),
              m("label.col-xs-1-2", [
                m("input", {
                  oninput: (e) => (data.endTime = e.target.value),
                  value: data.endTime,
                  type: "time",
                  disabled: data.allDay,
                  onblur: (e) => state.isSubmitted && validate(state, data),
                }),
                m(".frow row-start", [
                  "End Time",
                  m("span.required-field", "*"),
                ]),

                state.errors && m("code.error-field", state.errors.endTime),
              ]),
            ]),
          ]),
          m(
            ".full-width",
            m(".frow row row-evenly gutters", [
              m(
                "label.col-xs-1-5",

                "In Person",
                m("input", {
                  type: "checkbox",
                  checked: data.inPerson,
                  onclick: (e) => (data.inPerson = !data.inPerson),
                })
              ),

              data.inPerson
                ? m(
                    "label.col-xs-4-5",
                    m("input", {
                      type: "address",
                      value: data.location,
                      oninput: (e) => (data.location = e.target.value),
                      onchange: (e) => locateQuery(mdl)(state)(e.target.value),
                      onblur: (e) => state.isSubmitted && validate(state, data),
                    }),
                    m(".frow row-start", [
                      "Address",
                      m("span.required-field", "*"),
                    ])
                  )
                : m(
                    "label.col-xs-4-5",
                    m("input", {
                      type: "url",
                      value: data.url,
                      oninput: (e) => (data.location = e.target.value),
                      onblur: (e) => state.isSubmitted && validate(state, data),
                    }),
                    m(".frow row-start", [
                      "URL link",
                      m("span.required-field", "*"),
                    ])
                  ),
              state.locationWarning() &&
                m("p.location-info-text", state.locationWarning()),
              state.queryResults.any() &&
                m(
                  "ul.event-form-query-container",
                  state.queryResults.map(({ address, latlong }) =>
                    m(
                      "li",
                      m(
                        "code.form-event-query-result",
                        {
                          onclick: (e) => {
                            data.location = address
                            data.latlong = latlong
                            resetState(state)
                          },
                        },
                        address
                      )
                    )
                  )
                ),
              state.errors && m("code.error-field", state.errors.location),
            ])
          ),

          m(
            "label",
            m("input", {
              type: "text",
              value: data.text,
              oninput: (e) => (data.title = e.target.value),
              onblur: (e) => state.isSubmitted && validate(state, data),
            }),
            m(".frow row-start", ["Title", m("span.required-field", "*")]),

            state.errors && m("code.error-field", state.errors.title)
          ),
          m(
            "label",
            m("input", {
              type: "text",
              value: data.notes,
              oninput: (e) => (data.notes = e.target.value),
              onblur: (e) => state.isSubmitted && validate(state, data),
            }),
            "Notes"
          ),
          m(
            "button.full-width",
            {
              onclick: (e) => {
                e.preventDefault()
                submit({
                  mdl,
                  data,
                  state,
                })
              },
            },
            "Submit"
          ),
        ])
      )
    },
  }
}

});

;require.register("Components/editor/validations.js", function(exports, require, module) {
import { curryN, identity, lensProp, mergeAll } from "ramda"
import { Success } from "data.validation"
import { validate, isRequired, getHour, getMin } from "Utils"

const Validate = Success(curryN(5, identity))

const dateLense = lensProp("shortDate")
const startTimeLense = lensProp("startTime")
const endTimeLense = lensProp("endTime")
const locationLense = lensProp("location")
const latLongLense = lensProp("latlong")
const titleLense = lensProp("title")

const FIELD_REQUIRED_MSG = (field) => `${field} is required`
const INVALID_END_DATE_MSG = "End time must be after Start time"

const isChronological = (startTime) => (endTime) =>
  startTime &&
  endTime &&
  M()
    .hours(getHour(startTime))
    .minutes(getMin(startTime))
    .isBefore(M().hours(getHour(endTime)).minutes(getMin(endTime)))

const validateDate = (data) =>
  Success(data).apLeft(
    validate(isRequired, dateLense, FIELD_REQUIRED_MSG("Date"), data)
  )

const validateStartTime = (data) =>
  Success(data).apLeft(
    validate(isRequired, startTimeLense, FIELD_REQUIRED_MSG("Start Time"), data)
  )

const validateEndTime = (data) =>
  Success(data)
    .apLeft(
      validate(isRequired, endTimeLense, FIELD_REQUIRED_MSG("End Time"), data)
    )
    .apLeft(
      validate(
        isChronological(data.startTime),
        endTimeLense,
        INVALID_END_DATE_MSG,
        data
      )
    )

const validateAddress = (data) =>
  Success(data).apLeft(
    validate(isRequired, locationLense, FIELD_REQUIRED_MSG("Location"), data)
  )

const validateTitle = (data) =>
  Success(data).apLeft(
    validate(isRequired, titleLense, FIELD_REQUIRED_MSG("Title"), data)
  )

export const validateTask = (data) =>
  Validate.ap(validateDate(data))
    .ap(validateStartTime(data))
    .ap(validateEndTime(data))
    .ap(validateAddress(data))
    .ap(validateTitle(data))
    .failureMap(mergeAll)
    .toTask()

});

;require.register("Components/event-toolbar.js", function(exports, require, module) {
import { getHour } from "Utils"

export const EventToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "button",
        {
          onclick: (e) => {
            mdl.State.toAnchor(mdl.Events.currentEventStartTime().format("HH"))
            m.route.set(
              `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
            )
          },
        },
        "Back"
      ),
  }
}

});

;require.register("Components/home-toolbar.js", function(exports, require, module) {
export const HomeToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".toolbar", [
        m("input.cal-toolbar-input", {
          onchange: (e) =>
            m.route.set(
              `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
            ),
          type: "date",
          value: mdl.selectedDate().format("YYYY-MM-DD"),
        }),
        m(
          m.route.Link,
          {
            selector: "button",
            class: "cal-toolbar-input",
            href: `/${mdl.User.name}/${M.utc().format("YYYY-MM-DD")}`,
          },
          "Today"
        ),
        m(
          m.route.Link,
          {
            selector: "button",
            class: "cal-toolbar-input",
            // onclick: (e) => logout,
            href: `/logout`,
          },
          "Logout"
        ),
      ]),
  }
}

});

;require.register("Components/index.js", function(exports, require, module) {
export * from "./home-toolbar.js"
export * from "./event-toolbar.js"
export * from "./calendar/calendar.js"
export * from "./day.js"
export * from "./modal.js"
export * from "./editor/editor.js"
export * from "./invites-list.js"
export * from "./nav-link.js"
export * from "./editor/event-form.js"
export * from "./layout.js"

});

;require.register("Components/invites-list.js", function(exports, require, module) {
import { getInviteStatusColor } from "Utils"

const createEventUrl = (invite) =>
  `${invite.start.format("YYYY-MM-DD")}/${invite.start.format(
    "HH"
  )}/${invite.start.format("mm")}`

const Invite = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl, invite, col } }) => {
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          ".invite-list-item ",
          {
            onclick: (e) => {
              mdl.Events.currentEventId(invite.eventId)
              mdl.Events.currentEventStartTime(invite.start)
              localStorage.setItem("eventId", invite.eventId)
              m.route.set(`/${mdl.User.name}/${createEventUrl(invite)}`)
            },
            style: {
              "background-color": getInviteStatusColor(invite.status),
              top: `${invite.start.format("mm")}px`,
              height: `${invite.end.diff(invite.start, "minutes") * 2}px`,
            },
          },
          invite.title
        )
      )
    },
  }
}

export const InvitesList = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { events } }) =>
      m(
        ".invite-list frow ",
        events.map((invite, idx) =>
          m(Invite, { mdl, invite, col: events.length, key: idx })
        )
      ),
  }
}

});

;require.register("Components/layout.js", function(exports, require, module) {
import { HomeToolbar, EventToolbar } from "Components"

const Header = () => {
  const getRoute = (mdl) => {
    // console.log("route", mdl)
    return mdl.State.route.id
  }
  return {
    view: ({ attrs: { mdl } }) => [
      getRoute(mdl) == "day-planner" && m(HomeToolbar, { mdl }),
      getRoute(mdl) == "event" && m(EventToolbar, { mdl }),
    ],
  }
}

export const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".lt-grid-container", [
        m(".lt-header", m(Header, { mdl })),
        m(".lt-body", children),
        m(".lt-footer", "FOOTER"),
      ]),
  }
}

});

;require.register("Components/modal.js", function(exports, require, module) {
export const Modal = () => {
  return {
    view: ({ children }) => {
      return m(
        ".modal",
        m(
          ".modal-container",
          children.map((child) =>
            m(".modal.full-width", [
              m(".modal-header", child.header),
              m(".modal-body", child.body),
              m(".modal-footer", child.footer),
            ])
          )
        )
      )
    },
  }
}

});

;require.register("Components/nav-link.js", function(exports, require, module) {
const handlers = (types, fn) =>
  types.reduce((acc, type) => Object.assign(acc, { [type]: fn }), {})

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList, ...rest } }) =>
      m(
        m.route.Link,
        {
          ...handlers(["onclick", "onmouseover", "onmouseout"], (e) =>
            console.log(e.type)
          ),
          href,
          class: `nav-link ${classList} ${
            mdl.state.navSelected() == link && "shadow"
          }`,
          ...rest,
        },
        link
      ),
  }
}

});

;require.register("Http/auth-tasks.js", function(exports, require, module) {
const setUserToken = (mdl) => (user) => {
  sessionStorage.setItem("shindigit-user", JSON.stringify(user))
  sessionStorage.setItem("shindigit-user-token", user["user-token"])
  mdl.State.isAuth(true)
  mdl.User = user
  return user
}

export const loginTask = (http) => (mdl) => ({ email, password }) =>
  http.backEnd
    .postTask(mdl)("users/login")({
      login: email,
      password: password,
    })
    .map(setUserToken(mdl))

export const registerTask = (http) => (mdl) => ({
  name,
  email,
  password,
  isAdmin,
}) =>
  http.backEnd.postTask(mdl)("users/register")({
    name,
    email,
    password,
    isAdmin,
  })

});

;require.register("Http/events-tasks.js", function(exports, require, module) {
import Task from "data.task"
import { getInvitesTask } from "./invites-tasks"
import { compose, filter, head, propEq } from "ramda"
import { getHour, getMin } from "Utils"

const toEventviewModel = ({
  start,
  end,
  title,
  notes,
  allDay,
  location,
  inPerson,
  latlong,
}) => {
  return {
    date: M.utc(start).format("DD-MM-YYYY"),
    title: title.toUpperCase(),
    start,
    end,
    startTime: M.utc(start).format("HH:mm"),
    endTime: M.utc(end).format("HH:mm"),
    notes,
    allDay,
    location,
    inPerson,
    latlong,
  }
}

export const getEventTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(`data/Events/${mdl.Events.currentEventId()}`)
    .map(toEventviewModel)

export const loadEventAndInviteTask = (http) => (mdl) =>
  Task.of((event) => (invite) => {
    return {
      event,
      invite,
    }
  })
    .ap(getEventTask(http)(mdl))
    .ap(
      getInvitesTask(http)(mdl).map(
        compose(head, filter(propEq("eventId", mdl.Events.currentEventId())))
      )
    )

export const deleteEventTask = (http) => (mdl) => (id) =>
  http.backEnd
    .deleteTask(mdl)(`data/Events/${id}`)
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Invites?where=eventId%3D'${id}'`)
    )

export const submitEventTask = (http) => (mdl) => ({
  allDay,
  startTime,
  endTime,
  title,
  notes,
  inPerson,
  location,
  latlong,
}) => {
  let end = M.utc(mdl.selectedDate())
    .hour(getHour(endTime))
    .minute(getMin(endTime))
  let start = M.utc(mdl.selectedDate())
    .hour(getHour(startTime))
    .minute(getMin(startTime))

  return http.backEnd
    .postTask(mdl)("data/Events")({
      end,
      start,
      notes,
      title,
      allDay,
      inPerson,
      location,
      latlong,
      createdBy: mdl.User.objectId,
    })
    .chain(({ objectId, ownerId, end, start, title }) => {
      let eventId = objectId
      return http.backEnd
        .postTask(mdl)("data/Invites")({
          eventId,
          userId: ownerId,
          status: 1,
          end,
          start,
          title,
          allDay,
          inPerson,
          location,
          latlong,
        })
        .chain(({ objectId }) => {
          let inviteId = objectId
          return Task.of((user) => (event) => ({
            user,
            event,
          }))
            .ap(
              http.backEnd.postTask(mdl)(
                `data/Users/${mdl.User.objectId}/invites%3AInvites%3An`
              )([inviteId])
            )
            .ap(
              http.backEnd.postTask(mdl)(
                `data/Events/${eventId}/invites%3AInvites%3An`
              )([inviteId])
            )
        })
    })
}

});

;require.register("Http/http.js", function(exports, require, module) {
import Task from "data.task"
import { BackEnd, OpenCage } from "../.secrets.js"
const onProgress = (mdl) => (e) => {
  if (e.lengthComputable) {
    mdl.State.loadingProgress.max = e.total
    mdl.State.loadingProgress.value = e.loaded
    m.redraw()
  }
}

function onLoad() {
  return false
}

const onLoadStart = (mdl) => (e) => {
  mdl.State.isLoading(true)
  return false
}

const onLoadEnd = (mdl) => (e) => {
  mdl.State.isLoading(false)
  mdl.State.loadingProgress.max = 0
  mdl.State.loadingProgress.value = 0
  return false
}

const xhrProgress = (mdl) => ({
  config: (xhr) => {
    xhr.onprogress = onProgress(mdl)
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart(mdl)
    xhr.onloadend = onLoadEnd(mdl)
  },
})

export const parseHttpError = (mdl) => (rej) => (e) => {
  mdl.State.isLoading(false)
  console.error(e)
  e.response && e.response.code == 3064 && m.route.set("/logout")
  return rej(e.response)
}

export const parseHttpSuccess = (mdl) => (res) => (data) => {
  mdl.State.isLoading(false)
  return res(data)
}

const HttpTask = (_headers) => (method) => (mdl) => (url) => (body) => {
  mdl.State.isLoading(true)
  return new Task((rej, res) =>
    m
      .request({
        method,
        url,
        headers: {
          "content-type": "application/json",
          ..._headers,
        },
        body,
        withCredentials: false,
        ...xhrProgress(mdl),
      })
      .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
  )
}

const backEndUrl = `${BackEnd.baseUrl}/${BackEnd.APP_ID}/${BackEnd.API_KEY}/`
const OpenCageUrl = `${OpenCage.baseUrl}?key=${OpenCage.key}&q=`

const openCage = {
  getLocationTask: (mdl) => (query) =>
    HttpTask(OpenCage.headers())("GET")(mdl)(OpenCageUrl + query + "&pretty=1")(
      null
    ),
}

const backEnd = {
  getTask: (mdl) => (url) =>
    HttpTask(BackEnd.headers())("GET")(mdl)(backEndUrl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("POST")(mdl)(backEndUrl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("PUT")(mdl)(backEndUrl + url)(dto),
  deleteTask: (mdl) => (url) =>
    HttpTask(BackEnd.headers())("DELETE")(mdl)(backEndUrl + url)(null),
}

export const HTTP = {
  openCage,
  backEnd,
  HttpTask,
}

});

;require.register("Http/index.js", function(exports, require, module) {
export * from "./http.js"
export * from "./invites-tasks.js"
export * from "./events-tasks.js"
export * from "./auth-tasks.js"
export * from "./open-cage.js"

});

;require.register("Http/invites-tasks.js", function(exports, require, module) {
import { map } from "ramda"

export const toInviteViewModel = ({
  start,
  end,
  title,
  objectId,
  eventId,
  status,
  userId,
}) => ({
  start: M.utc(start),
  end: M.utc(end),
  objectId,
  eventId,
  title,
  status,
  userId,
})

const toInviteDto = ({ start, end, title, eventId, status, userId }) => ({
  start,
  end,
  eventId,
  title,
  status,
  userId,
})

export const updateInviteTask = (http) => (mdl) => (invite) =>
  http.backEnd
    .putTask(mdl)(`data/Invites/${invite.objectId}`)(toInviteDto(invite))
    .map(toInviteViewModel)

export const getInvitesTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=userId%3D'${mdl.User.objectId}'`
    )
    .map(map(toInviteViewModel))

});

;require.register("Http/open-cage.js", function(exports, require, module) {
import { paths, map, prop } from "ramda"

const toOpenCageFormat = (q) => q.replace(/\s/g, "+").replace(/,/g, "%2C")

const toLocationViewModel = ([address, ll]) => ({
  address,
  latlong: JSON.stringify(ll),
})

export const locateQueryTask = (http) => (mdl) => (query) =>
  http.openCage
    .getLocationTask(mdl)(toOpenCageFormat(query))
    .map(prop("results"))
    .map(map(paths([["formatted"], ["geometry"]])))
    .map(map(toLocationViewModel))

});

;require.register("Models.js", function(exports, require, module) {
import { getHoursInDay } from "Utils"
import { calendarModel } from "Components/calendar/calendar-model"

const State = {
  isAuth: Stream(false),
  modal: Stream(false),
  isLoading: Stream(false),
  loadingProgress: { max: 0, value: 0 },
  isLoggedIn: () => sessionStorage.getItem("token"),
  timeFormats: ["12hrs", "24hrs"],
  format: Stream(1),
  toAnchor: Stream(false),
  slug: "",
}

export const dayModel = (mdl) =>
  getHoursInDay(mdl.State.timeFormats[mdl.State.format()]).reduce(
    (day, hour) => {
      day[hour] = []
      return day
    },
    {}
  )

export const inviteModel = () => ({
  eventId: "",
  status: "",
  userId: "",
})

const Events = {
  currentEventId: Stream(null),
  currentEventStartTime: Stream(null),
}
const Invites = {
  fetch: Stream(false),
}
const Day = {
  data: dayModel({ State }),
  update: Stream(false),
  listView: Stream(false),
}

const Home = {
  modal: Stream(false),
}

const Settings = { profile: "", inspector: "" }

const Calendar = {
  data: calendarModel({ mdl: Model, invites: [], date: M.utc() }),
}
const User = {}

const Model = {
  // currentShortDate: Stream(""), //REMOVE
  // currentLongDate: Stream(""), //REMOVE
  selectedDate: Stream(""), //KEEP
  todayDate: Stream(M.utc()),
  // selectedDate: { year: "", month: "", day: "" }, //REMOVE
  Calendar,
  Day,
  Events,
  Invites,
  State,
  Settings,
  User,
  Home,
}

export default Model

});

;require.register("Pages/Auth/Validations.js", function(exports, require, module) {
import { curryN, identity, lensProp, mergeAll } from "ramda"
import { Success } from "data.validation"
import { validate, isRequired, emailFormat } from "Utils"

const ValidateRegistration = Success(curryN(3, identity))
const ValidateLogin = Success(curryN(2, identity))

const nameLense = lensProp("name")
const passwordLense = lensProp("password")
const passwordConfirmLense = lensProp("confirmPassword")
const emailLense = lensProp("email")
const emailConfirmLense = lensProp("confirmEmail")

const NAME_REQUIRED_MSG = "A Name is required"
const PASSWORD_REQUIRED_MSG = "A Password is required"
const EMAIL_REQUIRED_MSG = "An Email is required"
const EMAILS_MUST_MATCH = "Emails do not match"
const INVALID_EMAIL_FORMAT = "Email must be a valid format"
const PASSWORDS_MUST_MATCH = "Passwords do not match"

const inputsMatch = (input1) => (input2) => input2 === input1

const validateName = (data) =>
  Success(data).apLeft(validate(isRequired, nameLense, NAME_REQUIRED_MSG, data))

const validateEmails = (data) =>
  Success(data)
    .apLeft(validate(isRequired, emailLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(validate(isRequired, emailConfirmLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(
      validate(
        inputsMatch(data.confirmEmail),
        emailLense,
        EMAILS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(
        inputsMatch(data.email),
        emailConfirmLense,
        EMAILS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(emailFormat, emailConfirmLense, INVALID_EMAIL_FORMAT, data)
    )
    .apLeft(validate(emailFormat, emailLense, INVALID_EMAIL_FORMAT, data))

const validateEmail = (data) =>
  Success(data)
    .apLeft(validate(isRequired, emailLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(validate(emailFormat, emailLense, INVALID_EMAIL_FORMAT, data))

const validatePasswords = (data) =>
  Success(data)
    .apLeft(validate(isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data))
    .apLeft(
      validate(isRequired, passwordConfirmLense, PASSWORD_REQUIRED_MSG, data)
    )
    .apLeft(
      validate(
        inputsMatch(data.password),
        passwordConfirmLense,
        PASSWORDS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(
        inputsMatch(data.confirmPassword),
        passwordLense,
        PASSWORDS_MUST_MATCH,
        data
      )
    )

const validatePassword = (data) =>
  Success(data).apLeft(
    validate(isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data)
  )

export const validateUserRegistrationTask = (data) =>
  ValidateRegistration.ap(validateName(data))
    .ap(validateEmails(data))
    .ap(validatePasswords(data))
    .failureMap(mergeAll)
    .toTask()

export const validateLoginTask = (data) =>
  ValidateLogin.ap(validateEmail(data))
    .ap(validatePassword(data))
    .failureMap(mergeAll)
    .toTask()

});

;require.register("Pages/Auth/login-user.js", function(exports, require, module) {
import { NavLink } from "Components"
import { jsonCopy, shortDate } from "Utils"
import { validateLoginTask } from "./Validations.js"
import { HTTP, loginTask } from "Http"

const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("Issue with logging in. Have you registered?")
      state.showErrorMsg(true)
      console.log("failed - other?", state)
    }
  }

  const onSuccess = (mdl) => (account) => {
    state.errors = {}
    mdl.User.account = account
    m.route.set(`/${mdl.User.name}/${mdl.todayDate().format("YYYY-MM-DD")}`)
  }

  state.isSubmitted = true

  validateLoginTask(data.userModel)
    .chain(loginTask(HTTP)(mdl))
    .fork(onError, onSuccess(mdl))
}

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false,
}

const dataModel = { userModel }

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: jsonCopy(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

export const Login = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow centered-column mt-100",
        [
          state.showErrorMsg() && m("code.warning", state.errorMsg()),
          m(
            "form.frow column-centered",
            {
              role: "form",
              id: "Login-form",
              onsubmit: (e) => e.preventDefault(),
            },
            [
              m("input.auth-input", {
                class: state.isSubmitted
                  ? state.errors.email
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-email",
                type: "email",
                placeholder: "Email",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.email = e.target.value
                },
                value: state.data.userModel.email,
              }),
              state.errors.email && m("p.auth-input-hint", state.errors.email),

              m("input.auth-input", {
                class: state.isSubmitted
                  ? state.errors.password
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-pass",
                type: "password",
                placeholder: "Password",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.password = e.target.value
                },
                value: state.data.userModel.password,
              }),
              state.errors.password &&
                m("p.auth-input-hint", state.errors.password),
            ]
          ),
          state.httpError && m(".toast toast-error", state.httpError),
        ],
        m(
          "a.button.auth-btn.full-width frow",
          {
            // type: "submit",
            form: `login-form`,
            onclick: () => validateForm(mdl)(state.data),
            class: mdl.State.isLoading() && "loading",
          },
          m("p.text-centered", "Login")
        ),
        m(
          m.route.Link,
          {
            href: "/register",
            class: "full-width",
          },
          "Need to  register ?"
        )
      ),
  }
}

export default Login

});

;require.register("Pages/Auth/register-user.js", function(exports, require, module) {
import { jsonCopy } from "Utils"
import { validateUserRegistrationTask } from "./Validations"
import { HTTP, loginTask, registerTask } from "Http"

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
}

const dataModel = { userModel }

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: jsonCopy(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

export const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("There seems to be a problem please contact web support")
      state.showErrorMsg(true)
      console.log("failed - state", state)
    }
  }

  const onSuccess = (mdl) => (data) => {
    state.errors = {}
    sessionStorage.setItem("shindigit-user-token", mdl.User["user-token"])
    sessionStorage.setItem("shindigit-user", JSON.stringify(mdl.User))
    m.route.set(`/${mdl.User.name}/${M.utc().format("YYYY-MM-DD")}`)
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data.userModel)
    .chain(registerTask(HTTP)(mdl))
    .chain((_) =>
      loginTask(HTTP)(mdl)({
        email: data.userModel.email,
        password: data.userModel.password,
      })
    )
    .fork(onError, onSuccess(mdl))
}

const RegisterUser = () => {
  return {
    view: ({ attrs: { data, errors, isSubmitted } }) => [
      m("input.auth-input", {
        class: isSubmitted ? (errors.name ? "has-error" : "has-success") : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: (e) => (data.name = e.target.value),
        value: data.name,
      }),
      errors.name && m("p.auth-input-hint", errors.name),

      m("input.auth-input", {
        class: isSubmitted ? (errors.email ? "has-error" : "has-success") : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: (e) => (data.email = e.target.value),
        value: data.email,
      }),
      errors.email && m("p.auth-input-hint", errors.email),

      m("input.auth-input", {
        id: "confirmEmail",
        class: isSubmitted
          ? errors.confirmEmail
            ? "has-error"
            : "has-success"
          : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: (e) => (data.confirmEmail = e.target.value),
        value: data.confirmEmail,
      }),
      errors.confirmEmail && m("p.auth-input-hint", errors.confirmEmail),

      m("input.auth-input", {
        class: isSubmitted
          ? errors.password
            ? "has-error"
            : "has-success"
          : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: (e) => (data.password = e.target.value),
        value: data.password,
      }),
      errors.password && m("p.auth-input-hint", errors.password),

      m("input.auth-input", {
        class: isSubmitted
          ? errors.confirmPassword
            ? "has-error"
            : "has-success"
          : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: (e) => (data.confirmPassword = e.target.value),
        value: data.confirmPassword,
      }),
      errors.confirmPassword && m("p.auth-input-hint", errors.confirmPassword),
    ],
  }
}

export const Register = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) => [
      m(".frow centered-column mt-100", [
        state.showErrorMsg() && m("code.warning", state.errorMsg()),
        m(
          "form.full-width",
          {
            role: "form",
            id: "Register-form",
            onsubmit: (e) => e.preventDefault(),
          },
          [
            m(RegisterUser, {
              data: state.data.userModel,
              errors: state.errors,
              isSubmitted: state.isSubmitted,
            }),
            m(
              "a.button.auth-btn.full-width",
              {
                form: `register-form`,
                onclick: () => validateForm(mdl)(state.data),
                class: mdl.State.isLoading() && "loading",
              },
              m("p", "Register")
            ),
            m(
              m.route.Link,
              {
                href: "/login",
                class: "full-width",
              },
              "Need to  login ?"
            ),
          ]
        ),
      ]),

      state.httpError && m(".toast toast-error", state.httpError),
    ],
  }
}

export default Register

});

;require.register("Pages/event.js", function(exports, require, module) {
import { jsonCopy, inviteOptions } from "Utils"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventAndInviteTask,
  deleteEventTask,
  updateInviteTask,
} from "Http"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false) },
    rsvp: { show: Stream(false) },
    edit: { show: Stream(false) },
  }

  const data = {
    event: {},
    invite: {},
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = ({ event, invite }) => {
      data.event = event
      data.invite = invite
      state.error = {}
      console.log("loaded event", data, state.info.show())
      state.status = "success"
    }

    loadEventAndInviteTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  const deleteEvent = (mdl) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = () => {
      state.error = {}
      state.status = "success"
      m.route.set(
        `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
      )
    }

    deleteEventTask(HTTP)(mdl)(mdl.Events.currentEventId()).fork(
      onError,
      onSuccess
    )
  }

  const updateInvite = (mdl) => (data) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = () => {
      state.error = {}
      state.status = "success"
    }

    updateInviteTask(HTTP)(mdl)(data).fork(onError, onSuccess)
  }

  const setupMap = ({ dom }) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYm9hemJsYWtlIiwiYSI6ImNqdWJ4OGk4YzBpYXU0ZG5wNDI1OGM0eTIifQ.5UV0HkEGPiKUzFdbgdr5ww"
    let coords = JSON.parse(data.event.latlong)

    const createMarker = () =>
      new mapboxgl.Marker().setLngLat(coords).addTo(map)

    let map = new mapboxgl.Map({
      container: dom,
      center: coords,
      zoom: 15,
      style: "mapbox://styles/mapbox/streets-v11",
    })

    createMarker()
  }

  return {
    oninit: load,
    view: () => {
      return m(".event-page", [
        state.status == "loading" && m(".", "Fetching Event..."),
        state.status == "failed" && m(".code", state.error.message),
        state.status == "success" &&
          m(".event-container", [
            m("h1", data.event.title),
            m(
              "h3",
              `${data.event.date}: ${data.event.startTime} - ${data.event.endTime}`
            ),

            m(".accordian", [
              m(".accordian-item.full-width", [
                m(".accordian-item-title", [
                  m(
                    ".frow",
                    m(".col-xs-1-2", m("h4", "INFO")),
                    m(
                      ".frow row-end col-xs-1-3",
                      m(
                        "button",
                        {
                          onclick: (e) =>
                            state["info"].show(!state["info"].show()),
                        },
                        "<"
                      )
                    )
                  ),
                ]),

                state.info.show() &&
                  m(".accordian-item-body.column", [
                    m("label", "notes", m("p", data.event.notes)),

                    m(".map", {
                      style: { width: "500px", height: "500px" },
                      oncreate: setupMap,
                    }),
                  ]),
              ]),

              m(".accordian-item.full-width", [
                m(".accordian-item-title", [
                  m(
                    ".frow",
                    m(".col-xs-1-2", m("h4", "RSVP")),
                    m(
                      ".frow row-end col-xs-1-3",
                      m(
                        "button",
                        {
                          onclick: (e) =>
                            state["rsvp"].show(!state["rsvp"].show()),
                        },
                        "<"
                      )
                    )
                  ),
                ]),
                state.rsvp.show() &&
                  m(".accordian-item-body.column", [
                    m(
                      "label",
                      m(
                        "select",
                        {
                          oninput: (e) => {
                            data.invite.status = inviteOptions.indexOf(
                              e.target.value
                            )
                            updateInvite(mdl)(data.invite)
                          },
                          value: inviteOptions[data.invite.status],
                        },
                        inviteOptions.map((opt, idx) =>
                          m(
                            "option",
                            {
                              value: opt,
                              key: idx,
                              id: idx,
                            },
                            opt.toUpperCase()
                          )
                        )
                      ),
                      "Status: "
                    ),
                  ]),
              ]),

              m(".accordian-item.full-width", [
                m(".accordian-item-title", [
                  m(
                    ".frow",
                    m(".col-xs-1-2", m("h4", "EDIT EVENT")),
                    m(
                      ".frow row-end col-xs-1-3",
                      m(
                        "button",
                        {
                          onclick: (e) =>
                            state["edit"].show(!state["edit"].show()),
                        },
                        "<"
                      )
                    )
                  ),
                ]),
                state.edit.show() &&
                  m(".accordian-item-body.column", [
                    m("button", { onclick: (e) => deleteEvent(mdl) }, "delete"),
                  ]),
              ]),
            ]),
          ]),
      ])
    },
  }
}

});

;require.register("Pages/home.js", function(exports, require, module) {
import { Calendar, Day, Editor } from "Components"
import { HTTP, getInvitesTask } from "Http"
import { dayModel } from "Models"
import { datesAreSame, log } from "Utils"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.format("HH")}:00`].push(invite)
  return dayViewModel
}

const createDayVM = (mdl) => (invites) =>
  invites.reduce(toDayViewModel, dayModel(mdl, mdl.selectedDate()))

const getSelectedDayInvites = (mdl) => (invites) =>
  invites.filter((i) => datesAreSame(i.start)(mdl.selectedDate())("YYYY-MM-DD"))

export const Home = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    status: "loading",
    invites: null,
    events: null,
  }

  const load = ({ attrs: { mdl } }) => {
    mdl.Home.modal(false)
    const onError = (err) => {
      state.error = err
      state.status = "failed"
    }

    const onSuccess = (invites) => {
      mdl.Invites.fetch(false)
      state.invites = invites
      state.error = null
      state.status = "success"
    }

    getInvitesTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    onupdate: ({ attrs: { mdl } }) =>
      mdl.Invites.fetch() && load({ attrs: { mdl } }),
    view: ({ attrs: { mdl } }) => {
      return m(
        ".frow",
        state.status == "loading" && m("p", "FETCHING EVENTS..."),
        state.status == "failed" && m("p", "FAILED TO FETCH EVENTS"),
        state.status == "success" && [
          m(Calendar, {
            mdl,
            date: mdl.selectedDate(),
            invites: state.invites,
          }),

          m(`.frow-container frow`, [
            m(
              `.col-xs-2-3.${mdl.Home.modal() ? "bg-warn" : "bg-info"}`,
              m(
                `button.max-width`,
                {
                  onclick: (e) => mdl.Home.modal(!mdl.Home.modal()),
                },
                mdl.Home.modal() ? "Cancel" : "Add Event"
              )
            ),
            !mdl.Home.modal() &&
              m(
                `.col-xs-1-3.${mdl.Day.listView() ? "bg-warn" : "bg-info"}`,
                m(
                  `button.max-width`,
                  {
                    onclick: (e) => mdl.Day.listView(!mdl.Day.listView()),
                  },
                  mdl.Day.listView() ? "Hour View" : "List View"
                )
              ),
          ]),
          mdl.Home.modal()
            ? m(Editor, { mdl })
            : m(Day, {
                mdl,
                day: createDayVM(mdl)(
                  getSelectedDayInvites(mdl)(state.invites)
                ),
                invites: getSelectedDayInvites(mdl)(state.invites),
              }),
        ]
      )
    },
  }
}

});

;require.register("Pages/index.js", function(exports, require, module) {
export * from "./home.js"
export * from "./event.js"
export * from "./Auth/login-user"
export * from "./Auth/register-user"

});

;require.register("Routes/authenticated-routes.js", function(exports, require, module) {
import { Layout } from "Components"
import { Home, Event } from "Pages"
import { scrollToAnchor } from "Utils"

const AuthenticatedRoutes = [
  {
    id: "profile",
    name: "Profile",
    // icon: Icons.logo,
    route: "/profile/:name",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {},
    component: (mdl) => m(Home, { mdl }),
  },
  {
    id: "day-planner",
    name: "Day Planner",
    // icon: Icons.logo,
    route: "/:username/:date",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      let date = M.utc(args.date).clone()
      mdl.selectedDate(date)
    },
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl })),
  },
  {
    id: "event",
    name: "Event",
    // icon: Icons.logo,
    route: "/:username/:date/:hour/:min",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      // if (
      //   m.route.param().username == mdl.User.name &&
      //   !mdl.Events.currentEventId()
      // ) {
      //   mdl.Events.currentEventId(localStorage.getItem("eventId"))
      // }
    },
    component: (mdl) => m(Layout, { mdl }, m(Event, { mdl })),
  },
  {
    id: "logout",
    name: "",
    // icon: Icons.users,
    route: "/logout",
    position: [],
    group: ["authenticated", "admin"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      localStorage.clear()
      sessionStorage.clear()
      mdl.state.isAuth(false)
      mdl.user = {}
      m.route.set(m.route.get())
      console.log("loggout", mdl)
    },
    component: (mdl) => m(Home, { mdl }),
  },
]

export default AuthenticatedRoutes

});

;require.register("Routes/index.js", function(exports, require, module) {
import AuthenticatedRoutes from "./authenticated-routes.js"
import MainRoutes from "./main-routes.js"
import { flatten } from "ramda"

const Routes = flatten([MainRoutes, AuthenticatedRoutes])
export default Routes

});

;require.register("Routes/main-routes.js", function(exports, require, module) {
import { Home, Login, Register } from "Pages"

const Routes = [
  {
    id: "shindig-it",
    name: m(".Logo"),
    // icon: Icons.home,
    route: "/splash",
    isNav: true,
    group: ["toolbar"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Home, { mdl }),
  },
  {
    id: "login",
    name: "Account Login",
    // icon: Icons.search,
    route: "/login",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Login, { mdl }),
  },
  {
    id: "register",
    name: "Register Account",
    // icon: Icons.search,
    route: "/register",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Register, { mdl }),
  },
]

export default Routes

});

;require.register("Styles/animations.js", function(exports, require, module) {
export const popIn = [
  {
    transform: "scale(0)",
    opacity: 1,
  },
  {
    transform: "scale(1)",
    opacity: 1,
  },
  {
    transform: "scale(0.8)",
    opacity: 1,
  },
  {
    transform: "scale(1)",
    opacity: 1,
  },
]

export const fadeIn = [
  {
    opacity: 0,
  },
  {
    opacity: 1,
  },
]

export const fadeInUp = [
  {
    opacity: 0,
    transform: "translate3d(0, 40%, 0)",
  },
  {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
]

export const slideInRight = [
  {
    transform: "translate3d(-50%, 0, 0)",
  },
  {
    transform: "translate3d(0, 0, 0)",
    visibility: "visible",
  },
]

export const slideInLeft = [
  {
    transform: "translate3d(80%, 0, 0)",
    visibility: "visible",
  },
  {
    transform: "translate3d(0, 0, 0)",
  },
]

export const slideOutRight = [
  {
    transform: "translate3d(0, 0, 0)",
  },
  {
    visibility: "hidden",
    transform: "translate3d(100%, 0, 0)",
  },
]

export const slideInDown = [
  {
    transform: "translate3d(0, -50%, 0)",
  },
  {
    transform: "translate3d(0, 0, 0)",
    visibility: "visible",
  },
]

});

;require.register("Styles/index.js", function(exports, require, module) {
import { NoOp } from "Utils"
export * from "./animations.js"

const duration = {
  duration: 700,
  easing: "ease-in-out",
  fill: "forwards",
}

function transitionEndPromise(element) {
  const transitionEnded = (e) => {
    // console.log("transitionEnded", element, e)
    if (e.target !== element) return
    element.removeEventListener("transitionend", transitionEnded)
  }
  return new Promise(() =>
    element.addEventListener("transitionend", transitionEnded)
  )
}

export const AnimatePage = (animation) => ({ dom }) => {
  // let origStyles = jsonCopy(dom.style)
  // dom.style.position = "absolute"
  // dom.style.top = -19
  // dom.style.width = "100%"
  Animate(animation)({ dom })
  // Animate(animation)({ dom })
}

export const Animate = (animation, pause = NoOp) => ({ dom }) =>
  setTimeout(
    () =>
      dom.animate(animation, duration).finished.then(transitionEndPromise(dom)),
    pause()
  )

export const AnimateChildren = (animation, pause) => ({ dom }) => {
  let children = [...dom.children]

  children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.style.opacity = 1
      Animate(animation)({ dom: child })
    }, pause())
  })
}

});

;require.register("Utils/index.js", function(exports, require, module) {
export * from "./local-storage.js"
export * from "./validations"
export * from "./time-fns.js"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

export const debounce = (wait) => (func, immediate) => {
  console.log(wait)
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const inviteOptions = ["decline", "accept", "maybe"]

export const getInviteStatusColor = (status) =>
  getComputedStyle(document.body).getPropertyValue(
    `--${inviteOptions[status]}-invite`
  )

const secureImg = (url) =>
  url.match(/(https)./) ? url : url.replace("http", "https")

export const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

export const randomPause = () => Math.random() * 1000
export const Pause = (n) => n * 1000
export const NoOp = () => {}
export const nameFromRoute = (route) => route.split("/")[1].toUpperCase()

export const jsonCopy = (data) => JSON.parse(JSON.stringify(data))

export const isSideBarActive = (mdl) =>
  mdl.settings.profile !== "desktop" && mdl.status.sidebar

export const range = (size) => [...Array(size).keys()]

export const isEqual = (a, b) => JSON.stringify(a) == JSON.stringify(b)

});

;require.register("Utils/local-storage.js", function(exports, require, module) {
import Task from "data.task"

const newTaskFromPromise = (p) => new Task((res, rej) => p.then(res, rej))

export const locals = {
  getTask: (key) =>
    newTaskFromPromise(
      new Promise(
        (_, res) =>
          localStorage.getItem(key)
            ? res(JSON.parse(localStorage.getItem(key)))
            : res(null)
        // hack just for now
      )
    ),
  setTask: (key) => (value) =>
    newTaskFromPromise(
      new Promise((res) => res(localStorage.setItem(key, value)))
    ),
}

});

;require.register("Utils/time-fns.js", function(exports, require, module) {
import { range } from "./index"
import { compose, map, head, sort, pluck } from "ramda"

export const padding = (d) => (d.toString().length == 1 ? pad0Left(d) : d)
export const pad00Min = (num) => `${num}:00`
export const pad0Left = (num) => `0${num}`

export const getHour = (time) => time.split(":")[0]
export const getMin = (time) => time.split(":")[1]

export const getHoursInDay = (format) =>
  range(format == "24hrs" ? 24 : 12)
    .map((n) => (n.toString().length == 1 ? pad0Left(n) : n))
    .map(pad00Min)

export const datesAreSame = (first) => (second) => (format) => {
  let f = M.utc(first).format(format)
  let s = M.utc(second).format(format)

  return M.utc(f).isSame(M.utc(s))
}
export const isToday = (someDate) => {
  const today = new Date()
  const date = new Date(someDate.toString())
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  )
}

export const daysOfTheWeek = [
  "Monday",
  "Teusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export const monthsOfTheYear = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const fromFullDate = (date) => {
  let d = new Date(date)
  return {
    day: padding(d.getDate()),
    month: padding(d.getMonth() + 1),
    year: d.getFullYear(),
    hour: padding(d.getHours()),
    min: padding(d.getMinutes()),
  }
}

export const getFullDate = ({ year, month, day }, startHour, startMin) => {
  console.log(
    "getFullDate",
    new Date(year, month - 1, day, startHour, startMin)
  )
  return new Date(year, month - 1, day, startHour, startMin)
}

export const toHourViewModel = (date) => (mdl, hour) => {
  if (!mdl[date][hour]) {
    mdl[date][hour] = {}
  }
  return mdl
}

export const shortDateString = ({ year, month, day }) =>
  `${year}-${padding(month)}-${padding(day)}`

export const firstInviteHour = compose(
  head,
  sort((a, b) => a - b),
  map((mStart) => mStart && parseInt(mStart.format("HH"))),
  pluck("start")
)

});

;require.register("Utils/validations.js", function(exports, require, module) {
import {
  compose,
  curry,
  isEmpty,
  isNil,
  length,
  gte,
  test,
  not,
  view,
  set,
  contains,
  map,
  toUpper,
} from "ramda"
import { Success, Failure } from "data.validation"
import Maybe from "data.maybe"

export const getOrElse = (val) => (x) => x.getOrElse(val)

export const validate = curry((rule, lens, msg, data) =>
  rule(view(lens, data)) ? Success(data) : Failure([set(lens, msg, {})])
)

export const isRequired = compose(not, isEmpty)

export const IsNotNil = compose(not, isNil)

export const isNotNullOrEmpty = (data) => !isNullOrEmpty(data)

export const isNullOrEmpty = (data) => isNil(data) || isEmpty(data)

export const maxLength = (max) => compose(gte(max), length)

export const maxSize = curry((max, value) => gte(max, value))

export const emailFormat = test(/@/)

export const onlyAlpha = test(/^[a-zA-Z]*$/)

export const onlyAlphaNumeric = test(/^[a-zA-Z0-9]*$/)

export const onlyAlphaNumericUnderscore = test(/^[a-zA-Z0-9_]*$/)

export const onlyAlphaNumericSpace = test(/^[a-zA-Z0-9\s]*$/)

export const onlyAlphaNumericSpaceUnderscore = test(/^[a-zA-Z0-9_\s]*$/)

export const onlyAlphaNumericSpaceSpecial = test(
  /^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+\s]*$/
)

export const phoneFormat = test(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)

export const urlFormat = test(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+]*$/)

export const onlyNumeric = test(/^[0-9]*$/)

export const maxLengthNullable = (max) =>
  compose(getOrElse(false), map(gte(max)), map(length), Maybe.fromNullable)

export const unique = curry((keys, value) => {
  let lookup = Maybe.fromNullable(keys)
  return !contains(
    toUpper(value.toString()),
    map((y) => toUpper(y.toString()), lookup.getOrElse([]))
  )
})

export const inDateRange = curry((start, end, value) => {
  if (value == null || value === "") {
    return true
  }

  return new Date(start) <= new Date(value) && new Date(value) < new Date(end)
})

export const allCaps = (str) => str.toUpperCase() === str

export const isNilOrEmptyOrAtom = (item) =>
  isNil(item) || isEmpty(item) || item === "{$type:atom}"

});

;require.register("index.js", function(exports, require, module) {
import App from "./App.js"
import Model from "Models"
import { FunConfig } from "@boazblake/fun-config"
FunConfig.configure()

const root = document.body
let winW = window.innerWidth

if (module.hot) {
  module.hot.accept()
}

if ('production' == "development") {
  console.log("Looks like we are in development mode!")
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("⚙️ SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("🧟 SW registration failed: ", registrationError)
        })
    })
  }
}

// set display profiles
const getProfile = (w) => {
  if (w < 668) return "phone"
  if (w < 920) return "tablet"
  return "desktop"
}

const checkWidth = (winW) => {
  const w = window.innerWidth
  if (winW !== w) {
    winW = w
    var lastProfile = Model.Settings.profile
    Model.Settings.profile = getProfile(w)
    if (lastProfile != Model.Settings.profile) m.redraw()
  }
  return requestAnimationFrame(checkWidth)
}

Model.Settings.profile = getProfile(winW)

checkWidth(winW)

if (sessionStorage.getItem("shindigit-user")) {
  Model.User = JSON.parse(sessionStorage.getItem("shindigit-user"))
  Model.State.isAuth(true)
} else {
  m.route.set("/logout")
}

m.route(root, "/login", App(Model))

});

;require.register("initialize.js", function(exports, require, module) {
document.addEventListener("DOMContentLoaded", () => {
  require("./index.js")
})

});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");
window.M = require("moment");


});})();require('___globals___');

require('initialize');