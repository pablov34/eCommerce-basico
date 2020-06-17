import React,{useState, useEffect, useContext} from 'react';
import {getCart, deleteCartItem} from '../service/api'
import NetContext from '../context/NetContext';
import { Table,Spinner, Container, Alert, Button } from 'react-bootstrap';

function Cart()
{
  const [loaded, setLoaded] = useState(false);
  const [mensaje, setMensaje] = useState('')
  const [showError, setshowError] = useState(false)
  let  [,setState]=useState();  //FORZAR RE RENDERIZADO

  const context = useContext(NetContext); //usando ReactContext

  useEffect(()=>{
    console.log('CART componentDidMount - hook equivalente');
    setLoaded(true);
    
  }, []);

  let _handleDeleteItem = (cartItemId) =>{
    const indx = context.cart.map((prod) => prod.id).indexOf(cartItemId);
   // console.log(indx);
   // let arr = products
    if(indx !== -1)
    { 
       setLoaded(false) //mostrar el loading
       context.deleteFromCart(cartItemId)  //usando CONTEXT API

        console.log("Document successfully deleted!");

        setLoaded(true) //ocultar el loading
   }
  }

  let total=0

  if(!loaded){
    return (
      <Container className="loader">
            <Spinner  animation="grow" />
            <Spinner  animation="grow" />
            <Spinner  animation="grow" />                
        </Container>
    )
    }else if(context.cart.length === 0)
    {
      return (<h3>
        Aun no ha comprado nada
      </h3>)
    }
    else
    {
      return( 
          <>
           <Alert  show={showError} variant='danger' onClose={() => setshowError(false)} dismissible>
                {mensaje}
            </Alert>
            <h3>
            Su Compra:
            </h3>
            <br /> 
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {context.cart.map((prod) => 
                                     <tr key={prod.id}>
                                     <td><Button variant="danger" onClick={() => _handleDeleteItem(prod.id)}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></Button></td>
                                     <td className="tdprodname">{prod.Nombre}</td>
                                     <td>$ {prod.Precio}</td> 
                                     <td>$ {total = total + parseFloat(prod.Precio)}</td>                                   
                                     </tr>
                                     
                                )
                  }
                  <tr><td colSpan="3" ><b>TOTAL</b></td><td><b>$ {total}</b></td></tr>
                </tbody>
              </Table>
        </>
        )
      }
}

export default Cart