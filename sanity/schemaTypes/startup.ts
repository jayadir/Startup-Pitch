import { defineField, defineType } from "sanity";

export const startup = defineType({
    type: "document",
    name: "startup",
    title: "Startup",
    fields:[
        defineField({
            name:"title",
            type:"string"
        }),
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:"title",
                maxLength:96
            }
        }),
        defineField({
            name:"author",
            type:"reference",
            to:[{type:"author"}]
        }),
        defineField({
            name:"views",    
            type:"number"
        }),
        defineField({
            name:"description",
            type:"text"
        }),
        defineField({
            name:"category",   
            type:"string",
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:"image",
            type:"url"
        }),
        defineField({
            name:"pitch",
            type:"markdown",
           
        }),
    ],
    preview:{
        select:{
            title:"name",
        }
    }
})