import React from 'react'
import RegisterForm from '@/components/auth/register-form'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: "Register - Create an account at Ghost Protocols.",
  description: "Join Ghost Protocols today to gain access to Pakistan's premier car marketplace. Register now to buy, sell, or list your car with ease. Our platform offers a seamless experience for car enthusiasts, providing a secure and efficient way to fulfill all your automotive needs. Take the first step towards finding your perfect ride by creating an account on Ghost Protocols.",

};

const RegisterPage = () => {
  return (
    <div className='space-y-6'>
      <div className="m-2">
            <h1 className='text-2xl md:text-4xl font-semibold'>Register</h1>
            <div className="text-xs md:text-sm breadcrumbs ">
                <ul>
                    <li><Link href={"/"}>Home</Link></li> 
                    <li><Link href={`/account`}>Account</Link></li> 
                    <li>Register</li> 
                    
                </ul>
            </div>
            <hr className='opacity-30'/>
        </div>
        <div className="flex">
          <Image className='hidden md:block flex-grow p-6 object-contain' src={"/media/services/register.webp"} height={500} width={500} alt='Register To Ghost Protocols'/>
          <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage