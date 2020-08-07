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
