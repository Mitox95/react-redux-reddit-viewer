import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Search from './components/search'
import Viewer from './components/viewer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Search} />
        <Route path="r/:sub" component={Viewer} />
        <Route path="r/:sub/:filter" component={Viewer} />
        <Route path="r/:sub/:filter/:search" component={Viewer} />
        <Route path="/search" component={Search} />
    </Route>
)