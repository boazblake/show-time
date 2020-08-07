import { HTTP } from "Http"
import { paths, map, prop } from "ramda"
import { validateTask } from "./validations"

const toOpenCageFormat = (q) => q.replace(/\s/g, "+").replace(/,/g, "%2C")

const toLocationViewModel = ([address, ll]) => ({
  address,
  latlong: JSON.stringify(ll),
})

const locateQueryTask = (http) => (mdl) => (query) =>
  http.openCage
    .getLocationTask(mdl)(query)
    .map(prop("results"))
    .map(map(paths([["formatted"], ["geometry"]])))
    .map(map(toLocationViewModel))

export const EventForm = ({ attrs: { data, state, resetState, mdl } }) => {
  const locateQuery = (mdl) => (query) => {
    const onError = (err) => {
      console.log("err q", err)
      state.status = "failure"
    }

    const onSuccess = (data) => {
      state.queryResults = data
      state.status = "success"
      console.log("succ d", state)
    }

    locateQueryTask(HTTP)(mdl)(toOpenCageFormat(query)).fork(onError, onSuccess)
  }

  const validate = () => {
    const onError = (errors) => {
      state.errors = errors
      state.isValid = false
    }

    const onSuccess = () => {
      state.errors = null
      state.isValid = true
    }

    validateTask(data).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m("form.event-form", [
        m("label", [
          m("input", {
            onchange: (e) => m.route.set(`/${mdl.User.name}/${e.target.value}`),
            type: "date",
            value: mdl.selectedDate().format("YYYY-MM-DD"),
            disabled: data.allDay,
          }),
        ]),
        m(".frow row row-between", [
          m(
            "label.col-xs-1-3",
            "All Day",
            m("input", {
              type: "checkbox",
              checked: data.allDay,
              onclick: (e) => (data.allDay = !data.allDay),
            })
          ),
          [
            m("label.col-xs-1-3", [
              m("input", {
                oninput: (e) => (data.startTime = e.target.value),
                value: data.startTime,
                type: "time",
                disabled: data.allDay,
                blur: (e) => validate(),
              }),
              "Start Time",
              m("span.required-field", "*"),
            ]),
            m("label.col-xs-1-3", [
              m("input", {
                oninput: (e) => (data.endTime = e.target.value),
                value: data.endTime,
                type: "time",
                disabled: data.allDay,
                blur: (e) => validate(),
              }),
              "End Time",
              m("span.required-field", "*"),
            ]),
          ],
        ]),

        m(".frow row row-between", [
          m(
            "label.col-xs-1-5",
            m("span.required-field", "*"),
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
                  onchange: (e) => locateQuery(mdl)(e.target.value),
                  blur: (e) => validate(),
                }),
                "Address - Location"
              )
            : m(
                "label.col-xs-4-5",
                m("input", {
                  type: "url",
                  value: data.url,
                  oninput: (e) => (data.url = e.target.value),
                  blur: (e) => validate(),
                }),
                "Url link - Location"
              ),

          state.status == "success" &&
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
        ]),

        m(
          "label",
          m("input", {
            type: "text",
            value: data.text,
            oninput: (e) => (data.title = e.target.value),
            blur: (e) => validate(),
          }),
          "Title",
          m("span.required-field", "*")
        ),
        m(
          "label",
          m("input", {
            type: "text",
            value: data.notes,
            oninput: (e) => (data.notes = e.target.value),
            blur: (e) => validate(),
          }),
          "Notes"
        ),
      ]),
  }
}
