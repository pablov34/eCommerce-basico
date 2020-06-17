import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import {getProductoById} from '../service/api'
import {Alert, Container, CardGroup,Spinner, Card, Button} from 'react-bootstrap';
import NetContext from '../context/NetContext';

function Detalle(props) {
    
    const [producto, setProducto] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { productId } = props.match.params; //desde parametro url
    const [mensaje, setMensaje] = useState('')
    const [showError, setshowError] = useState(false)
   
    const context = useContext(NetContext); //usando ReactContext

    useEffect(
        () => {
        console.log('DETALLE-componentDidMount - hook equivalente');
        console.log(context.cart.count)
        getProductoById(productId)
            .then(doc=>{
              setProducto( doc.data() )
              setLoaded(true); 
              console.log(doc.data())
            })
            .catch(function(error) {
              console.log("Error obteniendo producto: ", error);
              setLoaded(true); 
              setshowError(true);
              setMensaje(`Error obteniendo producto ${error}`);
            });
    }, []);  

    useEffect(()=>{
        console.log('componentDidUpdate - hook equivalente');
    }); 

    let handleAddItem = (e, context) =>{
      e.preventDefault(); //evitar comportamiento default
      console.log("Producto: add to carrito")
      context.addToCart(productId, producto)  
    }

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
    return (
      <>
      <Alert  show={showError} variant='danger' onClose={() => setshowError(false)} dismissible>
              {mensaje}
      </Alert>
      <div>
          <Link 
              className='button is-info'
              to='/'>Volver
          </Link>
      </div>
      <div className="m-2">
      <CardGroup>
        <Card>
              <Card.Img variant="top" src={producto.Url} />
        </Card>
        <Card>
         <Card.Header as="h5">
            <Card.Title>{producto.Nombre}</Card.Title>  
            <Card.Subtitle><Button variant="secondary" onClick={(e) => handleAddItem(e, context)}>Añadir al Carrito</Button></Card.Subtitle>
         </Card.Header> 
         <Card.Body>   
            <Card.Text>
            {producto.Descripcion }
            </Card.Text>
         </Card.Body>
         <Card.Footer>
          <strong className="text-muted">SKU: {producto.SKU} - Precio: $ {producto.Precio}</strong>   
         </Card.Footer>     
        </Card>
      </CardGroup>
      
      </div> 
        </>
    )
  }
}
  
export default Detalle;
  