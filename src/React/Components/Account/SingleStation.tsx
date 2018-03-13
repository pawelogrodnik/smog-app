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
// const baseUrl = process.env.PUBLIC_URL;

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
    private getColor(value: any){
        // value from 0 to 1
        const hue=((1-value)*120).toString(10);
        return ["hsl(",hue,",100%,50%)"].join("");
    }

    private toggleDetails() {
        this.setState({
            detailsActive: !this.state.detailsActive
        });
       
    }

    render() {
        let classes = 'SingleStation';
        return (
           
            <div className={classes} style={{boxShadow: `${this.getColor((this.props.airPollutionLevel * 2.2) / 10)} 0px 0px 20px 3px`}}>
                <p>Poziom zanieczyszczenia powietrza: </p>        
                <p><span className="SingleStation_airPollutionNum">{this.props.airPollutionLevel}</span></p>    
                <p><span className="SingleStation__name">{this.props.name}</span></p>
                <p>ul. <span className="SingleStation__address">{this.props.address.route} {this.props.address.streetNumber},<br /> {this.props.address.locality}</span></p>
                <Link to={`/${this.props.id}`} >
                    <button className="SingleStation__details">Szczegóły</button> 
                </Link>                          
            </div>
        );
    }
}