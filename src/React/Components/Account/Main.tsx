import * as React from 'react';
import SingleStation from './SingleStation';
import { getStationsList, getCoords } from './../../Connectors/AirPollution';

namespace Main {
    export type Props = {

    };
    export type State = {
        stationsList: Array<any>,
        inputValue: string
    };
}

export default class Main extends React.Component<Main.Props, Main.State> {
    constructor(props: any) {
        super(props);
        this.state = {
            stationsList: [],
            inputValue: ''
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getLatLang = this.getLatLang.bind(this);
    }

    handleUpdate(e) {
        // console.log(e.target.value);
        this.setState({
            inputValue: e.target.value
        });
    }
    getLatLang() {
        event.preventDefault();
        getCoords(this.state.inputValue).then(location => {
            const { lat, lng } = (location.results[0].geometry.location);
            getStationsList(lat, lng).then(stations => {
                this.setState({
                    stationsList: stations
                });
            });
        });
    }

    render() {
        return (
            <div className="container">
                <input type="text" placeholder="Lokalizacja" onChange={this.handleUpdate} />
                <button value="wyslij" onClick={this.getLatLang} >Wyślij</button>
                {this.state.stationsList.map((current: any, i: any) => {
                    return <SingleStation key={current.id} id={current.id} name={current.name} address={current.address} airPollutionLevel={current.pollutionLevel} />;
                })}
            </div>
        );
    }
}