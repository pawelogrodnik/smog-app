import * as React from 'react';
import SingleStation from './SingleStation';
import { getStationsList, getCoords } from './../../Connectors/AirPollution';
import * as SensorsModel from './../../Model/SensorsModel';
import * as StationRepository from './../../Repository/StationRepository';

namespace Main {
    export type Props = {

    };
    export type State = {
        stationsList:SensorsModel.SensorsList,
        inputValue: string,
        displayError: boolean;
        searchHistory: Array<string>
    };
}

export default class Main extends React.Component<Main.Props, Main.State> {
    private initialLoad: boolean = true;
    private searchHistory: Array<string>;
    private StationRepo = new StationRepository.StationRepository();
    constructor(props: any) {
        super(props);
        this.state = {
            stationsList: undefined,
            inputValue: '',
            displayError: false,
            searchHistory: []
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getLatLang = this.getLatLang.bind(this);
        this.checkStorage = this.checkStorage.bind(this);
        this.initStorage = this.initStorage.bind(this);
        this.sugesstedSearch = this.sugesstedSearch.bind(this);
    }

    handleUpdate(e) {
        this.setState({
            inputValue: e.target.value
        });
    }
    getLatLang(event) {
        event.preventDefault();
        if (this.state.inputValue.length > 0){
            this.checkStorage();
            getCoords(this.state.inputValue).then(location => {
                const { lat, lng } = (location.results[0].geometry.location);
                getStationsList(lat, lng).then(stations => {
                    this.StationRepo.stationList = stations;
                    this.setState({
                        stationsList: stations
                    });
                }).catch( (err) => console.log(err));
            }).catch( (err) => console.log(err));
        } else {
            this.setState({
                displayError: true
            });
        }
    }
    checkStorage() {
        this.searchHistory.indexOf(this.state.inputValue) === -1 ?  this.searchHistory.unshift(this.state.inputValue) : '';
        if (this.searchHistory.length > 5) {
            this.searchHistory.length = 5;
        }
        this.setState({
            searchHistory: this.searchHistory
        });
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
    initStorage() {
        if (localStorage.getItem('searchHistory') !== null) {
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
            this.setState({
                inputValue: this.searchHistory[0],
                searchHistory: this.searchHistory
            },
                        () => this.getLatLang(event));
                        
        } else {
            this.searchHistory = []; 
            this.setState({
                stationsList: this.StationRepo.stationList
            }, () => console.log(this.StationRepo.stationList));
        }
    }
    sugesstedSearch(event) {
        this.setState({
            inputValue: event.target.dataset.query
        },            () =>  this.getLatLang(event));
    }
    componentDidMount() {
        this.initStorage();
        this.initialLoad = false;
    }

    render() {
        return (
            <div className="container container--big">
                <form onSubmit={this.getLatLang}>
                    <div className="input-field">
                        <label htmlFor="location">Podaj swoją lokalizację</label>
                        <input id="location" type="text" value={this.state.inputValue} placeholder="Lokalizacja" onChange={this.handleUpdate}/>
                    </div>
                    <div className="input-field">
                        <input type="submit" value="Wyślij" />
                    </div>
                </form>
                {this.state.searchHistory.length !== 0 && 
                    <div className="suggestions__box">
                        Twoje ostatnie wyszukiwania: {this.state.searchHistory.map( (e: any, i: any) => {
                            return (
                                <span className="btn--query" key={i} onClick={this.sugesstedSearch} data-query={e}>{e}</span>
                            );
                        })}                   
                    </div>
                }
                <div className="stations__wrapper">
                    {this.state.stationsList !== undefined && this.state.stationsList.map((current: any, i: any) => {
                        return <SingleStation key={current.id} id={current.id} name={current.name} address={current.address} airPollutionLevel={current.pollutionLevel} />;
                    })}
                    {this.state.stationsList !== undefined && (this.state.stationsList.length === 0 && this.initialLoad !== true) ? <h3>Brak wyników, podaj inną lokalizację.</h3> : ''}   
                    {(this.state.stationsList === undefined && this.initialLoad !== true) ? <h3>Nie możemy uzyskać danych z serwera, spróbuj ponownie później...</h3> :''}                 
                </div>
            </div>
        );
    }
}