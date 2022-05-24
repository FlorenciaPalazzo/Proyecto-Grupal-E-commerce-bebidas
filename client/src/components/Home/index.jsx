import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Login from '../Login'
function Home(){
    const { isAuthenticated, user } = useAuth0();
    console.log(user);
    return (
        <div>
            {
                isAuthenticated && 
                <div>
                    <span>Hi, {user.name} <img width={50} height={50} src={user.picture} alt={user.name} /></span>
                    <div>Logged: {String(isAuthenticated)}</div>
                    <div>Verified: {String(user.email_verified)}</div> 
                </div>
            }
            <Login/>
        </div>
    );
};

export default Home
// front-alcaraz
