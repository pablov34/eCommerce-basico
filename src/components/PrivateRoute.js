import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NetContext from '../context/NetContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    
    return ( 
        <NetContext.Consumer>
            {     
            context => (   
            
            // Mostrar la pagina solo si el usuario esta logged in
            // Sino, redirect a /login page
            <Route {...rest} render={props => (
                context.login ?
                    <Component {...props} />
                : <Redirect to="/login" />
            )} />          
        )}
        </NetContext.Consumer>
    )
}

export default PrivateRoute;