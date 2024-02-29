// components/Card.tsx

import React from 'react';
import styles from './Card.module.css'; // Import CSS module

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  const { name, email, phone } = user;
  const imageUrl = 'https://picsum.photos/200';

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} />
      <div className={styles['card-body']}>
        <h2>{name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </div>
  );
};

export default Card;
