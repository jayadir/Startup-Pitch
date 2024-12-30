import { z } from 'zod'
export const formSchema = z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(500),
    category: z.string().min(3).max(50),
    image: z.string().url().refine(async (url) => {
        try {
            const res = await fetch(url, { method: 'HEAD' })
            const contentType = res.headers.get('content-type')
            if (!contentType?.startsWith('image')) {
                return false
            }
            return true
        } catch (error) {
            return false
        }
    }),
    pitch: z.string().min(10)
})