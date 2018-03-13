import * as SensorsModel from './../Model/SensorsModel';

const baseURL = 'https://airapi.airly.eu/v1/';
// const headers = new Headers({
//     'apikey': '6511f9d399474d3e9ffd5a48a93b0584'
// });
const headers = new Headers({
    'apikey': '271f860c4bbe453cb57f512715e641e1'
});

const GAPI: string = 'AIzaSyDYLJlS_E4u-hElcJHtahZNhncyYwsEc7E';
const gMapsURLBaseUrl = 'https://maps.google.com/maps/api/geocode/json?address=';
    
export function getStationsList(lat: number, lon: number): Promise<SensorsModel.SensorsList> {
    return fetch(`${baseURL}/sensors/current?southwestLat=${lat-0.05}&southwestLong=${lon-0.05}&northeastLat=${lat + 0.05}&northeastLong=${lon + 0.05}`, {
        headers: headers
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}
export function getStationDetails(stationID: number): Promise<SensorsModel.SensorMeasurementsResponse> {
    return fetch(`${baseURL}/sensor/measurements?sensorId=${stationID}`, {
        headers: headers
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}

export function getCurrentSummary(stationID: number): Promise<any> {
    return fetch(`${baseURL}/sensors/${stationID}`, {
        headers: headers
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}

export function getCoords(loc: string): Promise<any> {
    return fetch(`${gMapsURLBaseUrl}${encodeURI(loc)}&key=${GAPI}`).then(response => response.json()).catch(err => console.log(err));
}