"use client"
import React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
export default function FormReset() {
    const reset = () => {
        const input = document.querySelector(".search-form") as HTMLFormElement
        input.reset()
    }
    return (
        <div>
            <button type="reset" onClick={() => reset()} className='search-btn text-white'> <Link href="/"><X className='size-5'></X></Link></button>
        </div>
    )
}
