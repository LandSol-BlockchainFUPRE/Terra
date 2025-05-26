import React from 'react'

function Header() {
  return (
    <div className='w-[80%] mx-auto text-white flex justify-between items-center p-2'>
        <h1 className='text-4xl font-bold'>Terra<span className='text-blue-300'>Registry</span></h1>
        <div className='flex gap-4'>
            <button className='py-2 px-8 bg-white text-black rounded-md'>Sign Up</button>
            <button className='py-2 px-8 bg-blue-300 text-white rounded-md'>Connect Wallet</button>
        </div>
    </div>
  )
}

export default Header