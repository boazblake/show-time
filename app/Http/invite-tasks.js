import Task from "data.task"
import { toInviteViewModel } from "Models"
import { map } from "ramda"

export const fetchInvitesTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=userId%3D'${mdl.user.objectId}'`
    )
    .map(map(toInviteViewModel))
