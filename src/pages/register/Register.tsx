import { useState } from 'react';
import * as api from '../../api/Auth/Auth';
import { useUserContext } from '../../contexts/UserContext';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userContext = useUserContext();

  const register = async () => {

    try { 
        await api.register(username, email, password);
        userContext.signIn(email, password);
        } catch (e) {
            console.log(e.response.data.message)
    }
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password === confirmPassword) {
      register();
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}