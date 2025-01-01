import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { QUERY_USER_DETAILS_BY_ID} from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image'
import UserStartups from '@/components/UserStartups';

export default async function page({params}:{params:Promise<{id:string}>}) {
    const id=(await params).id;
    const session=await auth()
    const user=await client.fetch(QUERY_USER_DETAILS_BY_ID,{id})
    if(!user){
        return notFound()
    }
  return (
    <div>
      <section className='profile_container'>
        <div className="profile_card">
            <div className='profile_title'>
                <h3 className='text-24-black uppercase text-center line-clamp-1'>{user.name}</h3>
            </div>
            <Image src={user?.image} alt={user?.name} width={200} height={200} className='profile_image' />
            <p className='text-30-extrabold mt-5 text-center'>@{user?.username}</p>
            <p className='text-14-normal mt-5 text-center'>{user?.bio} </p>
        </div>
        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className='"text-30-bold'>
                {session?.id===id ?"Your Startups":"User's Startups"}
            </p>
            <ul className='card_grid-sm'>
                <UserStartups id={id} />
            </ul>
        </div>
      </section>
    </div>
  )
}
