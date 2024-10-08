import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="myContainer flex justify-between items-center py-5 p-4">

                <div className="logo font-bold text-2xl">
                    <span className="text-green-600"> &lt; </span>
                    Pass
                    <span className="text-green-600">OP/&gt; </span>
                </div>
                <button className='text-white  rounded-md flex justify-center items-center'>
                    <span className='font-bold px-4'>
                        GitHub
                    </span>
                    <img className='invert p-1 w-8' src="icons/github.png" alt="" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar