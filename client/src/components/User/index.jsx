import React from "react";
import { useState, useEffect } from "react";
import { axios } from "axios";

export default function User() {


    const [user, setUser] = useState();
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const getUser = async () => {
            try {
                const response = await axios.get('/user', {

                    signal: controller.signal
                });
                isMounted && setUser(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser();

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return (
        <article>
            <h2>User List</h2>
            {user?.length
                ? (
                    <ul>
                        {user.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <h3>No hay nada que encontrar, tonto tonto tonto tonto TONTOOOOOOOOOO</h3>
            }
        </article>
    )
}