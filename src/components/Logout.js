import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { logout } from '../utils/auth';
import Button from 'react-bootstrap/Button'

function Logout(props)
{
    const history = useHistory();
    let _handleClick = () => {
        logout();
        props.handleLogoutSubmit();
        history.push("/login");
    }

    return(
        <div>
        <h3>
        Salir:
         <br /> 
       </h3> 
        <Button type="submit" onClick={_handleClick}>Salir</Button>
        </div>
    )
}

export default Logout
