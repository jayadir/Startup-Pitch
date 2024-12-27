import Image from "next/image";
import Search from "../../components/SearchComponent";
import StartupCard from "../../components/StartupCard";
type StartupCardType = {
  _id: number;
  title: string;
  description: string;
  category: string;
  views: number;
  _createdAt: string;
  image: string;
  author: {
    _id: number;
  };
};
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 74,
      author: { _id: 1,name: "John Doe" },
      description: "A new way to connect with others",
      category: "Technology",
      title: "Startup",
      _id: 1,
      image: "https://th.bing.com/th?id=OIP.u-LGMDwMFZZLdIhk3ehnawHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    }
  ]
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
              <li className="startup-card group"> <StartupCard key={post._id} post={post} /></li>
            ))
          ) : (<p className="no-results">No results</p>)}
        </ul>
      </section>
    </>
  );
}
