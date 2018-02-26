import * as React from 'react';
import { getStationDetails, getCurrentSummary } from './../../Connectors/AirPollution';
import { Link } from 'react-router-dom';

namespace StationDetails {
    export type Props = {
        match: any;
    };
    export type State = {
        detailsData: any;
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
            detailsData: {},
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
            <Link to={`/`}>Powrót</Link>
            {this.state.summaryData !== null ?
                    <div className="StationDetails__summary">
                        <h1>{this.state.summaryData.name}</h1>
                        <h3>ul. <span className="StationDetails__address">{this.state.summaryData.address.route} {this.state.summaryData.address.streetNumber},<br /> {this.state.summaryData.address.locality}</span></h3>
                    </div>
                : ''}
        </div>
    );
}
}