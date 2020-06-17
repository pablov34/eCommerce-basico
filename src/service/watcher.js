import firebase from './firebase'

//controlar si el usuario esta o no logueado
export function watchUserChanges(callback)
{
    const unsub = firebase.auth.onAuthStateChanged((user) => {
    if(user && !user.isAnonymous) {
        console.log('logueado')
        callback({
            id:user.uid,
            email:user.email,
            displayName:user.displayName
        });
    }
    else
    {
        console.log('NO logueado')
        callback(null);
    }
    })
    return unsub;
}

//controlar cualquier cambio en la fuente de datos
export function watchCart(callback)
{
    const unsub = firebase.db.collection('cart')
    .onSnapshot((snapshot) => {
            const cart = [];

            snapshot.forEach((doc) => {
                const data = doc.data()
                cart.push({
                    ...data,
                    id:doc.id
                })
            })
            
        callback(cart);
    });
    return unsub;
}