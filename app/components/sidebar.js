import { jsonCopy } from "Utils"
import { HTTP, getItemsByUserIdTask } from "Http"
import { Profile } from "Components"
import { reduce } from "ramda"

export const Sidebar = () => {
  const state = {
    load: {
      error: Stream(null),
      isShowing: Stream(false),
      status: Stream("loading"),
    },
    Home: {
      isShowing: Stream(true),
      status: Stream("loading"),
      data: {
        items: [],
        invites: [],
      },
    },
    Profile: {
      isShowing: Stream(false),
      is24Hrs: Stream(false),
    },
  }

  const toItemViewModel = reduce((acc, { name, quantity }) => {
    const addNew = (n, q) => acc.push({ name: n, quantity: q })

    acc.any()
      ? acc.map((i) => {
          console.log(
            "i",
            i.name.toLowerCase() == name.toLowerCase() ? "same" : name
          )
          i.name.toLowerCase() == name.toLowerCase()
            ? (i.quantity += quantity)
            : addNew(name.toLowerCase(), quantity)
        })
      : addNew(name, quantity)
    return acc
  }, [])

  const showState = (field) => {
    let keys = Object.keys(state)
    return keys.map((k) =>
      k == field ? state[k].isShowing(true) : state[k].isShowing(false)
    )
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (error) => {
      state.load.error(jsonCopy(error))
      state.load.status = "failed"
      console.log("error", error)
    }

    const onSuccess = (items) => {
      state.load.error(null)
      state.load.status("success")
      state.Home.data.items = toItemViewModel(items)
      console.log(items, state.Home.data.items)
    }

    getItemsByUserIdTask(HTTP)(mdl)(mdl.User.objectId).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    // oncreate: (v) => console.log("oncreate", v),
    view: ({ attrs: { mdl } }) => {
      return m(".sidebar-page", [
        m(
          ".sidebar-tab-section",
          m(".frow row ", [
            m(
              "button.sidebar-tab.col-xs-1-3",
              {
                class: state.Home.isShowing() ? "sidebar-tab-selected" : "",
                onclick: (e) => showState(e.target.innerHTML),
              },
              "Home"
            ),
            m(
              "button.sidebar-tab.col-xs-1-3",
              {
                class: state.Profile.isShowing() ? "sidebar-tab-selected" : "",
                onclick: (e) => showState(e.target.innerHTML),
              },
              "Profile"
            ),

            m(
              m.route.Link,
              {
                href: `/logout`,
                selector: "button.sidebar-tab",
                class: "col-xs-1-3",
              },
              "Logout"
            ),
          ])
        ),

        state.Home.isShowing() &&
          m(".sidebar-section", [
            m(".frow column-center", [
              m(".sidebar-article", [
                m("p.sidebar-section-heading", "Items"),
                m(
                  ".ul",
                  state.Home.data.items.map((item) =>
                    m(
                      "li.sidebar-items-list",
                      item.name + " : " + item.quantity
                    )
                  )
                ),
              ]),
            ]),
          ]),
        state.Profile.isShowing() &&
          m(
            ".sidebar-section",
            m(".frow column-center", [
              m(".sidebar-article", m(Profile, { mdl })),
            ])
          ),
      ])
    },
  }
}
