import firebase from './firebase'

export async function getProductos()
{
    return await firebase.db.collection("productos").get()        
}

export async function getProductoById(productId)
{
    return await firebase.db.doc("productos/"+ productId).get()
}

export async function getCart(userId)
{
    return await firebase.db.collection("cart").where("userId", "==", userId).get()
}

export async function deleteCartItem(cartItemId)
{
    return await firebase.db.collection("/cart").doc(cartItemId).delete()
}