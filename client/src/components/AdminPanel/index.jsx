import React from "react";
import ViewUsers from "../ViewUsers";

export default function AdminPanel() {
    return(
        <div> 
            <h1>Hola, este es el panel de administrador</h1>
            <div>
                <h3>Usuarios</h3>
                <ViewUsers />
            </div>
        </div>
        
    )
}