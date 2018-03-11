import * as React from 'react';
import { getStationDetails, getCurrentSummary } from './../../Connectors/AirPollution';
import { Link } from 'react-router-dom';
import * as SensorsModel from './../../Model/SensorsModel';

namespace StationDetails {
    export type Props = {
        match: any;
    };
    export type State = {
        detailsData: SensorsModel.SensorMeasurementsResponse
        // {
        //     currentMeasurements: {
        //         airQualityIndex: number,
        //         humidity: number
        //         pm1: number,
        //         pm10: number,
        //         pm25: number,
        //         pollutionLevel: number,
        //         pressure: number,
        //         temperature: number
        //     },
        //     forecast: any,
        //     history: any
        // }
        summaryData: {
            address: {
                country: string
                locality: string
                route: string
                streetNumber: string
            },
            id: number,
            location: {
                latitude: any
                longitude: any
            },
            name: string,
            pollutionLevel: number,
            vendor: string
        }
    };
}

export default class StationDetails extends React.Component<StationDetails.Props, StationDetails.State> {
    constructor(props: StationDetails.Props) {
        super(props);
        this.state = {
            detailsData: null,
            summaryData: {
                address: {
                    country: '',
                    locality: '',
                    route: '',
                    streetNumber: '',
                },
                id: 0,
                location: {
                    latitude: 0,
                    longitude: 0,
                },
                name: '',
                pollutionLevel: 0,
                vendor: ''
            }
        };
    }

    private calculateHPA(value: number) {
        return (value / 100).toFixed(0);
    }
    private formatData(value: number) {
        return value.toFixed(0);
    }
    componentDidMount() {
        const currentId = this.props.match.params.id;
        getStationDetails(currentId).then(details => {
            console.log(details);
            this.setState({
                detailsData: details
            });
        });
        getCurrentSummary(currentId).then(summary => {
            this.setState({
                summaryData: summary
            });
        });
    }

    render() {
        return (
            <div className="container container--big StationDetails">
                <Link className="StationDetails__backlink" to={`/`}>Powrót</Link>
                <div className="StationDetails__wrapper">
                    {this.state.summaryData !== null ?
                        <div className="StationDetails__summary">
                            <h1><span className="StationDetails__heading-main">{this.state.summaryData.name}</span></h1>
                            <h3>ul. <span className="StationDetails__address">{this.state.summaryData.address.route} {this.state.summaryData.address.streetNumber},<br /> {this.state.summaryData.address.locality}</span></h3>
                        </div>

                        : ''}
                    {this.state.detailsData.currentMeasurements !== undefined ?
                        <div className="StationDetails__stats">                  
                            <p className="StationDetails__single">
                                <i className="wi wi-humidity" />
                                {this.state.detailsData.currentMeasurements.humidity ? `${this.formatData(this.state.detailsData.currentMeasurements.humidity)}` : 'Brak danych'} 
                            </p>        
                            <p className="StationDetails__single">
                                <i className="wi wi-thermometer" />
                                {this.state.detailsData.currentMeasurements.temperature ? `${this.formatData(this.state.detailsData.currentMeasurements.temperature)} °C` : 'Brak danych'} 
                            </p>
                            <p className="StationDetails__single">
                                <i className="wi wi-barometer" />
                                {this.state.detailsData.currentMeasurements.pressure ? `${this.calculateHPA(this.state.detailsData.currentMeasurements.pressure)} hPa` : 'Brak danych'} 
                            </p>
                            <i className="wi wi-fog" />
                        </div>
                        : ''}
                </div>
                {/* <div className="StationDetails__charts">
                    {MyChart}
                    <div id="main" />
                </div> */}
            </div>
        );
    }
}