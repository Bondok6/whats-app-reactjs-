import './App.css';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout'
import { Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/index'
import React, { useEffect } from 'react';
import WhatsApp from './containers/Whatsapp/Whatsapp' 
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";

const App =(props)=> {

  
  useEffect(()=>{
    props.onTry()
  })

  
    let routes = null;
    routes = (
      <Switch >
          <Route component={Auth} path="/auth" />
          <Redirect to="/auth" />
        </Switch>
    )
    if (props.isAuth) {
      routes = (
          <Switch >
            <Route exact component={WhatsApp} path="/" />
            <Route exact component={Logout} path="/logout" />
            <Redirect to="/" />
          </Switch>
      )
    }

    return (
      <>
        <main >
        {routes}
        </main>
        
      </>
    );
  };


const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTry: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));