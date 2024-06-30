
// Validates the received object as an string
const isString = (possibleString: any): boolean => {
  return typeof possibleString === 'string'
}

// Validates the received object as a Date
const isDate = (possibleDate: string): boolean => {
  return Boolean(Date.parse(possibleDate))
}


// Parses and validates the comment
const parseComment = (object: any): string => {
  if (!isString(object)) {
    throw new Error('Incorrect or missing comment')
  }

  return object
}

// Parses and validates the date as a string
const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }

  return dateFromRequest
}