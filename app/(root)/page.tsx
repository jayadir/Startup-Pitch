import Image from "next/image";
import {client} from "../../sanity/lib/client";
import {QUERY_STARTUPS} from "../../sanity/lib/queries"; 
import Search from "../../components/SearchComponent";
import StartupCard from "../../components/StartupCard";
import { StartupCardType } from "../../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// type StartupCardType = {
//   _id: number;
//   title: string;
//   description: string;
//   category: string;
//   views: number;
//   _createdAt: string;
//   image: string;
//   author: {
//     _id: number;
//   };
// };
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params ={search:query || null};
  const posts = await client.fetch(QUERY_STARTUPS, params);
  // console.log(posts);
  // const {data:posts}=await sanityFetch(QUERY_STARTUPS);
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup and Connect with Others</h1>
        <h2 className="small-heading">Join the Community</h2>
        <p className="sub-heading !max-w-3xl">
          Share your innovative ideas and get feedback from like-minded entrepreneurs.
          Collaborate, network, and take your startup to the next level.
        </p>
        <Search query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Latest Startups"}
        </p>
        <ul className="mt-6 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <li className="startup-card group" key={post._id}> <StartupCard  post={post} /></li>
            ))
          ) : (<p className="no-results">No results</p>)}
        </ul>
      </section>
      {/* <SanityLive/> */}
    </>
  );
}
