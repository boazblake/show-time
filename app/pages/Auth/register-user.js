import { jsonCopy } from "Utils"
import { validateUserRegistrationTask } from "./Validations"
import {
  HTTP,
  loginTask,
  registerTask,
  createProfileTask,
  linkProfileTask,
} from "Http"

const userModel = {
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
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

export const validateForm = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.message)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("There seems to be a problem please contact web support")
      state.showErrorMsg(true)
      console.log("failed - state", state)
    }
  }

  const onSuccess = (mdl) => (data) => {
    state.errors = {}
    sessionStorage.setItem("shindigit-user-token", mdl.User["user-token"])
    sessionStorage.setItem("shindigit-user", JSON.stringify(mdl.User))
    m.route.set(`/${mdl.User.name}/${M.utc().format("YYYY-MM-DD")}`)
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data.userModel)
    .chain(registerTask(HTTP)(mdl))
    .chain((_) =>
      loginTask(HTTP)(mdl)({
        email: data.userModel.email,
        password: data.userModel.password,
      })
        .chain((_) => createProfileTask(HTTP)(mdl))
        .chain((profile) => {
          mdl.User.profile = profile
          return linkProfileTask(HTTP)(mdl)
        })
    )
    .fork(onError, onSuccess(mdl))
}

const RegisterUser = () => {
  return {
    view: ({ attrs: { data, errors, isSubmitted } }) => [
      m("input", {
        class: isSubmitted ? (errors.name ? "has-error" : "has-success") : "",
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onkeyup: (e) => (data.name = e.target.value),
        value: data.name,
      }),
      errors.name && m("span.error-field", errors.name),

      m("input", {
        class: isSubmitted ? (errors.email ? "has-error" : "has-success") : "",
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onkeyup: (e) => (data.email = e.target.value),
        value: data.email,
      }),
      errors.email && m("span.error-field", errors.email),

      m("input", {
        id: "confirmEmail",
        class: isSubmitted
          ? errors.confirmEmail
            ? "has-error"
            : "has-success"
          : "",
        type: "email",
        placeholder: "Confirm Email",
        onkeyup: (e) => (data.confirmEmail = e.target.value),
        value: data.confirmEmail,
      }),
      errors.confirmEmail && m("span.error-field", errors.confirmEmail),

      m("input", {
        class: isSubmitted
          ? errors.password
            ? "has-error"
            : "has-success"
          : "",
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onkeyup: (e) => (data.password = e.target.value),
        value: data.password,
      }),
      errors.password && m("span.error-field", errors.password),

      m("input", {
        class: isSubmitted
          ? errors.confirmPassword
            ? "has-error"
            : "has-success"
          : "",
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onkeyup: (e) => (data.confirmPassword = e.target.value),
        value: data.confirmPassword,
      }),
      errors.confirmPassword && m("span.error-field", errors.confirmPassword),
    ],
  }
}

export const Register = () => {
  return {
    onremove: () => resetState(),
    view: ({ attrs: { mdl } }) => [
      m(
        ".register-page.full-width",
        state.showErrorMsg() && m("code.warning", state.errorMsg()),
        m(
          "form.frow-container",
          {
            role: "form",
            id: "Register-form",
            onsubmit: (e) => e.preventDefault(),
          },
          [
            m(RegisterUser, {
              data: state.data.userModel,
              errors: state.errors,
              isSubmitted: state.isSubmitted,
            }),
          ]
        ),
        m(
          m.route.Link,
          {
            selector: "button",
            form: `register-form`,
            onclick: (e) => {
              e.preventDefault()
              validateForm(mdl)(state.data)
            },
            class: mdl.State.isLoading() ? "loading" : "max-width mt-20",
          },
          m("p", "Register")
        ),
        m(
          m.route.Link,
          {
            href: "/login",
            class: "max-width",
          },
          "Need to  login ?"
        )
      ),

      state.httpError && m(".toast toast-error", state.httpError),
    ],
  }
}

export default Register
