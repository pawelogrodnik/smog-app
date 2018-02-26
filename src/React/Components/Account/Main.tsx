import * as React from 'react';
import SingleStation from './SingleStation';
import { getStationsList, getCoords } from './../../Connectors/AirPollution';

namespace Main {
    export type Props = {

    };
    export type State = {
        stationsList: Array<any>,
        inputValue: string,
        displayError: boolean;
    };
}

export default class Main extends React.Component<Main.Props, Main.State> {
    private initialLoad: boolean = true;
    constructor(props: any) {
        super(props);
        this.state = {
            stationsList: [],
            inputValue: '',
            displayError: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getLatLang = this.getLatLang.bind(this);
    }

    handleUpdate(e) {
        this.setState({
            inputValue: e.target.value
        });
    }
    getLatLang(event) {
        event.preventDefault();
        if (this.state.inputValue.length > 0){
            getCoords(this.state.inputValue).then(location => {
                const { lat, lng } = (location.results[0].geometry.location);
                getStationsList(lat, lng).then(stations => {
                    this.setState({
                        stationsList: stations
                    });
                });
            });
        } else {
            console.log('zbyt krotki input');
            this.setState({
                displayError: true
            });
        }
       
    }
    componentDidMount() {
        getCoords('Krakow').then(location => {
            const { lat, lng } = (location.results[0].geometry.location);
            getStationsList(lat, lng).then(stations => {
                this.setState({
                    stationsList: stations
                });
            });
        });
        this.initialLoad = false;
    }

    render() {
        return (
            <div className="container container--big">
                <form onSubmit={this.getLatLang}>
                    <div className="input-field">
                        <label htmlFor="location">Podaj swoją lokalizację</label>
                        <input id="location" type="text" placeholder="Lokalizacja" onChange={this.handleUpdate}/>
                    </div>
                    <div className="input-field">
                        <input type="submit" value="Wyślij" />
                    </div>
                </form>
                <div className="stations__wrapper">
                    {this.state.stationsList.map((current: any, i: any) => {
                        return <SingleStation key={current.id} id={current.id} name={current.name} address={current.address} airPollutionLevel={current.pollutionLevel} />;
                    })}
                    {(this.state.stationsList === null && this.initialLoad !== true) || (this.state.stationsList.length === 0 && this.initialLoad !== true) ? <h3>Brak wyników, podaj inną lokalizację.</h3> : ''}                    
                </div>
            </div>
        );
    }
}