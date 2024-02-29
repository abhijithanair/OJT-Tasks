import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface UsersPageProps {
  user: User;
}

export default function UsersPage({ user }: UsersPageProps) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User</h1>
      <ul>
        <li key={user.id}>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Address:</p>
          <ul>
            <li>Street: {user.address.street}</li>
            <li>Suite: {user.address.suite}</li>
            <li>City: {user.address.city}</li>
            <li>Zipcode: {user.address.zipcode}</li>
            <li>
              Geo: ({user.address.geo.lat}, {user.address.geo.lng})
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export async function getData() {
  try {
    // Fetch data from external API for a single user
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    const user: User = await res.json();

    // Pass data to the page via props
    return { props: { user } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { user: null } }; // Return null user if fetching fails
  }
}
