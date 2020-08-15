import { curryN, identity, lensProp, mergeAll, pluck, max } from "ramda"
import { Success } from "data.validation"
import { validate, isRequired, maxLength, isUniq } from "Utils"

const ValidateItems = Success(curryN(2, identity))
const ValidateGuests = Success(curryN(2, identity))
const ValidateComments = Success(curryN(1, identity))

const quantityLens = lensProp("quantity")
const nameLense = lensProp("name")
const emailLense = lensProp("email")
const messageLense = lensProp("message")

const NAME_REQUIRED_MSG = "A Name is required"
const NAME_UNIQ_MSG = "This item has been added already"
const QUANTITY_REQUIRED_MSG = "A Quantity is required"
const QUANTITY_MIN_MSG = "Quantity must be greater than 0"
const EMAIL_REQUIRED_MSG = "An Email is required"
const MAX_TEXTAREA_LENGTH = "Message Limit is 250 characters"

const validateComment = (data) =>
  Success(data).apLeft(
    validate(maxLength(250), messageLense, EMAIL_REQUIRED_MSG, data)
  )

const validateItemName = (data) => (items) =>
  Success(data)
    .apLeft(validate(isRequired, nameLense, NAME_REQUIRED_MSG, data))
    .apLeft(
      validate(isUniq(pluck("name", items)), nameLense, NAME_UNIQ_MSG, data)
    )

const validateItemQuantity = (data) =>
  Success(data)
    .apLeft(validate(isRequired, quantityLens, QUANTITY_REQUIRED_MSG, data))
    .apLeft(validate(max(0), quantityLens, QUANTITY_MIN_MSG, data))

export const validateItemTask = (item) => (data) =>
  ValidateItems.ap(validateItemName(item)(data.items))
    .ap(validateItemQuantity(item))
    .failureMap(mergeAll)
    .toTask()

export const validateCommentTask = (data) =>
  ValidateComments.ap(validateComment(data)).failureMap(mergeAll).toTask()
