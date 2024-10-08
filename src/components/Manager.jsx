import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import React from 'react'
// import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setForm] = useState({ site: "", userName: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.userName.length >3 && form.password.length >3) {   
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", userName: "", password: "" })
            // console.log([...passwordArray, form]);
        }
    }

    const deletePassword = (id) => {
        let con = confirm("D you realy wants to delete the password?")
        if (con) {
            console.log("deleting password with id ", id);
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item =>  item.id !== id )))
        }
    }

    const editPassword = (id) => {
        console.log("editing password with id ", id);
        setForm(passwordArray.filter((i) => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const copyText = (text) => {
        toast('🦄 Copy to clickboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div class="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className=" p-2 md:p-8 md:myContainer min-h-[88.5vh]:">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-600"> &lt; </span>
                    Pass
                    <span className="text-green-600">OP/&gt; </span>
                </h1>
                <p className='text-green-800 text-center text-lg'>Your Own Password Menager</p>

                <div className="flex flex-col p-4 gap-5 items-center">
                    <input name="site" value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-800 w-full p-4 py-2 ' type="text" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-5">
                        <input name="userName" value={form.userName} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-800 w-full p-4 py-2 ' type="text" />
                        <div className="relative">
                            <input name="password" value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-800 w-full p-4 py-2 ' type="password" />
                            {/* <span className='absolute right-0'></span> */}
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full px-6 py-2 text-lg w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-1'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full overflow-hidden rounded-lg mb-16 ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>USername</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center p-2 border border-white '>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className="cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "8px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center p-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span>
                                                {item.userName}
                                            </span>
                                            <div className="cursor-pointer" onClick={() => { copyText(item.userName) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "8px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center p-2  border border-white '>
                                        <div className='flex items-center justify-center'>
                                            <span>
                                                {item.password}
                                            </span>
                                            <div className="cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "8px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center p-2  border border-white '>
                                        <div className='flex items-center justify-center gap-2'>
                                            <button onClick={() => { editPassword(item.id) }} className='border bg-slate-600 p-1 rounded-lg'>Edit</button>
                                            <div onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ "width": "3-px", "height": "3-px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
