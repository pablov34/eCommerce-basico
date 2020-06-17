import React, { Component } from 'react';
import NetContext from './NetContext';
import firebase from '../service/firebase'
import { watchUserChanges, watchCart} from '../service/watcher'
import {deleteCartItem} from '../service/api'

class GlobalState extends Component {
  totalitemfieldname;
   unsubscribeUserWatcher;
   unsubscribeCartWatcher;

  state = {
    login: localStorage.getItem('login'),
    userId:localStorage.getItem('userId'),
    userEmail:localStorage.getItem('userEmail'),
    cartTotalItems:localStorage.getItem('cartTotalItems'),
    //usando watcher
    authReady:false,
    isLoggedIn: false,
    user: null,
    cart:[]
  };

 //se ejecuta 1 sola vez, en el montaje, luego del renderizado inicial
 componentDidMount(){
     console.log("GlobalState didMount")
     this.unsubscribeUserWatcher = watchUserChanges((user)=> {
      if(user)
      {
          this.setState({
              isLoggedIn: true,
              authReady:true,  
              user: user
          })
            //load cart  
            this.unsubscribeCartWatcher = watchCart((cart)=>{ 
              //esta state cambiara cuando se modifique los datos en firebase            
              let usercart = cart.filter(e => {return e.userId === this.state.user.id})
              this.setState({ cart: usercart })            
            });
          
      }
      else
      {
          this.setState({
              isLoggedIn: false,
              authReady:true,
              user: null
          })
      }

    })
 }

 componentWillUnmount() {
  this.unsubscribeUserWatcher();
  this.unsubscribeCartWatcher();
}

  loginUser = userData => {
   // this.totalitemfieldname = "cartTotalItems" & localStorage.getItem('userId'); 

    this.setState({
      login:true,
      userId:userData.uid,
      userEmail:userData.email,
      cartTotalItems:localStorage.getItem('cartTotalItems')
    });
    localStorage.setItem('login',this.state.login)
    localStorage.setItem('userId',this.state.userId)
    localStorage.setItem('userEmail',this.state.userEmail)
  };

  logout = ()=>{   
    this.setState({
      login:false,
      userId:'',
      userEmail:'',
      cart:[],
      cartTotalItems:0  
    })
    localStorage.removeItem('login')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    //localStorage.removeItem('cartTotalItems')
    window.location.href='/'
  }
   deleteFromCart = (cartItemId) => {
    deleteCartItem(cartItemId) 
    .then((data)=>{    
                      
    })
    .catch((err)=>{
      console.log("Error db: ", err);
    })
   }

  addToCart = (id,producto) => {
    console.log("Global State addToCart")   
    firebase.db.collection("/cart").add({
      userId: this.state.userId,
      productId:id,
      Nombre:producto.Nombre,
      Precio:producto.Precio    
    })
    .then((data)=>{    
      let totalitems = this.state.cartTotalItems
      totalitems++;
        this.setState({
          cartTotalItems: totalitems
        })  
      localStorage.setItem('cartTotalItems',totalitems)                  
    })
    .catch((err)=>{
      console.log("Error db: ", err);
    })
    
   };

   updateItemCount = () => {
    let totalitems = this.state.cartTotalItems
    totalitems--;
      this.setState({
      cartTotalItems: totalitems
    }) 
    localStorage.setItem('cartTotalItems',totalitems)    
   }

  render() {
    return (
      <NetContext.Provider
        value={{
          login:this.state.login,
          userId:this.state.userId,
          userEmail:this.state.userEmail,
          cartTotalItems:this.state.cartTotalItems,
          loginUser:this.loginUser,
          logout:this.logout,
          addToCart:this.addToCart,
          deleteFromCart:this.deleteFromCart,
          updateItemCount:this.updateItemCount,

          authReady:this.state.authReady,
          isLoggedIn: this.state.isLoggedIn,
          user: this.state.user,
          cart:this.state.cart
        }}
      >
        {this.props.children}
      </NetContext.Provider>
    );
   }
}
export default GlobalState;