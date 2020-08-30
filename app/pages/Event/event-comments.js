import { getTimeFormat, getTheme, autoFocus } from "Utils"
import { TimesCircleLine } from "@mithril-icons/clarity/cjs"

const scrollToBottom = (dom) => dom.scrollTo(0, dom.scrollHeight, "smooth")

export const EventComments = ({
  attrs: { data, validate, sendMessage, deleteComment, isMember },
}) => {
  let _dom
  return {
    view: ({ attrs: { mdl, data, state } }) =>
      m(
        ".comments-items",
        m(".frow row-start", [
          m(".frow width-100", [
            m(
              ".event-comment-textbox-container",
              isMember &&
                m("form.frow items-end", [
                  m(
                    ".col-xs-4-5",
                    m("textarea.comments-message-container", {
                      row: 20,
                      cols: 50,
                      placeholder: "Say hi...",
                      value: state.comments.message,
                      oncreate: autoFocus,
                      oninput: (e) => (state.comments.message = e.target.value),
                      onchange: (e) =>
                        (state.comments.message = state.comments.message.trim()),
                      onblur: (e) => validate("comments")(state.comments),
                    })
                  ),
                  m(
                    ".col-xs-1-5",
                    m(
                      `button.button-none.comments-message-btn-${getTheme(
                        mdl
                      )}`,
                      { onclick: (e) => sendMessage(mdl) },
                      "Send"
                    )
                  ),
                ])
            ),
            state.comments.error() &&
              m("code.error-field", state.comments.error().name),
            m(
              ".width-100 justify-end",
              m(
                ".events-messages-container ",
                {
                  oncreate: ({ dom }) => {
                    _dom = dom
                    scrollToBottom(dom)
                  },
                  onupdate: () => scrollToBottom(_dom),
                },

                data.comments.any()
                  ? data.comments.map((comment, idx) =>
                      m(
                        ".frow column-center width-100 mb-40",
                        m(
                          `.event-comments-message-container ${
                            mdl.User.objectId == comment.guestId
                              ? "me"
                              : "other"
                          }`,
                          m(".event-comments-message", [
                            m(".speech-bubble", [
                              m(".frow.text-left.pt-10", comment.message),
                              mdl.User.objectId == comment.guestId &&
                                m(TimesCircleLine, {
                                  onclick: (e) =>
                                    deleteComment(mdl)(comment.objectId),
                                  class:
                                    "event-comments-message-remove smaller",
                                }),
                            ]),
                            m(
                              "label.event-comment-name",
                              m(".frow row-between", [
                                m("span", comment.name),
                                m(
                                  "span",
                                  M(comment.created).format(getTimeFormat(mdl))
                                ),
                              ])
                            ),
                          ])
                        )
                      )
                    )
                  : m(
                      ".events-messages-container-empty",
                      "Start a conversation"
                    )
              )
            ),
          ]),
        ])
      ),
  }
}
