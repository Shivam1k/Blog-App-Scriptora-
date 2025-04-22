"use client"

import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { useSearchParams } from 'next/navigation';
import { SearchAction } from '@/actions/search'

const ArticleSearchInput = () => {

  const searchParams = useSearchParams();


  return (

    <form action={SearchAction} className=' max-w-2xl mx-auto'>
    <div className='relative'>
        <Search  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"/>
        <Input 
        type='text'
        name='search'
        defaultValue={searchParams.get("search") || ""}
        placeholder='Search articles...'
        className='w-full pl-10 pr-4 py-6 text-lg'
        />
    </div>
    </form>
    
  )
}

export default ArticleSearchInput

