import jwt from 'jsonwebtoken';
import Client from '../../models/clientModel';
import connectDB from '../../utils/connectDB';

   connectDB();

   export default async function handler(req, res) {
     if (req.method === 'GET') {
       try {
         // Get token from cookie
         const token = req.cookies.token;
         if (!token) {
           return res.status(401).json({ msg: 'No token, authorization denied' });
         }

         // Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         
         const client = await Client.findById(decoded.client.id).select('-password');
         res.status(200).json(client);
       } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
       }
     }

   }