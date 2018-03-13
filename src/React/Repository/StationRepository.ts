import * as SensorsModel from './../Model/SensorsModel';

export class StationRepository {
    private _stationList: SensorsModel.SensorsList;

    get stationList(): SensorsModel.SensorsList {
        return this._stationList;
    }

    set stationList(newName: SensorsModel.SensorsList) {
        this._stationList = newName;
    }
}