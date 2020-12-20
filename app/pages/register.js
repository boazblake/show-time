import http from "../Http.js"
import { registerUserTask, makeToast } from "./fns"
import { FormWrap, Card } from "components"

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
      localStorage.setItem("user", JSON.stringify(mdl.user))
      m.route.set("/home")
    }

    registerUserTask(http)(data).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m(Card, {
        header: m(
          "ion-card-title",
          { color: "warning" },
          m("h3.ion-text-center", "Create An Account")
        ),
        content: m(
          FormWrap,
          { state },
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
          )
        ),
        footer: [
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
          ),
        ],
      }),
  }
}
