import { AddLine, TimesLine } from "@mithril-icons/clarity/cjs"
import {
  Animate,
  AnimatePage,
  fadeInUp,
  shutterInTop,
  shutterOutTop,
  shutterOutDown,
  shutterOutLeft,
  shutterInLeft,
  shutterInRight,
  shutterOutRight,
} from "Styles"

export const AccordianItem = () => {
  return {
    view: ({ children, attrs: { state, part, title, pills = [] } }) =>
      m(
        ".accordian-item.full-width",
        {
          oncreate: Animate(shutterInTop),
          onbeforeremove: Animate(shutterOutTop),
        },
        [
          m(
            `.accordian-item-title${state[part].show() ? "-open" : "-closed"}`,
            [
              m(
                ".frow",
                {
                  onclick: (e) => state[part].show(!state[part].show()),
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
              ),
            ]
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
