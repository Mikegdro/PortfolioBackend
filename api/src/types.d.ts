export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'

export interface ProjectEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

export type NonSensitiveProjectEntry = Omit<ProjectEntry, 'comment'>

export type NewProjectEntry = Omit<ProjectEntry, 'id'>