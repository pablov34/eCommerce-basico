import React,{useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'


function HomeCarousel()
{
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
    
return(
<Carousel activeIndex={index} onSelect={handleSelect} >
  <Carousel.Item >
    <img style={{  width: '100%', height: '35vw'}}
      src="https://firebasestorage.googleapis.com/v0/b/react-284da.appspot.com/o/productos%2Fai_remove_background_fast.jpg?alt=media&token=7d11cead-1a8f-4ec7-b3c2-ff73408f1490"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Las mejores ofertas en zapatos de cuero</h3>
      <p>Ejemplo integramente hecho en Reactjs.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
     style={{  width: '70%', height: 'auto'}}
      src="https://firebasestorage.googleapis.com/v0/b/react-284da.appspot.com/o/productos%2Fai_remove_background_fast.jpg?alt=media&token=7d11cead-1a8f-4ec7-b3c2-ff73408f1490"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
     style={{  width: '70%', height: 'auto'}}
      src="https://firebasestorage.googleapis.com/v0/b/react-284da.appspot.com/o/productos%2Fai_remove_background_fast.jpg?alt=media&token=7d11cead-1a8f-4ec7-b3c2-ff73408f1490"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
)
}

export default HomeCarousel