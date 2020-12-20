import http from "../Http.js"
import { loginUserTask, updateState, makeToast } from "./fns"

export const Login = ({ attrs: { mdl } }) => {
  const state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    errors: "",
  }

  const loginUser = (data) => {
    const onError = (error) => {
      state.errors = JSON.parse(JSON.stringify(error))
      mdl.state.isAuth(false)
      makeToast({ mdl, msg: state.errors.response.message, status: false })
    }

    const onSuccess = (data) => {
      state.errors = ""
      mdl.state.isAuth(true)
      mdl.user.data = data
      console.log(mdl)
      m.route.set("/home")
    }

    loginUserTask(http)(data).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m(
        ".page",
        m(
          "ion-card",
          m(
            "ion-card-header",
            m("ion-card-title", m("h3", "Login to your account!"))
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
                          name: "email",
                          type: "email",
                          placeholder: "your@email.com",
                          ngmodel: "",
                          required: "required",
                        })
                      ),
                      m(
                        "ion-item",
                        m("ion-input", {
                          name: "password",
                          type: "password",
                          placeholder: "Password",
                          ngmodel: "",
                          required: "required",
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
                          onclick: (e) => loginUser(state),
                        },
                        "Login"
                      ),
                      m(
                        m.route.Link,
                        {
                          href: "/register",
                        },
                        "Need to Register?"
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
