import {defineQuery} from "next-sanity"
export const QUERY_STARTUPS=defineQuery(
    `*[_type=="startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc) {
        _id,
        title,
        slug,
        _createdAt,
        author->{
        _id,name,image,bio
        },
        views,
        description,
        category,
        image,
    }`
)

export const QUERY_STARTUP_DETAILS=defineQuery(
    `*[_type=="startup" && _id==$id][0]{
        _id,
        title,
        slug,
        _createdAt,
        author->{
        _id,name,username,image,bio
        },
        views,
        description,
        category,
        image,
        pitch
    }`)

export const QUERY_CHECK_AUTHOR=defineQuery(`
        *[ _type == "author" && id == $id ][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `)