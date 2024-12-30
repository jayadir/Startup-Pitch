"use client";
import React, { useActionState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { useToast } from "@/hooks/use-toast";
import {z} from 'zod'
export default function StartupSubmitForm() {
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [value, setValue] = React.useState("");
    // const [isLoading, setIsLoading] = React.useState(false);
    const handleSubmit=async (prev:any,formData:FormData)=>{
        try {
            const data={
                title:formData.get('title') as string,
                description:formData.get('description') as string,
                category:formData.get('category') as string,
                image:formData.get('image') as string,
                pitch:value
            }
            await formSchema.parseAsync(data)
            // const res=await createIdea(prev,data,value)
            console.log(data)
        } catch (error) {
            if(error instanceof z.ZodError){
                const errors=error.flatten().fieldErrors
                setErrors(errors as unknown as Record<string, string>)
                return {...prev, error: "validation error", status: "ERROR"}
            }
            return {...prev, error: "unknown error", status: "ERROR"}
        }
    }
    const [state,formAction,isPending]=useActionState(handleSubmit,{error:"",status:"INITIAL"})
    return (
        <form action={() => { }} className='startup-form'>
            <div>
                <label htmlFor='title' className='startup-form_label'>
                    Title of your startup
                </label>
                <Input id='title' type='text' placeholder='Enter the title of your startup' required className='startup-form_input' />
                {errors?.title && <p className='startup-form_error'>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor='description' className='startup-form_label'>
                    Description
                </label>
                <Textarea id='description' placeholder='Enter the description of your startup' required className='startup-form_input' />
                {errors?.description && <p className='startup-form_error'>{errors.description}</p>}
            </div>
            <div>
                <label htmlFor='category' className='startup-form_label'>
                    Category
                </label>
                <Input id='category' type='text' placeholder='Enter the category of your startup' required className='startup-form_input' />
                {errors?.category && <p className='startup-form_error'>{errors.category}</p>}
            </div>
            <div>
                <label htmlFor='image' className='startup-form_label'>
                    Image
                </label>
                <Input id='image' type='link' required className='startup-form_input' placeholder='Enter Your Startup Image URL' />
                {errors?.image && <p className='startup-form_error'>{errors.image}</p>}
            </div>
            <div data-coloe-mode="light">
                <label htmlFor='pitch' className='startup-form_label'>
                    Pitch
                </label>
                <MDEditor value={value} onChange={(value) => setValue(value as string)} preview='edit' style={{ borderRadius: 20, overflow: "hidden" }} textareaProps={{
                    placeholder: "Briefly describe your startup"
                }} />
                {errors?.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
            </div>
            <Button type='submit' className='text-white startup-form_btn' disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
                <Send size={24} />
            </Button>
        </form>
    )
}
