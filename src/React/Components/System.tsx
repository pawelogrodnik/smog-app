import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import * as React from 'react';
import Main from './Account/Main';
import StationDetails from './Account/StationDetails';

export default class System extends React.Component<any>  {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={'/'} component={Main} />
                    <Route exact path={'/:id'} component={StationDetails} />
                </Switch>
            </Router>
        );
    }
}