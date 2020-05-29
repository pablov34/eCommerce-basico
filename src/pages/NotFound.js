import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () =>(
    <div>
    <h1 className='title'>404!</h1>
    <h2 className='subtitle'>No existe la pagina!</h2>
    <Link 
        className='button is-info'
        to='/'>Volver
    </Link>
    </div>
)