export type Weather = "sunny" | "rainy" | "cloudy" | "stormy";
export type Visibility = "great" | "good" | "ok" | "poor";

export interface ProjectEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

