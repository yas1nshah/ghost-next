import React from 'react'
import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: "Login - Access Your Account at Ghost Protocols.",
  description: "Log in to Ghost Protocols to access Pakistan's premier car marketplace. Seamlessly connect with sellers and buyers, manage your listings, and explore our extensive collection of vehicles. With Ghost Protocols, your login is secure and hassle-free, ensuring a smooth experience every time you access your account. Sign in now and take control of your car-buying journey.",
};


const LoginPage = () => {
  return (
    <div className='space-y-6'>
      <div className="m-2">
            <h1 className='text-2xl md:text-4xl font-semibold'>Login</h1>
            <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                    <li><Link href={"/"}>Home</Link></li> 
                    <li><Link href={`/account`}>Account</Link></li> 
                    <li>Login</li> 
                    
                </ul>
            </div>
            <hr className='opacity-30'/>
        </div>
        <div className="flex">
          <Image className='hidden md:block flex-grow p-6 object-contain' src={"/media/services/login.png"} height={500} width={500} alt='Register To Ghost Protocols'/>
          <LoginForm/>
        </div>
    </div>
  )
}

export default LoginPage