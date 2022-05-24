import React from "react";
import { useAuth0 } from '@auth0/auth0-react'

function SessionHandlerBtn(){
    const { logout, loginWithRedirect, isAuthenticated, } = useAuth0()
    return(
        <div>

            { !isAuthenticated  ?

                <div>
                    <button onClick={() => loginWithRedirect()} >Login</button>
                </div>
                :
                <div>
                    <button onClick={() => logout()} >Logout</button>
                </div>

            }

        </div>
    )
}
export default SessionHandlerBtn