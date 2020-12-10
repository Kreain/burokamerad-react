// import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
// import UserHome from './Components/UserHome'

export default function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </Switch>  
        </div>
    )
}
