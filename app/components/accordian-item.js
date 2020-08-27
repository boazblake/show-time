import { AddLine, TimesLine } from "@mithril-icons/clarity/cjs"
import { Animate, fadeInDown, shutterInTop, shutterOutTop } from "Styles"
import { log } from "Utils"

export const AccordianItem = () => {
  return {
    view: ({ children, attrs: { state, part, title, pills = [] } }) =>
      m(
        ".accordian-item.full-width",
        {
          id: part,
          oncreate: Animate(shutterInTop),
          onbeforeremove: Animate(shutterOutTop),
        },
        [
          m(
            `.accordian-item-title${state[part].show() ? "-open" : "-closed"}`,
            m(
              ".frow",
              {
                onclick: (e) => {
                  if (state[part].show()) {
                    state.selected(null)
                  } else {
                    state.selected(part)
                  }
                  state[part].show(!state[part].show())
                },
              },
              m(".col-xs-1-3", m("h4", title)),
              m(".col-xs-1-3", pills),
              m(
                ".frow row-end col-xs-1-3",
                m(
                  `.accordian-item-btn`,
                  state[part].show()
                    ? m(TimesLine, {
                        class: "clickable",
                      })
                    : m(AddLine, { class: "clickable" })
                )
              )
            )
          ),
          state[part].show() &&
            m(
              ".accordian-item-body",
              {
                oncreate: Animate(shutterInTop),
                onbeforeremove: Animate(shutterOutTop),
              },
              [children]
            ),
        ]
      ),
  }
}
