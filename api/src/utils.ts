import { NewProjectEntry, Visibility, Weather } from "./types"

// Validates the received object as an string
const isString = (possibleString: any): boolean => {

    if (typeof possibleString != 'string') {
        return false
    }

    return true
}

// Parses and validates the comment
const parseComment = (object: any): string => {

    if (!isString(object)) {
        throw new Error('Incorrect or missing comment')
    }

    return object
}

// Parses and validates the date as a string
const parseDate = (object: any): string => {

    if (!isString(object)) {
        throw new Error('Inccorrect or missing date')
    }

    return object
}

// Parses and validates the weather as its type
const parseWeather = (object: any): Weather => {

    if (!isString(object)) {

    }
}

// Parses and validates the visibility as its type
const parseVisibility = (object: any): Visibility => {

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