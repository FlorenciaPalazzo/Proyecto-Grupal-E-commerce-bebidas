import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMercadoPago } from '../../redux/actions'

export const Checkout = () => {
const  sandbox = useSelector(state => state.mpSandBox) 
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getMercadoPago());
    console.log("cualquier cosaaaaaaaaaaaaaaaaaa")
    
  }, []);

  return (
    <div>Checkout
        <a href={sandbox}><p>sandbox:{sandbox}</p></a>


    </div>

  )
}
