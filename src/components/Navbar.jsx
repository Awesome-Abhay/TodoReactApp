import React from 'react'

function Navbar() {
  return (
    <nav className="min-w-screen p-2 px-5 bg-violet-800 flex justify-between md:px-50">
        <div className="logo font-bold text-xl text-white">iTask</div>
        <div className='flex h-full gap-5 md:gap-10'>
            <div className='text-white text-lg font-medium cursor-pointer transition-all hover:scale-110'>Home</div>
            <div className='text-white text-lg font-medium cursor-pointer transition-all hover:scale-110'>Your Tasks</div>
        </div>
    </nav>
  )
}

export default Navbar