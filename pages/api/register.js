import bcrypt from 'bcryptjs';
   import Client from '../../models/clientModel';
   import connectDB from '../../utils/connectDB';
   import jwt from 'jsonwebtoken';

   connectDB();

   export default async function handler(req, res) {
     if (req.method === 'POST') {
       const [email,password]  = req.body;

       try {
         // Check if client already exists
         let client = await Client.findOne({ email });
         if (client) {
           return res.status(400).json({ msg: 'Client already exists' });
         }

         // Hash password and create client
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         client = new Client({
           email,
           password: hashedPassword,
           
         });

         await client.save();

         // Create and send JWT
         const payload = { client: { id: client.id } };
         jwt.sign(
           payload,
           process.env.JWT_SECRET,
           { expiresIn: '3d' },
           (err, token) => {
             if (err) throw err;
             res.status(200).json({ token });
           }
         );
       } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
       }
     }
   }