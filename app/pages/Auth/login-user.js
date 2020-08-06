import { NavLink } from "Components"
import { jsonCopy, shortDate } from "Utils"
import { validateLoginTask } from "./Validations.js"
import { HTTP, loginTask } from "Http"

const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("Issue with logging in. Have you registered?")
      state.showErrorMsg(true)
      console.log("failed - other?", state)
    }
  }

  const onSuccess = (mdl) => (account) => {
    state.errors = {}
    mdl.User.account = account
    m.route.set(`/${mdl.User.name}/${mdl.todayDate().format("YYYY-MM-DD")}`)
  }

  state.isSubmitted = true

  validateLoginTask(data.userModel)
    .chain(loginTask(HTTP)(mdl))
    .fork(onError, onSuccess(mdl))
}

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  isAdmin: false,
}

const dataModel = { userModel }

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  data: jsonCopy(dataModel),
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  state.data = jsonCopy(dataModel)
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

export const Login = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow centered pt-30",
        [
          state.showErrorMsg() && m("code.warning", state.errorMsg()),
          m(
            "form.frow-container frow-center",
            {
              role: "form",
              id: "Login-form",
              onsubmit: (e) => e.preventDefault(),
            },
            [
              m("input.auth-input", {
                class: state.isSubmitted
                  ? state.errors.email
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-email",
                type: "email",
                placeholder: "Email",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.email = e.target.value
                },
                value: state.data.userModel.email,
              }),
              state.errors.email && m("p.auth-input-hint", state.errors.email),

              m("input.auth-input", {
                class: state.isSubmitted
                  ? state.errors.password
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-pass",
                type: "password",
                placeholder: "Password",
                onkeyup: (e) => {
                  // state.isSubmitted && validateForm(mdl)(state.data)
                  state.data.userModel.password = e.target.value
                },
                value: state.data.userModel.password,
              }),
              state.errors.password &&
                m("p.auth-input-hint", state.errors.password),
            ]
          ),
          state.httpError && m(".toast toast-error", state.httpError),
        ],
        m(
          "a.button.auth-btn",
          {
            // type: "submit",
            form: `login-form`,
            onclick: () => validateForm(mdl)(state.data),
            class: mdl.State.isLoading() && "loading",
          },
          "Login"
        ),
        m(
          m.route.Link,
          {
            href: "/register",
            class: "bold",
          },
          "Need to  register ?"
        )
      ),
  }
}

export default Login
