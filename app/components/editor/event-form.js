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
                  onclick: (e) => (data.allDay = !data.allDay),
                })
              ),
            ])
          ),
          m(".full-width", [
            m(".frow row row-evenly gutters", [
              m("label.col-xs-1-2", [
                m("input", {
                  oninput: (e) => (data.startTime = e.target.value),
                  value: data.startTime,
                  type: "time",
                  disabled: data.allDay,
                  onblur: (e) => state.isSubmitted && validate(state, data),
                }),
                "Start Time",
                m("span.required-field", "*"),
                state.errors &&
                  m("code.required-field", state.errors.startTime),
              ]),
              m("label.col-xs-1-2", [
                m("input", {
                  oninput: (e) => (data.endTime = e.target.value),
                  value: data.endTime,
                  type: "time",
                  disabled: data.allDay,
                  onblur: (e) => state.isSubmitted && validate(state, data),
                }),
                "End Time",
                m("span.required-field", "*"),
                state.errors && m("code.required-field", state.errors.endTime),
              ]),
            ]),
          ]),
          m(
            ".full-width",
            m(".frow row row-evenly gutters", [
              m(
                "label.col-xs-1-5",
                m("span.required-field", "*"),
                state.errors && m("code.required-field", state.errors.location),
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
                    "Address - Location"
                  )
                : m(
                    "label.col-xs-4-5",
                    m("input", {
                      type: "url",
                      value: data.url,
                      oninput: (e) => (data.url = e.target.value),
                      onblur: (e) => state.isSubmitted && validate(state, data),
                    }),
                    "Url link - Location"
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
            "Title",
            m("span.required-field", "*"),
            state.errors && m("code.required-field", state.errors.title)
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
              onclick: (e) =>
                submit({
                  mdl,
                  data,
                  state,
                }),
            },
            "Submit"
          ),
        ])
      )
    },
  }
}
