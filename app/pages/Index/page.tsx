// pages/index.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Card from '@/app/components/card';
import styles from '../Index/index.module.css';
import { useRouter } from 'next/navigation';
import isAuth from '@/app/components/isAuth';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Use Axios to make GET request
        const data: User[] = response.data; // Extract data from response
        setUsers(data);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchUsers();
  }, []);

  const handleAddUserClick = () => {
    router.push('/pages/FormPage1');
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

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

export default isAuth(IndexPage);
