import React, {useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { getMenu } from '../utils/auth';

function Menu(props)
{ 
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  useEffect(()=>{
    console.log('MENU componentDidMount - hook equivalente');
    setMenu(getMenu());
    setLoading(false);
}, []
);
 
useEffect(()=>{
  console.log('MENU componentDidUpdate - hook equivalente');
  setMenu(getMenu());
  setLoading(false);
}, [props.isautenticado]); 

return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<Link to={`/`}><Navbar.Brand href="#home">Home</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto"> 
    {loading ? "loading": 
        menu.map((menuitem)=>
       <Link to={`${menuitem.path}`}><Nav.Link href='#admin'>{`${menuitem.text}`}</Nav.Link></Link> )      
    }
    </Nav>
    <Nav>
      <Nav.Link href="#deets">{props.isautenticado ? "Bienvenido, " + props.user: " "}</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
)
}

export default Menu