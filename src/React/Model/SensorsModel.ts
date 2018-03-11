export type SensorsList = Array<SensorInfoWithPollutionLevel>;
export type SensorMeasurementsResponse = {
    currentMeasurements?: AllMeasurements,
    forecast?: Array<MeasurementsTimeFramed>,
    history?:  Array<MeasurementsTimeFramed>,
};

type SensorInfoWithPollutionLevel = {
    address?: Address,
    id?: number,
    location?: Coordinates,
    name?: string,
    pollutionLevel: number
};

type Address = {
    country?: string,
    locality?: string,
    route?: string,
    streetNumber?: string
};

type Coordinates = {
    latitude: number,
    longitude: number
};
type AllMeasurements = {
    airQualityIndex: number,
    humidity?: number,
    measurementTime?: any,
    pm1?: number,
    pm10?: number,
    pm25?: number,
    pollutionLevel: number,
    pressure?: number,
    temperature?: number,
    windDirection?: number,
    windSpeed?: number
};

type MeasurementsTimeFramed = {
    fromDateTime?: string,
    measurements?: AllMeasurements,
    tillDateTime?: string
};