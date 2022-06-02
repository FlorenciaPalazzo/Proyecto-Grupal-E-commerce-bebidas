import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";


export default function PostReview(){
    const dispatch = useDispatch();
    const producto = useSelector(state => state.products)
    const usuario = useSelector(state => state.usersLoged)

    
    const [input, setInput] = useState({
        titulo: '',
        descripcion: '',
        rating: '',
    })

    function handleOnChange(e) {
        setInput({
          ...input,
          titulo: e.target.value
          
        })
    }
    const ratingChanged = ( newRating ) => {     
        setInput({ ...input, rating : newRating });
      } ;
      
    return(
        <div>
            <h1>Dejanos un comentario y ganate un tetra.</h1>
          <form>
              <div>
                <label>Titulo:</label>
                <input type="text" placeholder='Titulo' value={input.titulo} onChange={(e) => handleOnChange(e)}/>
              </div>
              <div>
                <label>descripcion:</label>
                <input type="text" placeholder='Descripcion' value={input.descripcion} onChange={(e) => handleOnChange(e)}/>
              </div>
              <div>
              <ReactStars
                count={5}
                onChange = { ratingChanged }
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              </div>
              <div>
                <button type="submit" value="Submit" >
                    Puntuar.
                </button>
              </div>
          </form>  
        </div>
    )
}

