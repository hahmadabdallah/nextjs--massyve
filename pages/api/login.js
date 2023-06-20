import bcrypt from 'bcryptjs';
import Client from '../../models/clientModel';
import connectDB from '../../utils/connectDB';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

   connectDB();

   export default async function handler(req, res) {
     if (req.method === 'POST') {
       const [email,password ] = req.body;
      
       try {
         // Check if client exists
         const client = await Client.findOne({ email });
         if (!client) {
           return res.status(400).json({ msg: 'Incorrect email' });
         }

         // Check password
         const isMatch = await bcrypt.compare(password,client.password);
         if (!isMatch) {
           return res.status(400).json({ msg: 'Incorrect password' });
         }

         // Create and send JWT cookie
         const payload = { client: { id: client.id } };
        jwt.sign(
           payload,
           process.env.JWT_SECRET,
           { expiresIn: '3d' },
           (err, token) => {
             if (err) throw err;
             res.setHeader('Set-Cookie', cookie.serialize('token', token, {
               httpOnly: true,
               maxAge: 3600,
               sameSite: 'strict',
               path: '/'
             }));
             res.status(200).json({ msg: 'Logged in successfully' });
           }
         );
       } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
       }
     }
   }