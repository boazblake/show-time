import { log } from "Utils"
import App from "./App.js"
import Model from "Models"
import { Fp } from "Fp"
import { getMyLocationTask } from "Utils"

Fp.configure()

const root = document.body
let winW = window.innerWidth

if (module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV == "development") {
  console.log("Looks like we are in development mode!")
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("⚙️ SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("🧟 SW registration failed: ", registrationError)
        })
    })
  }
}

// set display profiles
const getProfile = (w) => {
  if (w < 668) return "phone"
  if (w < 920) return "tablet"
  return "desktop"
}

const checkWidth = (winW) => {
  const w = window.innerWidth
  if (winW !== w) {
    winW = w
    var lastProfile = Model.Settings.profile
    Model.Settings.profile = getProfile(w)
    if (lastProfile != Model.Settings.profile) m.redraw()
  }
  return requestAnimationFrame(checkWidth)
}

Model.Settings.profile = getProfile(winW)

checkWidth(winW)

if (sessionStorage.getItem("shindigit-user")) {
  Model.User = JSON.parse(sessionStorage.getItem("shindigit-user"))
  Model.State.isAuth(true)
  Model.User.profile && Model.State.is24Hrs(Model.User.profile.is24Hrs)

  getMyLocationTask(Model).fork(log("location err"), log("location"))

  if (localStorage.getItem("shindigit-eventId")) {
    Model.Events.currentEventId(localStorage.getItem("shindigit-eventId"))
    Model.Events.currentEventStart(localStorage.getItem("shindigit-eventStart"))
  }
} else {
  m.route.set("/logout")
}

m.route(root, "/login", App(Model))
