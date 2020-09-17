import MainRoutes from "./main-routes.js"
import { flatten } from "ramda"

const Routes = flatten([MainRoutes])
export default Routes
