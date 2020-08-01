import { getMonthMatrix, goToDate, calendarDay, getMonthByIdx } from "./model"
import { daysOfTheWeek, shortDate, formatDateString } from "Utils"

const Toolbar = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".toolbar", [
        m("input", {
          onchange: (e) => m.route.set(e.target.value),
          type: "date",
          value: mdl.data.startDate,
        }),
        m(
          "button.width-100",
          { onclick: (_) => m.route.set(shortDate(new Date())) },
          "Today"
        ),
      ]),
  }
}

const MonthsToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".frow width-100  mt-10", [
        m(".frow width-100 row-between mt-10", [
          m(
            "button.prevMonth",
            m(
              "h3",
              {
                onclick: (_) => {
                  m.route.set(
                    `/${formatDateString({
                      year: parseInt(mdl.data.selected.year) - 1,
                      month: mdl.data.selected.month,
                      day: mdl.data.selected.day,
                    })}`
                  )
                },
              },
              parseInt(mdl.data.selected.year) - 1
            )
          ),
          m(".centerMonthGroup", [
            m(
              "h2.currentMonth",
              getMonthByIdx(parseInt(mdl.data.selected.month) - 1)
            ),
            m("h3.text-center", parseInt(mdl.data.selected.year)),
          ]),
          m(
            "button.nextMonth",
            m(
              "h3",
              {
                onclick: (_) => {
                  m.route.set(
                    `/${formatDateString({
                      year: parseInt(mdl.data.selected.year) + 1,
                      month: mdl.data.selected.month,
                      day: mdl.data.selected.day,
                    })}`
                  )
                },
              },
              parseInt(mdl.data.selected.year) + 1
            )
          ),
        ]),
        m(".frow width-100 row-between mt-10", [
          m(
            "button",
            {
              onclick: (_) => {
                goToDate({
                  year: mdl.data.selected.year,
                  month: mdl.data.selected.month,
                  day: mdl.data.selected.day,
                  dir: -1,
                })
              },
            },
            m("h4", getMonthByIdx(parseInt(mdl.data.selected.month - 2)))
          ),

          m(
            "button",
            {
              onclick: (_) => {
                goToDate({
                  year: mdl.data.selected.year,
                  month: mdl.data.selected.month,
                  day: mdl.data.selected.day,
                  dir: 1,
                })
              },
            },
            m("h4", getMonthByIdx(parseInt(mdl.data.selected.month)))
          ),
        ]),
      ])
    },
  }
}

const CalendarBody = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let dto = getMonthMatrix(mdl.data)
      return m(".frow frow-container", [
        m(MonthsToolbar, { mdl }),
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
              { class: "" },
              week.map(({ day, dir }) =>
                m(
                  ".col-xs-1-7 text-center",
                  {
                    onclick: (_) =>
                      m.route.set(
                        `/${formatDateString({
                          year: mdl.data.selected.year,
                          month: mdl.data.selected.month,
                          day: day,
                          dir,
                        })}`
                      ),

                    class: calendarDay(mdl.data)(day, dir),
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
        m(Toolbar, { mdl: mdl.Calendar }),
        m(CalendarBody, { mdl: mdl.Calendar }),
      ])
    },
  }
}
