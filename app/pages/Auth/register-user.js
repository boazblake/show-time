import { log, hyphenize, getMyLocationTask, setSessionsTask } from "Utils"
import { validateUserRegistrationTask } from "./Validations"
import {
  HTTP,
  loginTask,
  registerTask,
  createProfileTask,
  getUserProfileTask,
} from "Http"

const Data = () => ({
  name: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
})

let data = Data()

const state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const resetState = () => {
  data = Data()
  state.errors = {}
  state.httpError = undefined
  state.isSubmitted = false
  state.showErrorMsg(false)
  state.errorMsg("")
}

const validate = () => {
  const onSuccess = (_) => {
    state.errors = null
  }

  const onError = (error) => {
    state.errors = error
  }

  state.isSubmitted &&
    validateUserRegistrationTask(data).fork(onError, onSuccess)
}

export const registerUser = (mdl) => (data) => {
  const onError = ({ error }) => {
    console.log("hiuh", error)
    if (error) {
      state.errors = JSON.stringify(error)
      state.errorMsg(error)
      console.log("failed - state", state.errors)
    } else {
      state.errorMsg("There seems to be a problem please contact web support")
      console.log("failed - state", JSON.stringify(state))
    }
    state.showErrorMsg(true)
  }

  const onSuccess = (mdl) => (data) => {
    state.errors = null
    console.log(data)
    return m.route.set(
      `/${hyphenize(mdl.User.name)}/${M().format("YYYY-MM-DD")}`
    )
  }

  state.isSubmitted = true
  validateUserRegistrationTask(data)
    .chain(registerTask(HTTP)(mdl))
    .chain(createProfileTask(HTTP)(mdl)(data))
    .chain((_) =>
      loginTask(HTTP)(mdl)({
        email: data.email,
        password: data.password,
      }).chain(() => getUserProfileTask(HTTP)(mdl)(mdl.User.objectId))
    )
    .chain((_) => getMyLocationTask(mdl))
    .chain((_) => setSessionsTask(mdl))
    .fork(onError, onSuccess(mdl))
}

const RegisterUser = () => {
  return {
    view: ({ attrs: { data, errors, isSubmitted } }) => [
      m("input", {
        id: "reg-name",
        type: "text",
        placeholder: "Full Name",
        onchange: (e) => validate(),
        oninput: (e) => (data.name = e.target.value),
        onblur: (e) => (data.name = data.name.trim()),
        value: data.name,
      }),
      state.errors && errors.name && m("span.error-field", errors.name),

      m("input", {
        id: "reg-email",
        type: "email",
        placeholder: "Email",
        onchange: (e) => validate(),
        oninput: (e) => (data.email = e.target.value),
        onblur: (e) => (data.email = data.email.trim()),
        value: data.email,
      }),
      state.errors && errors.email && m("span.error-field", errors.email),

      m("input", {
        id: "confirmEmail",
        type: "email",
        placeholder: "Confirm Email",
        onchange: (e) => validate(),
        oninput: (e) => (data.confirmEmail = e.target.value),
        onblur: (e) => (data.confirmEmail = data.confirmEmail.trim()),
        value: data.confirmEmail,
      }),
      state.errors &&
        errors.confirmEmail &&
        m("span.error-field", errors.confirmEmail),

      m("input", {
        id: "reg-pass",
        type: "password",
        placeholder: "Password",
        onchange: (e) => validate(),
        oninput: (e) => (data.password = e.target.value),
        onblur: (e) => (data.password = data.password.trim()),
        value: data.password,
      }),
      state.errors && errors.password && m("span.error-field", errors.password),

      m("input", {
        id: "pass-confirm",
        type: "password",
        placeholder: "Confirm Password",
        onchange: (e) => validate(),
        oninput: (e) => (data.confirmPassword = e.target.value),
        onblur: (e) => (data.confirmPassword = data.confirmPassword.trim()),
        value: data.confirmPassword,
      }),
      state.errors &&
        errors.confirmPassword &&
        m("span.error-field", errors.confirmPassword),
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
              data,
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
              registerUser(mdl)(data)
            },
            class: "max-width mt-20",
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
