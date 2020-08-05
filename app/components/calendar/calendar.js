import { createCalendar, calendarDayStyle } from "./calendar-model"
import { daysOfTheWeek } from "Utils"

// import { HTTP, logoutTask } from "Http"

// const load = ({ attrs: { mdl } }) => {
//   const onError = (err) => {
//     state.error = err
//     state.status = "failed"
//   }

//   const onSuccess = (invites) => {
//     mdl.Invites.fetch(false)
//     state.invites = invites
//     state.error = null
//     state.status = "success"
//   }
//   logoutTask(HTTP)(mdl).fork(onError, onSuccess)
// }

const Toolbar = () => {
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
            class: "cal-day-container",
            href: `/${mdl.User.name}/${day.format("YYYY-MM-DD")}`,
          },
          m(`.${calendarDayStyle(mdl.selectedDate(), day, dir)}`, [
            m("span.cal-day", day.format("D")),
            m(
              ".cal-invites-container",
              invites.any() && m(".cal-invites-item", invites.length)
              // invites.map((i) => {
              //     style: {
              //       "background-color": getInviteStatusColor(i.status),
              //     },
              //   })
              // })
            ),
          ])
        )
      ),
  }
}

const CalendarBody = () => {
  return {
    view: ({ attrs: { mdl, date, invites } }) => {
      let matrix = createCalendar(invites, date)
      return m(".frow frow-container", [
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
    },
  }
}

export const Calendar = () => {
  return {
    view: ({ attrs: { mdl, date, invites } }) => {
      return m(".calendar", [
        m(Toolbar, { mdl, calendar: mdl.Calendar.data }),
        m(CalendarBody, { mdl, date, invites }),
      ])
    },
  }
}
