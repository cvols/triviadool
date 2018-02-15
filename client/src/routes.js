import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import Home from './pages/Home/Home'
import StartDuel from "./pages/StartDuel"
import PracticeDuel from "./pages/PracticeDuel"
import NotFound from './pages/NotFound/NotFound'
import FindDuel from './pages/FindDuel/FindDuel'
import DuelFind from './pages/DuelFind/DuelFind'
import Duel from './pages/Duel/Duel'
import AddCredits from './pages/AddCredits/AddCredits'
import Leaderboard from './pages/Leaderboard/Leaderboard'

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/startDuel" component={StartDuel} />
            <Route path="/practiceDuel" component={PracticeDuel} />
            <Route path="/findDuel" component={FindDuel} />
            <Route path="/duelFind" component={DuelFind} />
            <Route path="/duel" component={Duel} />
            <Route path="/addCredits" component={AddCredits} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Routes