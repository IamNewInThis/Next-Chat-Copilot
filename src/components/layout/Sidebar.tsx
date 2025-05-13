import React from 'react'
import Link from 'next/link';
import { FaUserFriends, FaComments, FaBell, FaArchive, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

function Sidebar() {
    return (
        <aside className="w-16 h-screen bg-zinc-900 text-white flex flex-col items-center py-4 space-y-6">
            <Link href="/">
                <AiFillHome className="text-2xl hover:text-purple-400 cursor-pointer" />
            </Link>

            <Link href="/chat">
                <FaComments className="text-2xl hover:text-purple-400 cursor-pointer" />
            </Link>
            <FaUserFriends className="text-2xl hover:text-purple-400 cursor-pointer" />
            <FaBell className="text-2xl hover:text-purple-400 cursor-pointer" />
            <FaArchive className="text-2xl hover:text-purple-400 cursor-pointer" />
            
            <Link href="/settings" className='cursor-pointer mt-auto'>
                <FaCog className="text-2xl hover:text-purple-400" />
            </Link>
            <Link className='cursor-pointer' href="/login">
                <FaSignOutAlt className="text-2xl hover:text-red-400" />
            </Link>
        </aside>
    )
}

export default Sidebar