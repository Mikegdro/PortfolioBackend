import { NewProjectEntry, Visibility, Weather } from "./types"

// Validates the received object as an string
const isString = (possibleString: any): boolean => {
    return typeof possibleString === 'string'
}

// Validates the received object as a Date
const isDate = (possibleDate: string): boolean => {
    return Boolean(Date.parse(possibleDate))
}

// Validates the received object as a Weather ENUM type
const isWeather = (possibleWeather: any): boolean => {
    return Object.values(Weather).includes(possibleWeather)
}

const isVisibility = (possibleVisibility: any): boolean => {
    return Object.values(Visibility).includes(possibleVisibility)
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

// Parses and validates the weather as its type
const parseWeather = (weatherFromRequest: any): Weather => {

    if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
        throw new Error('Incorrect object type')
    }

    return weatherFromRequest
}

// Parses and validates the visibility as its type
const parseVisibility = (visibilityFromRequest: any): Visibility => {

    if(!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)) {
        throw new Error('Incorrect type')
    }

    return visibilityFromRequest
}

// Parses all the information of a project and creates a new object
const toNewProjectEntry = (object: any): NewProjectEntry => {

    const newEntry: NewProjectEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    }

    return newEntry
}

export default toNewProjectEntry