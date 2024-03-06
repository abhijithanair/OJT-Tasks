// login.ts
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {isAuthenticated, setIsAuthenticated } from "@/app/Auth";


const KEY = 'asadfdsfSsddgsasfsdfhdsfdf';

export default function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
    }

    // Check credentials 
    const isValidCredentials = username === 'admin' && password === 'admin';
    if (!isValidCredentials) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }

    // Generate JWT token
    const token = jwt.sign({ username, admin: isValidCredentials }, KEY);
    setIsAuthenticated(true);
    console.log(`This is the status: ${isAuthenticated}`);


    // Send token in response
    res.status(200).json({ token });
}
