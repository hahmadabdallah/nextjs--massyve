import { useState } from 'react';
   import { useRouter } from 'next/router';
   import axios from 'axios';
   import domain from "../utils/config";
   import { yupResolver } from "@hookform/resolvers/yup";
   import { useForm } from "react-hook-form";
   import * as Yup from "yup";
   export default function LoginPage() {
     const [error, setError] = useState('');
  
     const router = useRouter();
     const validationSchema = Yup.object().shape({
      email: Yup.string().required('Email is required').email('Email is invalid'),
      password: Yup.string().required("Password is required")
   });
   const formOptions = { resolver: yupResolver(validationSchema) };
   const { register, handleSubmit, formState, reset } = useForm(formOptions);
   const { errors } = formState;
   console.log(domain);
     const onLogin = async (data) => {
     
       try {
         const res = await axios.post(`${domain}/api/login`,[data.email,data.password]);
         if (res.status === 200) {
           router.push('/protected');
         }
       } catch (err) {
         console.error(err.response.data.msg);
         setError(err.response.data.msg);
       }
     };

     return (
       <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-12'>
          <h1>Login</h1>
         <form onSubmit={handleSubmit(onLogin)}>
          <div className='form-group mt-3'>
          <input type="email" placeholder="Email" className='form-control'   {...register("email")} />
          </div>
          <span className='errorValidation'>{errors.email?.message}</span>
          <div className='form-group mt-3'>
          <input type="password" placeholder="Password" className='form-control'  {...register("password")}/>
          </div>
          <span className='errorValidation'>{errors.password?.message}</span>
          <div className='form-group mt-3'>
          <button type="submit" className='btn btn-primary'>Submit</button>
          </div>
          
          {error!==' ' && <span className='errorValidation'>{error}</span> }
          <div className='form-group mt-3'>
          <button type="button" className="btn btn-primary text-white" onClick={()=>{router.push(`/register`)}}>Create new Client</button>
          </div>
        

        
      
         </form>
          </div>
        </div>
        
       </div>
     );
   }
