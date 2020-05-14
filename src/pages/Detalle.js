import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import firebase from '../config/firebase';
import {CardGroup, Card} from 'react-bootstrap'

function Detalle(props) {
    
    const [producto, setProducto] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { productId } = props.match.params; //desde parametro url
    
    useEffect(
        () => {
        console.log('componentDidMount - hook equivalente');
            firebase.db.doc("productos/"+ productId)
            .get()
            .then(doc=>{
              setProducto( doc.data() )
              setLoaded(true); 
                console.log(doc.data())
            })
    }, []);  

    useEffect(()=>{
        console.log('componentDidUpdate - hook equivalente');
         console.log(producto);
    }); 

  if(!loaded){
      return (
          <div>
              Cargando...                
          </div>
      )
  }else
  {
    return (
      <>
      <div>
          <Link 
              className='button is-info'
              to='/'>Volver
          </Link>
      </div>
      <CardGroup>
        <Card>
              <Card.Img variant="top" src={producto.Url} />
        </Card>
        <Card>
          <Card.Title>{producto.Nombre}</Card.Title>        
          <Card.Text>
          SKU: {producto.SKU}
          {producto.Descripcion }
          </Card.Text>
        </Card>
      </CardGroup>    
        </>
    )
  }
}
  
export default Detalle;
  