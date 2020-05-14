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
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Logout from './components/Logout'
import { isLogin, getLoggedUser } from './utils/auth';
import Detalle from './pages/Detalle'

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState('');

  
let setLoginState = () =>
{
  if(isLogin())
  {
    setAutenticado(true);
    setUsuario(getLoggedUser());
  }
  else
  {
    setAutenticado(false);
    setUsuario('');
  }
  console.log("setLoginState " + getLoggedUser())
}

useEffect(()=>{
    console.log('APP componentDidMount - hook equivalente');
    setLoginState();
}, []
);

useEffect(()=>{
  console.log('APP componentDidUpdate - hook equivalente');
}); 


let _handleLoginSubmit = (email,pass) =>{
    //alert("login submit: " +  name + pass);
    console.log("recibiendo desde LOGIN submit: email " + email + "pass: " + pass)
    //codigo de manejo autenticacion
    setLoginState();
}

let _handleLogoutSubmit = () =>{
  setLoginState();
}

  return (
    <div className="App">
    <BrowserRouter >
    <Menu isautenticado={autenticado} user={usuario}></Menu>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/admin" component={Admin} />            
            <Route path='/login' render={(props) => <Login handleLoginSubmit={_handleLoginSubmit} />} />
            <Route path='/registro' component={Registro}/>
            <Route path='/logout' render={(props) => <Logout handleLogoutSubmit={_handleLogoutSubmit} />}/>
            <Route path='/detail/:productId' component={Detalle}></Route>
        </Switch>
    </BrowserRouter>
    <Footer></Footer>
    </div>

  );
}

export default App;
