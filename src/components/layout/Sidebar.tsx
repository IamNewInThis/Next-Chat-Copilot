import React from 'react'
import Link from 'next/link';
import { FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
    return (
        <aside className="w-16 h-screen bg-zinc-900 text-white flex flex-col items-center py-4 space-y-6">
            <Link href="/chat">
                <FaComments className="text-2xl hover:text-purple-400 cursor-pointer" />
            </Link>

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