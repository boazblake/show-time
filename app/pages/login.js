import http from "../Http.js"
import { loginUserTask, makeToast } from "./fns"
import { FormWrap, Card } from "components"

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
      localStorage.setItem("user", JSON.stringify(mdl.user))
      console.log(mdl)
      m.route.set("/home")
    }

    loginUserTask(http)(data).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m(Card, {
        header: m(
          "ion-card-title",
          { color: "primary" },
          m("h3.ion-text-center", "Login to your account!")
        ),
        content: m(
          FormWrap,
          { state },
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
          )
        ),
        footer: [
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
            m("ion-text", { color: "warning" }, "Need to Register?")
          ),
        ],
      }),
  }
}
