import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteFavorito, getFavorito } from '../../redux/actions';

export const Favoritos = () => {
    
    const elFavorito = useSelector((state) => state.favProducts);
    const usuario = useSelector((state) => state.currentUser)

    const dispatch = useDispatch();
    
    let a = usuario ? usuario.uid : null;
    const[del,setDel]= useState({
        usuarioId: a, 
        productoId:null,
    })

    // setDel({productoId:idProd} )
    //  console.log("SOY EL DEL",del)

    console.log('SOY EL USUARIOOOOOOOOOOOOO---->',usuario.uid)
    useEffect(() => {
        dispatch(getFavorito(usuario.uid))
      }, [dispatch]);
      
    const handleDeleteFav =(e) =>{
        e.preventDefault()
        let idProd = e.target.value
        let payload= {usuarioId:a, productoId:idProd} 
        console.log("SOY EL PAYLOAD 2",payload)
        dispatch(deleteFavorito(payload))
    }
  return (
    <div>
        <Link to ="/home"><button className='button'>Home</button></Link>
        <div>Lista de Favoritos</div>
        {elFavorito.length > 0 ?
            elFavorito.map((e)=>{
                return(
                    <div key={e.id}>
                       {/* <button className='button' onClick={handleDeleteFav}>Delete</button> */}
                       { e.nombre} 
                       <img src={ e.imagen} /> 
                    </div>
                     )
            }
            )   
            :
                <h2>No hay favoritos</h2>
            }
    </div>

  )
}
