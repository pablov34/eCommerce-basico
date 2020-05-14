import React from 'react';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

function Producto({datos,id}){

    return(  
      <div className="col-lg-4 d-flex align-items-stretch" >   
          <Card>
            <Card.Img variant="top" src={datos.Url} />
            <Card.Body>
              <Card.Title>{datos.Nombre}</Card.Title>
              <Card.Text>
                SKU: {datos.SKU}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Precio: $ {datos.Precio}</small>
            </Card.Footer>
            <Link to={`/detail/${id}`}><Button variant="link">Ver Detalle</Button></Link>
          </Card>
        </div>
    )
}

export default Producto;