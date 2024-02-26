import {NextApiRequest,NextApiResponse} from 'next';

export default function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==='POST'){
        const {firstName,lastName} = req.body;
        res.status(200).json({success:true});
    }
    else{
        res.setHeader('Allow',['POST']);
        res.status(405).end('Method ${req.method} Not Allowed');
    }
}