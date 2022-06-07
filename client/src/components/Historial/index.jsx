import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getHist, getProducts } from '../../redux/actions';

const Historial = () => {

    const dispatch = useDispatch();
    const historial = useSelector((state) => state.historial)
    const {id} = useParams()
    // console.log(id, "soy el di")
    console.log(historial, "Hay cosas en historial ")



    useEffect(() => {
        //no tocar :), 
        dispatch(getProducts());
    }, []);

    useEffect(() => {
    dispatch(
    getHist(id))
    },[dispatch])

return (
    <div>
        Historial de compras de {id}


        <div>
            {historial.length > 0?
            historial.map((e) => {
                return (
                    <div key={e.id}> 
                        <h2>
                        {e.nombre}
                        </h2>
                        <h2>
                        {e.marca}
                        </h2>
                        <img src={e.imagen} />
                    </div>
                ) 
            }) :
            <div>
                <h1>No has comprado nada</h1>
            </div>    
        }
        </div>
    </div>

)

}
export default Historial