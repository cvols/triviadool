import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import Home from './pages/Home/Home'
import Game from "./pages/Game/Game"
import NotFound from './pages/NotFound/NotFound'

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/game" component={Game} />
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Routes