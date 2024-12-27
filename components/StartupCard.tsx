import React from 'react'
import { formatDate } from '../lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
export default function StartupCard({ post }: { post: StartupCardType }) {
    const { title, description, category, image, _id } = post
    return (
        <>
            <div className='flex-between'>
                <p className='startup_card_date'>{formatDate(post._createdAt)}</p>
                <div className='flex gap-1.5'>
                    <EyeIcon size={16} className=' size-6 text-primary' />
                    <span className='text-16-medium'>{post.views}</span>
                </div>
            </div>
            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${post.author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>{post.author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}> <h2 className='text-24-semibold line-clamp-1'>{title}</h2>     </Link>
                </div>
                <Link href={`/user/${post.author?._id}`}>
                    <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className='rounded-full' />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className='text-16-medium line-clamp-2'>{description}</p>
                <img src={image} alt={title} className='w-full h-48 object-cover rounded-lg mt-5' />
            </Link>
            <div className='flex-between mt-5 gap-3'>
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className='text-16-medium text-primary'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`} >Details</Link>
                </Button>
            </div>
        </>
    )
}
