import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import NetContext from '../context/NetContext';

function Producto(props){

  useEffect(()=>{
    console.log('PRODUCT componentDidMount - hook equivalente');
    console.log(props.id);
  }, []);

  let handleAddItem = (e, context) =>{
    e.preventDefault(); //evitar comportamiento default
    console.log("Producto: add to carrito")
    context.addToCart(props.id, props.datos)  
  }

    return(  
    <NetContext.Consumer>
      {
      context => (
        <div className="col-md-3" >
          <Card className="mb-1 p-0 shadow">
            <Card.Header as="h6">
              <Card.Title className="DivHeight">{props.datos.Nombre}</Card.Title>
            </Card.Header> 
            <Card.Body>
              <Card.Img variant="top"  src={props.datos.Url} />     
            </Card.Body>
            <Card.Subtitle><Button variant="secondary" onClick={(e) => handleAddItem(e, context)}>Añadir al Carrito</Button></Card.Subtitle> 
            <Card.Footer>
              <small className="text-muted">SKU: {props.datos.SKU} - Precio: $ {props.datos.Precio}</small>
            </Card.Footer>
            <Link to={`/detail/${props.id}`}><Button variant="link">Ver Detalle</Button></Link>
          </Card>
          </div>
         )}
      </NetContext.Consumer>
    )
}

export default Producto;