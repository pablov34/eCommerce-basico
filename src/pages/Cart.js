import React,{useState, useEffect, useContext} from 'react';
import {getCart, deleteCartItem} from '../service/api'
import NetContext from '../context/NetContext';
import { Table,Spinner, Container, Alert, Button } from 'react-bootstrap';

function Cart()
{
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [mensaje, setMensaje] = useState('')
  const [showError, setshowError] = useState(false)
  let  [,setState]=useState();  //FORZAR RE RENDERIZADO

  const context = useContext(NetContext); //usando ReactContext

  useEffect(()=>{
    console.log('CART componentDidMount - hook equivalente');
    getCart(context.userId)
    .then(querySnapshot=>{
        setProducts( querySnapshot.docs )  
        setLoaded(true) 
    })
    .catch(function(error) {
      console.log("Error obteniendo productos: ", error);
      setshowError(true);
      setMensaje(`${error}`);
    });
    
  }, []);

  let _handleDeleteItem = (cartItemId) =>{
    const indx = products.map((prod) => prod.id).indexOf(cartItemId);
    console.log(indx);
    let arr = products
    if(indx != -1)
    { 
      setLoaded(false) //mostrar el loading
      deleteCartItem(cartItemId)
      .then(function() {
        console.log("Document successfully deleted!");
              
        console.log("actualiza setProducts"); 
        arr.splice(indx, 1);
        setProducts(arr); 
        setState({}); //FORZAR RE RENDERIZADO para actualizacion
        context.updateItemCount();
        setLoaded(true) //ocultar el loading
      })
     .catch(function(error) {
        console.error("Error removing document: ", error);
        setshowError(true);
        setMensaje(`${error}`);
     });
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
    }else if(products.length === 0)
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
                  {products.map((prod) => 
                                     <tr key={prod.id}>
                                     <td><Button variant="danger" onClick={() => _handleDeleteItem(prod.id)}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></Button></td>
                                     <td className="tdprodname">{prod.data().Nombre}</td>
                                     <td>$ {prod.data().Precio}</td> 
                                     <td>$ {total = total + parseFloat(prod.data().Precio)}</td>                                   
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