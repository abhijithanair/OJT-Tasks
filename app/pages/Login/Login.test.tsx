import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../Login/page';
import ErrorComponent from '../../components/errorComponent';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios'); // Mock Axios module
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Login component', () => {
  test('should render login form', () => {
    const { getByText, getByLabelText } = render(<Login />);

    // Assert that login form elements are present
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('should handle form submission', async () => {
    const { getByText, getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    const mockAxiosPost = jest.spyOn(axios, 'post');
    // Mock Axios post request
    mockAxiosPost.mockResolvedValueOnce({ data: { token: 'testtoken' } })

    // Mock useRouter.push function
    mockAxiosPost.mockImplementationOnce(() => Promise.reject(new Error('Invalid username or password')));

    // Simulate form submission
    fireEvent.click(getByText('Login'));

    // Assert that Axios post method is called with correct arguments
    expect(axios.post).toHaveBeenCalledWith('/api/login', { username: 'testuser', password: 'testpassword' });

    // Assert that useRouter.push function is called with '/pages/Index' as the argument
    expect(useRouter.mock.calls[0][0].push).toHaveBeenCalledWith('/pages/Index');
  });

  test('should display error message on invalid credentials', async () => {
    const { getByText, getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    // Mock Axios post request to throw error
    axios.post.mockRejectedValueOnce(new Error('Invalid username or password'));

    // Simulate form submission
    fireEvent.click(getByText('Login'));

    // Assert that error message is displayed
    await waitFor(() => expect(getByText('Invalid username or password')).toBeInTheDocument());
  });
});
