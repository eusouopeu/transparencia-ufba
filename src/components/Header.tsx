import React from 'react'

import ufbalogo from '../assets/ufbalogo.png'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'


interface HeaderProps {
  children: React.ReactNode
}
export default function Header({ children }: HeaderProps) {


  return (
    <header className='
      header
    '>
      <section className='header-section'>

        <div className='searchbar'>
          <MagnifyingGlassIcon className='text-slate-400 size-6' />
          <input className='flex w-4/5' />
        </div>
        
        {children}

        
        <img src={ufbalogo} alt="logo da UFBA" className='hidden md:block h-[30%] absolute bottom-[0px] inset-x-1/2 -translate-x-1/2' />
      </section>
    </header>
  )
}
