import React,{useState, useEffect} from 'react';
import {getProductos} from '../service/api'
import Producto from '../components/Producto'
import CardDeck from 'react-bootstrap/CardDeck'
import { Container,Spinner,Alert } from 'react-bootstrap';


function Home()
{
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    console.log('HOME componentDidMount - hook equivalente');
    getProductos()
            .then(querySnapshot=>{
                setProducts( querySnapshot.docs )  
                setLoaded(true) 
                //console.log(querySnapshot.docs)   
            })
            .catch(function(error) {
              console.log("Error obteniendo productos: ", error);
            });
  }, []);

  
  
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
                  <div className="container">
                      <div className="row mt-4">               
                        <CardDeck>
                          {products.map((doc) => <Producto key={doc.id} datos={doc.data()} id={doc.id} />)}
                        </CardDeck>                 
                      </div>
                  </div>
                  </>
            )
        } 
}

export default Home