import AuthenticatedRoutes from "./authenticated-routes.js"
import MainRoutes from "./main-routes.js"
import { flatten } from "ramda"

const Routes = flatten([MainRoutes, AuthenticatedRoutes])
export default Routes
