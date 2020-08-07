import { paths, map, prop } from "ramda"

const toOpenCageFormat = (q) => q.replace(/\s/g, "+").replace(/,/g, "%2C")

const toLocationViewModel = ([address, ll]) => ({
  address,
  latlong: JSON.stringify(ll),
})

export const locateQueryTask = (http) => (mdl) => (query) =>
  http.openCage
    .getLocationTask(mdl)(toOpenCageFormat(query))
    .map(prop("results"))
    .map(map(paths([["formatted"], ["geometry"]])))
    .map(map(toLocationViewModel))
