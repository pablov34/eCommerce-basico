import React, {useState} from 'react';
import firebase from '../config/firebase';
import { storage } from 'firebase';

function ImageUpload() 
{
const [image, setImage] = useState(null);
const [url, setUrl] = useState('');

let _handleChange = (e) =>{
  if(e.target.files[0]){
    setImage(e.target.files[0]);
  }
}

let _handleUpload = (e) =>{

  const uploadtask = firebase.storage.ref(`productos/${image.name}`).put(image)
     uploadtask.on('state_changed', 
        (snapshot) => {
          //progreso 
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
            //completado
            storage.ref('productos/').child(image.name).getDownloadURL()
            .then((url) => {
                console.log("download Url: " + url)
            })
        }
     )
  
}

 return(
     <div>
         <input type="file" onChange={_handleChange} />
         <button onClick={_handleUpload}>Upload</button>
     </div>
 )

}

export default ImageUpload;