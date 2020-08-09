import { jsonCopy, inviteOptions } from "Utils"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventAndInviteTask,
  deleteEventTask,
  updateInviteTask,
  addItemTask,
} from "Http"
import { AccordianItem } from "Components"
import { AddLine } from "@mithril-icons/clarity/cjs"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false) },
    rsvp: { show: Stream(false) },
    edit: { show: Stream(false) },
    items: { name: "", quantity: 0, show: Stream(false) },
  }

  const data = {
    event: {},
    invite: {},
    items: [],
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = ({ event, invite, items = [] }) => {
      data.event = event
      data.invite = invite
      data.items = items
      state.error = {}
      // console.log("loaded event", data, state.info.show())
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

  const addItem = (mdl) => ({ name, quantity }) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = (item) => {
      console.log("item", item)
      state.error = {}
      state.status = "success"
    }

    addItemTask(HTTP)(mdl)({ name, quantity }).fork(onError, onSuccess)
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
          m(".centered-column", [
            m("h1.", data.event.title),
            m(
              "h3",
              `${data.event.date} | ${data.event.startTime} - ${data.event.endTime}`
            ),

            m(".accordian", [
              m(
                AccordianItem,
                { mdl, state, data, part: "info", title: "Info" },
                [
                  m("label", data.event.notes),

                  m(".map", {
                    style: { width: "250px", height: "250px" },
                    oncreate: setupMap,
                  }),
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "rsvp", title: "RSVP" },
                [
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
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "items", title: "Items" },
                [
                  m(".frow row", [
                    m("input.col-xs-1-2", {
                      placeholder: "name",
                      type: "text",
                    }),
                    m("input.col-xs-1-4", {
                      placeholder: "quantity",
                      type: "number",
                      pattern: "mobile",
                    }),
                    m(
                      "button.col-xs-1-5",
                      { onclick: (e) => addItem(mdl)(state) },
                      m(AddLine)
                    ),
                  ]),

                  data.items.map((i) => i.name),
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "edit", title: "Edit" },
                [m("button", { onclick: (e) => deleteEvent(mdl) }, "delete")]
              ),
            ]),
          ]),
      ])
    },
  }
}
