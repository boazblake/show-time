import { getTheme, autoFocus } from "Utils"
import {
  AngleLine,
  RemoveLine,
  MinusCircleLine,
} from "@mithril-icons/clarity/cjs"
import { propEq, pluck } from "ramda"
const isUserItem = (mdl) => (item) => mdl.User.objectId == item.guestId

const getUserFromId = (id) => (guests) =>
  pluck("name", guests.filter(propEq("guestId", id)))

export const EventItems = ({
  attrs: { validate, addItem, updateItem, deleteItem },
}) => {
  return {
    view: ({ attrs: { mdl, data, state } }) =>
      m(".event-items-section", [
        m(".frow row event-input-group", [
          m("input.col-xs-1-2", {
            placeholder: "name",
            value: state.items.name,
            oncreate: autoFocus,
            oninput: (e) => (state.items.name = e.target.value),
            onchange: (e) => (state.items.name = state.items.name.trim()),
            onblur: (e) => validate("items")(state.items),
            type: "text",
          }),
          m("input.col-xs-1-4", {
            placeholder: "quantity",
            value: state.items.quantity,
            oninput: (e) => (state.items.quantity = e.target.value.trim()),
            onblur: (e) => validate("items")(state.items),
            type: "number",
            inputMode: "number",
            pattern: "[0-9]*",
          }),
          m(
            `button.btn-${getTheme(mdl)}.col-xs-1-5.button-none`,
            { onclick: (e) => addItem(mdl) },
            "Add"
          ),
          state.items.error() &&
            m("code.error-field", state.items.error().name),
          state.items.error() &&
            m("code.error-field", state.items.error().quantity),
        ]),

        m(
          ".event-items",
          data.items.map((item) =>
            m(
              ".event-items-item",
              m(".frow items-start", [
                m(
                  ".frow col-xs-2-3",
                  m("h3.frow col-xs-1-1", item.name),
                  m(
                    "label.frow col-xs-1-1",
                    item.guestId
                      ? [
                          m(
                            "span.clickable.frow row-start pt-10",
                            isUserItem(mdl)(item) &&
                              m(MinusCircleLine, {
                                onclick: (e) => {
                                  item.guestId = null
                                  state.items.updateGuest(true)
                                  updateItem(mdl)(item)
                                },
                                class: "smaller",
                              }),
                            getUserFromId(item.guestId)(data.guests)
                          ),
                        ]
                      : m(
                          "i.clickable pt-10",
                          {
                            onclick: (e) => {
                              item.guestId = mdl.User.objectId
                              state.items.updateGuest(true)
                              updateItem(mdl)(item)
                            },
                          },
                          "click to select item"
                        )
                  )
                ),
                m(".col-xs-1-3 frow items-center", [
                  isUserItem(mdl)(item) &&
                    m(
                      ".events-remove-item",
                      m(
                        "span.clickable",
                        m(RemoveLine, {
                          class: "smaller",
                          onclick: (e) => deleteItem(mdl)(item.objectId),
                        })
                      )
                    ),
                  m("h3.col-xs-1-3", item.quantity),
                  m(".col-xs-1-3 ", [
                    isUserItem(mdl)(item) && [
                      m(
                        ".col-xs-1-3",
                        m(
                          "span.clickable",
                          m(AngleLine, {
                            class: "smaller",
                            onclick: (e) => {
                              item.quantity++
                              updateItem(mdl)(item)
                            },
                          })
                        )
                      ),
                      m(
                        ".col-xs-1-3",
                        m(
                          "span.clickable.smaller",
                          m(AngleLine, {
                            class: "decrement",
                            onclick: (e) => {
                              item.quantity > 0 && item.quantity--
                              updateItem(mdl)(item)
                            },
                          })
                        )
                      ),
                    ],
                  ]),
                ]),
              ])
            )
          )
        ),
      ]),
  }
}
