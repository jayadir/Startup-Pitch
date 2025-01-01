"use server"

import { auth } from "@/auth"
import { parseResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"
export const createStartupPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth()
    if (!session) {
        return parseResponse({ error: "Not authenticated", status: "ERROR" })
    }
    const { title, description, category, image } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    )
    const slug = slugify(title as string, { lower: true, strict: true })
    try {
        const data = {
            title,
            description,
            category,
            image,
            pitch,
            slug: {
                current: slug,
                _type: slug
            },
            author: {
                _type: "reference",
                _ref: session?.id
            },
        }
        const res = await writeClient.create({ _type: "startup", ...data })
    } catch (error) {
        console.error(error)
        return parseResponse({ error: JSON.stringify(error), status: "ERROR" })
    }
}