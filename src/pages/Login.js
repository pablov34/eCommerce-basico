import React,{useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import { login } from '../utils/auth';
import firebase from '../config/firebase'
import Alert from 'react-bootstrap/Alert';
import  Button from 'react-bootstrap/Button'

function Login(props)
{
    const history = useHistory();
    const [form, setForm] = useState({email:'',password:''});
    const [mensaje, setMensaje] = useState('')
    const [showError, setshowError] = useState(false)

    let _handleSubmit = (e) =>{
        e.preventDefault(); //evitar comportamiento default
        //alert("submit");
        //codigo de login - consulta a backend
       // let name = document.getElementById('nombre').value;  NO USAR getElementById
       // let pass = document.getElementById('password').value;
       firebase.auth.signInWithEmailAndPassword(form.email, form.password)
       .then((result) => {
          console.log(result.user)
          login(result.user.uid,result.user.refreshToken, result.user.email);
          props.handleLoginSubmit(form.email, form.password);
          history.push("/");
       })
       .catch(error => {
           //this.setState(byPropKey('error', error));
           console.log("Error",error)
           setshowError(true);
           setMensaje(`${error}`);
       });   
      

    }

    let _handleChange = (e) =>{
        const target = e.target;
        const value = target.value
        const name = target.name;   
        setForm({     //... clona el objeto y despues de , le añade nuevo value
            ...form,
            [name] : value});      
    }

    return(
        <div>
            <Alert  show={showError} variant='danger' onClose={() => setshowError(false)} dismissible>
              {mensaje}
          </Alert>
          <h3>
        Ingreso:
         <br /> 
       </h3> 
        <form id="form_login" name="form_login" onSubmit={_handleSubmit}>
        <div>
            <label for="usuario">Email</label><br/>
            <input type="text" name="email" value={form.email} classNameName="elemento" onChange={_handleChange}  />
        </div>
        <div>
            <label for="Password">Password</label><br/>
            <input type="password" name="password" value={form.password} className="elemento" onChange={_handleChange}/>
        </div>
        
        <Button variant="link" type="submit">Ingresar</Button> <Button variant="link"><Link to={`/registro`}>Registrarse</Link></Button>
        </form>
    </div>
    )

}

export default Login