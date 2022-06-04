import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';
import Card from '../Card';


export default function Offers(){
    const productsOffers = useSelector((state) => state.products)
    const dispatch = useDispatch();
    console.log('soyproductoffers', productsOffers)

    let arrayOffers = [];

    productsOffers.map((e) => {
        if(e.nombre === 'CORONA 710ml x 3 (Promoción)') arrayOffers.push(e)
        if(e.nombre === 'SALENTEIN EXTRA BRUT 750ml x 6 (Promoción)-No incluye caja') arrayOffers.push(e)
        if(e.nombre === 'SMIRNOFF WATERMELON 750ml 3x2 (Promoción)') arrayOffers.push(e)
    })
    console.log(arrayOffers)

    useEffect(() => {
        dispatch(getProducts())
    }, [])
    return(
        <div>
            {arrayOffers.map((e) => {
                return(
                        <div key={e.id} className="div-key-card">
                        <Card
                          nombre={e.nombre}
                          imagen={e.imagen}
                          id={e.id}
                          marca={e.marca}
                          ml={e.ml}
                          graduacion={e.graduacion}
                          precio={e.precio}
                        />
                    </div>
                )
            })}
        </div>
    )
}