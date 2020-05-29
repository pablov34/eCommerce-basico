import React, {useEffect, useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NetContext from '../context/NetContext';

function Menu(props)
{ 
  useEffect(()=>{
    console.log('MENU componentDidMount - hook equivalente');
}, []
);
 
useEffect(()=>{
  console.log('MENU componentDidUpdate - hook equivalente');
}, [props.isautenticado]); 

return(
  <NetContext.Consumer>
    {context => (
      <Navbar collapseOnSelect bg="light" expand="lg" style={{marginBottom:'10px'}}>
      <Navbar.Brand as={Link} to={`/`} href="#home"><i class="fa fa-fw fa-home"></i>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"> 
                 {!context.login && 
                            <>
                            <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
                            <Nav.Link as={Link} to="/login"><i class="fa fa-fw fa-user"></i>Login</Nav.Link>
                            </>
                  }
                  {context.login && 
                      <>
                         <Nav.Link onClick={context.logout}>Logout</Nav.Link>
                      </>
                  }         
          </Nav>
          <Nav>
          {context.login && 
                    <>
                      <Nav.Link>{context.login ? "Bienvenido, " + context.userEmail: " "}</Nav.Link>
                      <Nav.Link as={Link} to="/cart" style={{color:'red'}}><i className="fa fa-shopping-cart"></i></Nav.Link> 
                    </>
            }  
                    
          </Nav>
        </Navbar.Collapse>
      </Navbar>
   )}
   </NetContext.Consumer>
)
}

export default Menu