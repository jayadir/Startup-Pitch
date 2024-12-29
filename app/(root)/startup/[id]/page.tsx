import React from 'react'
import { QUERY_STARTUP_DETAILS } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import markdownit from 'markdown-it'
// export const experimental_ppr = true
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const details = await client.fetch(QUERY_STARTUP_DETAILS, { id });
    if (!details) {
        return notFound()
    }
    const md = markdownit()
    const markdownContent=md.render(details.pitch)
    return (
        <div>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(details?._createdAt)}</p>
                <h1 className='text-3xl heading'>{details.title}</h1>
                <p className='sub-heading !max-w-5xl'>{details.description}</p>
            </section>
            <section className='section_container'>
                <img src={details.image} alt={details.title} className='w-full h-96 object-cover rounded-lg' />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${details.author?._id}`} className='flex gap-2 items-center mb-2'>
                        <img src={details.author?.image} alt={details.author?.name} className='rounded-full w-12 h-12' />
                        <div>
                            <p className='text-20-medium'>{details.author?.name}</p>
                            <p className='text-16-medium text-gray-500'>{details.author?.username}</p>
                        </div>
                        </Link>
                        <p className='category-tag'>{details.category}</p>
                    </div>
                    <h3 className='text-24-semibold'>Pitch</h3>
                    {/* <p className='text-16-medium'>{details.pitch}</p> */}
                    {markdownContent &&(
                        <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{__html:markdownContent}}/>
                    )}
                </div>
                <hr className='divider mt-10' />
            </section>
        </div>
    )
}
