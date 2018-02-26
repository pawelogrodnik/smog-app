import * as React from 'react';
import { getStationDetails } from './../../Connectors/AirPollution';
import {Link} from 'react-router-dom';

namespace StationDetails {
    export type Props = {
        match: any;
    };
    export type State = {
        detailsData: any;
    };

}

export default class StationDetails extends React.Component<StationDetails.Props, StationDetails.State> {
    constructor(props: StationDetails.Props) {
        super(props);
    }

    componentDidMount() {
        const currentId = this.props.match.params.id;
        getStationDetails(currentId).then(details => {
            console.log(details);
            this.setState({
                detailsData: details
            });
        });
    }

    render() {
        return (
            <div>
                <Link to={`/`}>Powrót</Link>
                <h1>NAZWA STACJI</h1>
            </div>
        );
    }
}