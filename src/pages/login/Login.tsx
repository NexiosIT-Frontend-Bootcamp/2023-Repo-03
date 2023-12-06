import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import {useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

export function Login() {

    const [cookies, setCookie] = useCookies(["user"]);

    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const userContext = useUserContext();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const result = await userContext.signIn(email, password);
            console.log(result.error)
            if (result.isSuccess) {
                console.log(userContext.user)
                nav('/')
            }
        } catch (e) {
            console.log(e)
        }

    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}