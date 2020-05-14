import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log("privateroute is logged: " + isLogin())
    
    return (      
        // Mostrar la pagina solo si el usuario esta logged in
        // Sino, redirect a /login page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;