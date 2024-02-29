// pages/index.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Card from '@/app/components/card';
import styles from '../Index/index.module.css';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const IndexPage: React.FC = () => {
    const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Use Axios to make GET request
        const data: User[] = response.data; // Extract data from response
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUserClick = () => {
    router.push('/pages/FormPage1');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Users</h1>
      <div className={styles['card-container']}>
        {users.map(user => (
          <Card key={user.id} user={user} />
        ))}
        <button onClick={handleAddUserClick} className={styles.newuserbutton}>Add New User</button>
      </div>
      
    </div>
  );
};

export default IndexPage;
