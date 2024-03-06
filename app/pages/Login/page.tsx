// Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter from 'next/router' instead of 'next/navigation'
import styles from './Login.module.css';
import ErrorComponent from '../../components/errorComponent'; // Import the ClientError component

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', { username, password });
      const token = response.data.token;
      console.log('Entered handleSubmit');
      console.log('This is the response');

      // Store the token in local storage
      localStorage.setItem('token', token);
      router.push('/pages/Index');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formTitle}>Login</div>
        {error && <ErrorComponent error={new Error(error)} reset={() => setError(null)} />}
        <br />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.formInput} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.formInput} />
        <br />
        <input type="submit" value="Login" className={styles.submitButton} />
      </form>
    </div>
  );
};

export default Login;
