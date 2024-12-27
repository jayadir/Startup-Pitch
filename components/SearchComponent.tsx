import React from 'react'
import Form from "next/form";
import FormReset from './FormReset';
import {Search} from 'lucide-react'

export default function SearchComponent({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false} className='search-form'>
      <input name="query" defaultValue={query} className='search-input' placeholder='Search for startups' />
      <div className='flex gap-2'>
        {query && (
          <FormReset />
        )}
        <button type="submit" className='search-btn text-white'>
          <Search size={24} />
        </button>
      </div>
    </Form>
  )
}
