import React,{useState, useEffect, useContext} from 'react';
import firebase from '../config/firebase';
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
    firebase.db.collection("cart").where("userId", "==", context.userId)
    .get()
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
      firebase.db.collection("/cart").doc(cartItemId).delete().
      then(function() {
        console.log("Document successfully deleted!");
              
        console.log("actualiza setProducts"); 
        arr.splice(indx, 1);
        setProducts(arr); 
        setState({}); //FORZAR RE RENDERIZADO para actualizacion
        context.updateItemCount();
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
    }else
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => 
                                     <tr key={prod.id}>
                                     <td><Button variant="danger" onClick={() => _handleDeleteItem(prod.id)}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></Button></td>
                                     <td>{prod.data().Nombre}</td>
                                     <td>$ {prod.data().Precio}</td> 
                                     <td>$ {total = total + parseFloat(prod.data().Precio)}</td>                                   
                                     </tr>
                                     
                                )
                  }
                  <tr><td colSpan="3">TOTAL</td><td>$ {total}</td></tr>
                </tbody>
              </Table>
        </>
        )
      }
}

export default Cart