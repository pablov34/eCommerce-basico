import React,{useState, useEffect} from 'react';
import firebase from '../config/firebase';
import Producto from '../components/Producto'
import CardDeck from 'react-bootstrap/CardDeck'
import HomeCarousel from '../components/HomeCarousel'

function Home()
{
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    console.log('HOME componentDidMount - hook equivalente');
    firebase.db.collection("productos")
            .get()
            .then(querySnapshot=>{
                setProducts( querySnapshot.docs )  
                setLoaded(true) 
                console.log(querySnapshot.docs)   
            })
            .catch(function(error) {
              console.log("Error obteniendo productos: ", error);
            });

  }, []
  );

  
       if(!loaded){
            return (
                <div>
                    Cargando...                
                </div>
            )
        }else
        {
            return(
              <>          
             <HomeCarousel></HomeCarousel>
               <div className="container">
                  <div className="row mt-4">               
                      <CardDeck>
                      {products.map((doc) => <Producto datos={doc.data()} id={doc.id} />)}
                    </CardDeck>                 
                  </div>
               </div>
               </>
            )
        } 
}

export default Home