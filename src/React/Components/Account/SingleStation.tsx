import * as React from 'react';
import {Link} from 'react-router-dom';

namespace SingleStation {
    export type Props = {
        id: number;
        name: string;
        address: Address;
        airPollutionLevel: number
    };
    export type State = {
        detailsActive: boolean,
        detailsData: any;
        regulars: any;
    };

    type Address = {
        country: string,
        locality: string,
        route: string,
        streetNumber: string
    };
}

export default class SingleStation extends React.Component<SingleStation.Props, SingleStation.State> {
    constructor(props: any) {
        super(props);
        this.state = {
            detailsActive: false,
            detailsData: {},
            regulars: {
                pm10: 50,
                pm25: 25
            }
        };
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    private generateAirPollutionClass(airPollutionLevel: number): string {
        if (airPollutionLevel === 0) {
            return 'green';
        } else if (airPollutionLevel === 1) {
            return 'greenDark';
        } else if (airPollutionLevel === 2) {
            return 'yellow';
        } else if (airPollutionLevel === 3) {
            return 'orange';
        } else if (airPollutionLevel === 4) {
            return 'red';
        } else if (airPollutionLevel > 4) {
            return 'more-than-red';
        } else {
            return 'no-data';
        }
    }

    private toggleDetails() {
        this.setState({
            detailsActive: !this.state.detailsActive
        });
       
    }

    render() {
        let classes = 'SingleStation';
        classes += ` ${this.generateAirPollutionClass(this.props.airPollutionLevel)}`;
        return (
           
            <div className={classes}>
      
                <div className="SingleStation__upper">
                    <div className="SingleStation__l">
                        <p>Nazwa stacji: <span className="SingleStation__name">{this.props.name}</span></p>
                        <p>Ulica: <span className="SingleStation__address">{this.props.address.route} {this.props.address.streetNumber}, {this.props.address.locality}</span></p>
                    </div>
                    <div className="SingleStation__r">
                        <p>Poziom zanieczyszczenia powietrza: <span className="SingleStation_airPollutionNum">{this.props.airPollutionLevel}</span></p>
                       <Link to={`/${this.props.id}`} >
                           {/* <button onClick={this.toggleDetails} className="SingleStation__details">Szczegóły stacji</button> */}
                           <button className="SingleStation__details">Szczegóły stacji</button>                           
                       </Link>
                    </div>
                </div>
                {/* {this.state.detailsActive ?
                    <div className="SingleStation__bottom">
                        <div className="SingleStation__title">Szczegóły</div>
                        {this.state.detailsData.currentMeasurements !== undefined && 
                        <div className="SingleStation__details">
                            <p>aktualny stan / dopuszczalna norma </p>
                            <p>pm25: {this.state.detailsData.currentMeasurements.pm25} / {this.state.regulars.pm25} [µg/m3] </p>
                            <p>pm10: {this.state.detailsData.currentMeasurements.pm10} / {this.state.regulars.pm10} [µg/m3]</p>
                            
                        </div>
                        }
                    </div>
                    : ''} */}
            </div>
        );
    }
}