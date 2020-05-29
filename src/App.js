import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Footer from './components/footer';
import Home from './pages/Home'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import PrivateRoute from './components/PrivateRoute';
import Detalle from './pages/Detalle'
import GlobalState from './context/GlobalState';
import { NotFound } from './pages/NotFound'

function App() {
// const [autenticado, setAutenticado] = useState(false);
//  const [usuario, setUsuario] = useState('');



useEffect(()=>{
    console.log('APP componentDidMount - hook equivalente');
}, []
);

useEffect(()=>{
  console.log('APP componentDidUpdate - hook equivalente');
}); 


/*NO SE USA
  let _handleLoginSubmit = (email,pass) =>{
    //alert("login submit: " +  name + pass);
    console.log("recibiendo desde LOGIN submit: email " + email + "pass: " + pass)
    //codigo de manejo autenticacion
    setLoginState();
}

let _handleLogoutSubmit = () =>{
  setLoginState();
}*/

  return (
    //render={(props) => <Login handleLoginSubmit={_handleLoginSubmit} />}  
    //render={(props) => <Logout handleLogoutSubmit={_handleLogoutSubmit} />}
    <div className="App">
      <GlobalState>
        <BrowserRouter >
        <Menu></Menu>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/admin" component={Admin} />            
                <Route path='/login'  component={Login} />  
                <Route path='/registro' component={Registro}/>
                <Route path='/detail/:productId' component={Detalle}></Route>
                <PrivateRoute exact path="/cart" component={Cart} />
                <Route component={NotFound}></Route>     
            </Switch>
        </BrowserRouter>
        <Footer></Footer>
    </GlobalState>
    </div>

  );
}

export default App;
