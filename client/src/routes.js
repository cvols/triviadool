import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import Home from './pages/Home/Home'
import StartDuel from "./pages/StartDuel"
import PracticeDuel from "./pages/PracticeDuel"
import NotFound from './pages/NotFound/NotFound'
import YourStats from './pages/YourStats/YourStats'
import FindDuel from './pages/FindDuel/FindDuel'
import DuelFind from './pages/DuelFind/DuelFind'
import Duel from './pages/Duel/Duel'
import AddCredits from './pages/AddCredits/AddCredits'

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/startDuel" component={StartDuel} />
            <Route path="/practiceDuel" component={PracticeDuel} />
            <Route path="/FindDuel" component={FindDuel} />
            <Route path="/stats" component={YourStats} />
            <Route path="/duelFind" component={DuelFind} />
            <Route path="/duel" component={Duel} />
            <Route path="/addCredits" component={AddCredits} />
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Routes