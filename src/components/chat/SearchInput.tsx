'use client'

import React, { useState, useEffect, useRef } from 'react';
import { IoMdSearch } from "react-icons/io";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/services/auth';

type UserProfile = {
  id: string;
  name: string;
  avatar_url: string | null;
};

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Cargar el usuario actual al montar el componente
  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    
    loadCurrentUser();
  }, []);

  // Función para buscar usuarios
  const searchUsers = async (query: string) => {
    if (!query || query.length < 2) return [];
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, avatar_url')
      .ilike('name', `%${query}%`)
      .limit(10);
    
    if (error) {
      console.error('Error searching users:', error);
      return [];
    }
    
    // Filtrar para no mostrar al usuario actual en los resultados
    return data?.filter(user => user.id !== currentUser?.id) || [];
  };

  // Función para crear un chat
  const createChat = async (currentUserId: string, recipientId: string) => {
    // Primero verificamos si ya existe un chat entre estos usuarios
    const { data: existingChat, error: searchError } = await supabase
      .from('chats')
      .select('id')
      .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
      .or(`user1_id.eq.${recipientId},user2_id.eq.${recipientId}`)
      .limit(1);

    if (searchError) {
      console.error('Error checking existing chat:', searchError);
      return null;
    }

    // Si ya existe un chat, retornamos su ID
    if (existingChat && existingChat.length > 0) {
      return existingChat[0].id;
    }

    // Si no existe, creamos un nuevo chat
    const { data, error } = await supabase
      .from('chats')
      .insert([
        { user1_id: currentUserId, user2_id: recipientId }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error creating chat:', error);
      return null;
    }

    return data?.id || null;
  };

  // Función para manejar la búsqueda
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchUsers(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Efecto para cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para iniciar un chat con un usuario
  const startChat = async (recipientId: string) => {
    if (!currentUser?.id) return;

    try {
      const chatId = await createChat(currentUser.id, recipientId);
      if (chatId) {
        router.push(`/chat/${chatId}`);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    }
    
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative mb-4" ref={searchContainerRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IoMdSearch className="h-4 w-4 text-zinc-400" />
      </div>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        className="w-full bg-zinc-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsDropdownOpen(e.target.value.length >= 2);
        }}
        onFocus={() => {
          if (searchQuery.length >= 2) {
            setIsDropdownOpen(true);
          }
        }}
      />

      {/* Resultados de búsqueda */}
      {isDropdownOpen && (
        <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg overflow-hidden">
          {isSearching ? (
            <div className="p-4 text-center text-zinc-400">
              <span className="inline-block animate-spin mr-2">⟳</span>
              Buscando...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-zinc-400">
              No se encontraron usuarios
            </div>
          ) : (
            <ul className="max-h-60 overflow-y-auto py-2">
              {searchResults.map((user) => (
                <li 
                  key={user.id} 
                  className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
                  onClick={() => startChat(user.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-xs text-zinc-400">Iniciar conversación</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;