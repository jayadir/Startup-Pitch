import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from '@/auth'
export default async function Navbar() {
    const session = await auth()
    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <p className='text-xl font-bold text-black'>Startup Pitch</p></Link>
                <div className='flex space-x-5 items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className='text-black'>Create</span>
                            </Link>
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>                            <button className='text-black' >Logout</button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <span className='text-black'>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server"
                            await signIn('github')
                        }}>
                            <button className='text-black' type='submit'>Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    )
}
