import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import Home from './pages/Home/Home'
import StartDuel from "./pages/StartDuel"
import PlayNow from "./pages/PlayNow"
import NotFound from './pages/NotFound/NotFound'

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/startDuel" component={StartDuel} />
            <Route path="/playNow" component={PlayNow} />
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Routes