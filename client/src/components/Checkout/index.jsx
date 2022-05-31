import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMercadoPago } from '../../redux/actions'

export const Checkout = () => {
const  sandbox = useSelector(state => state.mpSandBox) 
const dispatch = useDispatch()

useEffect(() => {
    // dispatch(getMercadoPago());
    console.log("cualquier cosaaaaaaaaaaaaaaaaaa")
    dispatch(getMercadoPago())
  }, []);

  return (
    <div>Checkout
       <button><a href={sandbox}>PAGAR</a></button>


    </div>

  )
}
