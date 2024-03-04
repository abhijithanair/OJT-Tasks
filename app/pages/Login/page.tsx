import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

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
      console.log("Entered handleSubmit");
      console.log("THis is the response");
      
      // Store the token in local storage
      localStorage.setItem('token', token);
      router.push('/pages/Index');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formTitle}>Login</div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <br />
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.formInput} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.formInput} />
      <br />
      <input type="submit" value="Login" className={styles.submitButton} />
    </form>
  );
};

export default Login;
