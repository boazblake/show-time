import Task from "data.task"

const newTaskFromPromise = (p) => new Task((res, rej) => p.then(res, rej))

export const locals = {
  getTask: (key) =>
    newTaskFromPromise(
      new Promise(
        (_, res) =>
          localStorage.getItem(key) ? res(localStorage.getItem(key)) : res([]) // hack just for now
      )
    ),
  setTask: (key) => (value) =>
    newTaskFromPromise(
      new Promise((res) => res(localStorage.setItem(key, value)))
    ),
}
