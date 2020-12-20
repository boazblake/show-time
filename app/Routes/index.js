import AuthRoutes from "./auth-routes.js"
import MainRoutes from "./main-routes.js"
import { flatten } from "ramda"

const Routes = flatten([MainRoutes, AuthRoutes])
export default Routes
