import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Check if Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1]; // Assuming token is in the format "Bearer <token>"
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'Bearer token missing' });
        }
        
        // Token exists, continue with processing the request
        
        const { firstName, lastName } = req.body;
        res.status(200).json({ success: true });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
