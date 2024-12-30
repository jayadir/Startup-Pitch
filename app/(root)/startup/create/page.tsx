import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import StartupSubmitForm from '@/components/StartupSubmitForm'
export default async function page() {
    const session=await auth()
    if(!session) redirect("/" )
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className='heading'>Enter Your Start Up Details</h1>
      </section>
      <StartupSubmitForm/>
    </>
  )
}
