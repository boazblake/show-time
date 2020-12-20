import http from "../Http.js"
import { registerUserTask, updateState, makeToast } from "./fns"

export const Register = ({ attrs: { mdl } }) => {
  const state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    errors: "",
  }

  const registerUser = (data) => {
    const onError = (error) => {
      state.errors = JSON.parse(JSON.stringify(error))
      mdl.state.isAuth(false)
      makeToast({ mdl, msg: state.errors.response.message, status: false })
    }

    const onSuccess = (data) => {
      state.errors = ""
      mdl.state.isAuth(true)
      mdl.user.data = data
      m.route.set("/home")
    }

    registerUserTask(http)(data).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m(
        ".page",
        m(
          "ion-card",
          m(
            "ion-card-header",
            m("ion-card-title", m("h3", "Create your account!"))
          ),
          m(
            "ion-card-content",
            m(
              "form",
              m(
                "ion-grid",
                m(
                  "ion-row",
                  { color: "primary", "justify-content-center": "" },
                  m(
                    "ion-col",
                    {
                      "align-self-center": "",
                      "size-md": "6",
                      "size-lg": "5",
                      "size-xs": "12",
                    },
                    m(".", updateState(state), [
                      m(
                        "ion-item",
                        m("ion-input", {
                          name: "name",
                          type: "text",
                          placeholder: "Name",
                          required: "required",
                          value: state.name,
                        })
                      ),
                      m(
                        "ion-item",
                        m("ion-input", {
                          name: "email",
                          type: "email",
                          placeholder: "your@email.com",
                          required: "required",
                          value: state.email,
                        })
                      ),
                      m(
                        "ion-item",
                        m("ion-input", {
                          name: "password",
                          type: "password",
                          placeholder: "Password",
                          required: "required",
                          value: state.password,
                        })
                      ),
                      m(
                        "ion-item",
                        m("ion-input", {
                          name: "confirm",
                          type: "password",
                          placeholder: "Confirn Password",
                          required: "required",
                          value: state.cornfim,
                        })
                      ),
                    ]),
                    m(
                      ".",
                      m(
                        "ion-button",
                        {
                          size: "large",
                          expand: "block",
                          onclick: () => registerUser(state),
                        },
                        "Register"
                      ),
                      m(
                        m.route.Link,
                        {
                          href: "/login",
                        },
                        "Need to Login?"
                      )
                    )
                  )
                )
              )
            )
          )
        )
      ),
  }
}
