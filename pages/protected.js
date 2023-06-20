import { useEffect, useState } from 'react';
   import axios from 'axios';
   import domain from "../utils/config"
   export default function ProtectedPage() {
     const [client, setClient] = useState(null);

     useEffect(() => {
       const fetchClient = async () => {
         try {
           const res = await axios.get(`${domain}/authenticate`);
           setClient(res.data);
         } catch (err) {
           console.error(err);
         }
       };

       fetchClient();
     }, []);

     if (!client) {
       return <div>Loading...</div>;
     }

     return (
       <div className='container'>
        <div className="row">
          <div className='col-md-12 mt-5 '>
          <h1>Welcome!</h1>
         <p>Your email is {client.email}</p>
          </div>
        </div>
        
       </div>
     );
   }