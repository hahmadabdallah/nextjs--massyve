import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title> Massyve App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container' >
           <div className='row'>
            <div className='col-md-12'>
                 <div className='text-center mt-5'>
                 <h1>Welcome!</h1>
                <h1>MASSYVE</h1>
                <h3>Technical Assessment</h3>
                <button type="button" className="btn btn-primary text-white" onClick={()=>{router.push(`/login`)}}>Login</button>
   <button type="button" className="btn btn-primary text-white" onClick={()=>{router.push(`/register`)}}>Register</button>
                 </div>

            </div>
           </div>
         
      </main>
    </>
  )
}
