import React from 'react'
import Image from 'next/image'
import menu from '@/static-files/menu'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className="bg-card py-6">
        <div className="max-w-6xl mx-auto grid
                        grid-cols-1 md:grid-cols-4">

            <div className=' w-full overflow-hidden p-4'>
                <Image className='w-2/3 h-auto invert dark:invert-0' src={"/ghost.png"} width={200} height={100} alt='Ghost Protocols Logo'/>
                <hr className='my-2'/>
                <p className='text-xs md:text-sm'>{"Providing you the Ghostly experience with Ghost Protocols. Don't miss out, Get your Ghostly car now."}</p>
                <h6 className='my-2 font-semibold'>Powered by <a href="/" className='text-primary'>Tixy.pk</a></h6>
            </div>
            <div className=' w-full overflow-hidden p-4'>
                <div className="my-4">
                <h2 className="footer-head">Menu</h2>
                    <ul className=''>
                        {
                            menu.map((menu,index)=>(
                                <li className='px-4 py-1 hover:bg-card transition-all ease-in-out rounded-xl' key={index}> <Link href={menu.link}>{menu.name}</Link></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className=' w-full overflow-hidden p-4'>
                <div className="my-4">
                    <h2 className="footer-head">Contact Us</h2>
                        <div className="flex flex-wrap gap-2">
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon invert dark:invert-0" style={{ backgroundPosition: '0px 0px' }}></i>
                                </Link>
                            </div>
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon invert dark:invert-0" style={{ backgroundPosition: '-30px 0px' }}></i>
                                </Link>
                            </div>
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon invert dark:invert-0"  style={{ backgroundPosition: '-60px 0px' }}></i>
                                </Link>
                            </div>
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon invert dark:invert-0" style={{ backgroundPosition: '-90px 0px' }}></i>
                                </Link>
                            </div>
                        </div>
                </div>
                <div className="my-4">
                    <h2 className="footer-head">News Letter</h2>
                    <form
                    className='flex gap-2 flex-grow mx-20'
                    // onSubmit={handleSubmit}
                    >
                    <input
                        type="text"
                        placeholder="Search here"
                        className="input w-full bg-card"
                        // onChange={(e) => setKeyword(e.target.value)}
                        // value={keyword}
                    />
                    <button className='btn bg-card' type="submit">
                        Go
                    </button>
                    </form>
                </div>
            </div>
            <div className=' w-full overflow-hidden p-4'>
                <div className="my-4">
                    <h2 className="footer-head">Socials</h2>
                        <div className="flex flex-wrap gap-2">
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon" style={{ backgroundPosition: '-60px -60px' }}></i>
                                </Link>
                            </div>
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon" style={{ backgroundPosition: '0px -60px' }}></i>
                                </Link>
                            </div>
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon"  style={{ backgroundPosition: '-30px -60px' }}></i>
                                </Link>
                            </div>
                            <div className='p-2 px-3 bg-card rounded-xl hover:scale-110 transition-all'>
                                <Link href={'/'}>
                                    <i className="icon" style={{ backgroundPosition: '-90px -60px' }}></i>
                                </Link>
                            </div>
                        </div>
                </div>

                <div className="my-4">
                    <h2 className="footer-head">Ghost App</h2>
                    <div className="flex gap-4 md:flex-col md:gap-1 flex-row">
                        <Link href="" className="bg-card p-2 my-4 md:my-1 rounded-xl flex gap-4 md:max-w-44">
                            <i className="icon invert dark:invert-0" style={{backgroundPosition: '-30px -30px'}}></i>
                            <div>
                            <p className="text-xs"> Download on the</p>
                            <h6 className="text-base font-semibold">App Store</h6>
                            </div>
                        </Link>
                        <Link href="" className="bg-card p-2 my-4 md:my-1 rounded-xl flex gap-4 md:max-w-44">
                            <i className="icon" style={{backgroundPosition: '0 -30px'}}></i>
                            <div>
                            <p className="text-xs"> Get it on</p>
                            <h6 className="text-base font-semibold">Play Store</h6>
                            </div>
                        </Link>    
                    </div>
                </div>
            </div>
            
            
            
        </div>

        <div className="bg-primary  text-center">
            <p className='font-semibold text-black'>&copy; {new Date().getFullYear()} Ghost Protocols</p>
        </div>

        
    </footer>


  )
}

export default Footer