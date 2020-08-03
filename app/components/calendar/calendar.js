import { getMonthMatrix, goToDate, calendarDay, getMonthByIdx } from "./model"
import { daysOfTheWeek, shortDate, shortDateString } from "Utils"

const Toolbar = ({ attrs: { mdl, calendar } }) => {
  return {
    view: ({ attrs: { mdl, calendar } }) =>
      m(".toolbar", [
        m("input", {
          onchange: (e) =>
            m.route.set(`/${mdl.user.name}/${mdl.currentShortDate()}`),
          type: "date",
          value: calendar.startDate,
        }),
        m(
          "button.width-100",
          {
            onclick: (_) =>
              m.route.set(`/${mdl.user.name}/${shortDate(new Date())}`),
          },
          "Today"
        ),
      ]),
  }
}

const MonthsToolbar = () => {
  return {
    view: ({ attrs: { mdl, calendar } }) => {
      return m(".frow width-100  mt-10", [
        m(".frow width-100 row-between mt-10", [
          m(
            "button.prevMonth",
            m(
              "h3",
              {
                onclick: (_) => {
                  m.route.set(
                    `/${mdl.user.name}/${shortDateString({
                      year: parseInt(calendar.selected.year) - 1,
                      month: calendar.selected.month,
                      day: calendar.selected.day,
                    })}`
                  )
                },
              },
              parseInt(calendar.selected.year) - 1
            )
          ),
          m(".centerMonthGroup", [
            m(
              "h2.currentMonth",
              getMonthByIdx(parseInt(calendar.selected.month) - 1)
            ),
            m("h3.text-center", parseInt(calendar.selected.year)),
          ]),
          m(
            "button.nextMonth",
            m(
              "h3",
              {
                onclick: (_) => {
                  m.route.set(
                    `/${mdl.user.name}/${shortDateString({
                      year: parseInt(calendar.selected.year) + 1,
                      month: calendar.selected.month,
                      day: calendar.selected.day,
                    })}`
                  )
                },
              },
              parseInt(calendar.selected.year) + 1
            )
          ),
        ]),
        m(".frow width-100 row-between mt-10", [
          m(
            "button",
            {
              onclick: (_) =>
                goToDate(mdl, {
                  year: calendar.selected.year,
                  month: calendar.selected.month,
                  day: calendar.selected.day,
                  dir: -1,
                }),
            },
            m("h4", getMonthByIdx(parseInt(calendar.selected.month - 2)))
          ),

          m(
            "button",
            {
              onclick: (_) =>
                goToDate(mdl, {
                  year: calendar.selected.year,
                  month: calendar.selected.month,
                  day: calendar.selected.day,
                  dir: 1,
                }),
            },
            m("h4", getMonthByIdx(parseInt(calendar.selected.month)))
          ),
        ]),
      ])
    },
  }
}

const CalendarBody = () => {
  return {
    view: ({ attrs: { mdl, calendar } }) => {
      let dto = getMonthMatrix(calendar)
      return m(".frow frow-container", [
        m(MonthsToolbar, { mdl, calendar }),
        m(
          ".frow width-100 row-between mt-10",
          daysOfTheWeek.map((day) =>
            m(
              ".col-xs-1-7 text-center",
              m(
                "span.width-auto",

                day[0].toUpperCase()
              )
            )
          )
        ),
        m(
          ".frow centered-column width-100 row-between mt-10 ",
          dto.map((week) =>
            m(
              ".frow width-100",
              week.map(({ day, dir }) =>
                m(
                  ".col-xs-1-7 text-center",
                  {
                    onclick: (_) =>
                      goToDate(mdl, {
                        year: calendar.selected.year,
                        month: calendar.selected.month,
                        day,
                        dir,
                      }),
                    class: calendarDay(calendar)(day, dir),
                  },
                  m("span.day", day)
                )
              )
            )
          )
        ),
      ])
    },
  }
}

export const Calendar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".calendar", [
        m(Toolbar, { mdl, calendar: mdl.Calendar.data }),
        m(CalendarBody, { mdl, calendar: mdl.Calendar.data }),
      ])
    },
  }
}
