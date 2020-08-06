import { log } from "Utils"
import { HTTP } from "Http"
import { compose, map, prop, pick } from "ramda"

const toOpenCageFormat = (q) => q.replace(/\s/g, "+").replace(/,/g, "%2C")
const locateQueryTask = (http) => (mdl) => (query) =>
  http.openCage
    .getLocationTask(mdl)(query)
    .map(prop("results"))
    .map(map(pick(["formatted", "geometry"])))
    .map(log("wtf"))

export const EventForm = ({ attrs: { data, mdl } }) => {
  let state = {
    status: "loading",
    isSubmitted: false,
    queryResults: [],
    querySelected: "",
  }

  const resetState = () => {
    state = {
      status: "loading",
      isSubmitted: false,
      queryResults: [],
      querySelected: "",
    }
  }

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

  return {
    view: () =>
      m("form.event-form", [
        m(
          "label",
          m("input", {
            onchange: (e) => m.route.set(`/${mdl.User.name}/${e.target.value}`),
            type: "date",
            value: mdl.selectedDate().format("YYYY-MM-DD"),
            disabled: data.allDay,
          })
        ),
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
            m(
              "label.col-xs-1-3",
              m("input", {
                oninput: (e) => (data.startTime = e.target.value),
                value: data.startTime,
                type: "time",
                disabled: data.allDay,
              }),
              "Start Time"
            ),
            m(
              "label.col-xs-1-3",
              m("input", {
                oninput: (e) => (data.endTime = e.target.value),
                value: data.endTime,
                type: "time",
                disabled: data.allDay,
              }),
              "End Time"
            ),
          ],
        ]),

        m(".frow row row-between", [
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
                  onchange: (e) => locateQuery(mdl)(e.target.value),
                }),
                "Address - Location"
              )
            : m(
                "label.col-xs-4-5",
                m("input", {
                  type: "url",
                  value: data.url,
                  oninput: (e) => (data.url = e.target.value),
                }),
                "Url link - Location"
              ),

          state.status == "success" &&
            state.queryResults.any() &&
            m(
              "ul.event-form-query-container",
              state.queryResults.map(({ formatted, geometry }) =>
                m(
                  "li",
                  m(
                    "code.form-event-query-result",
                    {
                      onclick: (e) => {
                        data.location = formatted
                        data.latlong = JSON.stringify(geometry)
                        resetState()
                      },
                    },
                    formatted
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
          }),
          "Title"
        ),
        m(
          "label",
          m("input", {
            type: "text",
            value: data.notes,
            oninput: (e) => (data.notes = e.target.value),
          }),
          "Notes"
        ),
      ]),
  }
}
