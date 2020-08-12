import { HTTP, locateQueryTask } from "Http"
import { hyphenize } from "Utils"

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
            m("label.frow row row-evenly ", [
              m("input.col-xs-2-3 ", {
                onchange: (e) =>
                  m.route.set(
                    `/${hyphenize(mdl.User.name)}/${e.target.value.trim()}`
                  ),
                type: "date",
                value: mdl.selectedDate().format("YYYY-MM-DD"),
              }),
              m(
                "label.pl-30.col-xs-1-3",
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
                  oninput: (e) => (data.startTime = e.target.value.trim()),
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
                  oninput: (e) => (data.endTime = e.target.value.trim()),
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
                      oninput: (e) => (data.location = e.target.value.trim()),
                      onchange: (e) =>
                        locateQuery(mdl)(state)(e.target.value.trim()),
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
                      oninput: (e) => (data.location = e.target.value.trim()),
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
              oninput: (e) => (data.title = e.target.value.trim()),
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
              oninput: (e) => (data.notes = e.target.value.trim()),
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
