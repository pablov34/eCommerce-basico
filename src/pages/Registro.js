import React, {useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from '../service/firebase'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

//**************************USING REACT-HOOK-FORM */
//CONTIENE VALIDACION EN NUMERO TELEFONO*/
/*CONTIENE WATCH PARA OBTENER VALORES DE UN CAMPO DEL FORM EN OTRO LUGAR*/
/*handleSubmit(_handleSubmit) podemos obtener los datos desde parametro formData*/
//npm install react-hook-form

function Registro(props)
{    
//const history = useHistory();
const {register, handleSubmit, errors, watch}= useForm();
const [form, setForm] = useState({nombre:'',apellido:'',email:'',telefono:'',password:'',confirmarPassword:''});
const [mensaje, setMensaje] = useState('')
const [showError, setshowError] = useState(false)
const [show, setShow] = useState(false)
const history = useHistory();

const password = useRef();
password.current = watch("password", "");

    let _handleSubmit = (formData) =>{
        //codigo de registro - consulta a backend     
        //alert("Form submited data: " + formData.nombre  + " " + formData.apellido); 
       // alert("Form submited -state data: " + form.nombre  + " " + form.apellido);
       firebase.auth.createUserWithEmailAndPassword(formData.email, formData.password)
        .then((data)=>{
            console.log("Usuario creado")
            let uniqueid = formData.apellido + "-" + formData.email.split(".")[0];
            firebase.db.collection("/usuarios").add({
                uniqueid:uniqueid,
                nombre: form.nombre,
                apellido: form.apellido,
                email: form.email,
                userId: data.user.uid
              })
              .then((data)=>{
                  //console.log(data)
                  setShow(true);
                  setMensaje("Usuario creado!");                      
              })
              .catch((err)=>{
                console.log("Error db: ", err);
                setshowError(true);
                setMensaje(`Error db! ${err}`);
              })
             
              history.push("/login"); 
        })
        .catch((error)=>{
            console.log("Error Autentication ",error);
            setshowError(true);
            setMensaje(`Error Autentication! ${error}`);
        })    
    }

    let _handleChange = (e) =>{
        const value = e.target.value
        const name = e.target.name;   
        setForm({
            ...form,
            [name] : value});      
    }

    console.log("ERRORS", errors);

    return(
        <div>
          <Alert  show={show} variant='success' onClose={() => setShow(false)} dismissible>
              {mensaje}
          </Alert>
          <Alert  show={showError} variant='danger' onClose={() => setshowError(false)} dismissible>
              {mensaje}
          </Alert>
       <h3>
        Registro:
        <br /> 
       </h3>
        <form id="form_contacto" name="form_contacto" onSubmit={handleSubmit(_handleSubmit)}>
            <div>
                <label htmlFor="nombre">Nombre</label><br/>
                <input type="text" name="nombre" className="elemento" value={form.nombre} ref={register} onChange={_handleChange} />
            </div>
            <div>
                <label htmlFor="apellido">Apellido</label><br/>
                <input type="text" name="apellido" className="elemento" value={form.apellido} ref={register} onChange={_handleChange}/>
            </div>
            <div>
                <label htmlFor="email">Email</label><br/>
                <input type="email" name="email" value={form.email} onChange={_handleChange} ref={register} className="elemento"/>
            </div>
            <div>
                <label htmlFor="telefono">Telefono</label><br/>
                <input type="text" 
                       name="telefono"
                       className="elemento" 
                       ref={register({ 
                                required: {
                                value:true,
                                message:"Telefono es requerido"
                                }, 
                                minLength: {
                                value: 8,
                                message: "Telefono debe tener al menos 8 digitos"
                                } 
                            })} />
                {errors.telefono && <p><span className="error">{errors.telefono.message}</span></p>}
            </div>
            <div>
                <label htmlFor="Password">Password</label><br/>
                <input className="elemento" 
                       name="password"
                       type="password"                       
                       ref={register({ 
                        required: "Password es requerido", 
                        minLength: {
                        value: 6,
                        message: "Su password debe tener al menos 6 digitos"
                        } 
                        })} />
                {errors.password && <p><span className="error">{errors.password.message}</span></p>}
            </div>
            <div>
                <label htmlFor="confirmarPassword">Confirmar Password</label><br/>
                <input className="elemento" 
                       name="confirmarpassword"
                       type="password" 
                       ref={register({
                        validate: value =>
                          value === password.current || "El passwords no coincide"
                      })} />
                {errors.confirmarpassword && <p><span className="error">{errors.confirmarpassword.message}</span></p>}
            </div>
            <div>
            <Button  variant="link" type="submit">Crear cuenta</Button>
            </div>
        </form>
        </div>
    )

}

export default Registro