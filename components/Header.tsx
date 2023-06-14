'use client'
import Image from 'next/image'
import React from 'react'
import {MagnifyingGlassIcon,UserCircleIcon} from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'

function Header() {
  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10'>
            <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] 
            rounded-md filter blur-3xl opacity-50 -z-50'/>
            <Image
            src="/Trello_logo.svg.png"
            alt="LOgo"
            width={300}
            height={100}
            className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
            />
            <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                {/* search bar */}
                <form className='flex flex-1 items-center space-x-5 bg-white rounded-md p-2 shadow-md md:flex-initial'>
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                    <input 
                    className='flex-1 outline-none p-2'
                    type="text" placeholder="Search" />
                    <button hidden type='submit'>Search</button>
                </form>
                {/* avatar */}
                <Avatar name='Sifuna Donnex' round size='50' color='#0055D1' />
            </div>
        </div>
        <div className='flex items-center justify-center py-2 px-5 md:py-5'>
            <p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]'>
                <UserCircleIcon className='h-10 w-10 inline-block text-[#0055D1] mr-1' />
                GPT is summarising your tasks for today...
            </p>
        </div>
    </header>
  )
}

export default Header
