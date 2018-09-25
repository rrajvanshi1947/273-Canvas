import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
// import Delete from './Delete/Delete';
import Create from './Create/Create';
// import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
            <Switch>
                {/*Render Different Component based on Route*/}
                <Route exact = {true} path="/"  component={Login}/>
                 {/* <Route path="/login" component={Login}/>*/}
                <Route path="/create" component={Create}/>
                <Route path="/home" component={Home}/>
                {/*<Route path="/delete" component={Delete}/>*/}
                <Redirect to='/home' />
                </Switch>
            </div>
        )
    }
}
//Export The Main Component
export default Main;