'use client'

import React from 'react';
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IoMdSearch  className="h-4 w-4 text-zinc-400" />
      </div>
      <input
        type="text"
        placeholder="Buscar chats..."
        className="w-full bg-zinc-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

export default SearchInput;