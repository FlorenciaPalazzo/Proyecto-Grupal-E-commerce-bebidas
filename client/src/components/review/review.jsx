import React from "react";



export default function postReview(){
    const dispatch = useDispatch();
    const [input, setInput] = useState({
       titulo: '',
       descripcion: '',
       rating: '',
      })
    return(
        <div>
            <h1>Dejanos tu Reseña.</h1>
            <h4>Titulo.</h4>
            <h4>Texto.</h4>
            <h4>Rating.</h4>
        </div>
    )
}