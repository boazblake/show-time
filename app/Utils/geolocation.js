import { props, prop } from "ramda"
import Task from "data.task"
import { log } from "Utils"

const toBoundsUrlString = ({ lat_min, lon_min, lat_max, lon_max }) =>
  encodeURIComponent(`${lon_min},${lat_min},${lon_max},${lat_max}`)

export const getBoundsFromLatLong = (mdl) => ([latitude, longitude]) => {
  let lat_change = mdl.User.profile.searchRadius / 111 || 20 / 111
  let lon_change = Math.abs(Math.cos(latitude * (Math.PI / 180)))
  return toBoundsUrlString({
    lat_min: latitude - lat_change,
    lon_min: longitude - lon_change,
    lat_max: latitude + lat_change,
    lon_max: longitude + lon_change,
  })
}

export const getMyLocationTask = (mdl) =>
  new Task((rej, res) =>
    navigator.permissions
      ? // Permission API is implemented
        navigator.permissions
          .query({
            name: "geolocation",
          })
          .then((permission) =>
            // is geolocation granted?
            permission.state === "granted"
              ? navigator.geolocation.getCurrentPosition((pos) =>
                  res(pos.coords)
                )
              : res(null)
          )
      : // Permission API was not implemented
        res(mdl.Map.defaultBounds)
  )
    // .map(prop("coords"))
    .map(props(["latitude", "longitude"]))
    .map((coords) => {
      mdl.Map.locale(coords)
      return getBoundsFromLatLong(mdl)(coords)
    })
    .map(mdl.Map.bounds)
