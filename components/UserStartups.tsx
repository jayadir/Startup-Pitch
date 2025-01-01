import { client } from '@/sanity/lib/client'
import { QUERY_USER_STARTUPS } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard'

export default async function UserStartups({ id }: { id: string }) {
    const startups = await client.fetch(QUERY_USER_STARTUPS, { id })
    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup: StartupCardType) => (
                    <li className="startup-card group" key={startup._id}> <StartupCard  post={startup} /></li>
                ))
            ) : (
                <p className='no-result'>No startups found</p>
            )}
        </>
    )
}
